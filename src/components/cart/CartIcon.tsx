// src/components/cart/CartIcon.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function CartIcon() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCart className="h-6 w-6 text-gray-600" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
}