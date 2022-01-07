<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rc;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $rc = Rc::orderBy('created_at', 'DESC')->get();
        return Inertia::render('Dashboard', [
            'rc' => $rc
        ]);
    }
}
