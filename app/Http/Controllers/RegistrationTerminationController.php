<?php

namespace App\Http\Controllers;

use App\Mail\Rt;
use App\Models\RegistrationTermination;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;
use Throwable;

class RegistrationTerminationController extends Controller
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
        return Inertia::render('RegistrationTermination/Create', [
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

        $crt = new RegistrationTermination();
        
        $crt->product = $request->product;
        $crt->procedure_type = $request->procedure_type;
        $crt->country = $request->country;
        $crt->rms = $request->rms;
        $crt->application_stage = $request->application_stage;
        $crt->procedure_num = $request->procedure_num;
        $crt->local_tradename = $request->local_tradename;
        $crt->product_type = $request->product_type;
        $crt->description = $request->description;
        // $crt->rttype = $request->rttype;
        $crt->reason = $request->reason;
        $crt->control = $request->control;
        $crt->remarks = $request->remarks;
        $crt->reason_for_passive = $request->reason_for_passive;
        $crt->passive_date = $request->passive_date;
        $crt->passive_comment = $request->passive_comment;
        $crt->statuses = $request->statuses;
        $crt->doc = $docs;
        $crt->created_by = $request->created_by;
        $crt->type = $request->query('type');

        if($request->query('type') === 'submit') {
            $res = $this->generetExcel($crt);
            if($res === true){
                $crt->save();
                return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
            }else {
                return redirect()->back()->withErrors([
                    'create' => 'ups, there was an error please try later'
                ]);
            }
            
        }else {
            $crt->save();
            return redirect('dashboard')->with('message', 'Your form has been successfully saved');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RegistrationTermination  $registrationTermination
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $rt = RegistrationTermination::findOrFail($id);
        return Inertia::render('RegistrationTermination/Show', [
            'rt' => $rt
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RegistrationTermination  $registrationTermination
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $rt = RegistrationTermination::findOrFail($id);
        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();
        return Inertia::render('RegistrationTermination/Edit', [
            'countries' => $countries,
            'rt' => $rt,
            'products' => $products
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RegistrationTermination  $registrationTermination
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RegistrationTermination $registrationTermination)
    {
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
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

        $crt = RegistrationTermination::findOrFail($request->id);
        $crt->product = $request->product;
        $crt->procedure_type = $request->procedure_type;
        $crt->country = $request->country;
        $crt->rms = $request->rms;
        $crt->application_stage = $request->application_stage;
        $crt->procedure_num = $request->procedure_num;
        $crt->local_tradename = $request->local_tradename;
        $crt->product_type = $request->product_type;
        $crt->description = $request->description;
        // $crt->rttype = $request->rttype;
        $crt->reason = $request->reason;
        $crt->control = $request->control;
        $crt->remarks = $request->remarks;
        $crt->reason_for_passive = $request->reason_for_passive;
        $crt->passive_date = $request->passive_date;
        $crt->passive_comment = $request->passive_comment;
        $crt->statuses = $request->statuses;
        $crt->doc = $docs;
        $crt->created_by = $request->created_by;
        $crt->type = $request->query('type');

        if($request->query('type') === 'submit') {
            $res = $this->generetExcel($crt);
            if($res === true){
                $crt->save();
                return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
            }else {
                return redirect()->back()->withErrors([
                    'create' => 'ups, there was an error please try later'
                ]);
            }
            
        }else {
            $crt->save();
            return redirect('dashboard')->with('message', 'Your form has been successfully saved');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RegistrationTermination  $registrationTermination
     * @return \Illuminate\Http\Response
     */
    public function destroy(RegistrationTermination $registrationTermination)
    {
        //
    }

    public function generetExcel($crt)
    {
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
        $details = array(
            'Description of the event',
            //'Registration Termination Type',
            'Reason of the event',
            'Change Control or pre-assessment',
            'Remarks'
        );
        $passive = array(
            'Reason for Passive',
            'Passive Date',
            'Passive comment',
        );
        $status = array(
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
                $crt->product['value'],
                $crt->procedure_type['value'],
                "",
                $crt->rms ? $crt->rms['value'] : '',
                $crt->procedure_num,
                $crt->local_tradename,
                $crt->application_stage ? $crt->application_stage['value'] : '',
                $crt->product_type ? $crt->product_type['value'] : ''
            ], NULL, 'A2');

            if (array_key_exists('value', $crt->country)) {
                $sheet->setCellValue('C2', $crt->country['value']);
            } else {
                foreach ($crt->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country['value']);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('RegistrationTermination Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($details, NULL, 'A1');
            $sheet->fromArray([
                $crt->description,
                // is_array($crt->type) ? $crt->type['value'] : '',
                $crt->reason ? $crt->reason['value'] : '',
                $crt->control,
                $crt->remarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Passive Details');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($passive, NULL, 'A1');
            $sheet->fromArray([
                $crt->reason_for_passive,
                $crt->passive_date,
                $crt->passive_comment,
            ], NULL, 'A2');


            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Events Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($status, NULL, 'A1');

            $st = 2;
            foreach ($crt->statuses as $stt) {
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
            $spreadsheet->setActiveSheetIndex(4);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');

            $dc = 2;
            foreach ($crt->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value'] : '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['cdds']);
                $sheet->setCellValue('F' . $dc, $docu['dremarks']);
                $sheet->setCellValue('G' . $dc, $docu['document']);
                $dc++;
            }
            // $sheet->fromArray($crt->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $writer = new Xlsx($spreadsheet);

            $date = date('d-m-y');
            $name = 'Registration Termination' . $date . '.xlsx';
            $nom = explode("-", $crt->product['value']);
            $productName = $nom[0];

            $subject = 'eForm_RegistrationTermination_' . $productName . '_' . $crt->procedure_type['value'];

            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new Rt($name, $productName, $subject));
            return true;
        } catch (Throwable $e) {

            report($e);
            return $e;
        }
    }
}