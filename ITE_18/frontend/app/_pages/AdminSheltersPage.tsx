'use client';

import { Eye, Edit, Trash2, Plus, MapPin, Phone, Mail, User, PawPrint } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { EditShelterModal } from '../../components/EditShelterModal';
import { SuccessBanner } from '../../components/SuccessBanner';
import { ConfirmModal } from '../../components/ConfirmModal';
import { API_ENDPOINTS, getAuthHeaders, USE_MOCK_API, getCurrentUser } from '../../utils/api';
import { usePets } from '../../contexts/PetsContext';

interface Shelter {
  shelter_id: number;
  admin_id: number;
  shelter_name: string;
  staff_name: string | null;
  staff_email: string | null;
  staff_phone: string | null;
  location: string | null;
  contact_info: string | null;
  description?: string | null;
  image_url?: string | null;
  pet_count?: number;
}

type BackendShelter = Shelter & {
  pets?: { pet_id: number }[];
};

type ShelterUpdatePayload = {
  admin_id: number;
  shelter_name: string;
  staff_name: string | null;
  staff_email: string | null;
  staff_phone: string | null;
  location: string | null;
  contact_info: string | null;
};

const initialShelters: Shelter[] = [
  {
    shelter_id: 1,
    admin_id: 1,
    shelter_name: 'Happy Paws Animal Shelter',
    staff_name: 'Sarah Martinez',
    staff_email: 'sarah.martinez@happypaws.org',
    staff_phone: '(415) 555-0123',
    location: '123 Bay Street, San Francisco, CA 94102',
    contact_info: 'contact@happypaws.org',
    description: 'Happy Paws Animal Shelter has been serving the Bay Area community since 1998. We are dedicated to rescuing, rehabilitating, and rehoming abandoned and neglected pets.',
    image_url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    pet_count: 15
  },
  {
    shelter_id: 2,
    admin_id: 1,
    shelter_name: 'Loving Hearts Rescue',
    staff_name: 'Michael Chen',
    staff_email: 'michael.chen@lovinghearts.org',
    staff_phone: '(213) 555-0456',
    location: '456 Hope Avenue, Los Angeles, CA 90012',
    contact_info: 'info@lovinghearts.org',
    description: 'Loving Hearts Rescue is committed to giving every animal a second chance at life. Founded in 2005, we focus on rescuing animals from high-kill shelters and providing them with medical care and love.',
    image_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    pet_count: 23
  },
  {
    shelter_id: 3,
    admin_id: 1,
    shelter_name: 'Safe Haven Pet Sanctuary',
    staff_name: 'Emily Rodriguez',
    staff_email: 'emily@safehaven.com',
    staff_phone: '(555) 345-6789',
    location: '789 Pine Road, Seattle, WA 98101',
    contact_info: 'contact@safehaven.com',
    description: 'Safe Haven Pet Sanctuary provides a safe and loving environment for animals in need. We specialize in caring for senior pets and those with special needs.',
    image_url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    pet_count: 8
  }
];

export function AdminSheltersPage() {
  const router = useRouter();
  const { pets } = usePets();
  const [shelters, setShelters] = useState<Shelter[]>(initialShelters);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingShelter, setEditingShelter] = useState<Shelter | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteShelterId, setDeleteShelterId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [shelterPetCounts, setShelterPetCounts] = useState<{ [key: number]: number }>({});

  // Set mounted flag on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate pet count for each shelter whenever pets change
  useEffect(() => {
    const counts: { [key: number]: number } = {};
    shelters.forEach(shelter => {
      const petCount = pets.filter(pet => pet.shelter_id === shelter.shelter_id).length;
      counts[shelter.shelter_id] = petCount;
    });
    setShelterPetCounts(counts);
  }, [pets, shelters]);

  // Function to fetch shelters from backend
  const fetchShelters = useCallback(async () => {
    if (!USE_MOCK_API) {
      try {
        const response = await fetch(API_ENDPOINTS.shelters, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (response.ok) {
          const fetchedShelters: BackendShelter[] = await response.json();
          
          // Get current admin ID
          const currentUser = getCurrentUser();
          const adminId = currentUser?.user?.admin_id || currentUser?.user?.id;
          
          // Filter to only show admin's shelters
          const adminShelters = fetchedShelters.filter((shelter) => shelter.admin_id === adminId);
          
          // Map backend data to frontend format
          const formattedShelters: Shelter[] = adminShelters.map((shelter) => ({
            shelter_id: shelter.shelter_id,
            admin_id: shelter.admin_id,
            shelter_name: shelter.shelter_name,
            staff_name: shelter.staff_name,
            staff_email: shelter.staff_email,
            staff_phone: shelter.staff_phone,
            location: shelter.location,
            contact_info: shelter.contact_info,
            description: shelter.description || null,
            image_url: shelter.image_url || null,
            pet_count: shelter.pets ? shelter.pets.length : 0,
          }));
          setShelters(formattedShelters);
        } else {
          console.error('Failed to fetch shelters:', response.statusText);
          // Keep initial shelters on error
        }
      } catch (error) {
        console.error('Error fetching shelters:', error);
        // Keep initial shelters on error
      } finally {
        setIsLoading(false);
      }
    } else {
      // Mock mode - use initial shelters
      setIsLoading(false);
    }
  }, []);

  // Fetch shelters from backend on mount
  useEffect(() => {
    fetchShelters();
  }, [fetchShelters]);

  // Refresh shelters when window regains focus (e.g., returning from AddShelterPage)
  useEffect(() => {
    const handleFocus = () => {
      if (!USE_MOCK_API) {
        fetchShelters();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [fetchShelters]);

  // Filter shelters
  const filteredShelters = shelters.filter(shelter => {
    const matchesSearch = shelter.shelter_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (shelter.location && shelter.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (shelter.staff_name && shelter.staff_name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  const handleDeleteShelter = (shelterId: number) => {
    setDeleteShelterId(shelterId);
  };

  const confirmDeleteShelter = async () => {
    if (deleteShelterId !== null) {
      try {
        if (!USE_MOCK_API) {
          const response = await fetch(API_ENDPOINTS.shelter(deleteShelterId), {
            method: 'DELETE',
            headers: getAuthHeaders(),
          });

          if (!response.ok) {
            throw new Error(`Failed to delete shelter: ${response.statusText}`);
          }
        }

        // Remove from local state
        setShelters(prevShelters => prevShelters.filter(shelter => shelter.shelter_id !== deleteShelterId));
        setSuccessMessage('Shelter deleted successfully!');
        setDeleteShelterId(null);
        
        // Refresh the list from backend to ensure sync
        if (!USE_MOCK_API) {
          try {
            const response = await fetch(API_ENDPOINTS.shelters, {
              method: 'GET',
              headers: getAuthHeaders(),
            });
            if (response.ok) {
              const fetchedShelters: BackendShelter[] = await response.json();
              const formattedShelters: Shelter[] = fetchedShelters.map((shelter) => ({
                shelter_id: shelter.shelter_id,
                admin_id: shelter.admin_id,
                shelter_name: shelter.shelter_name,
                staff_name: shelter.staff_name,
                staff_email: shelter.staff_email,
                staff_phone: shelter.staff_phone,
                location: shelter.location,
                contact_info: shelter.contact_info,
                description: shelter.description || null,
                image_url: shelter.image_url || null,
                pet_count: shelter.pets ? shelter.pets.length : 0,
              }));
              setShelters(formattedShelters);
            }
          } catch (error) {
            console.error('Error refreshing shelters:', error);
          }
        }
      } catch (error) {
        console.error('Error deleting shelter:', error);
        setSuccessMessage('Failed to delete shelter. Please try again.');
      }
    }
  };

  const handleEditSave = async (updatedShelter: Shelter) => {
    try {
      if (!USE_MOCK_API) {
        const backendData: ShelterUpdatePayload = {
          admin_id: updatedShelter.admin_id,
          shelter_name: updatedShelter.shelter_name,
          staff_name: updatedShelter.staff_name || null,
          staff_email: updatedShelter.staff_email || null,
          staff_phone: updatedShelter.staff_phone || null,
          location: updatedShelter.location || null,
          contact_info: updatedShelter.contact_info || null,
        };

        const response = await fetch(API_ENDPOINTS.shelter(updatedShelter.shelter_id), {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(backendData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update shelter: ${response.statusText}`);
        }

        const savedShelter = await response.json();
        // Format the saved shelter to match frontend format
        const formattedShelter: Shelter = {
          shelter_id: savedShelter.shelter_id,
          admin_id: savedShelter.admin_id,
          shelter_name: savedShelter.shelter_name,
          staff_name: savedShelter.staff_name,
          staff_email: savedShelter.staff_email,
          staff_phone: savedShelter.staff_phone,
          location: savedShelter.location,
          contact_info: savedShelter.contact_info,
          description: savedShelter.description || null,
          image_url: savedShelter.image_url || null,
          pet_count: savedShelter.pets ? savedShelter.pets.length : 0,
        };
        setShelters(prevShelters => 
          prevShelters.map(shelter => shelter.shelter_id === updatedShelter.shelter_id ? formattedShelter : shelter)
        );
        // Refresh from backend to ensure consistency
        fetchShelters();
      } else {
        setShelters(prevShelters => 
          prevShelters.map(shelter => shelter.shelter_id === updatedShelter.shelter_id ? updatedShelter : shelter)
        );
      }
      setEditingShelter(null);
      setSuccessMessage('Shelter information updated successfully!');
    } catch (error) {
      console.error('Error saving shelter:', error);
      setSuccessMessage('Failed to save shelter. Please try again.');
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-lg font-['Poppins']">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#fd7e14] to-[#ff9247] opacity-3 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Paw Print Pattern Decorations */}
      <div className="absolute top-20 left-10 text-[#fd7e14] opacity-10 pointer-events-none">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute top-40 right-20 text-[#fd7e14] opacity-10 pointer-events-none">
        <PawPrint className="w-12 h-12" />
      </div>
      <div className="absolute bottom-40 left-1/4 text-[#fd7e14] opacity-10 pointer-events-none">
        <PawPrint className="w-20 h-20" />
      </div>

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header Section - Clean White Design */}
          <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="font-['Poppins'] text-black mb-2">Manage Shelters</h1>
                <p className="font-['Poppins'] text-gray-600">
                  View, edit, and manage all shelters in the system
                </p>
              </div>
              <button
                onClick={() => router.push('/admin/add-shelter')}
                className="flex items-center gap-2 bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white px-6 py-3 rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300 hover:scale-105"
                suppressHydrationWarning
              >
                <Plus className="w-5 h-5" />
                Add New Shelter
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search shelters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
              />
            </div>
          </div>

          {/* Shelters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              <div className="col-span-2 bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="font-['Poppins'] text-gray-600">Loading shelters...</p>
              </div>
            ) : filteredShelters.length === 0 ? (
              <div className="col-span-2 bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="font-['Poppins'] text-gray-600">No shelters found matching your criteria.</p>
              </div>
            ) : (
              filteredShelters.map((shelter) => (
                <div
                  key={shelter.shelter_id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02]"
                >
                  {/* Shelter Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-['Poppins'] text-2xl text-black">
                        {shelter.shelter_name}
                      </h2>
                      {/* Pet Count Badge */}
                      <div className="bg-[#fd7e14]/10 px-3 py-1 rounded-full">
                        <p className="font-['Poppins'] text-sm text-[#fd7e14]">{shelterPetCounts[shelter.shelter_id] || 0} pets</p>
                      </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div className="grid grid-cols-1 gap-3 pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <User className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-['Poppins'] text-sm text-gray-500">Staff Contact</p>
                          <p className="font-['Poppins'] text-sm text-gray-700">{shelter.staff_name || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-['Poppins'] text-sm text-gray-500">Location</p>
                          <p className="font-['Poppins'] text-sm text-gray-700">{shelter.location || 'Not specified'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Phone className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-['Poppins'] text-sm text-gray-500">Phone</p>
                          <p className="font-['Poppins'] text-sm text-gray-700">{shelter.staff_phone || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Mail className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-['Poppins'] text-sm text-gray-500">Shelter Email</p>
                          <p className="font-['Poppins'] text-sm text-gray-700">{shelter.contact_info || 'Not specified'}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Mail className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-['Poppins'] text-sm text-gray-500">Staff Email</p>
                          <p className="font-['Poppins'] text-sm text-gray-700">{shelter.staff_email || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-4">
                      <button
                        onClick={() => router.push(`/admin/shelter/${shelter.shelter_id}`)}
                        className="w-full py-3 bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                        suppressHydrationWarning
                      >
                        <Eye className="w-4 h-4" />
                        View Shelter Details
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setEditingShelter(shelter)}
                          className="py-2 bg-green-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2 hover:scale-105"
                          suppressHydrationWarning
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteShelter(shelter.shelter_id)}
                          className="py-2 bg-red-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 hover:scale-105"
                          suppressHydrationWarning
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Shelter Modal */}
      {editingShelter && (
        <EditShelterModal
          shelter={editingShelter}
          onClose={() => setEditingShelter(null)}
          onSave={handleEditSave}
        />
      )}

      {/* Success Banner */}
      {successMessage && (
        <SuccessBanner
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}

      {/* Confirm Delete Modal */}
      {deleteShelterId !== null && (
        <ConfirmModal
          title="Delete Shelter"
          message="Are you sure you want to delete this shelter? This action cannot be undone and may affect associated pets."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDeleteShelter}
          onCancel={() => setDeleteShelterId(null)}
          type="danger"
        />
      )}
    </div>
  );
}





