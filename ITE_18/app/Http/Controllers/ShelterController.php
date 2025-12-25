<?php

namespace App\Http\Controllers;

use App\Models\Shelter;

class ShelterController extends Controller
{
    public function index()
    {
        return response()->json(
            Shelter::with('admin')->orderBy('shelter_id')->get()
        );
    }

    public function show(int $id)
    {
        $shelter = Shelter::with(['admin','pets'])->find($id);
        if (!$shelter) return response()->json(['message' => 'Not found'], 404);
        return response()->json($shelter);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $data = $request->validate([
            'admin_id' => 'required|integer|exists:admin,admin_id',
            'shelter_name' => 'required|string|max:255',
            'staff_name' => 'sometimes|nullable|string|max:255',
            'staff_email' => 'sometimes|nullable|email',
            'staff_phone' => 'sometimes|nullable|string|max:30',
            'location' => 'sometimes|nullable|string|max:255',
            'contact_info' => 'sometimes|nullable|string|max:255',
        ]);
        $shelter = Shelter::create($data);
        return response()->json($shelter, 201);
    }

    public function update(\Illuminate\Http\Request $request, int $id)
    {
        $shelter = Shelter::find($id);
        if (!$shelter) return response()->json(['message' => 'Not found'], 404);
        $data = $request->validate([
            'admin_id' => 'sometimes|integer|exists:admin,admin_id',
            'shelter_name' => 'sometimes|string|max:255',
            'staff_name' => 'sometimes|nullable|string|max:255',
            'staff_email' => 'sometimes|nullable|email',
            'staff_phone' => 'sometimes|nullable|string|max:30',
            'location' => 'sometimes|nullable|string|max:255',
            'contact_info' => 'sometimes|nullable|string|max:255',
        ]);
        $shelter->fill($data)->save();
        return response()->json($shelter);
    }

    public function destroy(int $id)
    {
        $shelter = Shelter::find($id);
        if (!$shelter) return response()->json(['message' => 'Not found'], 404);
        $shelter->delete();
        return response()->json(null, 204);
    }

    public function getSheltersByAdmin(int $id)
    {
        return response()->json(Shelter::where('admin_id',$id)->orderBy('shelter_id')->get());
    }
}


