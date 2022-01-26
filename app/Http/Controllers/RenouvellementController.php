<?php

namespace App\Http\Controllers;

use App\Mail\Renewal;
use App\Models\Renouvellement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;

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
                        'public',
                        $uploadedFile,
                        $filename
                    );
                    $doc['document'] = asset('storage/'.$filename);;
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

        if ($request->query('type') === 'submit') {
            $registrationIdentification = array(
                'Product',
                'Procedure Type',
                'Country',
                'RMS',
                'Procedure Number',
                'Local Tradename',
                'Application Stage',
                'Product Type'
            );
            $renewalDetail = array(
                'Variation Category',
                'Event Description',
                'Application N°',
                'Dossier Submission Format',
                'Reason For Variation'
            );
            $renewalStatus = array(
                'Status',
                'Status Date',
                'eCTD sequence',
                'Change Control or pre-assessment',
                'CCDS/Core PIL ref n°',
                'Remarks',
                'Implementation Deadline',
                'Next Renewals',
                'Next Renewals Submission Deadline',
                'Next Renewal Date'
            );
            $document = array(
                'Document type',
                'Document title',
                'Language',
                'Version date',
                'Remarks',
                'Document'
            );

            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Registration identification');
            $sheet->getStyle('1:1')->getFont()->setBold(true);

            $sheet->fromArray($registrationIdentification, NULL, 'A1');
            $sheet->fromArray([
                $ren->product,
                $ren->procedure_type,
                "",
                $ren->rms,
                $ren->procedure_num,
                $ren->local_tradename,
                $ren->application_stage,
                $ren->product_type
            ], NULL, 'A2');

            if(is_array($ren->country)) {
                foreach ($ren->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Renewal Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($renewalDetail, NULL, 'A1');
            $sheet->fromArray([
                $ren->category,
                $ren->description,
                $ren->application_num,
                $ren->submission_format,
                $ren->validation_reason
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($renewalStatus, NULL, 'A1');
            $sheet->fromArray($ren->statuses, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('B'.$i);
                $sheet->setCellValue('B'.$i, date("d-m-Y", strtotime($datef)));
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $sheet->fromArray($ren->doc, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('D'.$i);
                $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            $name = 'Renewal ' . $date . '.xlsx';
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new Renewal($name));
        }

        
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
