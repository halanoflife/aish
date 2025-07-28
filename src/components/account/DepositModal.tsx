// src/components/account/DepositModal.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { X } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepositSuccess: () => void;
}

export default function DepositModal({ isOpen, onClose, onDepositSuccess }: DepositModalProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      setMessage('Please enter a valid amount.');
      setLoading(false);
      return;
    }

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('deposit-funds', {
      body: { amount: depositAmount },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Deposit successful!');
      onDepositSuccess(); // Refresh the balance page data
      setTimeout(() => {
        onClose(); // Close modal after a short delay
      }, 1500);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative animate-slide-down">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Deposit Funds</h2>
        <p className="mb-6 text-gray-600">Enter the amount you wish to add to your balance.</p>
        
        <form onSubmit={handleDeposit}>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (NGN)</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 5000"
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Confirm Deposit'}
          </button>
        </form>

        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </div>
    </div>
  );
}