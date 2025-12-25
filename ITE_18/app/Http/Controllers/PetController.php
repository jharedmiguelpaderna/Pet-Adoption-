<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PetController extends Controller
{
    public function available()
    {
        $pets = Pet::where('adoption_status', 'Available')->orderBy('pet_id')->get();
        return response()->json($pets);
    }

    public function reserved()
    {
        $pets = Pet::where('adoption_status', 'Reserved')->orderBy('pet_id')->get();
        return response()->json($pets);
    }

    public function adopted()
    {
        $pets = Pet::where('adoption_status', 'Adopted')->orderBy('pet_id')->get();
        return response()->json($pets);
    }

    public function index()
    {
        // Public browse endpoint: return all pets ordered by ID
        // Frontend handles filtering (by status, species, shelter, etc.)
        $pets = Pet::orderBy('pet_id')->get();

        return response()->json($pets);
    }

    public function getPetsByShelter(int $shelter_id)
    {
        $pets = Pet::where('shelter_id', $shelter_id)->orderBy('pet_id')->get();
        return response()->json($pets);
    }

    public function show(int $petId)
    {
        $pet = Pet::with(['shelter.admin'])->find($petId);
        if (!$pet) {
            return response()->json(['message' => 'Pet not found'], 404);
        }
        return response()->json($pet);
    }

    public function store(Request $request)
    {
        $validated = $this->validateData($request);
        $pet = Pet::create($validated);
        return response()->json($pet, 201);
    }

    public function update(Request $request, int $petId)
    {
        $pet = Pet::find($petId);
        if (!$pet) {
            return response()->json(['message' => 'Pet not found'], 404);
        }
        $validated = $this->validateData($request, partial: true);
        $pet->fill($validated);
        $pet->save();
        return response()->json($pet);
    }

    public function destroy(int $petId)
    {
        $pet = Pet::find($petId);
        if (!$pet) {
            return response()->json(['message' => 'Pet not found'], 404);
        }
        $pet->delete();
        return response()->json(null, 204);
    }

    private function validateData(Request $request, bool $partial = false): array
    {
        $rules = [
            'shelter_id' => $partial ? 'sometimes|integer|exists:shelters,shelter_id' : 'required|integer|exists:shelters,shelter_id',
            'name' => $partial ? 'sometimes|string|max:100' : 'required|string|max:100',
            'species' => $partial ? 'sometimes|string|max:50' : 'required|string|max:50',
            'breed' => 'sometimes|nullable|string|max:100',
            'age' => 'sometimes|nullable|integer|min:0',
            'gender' => 'sometimes|nullable|string|max:10',
            'weight' => 'sometimes|nullable|numeric|min:0',
            'health_status' => 'sometimes|nullable|string|max:100',
            'food_preferences' => 'sometimes|nullable|string|max:255',
            'last_vet_visit' => 'sometimes|nullable|date',
            'next_vet_visit_due' => 'sometimes|nullable|date',
            'adoption_status' => 'sometimes|nullable|string|max:50',
            'date_admitted' => 'sometimes|nullable|date',
            'description' => 'sometimes|nullable|string',
            'photo_url' => 'sometimes|nullable|string',
        ];

        return $request->validate($rules);
    }
}


