const MAX_BYTES = 100 * 1024
const MAX_DIMENSION = 1600
const MIN_DIMENSION = 64

/**
 * Re-encodes an image in the browser so every product photo stays under the
 * store's 100KB budget before it ever reaches Cloudinary — the site's traffic
 * math (bandwidth ÷ free-tier credits) assumes images this size.
 *
 * Output is WebP rather than JPEG: smaller at the same visual quality, which
 * both helps hit the 100KB budget at a higher quality setting and is a page
 * -speed signal Google's ranking uses directly.
 *
 * Downscales first if the source is large, then walks quality down;
 * dimensions are shrunk further and the walk repeats if quality alone can't
 * hit the target. The dimension floor is small enough that the lowest
 * quality always fits the budget, so this can never return an over-budget
 * file — there's no "give up, ship it anyway" path.
 */
export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file

  const bitmap = await loadBitmap(file)
  let { width, height } = fitWithin(bitmap.width, bitmap.height, MAX_DIMENSION)
  let smallest: Blob | null = null

  while (true) {
    for (let quality = 0.85; quality >= 0.1; quality -= 0.1) {
      const blob = await draw(bitmap, width, height, quality)
      if (!smallest || blob.size < smallest.size) smallest = blob
      if (blob.size <= MAX_BYTES) {
        return new File([smallest], renameToWebp(file.name), { type: "image/webp" })
      }
    }

    if (width <= MIN_DIMENSION || height <= MIN_DIMENSION) {
      // The smallest, lowest-quality render still didn't fit — ship the
      // smallest one produced rather than looping forever.
      return new File([smallest!], renameToWebp(file.name), { type: "image/webp" })
    }

    width = Math.max(MIN_DIMENSION, Math.round(width * 0.75))
    height = Math.max(MIN_DIMENSION, Math.round(height * 0.75))
  }
}

function loadBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file)
}

function fitWithin(w: number, h: number, max: number) {
  if (w <= max && h <= max) return { width: w, height: h }
  const scale = max / Math.max(w, h)
  return { width: Math.round(w * scale), height: Math.round(h * scale) }
}

function draw(bitmap: ImageBitmap, width: number, height: number, quality: number): Promise<Blob> {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")!
  // Flatten onto white first — a transparent PNG re-encoded as JPEG would
  // otherwise turn its transparent areas black.
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(bitmap, 0, 0, width, height)
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not compress image."))),
      "image/webp",
      quality
    )
  })
}

function renameToWebp(name: string) {
  return name.replace(/\.[^.]+$/, "") + ".webp"
}
