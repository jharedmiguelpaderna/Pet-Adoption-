<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Shelter;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // READ: List all admins
    public function index()
    {
        return response()->json(Admin::orderBy('admin_id')->get());
    }

    // READ: Get a single admin by ID (with shelters)
    public function show(int $id)
    {
        $admin = Admin::with('shelters')->find($id);
        if (!$admin) return response()->json(['message' => 'Not found'], 404);
        return response()->json($admin);
    }

    // CREATE: Register a new admin (and its shelter)
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admin,email',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:30',
            'shelter' => 'required|array',
            'shelter.shelter_name' => 'required|string|max:255',
            'shelter.location' => 'nullable|string|max:255',
            'shelter.contact_info' => 'nullable|string|max:255',
            'shelter.staff_name' => 'nullable|string|max:255',
            'shelter.staff_email' => 'nullable|email',
            'shelter.staff_phone' => 'nullable|string|max:30',
        ]);

        $admin = Admin::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'phone' => $data['phone'] ?? null,
        ]);

        $s = $data['shelter'];
        Shelter::create([
            'admin_id' => $admin->admin_id,
            'shelter_name' => $s['shelter_name'],
            'location' => $s['location'] ?? null,
            'contact_info' => $s['contact_info'] ?? null,
            'staff_name' => $s['staff_name'] ?? null,
            'staff_email' => $s['staff_email'] ?? null,
            'staff_phone' => $s['staff_phone'] ?? null,
        ]);

        return response()->json($admin->load('shelters'), 201);
    }

    // AUTH: Email/password login (not CRUD)
    public function login(Request $request)
    {
        $data = $request->validate(['email' => 'required|email', 'password' => 'required|string']);
        $admin = Admin::where('email', $data['email'])->first();
        if (!$admin || !password_verify($data['password'], $admin->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        return response()->json(['message' => 'Login ok']);
    }

    // UPDATE: Update own admin profile (self-update)
    public function updateSelf(Request $request)
    {
        $admin = $request->user();
        if (!$admin || !($admin instanceof Admin)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:admin,email,' . $admin->admin_id . ',admin_id',
            'phone' => 'sometimes|nullable|string|max:30',
            'profile_picture' => 'sometimes|nullable|string',
        ]);
        
        $admin->fill($data)->save();
        return response()->json($admin);
    }

    // UPDATE: Update admin details (admin only)
    public function update(Request $request, int $id)
    {
        $admin = Admin::find($id);
        if (!$admin) return response()->json(['message' => 'Not found'], 404);
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:admin,email,' . $id . ',admin_id',
            'password' => 'sometimes|string|min:8',
            'phone' => 'sometimes|nullable|string|max:30',
        ]);
        if (isset($data['password'])) $data['password'] = bcrypt($data['password']);
        $admin->fill($data)->save();
        return response()->json($admin);
    }

    // DELETE: Remove admin
    public function destroy(int $id)
    {
        $admin = Admin::find($id);
        if (!$admin) return response()->json(['message' => 'Not found'], 404);
        $admin->delete();
        return response()->json(null, 204);
    }
}


