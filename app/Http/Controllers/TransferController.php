<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;

class TransferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('MarketingAuth/Transfer', [
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

        $transfer = new Transfer();

        $transfer->product = $request->product;
        $transfer->procedure_type = $request->procedure_type;
        $transfer->country = $request->country;
        $transfer->rms = $request->rms;
        $transfer->application_stage = $request->application_stage;
        $transfer->procedure_num = $request->procedure_num;
        $transfer->local_tradename = $request->local_tradename;
        $transfer->product_type = $request->product_type;
        $transfer->description = $request->description;
        $transfer->reason = $request->reason;
        $transfer->statuses = $request->statuses;
        $transfer->doc = $docs;
        $transfer->created_by = $request->created_by;
        $transfer->type = $request->query('type');
        $transfer->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function show(Transfer $transfer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function edit(Transfer $transfer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transfer $transfer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transfer $transfer)
    {
        //
    }
}
