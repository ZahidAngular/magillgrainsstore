import { LivestockProductPage, livestockMetadata } from "@/components/LivestockProductPage"
import { dayOldChick } from "@/lib/livestock"

export const metadata = livestockMetadata(dayOldChick)

export default function Page() {
  return <LivestockProductPage page={dayOldChick} />
}
