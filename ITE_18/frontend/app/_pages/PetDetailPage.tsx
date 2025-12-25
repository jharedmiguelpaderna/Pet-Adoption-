'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, MapPin, Calendar, Weight, Activity, Utensils, Stethoscope, Home, CheckCircle } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { AdoptionModal } from '../../components/AdoptionModal';
import { isFavorite as checkIsFavorite, toggleFavorite, hasAppliedForAdoption } from '../../utils/petStorage';
import { usePets } from '../../contexts/PetsContext';
import { API_ENDPOINTS } from '../../utils/api';

// Pet data is fetched from backend via PetsContext

export function PetDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const { getPetById } = usePets();
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [shelterName, setShelterName] = useState<string>('Loading...');

  // Find the pet by ID from context
  const pet = getPetById(Number(id));
  
  // Calculate favorites and application status using useMemo to avoid cascading renders
  const isFavorite = useMemo(() => pet ? checkIsFavorite(pet.pet_id) : false, [pet]);
  const hasApplied = useMemo(() => pet ? hasAppliedForAdoption(pet.pet_id) : false, [pet]);

  // Fetch shelter name
  useEffect(() => {
    if (pet) {
      fetch(`${API_ENDPOINTS.shelters}/${pet.shelter_id}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.shelter_name) {
            setShelterName(data.shelter_name);
          } else {
            setShelterName('Unknown Shelter');
          }
        })
        .catch(() => setShelterName('Unknown Shelter'));
    }
  }, [pet]);

  const handleAdopt = () => {
    if (pet && pet.adoption_status?.toLowerCase() !== 'available') {
      alert(`This pet is currently ${pet.adoption_status}.`);
      return;
    }
    // In production, this would trigger the adoption process
    setIsAdoptionModalOpen(true);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

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

  const handleToggleFavorite = () => {
    if (pet) {
      toggleFavorite(pet.pet_id);
      // Force re-render by refreshing the page
      router.refresh();
    }
  };

  const handleCloseModal = () => {
    setIsAdoptionModalOpen(false);
    // Refresh to update hasApplied status after modal closes
    router.refresh();
  };

  if (!pet) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-['Poppins'] text-2xl text-gray-600">Pet not found</h2>
          <button
            onClick={() => router.push('/browse-pets')}
            className="mt-4 text-[#fd7e14] hover:underline"
          >
            Return to Browse Pets
          </button>
        </div>
      </div>
    );
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Back Button */}
      <div className="bg-[#f8f9fa] py-6">
        <div className="px-[312px]">
          <button
            onClick={() => router.push('/browse-pets')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#fd7e14] transition-colors duration-300 font-['Poppins']"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Browse Pets
          </button>
        </div>
      </div>

      {/* Pet Detail Content */}
      <div className="px-[312px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Pet Image */}
              <img
                src={pet.photo_url || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b'}
                alt={pet.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b';
                }}
              />
              {/* Favorite Button */}
              <button
                onClick={handleToggleFavorite}
                className={`absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 ${
                  isFavorite
                    ? 'bg-[#fd7e14] text-white'
                    : 'bg-white text-gray-600 hover:bg-[#fd7e14] hover:text-white'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              {/* Status Badge */}
              <div className={`absolute top-6 left-6 px-4 py-2 ${getStatusColor(pet.adoption_status)} text-white rounded-full font-['Poppins'] shadow-lg z-10`}>
                {getStatusText(pet.adoption_status)}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="font-['Poppins'] text-black mb-2">{pet.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 font-['Poppins'] mb-3">
                <span>{pet.breed || pet.species}</span>
                <span>•</span>
                <span>{pet.gender}</span>
                {pet.age !== null && (
                  <>
                    <span>•</span>
                    <span>{pet.age === 0 ? 'Less than 1 year' : `${pet.age} ${pet.age === 1 ? 'year' : 'years'} old`}</span>
                  </>
                )}
              </div>
              
              {/* Shelter Info */}
              <div className="flex items-center gap-2 text-gray-700 font-['Poppins'] mb-2 bg-[#fff8f3] px-4 py-3 rounded-xl border-2 border-[#fd7e14]/20">
                <Home className="w-5 h-5 text-[#fd7e14]" />
                <span>Shelter: <span className="font-['Poppins:SemiBold',sans-serif]">{shelterName}</span></span>
              </div>

              {pet.location && (
                <div className="flex items-center gap-2 text-gray-600 font-['Poppins']">
                  <MapPin className="w-5 h-5 text-[#fd7e14]" />
                  <span>{pet.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="font-['Poppins'] text-black mb-3">About {pet.name}</h2>
              <p className="text-gray-600 font-['Poppins'] leading-relaxed">
                {pet.description || 'No description available.'}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {pet.weight && (
                <div className="bg-[#f8f9fa] p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Weight className="w-5 h-5 text-[#fd7e14]" />
                    <span className="font-['Poppins'] text-gray-700">Weight</span>
                  </div>
                  <p className="font-['Poppins'] text-black">{pet.weight} kg</p>
                </div>
              )}
              
              {pet.health_status && (
                <div className="bg-[#f8f9fa] p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-[#fd7e14]" />
                    <span className="font-['Poppins'] text-gray-700">Health</span>
                  </div>
                  <p className="font-['Poppins'] text-black">{pet.health_status}</p>
                </div>
              )}
            </div>

            {/* Detailed Information */}
            <div className="space-y-4">
              <h2 className="font-['Poppins'] text-black">Additional Details</h2>

              {pet.food_preferences && (
                <div className="flex items-start gap-3">
                  <Utensils className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-gray-700">Food Preferences</p>
                    <p className="text-gray-600 font-['Poppins'] text-sm">{pet.food_preferences}</p>
                  </div>
                </div>
              )}

              {pet.last_vet_visit && (
                <div className="flex items-start gap-3">
                  <Stethoscope className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-gray-700">Last Vet Visit</p>
                    <p className="text-gray-600 font-['Poppins'] text-sm">{formatDate(pet.last_vet_visit)}</p>
                  </div>
                </div>
              )}

              {pet.next_vet_visit_due && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-gray-700">Next Vet Visit Due</p>
                    <p className="text-gray-600 font-['Poppins'] text-sm">{formatDate(pet.next_vet_visit_due)}</p>
                  </div>
                </div>
              )}

              {pet.date_admitted && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#fd7e14] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-['Poppins'] text-gray-700">Date Admitted</p>
                    <p className="text-gray-600 font-['Poppins'] text-sm">{formatDate(pet.date_admitted)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Adopt Button */}
            {hasApplied ? (
              <div className="w-full py-4 px-6 rounded-xl font-['Poppins'] bg-green-50 border-2 border-green-500 flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700">Application Submitted for {pet.name}</span>
              </div>
            ) : (
              <button
                onClick={handleAdopt}
                disabled={pet.adoption_status?.toLowerCase() !== 'available'}
                className={`w-full py-4 rounded-xl font-['Poppins'] transition-all duration-300 shadow-lg ${
                  pet.adoption_status?.toLowerCase() === 'available'
                    ? 'bg-[#fd7e14] text-white hover:bg-[#e56d0f] hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {pet.adoption_status?.toLowerCase() === 'available' 
                  ? `Adopt ${pet.name}` 
                  : `${getStatusText(pet.adoption_status)} - Not Available`
                }
              </button>
            )}

            {/* Additional Info */}
            <div className={`border-2 rounded-xl p-6 ${
              pet.adoption_status?.toLowerCase() === 'available'
                ? 'bg-[#fff8f3] border-[#fd7e14]'
                : 'bg-gray-50 border-gray-300'
            }`}>
              <h3 className="font-['Poppins'] text-black mb-3">
                {pet.adoption_status?.toLowerCase() === 'available' ? 'Ready to Adopt?' : 'Adoption Status'}
              </h3>
              <p className="text-gray-600 font-['Poppins'] text-sm leading-relaxed">
                {pet.adoption_status?.toLowerCase() === 'available' 
                  ? `Our adoption process is designed to ensure the best match between pets and families. Click the "Adopt ${pet.name}" button above to start your adoption journey. We'll guide you through the application process and answer any questions you may have.`
                  : pet.adoption_status?.toLowerCase() === 'reserved'
                    ? `${pet.name} is currently reserved by another family. Check back later as our adoption statuses change frequently, or browse other available pets.`
                    : `${pet.name} has been adopted and is now in a loving home! We're happy that ${pet.name} found a forever family. Please browse our other available pets.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Modal */}
      <AdoptionModal
        isOpen={isAdoptionModalOpen}
        onClose={handleCloseModal}
        petName={pet.name}
        petId={pet.pet_id}
      />
    </div>
  );
}