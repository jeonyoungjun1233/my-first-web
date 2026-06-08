export default function PostsLoading() {
  return (
    <div className="space-y-5">
      <section className="neon-panel rounded-[34px] p-8">
        <div className="h-5 w-32 animate-pulse rounded bg-rose-200/20" />
        <div className="mt-5 h-10 w-64 animate-pulse rounded bg-rose-100/20" />
      </section>
      <div className="grid gap-5 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div key={item} className="neon-panel rounded-[30px] p-6">
            <div className="h-4 w-32 animate-pulse rounded bg-rose-200/20" />
            <div className="mt-4 h-8 w-3/4 animate-pulse rounded bg-rose-100/20" />
            <div className="mt-4 h-20 animate-pulse rounded bg-rose-50/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
