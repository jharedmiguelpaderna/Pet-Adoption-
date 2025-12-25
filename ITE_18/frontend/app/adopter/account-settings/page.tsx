'use client';

import { AdopterAccountSettings } from '../../_pages/AdopterAccountSettings';
import { Layout } from '../../../components/Layout';
import { getCurrentUser, logout } from '../../../utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../../components/AuthPage';

export default function AdopterAccountSettingsPage() {
  const router = useRouter();
  const [userRole] = useState<UserRole>(() => {
    const user = getCurrentUser();
    return user?.role || 'adopter';
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/');
    }
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  return (
    <Layout onLogout={handleLogout} userRole={userRole}>
      <AdopterAccountSettings />
    </Layout>
  );
}

