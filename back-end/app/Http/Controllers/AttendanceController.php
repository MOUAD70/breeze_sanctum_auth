<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AttendanceController extends Controller
{
    /**
     * Display a listing of attendances based on user's SSIAP level
     */
    public function index(Request $request)
    {
        try {
            $user = Auth::user();
            $date = $request->input('date', date('Y-m-d'));

            Log::info('Attendance index called', [
                'user_id' => $user->id,
                'date' => $date,
                'ssiap_level' => $user->ssiap_level
            ]);

            $query = Attendance::with(['employee', 'shift'])
                ->whereDate('date', $date);

            // Apply SSIAP level filtering
            if ($user->ssiap_level < 3) {
                // SSIAP-1 can only see their own attendance
                if ($user->ssiap_level === 1) {
                    $query->where('employee_id', $user->id);
                }
                // SSIAP-2 can see attendance for their site
                else if ($user->ssiap_level === 2) {
                    $siteEmployees = User::where('site_id', $user->site_id)
                        ->pluck('id')
                        ->toArray();
                    $query->whereIn('employee_id', $siteEmployees);
                }
            }

            $attendances = $query->get();

            Log::info('Attendance records retrieved', [
                'count' => $attendances->count(),
                'date' => $date
            ]);

            return response()->json($attendances);
        } catch (\Exception $e) {
            Log::error('Error in AttendanceController@index: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An error occurred while retrieving attendance records',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created attendance record
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            $validator = Validator::make($request->all(), [
                'employee_id' => 'required|exists:users,id',
                'shift_id' => 'required|exists:employee_team_assignments,id',
                'date' => 'required|date',
                'status' => 'required|in:Present,Absent,Late,Vacation,Sick Leave',
                'check_in' => 'nullable|date_format:Y-m-d H:i:s',
                'check_out' => 'nullable|date_format:Y-m-d H:i:s',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // SSIAP-1 can only validate their own attendance
            if ($user->ssiap_level === 1 && $request->employee_id != $user->id) {
                return response()->json(['message' => 'You can only validate your own attendance'], 403);
            }

            // SSIAP-2 can only validate attendance for their site
            if ($user->ssiap_level === 2) {
                $employee = User::findOrFail($request->employee_id);
                if ($employee->site_id != $user->site_id) {
                    return response()->json(['message' => 'You can only validate attendance for employees at your site'], 403);
                }
            }

            // Check if attendance record already exists for this employee, shift and date
            $existingAttendance = Attendance::where('employee_id', $request->employee_id)
                ->where('shift_id', $request->shift_id)
                ->whereDate('date', $request->date)
                ->first();

            if ($existingAttendance) {
                $existingAttendance->update([
                    'status' => $request->status,
                    'check_in' => $request->check_in,
                    'check_out' => $request->check_out,
                ]);

                return response()->json($existingAttendance);
            }

            $attendance = Attendance::create([
                'employee_id' => $request->employee_id,
                'shift_id' => $request->shift_id,
                'date' => $request->date,
                'status' => $request->status,
                'check_in' => $request->check_in,
                'check_out' => $request->check_out,
            ]);

            return response()->json($attendance, 201);
        } catch (\Exception $e) {
            Log::error('Error in AttendanceController@store: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'An error occurred while creating attendance record',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified attendance record
     */
    public function show($id)
    {
        $user = Auth::user();
        $attendance = Attendance::with('employee')->findOrFail($id);

        // SSIAP-1 can only view their own attendance
        if ($user->ssiap_level === 1 && $attendance->employee_id != $user->id) {
            return response()->json(['message' => 'Unauthorized to view this attendance record'], 403);
        }

        // SSIAP-2 can only view attendance for users at their site
        if ($user->ssiap_level === 2) {
            $employee = User::findOrFail($attendance->employee_id);
            if ($employee->site_id != $user->site_id || $employee->ssiap_level >= 2) {
                return response()->json(['message' => 'Unauthorized to view this attendance record'], 403);
            }
        }

        // SSIAP-3 cannot view attendance of other SSIAP-3
        if ($user->ssiap_level === 3) {
            $employee = User::findOrFail($attendance->employee_id);
            if ($employee->ssiap_level === 3 && $employee->id != $user->id) {
                return response()->json(['message' => 'Unauthorized to view this attendance record'], 403);
            }
        }

        return response()->json($attendance);
    }

    /**
     * Update the specified attendance record
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $attendance = Attendance::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'employee_id' => 'sometimes|required|exists:users,id',
            'shift_id' => 'sometimes|required|exists:employee_team_assignments,id',
            'date' => 'sometimes|required|date',
            'status' => 'sometimes|required|in:Present,Absent,Vacation,Sick Leave',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // SSIAP-1 can only validate their own attendance
        if ($user->ssiap_level === 1 && $attendance->employee_id != $user->id) {
            return response()->json(['message' => 'You can only validate your own attendance'], 403);
        }

        // SSIAP-2 can only update attendance for users at their site
        if ($user->ssiap_level === 2) {
            $employee = User::findOrFail($attendance->employee_id);
            if ($employee->site_id != $user->site_id || $employee->ssiap_level >= 2) {
                return response()->json(['message' => 'You can only manage attendance for SSIAP-1 at your site'], 403);
            }
        }

        // SSIAP-3 cannot update attendance of other SSIAP-3
        if ($user->ssiap_level === 3) {
            $employee = User::findOrFail($attendance->employee_id);
            if ($employee->ssiap_level === 3 && $employee->id != $user->id) {
                return response()->json(['message' => 'You cannot manage attendance of other SSIAP-3 users'], 403);
            }
        }

        $attendance->update($request->all());
        return response()->json($attendance);
    }

    /**
     * Remove the specified attendance record
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $attendance = Attendance::findOrFail($id);

        // SSIAP-1 cannot delete attendance records
        if ($user->ssiap_level === 1) {
            return response()->json(['message' => 'Unauthorized to delete attendance records'], 403);
        }

        // SSIAP-2 can only delete attendance for users at their site
        if ($user->ssiap_level === 2) {
            $employee = User::findOrFail($attendance->employee_id);
            if ($employee->site_id != $user->site_id || $employee->ssiap_level >= 2) {
                return response()->json(['message' => 'Unauthorized to delete this attendance record'], 403);
            }
        }

        // SSIAP-3 cannot delete attendance of other SSIAP-3
        if ($user->ssiap_level === 3) {
            $employee = User::findOrFail($attendance->employee_id);
            if ($employee->ssiap_level === 3 && $employee->id != $user->id) {
                return response()->json(['message' => 'Unauthorized to delete this attendance record'], 403);
            }
        }

        $attendance->delete();
        return response()->json(['message' => 'Attendance record deleted successfully']);
    }
}
