<?php

namespace App\Http\Controllers;

use App\Mail\Renewal;
use App\Models\Renouvellement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use App\Models\Product;
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
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();
        return Inertia::render('Renewal/Create', [
            'countries' => $countries,
            'products' => $products
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
       
        if($request->query('type') == 'submit') {
            $validator = $request->validate(
                [
                    // 'category' => 'required',
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'renewal_title' => 'required',
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

        $ren = new Renouvellement;

        $ren->product = $request->product;
        $ren->procedure_type = $request->procedure_type;
        $ren->country = $request->country;
        $ren->rms = $request->rms;
        $ren->application_stage = $request->application_stage;
        $ren->procedure_num = $request->procedure_num;
        $ren->local_tradename = $request->local_tradename;
        //$ren->product_type = $request->product_type;
        $ren->renewal_title = $request->renewal_title;
        // $ren->category = $request->category;
        // $ren->description = $request->description;
        $ren->application_num = $request->application_num;
        $ren->submission_format = $request->submission_format;
        $ren->validation_reason = $request->validation_reason;
        $ren->control = $request->control;
        $ren->remarks = $request->remarks;
        $ren->statuses = $request->statuses;
        $ren->doc = $docs;
        $ren->created_by = $request->created_by;
        $ren->type = $request->query('type');
        $ren->save();

        if ($request->query('type') == 'submit') {
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
            $renewalDetail = array(
                'Renewal Title',
                // 'Variation Category',
                // 'Event Description',
                'Application N°',
                'Dossier Submission Format',
                'Reason For Variation',
                'Change Control or pre-assessment',
                'Remarks'
            );
            $renewalStatus = array(
                'Country',
                'Status',
                'Status Date',
                'eCTD sequence',
                // 'Change Control or pre-assessment',
                // 'CCDS/Core PIL ref n°',
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
                'CCDS/Core PIL ref n°',
                'Remarks',
                'Document'
            );

            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Registration identification');
            $sheet->getStyle('1:1')->getFont()->setBold(true);

            $sheet->fromArray($registrationIdentification, NULL, 'A1');
            $sheet->fromArray([
                $ren->product['value'],
                $ren->procedure_type['value'],
                "",
                $ren->rms ? $ren->rms['value'] : '',
                $ren->procedure_num,
                $ren->local_tradename,
                $ren->application_stage ? $ren->application_stage['value'] : '',
                // $ren->product_type ? $ren->product_type['value'] : ''
            ], NULL, 'A2');

            if(array_key_exists('value', $ren->country)) {
                $sheet->setCellValue('C2', $ren->country['value']);
            }else {
                foreach ($ren->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
                }
            }
            

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Renewal Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($renewalDetail, NULL, 'A1');
            $sheet->fromArray([
                $ren->renewal_title,
                // $ren->category,
                // $ren->description,
                $ren->application_num,
                $ren->submission_format ? $ren->submission_format['value'] : '',
                $ren->validation_reason ? $ren->validation_reason['value'] : '',
                $ren->control,
                $ren->remarks,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($renewalStatus, NULL, 'A1');
            

            $st = 2;
            foreach($ren->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['country']) ? $stt['country']['value'] : '');
                $sheet->setCellValue('B' . $st, $stt['status']['value']);
                $sheet->setCellValue('C' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('D' . $st, $stt['ectd']);
                // $sheet->setCellValue('E' . $st, $stt['control']);
                // $sheet->setCellValue('F' . $st, $stt['cdds']);
                $sheet->setCellValue('E' . $st, $stt['remarks']);
                $sheet->setCellValue('F' . $st, date("d-m-Y", strtotime($stt['implimentation_deadline'])));
                $sheet->setCellValue('G' . $st, is_array($stt['next_renewals']) ? $stt['next_renewals']['value'] : '');
                $sheet->setCellValue('H' . $st, date("d-m-Y", strtotime($stt['next_renewals_deadline'])));
                $sheet->setCellValue('I' . $st, date("d-m-Y", strtotime($stt['next_renewals_date'])));
                $st++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');

            $dc = 2;
            foreach($ren->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['cdds']);
                $sheet->setCellValue('F' . $dc, $docu['dremarks']);
                $sheet->setCellValue('G' . $dc, $docu['document']);
                $dc++;
            }

            $writer = new Xlsx($spreadsheet);

            $nom = explode("-", $request->product['value']);
            $productName = $nom[0];
            
            $date = date('d-m-y');
            if($request->procedure_type['value'] == 'National' || $request->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_Renewal_' .$productName . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Renewal_' .$productName . '_' .$request->country['value'];
            }else {
                $name = 'eForm_Renewal_' .$productName . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Renewal_' .$productName . '_' .$request->procedure_type['value'];
            }
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new Renewal($name, $productName, $subject));

            return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
        }

        return redirect('dashboard')->with('message', 'Your form has been successfully saved');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Renouvellement  $renouvellement
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $renewal = Renouvellement::findOrFail($id);
        return Inertia::render('Renewal/Show', [
            'renewal' => $renewal
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Renouvellement  $renouvellement
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $renewal = Renouvellement::findOrFail($id);
        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();
        return Inertia::render('Renewal/Edit', [
            'countries' => $countries,
            'renewal' => $renewal,
            'products' => $products
        ]);

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
        if($request->query('type') == 'submit') {
            $validator = $request->validate(
                [
                    // 'category' => 'required',
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'renewal_title' => 'required',
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

        $ren = Renouvellement::findOrFail($request->id);

        $ren->product = $request->product;
        $ren->procedure_type = $request->procedure_type;
        $ren->country = $request->country;
        $ren->rms = $request->rms;
        $ren->application_stage = $request->application_stage;
        $ren->procedure_num = $request->procedure_num;
        $ren->local_tradename = $request->local_tradename;
        //$ren->product_type = $request->product_type;
        $ren->renewal_title = $request->renewal_title;
        // $ren->category = $request->category;
        // $ren->description = $request->description;
        $ren->application_num = $request->application_num;
        $ren->submission_format = $request->submission_format;
        $ren->validation_reason = $request->validation_reason;
        $ren->control = $request->control;
        $ren->remarks = $request->remarks;
        $ren->statuses = $request->statuses;
        $ren->doc = $docs;
        $ren->created_by = $request->created_by;
        $ren->type = $request->query('type');
        $ren->save();

        if ($request->query('type') == 'submit') {
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
            $renewalDetail = array(
                'Renewal Title',
                // 'Variation Category',
                // 'Event Description',
                'Application N°',
                'Dossier Submission Format',
                'Reason For Variation',
                'Change Control or pre-assessment',
                'Remarks'
            );
            $renewalStatus = array(
                'Country',
                'Status',
                'Status Date',
                'eCTD sequence',
                // 'Change Control or pre-assessment',
                // 'CCDS/Core PIL ref n°',
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
                'CCDS/Core PIL ref n°',
                'Remarks',
                'Document'
            );

            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Registration identification');
            $sheet->getStyle('1:1')->getFont()->setBold(true);

            $sheet->fromArray($registrationIdentification, NULL, 'A1');
            $sheet->fromArray([
                $ren->product['value'],
                $ren->procedure_type['value'],
                "",
                $ren->rms ? $ren->rms['value'] : '',
                $ren->procedure_num,
                $ren->local_tradename,
                $ren->application_stage ? $ren->application_stage['value'] : '',
                //$ren->product_type ? $ren->product_type['value'] : ''
            ], NULL, 'A2');

            if(array_key_exists('value', $ren->country)) {
                $sheet->setCellValue('C2', $ren->country['value']);
            }else {
                foreach ($ren->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
                }
            }
            

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Renewal Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($renewalDetail, NULL, 'A1');
            $sheet->fromArray([
                $ren->renewal_title,
                // $ren->category,
                // $ren->description,
                $ren->application_num,
                $ren->submission_format ? $ren->submission_format['value'] : '',
                $ren->validation_reason ? $ren->validation_reason['value'] : '',
                $ren->control,
                $ren->remarks,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($renewalStatus, NULL, 'A1');
            

            $st = 2;
            foreach($ren->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['country']) ? $stt['country']['value'] : '');
                $sheet->setCellValue('B' . $st, is_array($stt['status']['value']));
                $sheet->setCellValue('C' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('D' . $st, $stt['ectd']);
                // $sheet->setCellValue('E' . $st, $stt['control']);
                // $sheet->setCellValue('F' . $st, $stt['cdds']);
                $sheet->setCellValue('E' . $st, $stt['remarks']);
                $sheet->setCellValue('F' . $st, date("d-m-Y", strtotime($stt['implimentation_deadline'])));
                $sheet->setCellValue('G' . $st, is_array($stt['next_renewals']) ? $stt['next_renewals']['value'] : '');
                $sheet->setCellValue('H' . $st, date("d-m-Y", strtotime($stt['next_renewals_deadline'])));
                $sheet->setCellValue('I' . $st, date("d-m-Y", strtotime($stt['next_renewals_date'])));
                $st++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');

            $dc = 2;
            foreach($ren->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['cdds']);
                $sheet->setCellValue('F' . $dc, $docu['dremarks']);
                $sheet->setCellValue('G' . $dc, $docu['document']);
                $dc++;
            }

            $writer = new Xlsx($spreadsheet);

            $nom = explode("-", $request->product['value']);
            $productName = $nom[0];
            
            $date = date('d-m-y');
            if($request->procedure_type['value'] == 'National' || $request->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_Renewal_' .$productName . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Renewal_' .$productName . '_' .$request->country['value'];
            }else {
                $name = 'eForm_Renewal_' .$productName . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Renewal_' .$productName . '_' .$request->procedure_type['value'];
            }
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new Renewal($name, $productName, $subject));

            return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
        }

        return redirect('dashboard')->with('message', 'Your form has been successfully saved');
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
