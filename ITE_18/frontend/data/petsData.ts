// Shared pets data interface and list

export interface Pet {
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
  shelter_name?: string;
}

export const pets: Pet[] = [
  {
    pet_id: 1,
    shelter_id: 1,
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 2,
    gender: "Male",
    weight: 32.5,
    health_status: "Excellent",
    food_preferences: "Grain-free dry food, loves chicken treats",
    last_vet_visit: "2024-10-15",
    next_vet_visit_due: "2025-04-15",
    adoption_status: "available",
    date_admitted: "2024-08-20",
    description: "Max is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks. He's great with children and other dogs, making him the perfect family companion. Max is house-trained, knows basic commands, and is eager to learn more. He would thrive in an active household with a yard where he can run and play.",
    photo_url: "https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2d8ZW58MXx8fHwxNzYzNzA1NDk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "San Francisco, CA",
    shelter_name: "Happy Paws Animal Shelter"
  },
  {
    pet_id: 2,
    shelter_id: 1,
    name: "Luna",
    species: "Cat",
    breed: "Orange Tabby",
    age: 1,
    gender: "Female",
    weight: 4.2,
    health_status: "Good",
    food_preferences: "Wet food, chicken and fish flavors",
    last_vet_visit: "2024-11-01",
    next_vet_visit_due: "2025-05-01",
    adoption_status: "reserved",
    date_admitted: "2024-09-10",
    description: "Luna is a playful and affectionate orange tabby cat with a beautiful coat and striking green eyes. She loves to chase toy mice and enjoys lounging in sunny spots. Luna is litter-trained and gets along well with other cats. She would make a wonderful companion for someone looking for a loving and entertaining feline friend.",
    photo_url: "https://images.unsplash.com/photo-1667518158890-0a6cf60de601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ2UlMjB0YWJieSUyMGNhdHxlbnwxfHx8fDE3NjM3NDA1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Los Angeles, CA"
  },
  {
    pet_id: 3,
    shelter_id: 1,
    name: "Fluffy",
    species: "Rabbit",
    breed: "Holland Lop",
    age: 0,
    gender: "Male",
    weight: 1.8,
    health_status: "Excellent",
    food_preferences: "Timothy hay, fresh vegetables, pellets",
    last_vet_visit: "2024-10-20",
    next_vet_visit_due: "2025-04-20",
    adoption_status: "available",
    date_admitted: "2024-09-05",
    description: "Fluffy is an adorable Holland Lop rabbit with soft, fluffy fur and floppy ears. He's gentle, curious, and loves to explore. Fluffy enjoys being petted and will happily hop around your home. He's litter-trained and would do best in a quiet household where he can have supervised playtime outside his enclosure.",
    photo_url: "https://images.unsplash.com/photo-1688472977827-c7e446e49efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcmFiYml0JTIwYnVubnl8ZW58MXx8fHwxNzYzNzY0MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Seattle, WA"
  },
  {
    pet_id: 6,
    shelter_id: 1,
    name: "Bella",
    species: "Dog",
    breed: "Beagle",
    age: 3,
    gender: "Female",
    weight: 12.5,
    health_status: "Good",
    food_preferences: "High-quality kibble, loves treats",
    last_vet_visit: "2024-09-25",
    next_vet_visit_due: "2025-03-25",
    adoption_status: "available",
    date_admitted: "2024-07-10",
    description: "Bella is a sweet Beagle with a gentle disposition.",
    photo_url: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400",
    location: "Austin, TX"
  },
  {
    pet_id: 8,
    shelter_id: 1,
    name: "Milo",
    species: "Cat",
    breed: "Siamese",
    age: 2,
    gender: "Male",
    weight: 5.0,
    health_status: "Excellent",
    food_preferences: "Wet and dry food mix",
    last_vet_visit: "2024-11-15",
    next_vet_visit_due: "2025-05-15",
    adoption_status: "available",
    date_admitted: "2024-08-01",
    description: "Milo is a vocal and affectionate Siamese cat.",
    photo_url: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400",
    location: "Portland, OR"
  },
  {
    pet_id: 11,
    shelter_id: 1,
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    age: 4,
    gender: "Male",
    weight: 38.0,
    health_status: "Excellent",
    food_preferences: "High-protein dog food",
    last_vet_visit: "2024-10-05",
    next_vet_visit_due: "2025-04-05",
    adoption_status: "available",
    date_admitted: "2024-06-15",
    description: "Rocky is a loyal and intelligent German Shepherd.",
    photo_url: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
    location: "Denver, CO"
  }
];

// Helper function to get a pet by ID
export function getPetById(petId: number): Pet | undefined {
  return pets.find(pet => pet.pet_id === petId);
}

// Helper function to get pet name by ID
export function getPetNameById(petId: number): string {
  const pet = getPetById(petId);
  return pet ? pet.name : 'Unknown Pet';
}
