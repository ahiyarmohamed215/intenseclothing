import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { products, getProductBySlug, getRelatedProducts } from '@/src/data/products';
import { siteConfig } from '@/src/config/site';
import ProductCard from '@/src/components/products/ProductCard';
import ProductDetailClient from '@/src/components/products/ProductDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(slug);

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-ink/40">
            <li>
              <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/collections" className="hover:text-ink transition-colors">Collections</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">{product.name}</li>
          </ol>
        </nav>

        {/* Interactive Product Layout (Image, Colors, Sizes, Fabric) */}
        <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center text-ink/40">Loading product details...</div>}>
          <ProductDetailClient product={product} />
        </Suspense>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 md:mt-32">
            <h2 className="font-editorial text-2xl md:text-3xl mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
