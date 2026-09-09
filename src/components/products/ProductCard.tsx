import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/src/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/collections/${product.slug}`} className="group block">
      <div className="product-image-wrap aspect-[3/4] relative bg-ink/5 mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <p className="label-sm text-taupe mb-1">{product.category}</p>
      <h3 className="text-sm md:text-base font-medium group-hover:text-orange transition-colors">
        {product.name}
      </h3>
    </Link>
  );
}
