import { LivestockProductPage, livestockMetadata } from "@/components/LivestockProductPage"
import { dayOldMeatBirds } from "@/lib/livestock"

export const metadata = livestockMetadata(dayOldMeatBirds)

export default function Page() {
  return <LivestockProductPage page={dayOldMeatBirds} />
}
