export type ProductCategory = 'Shorts' | 'Denims' | 'Trousers';

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    slug: 'acid-wash-shorts',
    name: 'Acid Wash Shorts',
    category: 'Shorts',
    image: '/images/product-acid-wash-shorts.jpg',
    description:
      'Classic acid wash denim shorts with a distinctive wash pattern and quality stitching throughout.',
  },
  {
    slug: 'cargo-pocket-acid-wash-shorts',
    name: 'Cargo Pocket Acid Wash Shorts',
    category: 'Shorts',
    image: '/images/product-cargo-pocket-shorts.jpg',
    description:
      'Acid wash denim shorts featuring functional cargo pockets with secure flap closures.',
  },
  {
    slug: 'front-pocket-acid-wash-shorts',
    name: 'Front Pocket Acid Wash Shorts',
    category: 'Shorts',
    image: '/images/product-front-pocket-shorts.jpg',
    description:
      'Acid wash shorts with prominent front patch pockets, combining utility and style.',
  },
  {
    slug: 'mens-cotton-trousers',
    name: "Men's Cotton Trousers",
    category: 'Trousers',
    image: '/images/product-cotton-trousers.jpg',
    description:
      'Comfortable cotton trousers with a classic straight-leg silhouette and clean tailoring.',
  },
];

export const categories: { name: ProductCategory; image: string }[] = [
  { name: 'Shorts', image: '/images/category-shorts.jpg' },
  { name: 'Denims', image: '/images/category-denims.jpg' },
  { name: 'Trousers', image: '/images/category-trousers.jpg' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(currentSlug: string): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);
}
