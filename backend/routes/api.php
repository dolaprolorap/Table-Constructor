<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->post('/auth/logout', [UserController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'paginateAll']);
Route::middleware('auth:sanctum')->post('/users', [UserController::class, 'create']);
Route::middleware('auth:sanctum')->delete('/users/{id}', [UserController::class, 'delete']);
