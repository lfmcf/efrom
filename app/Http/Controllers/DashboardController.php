<?php

namespace App\Http\Controllers;

use App\Models\Amendments;
use App\Models\Baseline;
use App\Models\Clinical;
use Illuminate\Http\Request;
use App\Models\Rc;
use App\Models\RegistrationTermination;
use App\Models\Renouvellement;
use App\Models\Transfer;
use App\Models\Variation;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $rc = Rc::orderBy('created_at', 'DESC')->get();
        $variation = Variation::orderBy('created_at', 'DESC')->get();
        $renewal = Renouvellement::orderBy('created_at', 'DESC')->get();
        $baseline = Baseline::orderBy('created_at', 'DESC')->get();
        $clinical = Clinical::orderBy('created_at', 'DESC')->get();
        $amendment = Amendments::orderBy('created_at', 'DESC')->get();
        $transfer = Transfer::orderBy('created_at', 'DESC')->get();
        $rt = RegistrationTermination::orderBy('created_at', 'DESC')->get();
        return Inertia::render('Dashboard', [
            'rc' => $rc,
            'variation' => $variation,
            'renewal' => $renewal,
            'baseline' => $baseline,
            'clinical' => $clinical,
            'amendment' => $amendment,
            'transfer' => $transfer,
            'rt' => $rt
        ]);
    }
}
