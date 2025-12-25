export interface AdoptionRequest {
  request_id: number;
  adopter_id: number;
  adopter_name: string;
  adopter_email: string;
  pet_id: number;
  pet_name: string;
  pet_species: string;
  pet_photo_url: string;
  application_date: string;
  online_interview_date: string | null;
  online_interview_time: string | null;
  meet_greet: 'Yes' | 'No';
  reason_for_adoption: string;
  adoption_status: 'Pending' | 'Approved' | 'Declined';
  notes: string | null;
}

export const adoptionRequests: AdoptionRequest[] = [
  {
    request_id: 1,
    adopter_id: 1,
    adopter_name: 'John Smith',
    adopter_email: 'john.smith@email.com',
    pet_id: 1,
    pet_name: 'Max',
    pet_species: 'Dog',
    pet_photo_url: 'https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    application_date: '2024-11-20',
    online_interview_date: '2024-11-28',
    online_interview_time: '14:00',
    meet_greet: 'Yes',
    reason_for_adoption: 'I have always loved dogs and have a spacious backyard. Max seems like the perfect companion for our family. We have experience with Golden Retrievers and can provide a loving home.',
    adoption_status: 'Pending',
    notes: 'Your application is currently being processed. We will get back to you soon with an update.'
  },
  {
    request_id: 2,
    adopter_id: 2,
    adopter_name: 'Emma Wilson',
    adopter_email: 'emma.wilson@email.com',
    pet_id: 2,
    pet_name: 'Luna',
    pet_species: 'Cat',
    pet_photo_url: 'https://images.unsplash.com/photo-1667518158890-0a6cf60de601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    application_date: '2024-11-21',
    online_interview_date: '2024-11-29',
    online_interview_time: '10:30',
    meet_greet: 'Yes',
    reason_for_adoption: 'Luna is absolutely adorable! I work from home and can provide constant companionship. I have a cat-friendly apartment and love taking care of cats.',
    adoption_status: 'Approved',
    notes: 'Congratulations! Your adoption application has been approved. We will contact you shortly to schedule the next steps.'
  },
  {
    request_id: 3,
    adopter_id: 3,
    adopter_name: 'Michael Chen',
    adopter_email: 'michael.chen@email.com',
    pet_id: 3,
    pet_name: 'Buddy',
    pet_species: 'Dog',
    pet_photo_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    application_date: '2024-11-18',
    online_interview_date: '2024-11-25',
    online_interview_time: '16:00',
    meet_greet: 'No',
    reason_for_adoption: 'Looking for a loyal companion for my morning runs and outdoor activities.',
    adoption_status: 'Declined',
    notes: 'Thank you for your interest. Unfortunately, your application has not been approved at this time. We encourage you to browse other available pets.'
  },
  {
    request_id: 4,
    adopter_id: 4,
    adopter_name: 'Sarah Johnson',
    adopter_email: 'sarah.j@email.com',
    pet_id: 4,
    pet_name: 'Bella',
    pet_species: 'Cat',
    pet_photo_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    application_date: '2024-11-22',
    online_interview_date: null,
    online_interview_time: null,
    meet_greet: 'Yes',
    reason_for_adoption: 'Bella would be perfect for our quiet home. We have always wanted a calm and gentle cat to keep us company.',
    adoption_status: 'Pending',
    notes: 'Your application is currently being processed. We will get back to you soon with an update.'
  },
  {
    request_id: 5,
    adopter_id: 5,
    adopter_name: 'David Martinez',
    adopter_email: 'david.m@email.com',
    pet_id: 5,
    pet_name: 'Charlie',
    pet_species: 'Dog',
    pet_photo_url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    application_date: '2024-11-23',
    online_interview_date: '2024-11-30',
    online_interview_time: '11:00',
    meet_greet: 'Yes',
    reason_for_adoption: 'Charlie looks like an amazing dog. My kids have been asking for a dog for years and we are finally ready. We have a large fenced yard and live near a dog park.',
    adoption_status: 'Pending',
    notes: 'Your application is currently being processed. We will get back to you soon with an update.'
  },
  {
    request_id: 6,
    adopter_id: 6,
    adopter_name: 'Lisa Anderson',
    adopter_email: 'lisa.anderson@email.com',
    pet_id: 6,
    pet_name: 'Daisy',
    pet_species: 'Cat',
    pet_photo_url: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    application_date: '2024-11-19',
    online_interview_date: '2024-11-27',
    online_interview_time: '15:30',
    meet_greet: 'No',
    reason_for_adoption: 'I am a senior citizen living alone and would love to have a cat for companionship.',
    adoption_status: 'Approved',
    notes: 'Congratulations! Your adoption application has been approved. We will contact you shortly to schedule the next steps.'
  }
];