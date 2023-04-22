<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Countries;
use App\Models\Product;
use App\Models\MaCompany;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Throwable;
use App\Mail\MaCompanyR;

class MaCompanyController extends Controller
{
    public function create() {

        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();
        return Inertia::render('Company/Create', [
            'countries' => $countries,
            'products' => $products
        ]);
    }

    public function store(Request $request){
        if ($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'product' => 'required',
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'variation_title' => 'required',
                    //'category' => 'required',
                    'variation_type' => 'required',
                    // 'submission_type' => 'required',
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

        $var = new MaCompany();

        $var->product = $request->product;
        $var->procedure_type = $request->procedure_type;
        $var->country = $request->country;
        $var->rms = $request->rms;
        $var->application_stage = $request->application_stage;
        $var->procedure_num = $request->procedure_num;
        $var->local_tradename = $request->local_tradename;
        $var->variation_title = $request->variation_title;
        $var->variation_type = $request->variation_type;
        $var->application_number = $request->application_number;
        $var->submission_number = $request->submission_number;
        $var->variation_reason = $request->variation_reason;
        $var->submission_format = $request->submission_format;
        $var->control = $request->control;
        $var->statuses = $request->statuses;
        $var->doc = $docs;
        // $var->isHq = $request->isHq;
        $var->created_by = $request->created_by;
        $var->type = $request->query('type');
        
        if ($request->query('type') === 'submit') {

            $res = $this->generetExcel($var);
            
            if($res === true){
                $var->save();
                return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
            }else {
                return redirect()->back()->withErrors([
                    'create' => 'ups, there was an error please try later'
                ]);
            }
            
        }else {
            $var->save();
            return redirect('dashboard')->with('message', 'Your form has been successfully saved');
        }

       
    }

    public function generetExcel($var) {

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
            'Variation Title',
            'Variation Type',
            'Reason for variation',
            'Applcation N°',
            'Submission/Procedure N°',
            'Dossier Submission Format',
            'Change Control or pre-assessment',
        );
        $eventStatus = array(
            'Country',
            'Status',
            'Status Date',
            'eCTD sequence',
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
                $var->product['value'],
                $var->procedure_type['value'],
                "",
                is_array($var->rms) ? $var->rms['value'] : '',
                $var->procedure_num,
                $var->local_tradename,
                is_array($var->application_stage) ? $var->application_stage['value'] : '',
            ], NULL, 'A2');

            if (array_key_exists('value', $var->country)) {
                $sheet->setCellValue('C2', $var->country['value']);
            } else {
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
                $var->variation_type['value'],
                is_array($var->variation_reason) ? $var->variation_reason['value'] : '',
                $var->application_number,
                $var->submission_number,
                is_array($var->submission_format) ? $var->submission_format['value'] : '',
                $var->control,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($eventStatus, NULL, 'A1');
            $st = 2;
            foreach ($var->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['country']) ? $stt['country']['value'] : '');
                $sheet->setCellValue('B' . $st, is_array($stt['status']) ? $stt['status']['value'] : '');
                $sheet->setCellValue('C' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('D' . $st, $stt['ectd']);
                $sheet->setCellValue('E' . $st, $stt['remarks']);
                $sheet->setCellValue('F' . $st, date("d-m-Y", strtotime($stt['local_implementation'])));
                $sheet->setCellValue('G' . $st, date("d-m-Y", strtotime($stt['implimentation_deadline'])));
                $sheet->setCellValue('H' . $st, date("d-m-Y", strtotime($stt['actual_implementation'])));
                $st++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $dc = 2;
            foreach ($var->doc as $docu) {
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

            $nom = explode("-", $var->product['value']);
            $productName = $nom[0];

            $date = date('d-m-y');
            if ($var->procedure_type == 'National' || $var->procedure_type == 'Centralized') {
                $name = 'eForm_MA_Compnay_Registration_' . $productName . '_' . $var->country['value'] . '_' . $date . '.xlsx';
                $subject = 'eForm_MA_Compnay_Registration_' . $productName . '_' . $var->country['value'];
            } else {
                $name = 'eForm_MA_Compnay_Registration_' . $productName . '_' . $var->procedure_type['value'] . '_' . $date . '.xlsx';
                $subject = 'eForm_MA_Compnay_Registration_' . $productName . '_' . $var->procedure_type['value'];
            }

            $writer->save($name);

            Mail::to(getenv('MAIL_TO'))->send(new MaCompanyR($name, $productName, $subject));

            return true;

        } catch (Throwable $e) {

            report($e);
            return $e;
        }

    }
}
