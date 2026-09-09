'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ctx: unknown;
    import('@/src/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      ctx = gsap.context(() => {
        /* Stagger headline words in */
        const words = headlineRef.current?.querySelectorAll('.hero-word');
        if (words) {
          gsap.from(words, {
            y: 80,
            opacity: 0,
            rotateX: 40,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.4,
          });
        }

        /* Fade in sub-content */
        gsap.from(subRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 1,
        });

        /* Parallax the hero image on scroll */
        gsap.to('.hero-bg-image', {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        /* Fade out content as user scrolls */
        gsap.to('.hero-content', {
          y: -60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '30% top',
            end: '80% top',
            scrub: true,
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
      className="relative h-screen min-h-[600px] max-h-[1200px] flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Image with parallax */}
      <div className="absolute inset-0 z-0">
        <div className="hero-bg-image absolute inset-[-20%] w-[140%] h-[140%]">
          <Image
            src="/images/hero.jpg"
            alt="INTENSE Clothing — premium shorts and trousers"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70"
        />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16 w-full">
        <div className="max-w-3xl" style={{ perspective: '800px' }}>
          {/* Headline — each word animates individually */}
          <h1
            ref={headlineRef}
            className="font-editorial text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl overflow-hidden"
          >
            <span className="hero-word inline-block">EVERYDAY&nbsp;</span>
            <span className="hero-word inline-block">FORM.</span>
            <br />
            <span className="hero-word inline-block text-orange">EXCEPTIONAL&nbsp;</span>
            <span className="hero-word inline-block">DETAIL.</span>
          </h1>

          {/* Supporting copy */}
          <div ref={subRef}>
            <p className="mt-6 text-ivory/70 text-base md:text-lg max-w-lg leading-relaxed">
              Discover premium trousers, denim and shorts crafted with care
              since 2004.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/collections"
                className="group inline-flex items-center gap-2 px-7 py-3 bg-ivory text-ink text-xs tracking-[0.15em] uppercase hover:bg-orange hover:text-white transition-all duration-300"
              >
                Explore Collections
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
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

      {/* Scroll cue — gentle float */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-ivory/40 animate-float">
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="4" y="1" width="8" height="14" rx="4" />
          <line x1="8" y1="5" x2="8" y2="8" strokeLinecap="round">
            <animate attributeName="y1" values="5;8;5" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="y2" values="8;11;8" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
          </line>
          <path d="M4 18l4 4 4-4" />
        </svg>
      </div>

      {/* Bottom marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-ink/40 backdrop-blur-sm py-2.5 overflow-hidden">
        <div
          className="flex"
          style={{
            width: 'max-content',
            animation: 'marquee 30s linear infinite',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center shrink-0 gap-6 px-4 text-[10px] tracking-[0.25em] uppercase text-ivory/40">
              <span>Premium Menswear</span>
              <span className="text-orange/60">●</span>
              <span>Since 2004</span>
              <span className="text-orange/60">●</span>
              <span>Shorts</span>
              <span className="text-orange/60">●</span>
              <span>Denims</span>
              <span className="text-orange/60">●</span>
              <span>Trousers</span>
              <span className="text-orange/60">●</span>
              <span>Quality Craftsmanship</span>
              <span className="text-orange/60">●</span>
              <span>Sri Lanka</span>
              <span className="text-orange/60">●</span>
              <span>Wholesale Available</span>
              <span className="text-orange/60">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
