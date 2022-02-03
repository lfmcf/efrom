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
    public function store(Request $request)
    {
        // dd($request->query('type'));
        
        // dd($request->packagings);

        if($request->query('type') === 'submit') {
            $validator = $request->validate(
                [
                    'procedure_type' => 'required',
                    'product_type' => 'required',
                    'application_stage' => 'required',
                    'product_name' => 'required',
                    'local_tradename' => 'required',
                    'registration_holder' => 'required',
                    'authorized_pharmaceutical_form' => 'required',
                    'route_of_admin' => 'required',
                    'atc' => 'required',
                    'packagings.*.packaging_name' => 'required',
                    'packagings.*.package_number' => 'required',
                    'packagings.*.description' => 'required',
                    'indication' => 'required',
                    'statuses.*.status' => 'required',
                    'statuses.*.status_date' => 'required',
                ],
                [
                    'packagings.*.packaging_name.required' => 'A package name is required',
                    'packagings.*.package_number.required' => 'A package number is required',
                    'packagings.*.description.required' => 'A package description is required',
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
        $rc->product_type = $request->product_type;
        $rc->application_stage = $request->application_stage;
        $rc->registration_title = $request->registration_title;
        $rc->product_name = $request->product_name;
        $rc->local_tradename = $request->local_tradename;
        $rc->registration_holder = $request->registration_holder;
        $rc->application_number = $request->application_number;
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
                'Applcation Stage'
            );
            $basicInfo = array(
                'Registration Title',
                'Product Name',
                'Local Tradename',
                'Registration Holder',
                'Application Number',
                'Dossier Reference Number',
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
                'Packaging Type',
                'Packaging Name',
                'Package Number',
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
                $rc->procedure_type,
                "",
                $rc->rms,
                $rc->procedure_number,
                $rc->product_type,
                $rc->application_stage,
            ], NULL, 'A2');
            if(is_array($rc->country)) {
                foreach ($rc->country as $cnt => $country) {
                    $cnt += 2;
                    $sheet->setCellValue('B' . $cnt, $country);
                }
            }
            
            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(1);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Basic information');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($basicInfo, NULL, 'A1');
            $sheet->fromArray([
                $rc->registration_title,
                $rc->product_name,
                $rc->local_tradename,
                $rc->registration_holder,
                $rc->application_number,
                $rc->dossier_reference,
                $rc->bremarks
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(2);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Dosage Form');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($dosageForm, NULL, 'A1');
            $sheet->setCellValue('A2', $rc->authorized_pharmaceutical_form);
            $sheet->setCellValue('B2', $rc->administrable_pharmaceutical_form);
            $c= 2;
            foreach($rc->route_of_admin as  $roa) {
                $sheet->setCellValue('C' . $c, $roa);
                $c+=1;
            }
            $e= 2;
            foreach($rc->atc as  $at) {
                $sheet->setCellValue('D' . $e, $at);
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
                $rc->orphan_designation_status,
                $rc->orphan_indication_type,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(4);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Under Intensive');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($UnderIntensive, NULL, 'A1');
            $sheet->fromArray([
                $rc->under_intensive_monitoring,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(5);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Key Dates');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($keyDates, NULL, 'A1');
            // $sheet->fromArray($rc->key_dates, NULL, 'A2');
            $n = 2;
            foreach($rc->key_dates as  $kd) {
                $sheet->setCellValue('A' . $n, $kd['date_type']);
                $sheet->setCellValue('B' . $n, date("d-m-Y",strtotime($kd['date'])));
                $sheet->setCellValue('C' . $n, $kd['remarks']);
                $n+=1;
            }
            $sheet->setCellValue('D2', $rc->alternate_number_type);
            $sheet->setCellValue('E2', $rc->alternate_number);
            $sheet->setCellValue('F2', $rc->remarks);

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(6);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Local Agent');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($localAgent, NULL, 'A1');
            $sheet->fromArray([$rc->local_agent_company], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(7);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Formulations');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($formulations, NULL, 'A1');
            $sheet->fromArray($rc->formulations, NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(8);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Packagings');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($packagings, NULL, 'A1');
            $c = 2;
            foreach ($rc->packagings as $package) {
                $sheet->setCellValue('A' . $c, $package['packaging_type']);
                $sheet->setCellValue('B' . $c, $package['packaging_name']);
                $sheet->setCellValue('C' . $c, $package['package_number']);
                $sheet->setCellValue('D' . $c, $package['description']);
                $sheet->setCellValue('E' . $c, $package['launched']);
                $sheet->setCellValue('F' . $c, date("d-m-Y",strtotime($package['first_lunch_date'])));
                $sheet->setCellValue('G' . $c, $package['packaging_discontinued']);
                $sheet->setCellValue('H' . $c, date("d-m-Y",strtotime($package['discontinuation_date'])));
                $sheet->setCellValue('I' . $c, $package['remarks']);
                if(isset($package['packagelif']));{
                    foreach ($package['packagelif'] as $i => $pl) {
                        $sheet->setCellValue('J' . $c, $pl['package_shelf_life_type']);
                        $sheet->setCellValue('K' . $c, $pl['shelf_life']);
                        $sheet->setCellValue('L' . $c, $pl['shelf_life_unit']);
                        if (isset($pl['package_storage_condition'])) {
                            foreach ($pl['package_storage_condition'] as $psc) {
                                $sheet->setCellValue('M' . $c, $psc);
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
                $rc->indication,
                $rc->paediatric_use,
                $rc->age,
            ], NULL, 'A2');

            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(10);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Manufacturing');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($manufacturing, NULL, 'A1');
            $b = 2;
            if(isset($rc->manufacturing)) {
                foreach ($rc->manufacturing as $mnf) {
                    $sheet->setCellValue('A' . $b, $mnf['manufacturer']);
                    if (isset($mnf['operation_type']));
                    foreach ($mnf['operation_type'] as $opt) {
                        $sheet->setCellValue('B' . $b, $opt);
                        $b++;
                    }
                }
            }
            
            $spreadsheet->createSheet();
            $spreadsheet->setActiveSheetIndex(11);
            $sheet = $spreadsheet->getActiveSheet()->setTitle('Status');
            $sheet->getStyle('1:1')->getFont()->setBold(true);
            $sheet->fromArray($status, NULL, 'A1');
            $sheet->fromArray($rc->statuses, NULL, 'A2');
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
            $sheet->fromArray($rc->doc, NULL, 'A2');
            $hr = $sheet->getHighestRow();
            for($i=2; $i<=$hr; $i++) {
                $datef = $sheet->getCell('D'.$i);
                $sheet->setCellValue('D'.$i, date("d-m-Y", strtotime($datef)));
            }

            $writer = new Xlsx($spreadsheet);
            
            $date = date('d-m-y');
            $name = 'Medicinal Product ' . $date . '.xlsx';
            $writer->save($name);
            Mail::to(getenv('MAIL_TO'))->send(new RcSubmit($name));

            // return redirect('dashboard')->with('message', 'Votre formulaire a bien été soumis');
            
        }

        // return redirect('dashboard')->with('message', 'Votre formulaire a bien été sauvegardé');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function show(Rc $rc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function edit(Rc $rc)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rc  $rc
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rc $rc)
    {
        //
    }

    public function messages()
    {
        return [
            'packagings.*.packaging_name' => 'A package name is required',
        ];
    }
}
