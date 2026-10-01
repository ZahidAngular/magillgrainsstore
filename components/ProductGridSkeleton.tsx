/** Placeholder cards shown while a category's products are fetched in the
 * browser — shaped like ProductGrid's cards so the page doesn't jump once
 * the real data arrives. */
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface-2"
        >
          <div className="relative aspect-[4/3] animate-pulse bg-bone-100" />
          <div className="flex flex-1 flex-col gap-4 border-t border-line p-6">
            <div className="h-4 w-3/5 animate-pulse rounded bg-line" />
            <div className="space-y-2.5">
              <div className="h-3.5 w-full animate-pulse rounded bg-line/70" />
              <div className="h-3.5 w-full animate-pulse rounded bg-line/70" />
              <div className="h-3.5 w-2/3 animate-pulse rounded bg-line/70" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
