<?php

namespace App\Http\Controllers;

use App\Models\VacationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class VacationRequestController extends Controller
{
    /**
     * Display a listing of vacation requests based on user's SSIAP level
     */
    public function index(): JsonResponse
    {
        try {
            $user = Auth::user();
            $query = VacationRequest::with(['employee', 'assignedTo']);

            // Filter based on SSIAP level
            switch ($user->ssiap_level) {
                case 3:
                    // SSIAP-3 can see all vacation requests
                    break;
                case 2:
                    // SSIAP-2 can see their own requests and requests from their site
                    $query->where(function($q) use ($user) {
                        $q->where('employee_id', $user->id)
                          ->orWhere(function($q) use ($user) {
                              $q->whereHas('employee', function($q) use ($user) {
                                  $q->where('site_id', $user->site_id);
                              });
                          });
                    });
                    break;
                case 1:
                default:
                    // SSIAP-1 can only see their own requests
                    $query->where('employee_id', $user->id);
                    break;
            }

            $vacationRequests = $query->orderBy('created_at', 'desc')->get();
            return response()->json($vacationRequests);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving vacation requests',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created vacation request
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();

            $validator = Validator::make($request->all(), [
                'start_date' => 'required|date|after_or_equal:today',
                'end_date' => 'required|date|after_or_equal:start_date',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // SSIAP-1 and SSIAP-2 can only create vacation requests for themselves
            if ($user->ssiap_level <= 2) {
                $employeeId = $user->id;
            } else {
                // SSIAP-3 can create vacation requests for anyone
                $validator = Validator::make($request->all(), [
                    'employee_id' => 'required|exists:users,id',
                ]);

                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 422);
                }

                $employeeId = $request->employee_id;
            }

            // Check for overlapping vacation requests
            $overlapping = VacationRequest::where('employee_id', $employeeId)
                ->where(function($query) use ($request) {
                    $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                        ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                        ->orWhere(function($query) use ($request) {
                            $query->where('start_date', '<=', $request->start_date)
                                ->where('end_date', '>=', $request->end_date);
                        });
                })
                ->where('status', '!=', 'Denied')
                ->exists();

            if ($overlapping) {
                return response()->json([
                    'message' => 'There is already a vacation request for this period'
                ], 422);
            }

            // For SSIAP-1 and SSIAP-2, assign to a SSIAP-3 user
            $assignedTo = null;
            if ($user->ssiap_level <= 2) {
                // Find a SSIAP-3 user from the same site or any SSIAP-3 if none found
                $ssiap3 = User::where('ssiap_level', 3)
                    ->where('site_id', $user->site_id)
                    ->first();
                
                if (!$ssiap3) {
                    $ssiap3 = User::where('ssiap_level', 3)->first();
                }
                
                if ($ssiap3) {
                    $assignedTo = $ssiap3->id;
                }
            } else {
                // SSIAP-3 can assign to another SSIAP-3 or handle it themselves
                $assignedTo = $request->assigned_to ?? $user->id;
            }

            $vacationRequest = VacationRequest::create([
                'employee_id' => $employeeId,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'status' => 'Pending',
                'assigned_to' => $assignedTo
            ]);

            return response()->json($vacationRequest, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the vacation request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified vacation request
     */
    public function show($id): JsonResponse
    {
        try {
            $user = Auth::user();
            $vacationRequest = VacationRequest::with(['employee', 'assignedTo'])->findOrFail($id);

            // Check authorization
            if ($user->ssiap_level === 1 && $vacationRequest->employee_id !== $user->id) {
                return response()->json(['message' => 'Unauthorized to view this vacation request'], 403);
            }

            if ($user->ssiap_level === 2) {
                $employee = User::findOrFail($vacationRequest->employee_id);
                if ($employee->site_id !== $user->site_id && $vacationRequest->employee_id !== $user->id) {
                    return response()->json(['message' => 'Unauthorized to view this vacation request'], 403);
                }
            }

            return response()->json($vacationRequest);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while retrieving the vacation request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified vacation request
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $user = Auth::user();
            $vacationRequest = VacationRequest::findOrFail($id);

            // SSIAP-1 and SSIAP-2 can only update their own pending requests
            if ($user->ssiap_level <= 2) {
                if ($vacationRequest->employee_id !== $user->id) {
                    return response()->json(['message' => 'Unauthorized to update this vacation request'], 403);
                }

                if ($vacationRequest->status !== 'Pending') {
                    return response()->json(['message' => 'Cannot update a vacation request that has already been processed'], 403);
                }

                $validator = Validator::make($request->all(), [
                    'start_date' => 'sometimes|required|date|after_or_equal:today',
                    'end_date' => 'sometimes|required|date|after_or_equal:start_date',
                ]);

                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 422);
                }

                // Check for overlapping vacation requests
                if ($request->has('start_date') || $request->has('end_date')) {
                    $startDate = $request->start_date ?? $vacationRequest->start_date;
                    $endDate = $request->end_date ?? $vacationRequest->end_date;

                    $overlapping = VacationRequest::where('employee_id', $user->id)
                        ->where('id', '!=', $id)
                        ->where(function($query) use ($startDate, $endDate) {
                            $query->whereBetween('start_date', [$startDate, $endDate])
                                ->orWhereBetween('end_date', [$startDate, $endDate])
                                ->orWhere(function($query) use ($startDate, $endDate) {
                                    $query->where('start_date', '<=', $startDate)
                                        ->where('end_date', '>=', $endDate);
                                });
                        })
                        ->where('status', '!=', 'Denied')
                        ->exists();

                    if ($overlapping) {
                        return response()->json([
                            'message' => 'There is already a vacation request for this period'
                        ], 422);
                    }
                }

                $vacationRequest->update($request->only(['start_date', 'end_date']));
            } 
            // SSIAP-3 can update any request and change status
            else {
                $validator = Validator::make($request->all(), [
                    'start_date' => 'sometimes|required|date',
                    'end_date' => 'sometimes|required|date|after_or_equal:start_date',
                    'status' => 'sometimes|required|in:Pending,Approved,Denied',
                    'assigned_to' => 'sometimes|nullable|exists:users,id',
                ]);

                if ($validator->fails()) {
                    return response()->json(['errors' => $validator->errors()], 422);
                }

                // If changing assignee, ensure they are SSIAP-3
                if ($request->has('assigned_to') && $request->assigned_to) {
                    $assignee = User::findOrFail($request->assigned_to);
                    if ($assignee->ssiap_level < 3) {
                        return response()->json([
                            'message' => 'Vacation requests can only be assigned to SSIAP-3 users'
                        ], 422);
                    }
                }

                $vacationRequest->update($request->only([
                    'start_date', 'end_date', 'status', 'assigned_to'
                ]));
            }

            return response()->json($vacationRequest);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the vacation request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified vacation request
     */
    public function destroy($id): JsonResponse
    {
        try {
            $user = Auth::user();
            $vacationRequest = VacationRequest::findOrFail($id);

            // SSIAP-1 and SSIAP-2 can only delete their own pending requests
            if ($user->ssiap_level <= 2) {
                if ($vacationRequest->employee_id !== $user->id) {
                    return response()->json(['message' => 'Unauthorized to delete this vacation request'], 403);
                }

                if ($vacationRequest->status !== 'Pending') {
                    return response()->json(['message' => 'Cannot delete a vacation request that has already been processed'], 403);
                }
            }
            // SSIAP-3 can delete any request
            // No additional checks needed

            $vacationRequest->delete();
            return response()->json(['message' => 'Vacation request deleted successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the vacation request',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}