<?php

namespace App\Http\Controllers;

use App\Models\RegistrationTermination;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;

class RegistrationTerminationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('MarketingAuth/RegistrationTermination', [
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
     * @param  \App\Models\RegistrationTermination  $registrationTermination
     * @return \Illuminate\Http\Response
     */
    public function show(RegistrationTermination $registrationTermination)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RegistrationTermination  $registrationTermination
     * @return \Illuminate\Http\Response
     */
    public function edit(RegistrationTermination $registrationTermination)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RegistrationTermination  $registrationTermination
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RegistrationTermination $registrationTermination)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RegistrationTermination  $registrationTermination
     * @return \Illuminate\Http\Response
     */
    public function destroy(RegistrationTermination $registrationTermination)
    {
        //
    }
}
