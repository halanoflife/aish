// src/hooks/useRedirectIfAuthenticated.ts
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function useRedirectIfAuthenticated(redirectPath: string = '/') {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until the authentication status is confirmed
    if (loading) {
      return;
    }

    // If a user is found, redirect them
    if (user) {
      router.push(redirectPath);
    }
  }, [user, loading, router, redirectPath]);
}