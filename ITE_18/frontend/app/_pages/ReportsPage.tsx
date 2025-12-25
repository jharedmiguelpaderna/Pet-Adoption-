'use client';

import { ArrowLeft, PawPrint, BarChart3, Activity, MapPin, CheckCircle, Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser, getAuthHeaders, API_ENDPOINTS } from '../../utils/api';
import { usePets } from '../../contexts/PetsContext';
import { Pet } from '../../data/petsData';

type ShelterSummary = {
  shelter_id: number;
  admin_id: number;
  shelter_name: string;
  location?: string | null;
  city?: string | null;
  zip_code?: string | null;
};

type AdoptionRequest = {
  pet_id: number;
  status?: string | null;
};

type VetVisit = {
  pet_id: number;
};

export function ReportsPage() {
  const router = useRouter();
  const { pets } = usePets();

  const [adminShelters, setAdminShelters] = useState<ShelterSummary[]>([]);
  const [adminPets, setAdminPets] = useState<Pet[]>([]);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>([]);
  const [vetVisits, setVetVisits] = useState<VetVisit[]>([]);

  const fetchReportData = useCallback(async () => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser || currentUser.role !== 'admin') return;

      const adminId = currentUser.user?.admin_id;
      if (!adminId) return;

      const headers = getAuthHeaders();

      // Fetch admin's shelters
      const sheltersResponse = await fetch(API_ENDPOINTS.shelters, { headers });
      const allShelters: ShelterSummary[] = await sheltersResponse.json();
      const userShelters = allShelters.filter((s) => s.admin_id === adminId);
      setAdminShelters(userShelters);

      const shelterIds = userShelters.map((s) => s.shelter_id);

      // Filter pets by admin's shelters
      const userPets = pets.filter((p: Pet) => shelterIds.includes(p.shelter_id));
      setAdminPets(userPets);

      // Fetch adoption requests for admin's pets
      const adoptionsResponse = await fetch(API_ENDPOINTS.adoptions, { headers });
      const allRequests: AdoptionRequest[] = await adoptionsResponse.json();
      const userRequests = allRequests.filter((req) => {
        const pet = pets.find((p: Pet) => p.pet_id === req.pet_id);
        return pet && shelterIds.includes(pet.shelter_id);
      });
      setAdoptionRequests(userRequests);

      // Fetch vet visits for admin's pets
      const vetResponse = await fetch(API_ENDPOINTS.vetVisits, { headers });
      const allVetVisits: VetVisit[] = await vetResponse.json();
      const petIds = userPets.map((p) => p.pet_id);
      const userVetVisits = allVetVisits.filter((v) => petIds.includes(v.pet_id));
      setVetVisits(userVetVisits);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  }, [pets]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  // Calculate stats from admin's data
  const petsSummary = {
    total: adminPets.length,
    available: adminPets.filter(p => p.adoption_status?.toLowerCase() === 'available').length,
    adopted: adminPets.filter(p => p.adoption_status?.toLowerCase() === 'adopted').length,
    reserved: adminPets.filter(p => p.adoption_status?.toLowerCase() === 'reserved').length
  };

  const totalAdoptions = adoptionRequests.filter(r => r.status?.toLowerCase() === 'approved').length;
  const totalVetVisits = vetVisits.length;

  // Prepare shelter summaries for admin's shelters
  const shelterSummaries = adminShelters.map(shelter => {
    const shelterPets = adminPets.filter(p => p.shelter_id === shelter.shelter_id);
    const shelterRequests = adoptionRequests.filter(req => {
      const pet = adminPets.find(p => p.pet_id === req.pet_id);
      return pet && pet.shelter_id === shelter.shelter_id;
    });
    const shelterVetVisits = vetVisits.filter(v => {
      const pet = adminPets.find(p => p.pet_id === v.pet_id);
      return pet && pet.shelter_id === shelter.shelter_id;
    });

    return {
      shelter: {
        shelter_id: shelter.shelter_id,
        shelter_name: shelter.shelter_name,
        location: shelter.location || `${shelter.city || ''} ${shelter.zip_code || ''}`.trim()
      },
      counts: {
        pets_total: shelterPets.length,
        pets_available: shelterPets.filter(p => p.adoption_status?.toLowerCase() === 'available').length,
        pets_reserved: shelterPets.filter(p => p.adoption_status?.toLowerCase() === 'reserved').length,
        pets_adopted: shelterPets.filter(p => p.adoption_status?.toLowerCase() === 'adopted').length,
        adoptions_total: shelterRequests.filter(r => r.status?.toLowerCase() === 'approved').length,
        vet_visits_total: shelterVetVisits.length
      }
    };
  });

  // Prepare chart data for pet status
  const petStatusData = [
    { name: 'Available', value: petsSummary.available, color: '#28a745' },
    { name: 'Adopted', value: petsSummary.adopted, color: '#fd7e14' },
    { name: 'Reserved', value: petsSummary.reserved, color: '#ffc107' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-100 rounded-full blur-2xl opacity-40"></div>

      {/* Paw Print Decorations */}
      <div className="absolute top-40 right-20 text-orange-200 opacity-20">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute bottom-40 left-20 text-orange-200 opacity-20">
        <PawPrint className="w-12 h-12" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#fd7e14] transition-colors mb-4 font-['Poppins']"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-[#fd7e14] to-[#ff9247] p-4 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-['Poppins'] text-4xl text-black">Reports & Analytics</h1>
              <p className="font-['Poppins'] text-gray-600">System performance, statistics, and insights</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid - Data from Backend APIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Pets */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-2xl">
                <PawPrint className="w-6 h-6 text-[#fd7e14]" />
              </div>
              <span className="font-['Poppins'] text-2xl text-[#fd7e14]">
                {petsSummary.total}
              </span>
            </div>
            <h3 className="font-['Poppins'] text-gray-600 mb-1">Total Pets</h3>
            <p className="font-['Poppins'] text-sm text-green-600">
              {petsSummary.available} available
            </p>
          </div>

          {/* Total Shelters */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-['Poppins'] text-2xl text-blue-600">
                {shelterSummaries.length}
              </span>
            </div>
            <h3 className="font-['Poppins'] text-gray-600 mb-1">Active Shelters</h3>
            <p className="font-['Poppins'] text-sm text-gray-500">
              Managing all pets
            </p>
          </div>

          {/* Total Adoptions */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-2xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="font-['Poppins'] text-2xl text-green-600">
                {totalAdoptions}
              </span>
            </div>
            <h3 className="font-['Poppins'] text-gray-600 mb-1">Total Adoptions</h3>
            <p className="font-['Poppins'] text-sm text-gray-500">
              Across all shelters
            </p>
          </div>

          {/* Total Vet Visits */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-2xl">
                <Stethoscope className="w-6 h-6 text-purple-600" />
              </div>
              <span className="font-['Poppins'] text-2xl text-purple-600">
                {totalVetVisits}
              </span>
            </div>
            <h3 className="font-['Poppins'] text-gray-600 mb-1">Vet Visits</h3>
            <p className="font-['Poppins'] text-sm text-gray-500">
              Total recorded
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Pet Status Distribution */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
            <h2 className="font-['Poppins'] text-2xl text-black mb-6 flex items-center gap-2">
              <PawPrint className="w-6 h-6 text-[#fd7e14]" />
              Pet Status Distribution
            </h2>
            <div className="space-y-4">
              {petStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-['Poppins'] text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${(item.value / petsSummary.total) * 100}%`,
                          backgroundColor: item.color 
                        }}
                      ></div>
                    </div>
                    <span className="font-['Poppins'] text-lg text-black w-12 text-right">{item.value}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border-2 border-orange-200">
                <span className="font-['Poppins'] text-black">Total</span>
                <span className="font-['Poppins'] text-2xl text-[#fd7e14]">{petsSummary.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shelter Performance Table - Data from Backend shelterSummary */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
          <h2 className="font-['Poppins'] text-2xl text-black mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#fd7e14]" />
            Detailed Shelter Performance
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-['Poppins'] text-gray-600">Shelter Name</th>
                  <th className="text-left py-4 px-4 font-['Poppins'] text-gray-600">Location</th>
                  <th className="text-center py-4 px-4 font-['Poppins'] text-gray-600">Total Pets</th>
                  <th className="text-center py-4 px-4 font-['Poppins'] text-gray-600">Available</th>
                  <th className="text-center py-4 px-4 font-['Poppins'] text-gray-600">Reserved</th>
                  <th className="text-center py-4 px-4 font-['Poppins'] text-gray-600">Adopted</th>
                  <th className="text-center py-4 px-4 font-['Poppins'] text-gray-600">Adoptions</th>
                  <th className="text-center py-4 px-4 font-['Poppins'] text-gray-600">Vet Visits</th>
                </tr>
              </thead>
              <tbody>
                {shelterSummaries.map((summary) => (
                  <tr key={summary.shelter.shelter_id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-['Poppins'] text-black">
                      {summary.shelter.shelter_name}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-[#fd7e14]" />
                        <span className="font-['Poppins'] text-sm">{summary.shelter.location?.split(',').pop()?.trim()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-['Poppins'] text-black">
                      {summary.counts.pets_total}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full font-['Poppins'] text-sm">
                        {summary.counts.pets_available}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-['Poppins'] text-sm">
                        {summary.counts.pets_reserved}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-[#fd7e14] rounded-full font-['Poppins'] text-sm">
                        {summary.counts.pets_adopted}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-['Poppins'] text-blue-600">
                      {summary.counts.adoptions_total}
                    </td>
                    <td className="py-4 px-4 text-center font-['Poppins'] text-purple-600">
                      {summary.counts.vet_visits_total}
                    </td>
                  </tr>
                ))}
                {/* Totals Row */}
                <tr className="border-t-2 border-gray-300 bg-gray-50">
                  <td className="py-4 px-4 font-['Poppins'] text-black">
                    <strong>TOTAL</strong>
                  </td>
                  <td className="py-4 px-4"></td>
                  <td className="py-4 px-4 text-center font-['Poppins'] text-black">
                    <strong>{shelterSummaries.reduce((sum, s) => sum + s.counts.pets_total, 0)}</strong>
                  </td>
                  <td className="py-4 px-4 text-center font-['Poppins'] text-green-700">
                    <strong>{shelterSummaries.reduce((sum, s) => sum + s.counts.pets_available, 0)}</strong>
                  </td>
                  <td className="py-4 px-4 text-center font-['Poppins'] text-yellow-700">
                    <strong>{shelterSummaries.reduce((sum, s) => sum + s.counts.pets_reserved, 0)}</strong>
                  </td>
                  <td className="py-4 px-4 text-center font-['Poppins'] text-[#fd7e14]">
                    <strong>{shelterSummaries.reduce((sum, s) => sum + s.counts.pets_adopted, 0)}</strong>
                  </td>
                  <td className="py-4 px-4 text-center font-['Poppins'] text-blue-600">
                    <strong>{totalAdoptions}</strong>
                  </td>
                  <td className="py-4 px-4 text-center font-['Poppins'] text-purple-600">
                    <strong>{totalVetVisits}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}






