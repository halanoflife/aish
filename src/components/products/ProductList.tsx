// src/components/products/ProductList.tsx

import ProductCard from './ProductCard';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}