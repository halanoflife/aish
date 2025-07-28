// src/components/layout/ProfileModal.tsx
'use client';

import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { LogOut, X, Package, History, User, Wallet } from 'lucide-react';
import Link from 'next/link';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onClose();
    router.push('/');
    router.refresh();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center">
      <div className="bg-white w-full max-w-md mt-16 rounded-b-lg shadow-lg p-6 relative animate-slide-down">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">My Account</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/account/balance" onClick={onClose} className="flex items-center text-lg p-2 rounded-md hover:bg-gray-100">
            <Wallet size={20} className="mr-3" /> Main Balance
          </Link>
          <Link href="/account/orders" onClick={onClose} className="flex items-center text-lg p-2 rounded-md hover:bg-gray-100">
            <History size={20} className="mr-3" /> Order History
          </Link>
          <Link href="/account/custom-orders" onClick={onClose} className="flex items-center text-lg p-2 rounded-md hover:bg-gray-100">
            <User size={20} className="mr-3" /> Custom Orders
          </Link>
          <Link href="/account/track" onClick={onClose} className="flex items-center text-lg p-2 rounded-md hover:bg-gray-100">
            <Package size={20} className="mr-3" /> Track My Order
          </Link>
        </nav>
        <div className="border-t mt-6 pt-4">
          <button onClick={handleLogout} className="w-full flex items-center justify-center p-2 text-lg text-red-600 rounded-md hover:bg-red-50">
            <LogOut size={20} className="mr-3" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}