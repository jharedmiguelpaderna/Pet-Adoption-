'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CountingNumber } from '../../components/CountingNumber';
import { PawPrint, Home, Users, Calendar, BarChart3 } from 'lucide-react';
import { usePets } from '../../contexts/PetsContext';
import { getCurrentUser, getAuthHeaders, API_ENDPOINTS } from '../../utils/api';

interface Shelter {
  shelter_id: number;
  admin_id: number;
  shelter_name: string;
  location: string;
  city?: string;
  zip_code?: string;
}

interface Pet {
  pet_id: number;
  shelter_id: number;
  adoption_status: string;
}

interface AdoptionRequest {
  pet_id: number;
  adopter_id: number;
  status: string;
}

interface StatBoxProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  onClick: () => void;
}

function StatBox({ icon, label, value, color, onClick }: StatBoxProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-[#fd7e14]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-14 h-14 rounded-full ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="font-['Poppins'] text-gray-600 text-sm mb-2">{label}</p>
        <p className="font-['Poppins'] text-4xl text-black">
          <CountingNumber end={value} duration={2000} />
        </p>
      </div>
    </div>
  );
}

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function QuickActionCard({ icon, title, description, onClick }: QuickActionProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100 hover:border-[#fd7e14]"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-[#fd7e14] flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-['Poppins'] text-black mb-1">{title}</h3>
          <p className="font-['Poppins'] text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboardPage() {
  const router = useRouter();
  const { refreshPets } = usePets();

  const [stats, setStats] = useState({
    totalPets: 0,
    pendingRequests: 0,
    shelters: 0
  });

  const [reportStats, setReportStats] = useState({
    totalRequests: 0,
    shelterCount: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Initial fetch
    fetchDashboardStats();
    // Also refresh pets context to ensure latest data
    refreshPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const currentUser = getCurrentUser();
      
      if (!currentUser || currentUser.role !== 'admin') {
        return;
      }

      const adminId = currentUser.user?.admin_id;
      
      if (!adminId) {
        return;
      }

      const headers = getAuthHeaders();

      // Fetch admin's shelters
      const sheltersResponse = await fetch(API_ENDPOINTS.shelters, { headers });
      if (!sheltersResponse.ok) {
        throw new Error('Failed to fetch shelters');
      }
      const allShelters: Shelter[] = await sheltersResponse.json();
      
      const adminShelters = allShelters.filter(
        (shelter) => shelter.admin_id === adminId
      );
      
      const adminShelterIds = adminShelters.map((shelter) => shelter.shelter_id);
      
      // Fetch all pets directly from API
      const petsResponse = await fetch(API_ENDPOINTS.pets, { headers });
      if (!petsResponse.ok) {
        throw new Error('Failed to fetch pets');
      }
      const allPets: Pet[] = await petsResponse.json();
      
      // Count pets in admin's shelters
      const adminPets = allPets.filter((pet) => 
        adminShelterIds.includes(pet.shelter_id)
      );

      // Fetch adoption requests
      const adoptionsResponse = await fetch(API_ENDPOINTS.adoptions, { headers });
      if (!adoptionsResponse.ok) {
        throw new Error('Failed to fetch adoption requests');
      }
      const allRequests: AdoptionRequest[] = await adoptionsResponse.json();

      // Filter by admin's shelters
      const adminRequests = allRequests.filter((request) => {
        const pet = allPets.find((p) => p.pet_id === request.pet_id);
        return pet && adminShelterIds.includes(pet.shelter_id);
      });

      const pendingCount = adminRequests.filter(
        (request) => request.status?.toLowerCase() === 'pending'
      ).length;

      // Count unique adopters who have made requests for admin's shelters
      const uniqueAdopters = new Set(
        adminRequests.map((req) => req.adopter_id)
      );

      setStats({
        totalPets: adminPets.length,
        pendingRequests: pendingCount,
        shelters: adminShelters.length
      });

      setReportStats({
        totalRequests: adminRequests.length,
        shelterCount: adminShelters.length,
        activeUsers: uniqueAdopters.size
      });

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const quickActions = [
    {
      icon: <PawPrint className="w-6 h-6 text-white" />,
      title: 'Add New Pet',
      description: 'Register a new pet for adoption',
      onClick: () => router.push('/admin/pets')
    },
    {
      icon: <Home className="w-6 h-6 text-white" />,
      title: 'Add New Shelter',
      description: 'Register a new animal shelter',
      onClick: () => router.push('/admin/add-shelter')
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: 'Adoption Requests',
      description: 'View and manage adoption applications',
      onClick: () => router.push('/admin/adoption-requests')
    },
    {
      icon: <Calendar className="w-6 h-6 text-white" />,
      title: 'Record Vet Visits',
      description: 'Log veterinary appointments',
      onClick: () => router.push('/admin/vet-visits')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#fd7e14] to-[#ff9247] opacity-3 rounded-full blur-3xl"></div>
      
      {/* Paw Print Pattern Decorations */}
      <div className="absolute top-20 left-10 text-[#fd7e14] opacity-10">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute top-40 right-20 text-[#fd7e14] opacity-10">
        <PawPrint className="w-12 h-12" />
      </div>
      <div className="absolute bottom-40 left-1/4 text-[#fd7e14] opacity-10">
        <PawPrint className="w-20 h-20" />
      </div>
      <div className="absolute bottom-20 right-1/3 text-[#fd7e14] opacity-10">
        <PawPrint className="w-14 h-14" />
      </div>

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with decorative background */}
          <div className="mb-8 relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#fd7e14] to-transparent rounded-full"></div>
            <h1 className="font-['Poppins'] text-4xl text-black mb-2">Admin Dashboard</h1>
            <p className="font-['Poppins'] text-gray-600">Welcome back! Here&apos;s your overview.</p>
          </div>

          {/* Stats Grid with enhanced design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatBox
              icon={<PawPrint className="w-7 h-7 text-white" />}
              label="Total Pets"
              value={stats.totalPets}
              color="bg-gradient-to-br from-[#fd7e14] to-[#ff9247]"
              onClick={() => router.push('/admin/pets')}
            />
            <StatBox
              icon={<Users className="w-7 h-7 text-white" />}
              label="Pending Requests"
              value={stats.pendingRequests}
              color="bg-gradient-to-br from-[#ffc107] to-[#ffdb4d]"
              onClick={() => router.push('/admin/adoption-requests')}
            />
            <StatBox
              icon={<Home className="w-7 h-7 text-white" />}
              label="Shelters"
              value={stats.shelters}
              color="bg-gradient-to-br from-[#17a2b8] to-[#5bc0de]"
              onClick={() => router.push('/admin/shelters')}
            />
          </div>

          {/* Quick Actions with enhanced card design */}
          <div className="mb-8">
            <div className="relative mb-6">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#fd7e14] to-transparent rounded-full"></div>
              <h2 className="font-['Poppins'] text-2xl text-black">Quick Actions</h2>
              <p className="font-['Poppins'] text-gray-500 text-sm mt-1">Perform common administrative tasks</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} {...action} />
              ))}
            </div>
          </div>

          {/* Reports Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-['Poppins'] text-2xl text-black mb-1 flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-[#fd7e14]" />
                  System Reports & Analytics
                </h2>
                <p className="font-['Poppins'] text-gray-500 text-sm">
                  Monitor performance, statistics, and trends
                </p>
              </div>
              <button
                onClick={() => router.push('/admin/reports')}
                className="px-6 py-3 bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                View Full Report
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                <p className="font-['Poppins'] text-blue-600 text-sm mb-2">Adoption Statistics</p>
                <p className="font-['Poppins'] text-2xl text-black">
                  <CountingNumber end={reportStats.totalRequests} duration={2000} /> Requests
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
                <p className="font-['Poppins'] text-green-600 text-sm mb-2">Shelter Performance</p>
                <p className="font-['Poppins'] text-2xl text-black">
                  <CountingNumber end={reportStats.shelterCount} duration={2000} /> Shelters
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                <p className="font-['Poppins'] text-purple-600 text-sm mb-2">User Activity</p>
                <p className="font-['Poppins'] text-2xl text-black">
                  <CountingNumber end={reportStats.activeUsers} duration={2000} /> Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





