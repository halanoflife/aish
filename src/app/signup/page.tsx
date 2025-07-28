// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRedirectIfAuthenticated } from '@/hooks/useRedirectIfAuthenticated'; // <-- Import the hook

export default function SignUpPage() {
  useRedirectIfAuthenticated(); // <-- Use the hook here

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // ... rest of the file is the same ...
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else if (data.user && data.user.identities?.length === 0) {
      setMessage('Error: This email is already in use.');
    } else {
      setMessage('Success! Please check your email to confirm your account.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">Create an Account</h1>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <button type="submit" className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Sign Up
              </button>
            </div>
          </form>
          {message && <p className="text-center text-sm text-gray-600 mt-4">{message}</p>}
          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
              Log In
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}