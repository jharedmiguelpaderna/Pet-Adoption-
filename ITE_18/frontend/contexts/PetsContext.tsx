'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { pets as initialPets, Pet } from '../data/petsData';
import { API_ENDPOINTS, getAuthHeaders, USE_MOCK_API, getNetworkErrorMessage } from '../utils/api';

interface PetsContextType {
  pets: Pet[];
  updatePet: (petId: number, updates: Partial<Pet>) => void | Promise<void>;
  addPet: (pet: Pet) => void | Promise<void>;
  deletePet: (petId: number) => void | Promise<void>;
  getPetById: (petId: number) => Pet | undefined;
  refreshPets: () => Promise<void>;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export function PetsProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(initialPets);

  // Fetch pets from backend on mount
  const refreshPets = async () => {
    if (!USE_MOCK_API) {
      try {
        const response = await fetch(API_ENDPOINTS.pets, {
          method: 'GET',
          headers: getAuthHeaders(),
        });

        if (response.ok) {
          const backendPets = await response.json();
          // Sort by pet_id descending (newest first)
          const sortedPets = backendPets.sort((a: Pet, b: Pet) => b.pet_id - a.pet_id);
          setPets(sortedPets);
        } else {
          // Handle non-OK responses
          const errorText = await response.text();
          console.error(`Failed to fetch pets: ${response.status} ${response.statusText}`, errorText);
          // Keep using initial pets data if fetch fails
        }
      } catch (error) {
        // Handle network errors (backend not running, CORS, etc.)
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          const errorMsg = getNetworkErrorMessage('/api/pets');
          console.error('Network error:', errorMsg, error);
        } else {
          console.error('Error fetching pets:', error);
        }
        // Keep using initial pets data if fetch fails
      }
    }
  };

  useEffect(() => {
    refreshPets();
  }, []);

  const updatePet = async (petId: number, updates: Partial<Pet>) => {
    // Update local state immediately for UI responsiveness
    setPets(prevPets =>
      prevPets.map(pet =>
        pet.pet_id === petId ? { ...pet, ...updates } : pet
      )
    );

    // Save to backend if not using mock API
    if (!USE_MOCK_API) {
      try {
        // Map frontend field names to backend field names
        const backendData: any = {};
        if (updates.name !== undefined) backendData.name = updates.name;
        if (updates.species !== undefined) backendData.species = updates.species;
        if (updates.breed !== undefined) backendData.breed = updates.breed || null;
        if (updates.age !== undefined) backendData.age = updates.age || null;
        if (updates.gender !== undefined) backendData.gender = updates.gender || null;
        if (updates.weight !== undefined) backendData.weight = updates.weight || null;
        if (updates.health_status !== undefined) backendData.health_status = updates.health_status || null;
        if (updates.food_preferences !== undefined) backendData.food_preferences = updates.food_preferences || null;
        if (updates.last_vet_visit !== undefined) backendData.last_vet_visit = updates.last_vet_visit || null;
        if (updates.next_vet_visit_due !== undefined) backendData.next_vet_visit_due = updates.next_vet_visit_due || null;
        if (updates.adoption_status !== undefined) backendData.adoption_status = updates.adoption_status;
        if (updates.date_admitted !== undefined) backendData.date_admitted = updates.date_admitted || null;
        if (updates.description !== undefined) backendData.description = updates.description || null;
        if (updates.photo_url !== undefined) backendData.photo_url = updates.photo_url || null;
        if (updates.shelter_id !== undefined) backendData.shelter_id = updates.shelter_id;

        const response = await fetch(API_ENDPOINTS.pet(petId), {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(backendData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update pet: ${response.statusText}`);
        }

        // Update with backend response to ensure consistency
        const updatedPet = await response.json();
        setPets(prevPets =>
          prevPets.map(pet =>
            pet.pet_id === petId ? { ...pet, ...updatedPet } : pet
          )
        );
      } catch (error) {
        console.error('Error updating pet in backend:', error);
        // Revert local state on error
        setPets(prevPets =>
          prevPets.map(pet =>
            pet.pet_id === petId ? { ...pet } : pet
          )
        );
        throw error;
      }
    }
  };

  const addPet = async (pet: Pet) => {
    // Add to local state immediately
    setPets(prevPets => [...prevPets, pet]);

    // Save to backend if not using mock API
    if (!USE_MOCK_API) {
      try {
        const backendData: any = {
          shelter_id: pet.shelter_id,
          name: pet.name,
          species: pet.species,
          breed: pet.breed || null,
          age: pet.age || null,
          gender: pet.gender || null,
          weight: pet.weight || null,
          health_status: pet.health_status || null,
          food_preferences: pet.food_preferences || null,
          last_vet_visit: pet.last_vet_visit || null,
          next_vet_visit_due: pet.next_vet_visit_due || null,
          adoption_status: pet.adoption_status || 'available',
          date_admitted: pet.date_admitted || null,
          description: pet.description || null,
          photo_url: pet.photo_url || null,
        };

        const response = await fetch(API_ENDPOINTS.pets, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(backendData),
        });

        if (!response.ok) {
          throw new Error(`Failed to create pet: ${response.statusText}`);
        }

        const createdPet = await response.json();
        // Replace local pet with backend response (includes generated ID)
        setPets(prevPets =>
          prevPets.map(p => p.pet_id === pet.pet_id ? createdPet : p)
        );
      } catch (error) {
        console.error('Error creating pet in backend:', error);
        // Remove from local state on error
        setPets(prevPets => prevPets.filter(p => p.pet_id !== pet.pet_id));
        throw error;
      }
    }
  };

  const deletePet = async (petId: number) => {
    // Remove from local state immediately
    const petToDelete = pets.find(p => p.pet_id === petId);
    setPets(prevPets => prevPets.filter(pet => pet.pet_id !== petId));

    // Delete from backend if not using mock API
    if (!USE_MOCK_API) {
      try {
        const response = await fetch(API_ENDPOINTS.pet(petId), {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          throw new Error(`Failed to delete pet: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error deleting pet from backend:', error);
        // Restore pet on error
        if (petToDelete) {
          setPets(prevPets => [...prevPets, petToDelete]);
        }
        throw error;
      }
    }
  };

  const getPetById = (petId: number) => {
    return pets.find(pet => pet.pet_id === petId);
  };

  return (
    <PetsContext.Provider value={{ pets, updatePet, addPet, deletePet, getPetById, refreshPets }}>
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetsContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetsProvider');
  }
  return context;
}
