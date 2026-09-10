'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { type Product } from '@/src/data/products';
import { siteConfig } from '@/src/config/site';

export default function ProductDetailClient({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const initialColor = searchParams.get('color');
  
  const initialIdx = product.colors 
    ? Math.max(0, product.colors.findIndex(c => c.name.toLowerCase() === initialColor?.toLowerCase()))
    : 0;

  const [activeColorIdx, setActiveColorIdx] = useState(initialIdx);
  const [activeSize, setActiveSize] = useState<string>('');

  // Update if URL changes without unmounting
  useEffect(() => {
    if (initialColor && product.colors) {
      const idx = product.colors.findIndex(c => c.name.toLowerCase() === initialColor.toLowerCase());
      if (idx !== -1) setActiveColorIdx(idx);
    }
  }, [initialColor, product.colors]);

  const currentImage = product.colors && product.colors.length > 0 
    ? product.colors[activeColorIdx].image 
    : product.image;

  const currentColorName = product.colors && product.colors.length > 0 
    ? product.colors[activeColorIdx].name 
    : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Left: Image */}
      <div className="aspect-[3/4] relative bg-ink/5 overflow-hidden">
        <Image
          key={currentImage} // Force re-render for fade transition if added later
          src={currentImage}
          alt={`${product.name} ${currentColorName ? `- ${currentColorName}` : ''}`}
          fill
          priority
          className="object-cover animate-fade-in"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {/* Right: Details */}
      <div className="flex flex-col justify-center">
        <p className="label-sm text-taupe mb-3">{product.category}</p>
        <h1 className="font-editorial text-3xl md:text-4xl lg:text-5xl mb-6">
          {product.name}
        </h1>
        <p className="text-ink/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
          {product.description}
        </p>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium">Color:</span>
              <span className="text-sm text-ink/60">{currentColorName}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setActiveColorIdx(idx)}
                  className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${
                    activeColorIdx === idx ? 'border-ink scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  aria-label={`Select ${color.name}`}
                  title={color.name}
                >
                  <span
                    className="block w-full h-full rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium">Available Sizes:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setActiveSize(size)}
                  className={`min-w-[3rem] h-10 px-3 border flex items-center justify-center text-sm transition-colors ${
                    activeSize === size
                      ? 'bg-ink text-ivory border-ink'
                      : 'border-ink/20 text-ink/70 hover:border-ink hover:text-ink'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fabric Info */}
        {product.fabric && (
          <div className="mb-8 p-5 bg-ink/5 border border-ink/10">
            <h3 className="text-sm font-medium mb-4 uppercase tracking-widest text-ink/80">About the fabric</h3>
            <ul className="space-y-3 text-sm text-ink/70">
              <li className="flex gap-2">
                <span className="font-medium text-ink min-w-[120px]">Composition:</span>
                <span>{product.fabric.composition}</span>
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-ink min-w-[120px]">Pattern:</span>
                <span>{product.fabric.pattern}</span>
              </li>
            </ul>
          </div>
        )}

        <div className="divider mb-8" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}&color=${encodeURIComponent(currentColorName)}`}
            className="inline-flex items-center justify-center px-7 py-3 bg-ink text-ivory text-xs tracking-[0.15em] uppercase hover:bg-orange transition-colors"
          >
            Enquire About This Product
          </Link>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center justify-center px-7 py-3 border border-ink text-ink text-xs tracking-[0.15em] uppercase hover:bg-ink hover:text-ivory transition-colors"
          >
            Call {siteConfig.phoneDisplay}
          </a>
        </div>

        <div className="mt-8 p-4 border border-taupe/15">
          <p className="text-xs text-ink/40 leading-relaxed">
            For sizing, materials and wholesale pricing, please contact us
            directly. We&apos;re happy to discuss your requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
