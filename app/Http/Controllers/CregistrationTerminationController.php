<?php

namespace App\Http\Controllers;

use App\Models\CregistrationTermination;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;

class CregistrationTerminationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('Clinical/RegistrationTermination', [
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

        $crt = new CregistrationTermination();
        $crt->product = $request->product;
        $crt->procedure_type = $request->procedure_type;
        $crt->country = $request->country;
        $crt->rms = $request->rms;
        $crt->application_stage = $request->application_stage;
        $crt->procedure_num = $request->procedure_num;
        $crt->local_tradename = $request->local_tradename;
        $crt->product_type = $request->product_type;
        $crt->description = $request->description;
        $crt->type = $request->type;
        $crt->reason = $request->reason;
        $crt->remarks = $request->remarks;
        $crt->statuses = $request->statuses;
        $crt->doc = $docs;
        $crt->created_by = $request->created_by;
        $crt->type = $request->query('type');
        $crt->save();
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
