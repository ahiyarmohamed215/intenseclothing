export type ProductCategory = 'Shorts' | 'Denims' | 'Trousers';

export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface ProductFabric {
  composition: string;
  pattern: string;
}

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  image: string;
  description: string;
  fabric?: ProductFabric;
  colors?: ProductColor[];
  sizes?: string[];
}

export const products: Product[] = [
  {
    slug: 'acid-wash-shorts',
    name: 'Acid Wash Shorts',
    category: 'Shorts',
    image: '/images/acid_shorts_black_1789051586254.jpg',
    description:
      'Classic acid wash denim shorts with a distinctive wash pattern and quality stitching throughout.',
    fabric: {
      composition: '80% cotton, 18% Polyester, 2% Spandex',
      pattern: 'Solid denim fabric',
    },
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Black', hex: '#222222', image: '/images/acid_shorts_black_1789051586254.jpg' },
      { name: 'Blue', hex: '#4A6FA5', image: '/images/acid_shorts_blue_1789051604617.jpg' },
    ],
  },
  {
    slug: 'cargo-pocket-acid-wash-shorts',
    name: 'Cargo Pocket Acid Wash Shorts',
    category: 'Shorts',
    image: '/images/cargo_shorts_black_1789051623867.jpg',
    description:
      'Acid wash denim shorts featuring functional cargo pockets with secure flap closures.',
    fabric: {
      composition: '80% cotton, 18% Polyester, 2% Spandex',
      pattern: 'Solid denim fabric',
    },
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Black', hex: '#222222', image: '/images/cargo_shorts_black_1789051623867.jpg' },
      { name: 'Blue', hex: '#4A6FA5', image: '/images/cargo_shorts_blue_1789051638874.jpg' },
    ],
  },
  {
    slug: 'front-pocket-acid-wash-shorts',
    name: 'Front Pocket Acid Wash Shorts',
    category: 'Shorts',
    image: '/images/front_shorts_black_1789051660749.jpg',
    description:
      'Acid wash shorts with prominent front patch pockets, combining utility and style.',
    fabric: {
      composition: '80% cotton, 18% Polyester, 2% Spandex',
      pattern: 'Solid denim fabric',
    },
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Black', hex: '#222222', image: '/images/front_shorts_black_1789051660749.jpg' },
      { name: 'Blue', hex: '#4A6FA5', image: '/images/front_shorts_blue_1789051678768.jpg' },
    ],
  },
  {
    slug: 'mens-cotton-trousers',
    name: "Men's Cotton Trousers",
    category: 'Trousers',
    image: '/images/trousers_black_1789049702283.jpg',
    description:
      'Comfortable cotton trousers with a classic straight-leg silhouette and clean tailoring.',
    fabric: {
      composition: '99% cotton, 2% spandex',
      pattern: 'Solid',
    },
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Black', hex: '#1C1C1C', image: '/images/trousers_black_1789049702283.jpg' },
      { name: 'Blue', hex: '#1A2F4B', image: '/images/trousers_blue_1789049728499.jpg' },
      { name: 'Dark Brown', hex: '#3B291D', image: '/images/trousers_dark_brown_1789049768676.jpg' },
      { name: 'Forest Brown', hex: '#4B3621', image: '/images/trousers_forest_brown_1789051557723.jpg' },
      { name: 'Olive Green', hex: '#555D3B', image: '/images/trousers_olive_green_1789051572770.jpg' },
    ],
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
