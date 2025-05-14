<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class IncidentController extends Controller
{
    /**
     * Get the incidents resources
     */
    public function index()
    {
        $currentUser = Auth::user();
        $query = Incident::with(['site', 'reporter']);

        switch ($currentUser->ssiap_level) {
            case 3:
                break;
            case 2:
                $query->where('site_id', $currentUser->site_id);
                break;
            case 1:
                $query->where('site_id', $currentUser->site_id);
                break;
        }

        $incidents = $query->orderBy('created_at', 'desc')->get();
        return response()->json($incidents);
    }

    /**
     * Store the incidents resources
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'site_id' => 'required|exists:sites,id',
            'incident_type' => 'required|string|max:50',
            'severity' => 'required|in:Low,Medium,High',
            'description' => 'required|string',
            'status' => 'required|in:Pending,Resolved,In Progress',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($user->ssiap_level < 3 && $request->site_id != $user->site_id) {
            return response()->json(['message' => 'You can only create incidents for your assigned site'], 403);
        }

        $incident = Incident::create([
            'site_id' => $request->site_id,
            'reported_by' => $user->id,
            'incident_type' => $request->incident_type,
            'severity' => $request->severity,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return response()->json($incident, 201);
    }

    /**
     * Show the incidents resources
     */
    public function show($id)
    {
        $currentUser = Auth::user();
        $incident = Incident::with(['site', 'reporter'])->findOrFail($id);

        if ($currentUser->ssiap_level < 3 && $incident->site_id != $currentUser->site_id) {
            return response()->json(['message' => 'Unauthorized to view this incident'], 403);
        }

        return response()->json($incident);
    }

    /**
     * Update the incidents resources
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $incident = Incident::findOrFail($id);

        if ($user->ssiap_level < 3 && $incident->site_id != $user->site_id) {
            return response()->json(['message' => 'Unauthorized to update this incident'], 403);
        }

        if ($user->ssiap_level === 1 && $incident->reported_by !== $user->id) {
            return response()->json(['message' => 'You can only update incidents you reported'], 403);
        }

        $validator = Validator::make($request->all(), [
            'site_id' => 'sometimes|required|exists:sites,id',
            'incident_type' => 'sometimes|required|string|max:50',
            'severity' => 'sometimes|required|in:Low,Medium,High',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:Pending,Resolved,In Progress',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($user->ssiap_level < 3 && isset($request->site_id) && $request->site_id != $user->site_id) {
            return response()->json(['message' => 'You cannot assign incidents to other sites'], 403);
        }

        $incident->update($request->all());

        return response()->json($incident);
    }

    /**
     * Destroy the incidents resources
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $incident = Incident::findOrFail($id);

        if ($user->ssiap_level < 3 && $incident->site_id != $user->site_id) {
            return response()->json(['message' => 'Unauthorized to delete this incident'], 403);
        }

        if ($user->ssiap_level === 1 && $incident->reported_by !== $user->id) {
            return response()->json(['message' => 'You can only delete incidents you reported'], 403);
        }

        $incident->delete();
        return response()->json(null, 204);
    }
}
