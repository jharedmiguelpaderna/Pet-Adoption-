'use client';

import { ReportsPage } from '../../_pages/ReportsPage';
import { Layout } from '../../../components/Layout';
import { getCurrentUser, logout } from '../../../utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../../components/AuthPage';

export default function Reports() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>('admin');

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
    setUserRole(user.role);
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
      <ReportsPage />
    </Layout>
  );
}

