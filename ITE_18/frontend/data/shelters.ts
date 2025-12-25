import { API_ENDPOINTS } from '../utils/api';

export interface Shelter {
  shelter_id: number;
  admin_id: number;
  shelter_name: string;
  staff_name: string;
  staff_email: string;
  staff_phone: string;
  location: string;
  contact_info: string;
  description: string;
  image_url: string;
}

// Cache for shelter data
let sheltersCache: Shelter[] | null = null;
let cachePromise: Promise<Shelter[]> | null = null;

// Fetch shelters from API with caching
const fetchShelters = async (): Promise<Shelter[]> => {
  if (sheltersCache) {
    return sheltersCache;
  }
  
  if (cachePromise) {
    return cachePromise;
  }

  cachePromise = fetch(API_ENDPOINTS.shelters)
    .then(res => res.ok ? res.json() : [])
    .then(data => {
      sheltersCache = data;
      cachePromise = null;
      return data;
    })
    .catch(err => {
      console.error('Error fetching shelters:', err);
      cachePromise = null;
      return [];
    });

  return cachePromise;
};

export const getShelterById = async (id: number): Promise<Shelter | undefined> => {
  const shelters = await fetchShelters();
  return shelters.find(shelter => shelter.shelter_id === id);
};

export const getShelterName = (id: number): string => {
  // For synchronous usage, try to get from cache first
  if (sheltersCache) {
    const shelter = sheltersCache.find(s => s.shelter_id === id);
    if (shelter) return shelter.shelter_name;
  }
  
  // Trigger async fetch in background for next time
  fetchShelters();
  
  // Return loading state or fetch shelter name
  return 'Loading...';
};