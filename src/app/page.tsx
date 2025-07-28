// src/app/page.tsx

import Header from '@/components/layout/Header';
import HeroSlideshow from '@/components/homepage/HeroSlideshow';
import ProductList from '@/components/products/ProductList';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const products = [
    { id: 1, name: 'Eda', price: 500.00, imageUrl: '/images/eda.jpg' },
    { id: 2, name: 'Sperm booster', price: 300.00, imageUrl: '/images/sperm-booster.jpg' },
    { id: 3, name: 'Infection flusher', price: 100.00, imageUrl: '/images/infection-flusher.jpg' }
  ];

  return (
    <div>
      <Header />

      <main>
        <HeroSlideshow />

        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <ProductList products={products} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}