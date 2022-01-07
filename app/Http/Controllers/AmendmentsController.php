<?php

namespace App\Http\Controllers;

use App\Models\Amendments;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;

class AmendmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('MarketingAuth/Amendments', [
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

        $amendments = new Amendments();
        $amendments->product = $request->product;
        $amendments->procedure_type = $request->procedure_type;
        $amendments->country = $request->country;
        $amendments->rms = $request->rms;
        $amendments->application_stage = $request->application_stage;
        $amendments->procedure_num = $request->procedure_num;
        $amendments->local_tradename = $request->local_tradename;
        $amendments->description = $request->description;
        $amendments->reason = $request->reason;
        $amendments->remarks = $request->remarks;
        $amendments->statuses = $request->statuses;
        $amendments->doc = $docs;
        $amendments->created_by = $request->created_by;
        $amendments->type = $request->query('type');
        $amendments->save();
        
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
