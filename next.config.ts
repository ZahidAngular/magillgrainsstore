import type { NextConfig } from "next";

// Firebase Hosting serves plain files, so `STATIC_EXPORT=1 next build` writes
// the site to out/. Local `next dev` is unaffected.
const isExport = process.env.STATIC_EXPORT === "1";

// Product photos live on Cloudinary, which already serves an optimized,
// right-sized file, so Next re-optimizing them on top buys nothing — and its
// image proxy fetching a remote host from inside this sandbox is exactly the
// request that times out locally. Unoptimized everywhere keeps dev, export
// and prod all rendering images the same way.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(isExport ? { output: "export" } : {}),
};

export default nextConfig;
