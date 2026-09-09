'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { products, type ProductCategory } from '@/src/data/products';
import ProductCard from '@/src/components/products/ProductCard';

const allCategories: (ProductCategory | 'All')[] = ['All', 'Shorts', 'Denims', 'Trousers'];

export default function CollectionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const searchParam = searchParams.get('q') || '';

  const [search, setSearch] = useState(searchParam);
  const activeCategory = categoryParam || 'All';

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, search]);

  const updateFilters = (category: string, q: string) => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.set('category', category);
    if (q.trim()) params.set('q', q.trim());
    const qs = params.toString();
    router.push(`/collections${qs ? `?${qs}` : ''}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    updateFilters(cat, search);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateFilters(activeCategory, value);
  };

  const clearFilters = () => {
    setSearch('');
    router.push('/collections', { scroll: false });
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Page header */}
        <div className="mb-12 md:mb-16">
          <p className="label-sm text-taupe mb-3">Browse</p>
          <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl">
            Collections
          </h1>
          <p className="mt-4 text-ink/60 max-w-lg">
            Explore our range of shorts, denims and trousers — each designed and
            manufactured with care at our facility in Sri Lanka.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-taupe/15">
          {/* Category tabs */}
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
                    : 'bg-transparent text-ink/60 hover:text-ink border border-taupe/20'
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
              placeholder="Search products…"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 pl-10 text-sm bg-transparent border border-taupe/20 focus:border-ink focus:outline-none transition-colors"
              aria-label="Search products by name"
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

        {/* Result count */}
        <p className="text-sm text-ink/40 mb-6">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          {activeCategory !== 'All' && ` in ${activeCategory}`}
          {search.trim() && ` matching "${search.trim()}"`}
        </p>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <p className="text-ink/40 text-lg mb-2">No products found</p>
            <p className="text-ink/30 text-sm mb-6">
              {activeCategory !== 'All'
                ? `We don't have any ${activeCategory.toLowerCase()} matching your search yet.`
                : 'Try adjusting your search term.'}
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
                Enquire About Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
