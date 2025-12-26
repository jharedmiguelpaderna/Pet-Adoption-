// Helper functions for adoption request notifications

import { pets } from '../data/petsData';
import { getShelterById } from '../data/shelters';

/**
 * Get admin_id for a pet by finding its shelter and the admin who manages that shelter
 * Flow: Pet -> Shelter (via shelter_id) -> Admin (via admin_id)
 */
export async function getAdminIdForPet(petId: number): Promise<number | null> {
  const pet = pets.find(p => p.pet_id === petId);
  if (!pet || !pet.shelter_id) return null;
  
  // Get the shelter that owns this pet (async)
  const shelter = await getShelterById(pet.shelter_id);
  if (!shelter || !shelter.admin_id) return null;
  
  // Return the admin_id who manages this shelter
  return shelter.admin_id;
}

/**
 * Get pet information by pet_id
 */
export function getPetInfo(petId: number) {
  return pets.find(p => p.pet_id === petId);
}
