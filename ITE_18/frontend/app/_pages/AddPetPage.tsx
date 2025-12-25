'use client';

import { ArrowLeft, Save, PawPrint, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SuccessBanner } from '../../components/SuccessBanner';
import { API_ENDPOINTS, getAuthHeaders, USE_MOCK_API, getCurrentUser } from '../../utils/api';
import { usePets } from '../../contexts/PetsContext';

interface Shelter {
  shelter_id: number;
  shelter_name: string;
  name?: string;
  admin_id: number;
}

interface PetFormData {
  shelter_id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  weight: number;
  health_status: string;
  food_preferences: string;
  last_vet_visit: string;
  next_vet_visit_due: string;
  adoption_status: 'available' | 'reserved' | 'adopted';
  date_admitted: string;
  description: string;
  photo_url: string;
}

export function AddPetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  
  // Get shelter_id from query params if coming from shelter detail page
  const initialShelterId = searchParams?.get('shelter_id');

  useEffect(() => {
    fetchAdminShelters();
  }, []);

  const fetchAdminShelters = async () => {
    try {
      const currentUser = getCurrentUser();
      console.log('AddPet: Current user:', currentUser);
      
      if (!currentUser || currentUser.role !== 'admin') {
        console.log('AddPet: Not an admin user');
        return;
      }

      const adminId = currentUser.user?.admin_id;
      console.log('AddPet: Admin ID:', adminId);
      
      if (!adminId) {
        console.log('AddPet: No admin_id found');
        return;
      }

      const headers = getAuthHeaders();
      const response = await fetch(API_ENDPOINTS.shelters, { headers });
      
      if (!response.ok) {
        console.log('AddPet: Failed to fetch shelters:', response.status);
        return;
      }

      const allShelters = await response.json();
      console.log('AddPet: All shelters:', allShelters);
      
      const userShelters = allShelters.filter((s: Shelter) => s.admin_id === adminId);
      console.log('AddPet: User shelters:', userShelters);
      
      setShelters(userShelters);
    } catch (error) {
      console.error('Error fetching admin shelters:', error);
    }
  };

  const createInitialForm = useCallback((): PetFormData => ({
    shelter_id: initialShelterId ? Number(initialShelterId) : (shelters[0]?.shelter_id || 0),
    name: '',
    species: 'Dog',
    breed: '',
    age: 0,
    gender: 'Male',
    weight: 0,
    health_status: 'Excellent',
    food_preferences: '',
    last_vet_visit: '',
    next_vet_visit_due: '',
    // New pets must start as available
    adoption_status: 'available',
    date_admitted: '',
    description: '',
    photo_url: ''
  }), [initialShelterId, shelters]);

  const [formData, setFormData] = useState<PetFormData>(() => createInitialForm());
  const [initialSnapshot, setInitialSnapshot] = useState<PetFormData>(() => createInitialForm());

  // Update shelter_id when shelters are loaded
  useEffect(() => {
    if (shelters.length > 0 && formData.shelter_id === 0) {
      const defaultShelterId = initialShelterId ? Number(initialShelterId) : shelters[0].shelter_id;
      setFormData(prev => ({ ...prev, shelter_id: defaultShelterId }));
      setInitialSnapshot(prev => ({ ...prev, shelter_id: defaultShelterId }));
    }
  }, [shelters, initialShelterId, formData.shelter_id]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(formData) !== JSON.stringify(initialSnapshot);
  }, [formData, initialSnapshot]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'age' || name === 'weight' || name === 'shelter_id') {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePhotoFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({
          ...prev,
          photo_url: result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo_url: ''
    }));
  };

  const { addPet, refreshPets } = usePets();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasChanges) {
      return;
    }
    
    try {
      const backendData: Record<string, string | number | null> = {
        shelter_id: formData.shelter_id,
        name: formData.name,
        species: formData.species,
        breed: formData.breed || null,
        age: formData.age || null,
        gender: formData.gender || null,
        weight: formData.weight || null,
        health_status: formData.health_status || null,
        food_preferences: formData.food_preferences || null,
        last_vet_visit: formData.last_vet_visit || null,
        next_vet_visit_due: formData.next_vet_visit_due || null,
        // New pets are always created as available
        adoption_status: 'available',
        date_admitted: formData.date_admitted || null,
        description: formData.description || null,
        photo_url: formData.photo_url || null,
      };

      if (!USE_MOCK_API) {
        const response = await fetch(API_ENDPOINTS.pets, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(backendData),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Backend error:', errorData);
          throw new Error(errorData.message || `Failed to create pet: ${response.statusText}`);
        }

        await response.json();
        // Refresh pets list from backend
        await refreshPets();
      } else {
        // Mock mode - add to context
        const mockPet = {
          pet_id: Date.now(), // Temporary ID
          ...formData,
        };
        addPet(mockPet);
      }

      // Show success banner
      setShowSuccessBanner(true);

      // Capture snapshot to prevent additional submissions
      setInitialSnapshot({ ...formData });
      
      // Redirect to pets page after a short delay
      setTimeout(() => {
        router.push('/admin/pets');
      }, 1500);
    } catch (error) {
      console.error('Error creating pet:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create pet. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden" suppressHydrationWarning>
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

      {/* Success Banner */}
      {showSuccessBanner && (
        <SuccessBanner
          message="Pet added successfully!"
          onClose={() => setShowSuccessBanner(false)}
        />
      )}

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin/pets')}
              className="flex items-center gap-2 text-gray-600 hover:text-[#fd7e14] transition-colors duration-300 font-['Poppins'] mb-4"
              suppressHydrationWarning
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Manage Pets
            </button>
            <h1 className="font-['Poppins'] text-4xl text-black mb-2">Add New Pet</h1>
            <p className="font-['Poppins'] text-gray-600">Fill in all the required information to add a new pet to the system</p>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6" suppressHydrationWarning>
                {/* Pet Image */}
                <div>
                  <label className="font-['Poppins'] text-black mb-2 block">
                    Pet Photo URL *
                  </label>
                  {formData.photo_url && (
                    <div className="relative h-64 rounded-2xl overflow-hidden mb-3 group">
                      <Image
                        src={formData.photo_url}
                        alt="Pet preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  <input
                    type="url"
                    name="photo_url"
                    value={formData.photo_url}
                    onChange={handleChange}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                    placeholder="https://example.com/pet-image.jpg"
                  />
                </div>

                {/* Basic Information */}
                <div>
                  <h3 className="font-['Poppins'] text-xl text-black mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="font-['Poppins'] text-black mb-2 block">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                        placeholder="e.g., Max"
                      />
                    </div>

                    <div>
                      <label htmlFor="breed" className="font-['Poppins'] text-black mb-2 block">
                        Breed *
                      </label>
                      <input
                        type="text"
                        id="breed"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                        placeholder="e.g., Golden Retriever"
                      />
                    </div>

                    <div>
                      <label htmlFor="species" className="font-['Poppins'] text-black mb-2 block">
                        Species *
                      </label>
                      <select
                        id="species"
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                      >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Rabbit">Rabbit</option>
                        <option value="Hamster">Hamster</option>
                        <option value="Snake">Snake</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="age" className="font-['Poppins'] text-black mb-2 block">
                        Age (years) *
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="0"
                        step="1"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                        placeholder="e.g., 2"
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="font-['Poppins'] text-black mb-2 block">
                        Gender *
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="weight" className="font-['Poppins'] text-black mb-2 block">
                        Weight (kg) *
                      </label>
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.1"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                        placeholder="e.g., 32.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Health & Status Information */}
                <div>
                  <h3 className="font-['Poppins'] text-xl text-black mb-4">Health & Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="health_status" className="font-['Poppins'] text-black mb-2 block">
                        Health Status *
                      </label>
                      <select
                        id="health_status"
                        name="health_status"
                        value={formData.health_status}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white"
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Needs Medical Attention">Needs Medical Attention</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="adoption_status" className="font-['Poppins'] text-black mb-2 block">
                        Adoption Status *
                      </label>
                      <input
                        id="adoption_status"
                        name="adoption_status"
                        value="Available"
                        readOnly
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-100 text-gray-700 font-['Poppins'] cursor-not-allowed"
                      />
                      <p className="text-sm text-gray-600 mt-1 font-['Poppins']">
                        New pets are always posted as Available.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="shelter_id" className="font-['Poppins'] text-black mb-2 block">
                        Shelter ID *
                      </label>
                      <select
                        id="shelter_id"
                        name="shelter_id"
                        value={formData.shelter_id}
                        onChange={handleChange}
                        required
                        disabled={!!initialShelterId}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        {shelters.length === 0 ? (
                          <option value="">Loading shelters...</option>
                        ) : (
                          shelters.map(shelter => (
                            <option key={shelter.shelter_id} value={shelter.shelter_id}>
                              {shelter.shelter_name || shelter.name || `Shelter ${shelter.shelter_id}`}
                            </option>
                          ))
                        )}
                      </select>
                      {initialShelterId && (
                        <p className="text-sm text-gray-600 mt-1 font-['Poppins']">
                          * Shelter is pre-selected because you&apos;re adding from a specific shelter page
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Food Preferences */}
                <div>
                  <label htmlFor="food_preferences" className="font-['Poppins'] text-black mb-2 block">
                    Food Preferences *
                  </label>
                  <textarea
                    id="food_preferences"
                    name="food_preferences"
                    value={formData.food_preferences}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] resize-none"
                    placeholder="e.g., Grain-free dry food, loves chicken treats"
                  />
                </div>

                {/* Important Dates */}
                <div>
                  <h3 className="font-['Poppins'] text-xl text-black mb-4">Important Dates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="last_vet_visit" className="font-['Poppins'] text-black mb-2 block">
                        Last Vet Visit *
                      </label>
                      <input
                        type="date"
                        id="last_vet_visit"
                        name="last_vet_visit"
                        value={formData.last_vet_visit}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                      />
                    </div>

                    <div>
                      <label htmlFor="next_vet_visit_due" className="font-['Poppins'] text-black mb-2 block">
                        Next Vet Visit Due *
                      </label>
                      <input
                        type="date"
                        id="next_vet_visit_due"
                        name="next_vet_visit_due"
                        value={formData.next_vet_visit_due}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                      />
                    </div>

                    <div>
                      <label htmlFor="date_admitted" className="font-['Poppins'] text-black mb-2 block">
                        Date Admitted *
                      </label>
                      <input
                        type="date"
                        id="date_admitted"
                        name="date_admitted"
                        value={formData.date_admitted}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins']"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="font-['Poppins'] text-black mb-2 block">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#fd7e14] focus:outline-none font-['Poppins'] resize-none"
                    placeholder="Tell us about this pet's personality, behavior, and what makes them special..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => router.push('/admin/pets')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-['Poppins'] hover:bg-gray-300 transition-colors"
                  suppressHydrationWarning
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!hasChanges}
                  className={`flex-1 py-3 rounded-xl font-['Poppins'] transition-all duration-300 flex items-center justify-center gap-2 ${
                    hasChanges
                      ? 'bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  suppressHydrationWarning
                >
                  <Save className="w-5 h-5" />
                  Add Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}





