<?php

namespace App\Http\Controllers;

use App\Mail\Clinical as MailClinical;
use App\Models\Clinical;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Countries;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;

class ClinicalController extends Controller
{
    public function index()
    {
        $compnies = Company::orderBy('name')->get();
        $countries = Countries::orderBy('country_name')->get('country_name');
        return Inertia::render('Clinical/Clinical', [
            'companies' => $compnies,
            'countries' => $countries
        ]);
    }

    public function store(Request $request) 
    {
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'procedure_type' => 'required',
                    'product_type' => 'required',
                    'application_stage' => 'required',
                    'product_name' => 'required',
                    'authorized_pharmaceutical_form' => 'required',
                    'route_of_admin' => 'required',
                    'atc' => 'required',
                    'indication' => 'required',
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
        
        $clinical = new Clinical();
        $clinical->procedure_type = $request->procedure_type;
        $clinical->country = $request->country;
        $clinical->rms = $request->rms;
        $clinical->procedure_number = $request->procedure_number;
        $clinical->product_type = $request->product_type;
        $clinical->application_stage = $request->application_stage;
        $clinical->product_name = $request->product_name;
        $clinical->registration_title = $request->registration_title;
        $clinical->protocol_number = $request->protocol_number;
        $clinical->study_sponsor = $request->study_sponsor;
        $clinical->full_study_title = $request->full_study_title;
        $clinical->remarks = $request->remarks;
        $clinical->protocol_type = $request->protocol_type;
        $clinical->clinical_phase = $request->clinical_phase;
        $clinical->authorized_pharmaceutical_form = $request->authorized_pharmaceutical_form;
        $clinical->route_of_admin = $request->route_of_admin;
        $clinical->atc = $request->atc;
        $clinical->indication = $request->indication;
        $clinical->paediatric_use = $request->paediatric_use;
        $clinical->manufacturing = $request->manufacturing;
        $clinical->statuses = $request->statuses;
        $clinical->doc = $docs;
        $clinical->created_by = $request->created_by;
        $clinical->type = $request->query('type');
        $clinical->save();

        if($request->query('type') === 'submit') {
            $generalInfo = array(
                'Procedure Type',
                'Country',
                'RMS',
                'Procedure Number',
                'Product Type',
                'Applcation Stage'
            );
            $basicInfo = array(
                'Product name',
                'Registration Title',
                'Protocol Number',
                'Study Sponsor',
                'Full Study Title',
                'Remarks',
                'Protocol Type',
                'Clinical Phase'
            );
            $dosageForm = array(
                'Authorized Pharmaceutical Form',
                'Route Of Admin',
                'ATC'
            );
            $indications = array(
                'Indications',
                'Paediatric use'
            );
            $manufacturing = array(
                'Manufacturer',
                'Operation Type'
            );
            $status = array(
                'Status',
                'Status Date',
                'eCTD Sequence',
                'Change Control Ref',
                'Internal Submission Reference',
                'Remarks',
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
            $sheet->setTitle('General information');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($generalInfo, NULL, 'A1');

            $sheet->fromArray([
                $clinical->procedure_type,
                "",
                $clinical->rms,
                $clinical->procedure_number,
                $clinical->product_type,
                $clinical->application_stage,
            ], NULL, 'A2');

            if(is_array($clinical->country)) {
                foreach ($clinical->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('C' . $cnt, $country);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Basic information');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($basicInfo, NULL, 'A1');

            $sheet->fromArray([
                $clinical->product_name,
                $clinical->registration_title,
                $clinical->protocol_number,
                $clinical->study_sponsor,
                $clinical->full_study_title,
                $clinical->remarks,
                $clinical->protocol_type,
                $clinical->clinical_phase
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Dosage Form');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($dosageForm, NULL, 'A1');
            $sheet->fromArray([
                $clinical->authorized_pharmaceutical_form,
                $clinical->route_of_admin,
                $clinical->atc
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Indications');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($indications, NULL, 'A1');
            $sheet->fromArray([
                $clinical->indication,
                $clinical->paediatric_use
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(4);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Manufacturing');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($manufacturing, NULL, 'A1');
            
            $b = 2;
            foreach ($clinical->manufacturing as $mnf) {
                $sheet->setCellValue('A' . $b, $mnf['manufacturer']);
                foreach ($mnf['operation_type'] as $opt) {
                    $sheet->setCellValue('B' . $b, $opt);
                    $b++;
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(5);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($status, NULL, 'A1');
            $sheet->fromArray($clinical->statuses, NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(6);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $sheet->fromArray($clinical->doc, NULL, 'A2');

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            $name = 'Clinical ' . $date . '.xlsx';
            $writer->save($name);
            Mail::to(getenv('MAIL_TO'))->send(new MailClinical($name));
        }
    }
}
