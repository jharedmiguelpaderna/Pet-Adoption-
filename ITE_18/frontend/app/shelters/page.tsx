'use client';

import { SheltersPage } from '../_pages/SheltersPage';
import { Layout } from '../../components/Layout';
import { checkAuthentication, logout } from '../../utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../components/AuthPage';

export default function Shelters() {
  const router = useRouter();
  const authSnapshot = checkAuthentication();
  const [userRole, setUserRole] = useState<UserRole | null>(() => authSnapshot.user?.role ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!(authSnapshot.authenticated && authSnapshot.user));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
  }, [router, isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !userRole) {
    return null; // Will redirect to login
  }

  return (
    <Layout onLogout={handleLogout} userRole={userRole}>
      <SheltersPage />
    </Layout>
  );
}

