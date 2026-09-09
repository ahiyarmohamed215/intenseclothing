'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const craftSteps = [
  {
    title: 'Expert Stitching',
    text: 'Every seam is crafted with precision by experienced hands, ensuring durability that stands up to everyday wear.',
  },
  {
    title: 'Precise Cutting',
    text: 'Patterns are cut with meticulous accuracy, minimising waste while maintaining consistent fit across every garment.',
  },
  {
    title: 'Skilled Workmanship',
    text: 'Our team brings decades of combined experience to every stage of production, from fabric selection to final finishing.',
  },
  {
    title: 'Quality Checks',
    text: 'Each piece passes through rigorous inspection before it leaves our facility, meeting the standards our retail partners expect.',
  },
];

export default function Craftsmanship() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ctx: unknown;
    import('@/src/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      /* Only apply sticky scroll sequence on desktop */
      if (window.innerWidth < 1024) {
        /* Simple fade-in for mobile */
        gsap.context(() => {
          gsap.utils.toArray<HTMLElement>('.craft-step').forEach((step) => {
            gsap.from(step, {
              y: 30,
              opacity: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                once: true,
              },
            });
          });
        }, sectionRef);
        return;
      }

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 15%',
          end: 'bottom 85%',
          pin: '.craft-image-sticky',
          pinSpacing: false,
        });

        gsap.utils.toArray<HTMLElement>('.craft-step').forEach((step, i) => {
          gsap.from(step, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
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
      className="py-20 md:py-32 bg-ivory"
      aria-labelledby="craft-heading"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="mb-12 md:mb-16">
          <p className="label-sm text-taupe mb-3">Our Process</p>
          <h2 id="craft-heading" className="font-editorial text-3xl md:text-4xl lg:text-5xl">
            The Craft Behind
            <br />
            Every Garment
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Sticky image (desktop) / normal image (mobile) */}
          <div className="craft-image-sticky">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src="/images/craftsmanship.jpg"
                alt="Skilled hands sewing denim on an industrial machine"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {craftSteps.map((step, i) => (
              <div key={step.title} className="craft-step">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-taupe/30 text-xs text-taupe font-medium">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium mb-2">
                      {step.title}
                    </h3>
                    <p className="text-ink/60 text-sm md:text-base leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
                {i < craftSteps.length - 1 && (
                  <div className="divider mt-8 ml-12" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
