<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use App\Models\EmployeeTeamAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TeamsController extends Controller
{
    /**
     * Display a listing of the teams.
     */
    public function index()
    {
        $user = Auth::user();

        // SSIAP-1 can only see teams they're assigned to
        if ($user->ssiap_level === 1) {
            $teamIds = EmployeeTeamAssignment::where('employee_id', $user->id)
                ->pluck('team_id')
                ->unique();
            $teams = Team::whereIn('id', $teamIds)->get();
            return response()->json($teams);
        }

        // SSIAP-2 can see all teams at their site
        if ($user->ssiap_level === 2) {
            // Get all users from the same site
            $siteUserIds = User::where('site_id', $user->site_id)->pluck('id');
            // Get teams where supervisor is from the same site
            $teams = Team::whereIn('supervisor_id', $siteUserIds)->get();
            return response()->json($teams);
        }

        // SSIAP-3 can see all teams
        $teams = Team::all();
        return response()->json($teams);
    }

    /**
     * Store a newly created team in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // SSIAP-1 cannot create teams
        if ($user->ssiap_level === 1) {
            return response()->json(['message' => 'Unauthorized to create teams'], 403);
        }

        $validator = Validator::make($request->all(), [
            'team_name' => 'required|string|max:255',
            'supervisor_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // SSIAP-2 can only create teams with supervisors from their site
        if ($user->ssiap_level === 2) {
            $supervisor = User::findOrFail($request->supervisor_id);
            if ($supervisor->site_id !== $user->site_id) {
                return response()->json(['message' => 'You can only assign supervisors from your site'], 403);
            }
        }

        $team = Team::create($request->all());
        return response()->json($team, 201);
    }

    /**
     * Display the specified team.
     */
    public function show($id)
    {
        $user = Auth::user();
        $team = Team::findOrFail($id);

        // SSIAP-1 can only view teams they're assigned to
        if ($user->ssiap_level === 1) {
            $isAssigned = EmployeeTeamAssignment::where('employee_id', $user->id)
                ->where('team_id', $id)
                ->exists();
            
            if (!$isAssigned) {
                return response()->json(['message' => 'Unauthorized to view this team'], 403);
            }
        }

        // SSIAP-2 can only view teams at their site
        if ($user->ssiap_level === 2) {
            $supervisor = User::findOrFail($team->supervisor_id);
            if ($supervisor->site_id !== $user->site_id) {
                return response()->json(['message' => 'Unauthorized to view this team'], 403);
            }
        }

        return response()->json($team);
    }

    /**
     * Update the specified team in storage.
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $team = Team::findOrFail($id);

        // SSIAP-1 cannot update teams
        if ($user->ssiap_level === 1) {
            return response()->json(['message' => 'Unauthorized to update teams'], 403);
        }

        $validator = Validator::make($request->all(), [
            'team_name' => 'sometimes|required|string|max:255',
            'supervisor_id' => 'sometimes|required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // SSIAP-2 can only update teams at their site
        if ($user->ssiap_level === 2) {
            $supervisor = User::findOrFail($team->supervisor_id);
            if ($supervisor->site_id !== $user->site_id) {
                return response()->json(['message' => 'Unauthorized to update this team'], 403);
            }

            // If supervisor_id is being changed, check authorization
            if (isset($request->supervisor_id)) {
                $newSupervisor = User::findOrFail($request->supervisor_id);
                if ($newSupervisor->site_id !== $user->site_id) {
                    return response()->json(['message' => 'You can only assign supervisors from your site'], 403);
                }
            }
        }

        $team->update($request->all());
        return response()->json($team);
    }

    /**
     * Remove the specified team from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $team = Team::findOrFail($id);

        // SSIAP-1 cannot delete teams
        if ($user->ssiap_level === 1) {
            return response()->json(['message' => 'Unauthorized to delete teams'], 403);
        }

        // SSIAP-2 can only delete teams at their site
        if ($user->ssiap_level === 2) {
            $supervisor = User::findOrFail($team->supervisor_id);
            if ($supervisor->site_id !== $user->site_id) {
                return response()->json(['message' => 'Unauthorized to delete this team'], 403);
            }
        }

        // Check if team has assignments before deleting
        $hasAssignments = EmployeeTeamAssignment::where('team_id', $id)->exists();
        if ($hasAssignments) {
            return response()->json([
                'message' => 'Cannot delete team with existing assignments. Remove all assignments first.'
            ], 422);
        }

        $team->delete();
        return response()->json(null, 204);
    }

    /**
     * Get team members (employees assigned to a team).
     */
    public function getTeamMembers($id)
    {
        $user = Auth::user();
        $team = Team::findOrFail($id);

        // SSIAP-1 can only view teams they're assigned to
        if ($user->ssiap_level === 1) {
            $isAssigned = EmployeeTeamAssignment::where('employee_id', $user->id)
                ->where('team_id', $id)
                ->exists();
            
            if (!$isAssigned) {
                return response()->json(['message' => 'Unauthorized to view this team'], 403);
            }
        }

        // SSIAP-2 can only view teams at their site
        if ($user->ssiap_level === 2) {
            $supervisor = User::findOrFail($team->supervisor_id);
            if ($supervisor->site_id !== $user->site_id) {
                return response()->json(['message' => 'Unauthorized to view this team'], 403);
            }
        }

        // Get all employees assigned to this team
        $assignments = EmployeeTeamAssignment::where('team_id', $id)
            ->with('employee')
            ->get();
        
        $members = $assignments->map(function ($assignment) {
            return $assignment->employee;
        })->unique('id');
        
        return response()->json($members);
    }
}