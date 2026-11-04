import type { Metadata } from "next"
import { HomeContent } from "@/components/home/HomeContent"
import { homeDescription, homeTitle, withSocial } from "@/lib/seo"

export const metadata: Metadata = withSocial(
  { title: { absolute: homeTitle }, description: homeDescription },
  "/"
)

export default function HomePage() {
  return <HomeContent />
}
