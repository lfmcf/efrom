<?php

namespace App\Http\Controllers;

use App\Models\Rc;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;
use App\Models\substanceActive;
use App\Models\packagingItemType;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;

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
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'procedure_type' => 'required',
                    'product_type' => 'required',
                    'application_stage' => 'required',
                    'product_name' => 'required',
                    'local_tradename' => 'required',
                    'registration_holder' => 'required',
                    'authorized_pharmaceutical_form' => 'required',
                    'route_of_admin' => 'required',
                    'atc' => 'required',
                    'packagings.*.packaging_name' => 'required',
                    'packagings.*.package_number' => 'required',
                    'packagings.*.description' => 'required',
                    'indication' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ],
                [
                    'packagings.*.packaging_name.required' => 'A package name is required',
                    'packagings.*.package_number.required' => 'A package number is required',
                    'packagings.*.description.required' => 'A package description is required',
                    'statuses.*.status.required' => 'A status is required',
                    'statuses.*.status_date.required' => 'A status date is required',
                ]
            );
        }
        

        
        $docs = $request->doc;
        
        if(!empty($docs)) {
            $arr = array_map(function($doc) {
                if ($doc['document']) {
                    $uploadedFile = $doc['document'];
                    $filename = time() . $uploadedFile->getClientOriginalName();
                    $path = Storage::putFileAs(
                        'Documents',
                        $uploadedFile,
                        $filename
                    );
                    $doc['document'] = $path;
                }
                return $doc;
            }, $docs);
            $docs = $arr;
        }
        
        $rc = new Rc;

        $rc->procedure_type = $request->procedure_type;
        $rc->country = $request->country;
        $rc->rms = $request->rms;
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
        $rc->doc = $docs;
        $rc->created_by = $request->created_by;
        $rc->type = $request->query('type');
        $rc->save();
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

    public function messages()
    {
        return [
            'packagings.*.packaging_name' => 'A package name is required',
        ];
    }
}
