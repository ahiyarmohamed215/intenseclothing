'use client';

import { useEffect, useRef } from 'react';

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ctx: unknown;
    import('@/src/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      ctx = gsap.context(() => {
        /* Staggered line reveals with clip-path */
        gsap.utils.toArray<HTMLElement>('.brand-line').forEach((line, i) => {
          gsap.from(line, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 88%',
              once: true,
            },
          });
        });

        /* Animated year counter */
        if (counterRef.current) {
          const target = { val: 0 };
          gsap.to(target, {
            val: new Date().getFullYear() - 2004,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: counterRef.current,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = Math.round(target.val) + '+';
              }
            },
          });
        }

        /* Orange accent bar grow */
        gsap.from('.brand-accent-bar', {
          scaleX: 0,
          transformOrigin: 'center center',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.brand-accent-bar',
            start: 'top 90%',
            once: true,
          },
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
      className="py-24 md:py-36 bg-ink relative overflow-hidden"
      aria-labelledby="brand-statement"
    >
      {/* Subtle background texture lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 80px)',
      }} />

      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Stat */}
          <div className="brand-line flex items-center justify-center gap-6 mb-10">
            <div className="h-px w-12 bg-taupe/30" />
            <div className="text-center">
              <span ref={counterRef} className="block text-4xl md:text-5xl font-editorial text-orange">
                {new Date().getFullYear() - 2004}+
              </span>
              <span className="label-sm text-ivory/30 mt-1">Years of Craft</span>
            </div>
            <div className="h-px w-12 bg-taupe/30" />
          </div>

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

          {/* Accent bar */}
          <div className="brand-accent-bar mx-auto max-w-24 mt-12 h-[2px] bg-orange/60" />
        </div>
      </div>
    </section>
  );
}
