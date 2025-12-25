<?php

namespace App\Http\Controllers;

use App\Models\VetVisit;
use App\Models\Pet;
use Illuminate\Http\Request;

class VetVisitController extends Controller
{
    public function index()
    {
        // Get the authenticated admin
        $admin = auth('sanctum')->user();
        
        if (!$admin) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        
        // Get all shelter IDs for this admin
        $shelterIds = \App\Models\Shelter::where('admin_id', $admin->admin_id)
            ->pluck('shelter_id')
            ->toArray();
        
        // Get all pet IDs from admin's shelters
        $petIds = Pet::whereIn('shelter_id', $shelterIds)
            ->pluck('pet_id')
            ->toArray();
        
        // Get vet visits only for admin's pets
        $vetVisits = VetVisit::whereIn('pet_id', $petIds)
            ->orderByDesc('vet_id')
            ->get();
        
        return response()->json($vetVisits);
    }

    public function show(int $id)
    {
        $visit = VetVisit::find($id);
        if (!$visit) return response()->json(['message'=>'Not found'],404);
        return response()->json($visit);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'pet_id' => 'required|integer|exists:pets,pet_id',
            'vet_name' => 'required|string|max:150',
            'visit_date' => 'required|date',
            'purpose' => 'nullable|string|max:150',
            'diagnosis' => 'nullable|string',
            'treatment' => 'nullable|string',
            'remarks' => 'nullable|string',
            'next_visit_due' => 'nullable|date',
        ]);

        Pet::findOrFail($data['pet_id']);
        $visit = VetVisit::create($data);
        return response()->json($visit, 201);
    }

    public function update(Request $request, int $id)
    {
        $visit = VetVisit::find($id);
        if (!$visit) return response()->json(['message'=>'Not found'],404);
        $data = $request->validate([
            'pet_id' => 'sometimes|integer|exists:pets,pet_id',
            'vet_name' => 'sometimes|string|max:150',
            'visit_date' => 'sometimes|date',
            'purpose' => 'sometimes|nullable|string|max:150',
            'diagnosis' => 'sometimes|nullable|string',
            'treatment' => 'sometimes|nullable|string',
            'remarks' => 'sometimes|nullable|string',
            'next_visit_due' => 'sometimes|nullable|date',
        ]);
        $visit->fill($data)->save();
        return response()->json($visit);
    }

    public function destroy(int $id)
    {
        $visit = VetVisit::find($id);
        if (!$visit) return response()->json(['message'=>'Not found'],404);
        $visit->delete();
        return response()->json(null,204);
    }
}


