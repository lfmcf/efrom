<?php

namespace App\Http\Controllers;

use App\Mail\Baseline as MailBaseline;
use App\Models\Baseline;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;
use Throwable;


class BaselineController extends Controller
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
        $products = Product::all();
        return Inertia::render('Baseline/Create', [
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
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'baseline_title' => 'required',
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

        $baseline = new Baseline();
        $baseline->product = $request->product;
        $baseline->procedure_type = $request->procedure_type;
        $baseline->country = $request->country;
        $baseline->rms = $request->rms;
        $baseline->application_stage = $request->application_stage;
        $baseline->procedure_num = $request->procedure_num;
        $baseline->local_tradename = $request->local_tradename;
        // $baseline->product_type = $request->product_type;
        $baseline->baseline_title = $request->baseline_title;
        $baseline->description = $request->description;
        $baseline->application_num = $request->application_num;
        $baseline->reason = $request->reason;
        $baseline->control = $request->control;
        $baseline->remarks = $request->remarks;
        $baseline->statuses = $request->statuses;
        $baseline->doc = $docs;
        $baseline->created_by = $request->created_by;
        $baseline->type = $request->query('type');
        
        if($request->query('type') === 'submit') {
            $res = $this->generetExcel($baseline);
            
            if($res === true){
                $baseline->save();
                return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
            }else {
                return redirect()->back()->withErrors([
                    'create' => 'ups, there was an error please try later'
                ]);
            }
            
        }else {
            $baseline->save();
            return redirect('dashboard')->with('message', 'Your form has been successfully saved');
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Baseline  $baseline
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $baseline = Baseline::findOrFail($id);
        return Inertia::render('Baseline/Show', [
            'baseline' => $baseline
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Baseline  $baseline
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $baseline = Baseline::findOrFail($id);
        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();
        return Inertia::render('Baseline/Edit', [
            'countries' => $countries,
            'baseline' => $baseline,
            'products' => $products
        ]);
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
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'baseline_title' => 'required',
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

        $baseline = Baseline::findOrFail($request->id);
        $baseline->product = $request->product;
        $baseline->procedure_type = $request->procedure_type;
        $baseline->country = $request->country;
        $baseline->rms = $request->rms;
        $baseline->application_stage = $request->application_stage;
        $baseline->procedure_num = $request->procedure_num;
        $baseline->local_tradename = $request->local_tradename;
        // $baseline->product_type = $request->product_type;
        $baseline->baseline_title = $request->baseline_title;
        $baseline->description = $request->description;
        $baseline->application_num = $request->application_num;
        $baseline->reason = $request->reason;
        $baseline->control = $request->control;
        $baseline->remarks = $request->remarks;
        $baseline->statuses = $request->statuses;
        $baseline->doc = $docs;
        $baseline->created_by = $request->created_by;
        $baseline->type = $request->query('type');

        if($request->query('type') === 'submit') {
            $res = $this->generetExcel($baseline);
            if($res === true){
                $baseline->save();
                return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
            }else {
                return redirect()->back()->withErrors([
                    'create' => 'ups, there was an error please try later'
                ]);
            }
            
        }else {
            $baseline->save();
            return redirect('dashboard')->with('message', 'Your form has been successfully saved');
        }
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

    public function generetExcel($baseline)
    {
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
        $baselineDetails = array(
            'Baseline Title',
            'Description of the event',
            'Application N°',
            'Reason for variation',
            'Change Control or pre-assessment',
            'Remarks'
        );
        $eventStatus = array(
            'Country',
            'Status',
            'Status Date',
            'eCTD sequence',
            // 'Change Control or pre-assessment',
            // 'CCDS/Core PIL ref n°',
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
            'CCDS/Core PIL ref n°',
            'Remarks',
            'Document'
        );
        try {
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('Registration identification');
            $sheet->getStyle('1:1')->getFont()->setBold(true);

            $sheet->fromArray($registrationIdentification, NULL, 'A1');

            $sheet->fromArray([
                $baseline->product['value'],
                $baseline->procedure_type['value'],
                "",
                $baseline->rms ? $baseline->rms['value'] : '',
                $baseline->procedure_num,
                $baseline->local_tradename,
                $baseline->application_stage ? $baseline->application_stage['value'] : '',
                // $baseline->product_type ? $baseline->product_type['value'] : ''
            ], NULL, 'A2');

            if (array_key_exists('value', $baseline->country)) {
                $sheet->setCellValue('C2', $baseline->country['value']);
            } else {
                foreach ($baseline->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Baseline Details');
            $sheet->fromArray($baselineDetails, NULL, 'A1');
            $sheet->fromArray([
                $baseline->baseline_title,
                $baseline->description,
                $baseline->application_num,
                $baseline->reason ? $baseline->reason['value'] : '',
                $baseline->control,
                $baseline->remarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Events Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');

            $st = 2;
            foreach ($baseline->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['country']) ? $stt['country']['value'] : '');
                $sheet->setCellValue('B' . $st, $stt['status']['value']);
                $sheet->setCellValue('C' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('D' . $st, $stt['ectd']);
                // $sheet->setCellValue('E' . $st, $stt['control']);
                // $sheet->setCellValue('F' . $st, $stt['cdds']);
                $sheet->setCellValue('E' . $st, $stt['remarks']);
                $sheet->setCellValue('F' . $st, date("d-m-Y", strtotime($stt['implimentation_date'])));
                $sheet->setCellValue('G' . $st, date("d-m-Y", strtotime($stt['deadline_for_answer'])));
                $sheet->setCellValue('H' . $st, is_array($stt['changes_approved']) ? $stt['changes_approved']['value'] : '');
                $st++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            
            $dc = 2;
            foreach ($baseline->doc as $docu) {
                
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value'] : '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['cdds']);
                $sheet->setCellValue('F' . $dc, $docu['dremarks']);
                $sheet->setCellValue('G' . $dc, $docu['document']);
                $dc++;
            }

            $writer = new Xlsx($spreadsheet);

            $nom = explode("-", $baseline->product['value']);
            $productName = $nom[0];

            $date = date('d-m-y');
            if ($baseline->procedure_type['value'] == 'National' || $baseline->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_Baseline_' . $productName . '_' . $baseline->country['value'] . '_' . $date . '.xlsx';
                $subject = 'eForm_Baseline_' . $productName . '_' . $baseline->country['value'];
            } else {
                $name = 'eForm_Baseline_' . $productName . '_' . $baseline->procedure_type['value'] . '_' . $date . '.xlsx';
                $subject = 'eForm_Baseline_' . $productName . '_' . $baseline->procedure_type['value'];
            }

            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new MailBaseline($name, $productName, $subject));
            return true;

        } catch (Throwable $e) {
            report($e);
            return $e;
        }
    }
}
