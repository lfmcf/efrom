<?php

namespace App\Http\Controllers;

use App\Mail\Transfer as MailTransfer;
use App\Models\Transfer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;

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
            $maTransferDetail = array(
                'Event Description',
                'Reason for the event'
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
                $transfer->product,
                $transfer->procedure_type,
                "",
                $transfer->rms,
                $transfer->procedure_num,
                $transfer->local_tradename,
                $transfer->application_stage,
                $transfer->product_type
            ], NULL, 'A2');

            if(is_array($transfer->country)) {
                foreach ($transfer->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('MA Transfer Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($maTransferDetail, NULL, 'A1');
            $sheet->fromArray([
                $transfer->description,
                $transfer->reason
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Events Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            $sheet->fromArray($transfer->statuses, NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $sheet->fromArray($transfer->doc, NULL, 'A2');

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            $name = 'Transfer ' . $date . '.xlsx';
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new MailTransfer($name));
        }
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
