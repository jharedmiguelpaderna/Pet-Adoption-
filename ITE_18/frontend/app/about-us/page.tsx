'use client';

import { AboutUsPage } from '../_pages/AboutUsPage';
import { Layout } from '../../components/Layout';
import { checkAuthentication, logout } from '../../utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../components/AuthPage';

export default function AboutUs() {
  const router = useRouter();
  const authSnapshot = checkAuthentication();
  const [userRole] = useState<UserRole | null>(authSnapshot.user?.role ?? null);
  const [isAuthenticated] = useState<boolean>(Boolean(authSnapshot.authenticated && authSnapshot.user));

  useEffect(() => {
    if (!isAuthenticated || !userRole) {
      router.push('/');
    }
  }, [isAuthenticated, userRole, router]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  if (!isAuthenticated || !userRole) {
    return null; // Will redirect to login
  }

  return (
    <Layout onLogout={handleLogout} userRole={userRole}>
      <AboutUsPage />
    </Layout>
  );
}

