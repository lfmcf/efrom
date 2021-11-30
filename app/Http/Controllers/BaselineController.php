<?php

namespace App\Http\Controllers;

use App\Models\Baseline;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;

class BaselineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('MarketingAuth/Baseline', [
            'countries' => $countries
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Baseline  $baseline
     * @return \Illuminate\Http\Response
     */
    public function show(Baseline $baseline)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Baseline  $baseline
     * @return \Illuminate\Http\Response
     */
    public function edit(Baseline $baseline)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Baseline  $baseline
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Baseline $baseline)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Baseline  $baseline
     * @return \Illuminate\Http\Response
     */
    public function destroy(Baseline $baseline)
    {
        //
    }
}
