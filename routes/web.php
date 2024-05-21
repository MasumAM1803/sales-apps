<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SalesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

Route::get('/admin/product', [ProductController::class, 'index'])->name('product.list');
Route::get('/admin/product/detail/{id}', [ProductController::class, 'detail'])->name('product.detail');
Route::get('/admin/product/create', [ProductController::class, 'create'])->name('product.create');
Route::get('/admin/product/edit/{id}', [ProductController::class, 'edit'])->name('product.edit');

Route::get('/admin/sales', [SalesController::class, 'index'])->name('sales.list');
Route::get('/admin/sales/detail/{id}', [SalesController::class, 'detail'])->name('sales.detail');
Route::get('/admin/sales/create', [SalesController::class, 'create'])->name('sales.create');
Route::get('/admin/sales/edit/{id}', [SalesController::class, 'edit'])->name('sales.edit');


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
