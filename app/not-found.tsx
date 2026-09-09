import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-5">
        <p className="label-sm text-taupe mb-4">404</p>
        <h1 className="font-editorial text-4xl md:text-5xl mb-4">
          Page Not Found
        </h1>
        <p className="text-ink/50 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-8 py-3 bg-ink text-ivory text-xs tracking-[0.15em] uppercase hover:bg-orange transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/collections"
            className="px-8 py-3 border border-ink text-ink text-xs tracking-[0.15em] uppercase hover:bg-ink hover:text-ivory transition-colors"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    </div>
  );
}
