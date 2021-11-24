<?php

namespace App\Http\Controllers;

use App\Models\Amendments;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AmendmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('MarketingAuth/Amendments');
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
     * @param  \App\Models\Amendments  $amendments
     * @return \Illuminate\Http\Response
     */
    public function show(Amendments $amendments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Amendments  $amendments
     * @return \Illuminate\Http\Response
     */
    public function edit(Amendments $amendments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Amendments  $amendments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Amendments $amendments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Amendments  $amendments
     * @return \Illuminate\Http\Response
     */
    public function destroy(Amendments $amendments)
    {
        //
    }
}
