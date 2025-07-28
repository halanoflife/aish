// src/components/products/ProductCard.tsx
import Image from 'next/image'; // <-- Import Image
import AddToCartButton from '@/components/cart/AddToCartButton';

type Product = { id: number; name: string; price: number; imageUrl: string; };

export default function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price);

  return (
    <div className="border rounded-lg p-4 shadow-lg text-center">
      {/* Use the optimized Image component */}
      <Image src={`https://placehold.co/400x400?text=${product.name.replace(' ', '\\n')}`} alt={product.name} width={400} height={400} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h3 className="text-xl font-bold">{product.name}</h3>
      <p className="text-lg text-gray-700 mt-2">{formattedPrice}</p>
      <AddToCartButton product={product} />
    </div>
  );
}