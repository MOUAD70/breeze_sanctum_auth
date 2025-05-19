<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\Site;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    /**
     * Get comprehensive analytics data for dashboard.
     */
    public function index(): JsonResponse
    {
        $currentUser = Auth::user();
        
        return response()->json([
            'incidents' => $this->getIncidentsAnalytics($currentUser),
            'users' => $this->getUsersAnalytics($currentUser),
            'sites' => $this->getSitesAnalytics(),
        ]);
    }

    /**
     * Get incidents analytics data.
     */
    public function incidents(): JsonResponse
    {
        return response()->json($this->getIncidentsAnalytics(Auth::user()));
    }

    /**
     * Get users analytics data.
     */
    public function users(): JsonResponse
    {
        return response()->json($this->getUsersAnalytics(Auth::user()));
    }

    /**
     * Get sites analytics data.
     */
    public function sites(): JsonResponse
    {
        return response()->json($this->getSitesAnalytics());
    }

    /**
     * Get incidents analytics based on user access level.
     */
    private function getIncidentsAnalytics($user): array
    {
        $query = Incident::query();
        
        // Apply access restrictions based on SSIAP level
        if ($user->ssiap_level < 3) {
            $query->where('site_id', $user->site_id);
        }

        return [
            'total' => $query->count(),
            'by_type' => $query->select('incident_type', DB::raw('count(*) as count'))
                ->groupBy('incident_type')
                ->pluck('count', 'incident_type')
                ->toArray(),
            'by_severity' => [
                'Low' => $query->where('severity', 'Low')->count(),
                'Medium' => $query->where('severity', 'Medium')->count(),
                'High' => $query->where('severity', 'High')->count(),
            ],
            'by_status' => [
                'Pending' => $query->where('status', 'Pending')->count(),
                'In Progress' => $query->where('status', 'In Progress')->count(),
                'Resolved' => $query->where('status', 'Resolved')->count(),
            ],
            'recent' => $query->with(['site', 'reporter'])
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get(),
            'created_last_month' => $query->whereDate('created_at', '>=', now()->subMonth())->count(),
        ];
    }

    /**
     * Get users analytics based on user access level.
     */
    private function getUsersAnalytics($user): array
    {
        $query = User::query();
        
        // Apply access restrictions based on SSIAP level
        switch ($user->ssiap_level) {
            case 3:
                // SSIAP 3 can see all users
                break;
            case 2:
                // SSIAP 2 can only see SSIAP 1 users at their site
                $query->where('ssiap_level', 1)
                    ->where('site_id', $user->site_id);
                break;
            case 1:
                // SSIAP 1 can only see themselves
                $query->where('id', $user->id);
                break;
        }

        return [
            'total' => $query->count(),
            'by_ssiap_level' => [
                'SSIAP 1' => User::where('ssiap_level', 1)->count(),
                'SSIAP 2' => User::where('ssiap_level', 2)->count(),
                'SSIAP 3' => User::where('ssiap_level', 3)->count(),
            ],
            'recent' => $query->orderBy('created_at', 'desc')
                ->take(5)
                ->get(['id', 'name', 'email', 'ssiap_level', 'site_id', 'created_at']),
            'created_last_month' => $query->whereDate('created_at', '>=', now()->subMonth())->count(),
        ];
    }

    /**
     * Get sites analytics data.
     */
    private function getSitesAnalytics(): array
    {
        return [
            'total' => Site::count(),
            'by_type' => [
                'Hospital' => Site::where('site_type', 'Hospital')->count(),
                'Mall' => Site::where('site_type', 'Mall')->count(),
                'Office' => Site::where('site_type', 'Office')->count(),
                'Other' => Site::where('site_type', 'Other')->count(),
            ],
            'recent' => Site::orderBy('created_at', 'desc')
                ->take(5)
                ->get(),
            'created_last_month' => Site::whereDate('created_at', '>=', now()->subMonth())->count(),
        ];
    }
}