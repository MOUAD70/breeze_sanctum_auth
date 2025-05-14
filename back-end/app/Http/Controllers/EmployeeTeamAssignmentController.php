<?php

namespace App\Http\Controllers;

use App\Models\EmployeeTeamAssignment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class EmployeeTeamAssignmentController extends Controller
{
    /**
     * Get the current user's team assignments
     */
    public function getCurrentUserAssignments()
    {
        $user = Auth::user();

        if ($user->ssiap_level === 3) {
            return response()->json([]);
        }

        $assignments = EmployeeTeamAssignment::where('employee_id', $user->id)
            ->with('team')
            ->orderBy('shift_start', 'asc')
            ->get();

        return response()->json($assignments);
    }

    /**
     * Get assignments for a specific user
     */
    public function getUserAssignments($userId)
    {
        $currentUser = Auth::user();
        $targetUser = User::findOrFail($userId);

        if ($currentUser->ssiap_level === 1 && $currentUser->id !== $targetUser->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (
            $currentUser->ssiap_level === 2 &&
            ($targetUser->ssiap_level !== 1 || $targetUser->site_id !== $currentUser->site_id)
        ) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($targetUser->ssiap_level === 3) {
            return response()->json([]);
        }

        $assignments = EmployeeTeamAssignment::where('employee_id', $userId)
            ->with('team')
            ->orderBy('shift_start', 'asc')
            ->get();

        return response()->json($assignments);
    }

    /**
     * Get all assignments for users managed by the current user
     */
    public function getManagedAssignments()
    {
        $user = Auth::user();

        if ($user->ssiap_level === 1) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $query = EmployeeTeamAssignment::with(['team', 'employee']);

        if ($user->ssiap_level === 2) {
            $ssiap1UserIds = User::where('ssiap_level', 1)
                ->where('site_id', $user->site_id)
                ->pluck('id');

            $query->whereIn('employee_id', $ssiap1UserIds);
        }

        $assignments = $query->orderBy('shift_start', 'asc')->get();

        return response()->json($assignments);
    }
}
