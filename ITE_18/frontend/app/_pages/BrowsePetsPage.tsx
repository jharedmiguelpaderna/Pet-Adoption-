'use client';

import { Heart, PawPrint } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { AdoptionModal } from '../../components/AdoptionModal';
import { isFavorite as checkIsFavorite, toggleFavorite, getFavorites } from '../../utils/petStorage';
import { usePets } from '../../contexts/PetsContext';
import { Pet } from '../../data/petsData';

export function BrowsePetsPage() {
  const router = useRouter();
  const { pets } = usePets(); // Use pets from context
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => getFavorites());
  const [displayCount, setDisplayCount] = useState(9); // Initial number of pets to display
  const petsPerLoad = 9; // Number of pets to load each time

  // Create a key from filters to detect changes
  const filterKey = useMemo(
    () => `${searchQuery}-${selectedSpecies}-${selectedStatus}-${showFavoritesOnly}`,
    [searchQuery, selectedSpecies, selectedStatus, showFavoritesOnly]
  );

  // Track previous filter key to detect changes
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);

  // Reset display count when filters change
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setDisplayCount(9);
  }

  // Filter pets
  const filteredPets = pets.filter((pet) => {
    // Filter by favorites
    if (showFavoritesOnly && !checkIsFavorite(pet.pet_id)) return false;
    
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (pet.breed && pet.breed.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         pet.species.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesSpecies = true;
    if (selectedSpecies !== 'all') {
      if (selectedSpecies === 'others') {
        // "Others" includes any species that's not Dog, Cat, or Bird
        matchesSpecies = !['Dog', 'Cat', 'Bird'].includes(pet.species);
      } else {
        matchesSpecies = pet.species.toLowerCase() === selectedSpecies.toLowerCase();
      }
    }
    
    const matchesStatus = selectedStatus === 'all' || pet.adoption_status === selectedStatus;
    return matchesSearch && matchesSpecies && matchesStatus;
  });

  // Get pets to display (paginated)
  const displayedPets = filteredPets.slice(0, displayCount);
  const hasMorePets = displayCount < filteredPets.length;

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + petsPerLoad);
  };

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

  const getStatusText = (status: string) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden w-full">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#fd7e14] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#fd7e14] to-[#ff9247] opacity-3 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Paw Print Pattern Decorations */}
      <div className="absolute top-20 left-10 text-[#fd7e14] opacity-25 pointer-events-none">
        <PawPrint className="w-16 h-16" />
      </div>
      <div className="absolute top-40 right-20 text-[#fd7e14] opacity-20 pointer-events-none">
        <PawPrint className="w-12 h-12" />
      </div>
      <div className="absolute bottom-40 left-1/4 text-[#fd7e14] opacity-25 pointer-events-none">
        <PawPrint className="w-20 h-20" />
      </div>
      <div className="absolute bottom-20 right-1/3 text-[#fd7e14] opacity-20 pointer-events-none">
        <PawPrint className="w-14 h-14" />
      </div>

      {/* Filter Section */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm py-8 shadow-sm">
        <div className="px-[312px]">
          <div className="flex gap-4 items-center">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search pets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#fd7e14] font-['Poppins'] text-gray-600"
            />

            {/* Species Dropdown */}
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#fd7e14] font-['Poppins'] text-gray-600 bg-white"
            >
              <option value="all">All Species</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="others">Others</option>
            </select>

            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#fd7e14] font-['Poppins'] text-gray-600 bg-white"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="adopted">Adopted</option>
            </select>

            {/* Filter Button */}
            <button
              onClick={() => {
                // Filter button click handler (filters are applied in real-time)
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-['Poppins'] hover:bg-blue-700 transition-colors duration-300"
            >
              Filter
            </button>

            {/* Favorites Heart Icon */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                showFavoritesOnly
                  ? 'bg-[#fd7e14] text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-[#fd7e14]'
              }`}
              title={showFavoritesOnly ? `Showing Favorites Only (${favorites.length})` : 'Show Favorites Only'}
            >
              <Heart className={`w-6 h-6 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Pet Grid */}
      <div className="relative z-10 px-[312px] py-16">
        {filteredPets.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-['Poppins'] text-gray-600">No pets found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPets.map((pet) => (
              <div
                key={pet.pet_id}
                onClick={() => router.push(`/pet/${pet.pet_id}`)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pet.photo_url || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b'}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Heart Icon */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pet.pet_id);
                      setFavorites(prevFavorites => {
                        if (prevFavorites.includes(pet.pet_id)) {
                          return prevFavorites.filter(id => id !== pet.pet_id);
                        } else {
                          return [...prevFavorites, pet.pet_id];
                        }
                      });
                    }}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                      checkIsFavorite(pet.pet_id) 
                        ? 'bg-[#fd7e14] text-white' 
                        : 'bg-white text-gray-600 hover:bg-[#fd7e14] hover:text-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${checkIsFavorite(pet.pet_id) ? 'fill-current' : ''}`} />
                  </button>
                  {/* Status Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 ${getStatusColor(pet.adoption_status)} text-white rounded-full font-['Poppins'] text-sm shadow-lg`}>
                    {getStatusText(pet.adoption_status)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-['Poppins'] text-black mb-2">{pet.name}</h3>
                  <p className="text-gray-600 font-['Poppins'] mb-4">{pet.breed}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 font-['Poppins'] text-sm">
                      <span className="w-16">Age:</span>
                      <span>{pet.age ? `${pet.age} years` : 'Unknown'}</span>
                    </div>
                  </div>

                  {/* Adopt Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const status = pet.adoption_status?.toLowerCase();
                      if (status === 'available') {
                        setSelectedPet(pet);
                      }
                    }}
                    disabled={pet.adoption_status?.toLowerCase() !== 'available'}
                    className={`w-full py-3 rounded-xl font-['Poppins'] transition-colors duration-300 ${
                      pet.adoption_status?.toLowerCase() === 'available'
                        ? 'bg-[#090706] text-white hover:bg-[#fd7e14]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {pet.adoption_status?.toLowerCase() === 'available' 
                      ? `Adopt ${pet.name}` 
                      : `${getStatusText(pet.adoption_status)}`
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMorePets && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button 
              onClick={handleLoadMore}
              className="px-8 py-4 border-2 border-[#fd7e14] text-[#fd7e14] rounded-xl font-['Poppins'] hover:bg-[#fd7e14] hover:text-white transition-all duration-300 flex items-center gap-2"
            >
            Load More Pets
              <PawPrint className="w-5 h-5" />
          </button>
        </div>
        )}
      </div>

      {/* Adoption Modal */}
      {selectedPet && (
        <AdoptionModal
          isOpen={!!selectedPet}
          onClose={() => setSelectedPet(null)}
          petName={selectedPet.name}
          petId={selectedPet.pet_id}
        />
      )}
    </div>
  );
}





