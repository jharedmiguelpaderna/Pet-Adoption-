<?php

namespace App\Http\Controllers;

use App\Models\AdoptionRequest;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdoptionController extends Controller
{
    public function index()
    {
        return response()->json(AdoptionRequest::with(['adopter', 'pet'])->orderByDesc('request_id')->get());
    }

    public function show(int $id)
    {
        $req = AdoptionRequest::with(['adopter', 'pet'])->find($id);
        if (!$req) return response()->json(['message'=>'Not found'],404);
        return response()->json($req);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'adopter_id' => 'required|integer|exists:adopters,adopter_id',
            'pet_id' => 'required|integer|exists:pets,pet_id',
            'application_date' => 'required|date',
            'online_interview_date' => 'nullable|date',
            'online_interview_time' => 'nullable',
            'meet_greet' => 'required|in:Yes,No',
            'reason_for_adoption' => 'nullable|string',
            'adoption_status' => 'required|in:Pending,Approved,Rejected',
            'notes' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($data) {
            $req = AdoptionRequest::create($data);
            // Don't change pet status when adopter submits request
            // Pet status should only change when admin approves/rejects the request
            // $this->syncPetStatus($req->pet_id, $req->adoption_status);
            return response()->json($req, 201);
        });
    }

    public function updateStatus(Request $request, int $id)
    {
        $data = $request->validate([
            'adoption_status' => 'required|in:Pending,Approved,Rejected',
            'notes' => 'nullable|string',
        ]);

        return DB::transaction(function () use ($id, $data) {
            $req = AdoptionRequest::with(['adopter', 'pet'])->find($id);
            if (!$req) return response()->json(['message' => 'Not found'], 404);
            $req->fill($data)->save();
            $this->syncPetStatus($req->pet_id, $req->adoption_status);
            // Reload with relationships to ensure fresh data
            return response()->json($req->fresh(['adopter', 'pet']));
        });
    }

    public function updateInterview(Request $request, int $id)
    {
        $data = $request->validate([
            'online_interview_date' => 'required|date',
            'online_interview_time' => 'required',
        ]);

        $req = AdoptionRequest::find($id);
        if (!$req) return response()->json(['message' => 'Not found'], 404);
        $req->fill($data)->save();
        return response()->json($req);
    }

    public function destroy(int $id)
    {
        $req = AdoptionRequest::find($id);
        if (!$req) return response()->json(['message'=>'Not found'],404);
        $req->delete();
        return response()->json(null,204);
    }

    public function getByAdopter(int $adopter_id)
    {
        return response()->json(AdoptionRequest::with(['adopter', 'pet'])->where('adopter_id',$adopter_id)->orderByDesc('request_id')->get());
    }

    public function getMyAdoptions(Request $request)
    {
        // Get the authenticated adopter's ID from the request
        $adopterId = $request->user()->adopter_id ?? $request->user()->id;
        
        if (!$adopterId) {
            return response()->json(['message' => 'Adopter ID not found'], 400);
        }

        return response()->json(
            AdoptionRequest::with(['adopter', 'pet'])
                ->where('adopter_id', $adopterId)
                ->orderByDesc('request_id')
                ->get()
        );
    }

    public function getByPet(int $pet_id)
    {
        return response()->json(AdoptionRequest::with(['adopter', 'pet'])->where('pet_id',$pet_id)->orderByDesc('request_id')->get());
    }

    private function syncPetStatus(int $petId, string $requestStatus): void
    {
        // Only change pet status when request is rejected (make pet available again)
        // Approved doesn't mean adopted - it just means staff and adopter will talk/interview
        // Pet status should only change to "Adopted" when admin manually changes it, not automatically
        if ($requestStatus === 'Rejected') {
            Pet::where('pet_id', $petId)->update(['adoption_status' => 'Available']);
        }
        // For Pending and Approved, don't change pet status automatically
        // Admin can manually change pet status if needed
    }
}


