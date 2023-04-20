<?php

namespace App\Http\Controllers;

use App\Mail\RcSubmit;
use App\Models\Rc;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;
use App\Models\substanceActive;
use App\Models\packagingItemType;
use App\Models\Countries;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\Mail;

class RcController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $compnies = Company::orderBy('name')->get();
        $substanceActive = substanceActive::all();
        $packagingItemTypes = packagingItemType::all();
        $countries = Countries::orderBy('country_name')->get('country_name');
        
        return Inertia::render('Clinical/Index', [
            'companies' => $compnies,
            'substanceActive' => $substanceActive,
            'packagingItemTypes' => $packagingItemTypes,
            'countries' => $countries,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $compnies = Company::orderBy('name')->get();
        $substanceActive = substanceActive::all();
        $packagingItemTypes = packagingItemType::all();
        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();
        return Inertia::render('Medicinal/Create', [
            'companies' => $compnies,
            'substanceActive' => $substanceActive,
            'packagingItemTypes' => $packagingItemTypes,
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
                    'country' => 'required',
                    'procedure_type' => 'required',
                    'application_stage' => 'required',
                    'product_name' => 'required',
                    'packagings.*.sellable_unit_determined_by' => 'required',
                    'packagings.*.product_legal_status_of_supply' => 'required',
                    'packagings.*.packaging_name' => 'required',
                    'packagings.*.packaging_type' => 'required',
                    'local_tradename' => 'required',
                    'registration_holder' => 'required',
                    'authorized_pharmaceutical_form' => 'required',
                    'route_of_admin' => 'required',
                    'atc' => 'required',
                    'indication' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ],
                // [
                //     'packagings.*.packaging_name.required' => 'A package name is required',
                    
                //     'packagings.*.description.required' => 'A package description is required',
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
                    // $destinationPath = public_path().'/images' ;
                    // dd($uploadedFile->move($destinationPath,$filename));
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
        
        $rc = new Rc;

        $rc->procedure_type = $request->procedure_type;
        $rc->country = $request->country;
        $rc->rms = $request->rms;
        $rc->procedure_number = $request->procedure_number;
        // $rc->product_type = $request->product_type;
        $rc->application_stage = $request->application_stage;
        // $rc->registration_title = $request->registration_title;
        $rc->product_name = $request->product_name;
        $rc->local_tradename = $request->local_tradename;
        $rc->registration_holder = $request->registration_holder;
        $rc->application_number = $request->application_number;
        $rc->dossier_reference = $request->dossier_reference;
        $rc->pv_contact_email = $request->pv_contact_email;
        $rc->pv_contact_phone = $request->pv_contact_phone;
        $rc->bremarks = $request->bremarks;
        $rc->authorized_pharmaceutical_form = $request->authorized_pharmaceutical_form;
        $rc->administrable_pharmaceutical_form = $request->administrable_pharmaceutical_form;
        $rc->route_of_admin = $request->route_of_admin;
        $rc->atc = $request->atc;
        $rc->orphan_designation_status = $request->orphan_designation_status;
        $rc->orphan_indication_type = $request->orphan_indication_type;
        $rc->under_intensive_monitoring = $request->under_intensive_monitoring;
        $rc->key_dates = $request->key_dates;
        $rc->alternate_number_type = $request->alternate_number_type;
        $rc->alternate_number = $request->alternate_number;
        $rc->remarks = $request->remarks;
        $rc->local_agent_company = $request->local_agent_company;
        $rc->formulations = $request->formulations;
        $rc->packagings = $request->packagings;
        $rc->indication = $request->indication;
        $rc->paediatric_use = $request->paediatric_use;
        $rc->age = $request->age;
        $rc->manufacturing = $request->manufacturing;
        $rc->statuses = $request->statuses;
        $rc->next_renewals = $request->next_renewals;
        $rc->nr_submission_deadline = $request->nr_submission_deadline;
        $rc->nr_date = $request->nr_date;
        $rc->doc = $docs;
        $rc->created_by = $request->created_by;
        $rc->type = $request->query('type');

        $rc->save();

        if ($request->query('type') === 'submit') {
            $generalInfo = array(
                'Procedure Type',
                'Country',
                'RMS',
                'Procedure Number',
                'Submission Type'
            );
            $basicInfo = array(
                'Product',
                'Local Tradename',
                'Registration Holder',
                'Application Number',
                'Dossier Reference Number',
                'PV Contact Email',
                'PV Contact Phone',
                'Remarks',
            );
            $OrphanDrug = array(
                'Orphan Designation Status',
                'Orphan Indication Type',
            );
            $UnderIntensive = array(
                'Under Intensive Monitoring',
            );
            $dosageForm = array(
                'Authorized Pharmaceutical Form',
                'Administrable pharmaceutical form',
                'Route Of Admin',
                'ATC',
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
                'Sellable Unit Determined By',
                'Product Legal Status of Supply',
                'Packaging Type',
                'Packaging Registration number',
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
                'Paediatric Use',
                'Age'
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
            $next_renewals = array(
                'Next Renewals',
                'Next Renewal Submission Deadline',
                'Next Renewal Date',
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
                $rc->procedure_type['value'],
                "",
                $rc->rms ? $rc->rms['value'] : '',
                $rc->procedure_number,
                $rc->application_stage['value'],
            ], NULL, 'A2');
           
            if(array_key_exists('value', $rc->country)) {
                $sheet->setCellValue('B2', $rc->country['value']);
            }else {
                foreach ($rc->country as $cnt => $country) {
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
                $rc->product_name['value'],
                $rc->local_tradename,
                $rc->registration_holder['value'],
                $rc->application_number,
                $rc->dossier_reference,
                $rc->pv_contact_email,
                $rc->pv_contact_phone,
                $rc->bremarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Dosage Form');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($dosageForm, NULL, 'A1');
            $sheet->setCellValue('A2', $rc->authorized_pharmaceutical_form['value']);
            if(is_array($rc->administrable_pharmaceutical_form))
            {
                $sheet->setCellValue('B2', $rc->administrable_pharmaceutical_form['value']);
            }else {
                $sheet->setCellValue('B2', "");
            }
            
            $c= 2;
            foreach($rc->route_of_admin as  $roa) {
                $sheet->setCellValue('C' . $c, $roa['value']);
                $c+=1;
            }
            $e= 2;
            foreach($rc->atc as  $at) {
                $sheet->setCellValue('D' . $e, $at['value']);
                $e+=1;
            }

            
            // $sheet->fromArray([
            //     $rc->authorized_pharmaceutical_form,
            //     $rc->administrable_pharmaceutical_form,
            //     $rc->route_of_admin,
            //     $rc->atc,
            // ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Orphan Drug');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($OrphanDrug, NULL, 'A1');
            $sheet->fromArray([
                is_array($rc->orphan_designation_status) ? $rc->orphan_designation_status['value'] : '',
                is_array($rc->orphan_indication_type) ? $rc->orphan_indication_type['value'] : '',
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(4);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Under Intensive');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($UnderIntensive, NULL, 'A1');
            $sheet->fromArray([
                is_array($rc->under_intensive_monitoring) ? $rc->under_intensive_monitoring['value'] : '',
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(5);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Key Dates');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($keyDates, NULL, 'A1');
            // $sheet->fromArray($rc->key_dates, NULL, 'A2');
            $n = 2;
            if(isset($rc->key_dates)) {
                foreach($rc->key_dates as  $kd) {
                    //is_array($kd['date_type']) ? $sheet->setCellValue('A' . $n, $kd['date_type']['value']) : $sheet->setCellValue('A' . $n, '');
                    $sheet->setCellValue('A' . $n, is_array($kd['date_type']) ? $kd['date_type']['value'] : '');
                    $sheet->setCellValue('B' . $n, date("d-m-Y",strtotime($kd['date'])));
                    $sheet->setCellValue('C' . $n, $kd['remarks']);
                    $n+=1;
                }
            }
            
            $sheet->setCellValue('D2', is_array($rc->alternate_number_type) ? $rc->alternate_number_type['value'] : '');
            $sheet->setCellValue('E2', $rc->alternate_number);
            $sheet->setCellValue('F2', $rc->remarks);

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(6);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Local Agent');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($localAgent, NULL, 'A1');
            $sheet->fromArray([is_array($rc->local_agent_company) ? $rc->local_agent_company['value'] : ''], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(7);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Formulations');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($formulations, NULL, 'A1');
            $f = 2;
           
            foreach($rc->formulations as $fr) {
                foreach($fr['ingredient'] as $ing) {
                    
                    $sheet->setCellValue('A' . $f, is_array($ing['ingredient']) ? $ing['ingredient']['value'] : '');
                    $sheet->setCellValue('B' . $f, is_array($ing['function']) ? $ing['function']['value'] : '');
                    $sheet->setCellValue('C' . $f, is_array($ing['strength_type']) ? $ing['strength_type']['value'] : '');
                    $sheet->setCellValue('D' . $f, $ing['numerator_lower_val']);
                    $sheet->setCellValue('E' . $f, $ing['numerator_upper_val']);
                    $sheet->setCellValue('F' . $f, is_array($ing['numerator_unit']) ? $ing['numerator_unit']['value'] : '');
                    $f += 1;
                }
                $f += 1;
            }
            // $sheet->fromArray($rc->formulations
            // , NULL, 'A2');

            

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(8);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Packagings');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($packagings, NULL, 'A1');
            $c = 2;
            foreach ($rc->packagings as $package) {
                $sheet->setCellValue('A' . $c, is_array($package['sellable_unit_determined_by']) ? $package['sellable_unit_determined_by']['value']: '');
                $sheet->setCellValue('B' . $c, is_array($package['product_legal_status_of_supply']) ? $package['product_legal_status_of_supply']['value'] : '');
                $sheet->setCellValue('C' . $c, is_array($package['packaging_type']) ? $package['packaging_type']['value'] : '');
                $sheet->setCellValue('D' . $c, $package['packaging_registration_number']);
                $sheet->setCellValue('E' . $c, $package['packaging_name']);
                $sheet->setCellValue('F' . $c, $package['description']);
                $sheet->setCellValue('G' . $c, is_array($package['launched']) ? $package['launched']['value'] : '');
                $sheet->setCellValue('H' . $c, date("d-m-Y",strtotime($package['first_lunch_date'])));
                $sheet->setCellValue('I' . $c, is_array($package['packaging_discontinued']) ? $package['packaging_discontinued']['value'] : '');
                $sheet->setCellValue('J' . $c, date("d-m-Y",strtotime($package['discontinuation_date'])));
                $sheet->setCellValue('K' . $c, $package['remarks']);
                if(isset($package['packagelif'])){
                    foreach ($package['packagelif'] as $i => $pl) {
                        $sheet->setCellValue('L' . $c, is_array($pl['package_shelf_life_type']) ? $pl['package_shelf_life_type']['value'] : '');
                        $sheet->setCellValue('M' . $c, $pl['shelf_life']);
                        $sheet->setCellValue('N' . $c, is_array($pl['shelf_life_unit']) ? $pl['shelf_life_unit']['value'] : '');
                        $sheet->setCellValue('P' . $c, $pl['remarks']);
                        if (isset($pl['package_storage_condition'])) {
                            foreach ($pl['package_storage_condition'] as $psc) {
                                $sheet->setCellValue('O' . $c, $psc['value']);
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
            foreach($rc->indication as $ind) {
                $sheet->setCellValue('A' . $in, $ind['value']);
                $in++;
            }
            $sheet->setCellValue('B2', is_array($rc->paediatric_use) ? $rc->paediatric_use['value'] : '');
            $sheet->setCellValue('C2', $rc->age);
            // $sheet->fromArray([
            //     $rc->indication['value'],
            //     is_array($rc->paediatric_use) ? $rc->paediatric_use['value'] : '',
            //     $rc->age,
            // ], NULL, 'A2');

            

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(10);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Manufacturing');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($manufacturing, NULL, 'A1');
            $b = 2;
            if(isset($rc->manufacturing)) {
                foreach ($rc->manufacturing as $mnf) {
                    $sheet->setCellValue('A' . $b, is_array($mnf['manufacturer']) ? $mnf['manufacturer']['value'] : '');
                    if (isset($mnf['operation_type'])){
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
            // $sheet->fromArray($rc->statuses, NULL, 'A2');
            $st = 2;
            foreach($rc->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['country']) ? $stt['country']['value'] : '');
                $sheet->setCellValue('B' . $st, is_array($stt['status']) ? $stt['status']['value'] : '');
                $sheet->setCellValue('C' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('D' . $st, $stt['ectd_sequence']);
                $sheet->setCellValue('E' . $st, $stt['change_control_ref']);
                $sheet->setCellValue('F' . $st, $stt['internal_submission_reference']);
                $sheet->setCellValue('G' . $st, $stt['remarks']);
                $st++;
            }
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('C'.$i);
            //     $sheet->setCellValue('C'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(12);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Next Renewals');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($next_renewals, NULL, 'A1');
            $sheet->fromArray([
                $rc->next_renewals,
                $rc->nr_submission_deadline,
                $rc->nr_date,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(13);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $dc = 2;
            foreach($rc->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['dremarks']);
                $sheet->setCellValue('F' . $dc, $docu['document']);
                $dc++;
            }
            // $sheet->fromArray($rc->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
                
            // }

            $writer = new Xlsx($spreadsheet);

            $nom = explode("-", $request->product_name['value']);
            $productName = $nom[0];

            $date = date('d-m-y');
            if($request->procedure_type['value'] == 'National' || $request->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_NewRegistration_' .$productName . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_NewRegistration_' .$productName . '_' .$request->country['value'];
            }else {
                $name = 'eForm_NewRegistration_' .$productName . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_NewRegistration_' .$productName . '_' .$request->procedure_type['value'];
            }
            
            $writer->save($name);
            Mail::to(getenv('MAIL_TO'))->send(new RcSubmit($name, $productName, $subject));

            return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
            
        }

        return redirect('dashboard')->with('message', 'Your form has been successfully saved');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $rc = Rc::findOrFail($id);
        return Inertia::render('Medicinal/Show', [
            'rc' => $rc
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $rc = Rc::findOrFail($id);
        
        $compnies = Company::orderBy('name')->get();
        $substanceActive = substanceActive::all();
        $packagingItemTypes = packagingItemType::all();
        $countries = Countries::orderBy('country_name')->get('country_name');
        $products = Product::all();
        return Inertia::render('Medicinal/Edit', [
            'companies' => $compnies,
            'substanceActive' => $substanceActive,
            'packagingItemTypes' => $packagingItemTypes,
            'countries' => $countries,
            'rc' => $rc,
            'products' => $products
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rc $rc)
    {
       
        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'country' => 'required',
                    'procedure_type' => 'required',
                    'application_stage' => 'required',
                    'product_name' => 'required',
                    'packagings.*.packaging_name' => 'required',
                    'packagings.*.packaging_type' => 'required',
                    'local_tradename' => 'required',
                    'registration_holder' => 'required',
                    'authorized_pharmaceutical_form' => 'required',
                    'route_of_admin' => 'required',
                    'atc' => 'required',
                    'indication' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ],
                // [
                //     'packagings.*.packaging_name.required' => 'A package name is required',
                    
                //     'packagings.*.description.required' => 'A package description is required',
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
                    // $destinationPath = public_path().'/images' ;
                    // dd($uploadedFile->move($destinationPath,$filename));
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
        
        $rc = Rc::findOrFail($request->id);

        $rc->procedure_type = $request->procedure_type;
        $rc->country = $request->country;
        $rc->rms = $request->rms;
        $rc->procedure_number = $request->procedure_number;
        // $rc->product_type = $request->product_type;
        $rc->application_stage = $request->application_stage;
        // $rc->registration_title = $request->registration_title;
        $rc->product_name = $request->product_name;
        $rc->local_tradename = $request->local_tradename;
        $rc->registration_holder = $request->registration_holder;
        $rc->application_number = $request->application_number;
        $rc->dossier_reference = $request->dossier_reference;
        $rc->pv_contact_email = $request->pv_contact_email;
        $rc->pv_contact_phone = $request->pv_contact_phone;
        $rc->bremarks = $request->bremarks;
        $rc->authorized_pharmaceutical_form = $request->authorized_pharmaceutical_form;
        $rc->administrable_pharmaceutical_form = $request->administrable_pharmaceutical_form;
        $rc->route_of_admin = $request->route_of_admin;
        $rc->atc = $request->atc;
        $rc->orphan_designation_status = $request->orphan_designation_status;
        $rc->orphan_indication_type = $request->orphan_indication_type;
        $rc->under_intensive_monitoring = $request->under_intensive_monitoring;
        $rc->key_dates = $request->key_dates;
        $rc->alternate_number_type = $request->alternate_number_type;
        $rc->alternate_number = $request->alternate_number;
        $rc->remarks = $request->remarks;
        $rc->local_agent_company = $request->local_agent_company;
        $rc->formulations = $request->formulations;
        $rc->packagings = $request->packagings;
        $rc->indication = $request->indication;
        $rc->paediatric_use = $request->paediatric_use;
        $rc->age = $request->age;
        $rc->manufacturing = $request->manufacturing;
        $rc->statuses = $request->statuses;
        $rc->next_renewals = $request->next_renewals;
        $rc->nr_submission_deadline = $request->nr_submission_deadline;
        $rc->nr_date = $request->nr_date;
        $rc->doc = $docs;
        $rc->created_by = $request->created_by;
        $rc->type = $request->query('type');
        $rc->save();

        if ($request->query('type') === 'submit') {
            $generalInfo = array(
                'Procedure Type',
                'Country',
                'RMS',
                'Procedure Number',
                'Product Type',
                'Submission Type'
            );
            $basicInfo = array(
                'Product',
                'Local Tradename',
                'Registration Holder',
                'Application Number',
                'Dossier Reference Number',
                'PV Contact Email',
                'PV Contact Phone',
                'Remarks',
            );
            $OrphanDrug = array(
                'Orphan Designation Status',
                'Orphan Indication Type',
            );
            $UnderIntensive = array(
                'Under Intensive Monitoring',
            );
            $dosageForm = array(
                'Authorized Pharmaceutical Form',
                'Administrable pharmaceutical form',
                'Route Of Admin',
                'ATC',
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
                'Sellable Unit Determined By',
                'Product Legal Status of Supply',
                'Packaging Type',
                'Packaging Registration number',
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
                'Paediatric Use',
                'Age'
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
            $next_renewals = array(
                'Next Renewals',
                'Next Renewal Submission Deadline',
                'Next Renewal Date',
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
                $rc->procedure_type['value'],
                "",
                $rc->rms ? $rc->rms['value'] : '',
                $rc->procedure_number,
                $rc->application_stage['value'],
            ], NULL, 'A2');
            if(array_key_exists('value', $rc->country)) {
                $sheet->setCellValue('B2', $rc->country['value']);
            }else {
                foreach ($rc->country as $cnt => $country) {
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
                $rc->product_name['value'],
                $rc->local_tradename,
                $rc->registration_holder['value'],
                $rc->application_number,
                $rc->dossier_reference,
                $rc->pv_contact_email,
                $rc->pv_contact_phone,
                $rc->bremarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Dosage Form');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($dosageForm, NULL, 'A1');
            $sheet->setCellValue('A2', $rc->authorized_pharmaceutical_form['value']);
            if(is_array($rc->administrable_pharmaceutical_form))
            {
                $sheet->setCellValue('B2', $rc->administrable_pharmaceutical_form['value']);
            }else {
                $sheet->setCellValue('B2', "");
            }
            
            $c= 2;
            foreach($rc->route_of_admin as  $roa) {
                $sheet->setCellValue('C' . $c, $roa['value']);
                $c+=1;
            }
            $e= 2;
            foreach($rc->atc as  $at) {
                $sheet->setCellValue('D' . $e, $at['value']);
                $e+=1;
            }
            // $sheet->fromArray([
            //     $rc->authorized_pharmaceutical_form,
            //     $rc->administrable_pharmaceutical_form,
            //     $rc->route_of_admin,
            //     $rc->atc,
            // ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(3);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Orphan Drug');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($OrphanDrug, NULL, 'A1');
            $sheet->fromArray([
                is_array($rc->orphan_designation_status) ? $rc->orphan_designation_status['value'] : '',
                is_array($rc->orphan_indication_type) ? $rc->orphan_indication_type['value'] : '',
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(4);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Under Intensive');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($UnderIntensive, NULL, 'A1');
            $sheet->fromArray([
                is_array($rc->under_intensive_monitoring) ? $rc->under_intensive_monitoring['value'] : '',
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(5);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Key Dates');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($keyDates, NULL, 'A1');
            // $sheet->fromArray($rc->key_dates, NULL, 'A2');
            $n = 2;
            if(isset($rc->key_dates)) {
                foreach($rc->key_dates as  $kd) {
                    //is_array($kd['date_type']) ? $sheet->setCellValue('A' . $n, $kd['date_type']['value']) : $sheet->setCellValue('A' . $n, '');
                    $sheet->setCellValue('A' . $n, is_array($kd['date_type']) ? $kd['date_type']['value'] : '');
                    $sheet->setCellValue('B' . $n, date("d-m-Y",strtotime($kd['date'])));
                    $sheet->setCellValue('C' . $n, $kd['remarks']);
                    $n+=1;
                }
            }
            
            $sheet->setCellValue('D2', is_array($rc->alternate_number_type) ? $rc->alternate_number_type['value'] : '');
            $sheet->setCellValue('E2', $rc->alternate_number);
            $sheet->setCellValue('F2', $rc->remarks);

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(6);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Local Agent');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($localAgent, NULL, 'A1');
            $sheet->fromArray([is_array($rc->local_agent_company) ? $rc->local_agent_company['value'] : ''], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(7);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Formulations');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($formulations, NULL, 'A1');
            $f = 2;
           
            foreach($rc->formulations as $fr) {
                foreach($fr['ingredient'] as $ing) {
                    
                    $sheet->setCellValue('A' . $f, is_array($ing['ingredient']) ? $ing['ingredient']['value'] : '');
                    $sheet->setCellValue('B' . $f, is_array($ing['function']) ? $ing['function']['value'] : '');
                    $sheet->setCellValue('C' . $f, is_array($ing['strength_type']) ? $ing['strength_type']['value'] : '');
                    $sheet->setCellValue('D' . $f, $ing['numerator_lower_val']);
                    $sheet->setCellValue('E' . $f, $ing['numerator_upper_val']);
                    $sheet->setCellValue('F' . $f, is_array($ing['numerator_unit']) ? $ing['numerator_unit']['value'] : '');
                    $f += 1;
                }
                $f += 1;
            }
            // $sheet->fromArray($rc->formulations
            // , NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(8);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Packagings');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($packagings, NULL, 'A1');
            $c = 2;
            foreach ($rc->packagings as $package) {
                $sheet->setCellValue('A' . $c, is_array($package['sellable_unit_determined_by']) ? $package['sellable_unit_determined_by']['value']: '');
                $sheet->setCellValue('B' . $c, is_array($package['product_legal_status_of_supply']) ? $package['product_legal_status_of_supply']['value'] : '');
                $sheet->setCellValue('C' . $c, is_array($package['packaging_type']) ? $package['packaging_type']['value'] : '');
                $sheet->setCellValue('D' . $c, $package['packaging_registration_number']);
                $sheet->setCellValue('E' . $c, $package['packaging_name']);
                $sheet->setCellValue('F' . $c, $package['description']);
                $sheet->setCellValue('G' . $c, is_array($package['launched']) ? $package['launched']['value'] : '');
                $sheet->setCellValue('H' . $c, date("d-m-Y",strtotime($package['first_lunch_date'])));
                $sheet->setCellValue('I' . $c, is_array($package['packaging_discontinued']) ? $package['packaging_discontinued']['value'] : '');
                $sheet->setCellValue('J' . $c, date("d-m-Y",strtotime($package['discontinuation_date'])));
                $sheet->setCellValue('K' . $c, $package['remarks']);
                if(isset($package['packagelif'])){
                    foreach ($package['packagelif'] as $i => $pl) {
                        $sheet->setCellValue('L' . $c, is_array($pl['package_shelf_life_type']) ? $pl['package_shelf_life_type']['value'] : '');
                        $sheet->setCellValue('M' . $c, $pl['shelf_life']);
                        $sheet->setCellValue('N' . $c, is_array($pl['shelf_life_unit']) ? $pl['shelf_life_unit']['value'] : '');
                        $sheet->setCellValue('P' . $c, $pl['remarks']);
                        if (isset($pl['package_storage_condition'])) {
                            foreach ($pl['package_storage_condition'] as $psc) {
                                $sheet->setCellValue('O' . $c, $psc['value']);
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
            foreach($rc->indication as $ind) {
                $sheet->setCellValue('A' . $in, $ind['value']);
                $in++;
            }
            $sheet->setCellValue('B2', is_array($rc->paediatric_use) ? $rc->paediatric_use['value'] : '');
            $sheet->setCellValue('C2', $rc->age);
            // $sheet->fromArray([
            //     $rc->indication['value'],
            //     is_array($rc->paediatric_use) ? $rc->paediatric_use['value'] : '',
            //     $rc->age,
            // ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(10);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Manufacturing');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($manufacturing, NULL, 'A1');
            $b = 2;
            if(isset($rc->manufacturing)) {
                foreach ($rc->manufacturing as $mnf) {
                    $sheet->setCellValue('A' . $b, is_array($mnf['manufacturer']) ? $mnf['manufacturer']['value'] : '');
                    if (isset($mnf['operation_type'])){
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
            // $sheet->fromArray($rc->statuses, NULL, 'A2');
            $st = 2;
            foreach($rc->statuses as $stt) {
                $sheet->setCellValue('A' . $st, is_array($stt['status']) ? $stt['status']['value'] : '');
                $sheet->setCellValue('B' . $st, date("d-m-Y", strtotime($stt['status_date'])));
                $sheet->setCellValue('C' . $st, $stt['ectd_sequence']);
                $sheet->setCellValue('D' . $st, $stt['change_control_ref']);
                $sheet->setCellValue('E' . $st, $stt['internal_submission_reference']);
                $sheet->setCellValue('F' . $st, $stt['remarks']);
                $st++;
            }
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('C'.$i);
            //     $sheet->setCellValue('C'.$i, date("d-m-Y", strtotime($datef)));
            // }

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(12);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Next Renewals');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($next_renewals, NULL, 'A1');
            $sheet->fromArray([
                $rc->next_renewals,
                $rc->nr_submission_deadline,
                $rc->nr_date,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(13);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Documents');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($document, NULL, 'A1');
            $dc = 2;
            foreach($rc->doc as $docu) {
                $sheet->setCellValue('A' . $dc, is_array($docu['document_type']) ? $docu['document_type']['value'] : '');
                $sheet->setCellValue('B' . $dc, $docu['document_title']);
                $sheet->setCellValue('C' . $dc, is_array($docu['language']) ? $docu['language']['value']: '');
                $sheet->setCellValue('D' . $dc, date("d-m-Y", strtotime($docu['version_date'])));
                $sheet->setCellValue('E' . $dc, $docu['dremarks']);
                $sheet->setCellValue('F' . $dc, $docu['document']);
                $dc++;
            }
            // $sheet->fromArray($rc->doc, NULL, 'A2');
            // $hr = $sheet->getHighestRow();
            // for($i=2; $i<=$hr; $i++) {
            //     $datef = $sheet->getCell('D'.$i);
            //     $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
                
            // }

            $writer = new Xlsx($spreadsheet);

            $nom = explode("-", $request->product_name['value']);
            $productName = $nom[0];
            
            $date = date('d-m-y');
            if($request->procedure_type['value'] == 'National' || $request->procedure_type['value'] == 'Centralized') {
                $name = 'eForm_NewRegistration_' .$productName . '_' .$request->country['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_NewRegistration_' .$productName . '_' .$request->country['value'];
            }else {
                $name = 'eForm_NewRegistration_' .$productName . '_' .$request->procedure_type['value'] . '_' .$date . '.xlsx';
                $subject = 'eForm_NewRegistration_' .$productName . '_' .$request->procedure_type['value'];
            }
            
            $writer->save($name);
            Mail::to(getenv('MAIL_TO'))->send(new RcSubmit($name, $productName, $subject));

            return redirect('dashboard')->with('message', 'Your form has been successfully submitted to the Data Entry Team');
            
        }

        return redirect('dashboard')->with('message', 'Your form has been successfully saved');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rc $rc)
    {
       
    }

    public function messages()
    {
        return [
            'packagings.*.packaging_name' => 'A package name is required',
        ];
    }
}
