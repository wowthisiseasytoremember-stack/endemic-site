export function TiltCardSkeleton() {
  return (
    <div className="h-[400px] md:h-[450px] rounded-[2rem] bg-white/5 animate-pulse ring-1 ring-white/10" />
  );
}

export function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-6" />
      <div className="h-12 w-3/4 bg-white/10 rounded animate-pulse mb-8" />
      <div className="h-6 w-full bg-white/10 rounded animate-pulse mb-4" />
      <div className="h-6 w-5/6 bg-white/10 rounded animate-pulse mb-12" />
      
      <div className="space-y-4">
        <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-11/12 bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-10/12 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  );
}
