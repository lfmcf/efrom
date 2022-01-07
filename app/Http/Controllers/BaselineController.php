<?php

namespace App\Http\Controllers;

use App\Models\Baseline;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;

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

        $baseline = new Baseline();
        $baseline->product = $request->product;
        $baseline->procedure_type = $request->procedure_type;
        $baseline->country = $request->country;
        $baseline->rms = $request->rms;
        $baseline->application_stage = $request->application_stage;
        $baseline->procedure_num = $request->procedure_num;
        $baseline->local_tradename = $request->local_tradename;
        $baseline->product_type = $request->product_type;
        $baseline->description = $request->description;
        $baseline->application_num = $request->application_num;
        $baseline->reason = $request->reason;
        $baseline->remarks = $request->remarks;
        $baseline->statuses = $request->statuses;
        $baseline->doc = $docs;
        $baseline->created_by = $request->created_by;
        $baseline->type = $request->query('type');
        $baseline->save();
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
