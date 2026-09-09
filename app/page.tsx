import Hero from '@/src/components/sections/Hero';
import CollectionShowcase from '@/src/components/sections/CollectionShowcase';
import BrandStatement from '@/src/components/sections/BrandStatement';
import FeaturedProducts from '@/src/components/sections/FeaturedProducts';
import Craftsmanship from '@/src/components/sections/Craftsmanship';
import WholesaleInvitation from '@/src/components/sections/WholesaleInvitation';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CollectionShowcase />
      <BrandStatement />
      <FeaturedProducts />
      <Craftsmanship />
      <WholesaleInvitation />
    </>
  );
}
