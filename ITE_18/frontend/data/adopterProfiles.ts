export interface AdopterProfile {
  adopter_id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  birth_date: string;
  occupation: string;
  company_name: string;
  pronouns: string;
  social_media_url: string;
  profile_picture: string;
  
  // Home and Living Situation
  home_type: 'House' | 'Apartment' | 'Condo' | 'Townhouse';
  home_ownership: 'Own' | 'Rent';
  yard_size: string;
  household_members: number;
  children_ages: string;
  other_pets: string;
  
  // Experience and Preferences
  pet_experience: string;
  veterinarian_name: string;
  veterinarian_contact: string;
  
  // Uploaded Documents
  valid_id_url: string;
  home_photos: string[];
  
  // Alternate Contact Details
  alternate_contact_name: string;
  alternate_contact_phone: string;
  alternate_contact_relation: string;
  
  // Account Information
  registration_date: string;
  total_applications: number;
  approved_adoptions: number;
}

export const adopterProfiles: AdopterProfile[] = [
  {
    adopter_id: 1,
    full_name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Maple Street, San Francisco, CA 94102',
    birth_date: '1985-03-15',
    occupation: 'Software Engineer',
    company_name: 'Tech Innovations Inc.',
    pronouns: 'He/Him',
    social_media_url: 'https://facebook.com/johnsmith',
    profile_picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    
    home_type: 'House',
    home_ownership: 'Own',
    yard_size: 'Large (5000 sq ft)',
    household_members: 4,
    children_ages: '8, 10',
    other_pets: '1 Cat (Whiskers, 3 years old)',
    
    pet_experience: 'I have owned dogs for over 15 years. Previously had two Golden Retrievers who lived long, healthy lives. Very familiar with dog training, grooming, and healthcare.',
    veterinarian_name: 'Dr. Sarah Williams',
    veterinarian_contact: 'Paw Care Veterinary Clinic - (555) 987-6543',
    
    valid_id_url: 'https://images.unsplash.com/photo-1589395937047-e8417be9b00e?w=800',
    home_photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800'
    ],
    
    alternate_contact_name: 'Mary Smith',
    alternate_contact_phone: '+1 (555) 123-4568',
    alternate_contact_relation: 'Wife',
    
    registration_date: '2024-01-15',
    total_applications: 3,
    approved_adoptions: 1
  },
  {
    adopter_id: 2,
    full_name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Avenue, Los Angeles, CA 90001',
    birth_date: '1992-07-22',
    occupation: 'Graphic Designer',
    company_name: 'Creative Studios LLC',
    pronouns: 'She/Her',
    social_media_url: 'https://instagram.com/emmawilson',
    profile_picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    
    home_type: 'Apartment',
    home_ownership: 'Rent',
    yard_size: 'Balcony only',
    household_members: 1,
    children_ages: 'None',
    other_pets: 'None',
    
    pet_experience: 'Grew up with cats and have been caring for them since childhood. Very knowledgeable about cat behavior and health. Work from home which allows me to provide constant companionship.',
    veterinarian_name: 'Dr. James Thompson',
    veterinarian_contact: 'Urban Pet Care - (555) 876-5432',
    
    valid_id_url: 'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=800',
    home_photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800'
    ],
    
    alternate_contact_name: 'Rachel Wilson',
    alternate_contact_phone: '+1 (555) 234-5679',
    alternate_contact_relation: 'Sister',
    
    registration_date: '2024-03-10',
    total_applications: 2,
    approved_adoptions: 1
  },
  {
    adopter_id: 3,
    full_name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 345-6789',
    address: '789 Pine Road, Austin, TX 78701',
    birth_date: '1988-11-05',
    occupation: 'Personal Trainer',
    company_name: 'Fitness First Gym',
    pronouns: 'He/Him',
    social_media_url: 'https://twitter.com/mikechen',
    profile_picture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    
    home_type: 'Condo',
    home_ownership: 'Own',
    yard_size: 'Small patio',
    household_members: 2,
    children_ages: 'None',
    other_pets: 'None',
    
    pet_experience: 'First-time dog owner but have completed dog training courses. Very active lifestyle with daily outdoor activities.',
    veterinarian_name: 'Dr. Lisa Martinez',
    veterinarian_contact: 'Austin Animal Hospital - (555) 765-4321',
    
    valid_id_url: 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800',
    home_photos: [],
    
    alternate_contact_name: 'Jennifer Chen',
    alternate_contact_phone: '+1 (555) 345-6790',
    alternate_contact_relation: 'Wife',
    
    registration_date: '2024-06-20',
    total_applications: 1,
    approved_adoptions: 0
  },
  {
    adopter_id: 4,
    full_name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 456-7890',
    address: '321 Birch Lane, Seattle, WA 98101',
    birth_date: '1978-04-18',
    occupation: 'Librarian',
    company_name: 'Seattle Public Library',
    pronouns: 'She/Her',
    social_media_url: 'https://linkedin.com/in/sarahjohnson',
    profile_picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    
    home_type: 'House',
    home_ownership: 'Own',
    yard_size: 'Medium (3000 sq ft)',
    household_members: 2,
    children_ages: 'None',
    other_pets: '1 Cat (Mittens, 5 years old)',
    
    pet_experience: 'Lifelong cat lover. Have volunteered at local animal shelters for over 10 years. Very experienced with cat care and behavior.',
    veterinarian_name: 'Dr. Robert Davis',
    veterinarian_contact: 'Seattle Veterinary Center - (555) 654-3210',
    
    valid_id_url: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800',
    home_photos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800',
      'https://images.unsplash.com/photo-1560448204-444092d37e2b?w=800'
    ],
    
    alternate_contact_name: 'Robert Johnson',
    alternate_contact_phone: '+1 (555) 456-7891',
    alternate_contact_relation: 'Husband',
    
    registration_date: '2024-02-28',
    total_applications: 2,
    approved_adoptions: 0
  },
  {
    adopter_id: 5,
    full_name: 'David Martinez',
    email: 'david.m@email.com',
    phone: '+1 (555) 567-8901',
    address: '654 Cedar Drive, Denver, CO 80201',
    birth_date: '1983-09-12',
    occupation: 'Real Estate Agent',
    company_name: 'Denver Realty Group',
    pronouns: 'He/Him',
    social_media_url: 'https://facebook.com/davidmartinez',
    profile_picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    
    home_type: 'House',
    home_ownership: 'Own',
    yard_size: 'Large with fence (6000 sq ft)',
    household_members: 5,
    children_ages: '6, 9, 12',
    other_pets: 'None (Previously had a dog who passed away last year)',
    
    pet_experience: 'Had a Labrador Retriever for 12 years. Very familiar with dog care, training, and exercise needs. Our family is ready to welcome a new furry member.',
    veterinarian_name: 'Dr. Emily Rodriguez',
    veterinarian_contact: 'Mountain View Animal Clinic - (555) 543-2109',
    
    valid_id_url: 'https://images.unsplash.com/photo-1582282311717-a50f1e4dea5c?w=800',
    home_photos: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'
    ],
    
    alternate_contact_name: 'Maria Martinez',
    alternate_contact_phone: '+1 (555) 567-8902',
    alternate_contact_relation: 'Wife',
    
    registration_date: '2024-04-05',
    total_applications: 1,
    approved_adoptions: 0
  },
  {
    adopter_id: 6,
    full_name: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1 (555) 678-9012',
    address: '987 Willow Court, Portland, OR 97201',
    birth_date: '1955-12-08',
    occupation: 'Retired Teacher',
    company_name: 'N/A',
    pronouns: 'She/Her',
    social_media_url: 'https://facebook.com/lisaanderson',
    profile_picture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    
    home_type: 'House',
    home_ownership: 'Own',
    yard_size: 'Medium (2500 sq ft)',
    household_members: 1,
    children_ages: 'None (Adult children)',
    other_pets: 'None',
    
    pet_experience: 'Had cats throughout my life. Very gentle and patient with animals. Have plenty of time to dedicate to a pet\'s care and companionship.',
    veterinarian_name: 'Dr. Christopher Lee',
    veterinarian_contact: 'Portland Pet Hospital - (555) 432-1098',
    
    valid_id_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800',
    home_photos: [
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'
    ],
    
    alternate_contact_name: 'Katherine Anderson',
    alternate_contact_phone: '+1 (555) 678-9013',
    alternate_contact_relation: 'Daughter',
    
    registration_date: '2024-05-12',
    total_applications: 1,
    approved_adoptions: 1
  }
];

// Helper function to get adopter profile by ID
export function getAdopterProfile(adopterId: number): AdopterProfile | undefined {
  return adopterProfiles.find(profile => profile.adopter_id === adopterId);
}