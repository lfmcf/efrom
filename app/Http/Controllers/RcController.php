<?php

namespace App\Http\Controllers;

use App\Models\Rc;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;
use App\Models\substanceActive;
use App\Models\packagingItemType;
use App\Models\Countries;
use Illuminate\Support\Facades\Validator;

class RcController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $compnies = Company::orderBy('name')->get();
        $substanceActive = substanceActive::all();
        $packagingItemTypes = packagingItemType::all();
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('Clinical/Index', [
            'companies' => $compnies,
            'substanceActive' => $substanceActive,
            'packagingItemTypes' => $packagingItemTypes,
            'countries' => $countries
        ]);
    }

    public function clinical()
    {
        $compnies = Company::orderBy('name')->get();
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('Clinical/Clinical', [
            'companies' => $compnies,
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
       
        // $validated = $request->validate([
        //     'procedure_type' => 'required',
        //     'product_type' => 'required',
        //     'product_name' => 'required',
        //     'application_stage' => 'required',
        //     'local_tradename' => 'required',
        //     'registration_holder' => 'required',
        //     'authorized_pharmaceutical_form' => 'required',
        //     'route_of_admin' => 'required',
        //     'atc' => 'required',
        //     'packaging_name' => 'required',
        //     'description' => 'required',
        //     'package_registrationr_number' => 'required',
        //     'indication' => 'required',
        //     'control_site' => 'required',
        //     'distributor' => 'required',
        //     'exploitant' => 'required',
        //     'manufacturer_of_the_active_substance' => 'required',
        //     'manufacturer_of_the_finished_product' => 'required',
        //     'inner_packaging_site' => 'required',
        //     'outer_packaging_site' => 'required',
        //     'release_site' => 'required',
        //     'supplier_of_active_ingredient' => 'required',
        //     'bulk_manufacturing_site' => 'required',
        //     'status' => 'required',
        //     'status_date' => 'required',
        // ]);

        // $validator = Validator::make($request->all(), [
        //     'packagings.packaging_name' => 'required',
        //     'packagings.package_number' => 'required',
        //     'packagings.description' => 'required'
        // ]);

        // dd($validator);

        $rc = new Rc;

        $rc->procedure_type = $request->procedure_type;
        $rc->country = $request->country;
        $rc->procedure_number = $request->procedure_number;
        $rc->product_type = $request->product_type;
        $rc->application_stage = $request->application_stage;
        $rc->product_name = $request->product_name;
        $rc->local_tradename = $request->local_tradename;
        $rc->registration_holder = $request->registration_holder;
        $rc->application_number = $request->application_number;
        $rc->authorized_pharmaceutical_form = $request->authorized_pharmaceutical_form;
        $rc->administrable_pharmaceutical_form = $request->administrable_pharmaceutical_form;
        $rc->route_of_admin = $request->route_of_admin;
        $rc->atc = $request->atc;
        $rc->orphan_designation_status = $request->orphan_designation_status;
        $rc->orphan_indication_type = $request->orphan_indication_type;
        $rc->under_intensive_monitoring = $request->under_intensive_monitoring;
        $rc->key_dates = $request->key_dates;
        $rc->alternate_number_type = $request->alternate_number_type;
        $rc->alternate_number = $request->alternate_number;
        $rc->remarks = $request->remarks;
        $rc->local_agent_company = $request->local_agent_company;
        $rc->formulations = $request->formulations;
        $rc->packagings = $request->packagings;
        $rc->indication = $request->indication;
        $rc->paediatric_use = $request->paediatric_use;
        $rc->manufacturing = $request->manufacturing;
        $rc->statuses = $request->statuses;
        $rc->doc = $request->doc;
        $rc->save();

        
    }

    public function storeclinical(Request $request)
    {
        $validated = $request->validate([
            'procedure_type' => 'required',
            'product_type' => 'required',
            'product_name' => 'required',
            'application_stage' => 'required',
            'authorized_pharmaceutical_form' => 'required',
            'route_of_admin' => 'required',
            'atc' => 'required',
            'indication' => 'required',
            'control_site' => 'required',
            'distributor' => 'required',
            'exploitant' => 'required',
            'manufacturer_of_the_active_substance' => 'required',
            'manufacturer_of_the_finished_product' => 'required',
            'inner_packaging_site' => 'required',
            'outer_packaging_site' => 'required',
            'release_site' => 'required',
            'supplier_of_active_ingredient' => 'required',
            'bulk_manufacturing_site' => 'required',
            'status' => 'required',
            'status_date' => 'required',
        ]);

        dd($request->all());
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function show(Rc $rc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function edit(Rc $rc)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rc $rc)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rc $rc)
    {
        //
    }
}
