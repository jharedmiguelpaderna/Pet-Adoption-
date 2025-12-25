<?php

namespace App\Http\Controllers;

use App\Models\Shelter;

class ReportController extends Controller
{
    public function shelterSummary(int $id)
    {
        $shelter = Shelter::with(['admin','pets.vetVisits','pets.adoptionRequests'])->find($id);
        if (!$shelter) return response()->json(['message' => 'Not found'], 404);

        $pets = $shelter->pets;
        $summary = [
            'shelter' => [
                'shelter_id' => $shelter->shelter_id,
                'shelter_name' => $shelter->shelter_name,
                'location' => $shelter->location,
            ],
            'counts' => [
                'pets_total' => $pets->count(),
                'pets_available' => $pets->where('adoption_status','Available')->count(),
                'pets_reserved' => $pets->where('adoption_status','Reserved')->count(),
                'pets_adopted' => $pets->where('adoption_status','Adopted')->count(),
                'adoptions_total' => $pets->flatMap->adoptionRequests->count(),
                'vet_visits_total' => $pets->flatMap->vetVisits->count(),
            ],
        ];

        return response()->json($summary);
    }

    public function petsSummary()
    {
        $totals = [
            'total' => \App\Models\Pet::count(),
            'available' => \App\Models\Pet::where('adoption_status','Available')->count(),
            'reserved' => \App\Models\Pet::where('adoption_status','Reserved')->count(),
            'adopted' => \App\Models\Pet::where('adoption_status','Adopted')->count(),
        ];
        return response()->json($totals);
    }
}


