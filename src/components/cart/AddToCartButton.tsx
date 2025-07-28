// src/components/cart/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

// Define the product type again for this component
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Get the addToCart function from our context

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="mt-4 flex items-center justify-center">
      <div className="flex items-center border border-gray-300 rounded-md">
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-lg font-bold">-</button>
        <input type="number" value={quantity} readOnly className="w-12 text-center border-l border-r border-gray-300" />
        <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-lg font-bold">+</button>
      </div>
      <button onClick={handleAddToCart} className="ml-4 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
}