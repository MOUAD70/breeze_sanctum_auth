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
     * Display a listing of the resource.
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
                $query->where('ssiap_level', 1);
                break;
            case 1:
                $query->where('id', $currentUser->id);
                break;
        }

        $query->whereNull('deleted_at');
        
        $ssiap1Count = (clone $query)->where('ssiap_level', 1)->count();
        $ssiap2Count = (clone $query)->where('ssiap_level', 2)->count();

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
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $formfields = $request->validated();
        $user = User::create($formfields);
        return new UserResource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
