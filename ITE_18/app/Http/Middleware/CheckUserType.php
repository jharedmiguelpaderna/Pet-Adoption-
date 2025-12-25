<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\RedirectResponse;
use App\Models\Admin;
use App\Models\Adopter;

class CheckUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string  $userType
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next, string $userType): Response|RedirectResponse|JsonResponse
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
        
        // Check if user type matches the required type
        $isAdmin = $user instanceof Admin;
        $isAdopter = $user instanceof Adopter;
        
        if ($userType === 'admin' && !$isAdmin) {
            return response()->json(['message' => 'Admin access required'], 403);
        }
        
        if ($userType === 'adopter' && !$isAdopter) {
            return response()->json(['message' => 'Adopter access required'], 403);
        }
        
        return $next($request);
    }
}
