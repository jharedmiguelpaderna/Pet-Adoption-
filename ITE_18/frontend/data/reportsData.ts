// Mock data for reports and analytics

export interface ShelterSummary {
  shelter: {
    shelter_id: number;
    shelter_name: string;
    location: string | null;
  };
  counts: {
    pets_total: number;
    pets_available: number;
    pets_reserved: number;
    pets_adopted: number;
    adoptions_total: number;
    vet_visits_total: number;
  };
}

export interface PetsSummary {
  total: number;
  available: number;
  reserved: number;
  adopted: number;
}

// Overall Pet Statistics (from petsSummary endpoint)
export const petsSummary: PetsSummary = {
  total: 217,
  available: 89,
  reserved: 25,
  adopted: 103
};

// Individual Shelter Summaries (from shelterSummary endpoint)
export const shelterSummaries: ShelterSummary[] = [
  {
    shelter: {
      shelter_id: 1,
      shelter_name: 'Happy Paws Shelter',
      location: '123 Bay Street, San Francisco, CA 94102'
    },
    counts: {
      pets_total: 45,
      pets_available: 18,
      pets_reserved: 8,
      pets_adopted: 19,
      adoptions_total: 28,
      vet_visits_total: 42
    }
  },
  {
    shelter: {
      shelter_id: 2,
      shelter_name: 'Second Chance Rescue',
      location: '456 Hope Avenue, Los Angeles, CA 90028'
    },
    counts: {
      pets_total: 32,
      pets_available: 15,
      pets_reserved: 5,
      pets_adopted: 12,
      adoptions_total: 19,
      vet_visits_total: 31
    }
  },
  {
    shelter: {
      shelter_id: 3,
      shelter_name: 'Furry Friends Haven',
      location: '789 Oak Drive, Seattle, WA 98101'
    },
    counts: {
      pets_total: 38,
      pets_available: 22,
      pets_reserved: 6,
      pets_adopted: 10,
      adoptions_total: 25,
      vet_visits_total: 38
    }
  },
  {
    shelter: {
      shelter_id: 4,
      shelter_name: 'City Animal Shelter',
      location: '321 Main Street, Portland, OR 97201'
    },
    counts: {
      pets_total: 52,
      pets_available: 34,
      pets_reserved: 6,
      pets_adopted: 12,
      adoptions_total: 31,
      vet_visits_total: 54
    }
  }
];

// Additional mock data for features not yet in backend
export interface AdoptionStats {
  total_requests: number;
  approved: number;
  declined: number;
  pending: number;
  approval_rate: number;
}

export interface VetVisitSummary {
  upcoming: number;
  completed: number;
  overdue: number;
  total: number;
}

export interface UserActivity {
  total_adopters: number;
  active_adopters: number;
  total_staff: number;
  active_staff: number;
}

export interface MonthlyTrend {
  month: string;
  adoptions: number;
  applications: number;
}

// Adoption Statistics (for future backend implementation)
export const adoptionStats: AdoptionStats = {
  total_requests: 156,
  approved: 103,
  declined: 28,
  pending: 25,
  approval_rate: 66.0
};

// Vet Visit Summary (for future backend implementation)
export const vetVisitSummary: VetVisitSummary = {
  upcoming: 18,
  completed: 142,
  overdue: 5,
  total: 165
};

// User Activity (for future backend implementation)
export const userActivity: UserActivity = {
  total_adopters: 234,
  active_adopters: 187,
  total_staff: 24,
  active_staff: 22
};

// Monthly Trends - Last 6 Months (for future backend implementation)
export const monthlyTrends: MonthlyTrend[] = [
  { month: 'Jun', adoptions: 12, applications: 18 },
  { month: 'Jul', adoptions: 15, applications: 22 },
  { month: 'Aug', adoptions: 18, applications: 26 },
  { month: 'Sep', adoptions: 21, applications: 31 },
  { month: 'Oct', adoptions: 19, applications: 28 },
  { month: 'Nov', adoptions: 18, applications: 31 }
];