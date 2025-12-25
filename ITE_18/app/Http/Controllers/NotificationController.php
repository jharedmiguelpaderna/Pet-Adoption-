<?php

namespace App\Http\Controllers;

use App\Models\AdoptionRequest;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $adopterId = $request->query('adopter_id');
        $q = AdoptionRequest::query()->with('pet');
        if ($adopterId) $q->where('adopter_id', $adopterId);
        return response()->json($q->orderByDesc('request_id')->limit(50)->get());
    }
}


