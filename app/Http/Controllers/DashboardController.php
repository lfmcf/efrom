<?php

namespace App\Http\Controllers;

use App\Models\Baseline;
use Illuminate\Http\Request;
use App\Models\Rc;
use App\Models\Renouvellement;
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
        return Inertia::render('Dashboard', [
            'rc' => $rc,
            'variation' => $variation,
            'renewal' => $renewal,
            'baseline' => $baseline
        ]);
    }
}
