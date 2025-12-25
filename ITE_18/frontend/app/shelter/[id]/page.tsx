'use client';

import { ShelterDetailPage } from '../../_pages/ShelterDetailPage';
import { Layout } from '../../../components/Layout';
import { getCurrentUser, logout } from '../../../utils/api';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { UserRole } from '../../../components/AuthPage';

export default function ShelterDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [userRole, setUserRole] = useState<UserRole>('adopter');

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
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
      <ShelterDetailPage id={id} />
    </Layout>
  );
}

