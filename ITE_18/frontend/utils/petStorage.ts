// Utility functions for managing favorites and adoption applications in localStorage

export interface AdoptionApplication {
  pet_id: number;
  pet_name: string;
  application_date: string;
  status: 'applied';
}

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Favorites Management
export function getFavorites(): number[] {
  if (!isBrowser) return [];
  const favorites = localStorage.getItem('pet_favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function isFavorite(petId: number): boolean {
  if (!isBrowser) return false;
  const favorites = getFavorites();
  return favorites.includes(petId);
}

export function toggleFavorite(petId: number): boolean {
  if (!isBrowser) return false;
  const favorites = getFavorites();
  const index = favorites.indexOf(petId);
  
  if (index > -1) {
    // Remove from favorites
    favorites.splice(index, 1);
    localStorage.setItem('pet_favorites', JSON.stringify(favorites));
    return false;
  } else {
    // Add to favorites
    favorites.push(petId);
    localStorage.setItem('pet_favorites', JSON.stringify(favorites));
    return true;
  }
}

// Adoption Applications Management
export function getAdoptionApplications(): AdoptionApplication[] {
  if (!isBrowser) return [];
  const applications = localStorage.getItem('adoption_applications');
  return applications ? JSON.parse(applications) : [];
}

export function hasAppliedForAdoption(petId: number): boolean {
  if (!isBrowser) return false;
  const applications = getAdoptionApplications();
  return applications.some(app => app.pet_id === petId);
}

export function addAdoptionApplication(petId: number, petName: string): void {
  if (!isBrowser) return;
  const applications = getAdoptionApplications();
  
  // Check if already applied
  if (!applications.some(app => app.pet_id === petId)) {
    applications.push({
      pet_id: petId,
      pet_name: petName,
      application_date: new Date().toISOString(),
      status: 'applied'
    });
    localStorage.setItem('adoption_applications', JSON.stringify(applications));
  }
}

export function getApplicationByPetId(petId: number): AdoptionApplication | null {
  if (!isBrowser) return null;
  const applications = getAdoptionApplications();
  return applications.find(app => app.pet_id === petId) || null;
}
