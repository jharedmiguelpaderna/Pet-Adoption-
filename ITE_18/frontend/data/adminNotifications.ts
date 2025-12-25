export interface AdminNotification {
  notification_id: number;
  admin_id: number;
  type: 'adoption_request' | 'adoption_approved' | 'adoption_declined' | 'shelter_created' | 'shelter_updated' | 'pet_adopted' | 'vet_visit' | 'profile_updated';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  related_id?: number;
}

export const adminNotifications: AdminNotification[] = [
  {
    notification_id: 1,
    admin_id: 1,
    type: 'adoption_request',
    title: 'New Adoption Request',
    message: 'New adoption request submitted by John Smith for pet Max.',
    is_read: false,
    created_at: '2024-11-23T10:30:00',
    related_id: 1
  },
  {
    notification_id: 2,
    admin_id: 1,
    type: 'vet_visit',
    title: 'Upcoming Vet Visit',
    message: 'Reminder: Upcoming vet visit for Charlie on November 30, 2025.',
    is_read: false,
    created_at: '2024-11-23T09:15:00',
    related_id: 5
  },
  {
    notification_id: 3,
    admin_id: 1,
    type: 'adoption_approved',
    title: 'Adoption Approved',
    message: 'Adoption request for Luna has been approved.',
    is_read: false,
    created_at: '2024-11-23T08:45:00',
    related_id: 2
  },
  {
    notification_id: 4,
    admin_id: 1,
    type: 'pet_adopted',
    title: 'Pet Adopted',
    message: 'Pet Daisy was marked as adopted.',
    is_read: true,
    created_at: '2024-11-22T16:20:00',
    related_id: 7
  },
  {
    notification_id: 5,
    admin_id: 1,
    type: 'shelter_created',
    title: 'New Shelter Created',
    message: "Shelter 'Happy Paws Animal Shelter' was created by Admin.",
    is_read: true,
    created_at: '2024-11-22T14:10:00',
    related_id: 1
  },
  {
    notification_id: 6,
    admin_id: 1,
    type: 'profile_updated',
    title: 'Profile Update',
    message: 'Adopter Emma Wilson updated her profile information.',
    is_read: true,
    created_at: '2024-11-22T11:30:00',
    related_id: 3
  },
  {
    notification_id: 7,
    admin_id: 1,
    type: 'shelter_updated',
    title: 'Shelter Updated',
    message: "Shelter 'Paws & Claws Rescue Center' updated staff contact info.",
    is_read: true,
    created_at: '2024-11-21T15:45:00',
    related_id: 2
  },
  {
    notification_id: 8,
    admin_id: 1,
    type: 'adoption_declined',
    title: 'Adoption Declined',
    message: 'Adoption request for Buddy was declined.',
    is_read: true,
    created_at: '2024-11-21T13:20:00',
    related_id: 4
  },
  {
    notification_id: 9,
    admin_id: 1,
    type: 'vet_visit',
    title: 'Vet Visit Scheduled',
    message: 'Vet visit scheduled for pet Bella on December 5, 2025.',
    is_read: true,
    created_at: '2024-11-21T10:00:00',
    related_id: 6
  },
  {
    notification_id: 10,
    admin_id: 1,
    type: 'adoption_request',
    title: 'New Adoption Request',
    message: 'New adoption request submitted by Sarah Johnson for pet Rocky.',
    is_read: true,
    created_at: '2024-11-20T17:30:00',
    related_id: 8
  }
];
