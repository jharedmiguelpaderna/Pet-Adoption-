'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AuthPage } from '../components/AuthPage';
import { checkAuthentication } from '../utils/api';
import type { UserRole } from '../components/AuthPage';

export default function Home() {
  const router = useRouter();

  // Check authentication immediately
  const { authenticated, user } = useMemo(() => checkAuthentication(), []);

  useEffect(() => {
    if (authenticated && user) {
      // User is authenticated, redirect both roles to the shared Home landing page
      router.replace('/home');
    }
  }, [authenticated, user, router]);

  const handleAuthSuccess = (role: UserRole) => {
    // After successful login, always send both admin and adopter to Home
    // Role is still used elsewhere (Layout, protected routes) via auth state
    void role; // suppress unused variable lint
    router.push('/home');
  };

  // If authenticated, show nothing (will redirect)
  if (authenticated && user) {
    return null;
  }

  return <AuthPage onAuthSuccess={handleAuthSuccess} />;
}
