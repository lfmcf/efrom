<?php

namespace App\Http\Controllers;

use App\Models\CregistrationTermination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CregistrationTerminationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Clinical/RegistrationTermination');
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
     * @param  \App\Models\CregistrationTermination  $cregistrationTermination
     * @return \Illuminate\Http\Response
     */
    public function show(CregistrationTermination $cregistrationTermination)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CregistrationTermination  $cregistrationTermination
     * @return \Illuminate\Http\Response
     */
    public function edit(CregistrationTermination $cregistrationTermination)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CregistrationTermination  $cregistrationTermination
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CregistrationTermination $cregistrationTermination)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CregistrationTermination  $cregistrationTermination
     * @return \Illuminate\Http\Response
     */
    public function destroy(CregistrationTermination $cregistrationTermination)
    {
        //
    }
}
