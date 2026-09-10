import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/src/data/products';

interface ProductCardProps {
  product: Product;
  variantColor?: string;
  variantImage?: string;
}

export default function ProductCard({ product, variantColor, variantImage }: ProductCardProps) {
  const imageUrl = variantImage || product.image;
  const title = variantColor ? `${product.name} - ${variantColor}` : product.name;
  const url = variantColor 
    ? `/collections/${product.slug}?color=${encodeURIComponent(variantColor)}` 
    : `/collections/${product.slug}`;

  return (
    <Link href={url} className="group block">
      <div className="product-image-wrap aspect-[3/4] relative bg-ink/5 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <p className="label-sm text-taupe mb-1">{product.category}</p>
      <h3 className="text-sm md:text-base font-medium group-hover:text-orange transition-colors">
        {title}
      </h3>
    </Link>
  );
}
