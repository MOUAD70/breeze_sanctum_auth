<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    /**
     * Get the users resources
     */
    public function index()
    {
        $currentUser = Auth::user();
        $query = User::query();

        switch ($currentUser->ssiap_level) {
            case 3:
                $query->whereIn('ssiap_level', [1, 2]);
                break;
            case 2:
                $query->where('ssiap_level', 1)
                    ->where('site_id', $currentUser->site_id);
                break;
            case 1:
                $query->where('id', $currentUser->id);
                break;
        }

        $query->whereNull('deleted_at');

        $ssiap1CountQuery = (clone $query)->where('ssiap_level', 1);
        $ssiap2CountQuery = (clone $query)->where('ssiap_level', 2);

        if ($currentUser->ssiap_level === 2) {
            $ssiap1CountQuery = User::where('ssiap_level', 1)
                ->where('site_id', $currentUser->site_id)
                ->whereNull('deleted_at');
        }

        $ssiap1Count = $ssiap1CountQuery->count();
        $ssiap2Count = $ssiap2CountQuery->count();

        $paginated = $query->paginate(10);

        return response()->json([
            'data' => $paginated->items(),
            'current_page' => $paginated->currentPage(),
            'total' => $paginated->total(),
            'per_page' => $paginated->perPage(),
            'last_page' => $paginated->lastPage(),
            'ssiap1_count' => $ssiap1Count,
            'ssiap2_count' => $ssiap2Count,
        ]);
    }

    /**
     * Store the user resources
     */
    public function store(StoreUserRequest $request)
    {
        $currentUser = Auth::user();
        $formfields = $request->validated();

        if ($currentUser->ssiap_level === 2) {
            $formfields['site_id'] = $currentUser->site_id;
        }

        if ($currentUser->ssiap_level === 3) {
            if (!in_array($formfields['ssiap_level'], [1, 2])) {
                return response()->json([
                    'message' => 'You can only create SSIAP1 or SSIAP2 users'
                ], 403);
            }
        } elseif ($currentUser->ssiap_level === 2) {
            if ($formfields['ssiap_level'] !== 1) {
                return response()->json([
                    'message' => 'You can only create SSIAP1 users'
                ], 403);
            }
        } else {
            return response()->json([
                'message' => 'Unauthorized to create users'
            ], 403);
        }

        $user = User::create($formfields);
        return new UserResource($user);
    }

    /**
     * Show the user resources
     */
    public function show(User $user)
    {
        $currentUser = Auth::user();

        if ($currentUser->ssiap_level === 1) {
            if ($currentUser->id !== $user->id) {
                return response()->json([
                    'message' => 'Unauthorized to view this user'
                ], 403);
            }
        } else if ($currentUser->ssiap_level === 2) {
            if (
                $currentUser->id !== $user->id &&
                ($user->ssiap_level !== 1 || $user->site_id !== $currentUser->site_id)
            ) {
                return response()->json([
                    'message' => 'Unauthorized to view this user'
                ], 403);
            }
        } else if ($currentUser->ssiap_level === 3) {
            if ($user->ssiap_level === 3 && $currentUser->id !== $user->id) {
                return response()->json([
                    'message' => 'Unauthorized to view this user'
                ], 403);
            }
        }

        if ($user->site_id) {
            $user->load('site');
        }

        return new UserResource($user);
    }

    /**
     * Update the user resources
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $currentUser = Auth::user();
        $formfields = $request->validated();

        if ($currentUser->ssiap_level === 1) {
            return response()->json([
                'message' => 'Unauthorized to update users'
            ], 403);
        }

        if ($currentUser->ssiap_level === 2) {
            if ($user->ssiap_level !== 1 || $user->site_id !== $currentUser->site_id) {
                return response()->json([
                    'message' => 'You can only update SSIAP1 users from your site'
                ], 403);
            }

            if (isset($formfields['site_id'])) {
                unset($formfields['site_id']);
            }

            if (isset($formfields['ssiap_level'])) {
                unset($formfields['ssiap_level']);
            }
        }

        if ($currentUser->ssiap_level === 3) {
            if ($user->ssiap_level === 3) {
                return response()->json([
                    'message' => 'You cannot update SSIAP3 users'
                ], 403);
            }

            if (isset($formfields['ssiap_level']) && $formfields['ssiap_level'] > 2) {
                return response()->json([
                    'message' => 'Cannot promote users to SSIAP3 level'
                ], 400);
            }
        }

        if (empty($formfields)) {
            return response()->json([
                'message' => 'No fields to update',
                'user' => $user
            ]);
        }

        $user->update($formfields);
        $user->refresh();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    /**
     * Destroy the user resources
     */
    public function destroy(User $user)
    {
        $currentUser = Auth::user();

        if ($currentUser->ssiap_level === 1) {
            return response()->json([
                'message' => 'Unauthorized to delete users'
            ], 403);
        }

        if ($currentUser->ssiap_level === 2) {
            if ($user->ssiap_level !== 1 || $user->site_id !== $currentUser->site_id) {
                return response()->json([
                    'message' => 'You can only delete SSIAP1 users from your site'
                ], 403);
            }
        }

        if ($currentUser->ssiap_level === 3) {
            if ($user->ssiap_level === 3) {
                return response()->json([
                    'message' => 'You cannot delete SSIAP3 users'
                ], 403);
            }
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Get the user site
     */
    public function getUserSite($id)
    {
        $user = User::findOrFail($id);
        $site = $user->site;

        if (!$site) {
            return response()->json(['message' => 'User has no assigned site'], 404);
        }

        return response()->json($site);
    }
}
