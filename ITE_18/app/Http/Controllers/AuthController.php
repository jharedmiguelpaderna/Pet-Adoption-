<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Adopter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Admin login
     */
    public function adminLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        // Ensure admin_id is included in response
        $adminData = $admin->toArray();
        $adminData['admin_id'] = $admin->admin_id;
        $adminData['id'] = $admin->admin_id; // Also set id for compatibility

        return response()->json([
            'message' => 'Login successful',
            'admin' => $adminData,
            'user' => $adminData, // Add user key for consistency
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    /**
     * Adopter login
     */
    public function adopterLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $adopter = Adopter::where('email', $request->email)->first();

        if (!$adopter || !Hash::check($request->password, $adopter->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $adopter->createToken('adopter-token')->plainTextToken;

        // Ensure adopter_id is included in response
        $adopterData = $adopter->toArray();
        $adopterData['adopter_id'] = $adopter->adopter_id;
        $adopterData['id'] = $adopter->adopter_id; // Also set id for compatibility

        return response()->json([
            'message' => 'Login successful',
            'adopter' => $adopterData,
            'user' => $adopterData, // Add user key for consistency
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    /**
     * Logout (revoke current token)
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful'
        ]);
    }

    /**
     * Logout from all devices
     */
    public function logoutAll(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logout from all devices successful'
        ]);
    }

    /**
     * Get current user info
     */
    public function me(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'user' => $user,
            'user_type' => $user instanceof Admin ? 'admin' : 'adopter'
        ]);
    }

    /**
     * Refresh token
     */
    public function refresh(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        
        $token = $user->createToken($user instanceof Admin ? 'admin-token' : 'adopter-token')->plainTextToken;

        return response()->json([
            'message' => 'Token refreshed',
            'token' => $token,
            'token_type' => 'Bearer'
        ]);
    }
}
