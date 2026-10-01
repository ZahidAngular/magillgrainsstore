import { LivestockProductPage, livestockMetadata } from "@/components/LivestockProductPage"
import { pullets } from "@/lib/livestock"

export const metadata = livestockMetadata(pullets)

export default function Page() {
  return <LivestockProductPage page={pullets} />
}
