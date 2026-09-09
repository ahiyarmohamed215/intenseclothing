'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/src/data/products';

export default function CollectionShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ctx: unknown;
    import('@/src/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      ctx = gsap.context(() => {
        /* Heading slide in */
        gsap.from('.coll-heading', {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.coll-heading', start: 'top 85%', once: true },
        });

        /* Staggered panel reveals with scale */
        gsap.utils.toArray<HTMLElement>('.collection-panel').forEach((panel, i) => {
          gsap.from(panel, {
            y: 80,
            opacity: 0,
            scale: 0.95,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 88%',
              once: true,
            },
          });
        });

        /* Decorative line grow */
        gsap.from('.coll-line', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.coll-line', start: 'top 90%', once: true },
        });
      }, sectionRef);
    });

    return () => {
      if (ctx && typeof (ctx as { revert: () => void }).revert === 'function') {
        (ctx as { revert: () => void }).revert();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32"
      aria-labelledby="collections-heading"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Section divider line */}
        <div className="coll-line h-px bg-taupe/20 mb-12" />

        <div className="flex items-end justify-between mb-12">
          <div className="coll-heading">
            <p className="label-sm text-taupe mb-3">Our Range</p>
            <h2 id="collections-heading" className="font-editorial text-3xl md:text-4xl lg:text-5xl">
              Collections
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:inline-flex items-center gap-2 text-sm text-ink/60 hover:text-orange transition-colors arrow-link"
          >
            View All
            <svg className="arrow-icon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/collections?category=${cat.name}`}
              className="collection-panel group relative aspect-[3/4] overflow-hidden bg-ink/5"
            >
              <Image
                src={cat.image}
                alt={`${cat.name} collection`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

              {/* Hover overlay accent */}
              <div className="absolute inset-0 bg-orange/0 group-hover:bg-orange/10 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="label-sm text-ivory/50 mb-2">Collection</p>
                <h3 className="font-editorial text-ivory text-2xl md:text-3xl">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-ivory/60 group-hover:text-orange transition-colors">
                  <span className="text-xs tracking-wide uppercase">Explore</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Animated underline on hover */}
                <div className="h-px bg-orange mt-4 transition-all duration-500 w-0 group-hover:w-full" />
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/collections"
          className="md:hidden flex items-center justify-center gap-2 mt-8 text-sm text-ink/60 hover:text-orange transition-colors"
        >
          View All Collections
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
