'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { products, type ProductCategory, type Product } from '@/src/data/products';
import ProductCard from '@/src/components/products/ProductCard';

const allCategories: (ProductCategory | 'All')[] = ['All', 'Shorts', 'Denims', 'Trousers'];

interface FlattenedProduct {
  baseProduct: Product;
  colorName: string;
  image: string;
  id: string; // Unique id combining slug and color
}

export default function CollectionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const styleParam = searchParams.get('style') || 'All';
  const searchParam = searchParams.get('q') || '';

  const [search, setSearch] = useState(searchParam);
  const activeCategory = categoryParam || 'All';
  const activeStyle = styleParam;

  // Flatten products into variants
  const allVariants = useMemo(() => {
    const variants: FlattenedProduct[] = [];
    products.forEach((p) => {
      if (p.colors && p.colors.length > 0) {
        p.colors.forEach((c) => {
          variants.push({
            baseProduct: p,
            colorName: c.name,
            image: c.image,
            id: `${p.slug}-${c.name}`,
          });
        });
      } else {
        variants.push({
          baseProduct: p,
          colorName: '',
          image: p.image,
          id: p.slug,
        });
      }
    });
    return variants;
  }, []);

  // Get available styles (base product names) for the active category
  const availableStyles = useMemo(() => {
    if (activeCategory === 'All') return [];
    const styles = new Set<string>();
    products.forEach((p) => {
      if (p.category === activeCategory) {
        styles.add(p.name);
      }
    });
    return ['All', ...Array.from(styles)];
  }, [activeCategory]);

  const filteredVariants = useMemo(() => {
    let result = allVariants;
    if (activeCategory !== 'All') {
      result = result.filter((v) => v.baseProduct.category === activeCategory);
    }
    if (activeStyle !== 'All') {
      result = result.filter((v) => v.baseProduct.name === activeStyle);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((v) => 
        v.baseProduct.name.toLowerCase().includes(q) || 
        v.colorName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allVariants, activeCategory, activeStyle, search]);

  const updateFilters = (category: string, style: string, q: string) => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    if (style && style !== 'All') params.set('style', style);
    if (q.trim()) params.set('q', q.trim());
    const qs = params.toString();
    router.push(`/collections${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    // Reset style when changing category
    updateFilters(cat, 'All', search);
  };

  const handleStyleChange = (style: string) => {
    updateFilters(activeCategory, style, search);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateFilters(activeCategory, activeStyle, value);
  };

  const clearFilters = () => {
    setSearch('');
    router.push('/collections', { scroll: false });
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 min-h-screen">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Page header */}
        <div className="mb-12 md:mb-16">
          <p className="label-sm text-taupe mb-3">Browse</p>
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl">
            Collections
          </h1>
          <p className="mt-4 text-ink/60 max-w-lg">
            Explore our range of shorts, denims and trousers — available in multiple
            colors and premium fabrics.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-6 mb-8 pb-6 border-b border-taupe/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Primary Category tabs */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 text-xs tracking-[0.1em] uppercase transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-ink text-ivory'
                      : 'bg-transparent text-ink/60 hover:text-ink border border-taupe/20 hover:border-ink/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="search"
                placeholder="Search variants…"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 pl-10 text-sm bg-transparent border border-taupe/20 focus:border-ink focus:outline-none transition-colors"
                aria-label="Search products by name or color"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>

          {/* Secondary Style Sub-filters (Animated entrance) */}
          {availableStyles.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 animate-fade-in pt-2">
              <span className="text-xs text-taupe mr-2 uppercase tracking-wider">Style:</span>
              {availableStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => handleStyleChange(style)}
                  className={`px-3 py-1.5 text-[11px] tracking-wider transition-all duration-200 rounded-full border ${
                    activeStyle === style
                      ? 'bg-ink/5 text-ink border-ink/20 font-medium'
                      : 'bg-transparent text-ink/50 hover:text-ink border-transparent hover:border-taupe/20'
                  }`}
                >
                  {style === 'All' ? 'All Styles' : style}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Result count */}
        <p className="text-sm text-ink/40 mb-6">
          {filteredVariants.length} {filteredVariants.length === 1 ? 'variant' : 'variants'}
          {activeCategory !== 'All' && ` in ${activeCategory}`}
          {activeStyle !== 'All' && ` (${activeStyle})`}
          {search.trim() && ` matching "${search.trim()}"`}
        </p>

        {/* Products grid */}
        {filteredVariants.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredVariants.map((variant) => (
              <div key={variant.id} className="animate-fade-in">
                <ProductCard 
                  product={variant.baseProduct} 
                  variantColor={variant.colorName}
                  variantImage={variant.image}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20 bg-ink/5 rounded-sm">
            <p className="text-ink/60 text-lg mb-2 font-editorial">No variants found</p>
            <p className="text-ink/40 text-sm mb-6 max-w-md mx-auto">
              {activeCategory !== 'All'
                ? `We couldn't find any ${activeCategory.toLowerCase()} matching your filters.`
                : 'Try adjusting your search terms or clearing your filters.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={clearFilters}
                className="px-6 py-2 text-xs tracking-[0.15em] uppercase border border-ink text-ink hover:bg-ink hover:text-ivory transition-colors"
              >
                Clear Filters
              </button>
              <Link
                href="/contact"
                className="px-6 py-2 text-xs tracking-[0.15em] uppercase text-ink/60 hover:text-orange transition-colors"
              >
                Enquire
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
