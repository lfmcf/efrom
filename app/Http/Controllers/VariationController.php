<?php

namespace App\Http\Controllers;

use App\Mail\HqVariation;
use App\Mail\NoHqVariation;
use App\Models\Variation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
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
        return Inertia::render('MarketingAuth/Variation', [
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
    public function storehq(Request $request)
    {
        
        if ($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'variation.*.category' => 'required',
                    'variation.*.submission_type' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ],
                [
                    'variation.*.category.required' => 'A category is required',
                    'variation.*.submission_type.required' => 'A submission type is required',
                    'statuses.*.status.required' => 'A status is required',
                    'statuses.*.status_date.required' => 'A status date is required',
                ]
            );
        }

        $docs = $request->doc;

        if (!empty($docs)) {
            $arr = array_map(function ($doc) {
                if ($doc['document']) {
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
                'Application Stage',
                'Product Type'
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
                $sheet->setCellValue('A' . $c, $iden['product']);
                $sheet->setCellValue('B' . $c, $iden['procedure_type']);
                $sheet->setCellValue('D' . $c, $iden['rms']);
                $sheet->setCellValue('E' . $c, $iden['application_stage']);
                $sheet->setCellValue('F' . $c, $iden['procedure_num']);
                $sheet->setCellValue('G' . $c, $iden['local_tradename']);
                $sheet->setCellValue('H' . $c, $iden['product_type']);
                foreach($iden['country'] as $country) {
                    $sheet->setCellValue('C' . $c, $country);
                    $c++;
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Variation Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($variationDetail, NULL, 'A1');
            $sheet->fromArray($var->variation, NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Event Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            $sheet->fromArray($var->statuses, NULL, 'A2');
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
            $sheet->fromArray($var->doc, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('D'.$i);
                $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            $name = 'Variation Hq ' . $date . '.xlsx';
            $writer->save($name);
            Mail::to(getenv('MAIL_TO'))->send(new HqVariation($name));
        }
    }

    public function store(Request $request)
    {
        
        if ($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'category' => 'required',
                    'submission_type' => 'required',
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

        if (!empty($docs)) {
            $arr = array_map(function ($doc) {
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

        $var = new Variation;

        $var->product = $request->product;
        $var->procedure_type = $request->procedure_type;
        $var->country = $request->country;
        $var->rms = $request->rms;
        $var->application_stage = $request->application_stage;
        $var->procedure_num = $request->procedure_num;
        $var->local_tradename = $request->local_tradename;
        $var->product_type = $request->product_type;

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
                'Application Stage',
                'Product Type'
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
                $var->product,
                $var->procedure_type,
                "",
                $var->rms,
                $var->procedure_num,
                $var->local_tradename,
                $var->application_stage,
                $var->product_type
            ], NULL, 'A2');

            if(is_array($var->country)) {
                foreach ($var->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country);
                }
            }
            

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Variation Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($variationDetail, NULL, 'A1');

            $sheet->fromArray([
                $var->variation_title,
                $var->category,
                $var->variation_type,
                $var->variation_reason,
                $var->submission_type,
                $var->application_number,
                $var->submission_number,
                $var->submission_format,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            $sheet->fromArray($var->statuses, NULL, 'A2');
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
            $sheet->fromArray($var->doc, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('D'.$i);
                $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            $name = 'Variation ' . $date . '.xlsx';
            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new NoHqVariation($name));

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function show(Variation $variation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Variation  $variation
     * @return \Illuminate\Http\Response
     */
    public function edit(Variation $variation)
    {
        //
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
        //
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
