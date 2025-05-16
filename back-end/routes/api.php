<?php

use App\Http\Controllers\EmployeeTeamAssignmentController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// AUTH ROUTES
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// USERS ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
});

// SITES ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/sites', [SiteController::class, 'index']);
    Route::post('/sites', [SiteController::class, 'store']);
    Route::get('/sites/{site}', [SiteController::class, 'show']);
    Route::put('/sites/{site}', [SiteController::class, 'update']);
    Route::delete('/sites/{site}', [SiteController::class, 'destroy']);
    Route::get('/sites-analytics', [SiteController::class, 'analytics']);
});

// TEAM ASSIGNMENTS ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/assignments/current', [EmployeeTeamAssignmentController::class, 'getCurrentUserAssignments']);
    Route::get('/assignments', [EmployeeTeamAssignmentController::class, 'index']);
    Route::post('/assignments', [EmployeeTeamAssignmentController::class, 'store']);
    Route::get('/assignments/{id}', [EmployeeTeamAssignmentController::class, 'show']);
    Route::put('/assignments/{id}', [EmployeeTeamAssignmentController::class, 'update']);
    Route::delete('/assignments/{id}', [EmployeeTeamAssignmentController::class, 'destroy']);
});

// USER ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/{id}/site', [UserController::class, 'getUserSite']);
});

// INCIDENTS ROUTES
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('incidents', IncidentController::class);
});


require __DIR__ . '/auth.php';
