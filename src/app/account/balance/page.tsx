// src/app/account/balance/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';
import TransactionHistoryModal from '@/components/account/TransactionHistoryModal'; // Import the new modal

// Define the shape of our data
interface Profile {
  balance: number;
}
interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  type: string;
  description: string;
}

export default function BalancePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('balance')
          .eq('id', user.id)
          .maybeSingle(); 

        if (profileError) {
          setError(profileError.message);
          setLoading(false);
          return;
        }
        setProfile(profileData);

        const { data: transactionData, error: transactionError } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (transactionError) {
          setError(transactionError.message);
        } else {
          setRecentTransactions(transactionData);
        }

        setLoading(false);
      };

      fetchData();
    }
  }, [user, authLoading, router]);
  
  const formattedBalance = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(profile?.balance ?? 0);

  if (authLoading || loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-6">My Account</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Main Balance</h2>
            <p className="text-4xl font-bold text-green-600">{formattedBalance}</p>
            <button className="mt-4 bg-green-600 text-white font-bold py-2 px-6 rounded-md hover:bg-green-700">
              Deposit
            </button>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-green-600 font-semibold hover:underline"
              >
                View All
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {recentTransactions.length > 0 ? (
              <ul>
                {recentTransactions.map(tx => (
                  <li key={tx.id} className="flex justify-between items-center border-b py-3">
                    <div>
                      <p className="font-semibold">{tx.description}</p>
                      <p className="text-sm text-gray-500">{new Date(tx.created_at).toLocaleString()}</p>
                    </div>
                    <p className={`font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(tx.amount)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No transactions yet.</p>
            )}
          </div>
        </main>
        <Footer />
      </div>
      <TransactionHistoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}