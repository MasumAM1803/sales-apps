<?php

use App\Http\Controllers\Api\CompareController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SalesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/products', [ProductController::class, 'index']);
Route::get('/product/{id}', [ProductController::class, 'show']);
Route::post('/product', [ProductController::class, 'store']);
Route::put('/product/{id}', [ProductController::class, 'update']);
Route::delete('/product/{id}', [ProductController::class, 'destroy']);
Route::get('/product-compare', [ProductController::class, 'compare']);

Route::post('/sales', [SalesController::class, 'index']);
Route::get('/sale/{id}', [SalesController::class, 'show']);
Route::post('/sale', [SalesController::class, 'store']);
Route::put('/sale/{id}', [SalesController::class, 'update']);
Route::delete('/sale/{id}', [SalesController::class, 'destroy']);