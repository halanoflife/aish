// src/components/account/TransactionHistoryModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  type: string;
  description: string;
}

interface TransactionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

export default function TransactionHistoryModal({ isOpen, onClose }: TransactionHistoryModalProps) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      const fetchTransactions = async () => {
        setLoading(true);
        const from = page * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        const { data, error, count } = await supabase
          .from('transactions')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .range(from, to);

        if (data) setTransactions(data);
        if (count) setCount(count);
        setLoading(false);
      };
      fetchTransactions();
    }
  }, [user, isOpen, page]);

  if (!isOpen) return null;

  const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative animate-slide-down">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Full Transaction History</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : transactions.length > 0 ? (
          <ul>
            {transactions.map(tx => (
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
          <p className="text-gray-500">No transactions found.</p>
        )}

        <div className="flex justify-between items-center mt-6">
          <button 
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="flex items-center px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            <ChevronLeft size={20} className="mr-2" /> Prev
          </button>
          <span>Page {page + 1} of {totalPages}</span>
          <button
            onClick={() => setPage(p => (p + 1 < totalPages ? p + 1 : p))}
            disabled={page + 1 >= totalPages}
            className="flex items-center px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Next <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}