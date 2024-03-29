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
use App\Http\Controllers\CregistrationTerminationController;
use App\Http\Controllers\AmendmentsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ClinicalController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MaCompanyController;

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

    Route::get('/', function () {
        return redirect()->route('dashboard');
    });

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Route::get('/dashbordkpi', [DashboardController::class, 'dashboard_kpi'])->name('dashboardkpi');
    Route::get('/interaction', [InteractionController::class, 'index'])->name('interaction');

    Route::get('/ma/create', [RcController::class, 'create'])->name('ma-create');
    Route::get('/ma/{id}/edit', [RcController::class, 'edit'])->name('/ma/edit');
    Route::get('/ma/{id}/show', [RcController::class, 'show'])->name('/ma-show');
    Route::post('/storefinishproduct', [RcController::class, 'store'])->name('storefinishproduct');
    Route::post('/updatefinishproduct', [RcController::class, 'update'])->name('updatefinishproduct');

    Route::get('/variation/create', [VariationController::class, 'index'])->name('variation-create');
    Route::get('/variation/{id}/edit', [VariationController::class, 'edit'])->name('variation-edit');
    Route::get('/variation/{id}/show', [VariationController::class, 'show'])->name('variation-show');
    Route::post('/storevariation', [VariationController::class, 'store'])->name('storevariation');
    Route::post('/storehqproject', [VariationController::class, 'storehq'])->name('storehqproject');
    Route::post('/updatevariation', [VariationController::class, 'update'])->name('updatevariation');
    Route::post('/updatehqvariation', [VariationController::class, 'updatehq'])->name('updatehqvariation');

    Route::get('/renewal/create', [RenouvellementController::class, 'create'])->name('renewal-create');
    Route::get('/renewal/{id}/edit', [RenouvellementController::class, 'edit'])->name('renewal-edit');
    Route::get('/renewal/{id}/show', [RenouvellementController::class, 'show'])->name('renewal-show');
    Route::post('/storerenewal', [RenouvellementController::class, 'store'])->name('storerenewal');
    Route::post('/updaterenewal', [RenouvellementController::class, 'update'])->name('updaterenewal');

    Route::get('/transfer/create', [TransferController::class, 'create'])->name('transfer-create');
    Route::get('/transfer/{id}/edit', [TransferController::class, 'edit'])->name('transfer-edit');
    Route::get('/transfer/{id}/show', [TransferController::class, 'show'])->name('transfer-show');
    Route::post('/storetransfer', [TransferController::class, 'store'])->name('storetransfer');
    Route::post('/updatetransfer', [TransferController::class, 'update'])->name('updatetransfer');

    Route::get('/baseline/create', [BaselineController::class, 'create'])->name('baseline-create');
    Route::get('/baseline/{id}/edit', [BaselineController::class, 'edit'])->name('baseline-edit');
    Route::get('/baseline/{id}/show', [BaselineController::class, 'show'])->name('baseline-show');
    Route::post('/storebaseline', [BaselineController::class, 'store'])->name('storebaseline');
    Route::post('/updatebaseline', [BaselineController::class, 'update'])->name('updatebaseline');

    Route::get('/registrationtermination/create', [RegistrationTerminationController::class, 'create'])->name('registrationtermination-create');
    Route::get('/registrationtermination/{id}/edit', [RegistrationTerminationController::class, 'edit'])->name('registrationtermination-edit');
    Route::get('/registrationtermination/{id}/show', [RegistrationTerminationController::class, 'show'])->name('registrationtermination-show');
    Route::post('/store_registration_termination', [RegistrationTerminationController::class, 'store'])->name('store_registration_termination');
    Route::post('/update_registration_termination', [RegistrationTerminationController::class, 'update'])->name('update_registration_termination');

    Route::get('/clinical/create', [ClinicalController::class, 'create'])->name('clinical-create');
    Route::get('/clinical/{id}/edit', [ClinicalController::class, 'edit'])->name('clinical-edit');
    Route::get('/clinical/{id}/show', [ClinicalController::class, 'show'])->name('clinical-show');
    Route::post('/storeclinical', [ClinicalController::class, 'store'])->name('storeclinical');
    Route::post('/updateclinical', [ClinicalController::class, 'update'])->name('updateclinical');

    Route::get('/amendments/create', [AmendmentsController::class, 'create'])->name('amendments-create');
    Route::get('/amendments/{id}/edit', [AmendmentsController::class, 'edit'])->name('amendments-edit');
    Route::get('/amendments/{id}/show', [AmendmentsController::class, 'show'])->name('amendments-show');
    Route::post('/storeamendment', [AmendmentsController::class, 'store'])->name('storeamendment');
    Route::post('/updateamendment', [AmendmentsController::class, 'update'])->name('updateamendment');

    Route::get('/clinicalregistrationtermination/create', [CregistrationTerminationController::class, 'create'])->name('cregistrationtermination-create');
    Route::get('/clinicalregistrationtermination/{id}/edit', [CregistrationTerminationController::class, 'edit'])->name('cregistrationtermination-edit');
    Route::get('/clinicalregistrationtermination/{id}/show', [CregistrationTerminationController::class, 'show'])->name('cregistrationtermination-show');
    Route::post('/storeclinical_registration_termination', [CregistrationTerminationController::class, 'store'])->name('storeclinical_registration_termination');

    Route::post('/addcompany', [CompanyController::class, 'store'])->name('addcompany');
    Route::post('/formsByDate', [DashboardController::class, 'getformsnumber'])->name('formsByDate');

    Route::get('/macompany', [MaCompanyController::class, 'create'])->name('macompany');
    Route::post('/addmacompany', [MaCompanyController::class, 'store'])->name('storemacompany');

    Route::post('/createproduct', [ProductController::class, 'store'])->name('createproduct');

    Route::get('contact', [ContactController::class, 'create'])->name('contact');
    Route::post('storecontact', [ContactController::class, 'store'])->name('storecontact');
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

require __DIR__ . '/auth.php';
