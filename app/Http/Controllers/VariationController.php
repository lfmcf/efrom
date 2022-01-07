<?php

namespace App\Http\Controllers;

use App\Models\Variation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class VariationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('MarketingAuth/Variation', [
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
        // dd($request->all());
        if($request->query('type') === 'submit')
        {
            if(!$request->isHq) {
                $validator = $request->validate(
                    [
                        'category' => 'required',
                        'submission_type' => 'required',
                        'statuses.*.status' => 'required',
                        'statuses.*.status_date' => 'required',
                    ],
                    [
                        'statuses.*.status.required' => 'A status is required',
                        'statuses.*.status_date.required' => 'A status date is required',
                    ]
                );
            } else {
                $validator = $request->validate(
                    [
                        'variation.*.category' => 'required',
                        'variation.*.submission_type' => 'required',
                        'statuses.*.status' => 'required',
                        'statuses.*.status_date' => 'required',
                    ],
                    [
                        'variation.*.category.required' => 'A category is required',
                        'variation.*.submission_type.required' => 'A submission type is required',
                        'statuses.*.status.required' => 'A status is required',
                        'statuses.*.status_date.required' => 'A status date is required',
                    ]
                );
            }
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

        $var = new Variation;
        if(!$request->isHq) {
            $var->product = $request->product;
            $var->procedure_type = $request->procedure_type;
            $var->rms = $request->rms;
            $var->application_stage = $request->application_stage;
            $var->procedure_num = $request->procedure_num;
            $var->local_tradename = $request->local_tradename;
            $var->product_type = $request->product_type;
            $var->variation_type = $request->variation_type;
            $var->submission_type = $request->submission_type;
            $var->application_number = $request->application_number;
            $var->submission_number = $request->submission_number;
            $var->variation_reason = $request->variation_reason;
            $var->statuses = $request->statuses;
            $var->doc = $docs;
            $var->isHq = $request->isHq;
            $var->created_by = $request->created_by;
            $var->type = $request->query('type');
        } else {
            $var->identification = $request->identification;
            $var->variation = $request->variation;
            $var->statuses = $request->statuses;
            $var->doc = $docs;
            $var->identification = $request->identification;
            $var->isHq = $request->isHq;
            $var->created_by = $request->created_by;
            $var->type = $request->query('type');
        }
       
        $var->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function show(Variation $variation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function edit(Variation $variation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Variation $variation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Variation $variation)
    {
        //
    }
}
