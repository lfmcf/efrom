<?php

namespace App\Http\Controllers;

use App\Mail\Baseline as MailBaseline;
use App\Models\Baseline;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;


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

        if($request->query('type') === 'submit') {

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
            $baselineDetails = array(
                'Description of the event',
                'Application N°',
                'Reason for variation',
                'Remarks'
            );
            $eventStatus = array(
                'Status',
                'Status Date',
                'eCTD sequence',
                'Change Control or pre-assessment',
                'CCDS/Core PIL ref n°',
                'Remarks',
                'Effective internal implementation date',
                'Implementation Deadline of deadline for answer',
                'Impacted of changes approved'
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
                $baseline->product,
                $baseline->procedure_type,
                "",
                $baseline->rms,
                $baseline->procedure_num,
                $baseline->local_tradename,
                $baseline->application_stage,
                $baseline->product_type
            ], NULL, 'A2');

            if(is_array($baseline->country)) {
                foreach ($baseline->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Baseline Details');
            $sheet->fromArray($baselineDetails, NULL, 'A1');
            $sheet->fromArray([
                $baseline->description,
                $baseline->application_num,
                $baseline->reason,
                $baseline->remarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Events Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            $sheet->fromArray($baseline->statuses, NULL, 'A2');
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
            $sheet->fromArray($baseline->doc, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('D'.$i);
                $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            $name = 'Baseline ' . $date . '.xlsx';
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new MailBaseline($name));

        }
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
