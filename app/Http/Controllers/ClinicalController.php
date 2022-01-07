<?php

namespace App\Http\Controllers;

use App\Models\Clinical;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Countries;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ClinicalController extends Controller
{
    public function index()
    {
        $compnies = Company::orderBy('name')->get();
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('Clinical/Clinical', [
            'companies' => $compnies,
            'countries' => $countries
        ]);
    }

    public function store(Request $request) 
    {
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'procedure_type' => 'required',
                    'product_type' => 'required',
                    'application_stage' => 'required',
                    'product_name' => 'required',
                    'authorized_pharmaceutical_form' => 'required',
                    'route_of_admin' => 'required',
                    'atc' => 'required',
                    'indication' => 'required',
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
        
        $clinical = new Clinical();
        $clinical->procedure_type = $request->procedure_type;
        $clinical->country = $request->country;
        $clinical->rms = $request->rms;
        $clinical->procedure_number = $request->procedure_number;
        $clinical->product_type = $request->product_type;
        $clinical->application_stage = $request->application_stage;
        $clinical->product_name = $request->product_name;
        $clinical->registration_title = $request->registration_title;
        $clinical->protocol_number = $request->protocol_number;
        $clinical->study_sponsor = $request->study_sponsor;
        $clinical->full_study_title = $request->full_study_title;
        $clinical->remarks = $request->remarks;
        $clinical->protocol_type = $request->protocol_type;
        $clinical->clinical_phase = $request->clinical_phase;
        $clinical->authorized_pharmaceutical_form = $request->authorized_pharmaceutical_form;
        $clinical->route_of_admin = $request->route_of_admin;
        $clinical->atc = $request->atc;
        $clinical->indication = $request->indication;
        $clinical->paediatric_use = $request->paediatric_use;
        $clinical->manufacturing = $request->manufacturing;
        $clinical->statuses = $request->statuses;
        $clinical->doc = $docs;
        $clinical->created_by = $request->created_by;
        $clinical->type = $request->query('type');
        $clinical->save();
    }
}
