import { X, MapPin, Calendar, Weight, Activity, Utensils, Stethoscope, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../utils/api';

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

interface ViewPetModalProps {
  pet: Pet;
  onClose: () => void;
}

export function ViewPetModal({ pet, onClose }: ViewPetModalProps) {
  const [shelterName, setShelterName] = useState<string>('Loading...');

  // Fetch shelter name
  useEffect(() => {
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
  }, [pet.shelter_id]);

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000] overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="font-['Poppins'] text-3xl text-black">Pet Details</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Pet Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
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
            <div className={`absolute top-6 left-6 px-4 py-2 ${getStatusColor(pet.adoption_status)} text-white rounded-full font-['Poppins'] shadow-lg`}>
              {pet.adoption_status.charAt(0).toUpperCase() + pet.adoption_status.slice(1)}
            </div>
          </div>

          {/* Pet Info */}
          <div className="space-y-6">
            {/* Name and Breed */}
            <div>
              <h1 className="font-['Poppins'] text-4xl text-black mb-2">{pet.name}</h1>
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
              <h2 className="font-['Poppins'] text-2xl text-black mb-3">About {pet.name}</h2>
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
              <h2 className="font-['Poppins'] text-2xl text-black">Additional Details</h2>

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
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-8 py-6 rounded-b-3xl border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#fd7e14] to-[#ff9247] text-white py-3 rounded-xl font-['Poppins'] hover:shadow-lg transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}