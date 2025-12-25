export interface Notification {
  notification_id: number;
  adopter_id: number;
  pet_id: number;
  pet_name: string;
  type: 'approved' | 'pending' | 'interview_scheduled' | 'declined';
  message: string;
  created_at: string;
  is_read: boolean;
}

export const notifications: Notification[] = [
  {
    notification_id: 1,
    adopter_id: 1,
    pet_id: 2,
    pet_name: "Bella",
    type: "approved",
    message: "Your adoption request for Bella has been approved!",
    created_at: "2024-11-20T10:30:00",
    is_read: false
  },
  {
    notification_id: 2,
    adopter_id: 1,
    pet_id: 1,
    pet_name: "Max",
    type: "pending",
    message: "Your adoption request for Max is pending review.",
    created_at: "2024-11-19T14:15:00",
    is_read: false
  },
  {
    notification_id: 3,
    adopter_id: 1,
    pet_id: 2,
    pet_name: "Luna",
    type: "interview_scheduled",
    message: "Your interview for Luna is scheduled for November 25, 2024.",
    created_at: "2024-11-18T09:45:00",
    is_read: true
  },
  {
    notification_id: 4,
    adopter_id: 1,
    pet_id: 3,
    pet_name: "Buddy",
    type: "declined",
    message: "Your adoption request for Buddy was declined.",
    created_at: "2024-11-17T16:20:00",
    is_read: true
  },
  {
    notification_id: 5,
    adopter_id: 1,
    pet_id: 4,
    pet_name: "Whiskers",
    type: "approved",
    message: "Your adoption request for Whiskers has been approved!",
    created_at: "2024-11-16T11:00:00",
    is_read: true
  },
  {
    notification_id: 6,
    adopter_id: 1,
    pet_id: 5,
    pet_name: "Charlie",
    type: "approved",
    message: "Your adoption request for Charlie has been approved!",
    created_at: "2024-11-15T13:22:00",
    is_read: false
  },
  {
    notification_id: 7,
    adopter_id: 1,
    pet_id: 6,
    pet_name: "Daisy",
    type: "pending",
    message: "Your adoption request for Daisy is pending review.",
    created_at: "2024-11-14T08:45:00",
    is_read: true
  },
  {
    notification_id: 8,
    adopter_id: 1,
    pet_id: 7,
    pet_name: "Rocky",
    type: "interview_scheduled",
    message: "Your interview for Rocky is scheduled for November 28, 2024.",
    created_at: "2024-11-13T15:30:00",
    is_read: true
  },
  {
    notification_id: 9,
    adopter_id: 1,
    pet_id: 8,
    pet_name: "Milo",
    type: "approved",
    message: "Your adoption request for Milo has been approved!",
    created_at: "2024-11-12T10:10:00",
    is_read: true
  },
  {
    notification_id: 10,
    adopter_id: 1,
    pet_id: 9,
    pet_name: "Coco",
    type: "approved",
    message: "Your adoption request for Coco has been approved!",
    created_at: "2024-11-11T17:55:00",
    is_read: true
  },
  {
    notification_id: 11,
    adopter_id: 1,
    pet_id: 10,
    pet_name: "Shadow",
    type: "declined",
    message: "Your adoption request for Shadow was declined.",
    created_at: "2024-11-10T12:40:00",
    is_read: true
  },
  {
    notification_id: 12,
    adopter_id: 1,
    pet_id: 11,
    pet_name: "Molly",
    type: "pending",
    message: "Your adoption request for Molly is pending review.",
    created_at: "2024-11-09T09:15:00",
    is_read: true
  },
  {
    notification_id: 13,
    adopter_id: 1,
    pet_id: 12,
    pet_name: "Simba",
    type: "interview_scheduled",
    message: "Your interview for Simba is scheduled for December 1, 2024.",
    created_at: "2024-11-08T14:20:00",
    is_read: true
  },
  {
    notification_id: 14,
    adopter_id: 1,
    pet_id: 13,
    pet_name: "Oliver",
    type: "approved",
    message: "Your adoption request for Oliver has been approved!",
    created_at: "2024-11-07T11:30:00",
    is_read: true
  },
  {
    notification_id: 15,
    adopter_id: 1,
    pet_id: 14,
    pet_name: "Nala",
    type: "approved",
    message: "Your adoption request for Nala has been approved!",
    created_at: "2024-11-06T16:45:00",
    is_read: true
  }
];

export function getNotificationsByAdopterId(adopterId: number): Notification[] {
  return notifications.filter(n => n.adopter_id === adopterId);
}

export function getUnreadNotificationsCount(adopterId: number): number {
  return notifications.filter(n => n.adopter_id === adopterId && !n.is_read).length;
}