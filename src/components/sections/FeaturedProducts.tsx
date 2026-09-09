import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/src/data/products';

export default function FeaturedProducts() {
  return (
    <section className="py-20 md:py-32" aria-labelledby="featured-heading">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label-sm text-taupe mb-3">Featured</p>
            <h2 id="featured-heading" className="font-editorial text-3xl md:text-4xl lg:text-5xl">
              Our Products
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:inline-flex items-center gap-2 text-sm text-ink/60 hover:text-orange transition-colors arrow-link"
          >
            View All Products
            <svg className="arrow-icon w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/collections/${product.slug}`}
              className="group"
            >
              <div className="product-image-wrap aspect-[3/4] relative bg-ink/5 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <p className="label-sm text-taupe mb-1">{product.category}</p>
              <h3 className="text-sm md:text-base font-medium group-hover:text-orange transition-colors">
                {product.name}
              </h3>
            </Link>
          ))}
        </div>

        <Link
          href="/collections"
          className="md:hidden flex items-center justify-center gap-2 mt-8 text-sm text-ink/60 hover:text-orange transition-colors"
        >
          View All Products
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
