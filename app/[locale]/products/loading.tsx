/**
 * The catalog is the only route that has to hit the database before it can
 * render (it resolves `?category=` on the server), so without a loading
 * boundary the router had nothing to prefetch and every click waited on the
 * Mongo round trip before the URL even changed. With this file the route's
 * shell is prefetchable: the navigation commits immediately and the catalog
 * streams in behind this placeholder.
 */
export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-surface">
      <section className="px-6 max-w-7xl mx-auto py-16 md:py-24">
        <div className="animate-pulse">
          <div className="h-[320px] md:h-[420px] w-full rounded-sm bg-neutral-200/70 mb-12 md:mb-16" />
          <div className="max-w-xl mx-auto h-[52px] rounded-xl bg-neutral-200/70 mb-6" />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-9 w-28 rounded-full bg-neutral-200/70" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-[4/5] w-full rounded-sm bg-neutral-200/70" />
                <div className="h-4 w-2/3 rounded bg-neutral-200/70" />
                <div className="h-3 w-1/3 rounded bg-neutral-200/70" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
