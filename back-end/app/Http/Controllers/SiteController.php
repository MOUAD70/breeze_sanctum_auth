<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SiteController extends Controller
{
    /**
     * Display a listing of the sites.
     */
    public function index(): JsonResponse
    {
        // All SSIAP levels can view sites
        $sites = Site::all();
        return response()->json($sites);
    }

    /**
     * Store a newly created site in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $user = Auth::user();

        // Only SSIAP-2 and SSIAP-3 can create sites
        if ($user->ssiap_level < 2) {
            return response()->json([
                'message' => 'Unauthorized to create sites'
            ], 403);
        }

        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_type' => 'required|in:Hospital,Mall,Office,Other',
            'address' => 'required|string',
        ]);

        $site = Site::create($validated);
        return response()->json($site, 201);
    }

    /**
     * Display the specified site.
     */
    public function show(Site $site): JsonResponse
    {
        // All SSIAP levels can view site details
        return response()->json($site);
    }

    /**
     * Update the specified site in storage.
     */
    public function update(Request $request, Site $site): JsonResponse
    {
        $user = Auth::user();

        // Only SSIAP-2 and SSIAP-3 can update sites
        if ($user->ssiap_level < 2) {
            return response()->json([
                'message' => 'Unauthorized to update sites'
            ], 403);
        }

        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_type' => 'required|in:Hospital,Mall,Office,Other',
            'address' => 'required|string',
        ]);

        $site->update($validated);
        return response()->json($site);
    }

    /**
     * Remove the specified site from storage.
     */
    public function destroy(Site $site): JsonResponse
    {
        $user = Auth::user();

        // Only SSIAP-2 and SSIAP-3 can delete sites
        if ($user->ssiap_level < 2) {
            return response()->json([
                'message' => 'Unauthorized to delete sites'
            ], 403);
        }

        $site->delete();
        return response()->json(null, 204);
    }

    /**
     * Get site analytics data.
     */
    public function analytics(): JsonResponse
    {
        // All SSIAP levels can view site analytics
        $analytics = [
            'total' => Site::count(),
            'by_type' => [
                'Hospital' => Site::where('site_type', 'Hospital')->count(),
                'Mall' => Site::where('site_type', 'Mall')->count(),
                'Office' => Site::where('site_type', 'Office')->count(),
                'Other' => Site::where('site_type', 'Other')->count(),
            ],
            'recent' => Site::orderBy('created_at', 'desc')->take(5)->get(),
            'created_last_month' => Site::whereDate('created_at', '>=', now()->subMonth())->count(),
        ];

        return response()->json($analytics);
    }
}