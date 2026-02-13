<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InstitutionController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AuthController;

// ========================================
// Public Authentication Routes (Rate Limited)
// ========================================
Route::middleware(['throttle:5,1'])->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

// ========================================
// Authenticated User Routes
// ========================================
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [\App\Http\Controllers\Api\UserController::class, 'me']);
    
    // Dashboard routes (any authenticated user)
    Route::get('dashboard/stats', [\App\Http\Controllers\Api\DashboardController::class, 'stats']);
});

// ========================================
// Admin-Only Routes (RBAC Protected)
// ========================================
Route::group(['middleware' => ['auth:sanctum', 'role:admin']], function () {
    // User management (admin only)
    Route::get('users', [\App\Http\Controllers\Api\UserController::class, 'index']);
    Route::post('users', [\App\Http\Controllers\Api\UserController::class, 'store']);
    Route::get('users/{id}', [\App\Http\Controllers\Api\UserController::class, 'show']);
    Route::post('users/{id}', [\App\Http\Controllers\Api\UserController::class, 'update']);
    Route::delete('users/{id}', [\App\Http\Controllers\Api\UserController::class, 'destroy']);
    
    // Contact Messages Management (admin only)
    Route::get('messages/unread-count', [ContactController::class, 'unreadCount']);
    Route::get('messages', [ContactController::class, 'index']);
    Route::get('messages/{id}', [ContactController::class, 'show']);
    Route::patch('messages/{id}/status', [ContactController::class, 'updateStatus']);
    Route::delete('messages/{id}', [ContactController::class, 'destroy']);

    // Institution modification routes (admin only)
    Route::post('institutions', [InstitutionController::class, 'store']);
    Route::post('institutions/{id}', [InstitutionController::class, 'update']);
    
    // Program modification routes (admin only)
    Route::post('programs', [ProgramController::class, 'store']);
    Route::put('programs/{id}', [ProgramController::class, 'update']);
});

// ========================================
// Admin & Editor Routes (RBAC Protected)
// ========================================
Route::group(['middleware' => ['auth:sanctum', 'role:admin,editor']], function () {
    Route::post('announcements', [AnnouncementController::class, 'store']);
    Route::post('announcements/{id}', [AnnouncementController::class, 'update']);
    Route::delete('announcements/{id}', [AnnouncementController::class, 'destroy']);
});

// ========================================
// Public Routes (Read-only, No Auth Required)
// ========================================
Route::group([], function () {
    Route::get('institutions', [InstitutionController::class, 'index']);
    Route::get('institutions/{id}', [InstitutionController::class, 'show']);
    Route::get('programs', [ProgramController::class, 'index']);
    Route::get('programs/{id}', [ProgramController::class, 'show']);
    Route::get('announcements', [AnnouncementController::class, 'index']);
    Route::get('announcements/{id}', [AnnouncementController::class, 'show']);
    
// Contact form (rate limited to prevent spam)
    Route::post('contact', [ContactController::class, 'store'])->middleware('throttle:3,1');
});

Route::get('view-image', function (\Illuminate\Http\Request $request) {
    $path = $request->query('path');
    $path = str_replace('\\', '/', $path);
    
    if (!\Illuminate\Support\Facades\Storage::disk('public')->exists($path)) {
        return response()->json(['error' => 'Image not found'], 404);
    }
    
    return \Illuminate\Support\Facades\Storage::disk('public')->response($path);
});
