<?php

use App\Http\Controllers\ColumnController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [UserController::class, 'login']);

Route::middleware(['auth:sanctum', 'disable-cors'])->post('/auth/logout', [UserController::class, 'logout']);
Route::middleware(['auth:sanctum', 'disable-cors'])->get('/users', [UserController::class, 'paginateAll']);
Route::middleware(['auth:sanctum', 'disable-cors'])->post('/users', [UserController::class, 'create']);
Route::middleware(['auth:sanctum', 'disable-cors'])->delete('/users/{id}', [UserController::class, 'delete']);

Route::middleware(['auth:sanctum', 'disable-cors'])->post('/tables', [TableController::class, 'create']);
Route::middleware(['auth:sanctum', 'disable-cors'])->get('/tables', [TableController::class, 'paginateAll']);
Route::middleware(['auth:sanctum', 'disable-cors'])->put('/tables/{id}', [TableController::class, 'update']);
Route::middleware(['auth:sanctum', 'disable-cors'])->get('/tables/{id}', [TableController::class, 'findOne']);
Route::middleware(['auth:sanctum', 'disable-cors'])->delete('/tables/{id}', [TableController::class, 'delete']);

Route::middleware(['auth:sanctum', 'disable-cors'])->post('/columns', [ColumnController::class, 'create']);
Route::middleware(['auth:sanctum', 'disable-cors'])->put('/columns/{id}', [ColumnController::class, 'update']);
Route::middleware(['auth:sanctum', 'disable-cors'])->delete('/columns/{id}', [ColumnController::class, 'delete']);
