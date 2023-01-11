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
use App\Models\Company;

class TransferController extends Controller
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
        $compnies = Company::orderBy('name')->get();
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('Transfer/Create', [
            'countries' => $countries,
            'companies' => $compnies
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
                    'description' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
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

        $transfer = new Transfer();

        $transfer->product = $request->product;
        $transfer->procedure_type = $request->procedure_type;
        $transfer->country = $request->country;
        $transfer->rms = $request->rms;
        $transfer->application_stage = $request->application_stage;
        $transfer->procedure_num = $request->procedure_num;
        $transfer->local_tradename = $request->local_tradename;
        // $transfer->product_type = $request->product_type;
        $transfer->description = $request->description;
        $transfer->reason = $request->reason;
        $transfer->previous_mah = $request->previous_mah;
        $transfer->new_mah = $request->new_mah;
        $transfer->remarks = $request->remarks;
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
                'Submission Type',
                // 'Product Type'
            );
            $maTransferDetail = array(
                'Transfer Description',
                'Reason for transfer',
                'Previous MAH',
                'New MAH',
                'Remarks',
            );
            $eventStatus = array(
                'Country',
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
                $transfer->product['value'],
                $transfer->procedure_type['value'],
                "",
                $transfer->rms ? $transfer->rms['value'] : '',
                $transfer->procedure_num,
                $transfer->local_tradename,
                $transfer->application_stage ? $transfer->application_stage['value'] : '',
                // $transfer->product_type ? $transfer->product_type['value'] : ''
            ], NULL, 'A2');

            if(array_key_exists('value', $transfer->country)) {
                $sheet->setCellValue('C2', $transfer->country['value']);
            }else {
                foreach ($transfer->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('MA Transfer Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($maTransferDetail, NULL, 'A1');
            $sheet->fromArray([
                $transfer->description,
                $transfer->reason ? $transfer->reason['value'] : '',
                $transfer->previous_mah ? $transfer->previous_mah['value'] : '',
                $transfer->new_mah ? $transfer->new_mah['value'] : '',
                $transfer->remarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Events Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            // $sheet->fromArray($transfer->statuses, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('C'.$i);
            //     $sheet->setCellValue('C'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $st = 2;
            foreach($transfer->statuses as $stt) {
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
            foreach($transfer->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['dremarks']);
                $sheet->setCellValue('F' . $dc, $docu['document']);
                $dc++;
            }
            // $sheet->fromArray($transfer->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            if($request->procedure_type['value'] == 'National' || $request->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_MATransfer_' .$request->product['value'] . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_MATransfer_' .$request->product['value'] . '_' .$request->country['value'];
            }else {
                $name = 'eForm_MATransfer_' .$request->product['value'] . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_MATransfer_' .$request->product['value'] . '_' .$request->procedure_type['value'];
            }
            // $name = 'Transfer ' . $date . '.xlsx';
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new MailTransfer($name, $request->product['value'], $subject));

            return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');
        }

        return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transfer = Transfer::findOrFail($id);
       
        return Inertia::render('Transfer/Show', [
            'transfer' => $transfer,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $transfer = Transfer::findOrFail($id);
        $compnies = Company::orderBy('name')->get();
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('Transfer/Edit', [
            'countries' => $countries,
            'companies' => $compnies,
            'transfer' => $transfer,
        ]);
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
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'description' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
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

        $transfer = Transfer::findOrFail($request->id);

        $transfer->product = $request->product;
        $transfer->procedure_type = $request->procedure_type;
        $transfer->country = $request->country;
        $transfer->rms = $request->rms;
        $transfer->application_stage = $request->application_stage;
        $transfer->procedure_num = $request->procedure_num;
        $transfer->local_tradename = $request->local_tradename;
        // $transfer->product_type = $request->product_type;
        $transfer->description = $request->description;
        $transfer->reason = $request->reason;
        $transfer->previous_mah = $request->previous_mah;
        $transfer->new_mah = $request->new_mah;
        $transfer->remarks = $request->remarks;
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
                'Submission Type',
                // 'Product Type'
            );
            $maTransferDetail = array(
                'Transfer Description',
                'Reason for transfer',
                'Previous MAH',
                'New MAH',
                'Remarks',
            );
            $eventStatus = array(
                'Country',
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
                $transfer->product['value'],
                $transfer->procedure_type['value'],
                "",
                $transfer->rms ? $transfer->rms['value'] : '',
                $transfer->procedure_num,
                $transfer->local_tradename,
                $transfer->application_stage ? $transfer->application_stage['value'] : '',
                // $transfer->product_type ? $transfer->product_type['value'] : ''
            ], NULL, 'A2');

            if(array_key_exists('value', $transfer->country)) {
                $sheet->setCellValue('C2', $transfer->country['value']);
            }else {
                foreach ($transfer->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('MA Transfer Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($maTransferDetail, NULL, 'A1');
            $sheet->fromArray([
                $transfer->description,
                $transfer->reason ? $transfer->reason['value'] : '',
                $transfer->previous_mah ? $transfer->previous_mah['value'] : '',
                $transfer->new_mah ? $transfer->new_mah['value'] : '',
                $transfer->remarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Events Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            // $sheet->fromArray($transfer->statuses, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('C'.$i);
            //     $sheet->setCellValue('C'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $st = 2;
            foreach($transfer->statuses as $stt) {
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
            foreach($transfer->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['dremarks']);
                $sheet->setCellValue('F' . $dc, $docu['document']);
                $dc++;
            }
            // $sheet->fromArray($transfer->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            if($request->procedure_type['value'] == 'National' || $request->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_MATransfer_' .$request->product['value'] . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_MATransfer_' .$request->product['value'] . '_' .$request->country['value'];
            }else {
                $name = 'eForm_MATransfer_' .$request->product['value'] . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_MATransfer_' .$request->product['value'] . '_' .$request->procedure_type['value'];
            }
            // $name = 'Transfer ' . $date . '.xlsx';
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new MailTransfer($name, $request->product['value'], $subject));

            return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');
        }

        return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
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
