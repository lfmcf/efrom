<?php

namespace App\Http\Controllers;

use App\Mail\Amendment;
use App\Models\Amendments;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;

class AmendmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('Amendment/Create', [
            'countries' => $countries
        ]);
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
                if ($doc['document'] && gettype($doc['document']) != 'string') {
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

        if($request->query('type') === 'submit') {
            $registrationIdentification = array(
                'Product',
                'Procedure Type',
                'Country',
                'RMS',
                'Procedure Number',
                'Local Tradename',
                'Application Stage',
                // 'Product Type'
            );
            $amendmentsDetails = array(
                'Amendment Title',
                'Description of the event',
                'Reason for variation',
                'Remarks'
            );
            $EventsStatus = array(
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
                $amendments->product,
                $amendments->procedure_type,
                "",
                $amendments->rms,
                $amendments->procedure_num,
                $amendments->local_tradename,
                $amendments->application_stage,
                // $amendments->product_type
            ], NULL, 'A2');

            if(is_array($amendments->country)) {
                foreach ($amendments->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Amendments Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($amendmentsDetails, NULL, 'A1');
            $sheet->fromArray([
                $amendments->amendment_title,
                $amendments->description,
                $amendments->reason,
                $amendments->remarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Events Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($EventsStatus, NULL, 'A1');
            $sheet->fromArray($amendments->statuses, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('C'.$i);
                $sheet->setCellValue('C'.$i, date("d-m-Y", strtotime($datef)));
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $sheet->fromArray($amendments->doc, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('D'.$i);
                $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            // $name = 'Amendment ' . $date . '.xlsx';
            if($request->procedure_type == 'National' || $request->procedure_type == 'Centralized') {
                $name = 'eForm_Amendement_' .$request->product . '_' .$request->country[0] . '_' .$date . '.xlsx';
                $subject = 'eForm_Amendement_' .$request->product . '_' .$request->country[0];
            }else {
                $name = 'eForm_Amendement_' .$request->product . '_' .$request->procedure_type . '_' .$date . '.xlsx';
                $subject = 'eForm_Amendement_' .$request->product . '_' .$request->procedure_type;
            }
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new Amendment($name,  $request->product, $subject));
        }
        
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
