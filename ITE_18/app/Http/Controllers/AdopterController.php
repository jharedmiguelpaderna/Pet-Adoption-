<?php

namespace App\Http\Controllers;

use App\Models\Adopter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdopterController extends Controller
{
    // READ: List all adopters
    public function index()
    {
        return response()->json(Adopter::orderBy('adopter_id')->get());
    }

    // READ: Get a single adopter by ID
    public function show(int $id)
    {
        $adopter = Adopter::find($id);
        if (!$adopter) return response()->json(['message' => 'Not found'], 404);
        return response()->json($adopter);
    }

    // CREATE: Register a new adopter
    public function register(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:30',
            'email' => 'required|email|unique:adopters,email',
            'password' => 'required|string|min:8',
            'birth_date' => 'nullable|date',
            'occupation' => 'nullable|string|max:100',
            'company_name' => 'nullable|string|max:150',
            'social_media_profile' => 'nullable|url|max:255',
            'status' => 'nullable|string|max:50',
            'pronouns' => 'nullable|string|max:50',
            'alternate_contact_name' => 'nullable|string|max:150',
            'alternate_contact_relationship' => 'nullable|string|max:100',
            'alternate_contact_phone' => 'nullable|string|max:30',
            'alternate_contact_email' => 'nullable|email',
            'valid_id' => 'nullable|url|max:255',
            'home_photos' => 'nullable|url|max:255',
        ]);

        $data['password'] = Hash::make($data['password']);
        $adopter = Adopter::create($data);
        return response()->json($adopter, 201);
    }

    // AUTH: Simple email-based login (not CRUD)
    public function login(Request $request)
    {
        $data = $request->validate(['email' => 'required|email']);
        $adopter = Adopter::where('email',$data['email'])->first();
        if (!$adopter) return response()->json(['message'=>'Invalid credentials'],401);
        return response()->json(['message'=>'Login ok']);
    }

    // UPDATE: Update own adopter profile (self-update)
    public function updateSelf(Request $request)
    {
        $adopter = $request->user();
        if (!$adopter || !($adopter instanceof Adopter)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        
        $data = $request->validate([
            'first_name'=>'sometimes|nullable|string|max:100',
            'last_name'=>'sometimes|nullable|string|max:100',
            'address'=>'sometimes|nullable|string',
            'phone'=>'sometimes|nullable|string|max:30',
            'email'=>'sometimes|email|unique:adopters,email,' . $adopter->adopter_id . ',adopter_id',
            'birth_date'=>'sometimes|nullable|date',
            'occupation'=>'sometimes|nullable|string|max:100',
            'company_name'=>'sometimes|nullable|string|max:150',
            'pronouns'=>'sometimes|nullable|string|max:50',
            'profile_picture'=>'sometimes|nullable|string',
        ]);
        
        // Convert empty strings to null for nullable fields
        if (isset($data['first_name']) && $data['first_name'] === '') {
            $data['first_name'] = null;
        }
        if (isset($data['last_name']) && $data['last_name'] === '') {
            $data['last_name'] = null;
        }
        if (isset($data['phone']) && $data['phone'] === '') {
            $data['phone'] = null;
        }
        if (isset($data['address']) && $data['address'] === '') {
            $data['address'] = null;
        }
        if (isset($data['occupation']) && $data['occupation'] === '') {
            $data['occupation'] = null;
        }
        if (isset($data['company_name']) && $data['company_name'] === '') {
            $data['company_name'] = null;
        }
        if (isset($data['pronouns']) && $data['pronouns'] === '') {
            $data['pronouns'] = null;
        }
        
        $adopter->fill($data)->save();
        return response()->json($adopter);
    }

    // UPDATE: Update adopter details (admin only)
    public function update(Request $request, int $id)
    {
        $adopter = Adopter::find($id);
        if (!$adopter) return response()->json(['message' => 'Not found'], 404);
        $data = $request->validate([
            'first_name'=>'sometimes|string|max:100',
            'last_name'=>'sometimes|string|max:100',
            'address'=>'sometimes|nullable|string',
            'phone'=>'sometimes|nullable|string|max:30',
            'email'=>'sometimes|email|unique:adopters,email,' . $id . ',adopter_id',
            'password'=>'sometimes|string|min:8',
            'birth_date'=>'sometimes|nullable|date',
            'occupation'=>'sometimes|nullable|string|max:100',
            'company_name'=>'sometimes|nullable|string|max:150',
            'social_media_profile'=>'sometimes|nullable|url|max:255',
            'status'=>'sometimes|nullable|string|max:50',
            'pronouns'=>'sometimes|nullable|string|max:50',
            'alternate_contact_name'=>'sometimes|nullable|string|max:150',
            'alternate_contact_relationship'=>'sometimes|nullable|string|max:100',
            'alternate_contact_phone'=>'sometimes|nullable|string|max:30',
            'alternate_contact_email'=>'sometimes|nullable|email',
            'valid_id'=>'sometimes|nullable|url|max:255',
            'home_photos'=>'sometimes|nullable|url|max:255',
        ]);
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        $adopter->fill($data)->save();
        return response()->json($adopter);
    }

    // DELETE: Remove adopter
    public function destroy(int $id)
    {
        $adopter = Adopter::find($id);
        if (!$adopter) return response()->json(['message' => 'Not found'], 404);
        $adopter->delete();
        return response()->json(null, 204);
    }
}


