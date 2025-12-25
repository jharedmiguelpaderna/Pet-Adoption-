'use client';

import { useRouter } from 'next/navigation';
import { MapPin, Phone, Mail, User, PawPrint } from 'lucide-react';
import { usePets } from '../../contexts/PetsContext';
import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../utils/api';

interface Shelter {
  shelter_id: number;
  shelter_name: string;
  staff_name: string | null;
  staff_email: string | null;
  staff_phone: string | null;
  location: string | null;
  contact_info: string | null;
  description: string | null;
  image_url: string | null;
}

export function SheltersPage() {
  const router = useRouter();
  const { pets } = usePets();
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [shelterPetCounts, setShelterPetCounts] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.shelters);
      if (!response.ok) {
        setLoading(false);
        return;
      }
      const data = await response.json();
      setShelters(data);
    } catch (error) {
      console.error('Error fetching shelters:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pet count for each shelter whenever pets or shelters change
  useEffect(() => {
    if (shelters.length === 0 || pets.length === 0) return;
    
    console.log('Pets loaded:', pets.length);
    console.log('Shelters loaded:', shelters.length);
    const counts: { [key: number]: number } = {};
    shelters.forEach(shelter => {
      const petCount = pets.filter(pet => pet.shelter_id === shelter.shelter_id).length;
      counts[shelter.shelter_id] = petCount;
      console.log(`Shelter ${shelter.shelter_id} (${shelter.shelter_name}): ${petCount} pets`);
    });
    setShelterPetCounts(counts);
  }, [pets, shelters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden w-full">
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
      <div className="absolute bottom-20 right-1/3 text-[#fd7e14] opacity-10 pointer-events-none">
        <PawPrint className="w-14 h-14" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 bg-gradient-to-r from-[#fd7e14] to-[#ff9a3c] py-16">
        <div className="px-[312px] text-center">
          <h1 className="font-['Poppins'] text-white mb-4">Our Partner Shelters</h1>
          <p className="font-['Poppins'] text-white text-lg max-w-[700px] mx-auto">
            We work with amazing animal shelters across the country. Each shelter is dedicated to providing care, love, and finding forever homes for animals in need.
          </p>
        </div>
      </div>

      {/* Shelters Grid */}
      <div className="relative z-10 px-[312px] py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#fd7e14]"></div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {shelters.map((shelter) => (
            <div
              key={shelter.shelter_id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
              onClick={() => router.push(`/shelter/${shelter.shelter_id}`)}
            >
              {/* Shelter Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-['Poppins'] text-2xl text-black">
                    {shelter.shelter_name}
                  </h2>
                  <div className="bg-[#fd7e14] text-white px-3 py-1 rounded-full">
                    <span className="font-['Poppins'] text-sm font-semibold">{shelterPetCounts[shelter.shelter_id] || 0} pets</span>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-1 gap-3 pt-4 border-t border-gray-200">
                  {shelter.staff_name && (
                    <div className="flex items-start gap-2">
                      <User className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-['Poppins'] text-sm text-gray-500">Staff Contact</p>
                        <p className="font-['Poppins'] text-sm text-gray-700">{shelter.staff_name}</p>
                      </div>
                    </div>
                  )}

                  {shelter.location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-['Poppins'] text-sm text-gray-500">Location</p>
                        <p className="font-['Poppins'] text-sm text-gray-700">{shelter.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {shelter.staff_phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-['Poppins'] text-sm text-gray-500">Phone</p>
                        <p className="font-['Poppins'] text-sm text-gray-700">{shelter.staff_phone}</p>
                      </div>
                    </div>
                  )}

                  {shelter.contact_info && (
                    <div className="flex items-start gap-2">
                      <Mail className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-['Poppins'] text-sm text-gray-500">Shelter Email</p>
                        <p className="font-['Poppins'] text-sm text-gray-700">{shelter.contact_info}</p>
                      </div>
                    </div>
                  )}

                  {shelter.staff_email && (
                    <div className="flex items-start gap-2">
                      <Mail className="w-5 h-5 text-[#fd7e14] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-['Poppins'] text-sm text-gray-500">Staff Email</p>
                        <p className="font-['Poppins'] text-sm text-gray-700">{shelter.staff_email}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/shelter/${shelter.shelter_id}`);
                  }}
                  className="w-full mt-4 py-3 bg-[#fd7e14] text-white rounded-xl font-['Poppins'] hover:bg-[#e56d0f] transition-colors duration-300"
                >
                  View Shelter Details
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-[#f8f9fa] py-16 px-6 mt-12">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-['Poppins'] text-black mb-4">Ready to Adopt?</h2>
          <p className="font-['Poppins'] text-gray-600 mb-6">
            Browse our available pets and find your perfect companion. Each pet is cared for by our amazing partner shelters.
          </p>
          <button
            onClick={() => router.push('/browse-pets')}
            className="px-8 py-4 bg-[#fd7e14] text-white rounded-xl font-['Poppins'] hover:bg-[#e56d0f] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Browse Available Pets
          </button>
        </div>
      </div>
    </div>
  );
}





