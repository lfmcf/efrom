<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\InteractionController;
use App\Http\Controllers\RcController;
use App\Http\Controllers\VariationController;
use App\Http\Controllers\RenouvellementController;
use App\Http\Controllers\CompanyController;

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
});


Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/interaction', [InteractionController::class, 'index'])->name('interaction');
    Route::get('/finished', [RcController::class, 'index'])->name('finished');
    Route::get('/clinical', [RcController::class, 'clinical'])->name('clinical');
    Route::get('/variation', [VariationController::class, 'index'])->name('variation');
    Route::get('/renouvellement', [RenouvellementController::class, 'index'])->name('renouvellement');
    Route::post('/addcompany', [CompanyController::class, 'store'])->name('addcompany');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified', 'twofactor'])->name('dashboard');

// Route::get('/interaction', function () {
//     return [ReportController::class, 'index'])
// })->middleware(['auth', 'verified', 'twofactor'])->name('interaction');

// Route::get('/masterupdate', function () {
//     return Inertia::render('Masterupdate');
// })->middleware(['auth', 'verified', 'twofactor'])->name('masterupdate');

// Route::get('verify/resend', [TwoFactorController::class,'resend'])->name('verify.resend');
// Route::resource('verify', TwoFactorController::class)->only(['index', 'store']);

require __DIR__.'/auth.php';
