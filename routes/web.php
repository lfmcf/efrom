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
use App\Http\Controllers\TransferController;
use App\Http\Controllers\BaselineController;
use App\Http\Controllers\RegistrationTerminationController;
use App\Http\Controllers\cRegistrationTerminationController;
use App\Http\Controllers\AmendmentsController;
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

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/', function() {
        return redirect()->route('dashboard');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/interaction', [InteractionController::class, 'index'])->name('interaction');
    Route::get('/finished', [RcController::class, 'index'])->name('finished');
    Route::get('/clinical', [RcController::class, 'clinical'])->name('clinical');
    Route::get('/variation', [VariationController::class, 'index'])->name('variation');
    Route::get('/renouvellement', [RenouvellementController::class, 'index'])->name('renouvellement');
    Route::post('/addcompany', [CompanyController::class, 'store'])->name('addcompany');
    Route::post('/storefinishproduct', [RcController::class, 'store'])->name('storefinishproduct');
    Route::post('/storeclinical', [RcController::class, 'storeclinical'])->name('storeclinical');
    Route::get('/company', [CompanyController::class, 'index'])->name('company');
    Route::get('/transfer', [TransferController::class, 'index'])->name('transfer');
    Route::get('/baseline', [BaselineController::class, 'index'])->name('baseline');
    Route::get('/registrationtermination', [RegistrationTerminationController::class, 'index'])->name('registrationtermination');
    Route::get('/cregistrationtermination', [CregistrationTerminationController::class, 'index'])->name('cregistrationtermination');
    Route::get('/amendments', [AmendmentsController::class, 'index'])->name('amendments');
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
