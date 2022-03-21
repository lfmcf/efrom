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
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'amendment_title' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ]
                // [
                //     'statuses.*.status.required' => 'A status is required',
                //     'statuses.*.status_date.required' => 'A status date is required',
                // ]
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
        $amendments->amendment_title = $request->amendment_title;
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
                $amendments->product['value'],
                $amendments->procedure_type['value'],
                "",
                $amendments->rms ? $amendments->rms['value'] : '',
                $amendments->procedure_num,
                $amendments->local_tradename,
                $amendments->application_stage ? $amendments->application_stage['value']: '',
                // $amendments->product_type
            ], NULL, 'A2');

            if(array_key_exists('value', $amendments->country)) {
                $sheet->setCellValue('C2', $amendments->country['value']);
            }else {
                foreach ($amendments->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
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
                $amendments->reason ? $amendments->reason['value'] : '',
                $amendments->remarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Events Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($EventsStatus, NULL, 'A1');

            $st = 2;
            foreach($amendments->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['country']) ? $stt['country']['value'] : '');
                $sheet->setCellValue('B' . $st, $stt['status']['value']);
                $sheet->setCellValue('C' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('D' . $st, $stt['ectd']);
                $sheet->setCellValue('E' . $st, $stt['control']);
                $sheet->setCellValue('F' . $st, $stt['cdds']);
                $sheet->setCellValue('G' . $st, $stt['remarks']);
                $sheet->setCellValue('H' . $st, date("d-m-Y", strtotime($stt['implimentation_date'])));
                $sheet->setCellValue('I' . $st, date("d-m-Y", strtotime($stt['deadline_for_answer'])));
                $sheet->setCellValue('J' . $st, is_array($stt['changes_approved']) ? $stt['changes_approved']['value'] : '');
                $st++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');

            $dc = 2;
            foreach($amendments->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['dremarks']);
                $sheet->setCellValue('F' . $dc, $docu['document']);
                $dc++;
            }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            // $name = 'Amendment ' . $date . '.xlsx';
            if($request->procedure_type['value'] == 'National' || $request->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_Amendement_' .$request->product['value'] . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Amendement_' .$request->product['value'] . '_' .$request->country['value'];
            }else {
                $name = 'eForm_Amendement_' .$request->product['value'] . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Amendement_' .$request->product['value'] . '_' .$request->procedure_type['value'];
            }
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new Amendment($name,  $request->product['value'], $subject));

            return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');
        }
        
        return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
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
    public function edit($id)
    {
        $amendments = Amendments::findOrFail($id);
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('Amendment/Edit', [
            'countries' => $countries,
            'amendment' => $amendments
        ]);
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
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'amendment_title' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ]
                // [
                //     'statuses.*.status.required' => 'A status is required',
                //     'statuses.*.status_date.required' => 'A status date is required',
                // ]
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

        $amendments = Amendments::findOrFail($request->id);
        $amendments->product = $request->product;
        $amendments->procedure_type = $request->procedure_type;
        $amendments->country = $request->country;
        $amendments->rms = $request->rms;
        $amendments->application_stage = $request->application_stage;
        $amendments->procedure_num = $request->procedure_num;
        $amendments->local_tradename = $request->local_tradename;
        $amendments->amendment_title = $request->amendment_title;
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
                $amendments->product['value'],
                $amendments->procedure_type['value'],
                "",
                $amendments->rms ? $amendments->rms['value'] : '',
                $amendments->procedure_num,
                $amendments->local_tradename,
                $amendments->application_stage ? $amendments->application_stage['value']: '',
                // $amendments->product_type
            ], NULL, 'A2');

            if(array_key_exists('value', $amendments->country)) {
                $sheet->setCellValue('C2', $amendments->country['value']);
            }else {
                foreach ($amendments->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
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
                $amendments->reason ? $amendments->reason['value'] : '',
                $amendments->remarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Events Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($EventsStatus, NULL, 'A1');

            $st = 2;
            foreach($amendments->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['country']) ? $stt['country']['value'] : '');
                $sheet->setCellValue('B' . $st, $stt['status']['value']);
                $sheet->setCellValue('C' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('D' . $st, $stt['ectd']);
                $sheet->setCellValue('E' . $st, $stt['control']);
                $sheet->setCellValue('F' . $st, $stt['cdds']);
                $sheet->setCellValue('G' . $st, $stt['remarks']);
                $sheet->setCellValue('H' . $st, date("d-m-Y", strtotime($stt['implimentation_date'])));
                $sheet->setCellValue('I' . $st, date("d-m-Y", strtotime($stt['deadline_for_answer'])));
                $sheet->setCellValue('J' . $st, is_array($stt['changes_approved']) ? $stt['changes_approved']['value'] : '');
                $st++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');

            $dc = 2;
            foreach($amendments->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['dremarks']);
                $sheet->setCellValue('F' . $dc, $docu['document']);
                $dc++;
            }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            // $name = 'Amendment ' . $date . '.xlsx';
            if($request->procedure_type['value'] == 'National' || $request->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_Amendement_' .$request->product['value'] . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Amendement_' .$request->product['value'] . '_' .$request->country['value'];
            }else {
                $name = 'eForm_Amendement_' .$request->product['value'] . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Amendement_' .$request->product['value'] . '_' .$request->procedure_type['value'];
            }
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new Amendment($name,  $request->product['value'], $subject));

            return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');
        }
        
        return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
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
