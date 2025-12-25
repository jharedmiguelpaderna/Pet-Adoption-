'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Phone, Mail, User, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { API_ENDPOINTS } from '../../utils/api';

interface Shelter {
  shelter_id: number;
  shelter_name: string;
  contact_info: string;
  description: string;
  image_url: string;
  staff_name: string;
  staff_email: string;
  staff_phone: string;
  location: string;
  city: string;
  zip_code: string;
}

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

export function ShelterDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [shelterPets, setShelterPets] = useState<Pet[]>([]);
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedId, setLastFetchedId] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if the ID actually changed
    if (id !== lastFetchedId) {
      setLastFetchedId(id);
      fetchShelterData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchShelterData = async () => {
    try {
      setLoading(true);
      
      // Fetch shelter and pets in parallel for maximum speed
      const [shelterRes, petsRes] = await Promise.all([
        fetch(`${API_ENDPOINTS.shelters}/${id}`, { 
          cache: 'no-store',
          priority: 'high' 
        } as RequestInit),
        fetch(`${API_ENDPOINTS.shelters}/${id}/pets`, { 
          cache: 'no-store',
          priority: 'high' 
        } as RequestInit)
      ]);
      
      const [shelterData, petsData] = await Promise.all([
        shelterRes.ok ? shelterRes.json() : null,
        petsRes.ok ? petsRes.json() : []
      ]);
      
      if (shelterData) {
        setShelter(shelterData);
      }
      
      // Show all pets (available and reserved), exclude only adopted
      if (petsData && Array.isArray(petsData)) {
        console.log('Pets data received:', petsData);
        // Show available and reserved pets
        const visiblePets = petsData.filter((pet: Pet) => {
          const status = pet.adoption_status?.toLowerCase();
          return status === 'available' || status === 'reserved';
        });
        console.log('Filtered visible pets:', visiblePets);
        setShelterPets(visiblePets);
      } else {
        setShelterPets([]);
      }
    } catch (error) {
      console.error('Error fetching shelter data:', error);
      setShelter(null);
      setShelterPets([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#fd7e14]"></div>
      </div>
    );
  }

  if (!shelter) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-['Poppins'] text-black mb-4">Shelter not found</h2>
          <button
            onClick={() => router.push('/shelters')}
            className="px-6 py-3 bg-[#fd7e14] text-white rounded-xl font-['Poppins'] hover:bg-[#e56d0f] transition-colors duration-300"
          >
            Back to Shelters
          </button>
        </div>
      </div>
    );
  }

  const toggleFavorite = (petId: number) => {
    setFavorites(prev =>
      prev.includes(petId)
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-500';
      case 'reserved':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden w-full">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.push('/shelters')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#fd7e14] transition-colors duration-300 font-['Poppins'] mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shelters
          </button>

          {/* Shelter Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
            {/* Shelter Details */}
            <div className="p-8">
              <h1 className="font-['Poppins'] text-4xl text-black mb-6">{shelter.shelter_name}</h1>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Staff Contact</p>
                    <p className="font-['Poppins'] text-black">{shelter.staff_name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Location</p>
                    <p className="font-['Poppins'] text-black">{shelter.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Phone</p>
                    <p className="font-['Poppins'] text-black">{shelter.staff_phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-sm text-gray-500">Staff Email</p>
                    <p className="font-['Poppins'] text-black">{shelter.staff_email}</p>
                  </div>
                </div>
              </div>

              {/* Shelter Email Info */}
              {shelter.contact_info && (
                <div className="bg-orange-50 rounded-2xl p-4">
                  <p className="font-['Poppins'] text-gray-700">{shelter.contact_info}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pets Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="font-['Poppins'] text-3xl text-black mb-2">
                Available Pets ({shelterPets.length})
              </h2>
              <p className="font-['Poppins'] text-gray-600">Meet the wonderful animals waiting for their forever home at {shelter.shelter_name}</p>
            </div>
            
            {shelterPets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shelterPets.map((pet) => (
              <div
                key={pet.pet_id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group transform hover:scale-105"
                onClick={() => router.push(`/pet/${pet.pet_id}`)}
              >
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src={pet.photo_url || '/placeholder-pet.png'}
                    alt={pet.name}
                    fill
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pet.pet_id);
                    }}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 ${
                      favorites.includes(pet.pet_id)
                        ? 'bg-[#fd7e14] text-white'
                        : 'bg-white text-gray-600 hover:bg-[#fd7e14] hover:text-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(pet.pet_id) ? 'fill-current' : ''}`} />
                  </button>
                  <div className={`absolute top-4 left-4 px-3 py-1 ${getStatusColor(pet.adoption_status)} text-white rounded-full font-['Poppins'] text-sm z-10`}>
                    {pet.adoption_status.charAt(0).toUpperCase() + pet.adoption_status.slice(1)}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-['Poppins'] text-black mb-2">{pet.name}</h3>
                  <p className="font-['Poppins'] text-sm text-gray-600 mb-1">
                    {pet.breed || pet.species} • {pet.gender}
                  </p>
                  {pet.age !== null && (
                    <p className="font-['Poppins'] text-sm text-gray-600">
                      {pet.age === 0 ? 'Less than 1 year old' : `${pet.age} ${pet.age === 1 ? 'year' : 'years'} old`}
                    </p>
                  )}
                </div>
              </div>
              ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-['Poppins'] text-gray-600">
                  No available pets at this shelter at the moment. Check back later!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




