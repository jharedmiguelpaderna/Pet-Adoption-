'use client';

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "../utils/api";

interface Pet {
  pet_id: number;
  name: string;
  breed: string;
  species: string;
  age: number | null;
  photo_url: string | null;
  adoption_status: string;
}

interface DisplayPet {
  id: number;
  name: string;
  type: string;
  age: string;
  image: string;
}

export function AvailablePetsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pets, setPets] = useState<DisplayPet[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch pets from database
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_ENDPOINTS.pets}/available`);
        if (response.ok) {
          const data: Pet[] = await response.json();
          // Limit to 8 pets and transform data
          const displayPets: DisplayPet[] = data.slice(0, 8).map(pet => ({
            id: pet.pet_id,
            name: pet.name,
            type: pet.breed || pet.species,
            age: pet.age !== null ? (pet.age === 0 ? 'Less than 1 year' : `${pet.age} ${pet.age === 1 ? 'year' : 'years'}`) : 'Age unknown',
            image: pet.photo_url || '/placeholder-pet.png'
          }));
          setPets(displayPets);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Duplicate pets array for infinite scroll effect
  const allPets = pets.length > 0 ? [...pets, ...pets] : [];

  useEffect(() => {
    if (isPaused || isTransitioning) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isTransitioning, currentIndex]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= pets.length) {
        // We've reached the end of the duplicated section
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(0);
        }, 600);
        return nextIndex;
      }
      setTimeout(() => setIsTransitioning(false), 600);
      return nextIndex;
    });
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      if (nextIndex < 0) {
        // Jump to the end of the first set
        setTimeout(() => setIsTransitioning(false), 600);
        return pets.length - 1;
      }
      setTimeout(() => setIsTransitioning(false), 600);
      return nextIndex;
    });
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  if (loading) {
    return (
      <div className="w-full bg-white py-[80px]">
        <div className="max-w-[1536px] mx-auto px-[90px] py-[0px]">
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#fd7e14]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (pets.length === 0) {
    return null; // Don't show the section if there are no pets
  }

  return (
    <div className="w-full bg-white py-[80px]">
      <div className="max-w-[1536px] mx-auto px-[90px] py-[0px]">
        <div className="mb-[48px]">
          <p className="font-['Inter:Bold',sans-serif] text-[#fd7e14] text-[16px] mb-[12px] uppercase tracking-wide">
            Available Pets
          </p>
          <h2 className="font-['Poppins:Bold',sans-serif] text-[42px] text-black">
            Meet Your New Best Friend
          </h2>
        </div>

        <div 
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#fd7e14] hover:text-white transition-all duration-300 group"
            aria-label="Previous pets"
          >
            <ChevronLeft className="w-[24px] h-[24px] text-black group-hover:text-white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#fd7e14] hover:text-white transition-all duration-300 group"
            aria-label="Next pets"
          >
            <ChevronRight className="w-[24px] h-[24px] text-black group-hover:text-white" />
          </button>

          <div
            ref={containerRef}
            className="flex gap-[24px] transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: `translateX(calc(-${currentIndex * 25}% - ${currentIndex * 6}px))`
            }}
          >
            {allPets.map((pet, index) => (
              <div 
                key={`${pet.id}-${index}`} 
                className="flex-shrink-0"
                style={{ width: 'calc(25% - 18px)' }}
                onClick={() => router.push(`/pet/${pet.id}`)}
              >
                <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-105 cursor-pointer">
                  <div className="relative h-[280px] overflow-hidden">
                    <ImageWithFallback
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                  </div>
                  <div className="p-[24px]">
                    <h3 className="font-['Poppins:SemiBold',sans-serif] text-[24px] text-black mb-[8px]">
                      {pet.name}
                    </h3>
                    <p className="font-['Inter:Medium',sans-serif] text-[16px] text-[#fd7e14] mb-[4px]">
                      {pet.type}
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[14px] text-[rgba(0,0,0,0.6)]">
                      {pet.age}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-[8px] mt-[32px]">
          {pets.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-[10px] h-[10px] rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-[#fd7e14] w-[24px]'
                  : 'bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.4)]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}