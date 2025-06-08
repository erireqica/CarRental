<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomepageContentController;
use App\Http\Controllers\AboutUsContentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('cars', CarController::class);

Route::get('/homepage', [HomepageContentController::class, 'index']);

Route::post('/homepage/seed', [HomepageContentController::class, 'seed']);

Route::put('/homepage', [HomepageContentController::class, 'update']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings/{id}/confirm', [BookingController::class, 'confirm']);
    Route::post('/bookings/{id}/cancel', [BookingController::class, 'cancel']);
});

// User Management Routes
Route::post('/register', [App\Http\Controllers\UserController::class, 'register']);
Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [App\Http\Controllers\UserController::class, 'getCurrentUser']);
    Route::get('/users', [App\Http\Controllers\UserController::class, 'getUsers']);
    Route::post('/users', [App\Http\Controllers\UserController::class, 'createUser']);
    Route::put('/users/{id}', [App\Http\Controllers\UserController::class, 'updateUser']);
    Route::delete('/users/{id}', [App\Http\Controllers\UserController::class, 'deleteUser']);
    Route::post('/logout', [App\Http\Controllers\UserController::class, 'logout']);
});
Route::get('/about-us', [AboutUsContentController::class, 'index']);
Route::put('/about-us', [AboutUsContentController::class, 'update']);