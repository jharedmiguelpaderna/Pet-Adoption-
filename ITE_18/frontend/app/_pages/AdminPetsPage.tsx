'use client';

import { PawPrint, Eye, Edit, Trash2, Plus, Home } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ViewPetModal } from '../../components/ViewPetModal';
import { EditPetModal } from '../../components/EditPetModal';
import { SuccessBanner } from '../../components/SuccessBanner';
import { ConfirmModal } from '../../components/ConfirmModal';
import { usePets } from '../../contexts/PetsContext';
import { Pet } from '../../data/petsData';
import { getCurrentUser, getAuthHeaders, API_ENDPOINTS } from '../../utils/api';

export function AdminPetsPage() {
  const router = useRouter();
  const { pets, updatePet, deletePet: deletePetFromContext } = usePets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [viewingPet, setViewingPet] = useState<Pet | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [changedStatuses, setChangedStatuses] = useState<{ [key: number]: 'available' | 'reserved' | 'adopted' }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [deletePetId, setDeletePetId] = useState<number | null>(null);
  const [adminShelterIds, setAdminShelterIds] = useState<number[]>([]);

  type AdminShelter = {
    shelter_id: number;
    admin_id: number;
  };

  const fetchAdminShelters = useCallback(async () => {
    try {
      const user = getCurrentUser();
      if (!user || user.role !== 'admin') return;

      const headers = getAuthHeaders();
      const sheltersResponse = await fetch(API_ENDPOINTS.shelters, { headers });
      if (!sheltersResponse.ok) return;
      
      const allShelters: AdminShelter[] = await sheltersResponse.json();
      const adminShelters = allShelters.filter(
        (shelter) => shelter.admin_id === user.user.admin_id
      );
      setAdminShelterIds(adminShelters.map((shelter) => shelter.shelter_id));
    } catch (error) {
      console.error('Error fetching admin shelters:', error);
    }
  }, []);

  useEffect(() => {
    fetchAdminShelters();
  }, [fetchAdminShelters]);

  // Filter pets - only show pets from admin's shelters
  const filteredPets = pets.filter(pet => {
    // First check if pet belongs to admin's shelters
    // If adminShelterIds is empty, show no pets (admin has no shelters yet)
    const belongsToAdminShelter = adminShelterIds.length > 0 && adminShelterIds.includes(pet.shelter_id);
    if (!belongsToAdminShelter) return false;

    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (pet.breed && pet.breed.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesSpecies = true;
    if (selectedSpecies !== 'all') {
      if (selectedSpecies === 'others') {
        matchesSpecies = !['Dog', 'Cat', 'Bird'].includes(pet.species);
      } else {
        matchesSpecies = pet.species.toLowerCase() === selectedSpecies.toLowerCase();
      }
    }
    
    const currentStatus = (changedStatuses[pet.pet_id] || pet.adoption_status)?.toLowerCase();
    const matchesStatus = selectedStatusFilter === 'all' || currentStatus === selectedStatusFilter;
    
    return matchesSearch && matchesSpecies && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'available':
        return 'bg-green-500';
      case 'reserved':
        return 'bg-yellow-500';
      case 'adopted':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStatusChange = (petId: number, newStatus: 'available' | 'reserved' | 'adopted') => {
    setChangedStatuses(prev => ({
      ...prev,
      [petId]: newStatus
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Update all pets that had status changes
      await Promise.all(
        Object.entries(changedStatuses).map(([petId, newStatus]) =>
          updatePet(Number(petId), { adoption_status: newStatus })
        )
      );
      setChangedStatuses({});
      setSuccessMessage('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving status changes:', error);
      setSuccessMessage('Failed to save some changes. Please try again.');
    }
  };

  const handleDeletePet = (petId: number) => {
    setDeletePetId(petId);
  };

  const confirmDeletePet = async () => {
    if (deletePetId !== null) {
      try {
        await deletePetFromContext(deletePetId);
        // Remove from changed statuses if exists
        setChangedStatuses(prev => {
          const updated = { ...prev };
          delete updated[deletePetId];
          return updated;
        });
        setSuccessMessage('Pet deleted successfully!');
        setDeletePetId(null);
      } catch (error) {
        console.error('Error deleting pet:', error);
        setSuccessMessage('Failed to delete pet. Please try again.');
      }
    }
  };

  const handleEditSave = async (updatedPet: Pet) => {
    try {
      // Update all fields of the pet
      await updatePet(updatedPet.pet_id, updatedPet);
      setEditingPet(null);
      setSuccessMessage('Pet information updated successfully!');
    } catch (error) {
      console.error('Error saving pet:', error);
      setSuccessMessage('Failed to save pet. Please try again.');
    }
  };

  const hasUnsavedChanges = Object.keys(changedStatuses).length > 0;

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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-['Poppins'] text-4xl text-black mb-2">Manage Pets</h1>
              <p className="font-['Poppins'] text-gray-600">View, edit, and manage all pets in the system</p>
            </div>
            <button
              onClick={() => router.push('/admin/add-pet')}
              className="flex items-center gap-2 bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white px-6 py-3 rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Add New Pet
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                suppressHydrationWarning
              />
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                suppressHydrationWarning
              >
                <option value="all">All Species</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="others">Others</option>
              </select>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                suppressHydrationWarning
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="adopted">Adopted</option>
              </select>
            </div>
          </div>

          {/* Save Changes Button */}
          {hasUnsavedChanges && (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <p className="font-['Poppins'] text-yellow-800">
                You have unsaved changes to pet statuses
              </p>
              <button
                onClick={handleSaveChanges}
                className="bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white px-6 py-2 rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300"
              >
                Save All Changes
              </button>
            </div>
          )}

          {/* Pets List */}
          <div className="space-y-4">
            {filteredPets.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                <p className="font-['Poppins'] text-gray-600">No pets found matching your criteria.</p>
              </div>
            ) : (
              filteredPets.map((pet) => {
                const currentStatus = (changedStatuses[pet.pet_id] || pet.adoption_status)?.toLowerCase();
                const hasChanged = changedStatuses[pet.pet_id] !== undefined;
                
                return (
                  <div
                    key={pet.pet_id}
                    className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:scale-[1.01] ${
                      hasChanged ? 'ring-2 ring-yellow-400' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Pet Image */}
                      <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={pet.photo_url || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='}
                          alt={pet.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 192px"
                        />
                      </div>

                      {/* Pet Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-['Poppins'] text-2xl text-black mb-1">{pet.name}</h3>
                            <p className="font-['Poppins'] text-gray-600">{pet.breed || pet.species} • {pet.species}</p>
                          </div>
                          <div className={`px-3 py-1 ${getStatusColor(currentStatus)} text-white rounded-full font-['Poppins'] text-sm`}>
                            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="font-['Poppins'] text-sm text-gray-500">Age</p>
                            <p className="font-['Poppins'] text-black">{pet.age === 0 ? 'Less than 1 year' : `${pet.age} ${pet.age === 1 ? 'year' : 'years'}`}</p>
                          </div>
                          <div>
                            <p className="font-['Poppins'] text-sm text-gray-500">Gender</p>
                            <p className="font-['Poppins'] text-black">{pet.gender}</p>
                          </div>
                          <div>
                            <p className="font-['Poppins'] text-sm text-gray-500">Shelter</p>
                            <p className="font-['Poppins'] text-black flex items-center gap-1">
                              <Home className="w-4 h-4" />
                              {pet.shelter_name || `Shelter #${pet.shelter_id}`}
                            </p>
                          </div>
                          <div>
                            <p className="font-['Poppins'] text-sm text-gray-500">Weight</p>
                            <p className="font-['Poppins'] text-black">{pet.weight} kg</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 items-center">
                          <button
                            onClick={() => setViewingPet(pet)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-blue-700 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => setEditingPet(pet)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-green-700 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePet(pet.pet_id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>

                          {/* Status Selector */}
                          <div className="flex items-center gap-2 ml-auto">
                            <label className="font-['Poppins'] text-sm text-gray-600">Change Status:</label>
                            <select
                              value={currentStatus}
                              onChange={(e) => handleStatusChange(pet.pet_id, e.target.value as 'available' | 'reserved' | 'adopted')}
                              className="px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] text-sm bg-white"
                              suppressHydrationWarning
                            >
                              <option value="available">Available</option>
                              <option value="reserved">Reserved</option>
                              <option value="adopted">Adopted</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* View Pet Modal */}
      {viewingPet && (
        <ViewPetModal
          pet={viewingPet}
          onClose={() => setViewingPet(null)}
        />
      )}

      {/* Edit Pet Modal */}
      {editingPet && (
        <EditPetModal
          pet={editingPet}
          onClose={() => setEditingPet(null)}
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
      {deletePetId !== null && (
        <ConfirmModal
          title="Delete Pet"
          message="Are you sure you want to delete this pet? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDeletePet}
          onCancel={() => setDeletePetId(null)}
          type="danger"
        />
      )}
    </div>
  );
}





