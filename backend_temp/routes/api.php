<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\InstitutionController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\ContactController;

Route::prefix('api')->group(function () {
    // Public routes
    Route::get('institutions', [InstitutionController::class, 'index']);
    Route::get('institutions/{id}', [InstitutionController::class, 'show']);
    
    Route::get('programs', [ProgramController::class, 'index']);
    Route::get('programs/{id}', [ProgramController::class, 'show']);
    
    Route::get('announcements', [AnnouncementController::class, 'index']);
    Route::get('announcements/{id}', [AnnouncementController::class, 'show']);
    
    Route::post('contact', [ContactController::class, 'store']);
    
    // Dashboard routes
    Route::get('dashboard/stats', [\App\Http\Controllers\Api\DashboardController::class, 'stats']);
});
