const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

/**
 * Uploads a single image straight from the browser to Cloudinary using an
 * unsigned preset — no backend involved, so there's no server-side file
 * handling to build or secret key to protect (an unsigned preset can only
 * create uploads, nothing else).
 */
export async function uploadProductImage(file: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Image uploads aren't configured yet.")
  }

  const body = new FormData()
  body.append("file", file)
  body.append("upload_preset", UPLOAD_PRESET)
  body.append("folder", "magill-products")

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error?.message || "Image upload failed.")
  }

  const data = (await res.json()) as { secure_url: string }
  return data.secure_url
}
