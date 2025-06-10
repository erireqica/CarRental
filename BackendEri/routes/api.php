<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomepageContentController;
use App\Http\Controllers\AboutUsContentController;
use App\Http\Controllers\UserController;


Route::get('/homepage', [HomepageContentController::class, 'index']);
Route::get('/about-us', [AboutUsContentController::class, 'index']);
Route::apiResource('cars', CarController::class)->only(['index', 'show']);

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'getCurrentUser']);

    Route::apiResource('cars', CarController::class)->only(['store', 'update', 'destroy']);

    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings/{id}/confirm', [BookingController::class, 'confirm']);
    Route::post('/bookings/{id}/cancel', [BookingController::class, 'cancel']);

    Route::post('/homepage/seed', [HomepageContentController::class, 'seed']);
    Route::put('/homepage', [HomepageContentController::class, 'update']);

    Route::put('/about-us', [AboutUsContentController::class, 'update']);

    Route::get('/users', [UserController::class, 'getUsers']);
    Route::post('/users', [UserController::class, 'createUser']);
    Route::put('/users/{id}', [UserController::class, 'updateUser']);
    Route::delete('/users/{id}', [UserController::class, 'deleteUser']);

    Route::post('/logout', [UserController::class, 'logout']);
});
