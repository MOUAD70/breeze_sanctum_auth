<?php

use App\Http\Controllers\SiteController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
});

// Route::middleware('auth:sanctum')->group(function () {

// });

Route::get('/sites', [SiteController::class, 'index']);
Route::post('/sites', [SiteController::class, 'store']);
Route::get('/sites/{site}', [SiteController::class, 'show']);
Route::put('/sites/{site}', [SiteController::class, 'update']);
Route::delete('/sites/{site}', [SiteController::class, 'destroy']);

require __DIR__ . '/auth.php';
