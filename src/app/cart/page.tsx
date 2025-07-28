// src/app/cart/page.tsx
'use client';
import Image from 'next/image'; // <-- Import Image
import { useCart } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const formattedSubtotal = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(subtotal);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-gray-600">Your cart is empty.</p>
            <Link href="/" className="mt-4 inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-md hover:bg-green-700">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center border-b py-4">
                  {/* Use the optimized Image component */}
                  <Image src={`https://placehold.co/100x100?text=${item.name.replace(' ', '\\n')}`} alt={item.name} width={100} height={100} className="w-24 h-24 object-cover rounded-md" />
                  {/* ... rest of the component is the same ... */}
                  <div className="flex-grow ml-4">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-gray-600">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price)}</p>
                  </div>
                  <div className="text-center"><p>Quantity</p><p className="font-bold">{item.quantity}</p></div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p>Subtotal</p>
                    <p className="font-bold">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price * item.quantity)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 mt-2" aria-label={`Remove ${item.name}`}><Trash2 size={20} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg h-fit">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2"><span>Subtotal</span><span>{formattedSubtotal}</span></div>
              <div className="flex justify-between mb-4"><span>Shipping</span><span>Calculated at next step</span></div>
              <div className="border-t pt-4 flex justify-between font-bold text-xl"><span>Total</span><span>{formattedSubtotal}</span></div>
              <button className="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}