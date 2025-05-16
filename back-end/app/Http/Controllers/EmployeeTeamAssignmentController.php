<?php

namespace App\Http\Controllers;

use App\Models\EmployeeTeamAssignment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class EmployeeTeamAssignmentController extends Controller
{
    /**
     * Display a listing of all assignments
     */
    public function index()
    {
        $user = Auth::user();

        if ($user->ssiap_level === 1) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $query = EmployeeTeamAssignment::with(['team', 'employee']);

        // SSIAP-2 can only see assignments for their site
        if ($user->ssiap_level === 2) {
            $siteUserIds = User::where('site_id', $user->site_id)->pluck('id');
            $query->whereIn('employee_id', $siteUserIds);
        }

        $assignments = $query->orderBy('shift_start', 'asc')->get();
        return response()->json($assignments);
    }

    /**
     * Store a newly created assignment
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->ssiap_level === 1) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'employee_id' => 'required|exists:users,id',
            'team_id' => 'required|exists:teams,id',
            'shift_start' => 'required|date',
            'shift_end' => 'required|date|after:shift_start',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Check if SSIAP-2 is trying to assign someone not from their site
        if ($user->ssiap_level === 2) {
            $employee = User::findOrFail($request->employee_id);
            if ($employee->site_id !== $user->site_id) {
                return response()->json(['message' => 'You can only assign employees from your site'], 403);
            }
        }

        $assignment = EmployeeTeamAssignment::create($request->all());
        return response()->json($assignment, 201);
    }

    /**
     * Display the specified assignment
     */
    public function show($id)
    {
        $user = Auth::user();
        $assignment = EmployeeTeamAssignment::with(['team', 'employee'])->findOrFail($id);

        // SSIAP-1 can only view their own assignments
        if ($user->ssiap_level === 1 && $assignment->employee_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // SSIAP-2 can only view assignments from their site
        if ($user->ssiap_level === 2) {
            $employee = User::findOrFail($assignment->employee_id);
            if ($employee->site_id !== $user->site_id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        return response()->json($assignment);
    }

    /**
     * Update the specified assignment
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if ($user->ssiap_level === 1) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignment = EmployeeTeamAssignment::findOrFail($id);

        // SSIAP-2 can only update assignments from their site
        if ($user->ssiap_level === 2) {
            $employee = User::findOrFail($assignment->employee_id);
            if ($employee->site_id !== $user->site_id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        $validator = Validator::make($request->all(), [
            'employee_id' => 'sometimes|required|exists:users,id',
            'team_id' => 'sometimes|required|exists:teams,id',
            'shift_start' => 'sometimes|required|date',
            'shift_end' => 'sometimes|required|date|after:shift_start',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // If employee_id is being changed, check authorization
        if (isset($request->employee_id) && $user->ssiap_level === 2) {
            $newEmployee = User::findOrFail($request->employee_id);
            if ($newEmployee->site_id !== $user->site_id) {
                return response()->json(['message' => 'You can only assign employees from your site'], 403);
            }
        }

        $assignment->update($request->all());
        return response()->json($assignment);
    }

    /**
     * Remove the specified assignment
     */
    public function destroy($id)
    {
        $user = Auth::user();

        if ($user->ssiap_level === 1) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignment = EmployeeTeamAssignment::findOrFail($id);

        // SSIAP-2 can only delete assignments from their site
        if ($user->ssiap_level === 2) {
            $employee = User::findOrFail($assignment->employee_id);
            if ($employee->site_id !== $user->site_id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        $assignment->delete();
        return response()->json(null, 204);
    }
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
