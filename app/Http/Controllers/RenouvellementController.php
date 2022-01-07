<?php

namespace App\Http\Controllers;

use App\Models\Renouvellement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;

class RenouvellementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('MarketingAuth/Renewal', [
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
                    'category' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ],
                [
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

        $ren = new Renouvellement;

        $ren->product = $request->product;
        $ren->procedure_type = $request->procedure_type;
        $ren->country = $request->country;
        $ren->rms = $request->rms;
        $ren->application_stage = $request->application_stage;
        $ren->procedure_num = $request->procedure_num;
        $ren->local_tradename = $request->local_tradename;
        $ren->product_type = $request->product_type;
        $ren->category = $request->category;
        $ren->description = $request->description;
        $ren->application_num = $request->application_num;
        $ren->submission_format = $request->submission_format;
        $ren->validation_reason = $request->validation_reason;
        $ren->statuses = $request->statuses;
        $ren->doc = $docs;
        $ren->created_by = $request->created_by;
        $ren->type = $request->query('type');
        $ren->save();
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Renouvellement  $renouvellement
     * @return \Illuminate\Http\Response
     */
    public function show(Renouvellement $renouvellement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Renouvellement  $renouvellement
     * @return \Illuminate\Http\Response
     */
    public function edit(Renouvellement $renouvellement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Renouvellement  $renouvellement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Renouvellement $renouvellement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Renouvellement  $renouvellement
     * @return \Illuminate\Http\Response
     */
    public function destroy(Renouvellement $renouvellement)
    {
        //
    }
}
