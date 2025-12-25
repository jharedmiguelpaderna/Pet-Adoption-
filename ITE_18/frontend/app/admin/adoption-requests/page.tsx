'use client';

import { AdoptionRequestsPage } from '../../_pages/AdoptionRequestsPage';
import { Layout } from '../../../components/Layout';
import { getCurrentUser, logout } from '../../../utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../../components/AuthPage';
import { useNotifications } from '../../../contexts/NotificationContext';

export default function AdoptionRequests() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const { refreshNotifications } = useNotifications();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
    setUserRole(user.role);
    // Immediately refresh notifications when admin navigates to this page
    refreshNotifications();
  }, [router, refreshNotifications]);

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
      <AdoptionRequestsPage />
    </Layout>
  );
}

