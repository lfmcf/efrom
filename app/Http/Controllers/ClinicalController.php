<?php

namespace App\Http\Controllers;

use App\Mail\Clinical as MailClinical;
use App\Models\Clinical;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Countries;
use App\Models\Product;
use App\Models\substanceActive;
use App\Models\packagingItemType;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;
use Throwable;

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
                    'country' => 'required',
                    'application_stage' => 'required',
                    'product_name' => 'required',
                    'authorized_pharmaceutical_form' => 'required',
                    'route_of_admin' => 'required',
                    'atc' => 'required',
                    // 'packagings.*.packaging_name' => 'required',
                    // 'packagings.*.packaging_type' => 'required',
                    'indication' => 'required',
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
                    $doc['document'] = asset('storage/'.$filename);
                }
                return $doc;
            }, $docs);
            $docs = $arr;
        }
        
        $clinical = new Clinical();
        $clinical->procedure_type = $request->procedure_type;
        $clinical->country = $request->country;
        $clinical->rms = $request->rms;
        
        $clinical->application_stage = $request->application_stage;
        // $clinical->registration_title = $request->registration_title;
        $clinical->product_name = $request->product_name;
        $clinical->protocol_number = $request->protocol_number;
        $clinical->study_sponsor = $request->study_sponsor;
        $clinical->full_study_title = $request->full_study_title;
        $clinical->clinical_phase = $request->clinical_phase;
        $clinical->protocol_type = $request->protocol_type;
        $clinical->paediatric_indication = $request->paediatric_indication;
        $clinical->procedure_number = $request->procedure_number;
        $clinical->investigationnal_code = $request->investigationnal_code;
        $clinical->application_number = $request->application_number;
        $clinical->registration_alternate_number = $request->registration_alternate_number;
        $clinical->registration_number = $request->registration_number;
        $clinical->registration_date = $request->registration_date;
        $clinical->change_control_ref = $request->change_control_ref;
        $clinical->medicines_regulatory_authority = $request->medicines_regulatory_authority;
        $clinical->remarks = $request->remarks;
        $clinical->authorized_pharmaceutical_form = $request->authorized_pharmaceutical_form;
        $clinical->administrable_pharmaceutical_form = $request->administrable_pharmaceutical_form;
        $clinical->route_of_admin = $request->route_of_admin;
        $clinical->atc = $request->atc;
        $clinical->orphan_designation = $request->orphan_designation;
        $clinical->orphan_indication = $request->orphan_indication;
        $clinical->under_intensive_monitoring = $request->under_intensive_monitoring;
        $clinical->key_dates = $request->key_dates;
        $clinical->local_agent_company = $request->local_agent_company;
        $clinical->formulations = $request->formulations;
        $clinical->packagings = $request->packagings;
        $clinical->indication = $request->indication;
        // $clinical->paediatric_use = $request->paediatric_use;
        $clinical->manufacturing = $request->manufacturing;
        $clinical->statuses = $request->statuses;
        $clinical->doc = $docs;
        $clinical->created_by = $request->created_by;
        $clinical->type = $request->query('type');

        if($request->query('type') === 'submit') {
            $res = $this->generetExcel($clinical);
            if($res === true){
                $clinical->save();
                return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
            }else {
                return redirect()->back()->withErrors([
                    'create' => 'ups, there was an error please try later'
                ]);
            }
            
        }else {
            $clinical->save();
            return redirect('dashboard')->with('message', 'Your form has been successfully saved');
        }
    }

    public function create()
    {
        $compnies = Company::orderBy('name')->get();
        $countries = Countries::orderBy('country_name')->get('country_name');
        $substanceActive = substanceActive::all();
        $packagingItemTypes = packagingItemType::all();
        $products = Product::all();
        return Inertia::render('Clinical/Create', [
            'companies' => $compnies,
            'substanceActive' => $substanceActive,
            'countries' => $countries,
            'packagingItemTypes' => $packagingItemTypes,
            'products' => $products
        ]);
    }

    public function edit($id) 
    {
        $clinical = Clinical::findOrFail($id);
        $compnies = Company::orderBy('name')->get();
        $countries = Countries::orderBy('country_name')->get('country_name');
        $substanceActive = substanceActive::all();
        $packagingItemTypes = packagingItemType::all();
        $products = Product::all();
        return Inertia::render('Clinical/Edit', [
            'companies' => $compnies,
            'substanceActive' => $substanceActive,
            'countries' => $countries,
            'packagingItemTypes' => $packagingItemTypes,
            'clinical' => $clinical,
            'products' => $products
        ]);
    }

    public function show($id) 
    {
        $clinical = Clinical::findOrFail($id);
        return Inertia::render('Clinical/Show', [
            'clinical' => $clinical,
        ]);
    }

    public function update(Request $request) 
    {
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'procedure_type' => 'required',
                    'country' => 'required',
                    'application_stage' => 'required',
                    'product_name' => 'required',
                    'authorized_pharmaceutical_form' => 'required',
                    'route_of_admin' => 'required',
                    'atc' => 'required',
                    // 'packagings.*.packaging_name' => 'required',
                    // 'packagings.*.packaging_type' => 'required',
                    'indication' => 'required',
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
        
        $clinical = Clinical::findOrFail($request->id);
        $clinical->procedure_type = $request->procedure_type;
        $clinical->country = $request->country;
        $clinical->rms = $request->rms;
        
        $clinical->application_stage = $request->application_stage;
        // $clinical->registration_title = $request->registration_title;
        $clinical->product_name = $request->product_name;
        $clinical->protocol_number = $request->protocol_number;
        $clinical->study_sponsor = $request->study_sponsor;
        $clinical->full_study_title = $request->full_study_title;
        $clinical->clinical_phase = $request->clinical_phase;
        $clinical->protocol_type = $request->protocol_type;
        $clinical->paediatric_indication = $request->paediatric_indication;
        $clinical->procedure_number = $request->procedure_number;
        $clinical->investigationnal_code = $request->investigationnal_code;
        $clinical->application_number = $request->application_number;
        $clinical->registration_alternate_number = $request->registration_alternate_number;
        $clinical->registration_number = $request->registration_number;
        $clinical->registration_date = $request->registration_date;
        $clinical->change_control_ref = $request->change_control_ref;
        $clinical->medicines_regulatory_authority = $request->medicines_regulatory_authority;
        $clinical->remarks = $request->remarks;
        $clinical->authorized_pharmaceutical_form = $request->authorized_pharmaceutical_form;
        $clinical->administrable_pharmaceutical_form = $request->administrable_pharmaceutical_form;
        $clinical->route_of_admin = $request->route_of_admin;
        $clinical->atc = $request->atc;
        $clinical->orphan_designation = $request->orphan_designation;
        $clinical->orphan_indication = $request->orphan_indication;
        $clinical->under_intensive_monitoring = $request->under_intensive_monitoring;
        $clinical->key_dates = $request->key_dates;
        // $clinical->alternate_number_type = $request->alternate_number_type;
        // $clinical->alternate_number = $request->alternate_number;
        $clinical->local_agent_company = $request->local_agent_company;
        $clinical->formulations = $request->formulations;
        $clinical->packagings = $request->packagings;
        $clinical->indication = $request->indication;
        // $clinical->paediatric_use = $request->paediatric_use;
        $clinical->manufacturing = $request->manufacturing;
        $clinical->statuses = $request->statuses;
        $clinical->doc = $docs;
        $clinical->created_by = $request->created_by;
        $clinical->type = $request->query('type');
        
        if($request->query('type') === 'submit') {
            $res = $this->generetExcel($clinical);
            if($res === true){
                $clinical->save();
                return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
            }else {
                return redirect()->back()->withErrors([
                    'create' => 'ups, there was an error please try later'
                ]);
            }
            
        }else {
            $clinical->save();
            return redirect('dashboard')->with('message', 'Your form has been successfully saved');
        }
    }

    public function generetExcel($clinical)
    {
        $generalInfo = array(
            'Procedure Type',
            'Country',
            'RMS',
            'Applcation Stage',
        );
        $basicInfo = array(
            'Product',
            'Protocol Number',
            'Study Sponsor',
            'Full Study Title',
            'Clinical Phase',
            'Protocol Type',
            'Peadiatric indication',
            'Procedure Number',
            'Investigationnal Code',
            'Application Number',
            'Medicines Regulatory Authority',
            'Registration number type',
            'Registration number',
            'Registration Date',
            'Change Control Ref',
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
        );
        $localAgent = array(
            'Local Agent Company',
        );
        $formulations = array(
            'Ingredient',
            'Function',
            'Strength Type',
            'Numerator Lower Val',
            'Numerator Upper Val',
            'Numerator Unit',
            'Denominator Value',
            'Denominator Unit',
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
            //'Paediatric use'
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
            // 'Change Control Ref',
            'Internal Submission Reference',
            'Remarks',
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
            $sheet->setTitle('General information');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($generalInfo, NULL, 'A1');

            $sheet->fromArray([
                $clinical->procedure_type['value'],
                "",
                $clinical->rms ? $clinical->rms['value'] : '',

                $clinical->application_stage['value'],
            ], NULL, 'A2');

            if (array_key_exists('value', $clinical->country)) {
                $sheet->setCellValue('B2', $clinical->country['value']);
            } else {
                foreach ($clinical->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('B' . $cnt, $country['value']);
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Basic information');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($basicInfo, NULL, 'A1');

            $sheet->fromArray([
                // $clinical->registration_title,
                $clinical->product_name['value'],
                $clinical->protocol_number,
                $clinical->study_sponsor ? $clinical->study_sponsor['value'] : '',
                $clinical->full_study_title,
                $clinical->clinical_phase ? $clinical->clinical_phase['value'] : '',
                $clinical->protocol_type ? $clinical->protocol_type['value'] : '',
                $clinical->paediatric_indication ? $clinical->paediatric_indication['value'] : '',
                $clinical->procedure_number,
                $clinical->investigationnal_code,
                $clinical->application_number,
                $clinical->medicines_regulatory_authority ?  $clinical->medicines_regulatory_authority['value'] : '',
                $clinical->registration_alternate_number ? $clinical->registration_alternate_number['value'] : '',
                $clinical->registration_number,
                $clinical->registration_date,
                $clinical->change_control_ref,
                $clinical->remarks,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Dosage Form');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($dosageForm, NULL, 'A1');
            $sheet->setCellValue('A2', $clinical->authorized_pharmaceutical_form['value']);
            $sheet->setCellValue('B2', $clinical->administrable_pharmaceutical_form ? $clinical->administrable_pharmaceutical_form['value'] : '');
            $c = 2;
            foreach ($clinical->route_of_admin as  $roa) {
                $sheet->setCellValue('C' . $c, $roa['value']);
                $c += 1;
            }
            $e = 2;
            foreach ($clinical->atc as  $at) {
                $sheet->setCellValue('D' . $e, $at['value']);
                $e += 1;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Orphan Drug');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($OrphanDrug, NULL, 'A1');
            $sheet->fromArray([
                $clinical->orphan_designation ? $clinical->orphan_designation['value'] : '',
                $clinical->orphan_indication ? $clinical->orphan_indication['value'] : '',
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(4);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Under Intensive');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($UnderIntensiveMonitoring, NULL, 'A1');
            $sheet->fromArray([
                $clinical->under_intensive_monitoring ? $clinical->under_intensive_monitoring['value'] : '',
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(5);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Key Dates');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($keyDates, NULL, 'A1');
            // $sheet->fromArray($rc->key_dates, NULL, 'A2');
            $n = 2;
            foreach ($clinical->key_dates as  $kd) {
                $sheet->setCellValue('A' . $n, $kd['date_type'] ? $kd['date_type']['value'] : '');
                $sheet->setCellValue('B' . $n, date("d-m-Y", strtotime($kd['date'])));
                $sheet->setCellValue('C' . $n, $kd['remarks']);
                $n + 1;
            }
            //$sheet->setCellValue('D2', $clinical->alternate_number_type ? $clinical->alternate_number_type['value'] : '');
            // $sheet->setCellValue('D2', $clinical->alternate_number);
            // $sheet->setCellValue('E2', $clinical->remarks);

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(6);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Local Agent');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($localAgent, NULL, 'A1');
            $sheet->fromArray([$clinical->local_agent_company ? $clinical->local_agent_company['value'] : ''], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(7);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Formulations');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($formulations, NULL, 'A1');
            // $sheet->fromArray($clinical->formulations, NULL, 'A2');
            $f = 2;
            foreach ($clinical->formulations as $fr) {
                foreach ($fr['ingredient'] as $ing) {

                    $sheet->setCellValue('A' . $f, is_array($ing['ingredient']) ? $ing['ingredient']['value'] : '');
                    $sheet->setCellValue('B' . $f, is_array($ing['function']) ? $ing['function']['value'] : '');
                    $sheet->setCellValue('C' . $f, is_array($ing['strength_type']) ? $ing['strength_type']['value'] : '');
                    $sheet->setCellValue('D' . $f, $ing['numerator_lower_val']);
                    $sheet->setCellValue('E' . $f, $ing['numerator_upper_val']);
                    $sheet->setCellValue('F' . $f, is_array($ing['numerator_unit']) ? $ing['numerator_unit']['value'] : '');
                    $sheet->setCellValue('G' . $f, $ing['denominator_value']);
                    $sheet->setCellValue('H' . $f, is_array($ing['denominator_unit']) ? $ing['denominator_unit']['value'] : '');
                    $f += 1;
                }
                $f += 1;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(8);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Packagings');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($packagings, NULL, 'A1');
            $c = 2;
            foreach ($clinical->packagings as $package) {
                $sheet->setCellValue('A' . $c, is_array($package['packaging_type']) ? $package['packaging_type']['value'] : '');
                $sheet->setCellValue('B' . $c, $package['packaging_name']);
                $sheet->setCellValue('C' . $c, $package['description']);
                $sheet->setCellValue('D' . $c, is_array($package['launched']) ? $package['launched']['value'] : '');
                $sheet->setCellValue('E' . $c, date("d-m-Y", strtotime($package['first_lunch_date'])));
                $sheet->setCellValue('F' . $c, is_array($package['packaging_discontinued']) ? $package['packaging_discontinued']['value'] : '');
                $sheet->setCellValue('G' . $c, date("d-m-Y", strtotime($package['discontinuation_date'])));
                $sheet->setCellValue('H' . $c, $package['remarks']);
                if (isset($package['packagelif'])); {
                    foreach ($package['packagelif'] as $i => $pl) {
                        $sheet->setCellValue('I' . $c, is_array($pl['package_shelf_life_type']) ? $pl['package_shelf_life_type']['value'] : '');
                        $sheet->setCellValue('J' . $c, $pl['shelf_life']);
                        $sheet->setCellValue('K' . $c, is_array($pl['shelf_life_unit']) ? $pl['shelf_life_unit']['value'] : '');
                        $sheet->setCellValue('M' . $c, $pl['remarks']);
                        if (isset($pl['package_storage_condition'])) {
                            foreach ($pl['package_storage_condition'] as $psc) {
                                $sheet->setCellValue('L' . $c, $psc['value']);
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
            $in = 2;
            foreach ($clinical->indication as $ind) {
                $sheet->setCellValue('A' . $in, $ind['value']);
                $in++;
            }
            // $sheet->fromArray([
            //     $clinical->indication['value'],
            // ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(10);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Manufacturing');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($manufacturing, NULL, 'A1');

            $b = 2;
            if (isset($clinical->manufacturing)) {
                foreach ($clinical->manufacturing as $mnf) {
                    $sheet->setCellValue('A' . $b, is_array($mnf['manufacturer']) ? $mnf['manufacturer']['value'] : '');
                    if (isset($mnf['operation_type'])) {
                        foreach ($mnf['operation_type'] as $opt) {
                            $sheet->setCellValue('B' . $b, is_array($opt) ? $opt['value'] : '');
                            $b++;
                        }
                    }
                }
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(11);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($status, NULL, 'A1');
            $st = 2;
            foreach ($clinical->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['country']) ? $stt['country']['value'] : '');
                $sheet->setCellValue('B' . $st, is_array($stt['status']) ? $stt['status']['value'] : '');
                $sheet->setCellValue('C' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('D' . $st, $stt['ectd_sequence']);
                // $sheet->setCellValue('E' . $st, $stt['change_control_ref']);
                $sheet->setCellValue('F' . $st, $stt['internal_submission_reference']);
                $sheet->setCellValue('G' . $st, $stt['remarks']);
                $st++;
            }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(12);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');

            $dc = 2;
            foreach ($clinical->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value'] : '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['cdds']);
                $sheet->setCellValue('F' . $dc, $docu['dremarks']);
                $sheet->setCellValue('G' . $dc, $docu['document']);
                $dc++;
            }

            // $sheet->fromArray($clinical->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $writer = new Xlsx($spreadsheet);

            // $date = date('d-m-y');
            // $name = 'Clinical ' . $date . '.xlsx';
            // $writer->save($name);
            // Mail::to(getenv('MAIL_TO'))->send(new MailClinical($name));

            $nom = explode("-", $clinical->product_name['value']);
            $productName = $nom[0];

            $date = date('d-m-y');
            if ($clinical->procedure_type['value'] == 'National' || $clinical->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_NewClinical_' . $productName . '_' . $clinical->country['value'] . '_' . $date . '.xlsx';
                $subject = 'eForm_NewClinical_' . $productName . '_' . $clinical->country['value'];
            } else {
                $name = 'eForm_NewClinical_' . $productName . '_' . $clinical->procedure_type['value'] . '_' . $date . '.xlsx';
                $subject = 'eForm_NewClinical_' . $productName . '_' . $clinical->procedure_type['value'];
            }

            $writer->save($name);
            Mail::to(getenv('MAIL_TO'))->send(new MailClinical($name, $productName, $subject));
            return true;
        } catch (Throwable $e) {

            report($e);
            return $e;
        }
    }
}
