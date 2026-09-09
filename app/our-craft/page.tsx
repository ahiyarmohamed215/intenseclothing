import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Craft',
  description:
    'Discover the craftsmanship behind INTENSE Clothing — expert stitching, precise cutting, skilled workmanship, and rigorous quality checks since 2004.',
};

const craftSections = [
  {
    title: 'Expert Stitching',
    description:
      'Every seam is crafted with precision by experienced hands. Our team ensures each stitch contributes to the durability and clean finish that defines INTENSE garments.',
  },
  {
    title: 'Precise Cutting',
    description:
      'Accurate pattern cutting is the foundation of a well-fitting garment. We maintain strict cutting standards to ensure consistency across every production run.',
  },
  {
    title: 'Skilled Workmanship',
    description:
      'With decades of combined experience, our team brings deep expertise to every stage of garment production — from fabric handling to final assembly.',
  },
  {
    title: 'Quality Checks',
    description:
      'Before any garment leaves our facility, it passes through thorough inspection. We check every detail so our retail partners can stock with confidence.',
  },
];

export default function OurCraftPage() {
  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Hero header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <p className="label-sm text-taupe mb-3">Our Story</p>
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl mb-6">
            The Craft Behind
            <br />
            <span className="text-orange">Every Garment</span>
          </h1>
          <p className="text-ink/60 text-base md:text-lg leading-relaxed max-w-xl">
            Since 2004, INTENSE Clothing has been manufacturing premium
            menswear from our facility in Weligama, Sri Lanka. Every garment
            reflects our commitment to quality at every stage of production.
          </p>
        </div>

        {/* Large image */}
        <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden mb-16 md:mb-24">
          <Image
            src="/images/craftsmanship.jpg"
            alt="Skilled hands sewing denim on an industrial machine at the INTENSE facility"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Craft sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 max-w-5xl mx-auto">
          {craftSections.map((section, i) => (
            <div key={section.title}>
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-taupe/30 text-sm text-taupe font-medium">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="font-editorial text-2xl md:text-3xl pt-1">
                  {section.title}
                </h2>
              </div>
              <p className="text-ink/60 leading-relaxed ml-14">
                {section.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20 md:mt-28">
          <div className="divider mx-auto max-w-16 mb-10" />
          <p className="text-ink/40 text-sm mb-6 max-w-md mx-auto">
            Interested in stocking INTENSE products or discussing a
            wholesale partnership?
          </p>
          <Link
            href="/contact?type=wholesale"
            className="inline-flex items-center px-8 py-3 bg-ink text-ivory text-xs tracking-[0.15em] uppercase hover:bg-orange transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}
