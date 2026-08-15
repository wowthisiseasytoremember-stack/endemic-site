import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#040908] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1fb8c4]/10 via-[#040908]/0 to-[#040908]/0 pointer-events-none" />
      
      <div className="text-center z-10 max-w-2xl">
        <h1 className="font-display text-8xl md:text-9xl font-bold text-white mb-6 tracking-tighter">
          404
        </h1>
        <h2 className="font-display text-2xl md:text-3xl font-medium text-white mb-6">
          Uncharted Waters
        </h2>
        <p className="text-white/60 mb-10 text-lg md:text-xl max-w-lg mx-auto">
          You've drifted beyond the mapped ecosystem. The page you're looking for has been submerged or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="px-8 py-4 rounded-xl bg-aqua text-[#040908] font-semibold hover:bg-aqua/90 transition-colors"
          >
            Return to Surface
          </Link>
          <Link 
            href="/read"
            className="px-8 py-4 rounded-xl glass border border-white/10 text-white hover:border-white/20 transition-colors"
          >
            Read Field Notes
          </Link>
        </div>
      </div>
    </main>
  );
}
