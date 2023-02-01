<?php

namespace App\Http\Controllers;

use App\Mail\HqVariation;
use App\Mail\NoHqVariation;
use App\Models\Variation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;


class VariationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();
        return Inertia::render('Variation/Create', [
            'countries' => $countries,
            'products' => $products
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
    public function storehq(Request $request)
    {
        //dd($request->statuses);
        if ($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'identification.*.product' => 'required',
                    'identification.*.procedure_type' => 'required',
                    'identification.*.country' => 'required',
                    'variation.*.category' => 'required',
                    'variation.*.variation_type' => 'required',
                    'variation.*.variation_title' => 'required',
                    'variation.*.submission_type' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ]
                // [
                //     'variation.*.category.required' => 'A category is required',
                //     'variation.*.submission_type.required' => 'A submission type is required',
                //     'statuses.*.status.required' => 'A status is required',
                //     'statuses.*.status_date.required' => 'A status date is required',
                // ]
            );
        }

        $docs = $request->doc;

        if (!empty($docs)) {
            $arr = array_map(function ($doc) {
                if ($doc['document'] && gettype($doc['document']) != 'string') {
                    $uploadedFile = $doc['document'];
                    $filename = time() . $uploadedFile->getClientOriginalName();
                    $path = Storage::putFileAs(
                        'public',
                        $uploadedFile,
                        $filename
                    );
                    $doc['document'] = asset('storage/'.$filename);
                }
                return $doc;
            }, $docs);
            $docs = $arr;
        }

        $var = new Variation;

        $var->identification = $request->identification;
        $var->variation = $request->variation;
        $var->statuses = $request->statuses;
        $var->doc = $docs;
        $var->identification = $request->identification;
        $var->isHq = $request->isHq;
        $var->created_by = $request->created_by;
        $var->type = $request->query('type');
        $var->save();

        if ($request->query('type') === 'submit') {
            $registrationIdentification = array(
                'Product',
                'Procedure Type',
                'Country',
                'RMS',
                'Procedure Number',
                'Local Tradename',
                'Submission Type',
            );
            $variationDetail = array(
                'Product',
                'Country',
                'Variation Title',
                'Variation Category',
                'Variation Type',
                'Reason for variation',
                'Submission Type',
                'Applcation N°',
                'Submission/Procedure N°',
                'Dossier Submission Format'
            );
            $eventStatus = array(
                'Product',
                'Country',
                'Status',
                'Status Date',
                'eCTD sequence',
                'Change Control or pre-assessment',
                'CCDS/Core PIL ref n°',
                'Remarks',
                'Planned Local implementation Date',
                'HA Implimentation Deadline',
                'Actual Local Implementation'
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
            $c = 2;
            foreach($var->identification as $iden) {
                $sheet->setCellValue('A' . $c, $iden['product']['value']);
                $sheet->setCellValue('B' . $c, $iden['procedure_type']['value']);
                $sheet->setCellValue('C' . $c, $iden['rms'] ? $iden['rms']['value'] : '');
                $sheet->setCellValue('D' . $c, $iden['application_stage'] ? $iden['application_stage']['value'] : '');
                $sheet->setCellValue('E' . $c, $iden['procedure_num']);
                $sheet->setCellValue('F' . $c, $iden['local_tradename']);
                // $sheet->setCellValue('G' . $c, $iden['product_type'] ? $iden['product_type']['value'] : '');
                // foreach($iden['country'] as $country) {
                //     $sheet->setCellValue('C' . $c, $country['value']);
                //     $c++;
                // }
                if(array_key_exists('value', $iden['country'])) {
                    $sheet->setCellValue('C' . $c, $iden['country']['value']);
                }else {
                    foreach ($iden['country'] as $cnt => $country) {        
                        $sheet->setCellValue('C' . $c, $country['value']);
                       
                    }
                }
                $c++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Variation Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($variationDetail, NULL, 'A1');
            // $sheet->fromArray($var->variation, NULL, 'A2');
            $d = 2;
            foreach($var->variation as $vari) {
                $sheet->setCellValue('A' . $d, $vari['product'] ? $vari['product']['value'] : '');
                $sheet->setCellValue('B' . $d, $vari['country'] ? $vari['country']['value'] : '');
                $sheet->setCellValue('C' . $d, $vari['variation_title']);
                $sheet->setCellValue('D' . $d, $vari['category']['value']);
                $sheet->setCellValue('E' . $d, $vari['variation_type']['value']);
                $sheet->setCellValue('F' . $d, $vari['variation_reason'] ? $vari['variation_reason']['value']: '');
                $sheet->setCellValue('G' . $d, $vari['submission_type'] ? $vari['submission_type']['value']: '');
                $sheet->setCellValue('H' . $d, $vari['application_number']);
                $sheet->setCellValue('I' . $d, $vari['submission_number']);
                $sheet->setCellValue('J' . $d, $vari['submission_format'] ? $vari['variation_reason']['value']: '');
                $d++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Event Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            // $sheet->fromArray($var->statuses, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('B'.$i);
            //     $sheet->setCellValue('B'.$i, date("d-m-Y", strtotime($datef)));
            // }
            $s = 2;
            foreach($var->statuses as $st) {
                $sheet->setCellValue('A' . $s, $st['product'] ? $st['product']['value'] : '');
                $sheet->setCellValue('B' . $s, $st['country'] ? $st['country']['value'] : '');
                $sheet->setCellValue('C' . $s, $st['status'] ? $st['status']['value'] : '');
                $sheet->setCellValue('D' . $s, date("d-m-Y", strtotime($st['status_date'])));
                $sheet->setCellValue('E' . $s, $st['ectd']);
                $sheet->setCellValue('F' . $s, $st['control']);
                $sheet->setCellValue('G' . $s, $st['cdds']);
                $sheet->setCellValue('H' . $s, $st['remarks']);
                $sheet->setCellValue('I' . $s, date("d-m-Y", strtotime($st['local_implementation'])));
                $sheet->setCellValue('J' . $s, date("d-m-Y", strtotime($st['implimentation_deadline'])));
                $sheet->setCellValue('K' . $s, date("d-m-Y", strtotime($st['actual_implementation'])));
                $s++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            // $sheet->fromArray($var->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            // }
            $dc = 2;
            foreach($var->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['dremarks']);
                $sheet->setCellValue('F' . $dc, $docu['document']);
                $dc++;
            }

            $writer = new Xlsx($spreadsheet);

            // $nom = explode("-", $request->product_name['value']);
            // $productName = $nom[0];
            
            $date = date('d-m-y');
            if($request->procedure_type == 'National' || $request->procedure_type == 'Centralized') {
                $name = 'eForm_Variation_' .$request->product . '_' .$request->country[0] . '_' .$date . '.xlsx';
                $subject = 'eForm_Variation_' .$request->product . '_' .$request->country[0];
            }else {
                $name = 'eForm_Variation_' .$request->product . '_' .$request->procedure_type . '_' .$date . '.xlsx';
                $subject = 'eForm_Variation_' .$request->product . '_' .$request->procedure_type;
            }
            $writer->save($name);
            Mail::to(getenv('MAIL_TO'))->send(new HqVariation($name, $request->product, $subject));

            return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');
        }

        return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
    }

    public function store(Request $request)
    {
        
        if ($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'variation_title' => 'required',
                    'category' => 'required',
                    'variation_type' => 'required',
                    'submission_type' => 'required',
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

        if (!empty($docs)) {
            $arr = array_map(function ($doc) {
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

        $var = new Variation;

        $var->product = $request->product;
        $var->procedure_type = $request->procedure_type;
        $var->country = $request->country;
        $var->rms = $request->rms;
        $var->application_stage = $request->application_stage;
        $var->procedure_num = $request->procedure_num;
        $var->local_tradename = $request->local_tradename;
        // $var->product_type = $request->product_type;

        $var->variation_title = $request->variation_title;
        $var->category = $request->category;
        $var->variation_type = $request->variation_type;
        $var->submission_type = $request->submission_type;
        $var->application_number = $request->application_number;
        $var->submission_number = $request->submission_number;
        $var->variation_reason = $request->variation_reason;
        $var->submission_format = $request->submission_format;

        $var->statuses = $request->statuses;
        $var->doc = $docs;
        $var->isHq = $request->isHq;
        $var->created_by = $request->created_by;
        $var->type = $request->query('type');
        
        $var->save();

        if ($request->query('type') === 'submit') {
            $registrationIdentification = array(
                'Product',
                'Procedure Type',
                'Country',
                'Procedure Number',
                'Local Tradename',
                'Submission Type',
            );
            $variationDetail = array(
                'Variation Title',
                'Variation Category',
                'Variation Type',
                'Reason for variation',
                'Submission Type',
                'Applcation N°',
                'Submission/Procedure N°',
                'Dossier Submission Format',
            );
            $eventStatus = array(
                'Country',
                'Status',
                'Status Date',
                'eCTD sequence',
                'Change Control',
                'CCDS/Core PIL ref n°',
                'Remarks',
                'Planned Local implementation Date',
                'HA Implimentation Deadline',
                'Actual Local Implementation'
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
                $var->product['value'],
                $var->procedure_type['value'],
                "",
                is_array($var->rms) ? $var->rms['value'] : '',
                $var->procedure_num,
                $var->local_tradename,
                is_array($var->application_stage) ? $var->application_stage['value'] : '',
                // is_array($var->product_type) ? $var->product_type['value'] : '',
            ], NULL, 'A2');

            if(array_key_exists('value', $var->country)) {
                $sheet->setCellValue('C2', $var->country['value']);
            }else {
                foreach ($var->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
                }
            }
            

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Variation Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($variationDetail, NULL, 'A1');

            $sheet->fromArray([
                $var->variation_title,
                $var->category['value'],
                $var->variation_type['value'],
                is_array($var->variation_reason) ? $var->variation_reason['value'] : '',
                is_array($var->submission_type) ? $var->submission_type['value'] : '',
                $var->application_number,
                $var->submission_number,
                is_array($var->submission_format) ? $var->submission_format['value'] : '',
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            $st = 2;
            foreach($var->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['status']) ? $stt['status']['value'] : '');
                $sheet->setCellValue('B' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('C' . $st, $stt['ectd']);
                $sheet->setCellValue('D' . $st, $stt['control']);
                $sheet->setCellValue('E' . $st, $stt['cdds']);
                $sheet->setCellValue('F' . $st, $stt['remarks']);
                $sheet->setCellValue('G' . $st, date("d-m-Y", strtotime($stt['local_implementation'])));
                $sheet->setCellValue('H' . $st, date("d-m-Y", strtotime($stt['implimentation_deadline'])));
                $sheet->setCellValue('I' . $st, date("d-m-Y", strtotime($stt['actual_implementation'])));
                $st++;
            }
            // $sheet->fromArray($var->statuses, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('C'.$i);
            //     $sheet->setCellValue('C'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $dc = 2;
            foreach($var->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['dremarks']);
                $sheet->setCellValue('F' . $dc, $docu['document']);
                $dc++;
            }
            // $sheet->fromArray($var->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $writer = new Xlsx($spreadsheet);

            $nom = explode("-", $request->product['value']);
            $productName = $nom[0];
            
            $date = date('d-m-y');
            // $name = 'Variation ' . $date . '.xlsx';
            if($request->procedure_type == 'National' || $request->procedure_type == 'Centralized') {
                $name = 'eForm_Variation_' .$productName . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Variation_' .$productName . '_' .$request->country['value'];
            }else {
                $name = 'eForm_Variation_' .$productName . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Variation_' .$productName . '_' .$request->procedure_type['value'];
            }
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new NoHqVariation($name, $productName, $subject));

            return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');

        }

        return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $variation = Variation::findOrFail($id);
        return Inertia::render('Variation/Show', [
            'variation' => $variation
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $variation = Variation::findOrFail($id);
        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();

        return Inertia::render('Variation/Edit', [
            'countries' => $countries,
            'variation' => $variation,
            'products' => $products
        ]);


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Variation $variation)
    {
        if ($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'variation_title' => 'required',
                    'category' => 'required',
                    'variation_type' => 'required',
                    'submission_type' => 'required',
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

        if (!empty($docs)) {
            $arr = array_map(function ($doc) {
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

        $var = Variation::findOrFail($request->id);

        $var->product = $request->product;
        $var->procedure_type = $request->procedure_type;
        $var->country = $request->country;
        $var->rms = $request->rms;
        $var->application_stage = $request->application_stage;
        $var->procedure_num = $request->procedure_num;
        $var->local_tradename = $request->local_tradename;
        // $var->product_type = $request->product_type;

        $var->variation_title = $request->variation_title;
        $var->category = $request->category;
        $var->variation_type = $request->variation_type;
        $var->submission_type = $request->submission_type;
        $var->application_number = $request->application_number;
        $var->submission_number = $request->submission_number;
        $var->variation_reason = $request->variation_reason;
        $var->submission_format = $request->submission_format;

        $var->statuses = $request->statuses;
        $var->doc = $docs;
        $var->isHq = $request->isHq;
        $var->created_by = $request->created_by;
        $var->type = $request->query('type');
        
        $var->save();

        if ($request->query('type') === 'submit') {
            $registrationIdentification = array(
                'Product',
                'Procedure Type',
                'Country',
                'Procedure Number',
                'Local Tradename',
                'Submission Type',
            );
            $variationDetail = array(
                'Variation Title',
                'Variation Category',
                'Variation Type',
                'Reason for variation',
                'Submission Type',
                'Applcation N°',
                'Submission/Procedure N°',
                'Dossier Submission Format',
            );
            $eventStatus = array(
                'Country',
                'Status',
                'Status Date',
                'eCTD sequence',
                'Change Control',
                'CCDS/Core PIL ref n°',
                'Remarks',
                'Planned Local implementation Date',
                'HA Implimentation Deadline',
                'Actual Local Implementation'
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
                $var->product['value'],
                $var->procedure_type['value'],
                "",
                is_array($var->rms) ? $var->rms['value'] : '',
                $var->procedure_num,
                $var->local_tradename,
                is_array($var->application_stage) ? $var->application_stage['value'] : '',
                // is_array($var->product_type) ? $var->product_type['value'] : '',
            ], NULL, 'A2');

            if(array_key_exists('value', $var->country)) {
                $sheet->setCellValue('C2', $var->country['value']);
            }else {
                foreach ($var->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
                }
            }
            

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Variation Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($variationDetail, NULL, 'A1');

            $sheet->fromArray([
                $var->variation_title,
                $var->category['value'],
                $var->variation_type['value'],
                is_array($var->variation_reason) ? $var->variation_reason['value'] : '',
                is_array($var->submission_type) ? $var->submission_type['value'] : '',
                $var->application_number,
                $var->submission_number,
                is_array($var->submission_format) ? $var->submission_format['value'] : '',
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            $st = 2;
            foreach($var->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['status']) ? $stt['status']['value'] : '');
                $sheet->setCellValue('B' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('C' . $st, $stt['ectd']);
                $sheet->setCellValue('D' . $st, $stt['control']);
                $sheet->setCellValue('E' . $st, $stt['cdds']);
                $sheet->setCellValue('F' . $st, $stt['remarks']);
                $sheet->setCellValue('G' . $st, date("d-m-Y", strtotime($stt['local_implementation'])));
                $sheet->setCellValue('H' . $st, date("d-m-Y", strtotime($stt['implimentation_deadline'])));
                $sheet->setCellValue('I' . $st, date("d-m-Y", strtotime($stt['actual_implementation'])));
                $st++;
            }
            // $sheet->fromArray($var->statuses, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('C'.$i);
            //     $sheet->setCellValue('C'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $dc = 2;
            foreach($var->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['dremarks']);
                $sheet->setCellValue('F' . $dc, $docu['document']);
                $dc++;
            }

            // $sheet->fromArray($var->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $writer = new Xlsx($spreadsheet);

            $nom = explode("-", $request->product['value']);
            $productName = $nom[0];
            
            $date = date('d-m-y');
            // $name = 'Variation ' . $date . '.xlsx';
            if($request->procedure_type == 'National' || $request->procedure_type == 'Centralized') {
                $name = 'eForm_Variation_' .$productName . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Variation_' .$productName . '_' .$request->country['value'];
            }else {
                $name = 'eForm_Variation_' .$productName . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_Variation_' .$productName . '_' .$request->procedure_type['value'];
            }
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new NoHqVariation($name, $productName, $subject));

            return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');

        }

        return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
    }

    public function updatehq(Request $request, Variation $variation) 
    {
        if ($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'identification.*.product' => 'required',
                    'identification.*.procedure_type' => 'required',
                    'identification.*.country' => 'required',
                    'variation.*.category' => 'required',
                    'variation.*.variation_type' => 'required',
                    'variation.*.variation_title' => 'required',
                    'variation.*.submission_type' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ]
                // [
                //     'variation.*.category.required' => 'A category is required',
                //     'variation.*.submission_type.required' => 'A submission type is required',
                //     'statuses.*.status.required' => 'A status is required',
                //     'statuses.*.status_date.required' => 'A status date is required',
                // ]
            );
        }

        $docs = $request->doc;

        if (!empty($docs)) {
            $arr = array_map(function ($doc) {
                if ($doc['document'] && gettype($doc['document']) != 'string') {
                    $uploadedFile = $doc['document'];
                    $filename = time() . $uploadedFile->getClientOriginalName();
                    $path = Storage::putFileAs(
                        'public',
                        $uploadedFile,
                        $filename
                    );
                    $doc['document'] = asset('storage/'.$filename);
                }
                return $doc;
            }, $docs);
            $docs = $arr;
        }

        $var = Variation::findOrFail($request->id);

        $var->identification = $request->identification;
        $var->variation = $request->variation;
        $var->statuses = $request->statuses;
        $var->doc = $docs;
        $var->identification = $request->identification;
        $var->isHq = $request->isHq;
        $var->created_by = $request->created_by;
        $var->type = $request->query('type');
        $var->save();

        if ($request->query('type') === 'submit') {
            $registrationIdentification = array(
                'Product',
                'Procedure Type',
                'Country',
                'RMS',
                'Procedure Number',
                'Local Tradename',
                'Submission Type',
            );
            $variationDetail = array(
                'Product',
                'Country',
                'Variation Title',
                'Variation Category',
                'Variation Type',
                'Reason for variation',
                'Submission Type',
                'Applcation N°',
                'Submission/Procedure N°',
                'Dossier Submission Format'
            );
            $eventStatus = array(
                'Product',
                'Country',
                'Status',
                'Status Date',
                'eCTD sequence',
                'Change Control or pre-assessment',
                'CCDS/Core PIL ref n°',
                'Remarks',
                'Planned Local implementation Date',
                'HA Implimentation Deadline',
                'Actual Local Implementation'
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
            $c = 2;
            foreach($var->identification as $iden) {
                $sheet->setCellValue('A' . $c, $iden['product']['value']);
                $sheet->setCellValue('B' . $c, $iden['procedure_type']['value']);
                $sheet->setCellValue('C' . $c, $iden['rms'] ? $iden['rms']['value'] : '');
                $sheet->setCellValue('D' . $c, $iden['application_stage'] ? $iden['application_stage']['value'] : '');
                $sheet->setCellValue('E' . $c, $iden['procedure_num']);
                $sheet->setCellValue('F' . $c, $iden['local_tradename']);
                // $sheet->setCellValue('G' . $c, $iden['product_type'] ? $iden['product_type']['value'] : '');
                // foreach($iden['country'] as $country) {
                //     $sheet->setCellValue('C' . $c, $country['value']);
                //     $c++;
                // }
                if(array_key_exists('value', $iden['country'])) {
                    $sheet->setCellValue('C' . $c, $iden['country']['value']);
                }else {
                    foreach ($iden['country'] as $cnt => $country) {        
                        $sheet->setCellValue('C' . $c, $country['value']);
                       
                    }
                }
                $c++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Variation Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($variationDetail, NULL, 'A1');
            // $sheet->fromArray($var->variation, NULL, 'A2');
            $d = 2;
            foreach($var->variation as $vari) {
                $sheet->setCellValue('A' . $d, $vari['product'] ? $vari['product']['value'] : '');
                $sheet->setCellValue('B' . $d, $vari['country'] ? $vari['country']['value'] : '');
                $sheet->setCellValue('C' . $d, $vari['variation_title']);
                $sheet->setCellValue('D' . $d, $vari['category']['value']);
                $sheet->setCellValue('E' . $d, $vari['variation_type']['value']);
                $sheet->setCellValue('F' . $d, $vari['variation_reason'] ? $vari['variation_reason']['value']: '');
                $sheet->setCellValue('G' . $d, $vari['submission_type'] ? $vari['submission_type']['value']: '');
                $sheet->setCellValue('H' . $d, $vari['application_number']);
                $sheet->setCellValue('I' . $d, $vari['submission_number']);
                $sheet->setCellValue('J' . $d, $vari['submission_format'] ? $vari['variation_reason']['value']: '');
                $d++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Event Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            // $sheet->fromArray($var->statuses, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('B'.$i);
            //     $sheet->setCellValue('B'.$i, date("d-m-Y", strtotime($datef)));
            // }
            $s = 2;
            foreach($var->statuses as $st) {
                $sheet->setCellValue('A' . $s, $st['product'] ? $st['product']['value'] : '');
                $sheet->setCellValue('B' . $s, $st['country'] ? $st['country']['value'] : '');
                $sheet->setCellValue('C' . $s, $st['status'] ? $st['status']['value'] : '');
                $sheet->setCellValue('D' . $s, date("d-m-Y", strtotime($st['status_date'])));
                $sheet->setCellValue('E' . $s, $st['ectd']);
                $sheet->setCellValue('F' . $s, $st['control']);
                $sheet->setCellValue('G' . $s, $st['cdds']);
                $sheet->setCellValue('H' . $s, $st['remarks']);
                $sheet->setCellValue('I' . $s, date("d-m-Y", strtotime($st['local_implementation'])));
                $sheet->setCellValue('J' . $s, date("d-m-Y", strtotime($st['implimentation_deadline'])));
                $sheet->setCellValue('K' . $s, date("d-m-Y", strtotime($st['actual_implementation'])));
                $s++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            // $sheet->fromArray($var->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            // }
            $dc = 2;
            foreach($var->doc as $docu) {
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
            if($request->procedure_type == 'National' || $request->procedure_type == 'Centralized') {
                $name = 'eForm_Variation_' .$request->product . '_' .$request->country[0] . '_' .$date . '.xlsx';
                $subject = 'eForm_Variation_' .$request->product . '_' .$request->country[0];
            }else {
                $name = 'eForm_Variation_' .$request->product . '_' .$request->procedure_type . '_' .$date . '.xlsx';
                $subject = 'eForm_Variation_' .$request->product . '_' .$request->procedure_type;
            }
            $writer->save($name);
            Mail::to(getenv('MAIL_TO'))->send(new HqVariation($name, $request->product, $subject));

            return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');
        }

        return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Variation $variation)
    {
        //
    }
}
