'use client';

import { AdminShelterDetailPage } from '../../../_pages/AdminShelterDetailPage';
import { Layout } from '../../../../components/Layout';
import { getCurrentUser, logout } from '../../../../utils/api';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../../../components/AuthPage';

export default function AdminShelterDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
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

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <Layout onLogout={handleLogout} userRole={userRole}>
      <AdminShelterDetailPage id={id} />
    </Layout>
  );
}

