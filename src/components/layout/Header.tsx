// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import CartIcon from '@/components/cart/CartIcon';
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';
import ProfileModal from './ProfileModal'; // <-- Import the new modal

export default function Header() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false); // <-- Add state to control the modal

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div>
            <Link href="/" className="text-xl md:text-2xl font-bold text-gray-800">
              AISH NATURALEAF HERBS
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              
              {loading ? (
                <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-md"></div>
              ) : user ? (
                // If user is logged in, show Profile button that opens the modal
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <User size={16} className="mr-2" />
                  Profile
                </button>
              ) : (
                // If user is not logged in, show Log In and Sign Up
                <>
                  <Link href="/login">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                      Log In
                    </button>
                  </Link>
                  <Link href="/signup">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}

            </div>
            
            <Link href="/cart" aria-label="Open cart">
              <CartIcon />
            </Link>
            
          </div>
        </nav>
      </header>
      
      {/* Render the modal and pass down state and the close function */}
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}