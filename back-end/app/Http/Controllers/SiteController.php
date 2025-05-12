<?php

namespace App\Http\Controllers;

use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SiteController extends Controller
{
    /**
     * Display a listing of the sites.
     */
    public function index(): JsonResponse
    {
        $sites = Site::all();
        return response()->json($sites);
    }

    /**
     * Store a newly created site in storage.
     */
    public function store(Request $request): JsonResponse
    {
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
        return response()->json($site);
    }

    /**
     * Update the specified site in storage.
     */
    public function update(Request $request, Site $site): JsonResponse
    {
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
        $site->delete();
        return response()->json(null, 204);
    }
}