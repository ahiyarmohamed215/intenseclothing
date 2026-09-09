'use client';

import { useEffect, useRef } from 'react';

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ctx: unknown;
    import('@/src/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.brand-line').forEach((line, i) => {
          gsap.from(line, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 88%',
              once: true,
            },
          });
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
      className="py-24 md:py-36 bg-ink"
      aria-labelledby="brand-statement"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="label-sm text-taupe mb-8 brand-line">Since 2004</p>

          <h2
            id="brand-statement"
            className="font-editorial text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl brand-line"
          >
            MADE WITH CARE.
          </h2>
          <h2 className="font-editorial text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2 brand-line">
            WORN WITH{' '}
            <span className="text-orange">CONFIDENCE.</span>
          </h2>

          <p className="mt-10 text-ivory/50 text-base md:text-lg leading-relaxed max-w-2xl mx-auto brand-line">
            Every garment from INTENSE Clothing reflects our commitment to
            quality craftsmanship and everyday wear. From precise cutting to
            expert stitching, each piece is made to be worn with confidence.
          </p>

          <div className="divider mx-auto max-w-24 mt-12 bg-taupe/30 brand-line" />
        </div>
      </div>
    </section>
  );
}
