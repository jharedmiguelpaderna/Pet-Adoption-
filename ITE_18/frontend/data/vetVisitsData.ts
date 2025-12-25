// Mock data for vet visits - matching Laravel backend model

export interface VetVisit {
  vet_id: number;
  pet_id: number;
  vet_name: string;
  visit_date: string;
  purpose: string;
  diagnosis: string;
  treatment: string;
  remarks: string;
  next_visit_due: string | null;
}

export const vetVisits: VetVisit[] = [
  {
    vet_id: 1,
    pet_id: 1,
    vet_name: 'Dr. Sarah Johnson',
    visit_date: '2024-12-15',
    purpose: 'Annual Checkup',
    diagnosis: 'Healthy, no issues detected',
    treatment: 'Routine vaccination administered',
    remarks: 'Pet is in excellent health. All vaccinations up to date. Weight: 45 lbs.',
    next_visit_due: '2025-12-15'
  },
  {
    vet_id: 2,
    pet_id: 2,
    vet_name: 'Dr. Michael Chen',
    visit_date: '2024-11-20',
    purpose: 'Vaccination',
    diagnosis: 'Healthy',
    treatment: 'Rabies and distemper vaccines administered',
    remarks: 'No adverse reactions observed. Pet responded well to vaccines.',
    next_visit_due: '2025-11-20'
  },
  {
    vet_id: 3,
    pet_id: 3,
    vet_name: 'Dr. Emily Rodriguez',
    visit_date: '2024-12-28',
    purpose: 'Dental Cleaning',
    diagnosis: 'Moderate tartar buildup',
    treatment: 'Dental cleaning scheduled, pre-procedure bloodwork required',
    remarks: 'Scheduled for dental cleaning and examination next week.',
    next_visit_due: '2025-06-28'
  },
  {
    vet_id: 4,
    pet_id: 1,
    vet_name: 'Dr. Sarah Johnson',
    visit_date: '2024-11-05',
    purpose: 'Injury Check',
    diagnosis: 'Minor laceration on paw pad',
    treatment: 'Cleaned and bandaged wound, antibiotic ointment applied',
    remarks: 'Follow-up in 1 week recommended to ensure proper healing.',
    next_visit_due: '2024-11-12'
  },
  {
    vet_id: 5,
    pet_id: 6,
    vet_name: 'Dr. James Wilson',
    visit_date: '2024-12-22',
    purpose: 'Spay Surgery',
    diagnosis: 'Pre-surgery examination - healthy for procedure',
    treatment: 'Pre-surgery consultation, surgery scheduled',
    remarks: 'Surgery scheduled for next week. Owner provided post-op care instructions.',
    next_visit_due: '2024-12-29'
  },
  {
    vet_id: 6,
    pet_id: 11,
    vet_name: 'Dr. Sarah Johnson',
    visit_date: '2024-10-30',
    purpose: 'Skin Condition',
    diagnosis: 'Mild dermatitis due to allergies',
    treatment: 'Prescribed medicated shampoo and antihistamines',
    remarks: 'Condition improving with treatment. Continue medication for 2 weeks.',
    next_visit_due: '2024-11-13'
  },
  {
    vet_id: 7,
    pet_id: 8,
    vet_name: 'Dr. Emily Rodriguez',
    visit_date: '2024-12-30',
    purpose: 'Wellness Exam',
    diagnosis: 'Overall healthy condition',
    treatment: 'Heartworm test and fecal exam scheduled',
    remarks: 'Routine wellness examination. Will include heartworm test and fecal exam.',
    next_visit_due: '2025-12-30'
  },
  {
    vet_id: 8,
    pet_id: 6,
    vet_name: 'Dr. Michael Chen',
    visit_date: '2024-11-12',
    purpose: 'Neuter Surgery',
    diagnosis: 'Successful neutering procedure',
    treatment: 'Neuter procedure completed, pain medication provided',
    remarks: 'Recovery normal. Sutures to be removed in 10 days. E-collar worn.',
    next_visit_due: '2024-11-22'
  },
  {
    vet_id: 9,
    pet_id: 2,
    vet_name: 'Dr. Sarah Johnson',
    visit_date: '2024-12-25',
    purpose: 'Follow-up',
    diagnosis: 'No complications from vaccination',
    treatment: 'Routine check, no treatment needed',
    remarks: 'Follow-up appointment to check vaccination site. No complications observed.',
    next_visit_due: null
  },
  {
    vet_id: 10,
    pet_id: 11,
    vet_name: 'Dr. James Wilson',
    visit_date: '2024-10-15',
    purpose: 'Microchip Implant',
    diagnosis: 'Healthy, ready for microchip',
    treatment: 'Microchip implanted successfully',
    remarks: 'Microchip successfully implanted. Registration number: 982000123456789',
    next_visit_due: null
  }
];

// Helper function to determine if a visit is upcoming
export const isUpcomingVisit = (visitDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const visit = new Date(visitDate);
  visit.setHours(0, 0, 0, 0);
  return visit >= today;
};

// Helper function to format date for display
export const formatVisitDate = (dateString: string): string => {
  if (!dateString) return 'Not scheduled';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};