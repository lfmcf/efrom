<?php

namespace App\Http\Controllers;

use App\Mail\Clinical as MailClinical;
use App\Models\Clinical;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Countries;
use App\Models\substanceActive;
use App\Models\packagingItemType;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;

class ClinicalController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request) 
    {
        
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'procedure_type' => 'required',
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
        
        $clinical = new Clinical();
        $clinical->procedure_type = $request->procedure_type;
        $clinical->country = $request->country;
        $clinical->rms = $request->rms;
        $clinical->procedure_number = $request->procedure_number;
        $clinical->application_stage = $request->application_stage;
        $clinical->registration_title = $request->registration_title;
        $clinical->product_name = $request->product_name;
        $clinical->protocol_number = $request->protocol_number;
        $clinical->study_sponsor = $request->study_sponsor;
        $clinical->full_study_title = $request->full_study_title;
        $clinical->clinical_phase = $request->clinical_phase;
        $clinical->protocol_type = $request->protocol_type;
        $clinical->paediatric_indication = $request->paediatric_indication;
        $clinical->remarks = $request->remarks;
        $clinical->authorized_pharmaceutical_form = $request->authorized_pharmaceutical_form;
        $clinical->administrable_pharmaceutical_form = $request->administrable_pharmaceutical_form;
        $clinical->route_of_admin = $request->route_of_admin;
        $clinical->atc = $request->atc;
        $clinical->orphan_designation = $request->orphan_designation;
        $clinical->orphan_indication = $request->orphan_indication;
        $clinical->under_intensive_monitoring = $request->under_intensive_monitoring;
        $clinical->key_dates = $request->key_dates;
        $clinical->alternate_number_type = $request->alternate_number_type;
        $clinical->alternate_number = $request->alternate_number;
        $clinical->remarks = $request->remarks;
        $clinical->local_agent_company = $request->local_agent_company;
        $clinical->formulations = $request->formulations;
        $clinical->packagings = $request->packagings;
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
                'Applcation Stage',
            );
            $basicInfo = array(
                'Registration Title',
                'Product name',
                'Protocol Number',
                'Study Sponsor',
                'Full Study Title',
                'Clinical Phase',
                'Protocol Type',
                'Peadiatric indication',
                'Remarks',
            );
            $dosageForm = array(
                'Authorized Pharmaceutical Form',
                'dministrable pharmaceutical form',
                'Route Of Admin',
                'ATC'
            );
            $OrphanDrug = array(
                'Orphan Designation Status',
                'Orphan Indication Type',
            );
            $UnderIntensiveMonitoring = array(
                'Under Intensive Monitoring'
            );
            $keyDates = array(
                'Key Date Type',
                'Date',
                'Remarks',
                'Alternate Number Type',
                'Alternate Number',
                'Remarks',
            );
            $localAgent = array(
                'Local Agent Company',
            );
            $formulations = array(
                'Ingredient',
                'Strength Type',
                'Numerator Lower Val',
                'Numerator Upper Val',
                'Numerator Unit',
                'Function'
            );
            $packagings = array(
                'Packaging Type',
                'Packaging Name',
                'Description',
                'Launched',
                'First Launch Date',
                'Packaging Discontinued',
                'Discontinuation Date',
                'Remarks',
                'Package Shelf-life Type',
                'Shelf Life',
                'Shelf-life Unit',
                'Package Storage Condition',
                'Remarks'
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
                'Country',
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
                $clinical->registration_title,
                $clinical->product_name,
                $clinical->protocol_number,
                $clinical->study_sponsor,
                $clinical->full_study_title,
                $clinical->clinical_phase,
                $clinical->protocol_type,
                $clinical->paediatric_indication,
                $clinical->remarks,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Dosage Form');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($dosageForm, NULL, 'A1');
            $sheet->setCellValue('A2', $clinical->authorized_pharmaceutical_form);
            $sheet->setCellValue('B2', $clinical->administrable_pharmaceutical_form);
            $c= 2;
            foreach($clinical->route_of_admin as  $roa) {
                $sheet->setCellValue('C' . $c, $roa);
                $c+=1;
            }
            $e= 2;
            foreach($clinical->atc as  $at) {
                $sheet->setCellValue('D' . $e, $at);
                $e+=1;
            }
            // $sheet->fromArray([
            //     $clinical->authorized_pharmaceutical_form,
            //     $clinical->administrable_pharmaceutical_form,
            //     $clinical->route_of_admin,
            //     $clinical->atc
            // ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Orphan Drug');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($OrphanDrug, NULL, 'A1');
            $sheet->fromArray([
                $clinical->orphan_designation,
                $clinical->orphan_indication,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(4);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Under Intensive');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($UnderIntensiveMonitoring, NULL, 'A1');
            $sheet->fromArray([
                $clinical->under_intensive_monitoring,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(5);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Key Dates');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($keyDates, NULL, 'A1');
            // $sheet->fromArray($rc->key_dates, NULL, 'A2');
            $n = 2;
            foreach($clinical->key_dates as  $kd) {
                $sheet->setCellValue('A' . $n, $kd['date_type']);
                $sheet->setCellValue('B' . $n, date("d-m-Y",strtotime($kd['date'])));
                $sheet->setCellValue('C' . $n, $kd['remarks']);
                $n+1;
            }
            $sheet->setCellValue('D2', $clinical->alternate_number_type);
            $sheet->setCellValue('E2', $clinical->alternate_number);
            $sheet->setCellValue('F2', $clinical->remarks);

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(6);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Local Agent');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($localAgent, NULL, 'A1');
            $sheet->fromArray([$clinical->local_agent_company], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(7);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Formulations');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($formulations, NULL, 'A1');
            $sheet->fromArray($clinical->formulations, NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(8);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Packagings');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($packagings, NULL, 'A1');
            $c = 2;
            foreach ($clinical->packagings as $package) {
                $sheet->setCellValue('A' . $c, $package['packaging_type']);
                $sheet->setCellValue('B' . $c, $package['packaging_name']);
                $sheet->setCellValue('C' . $c, $package['description']);
                $sheet->setCellValue('D' . $c, $package['launched']);
                $sheet->setCellValue('E' . $c, date("d-m-Y",strtotime($package['first_lunch_date'])));
                $sheet->setCellValue('F' . $c, $package['packaging_discontinued']);
                $sheet->setCellValue('G' . $c, date("d-m-Y",strtotime($package['discontinuation_date'])));
                $sheet->setCellValue('H' . $c, $package['remarks']);
                if(isset($package['packagelif'])) {
                    foreach ($package['packagelif'] as $i => $pl) {
                        $sheet->setCellValue('I' . $c, $pl['package_shelf_life_type']);
                        $sheet->setCellValue('J' . $c, $pl['shelf_life']);
                        $sheet->setCellValue('K' . $c, $pl['shelf_life_unit']);
                        $sheet->setCellValue('M' . $c, $pl['remarks']);
                        if (isset($pl['package_storage_condition'])) {
                            foreach ($pl['package_storage_condition'] as $psc) {
                                $sheet->setCellValue('L' . $c, $psc);
                                $c += 1;
                            }
                        }
                    }
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(9);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Indications');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($indications, NULL, 'A1');
            $sheet->fromArray([
                $clinical->indication,
                $clinical->paediatric_use
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(10);
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
            $spreadsheet->setActiveSheetIndex(11);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($status, NULL, 'A1');
            $sheet->fromArray($clinical->statuses, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('C'.$i);
                $sheet->setCellValue('C'.$i, date("d-m-Y", strtotime($datef)));
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(12);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $sheet->fromArray($clinical->doc, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('D'.$i);
                $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            }

            $writer = new Xlsx($spreadsheet);
            
            // $date = date('d-m-y');
            // $name = 'Clinical ' . $date . '.xlsx';
            // $writer->save($name);
            // Mail::to(getenv('MAIL_TO'))->send(new MailClinical($name));

            $date = date('d-m-y');
            if($request->procedure_type == 'National' || $request->procedure_type == 'Centralized') {
                $name = 'eForm_NewClinical_' .$request->product_name . '_' .$request->country[0] . '_' .$date . '.xlsx';
                $subject = 'eForm_NewClinical_' .$request->product_name . '_' .$request->country[0];
            }else {
                $name = 'eForm_NewClinical_' .$request->product_name . '_' .$request->procedure_type . '_' .$date . '.xlsx';
                $subject = 'eForm_NewClinical_' .$request->product_name . '_' .$request->procedure_type;
            }
            
            $writer->save($name);
            Mail::to(getenv('MAIL_TO'))->send(new MailClinical($name, $request->product_name, $subject));

            return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');
        }

        return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
    }

    public function create()
    {
        $compnies = Company::orderBy('name')->get();
        $countries = Countries::orderBy('country_name')->get('country_name');
        $substanceActive = substanceActive::all();
        $packagingItemTypes = packagingItemType::all();
        return Inertia::render('Clinical/Create', [
            'companies' => $compnies,
            'substanceActive' => $substanceActive,
            'countries' => $countries,
            'packagingItemTypes' => $packagingItemTypes,
        ]);
    }

    public function edit($id) 
    {
        
    }
}
