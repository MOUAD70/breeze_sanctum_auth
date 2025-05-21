<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Incident;
use App\Models\Site;
use App\Models\User;
use App\Models\VacationRequest;
use App\Models\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    /**
     * Get chart data for dashboard
     */
    public function getChartData(): JsonResponse
    {
        $user = Auth::user();
        $charts = [];

        // Line Chart - Incidents by Month
        $charts['lineChart'] = $this->getIncidentsLineChartData($user);

        // Bar Chart - User counts by SSIAP level
        $charts['barChart'] = $this->getUsersBarChartData($user);

        // Area Chart - Attendance trends
        $charts['areaChart'] = $this->getAttendanceAreaChartData($user);

        // Pie Chart - Sites by type
        $charts['pieChart'] = $this->getSitesPieChartData($user);

        // Radar Chart - Security metrics
        $charts['radarChart'] = $this->getSecurityRadarChartData($user);

        return response()->json($charts);
    }

    /**
     * Get incidents data for line chart
     */
    private function getIncidentsLineChartData($user): array
    {
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $data = [];

        // Initialize data structure
        foreach ($months as $month) {
            $data[] = [
                'name' => $month,
                'high' => 0,
                'medium' => 0,
                'low' => 0
            ];
        }

        // Query for incidents by month and severity
        $query = Incident::select(
            DB::raw('MONTH(created_at) as month'),
            'severity',
            DB::raw('COUNT(*) as count')
        )
        ->whereYear('created_at', date('Y'))
        ->groupBy(DB::raw('MONTH(created_at)'), 'severity');

        // Filter by site for SSIAP-2
        if ($user->ssiap_level < 3) {
            $query->where('site_id', $user->site_id);
        }

        $results = $query->get();

        // Populate data array
        foreach ($results as $result) {
            $monthIndex = $result->month - 1; // Convert to 0-based index
            $severity = strtolower($result->severity);
            if (isset($data[$monthIndex][$severity])) {
                $data[$monthIndex][$severity] = $result->count;
            }
        }

        return [
            'data' => $data,
            'lines' => [
                ['key' => 'high', 'color' => 'var(--destructive)'],
                ['key' => 'medium', 'color' => 'var(--warning)'],
                ['key' => 'low', 'color' => 'var(--primary)']
            ]
        ];
    }

    /**
     * Get users data for bar chart
     */
    private function getUsersBarChartData($user): array
    {
        $data = [];

        if ($user->ssiap_level === 3) {
            // SSIAP-3 can see all users
            $data = [
                ['name' => 'SSIAP-1', 'value' => User::where('ssiap_level', 1)->count()],
                ['name' => 'SSIAP-2', 'value' => User::where('ssiap_level', 2)->count()],
                ['name' => 'SSIAP-3', 'value' => User::where('ssiap_level', 3)->count()]
            ];
        } else {
            // SSIAP-2 can only see users at their site
            $data = [
                ['name' => 'SSIAP-1', 'value' => User::where('ssiap_level', 1)->where('site_id', $user->site_id)->count()],
                ['name' => 'SSIAP-2', 'value' => User::where('ssiap_level', 2)->where('site_id', $user->site_id)->count()]
            ];
        }

        return [
            'data' => $data,
            'xKey' => 'name',
            'yKey' => 'value'
        ];
    }

    /**
     * Get attendance data for area chart
     */
    private function getAttendanceAreaChartData($user): array
    {
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $data = [];

        // Initialize data structure
        foreach ($months as $month) {
            $data[] = [
                'name' => $month,
                'value' => 0
            ];
        }

        // Query for attendance by month
        $query = Attendance::select(
            DB::raw('MONTH(date) as month'),
            DB::raw('COUNT(*) as count')
        )
        ->whereYear('date', date('Y'))
        ->where('status', 'Present')
        ->groupBy(DB::raw('MONTH(date)'));

        // Filter by site for SSIAP-2
        if ($user->ssiap_level < 3) {
            $siteEmployees = User::where('site_id', $user->site_id)->pluck('id')->toArray();
            $query->whereIn('employee_id', $siteEmployees);
        }

        $results = $query->get();

        // Populate data array
        foreach ($results as $result) {
            $monthIndex = $result->month - 1; // Convert to 0-based index
            if (isset($data[$monthIndex])) {
                $data[$monthIndex]['value'] = $result->count;
            }
        }

        return [
            'data' => $data,
            'areaKey' => 'value',
            'color' => 'var(--primary)'
        ];
    }

    /**
     * Get sites data for pie chart
     */
    private function getSitesPieChartData($user): array
    {
        $data = [];
        $colors = [
            'Hospital' => '#0369a1',
            'Mall' => '#0284c7',
            'Office' => '#0ea5e9',
            'Other' => '#38bdf8'
        ];

        if ($user->ssiap_level === 3) {
            // SSIAP-3 can see all sites
            $data = [
                ['name' => 'Hospital', 'value' => Site::where('site_type', 'Hospital')->count()],
                ['name' => 'Mall', 'value' => Site::where('site_type', 'Mall')->count()],
                ['name' => 'Office', 'value' => Site::where('site_type', 'Office')->count()],
                ['name' => 'Other', 'value' => Site::where('site_type', 'Other')->count()]
            ];
        } else {
            // SSIAP-2 can only see their site
            $site = Site::find($user->site_id);
            if ($site) {
                $data = [
                    ['name' => $site->site_type, 'value' => 1]
                ];
            }
        }

        // Filter out zero values
        $data = array_filter($data, function($item) {
            return $item['value'] > 0;
        });

        return [
            'data' => array_values($data), // Reset array keys
            'colors' => $colors
        ];
    }

    /**
     * Get security metrics for radar chart
     */
    private function getSecurityRadarChartData($user): array
    {
        // For radar chart, we'll use some calculated metrics based on existing data
        $data = [];
        
        if ($user->ssiap_level === 3) {
            // Calculate metrics for all sites
            $totalIncidents = Incident::count() ?: 1; // Avoid division by zero
            $resolvedIncidents = Incident::where('status', 'Resolved')->count();
            $responseRate = min(100, round(($resolvedIncidents / $totalIncidents) * 100));
            
            $totalUsers = User::count() ?: 1;
            $staffingRate = min(100, round((User::where('ssiap_level', 1)->count() / $totalUsers) * 80));
            
            $totalAttendance = Attendance::whereDate('date', '>=', now()->subMonth())->count() ?: 1;
            $presentAttendance = Attendance::where('status', 'Present')->whereDate('date', '>=', now()->subMonth())->count();
            $attendanceRate = min(100, round(($presentAttendance / $totalAttendance) * 100));
            
            // Some metrics might be more arbitrary for demonstration
            $equipmentRate = 85; // Example value
            $trainingRate = 90; // Example value
            $protocolsRate = 80; // Example value
        } else {
            // Calculate metrics for user's site only
            $siteEmployees = User::where('site_id', $user->site_id)->pluck('id')->toArray();
            
            $totalIncidents = Incident::where('site_id', $user->site_id)->count() ?: 1;
            $resolvedIncidents = Incident::where('site_id', $user->site_id)->where('status', 'Resolved')->count();
            $responseRate = min(100, round(($resolvedIncidents / $totalIncidents) * 100));
            
            $totalUsers = count($siteEmployees) ?: 1;
            $staffingRate = min(100, round((User::where('site_id', $user->site_id)->where('ssiap_level', 1)->count() / $totalUsers) * 80));
            
            $totalAttendance = Attendance::whereIn('employee_id', $siteEmployees)->whereDate('date', '>=', now()->subMonth())->count() ?: 1;
            $presentAttendance = Attendance::whereIn('employee_id', $siteEmployees)->where('status', 'Present')->whereDate('date', '>=', now()->subMonth())->count();
            $attendanceRate = min(100, round(($presentAttendance / $totalAttendance) * 100));
            
            // Site-specific metrics might be more arbitrary for demonstration
            $equipmentRate = 75; // Example value
            $trainingRate = 85; // Example value
            $protocolsRate = 70; // Example value
        }
        
        $data = [
            ['name' => 'Security', 'value' => 100 - ($totalIncidents / 10)], // Lower incidents = higher security
            ['name' => 'Response', 'value' => $responseRate],
            ['name' => 'Training', 'value' => $trainingRate],
            ['name' => 'Equipment', 'value' => $equipmentRate],
            ['name' => 'Protocols', 'value' => $protocolsRate],
            ['name' => 'Staffing', 'value' => $staffingRate],
        ];
        
        return [
            'data' => $data,
            'dataKey' => 'value'
        ];
    }
}