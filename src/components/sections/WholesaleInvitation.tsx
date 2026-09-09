import Link from 'next/link';
import { siteConfig } from '@/src/config/site';

export default function WholesaleInvitation() {
  return (
    <section className="py-24 md:py-36 bg-ink" aria-labelledby="wholesale-heading">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="label-sm text-orange mb-6">For Retailers</p>

          <h2
            id="wholesale-heading"
            className="font-editorial text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            LET&apos;S BUILD YOUR
            <br />
            NEXT COLLECTION.
          </h2>

          <p className="mt-8 text-ivory/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Whether you&apos;re looking to stock our range or explore custom
            manufacturing, we&apos;d love to discuss how INTENSE can support
            your retail business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/contact?type=wholesale"
              className="inline-flex items-center px-8 py-3 bg-orange text-white text-xs tracking-[0.15em] uppercase hover:bg-orange/90 transition-colors"
            >
              Discuss Wholesale
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center px-8 py-3 border border-ivory/30 text-ivory text-xs tracking-[0.15em] uppercase hover:bg-ivory hover:text-ink transition-all duration-300"
            >
              Call INTENSE
            </a>
          </div>

          <div className="divider mx-auto max-w-16 mt-16 bg-ivory/10" />
        </div>
      </div>
    </section>
  );
}
