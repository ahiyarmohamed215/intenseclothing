'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ctx: unknown;
    import('@/src/lib/gsap').then(({ gsap }) => {
      ctx = gsap.context(() => {
        gsap.from(headlineRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        });
        gsap.from(subRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.6,
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
      className="relative h-screen min-h-[600px] max-h-[1200px] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="INTENSE Clothing — premium shorts and trousers"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16 w-full">
        <div className="max-w-3xl">



          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-editorial text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            EVERYDAY FORM.
            <br />
            <span className="text-orange">EXCEPTIONAL</span> DETAIL.
          </h1>

          {/* Supporting copy */}
          <div ref={subRef}>
            <p className="mt-6 text-ivory/70 text-base md:text-lg max-w-lg leading-relaxed">
              Discover trousers, denim and shorts from INTENSE Clothing.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/collections"
                className="inline-flex items-center px-7 py-3 bg-ivory text-ink text-xs tracking-[0.15em] uppercase hover:bg-orange hover:text-white transition-all duration-300"
              >
                Explore Collections
              </Link>
              <Link
                href="/contact?type=wholesale"
                className="inline-flex items-center px-7 py-3 border border-ivory/40 text-ivory text-xs tracking-[0.15em] uppercase hover:bg-ivory hover:text-ink transition-all duration-300"
              >
                Wholesale Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-ivory/40">
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-ivory/30 animate-pulse" />
      </div>
    </section>
  );
}
