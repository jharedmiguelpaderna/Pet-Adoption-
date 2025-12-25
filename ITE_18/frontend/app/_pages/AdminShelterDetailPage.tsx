'use client';

import { ArrowLeft, Plus, Eye, Edit, Trash2, User, MapPin, Phone, Mail } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ViewPetModal } from '../../components/ViewPetModal';
import { EditPetModal } from '../../components/EditPetModal';
import { SuccessBanner } from '../../components/SuccessBanner';
import { ConfirmModal } from '../../components/ConfirmModal';
import { API_ENDPOINTS, getAuthHeaders } from '../../utils/api';

interface Pet {
  pet_id: number;
  shelter_id: number;
  name: string;
  species: string;
  breed: string | null;
  age: number | null;
  gender: string | null;
  weight: number | null;
  health_status: string | null;
  food_preferences: string | null;
  last_vet_visit: string | null;
  next_vet_visit_due: string | null;
  adoption_status: 'available' | 'reserved' | 'adopted';
  date_admitted: string | null;
  description: string | null;
  photo_url: string | null;
  location?: string;
}

interface Shelter {
  shelter_id: number;
  admin_id: number;
  shelter_name: string;
  staff_name: string | null;
  staff_email: string | null;
  staff_phone: string | null;
  location: string | null;
  contact_info: string | null;
  description: string | null;
  image_url: string | null;
}

export function AdminShelterDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const shelterId = Number(id);
  
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [viewingPet, setViewingPet] = useState<Pet | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [deletePetId, setDeletePetId] = useState<number | null>(null);
  const [changedStatuses, setChangedStatuses] = useState<{ [key: number]: 'available' | 'reserved' | 'adopted' }>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch shelter and pets from backend
  const fetchShelterData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Fetch shelter
      const shelterResponse = await fetch(API_ENDPOINTS.shelter(shelterId), {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (shelterResponse.ok) {
        const shelterData = await shelterResponse.json();
        setShelter(shelterData);
      } else {
        // Shelter not found
        setShelter(null);
      }

      // Fetch all pets and filter by shelter
      const petsResponse = await fetch(API_ENDPOINTS.pets, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (petsResponse.ok) {
        const allPets = await petsResponse.json();
        const shelterPets = allPets.filter((pet: Pet) => pet.shelter_id === shelterId);
        setPets(shelterPets);
      }
    } catch (error) {
      console.error('Error fetching shelter data:', error);
      setSuccessMessage('Failed to load shelter data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [shelterId]);

  useEffect(() => {
    fetchShelterData();
  }, [fetchShelterData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-lg font-['Poppins']">Loading...</div>
      </div>
    );
  }

  if (!shelter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Poppins'] text-2xl text-black mb-4">Shelter not found</h1>
          <button
            onClick={() => router.push('/admin/shelters')}
            className="bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white px-6 py-3 rounded-xl font-['Poppins']"
          >
            Back to Shelters
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const normalizedStatus = status?.toLowerCase() || '';
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

  const handleSaveChanges = () => {
    setPets(prevPets => 
      prevPets.map(pet => 
        changedStatuses[pet.pet_id] 
          ? { ...pet, adoption_status: changedStatuses[pet.pet_id] }
          : pet
      )
    );
    setChangedStatuses({});
    setSuccessMessage('Changes saved successfully!');
  };

  const handleDeletePet = (petId: number) => {
    setDeletePetId(petId);
  };

  const confirmDeletePet = async () => {
    if (deletePetId !== null) {
      try {
        const response = await fetch(API_ENDPOINTS.pet(deletePetId), {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`Failed to delete pet: ${response.statusText}`);
        }

        // Remove from local state
        setPets(prevPets => prevPets.filter(pet => pet.pet_id !== deletePetId));
        setChangedStatuses(prev => {
          const updated = { ...prev };
          delete updated[deletePetId];
          return updated;
        });
        setSuccessMessage('Pet deleted successfully!');
        setDeletePetId(null);
        
        // Refresh data from backend to ensure consistency
        fetchShelterData();
      } catch (error) {
        console.error('Error deleting pet:', error);
        setSuccessMessage('Failed to delete pet. Please try again.');
      }
    }
  };

  type BackendPetUpdate = {
    name: string;
    species: string;
    breed: string | null;
    age: number | null;
    gender: string | null;
    weight: number | null;
    health_status: string | null;
    food_preferences: string | null;
    last_vet_visit: string | null;
    next_vet_visit_due: string | null;
    adoption_status: 'available' | 'reserved' | 'adopted';
    date_admitted: string | null;
    description: string | null;
    photo_url: string | null;
    shelter_id: number;
  };

  const handleEditSave = async (updatedPet: Pet) => {
    try {
      const backendData: BackendPetUpdate = {
        name: updatedPet.name,
        species: updatedPet.species,
        breed: updatedPet.breed || null,
        age: updatedPet.age || null,
        gender: updatedPet.gender || null,
        weight: updatedPet.weight || null,
        health_status: updatedPet.health_status || null,
        food_preferences: updatedPet.food_preferences || null,
        last_vet_visit: updatedPet.last_vet_visit || null,
        next_vet_visit_due: updatedPet.next_vet_visit_due || null,
        adoption_status: updatedPet.adoption_status,
        date_admitted: updatedPet.date_admitted || null,
        description: updatedPet.description || null,
        photo_url: updatedPet.photo_url || null,
        shelter_id: updatedPet.shelter_id,
      };

      const response = await fetch(API_ENDPOINTS.pet(updatedPet.pet_id), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(backendData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update pet: ${response.statusText}`);
      }

      const savedPet = await response.json();
      setPets(prevPets => 
        prevPets.map(pet => pet.pet_id === updatedPet.pet_id ? savedPet : pet)
      );
      setEditingPet(null);
      setSuccessMessage('Pet information updated successfully!');
      
      // Refresh data from backend to ensure consistency
      fetchShelterData();
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

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.push('/admin/shelters')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#fd7e14] transition-colors duration-300 font-['Poppins'] mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Manage Shelters
          </button>

          {/* Shelter Card (Adopter View Style) */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            {/* Shelter Details */}
            <div className="p-8">
              <h1 className="font-['Poppins'] text-4xl text-black mb-6">{shelter.shelter_name}</h1>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Staff Contact</p>
                    <p className="font-['Poppins'] text-black">{shelter.staff_name || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Location</p>
                    <p className="font-['Poppins'] text-black">{shelter.location || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Phone</p>
                    <p className="font-['Poppins'] text-black">{shelter.staff_phone || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Staff Email</p>
                    <p className="font-['Poppins'] text-black">{shelter.staff_email || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              {/* Additional Contact Info */}
              {shelter.contact_info && (
                <div className="bg-orange-50 rounded-2xl p-4">
                  <p className="font-['Poppins'] text-gray-700">{shelter.contact_info}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pets Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Poppins'] text-3xl text-black">
                Pets in this Shelter ({pets.length})
              </h2>
              <button
                onClick={() => router.push(`/admin/add-pet?shelter_id=${shelterId}`)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white px-6 py-3 rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Add Pet to This Shelter
              </button>
            </div>

            {/* Save Changes Banner */}
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
              {pets.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-['Poppins'] text-gray-600 mb-4">No pets in this shelter yet.</p>
                  <button
                    onClick={() => router.push(`/admin/add-pet?shelter_id=${shelterId}`)}
                    className="bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white px-6 py-3 rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300"
                  >
                    Add First Pet
                  </button>
                </div>
              ) : (
                pets.map((pet) => {
                  const currentStatus = changedStatuses[pet.pet_id] || pet.adoption_status;
                  const hasChanged = changedStatuses[pet.pet_id] !== undefined;
                  
                  return (
                    <div
                      key={pet.pet_id}
                      className={`bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:scale-[1.01] ${
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
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap gap-3 items-center">
                            <button
                              onClick={() => setViewingPet(pet)}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-blue-700 transition-colors hover:scale-105"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                            <button
                              onClick={() => setEditingPet(pet)}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-green-700 transition-colors hover:scale-105"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePet(pet.pet_id)}
                              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-['Poppins'] text-sm hover:bg-red-700 transition-colors hover:scale-105"
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





