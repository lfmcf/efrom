<?php

namespace App\Http\Controllers;

use App\Models\Amendments;
use App\Models\Baseline;
use App\Models\Clinical;
use App\Models\CregistrationTermination;
use Illuminate\Http\Request;
use App\Models\Rc;
use App\Models\RegistrationTermination;
use App\Models\Renouvellement;
use App\Models\Transfer;
use App\Models\Variation;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $role = Auth::user()->role;
        $rc = Rc::orderBy('created_at', 'DESC')->get();
        $variation = Variation::orderBy('created_at', 'DESC')->get();
        $renewal = Renouvellement::orderBy('created_at', 'DESC')->get();
        $baseline = Baseline::orderBy('created_at', 'DESC')->get();
        $clinical = Clinical::orderBy('created_at', 'DESC')->get();
        $amendment = Amendments::orderBy('created_at', 'DESC')->get();
        $transfer = Transfer::orderBy('created_at', 'DESC')->get();
        $rt = RegistrationTermination::orderBy('created_at', 'DESC')->get();
        if ($role == "data_ism") {

            $crc = Rc::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'submit']],
                        [
                            '$group' =>
                            ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
                        ],
                    ]
                );
            });

            $rcSavedCount = Rc::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'draft']],
                    ]
                );
            });

            $cvarhq = Variation::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        array(
                            '$match' => array(
                                '$and' => array(
                                    array('type' => 'submit'),
                                    array('isHq' => true)
                                )
                            )
                        ),
                    ]
                );
            });

            $cvar = Variation::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        array(
                            '$match' => array(
                                '$and' => array(
                                    array('type' => 'submit'),
                                    array('isHq' => false)
                                )
                            )
                        ),
                        [
                            '$group' =>
                            ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
                        ],
                    ]
                );
            });

            $VarSavedCount = Variation::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'draft']],
                    ]
                );
            });

            $cren = Renouvellement::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'submit']],
                        [
                            '$group' =>
                            ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
                        ]
                    ]
                );
            });

            $RenSavedCount = Renouvellement::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'draft']],
                    ]
                );
            });

            $ctran = Transfer::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'submit']],
                        [
                            '$group' =>
                            ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
                        ]
                    ]
                );
            });

            $TranSavedCount = Transfer::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'draft']],
                    ]
                );
            });

            $cbase = Baseline::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'submit']],
                        [
                            '$group' =>
                            ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
                        ]
                    ]
                );
            });

            $BaseSavedCount = Baseline::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'draft']],
                    ]
                );
            });

            $crt = RegistrationTermination::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'submit']],
                        [
                            '$group' =>
                            ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
                        ]
                    ]
                );
            });

            $rtSavedCount = RegistrationTermination::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'draft']],
                    ]
                );
            });

            $cclinical = Clinical::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'submit']],
                        [
                            '$group' =>
                            ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
                        ]
                    ]
                );
            });

            $clinicalSavedCount = Clinical::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'draft']],
                    ]
                );
            });

            $camen = Amendments::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'submit']],
                        [
                            '$group' =>
                            ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
                        ]
                    ]
                );
            });

            $amenSavedCount = Amendments::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'draft']],
                    ]
                );
            });

            $ccrt = CregistrationTermination::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'submit']],
                        [
                            '$group' =>
                            ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
                        ]
                    ]
                );
            });

            $crtSavedCount = Amendments::raw(function ($collection) {
                return $collection->aggregate(
                    [
                        ['$match' => ['type' => 'draft']],
                    ]
                );
            });

            $savedFormsCount = count($crtSavedCount) + count($amenSavedCount) + count($clinicalSavedCount) + count($rtSavedCount)
                + count($BaseSavedCount) + count($TranSavedCount) + count($RenSavedCount) + count($VarSavedCount) + count($rcSavedCount);



            $cntN = 0;
            $cntC = 0;
            $cntD = 0;
            $cntM = 0;
            $macount = 0;
            $varcount = 0;
            $rencount = 0;
            $trancount = 0;
            $basecount = 0;
            $rtcount = 0;
            $clinicalcount = 0;
            $amencount = 0;
            $crtcount = 0;
            foreach ($crc as $c) {
                switch ($c->_id) {
                    case 'National':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'Centralized':
                        $cntC = $c->count + $cntC;
                        break;
                    case 'Decentralized':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'Mutual Recognition':
                        $cntM = $c->count + $cntM;
                        break;
                }
                $macount = $c->count + $macount;
            }


            foreach ($cvarhq as $c) {
                foreach ($c->identification as $pt) {

                    switch ($pt->procedure_type['value']) {
                        case 'National':
                            $cntN += 1;
                            break;
                        case 'Centralized':
                            $cntC += 1;
                            break;
                        case 'Decentralized':
                            $cntD += 1;
                            break;
                        case 'Mutual Recognition':
                            $cntM += 1;
                            break;
                    }
                    $varcount += 1;
                }
            }

            foreach ($cvar as $c) {
                switch ($c->_id) {
                    case 'National':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'Centralized':
                        $cntC = $c->count + $cntC;
                        break;
                    case 'Decentralized':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'Mutual Recognition':
                        $cntM = $c->count + $cntM;
                        break;
                }
                $varcount = $c->count + $varcount;
            }

            // dd($cntN);

            foreach ($cren as $c) {
                switch ($c->_id) {
                    case 'National':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'Centralized':
                        $cntC = $c->count + $cntC;
                        break;
                    case 'Decentralized':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'Mutual Recognition':
                        $cntM = $c->count + $cntM;
                        break;
                }
                $rencount = $c->count + $rencount;
            }

            foreach ($ctran as $c) {
                switch ($c->_id) {
                    case 'National':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'Centralized':
                        $cntC = $c->count + $cntC;
                        break;
                    case 'Decentralized':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'Mutual Recognition':
                        $cntM = $c->count + $cntM;
                        break;
                }
                $trancount = $c->count + $trancount;
            }

            foreach ($cbase as $c) {
                switch ($c->_id) {
                    case 'National':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'Centralized':
                        $cntC = $c->count + $cntC;
                        break;
                    case 'Decentralized':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'Mutual Recognition':
                        $cntM = $c->count + $cntM;
                        break;
                }
                $basecount = $c->count + $basecount;
            }

            foreach ($crt as $c) {
                switch ($c->_id) {
                    case 'National':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'Centralized':
                        $cntC = $c->count + $cntC;
                        break;
                    case 'Decentralized':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'Mutual Recognition':
                        $cntM = $c->count + $cntM;
                        break;
                }
                $rtcount = $c->count + $rtcount;
            }

            foreach ($cclinical as $c) {
                switch ($c->_id) {
                    case 'National':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'National Procedure':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'Centralized':
                        $cntC = $c->count + $cntC;
                        break;
                    case 'Decentralized':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'European Procedure':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'Mutual Recognition':
                        $cntM = $c->count + $cntM;
                        break;
                }
                $clinicalcount = $c->count + $clinicalcount;
            }

            foreach ($camen as $c) {
                switch ($c->_id) {
                    case 'National':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'Centralized':
                        $cntC = $c->count + $cntC;
                        break;
                    case 'Decentralized':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'European Procedure':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'Mutual Recognition':
                        $cntM = $c->count + $cntM;
                        break;
                }
                $amencount = $c->count + $amencount;
            }

            foreach ($ccrt as $c) {
                switch ($c->_id) {
                    case 'National':
                        $cntN = $c->count + $cntN;
                        break;
                    case 'Centralized':
                        $cntC = $c->count + $cntC;
                        break;
                    case 'Decentralized':
                        $cntD = $c->count + $cntD;
                        break;
                    case 'Mutual Recognition':
                        $cntM = $c->count + $cntM;
                        break;
                }
                $crtcount = $c->count + $crtcount;
            }

            $submitedFormsCount = $macount + $varcount + $rencount + $trancount + $basecount + $rtcount + $clinicalcount
                + $amencount + $crtcount;

            $totalforms = $submitedFormsCount + $savedFormsCount;
            $MAaut = $macount + $varcount + $rencount + $trancount + $basecount + $rtcount;
            $MACli = $clinicalcount + $amencount + $crtcount;

            return Inertia::render('Dashboard', [
                'totalForms' => $totalforms,
                'totalSavedForms' => $savedFormsCount,
                'totalSubmittedForms' => $submitedFormsCount,
                'rc' => $rc,
                'variation' => $variation,
                'renewal' => $renewal,
                'baseline' => $baseline,
                'clinical' => $clinical,
                'amendment' => $amendment,
                'transfer' => $transfer,
                'rt' => $rt,
                'cntN' => $cntN,
                'cntC' => $cntC,
                'cntD' => $cntD,
                'cntM' => $cntM,
                'macount' => $macount,
                'varcount' => $varcount,
                'rencount' => $rencount,
                'trancount' => $trancount,
                'basecount' => $basecount,
                'rtcount' => $rtcount,
                'clinicalcount' => $clinicalcount,
                'amencount' => $amencount,
                'crtcount' => $crtcount,
                'MAau' => $MAaut,
                'MAcli' => $MACli
            ]);
        } else {
            return Inertia::render('DashboardKpi', [
                'rc' => $rc,
                'variation' => $variation,
                'renewal' => $renewal,
                'baseline' => $baseline,
                'clinical' => $clinical,
                'amendment' => $amendment,
                'transfer' => $transfer,
                'rt' => $rt,
            ]);
        }
    }

    public function getformsnumber(Request $request)
    {
        $from = Carbon::createFromDate($request->from);
        $to = Carbon::createFromDate($request->to);
        $formType = $request->formType;

        if ($formType == "All") {
            $nrc = DB::connection('mongodb')->table('rc_finished')->whereBetween('created_at', [$from, $to])->groupBy('created_at')->count();
            $namendment = DB::connection('mongodb')->table('amendment')->whereBetween('created_at', [$from, $to])->groupBy('created_at')->count();
            $ncrc = DB::connection('mongodb')->table('clinical_registration_termination')->whereBetween('created_at', [$from, $to])->groupBy('created_at')->count();
            $nrt = DB::connection('mongodb')->table('registration_termination')->whereBetween('created_at', [$from, $to])->groupBy('created_at')->count();
            $nrenewal = DB::connection('mongodb')->table('renewal')->whereBetween('created_at', [$from, $to])->groupBy('created_at')->count();
            $ntransfer = DB::connection('mongodb')->table('transfer')->whereBetween('created_at', [$from, $to])->groupBy('created_at')->count();
            $nvar = DB::connection('mongodb')->table('variation')->whereBetween('created_at', [$from, $to])->groupBy('created_at')->count();
            $nb = $nrc + $namendment + $ncrc + $nrt + $nrenewal + $ntransfer + $nvar;
        } else if ($formType == "Medicinal product") {
            $nb = DB::connection('mongodb')->table('rc_finished')->whereBetween('created_at', [$from, $to])->groupBy('created_at')->count();
        }

        return response()->json($nb, 200);
    }
    // public function dashboard_kpi()
    // {

    //     $crc = Rc::raw(function ($collection) {
    //         return $collection->aggregate(
    //             [
    //                 ['$match' => ['type' => 'submit']],
    //                 [
    //                     '$group' =>
    //                     ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
    //                 ],

    //             ]
    //         );
    //     });

    //     $cvar = Variation::raw(function ($collection) {
    //         return $collection->aggregate(
    //             [
    //                 ['$match' => ['type' => 'submit']],
    //                 [
    //                     '$group' =>
    //                     ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
    //                 ]
    //             ]
    //         );
    //     });

    //     $cren = Renouvellement::raw(function ($collection) {
    //         return $collection->aggregate(
    //             [
    //                 ['$match' => ['type' => 'submit']],
    //                 [
    //                     '$group' =>
    //                     ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
    //                 ]
    //             ]
    //         );
    //     });

    //     $ctran = Transfer::raw(function ($collection) {
    //         return $collection->aggregate(
    //             [
    //                 ['$match' => ['type' => 'submit']],
    //                 [
    //                     '$group' =>
    //                     ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
    //                 ]
    //             ]
    //         );
    //     });

    //     $cbase = Baseline::raw(function ($collection) {
    //         return $collection->aggregate(
    //             [
    //                 ['$match' => ['type' => 'submit']],
    //                 [
    //                     '$group' =>
    //                     ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
    //                 ]
    //             ]
    //         );
    //     });

    //     $crt = RegistrationTermination::raw(function ($collection) {
    //         return $collection->aggregate(
    //             [
    //                 ['$match' => ['type' => 'submit']],
    //                 [
    //                     '$group' =>
    //                     ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
    //                 ]
    //             ]
    //         );
    //     });

    //     $cclinical = Clinical::raw(function ($collection) {
    //         return $collection->aggregate(
    //             [
    //                 ['$match' => ['type' => 'submit']],
    //                 [
    //                     '$group' =>
    //                     ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
    //                 ]
    //             ]
    //         );
    //     });

    //     $camen = Amendments::raw(function ($collection) {
    //         return $collection->aggregate(
    //             [
    //                 ['$match' => ['type' => 'submit']],
    //                 [
    //                     '$group' =>
    //                     ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
    //                 ]
    //             ]
    //         );
    //     });

    //     $ccrt = CregistrationTermination::raw(function ($collection) {
    //         return $collection->aggregate(
    //             [
    //                 ['$match' => ['type' => 'submit']],
    //                 [
    //                     '$group' =>
    //                     ['_id' => '$procedure_type.value', 'count' => ['$sum' => 1]]
    //                 ]
    //             ]
    //         );
    //     });

    //     $cntN = 0;
    //     $cntC = 0;
    //     $cntD = 0;
    //     $cntM = 0;
    //     $macount = 0;
    //     $varcount = 0;
    //     $rencount = 0;
    //     $trancount = 0;
    //     $basecount = 0;
    //     $rtcount = 0;
    //     $clinicalcount = 0;
    //     $amencount = 0;
    //     $crtcount = 0;
    //     foreach ($crc as $c) {
    //         switch ($c->_id) {
    //             case 'National':
    //                 $cntN = $c->count + $cntN;
    //                 break;
    //             case 'Centralized':
    //                 $cntC = $c->count + $cntC;
    //                 break;
    //             case 'Decentralized':
    //                 $cntD = $c->count + $cntD;
    //                 break;
    //             case 'Mutual Recognition':
    //                 $cntM = $c->count + $cntM;
    //                 break;
    //         }
    //         $macount = $c->count + $macount;
    //     }

    //     foreach ($cvar as $c) {
    //         switch ($c->_id) {
    //             case 'National':
    //                 $cntN = $c->count + $cntN;
    //                 break;
    //             case 'Centralized':
    //                 $cntC = $c->count + $cntC;
    //                 break;
    //             case 'Decentralized':
    //                 $cntD = $c->count + $cntD;
    //                 break;
    //             case 'Mutual Recognition':
    //                 $cntM = $c->count + $cntM;
    //                 break;
    //         }
    //         $varcount = $c->count + $varcount;
    //     }

    //     foreach ($cren as $c) {
    //         switch ($c->_id) {
    //             case 'National':
    //                 $cntN = $c->count + $cntN;
    //                 break;
    //             case 'Centralized':
    //                 $cntC = $c->count + $cntC;
    //                 break;
    //             case 'Decentralized':
    //                 $cntD = $c->count + $cntD;
    //                 break;
    //             case 'Mutual Recognition':
    //                 $cntM = $c->count + $cntM;
    //                 break;
    //         }
    //         $rencount = $c->count + $rencount;
    //     }

    //     foreach ($ctran as $c) {
    //         switch ($c->_id) {
    //             case 'National':
    //                 $cntN = $c->count + $cntN;
    //                 break;
    //             case 'Centralized':
    //                 $cntC = $c->count + $cntC;
    //                 break;
    //             case 'Decentralized':
    //                 $cntD = $c->count + $cntD;
    //                 break;
    //             case 'Mutual Recognition':
    //                 $cntM = $c->count + $cntM;
    //                 break;
    //         }
    //         $trancount = $c->count + $trancount;
    //     }

    //     foreach ($cbase as $c) {
    //         switch ($c->_id) {
    //             case 'National':
    //                 $cntN = $c->count + $cntN;
    //                 break;
    //             case 'Centralized':
    //                 $cntC = $c->count + $cntC;
    //                 break;
    //             case 'Decentralized':
    //                 $cntD = $c->count + $cntD;
    //                 break;
    //             case 'Mutual Recognition':
    //                 $cntM = $c->count + $cntM;
    //                 break;
    //         }
    //         $basecount = $c->count + $basecount;
    //     }

    //     foreach ($crt as $c) {
    //         switch ($c->_id) {
    //             case 'National':
    //                 $cntN = $c->count + $cntN;
    //                 break;
    //             case 'Centralized':
    //                 $cntC = $c->count + $cntC;
    //                 break;
    //             case 'Decentralized':
    //                 $cntD = $c->count + $cntD;
    //                 break;
    //             case 'Mutual Recognition':
    //                 $cntM = $c->count + $cntM;
    //                 break;
    //         }
    //         $rtcount = $c->count + $rtcount;
    //     }

    //     foreach ($cclinical as $c) {
    //         switch ($c->_id) {
    //             case 'National':
    //                 $cntN = $c->count + $cntN;
    //                 break;
    //             case 'Centralized':
    //                 $cntC = $c->count + $cntC;
    //                 break;
    //             case 'Decentralized':
    //                 $cntD = $c->count + $cntD;
    //                 break;
    //             case 'Mutual Recognition':
    //                 $cntM = $c->count + $cntM;
    //                 break;
    //         }
    //         $clinicalcount = $c->count + $clinicalcount;
    //     }

    //     foreach ($camen as $c) {
    //         switch ($c->_id) {
    //             case 'National':
    //                 $cntN = $c->count + $cntN;
    //                 break;
    //             case 'Centralized':
    //                 $cntC = $c->count + $cntC;
    //                 break;
    //             case 'Decentralized':
    //                 $cntD = $c->count + $cntD;
    //                 break;
    //             case 'Mutual Recognition':
    //                 $cntM = $c->count + $cntM;
    //                 break;
    //         }
    //         $amencount = $c->count + $amencount;
    //     }

    //     foreach ($ccrt as $c) {
    //         switch ($c->_id) {
    //             case 'National':
    //                 $cntN = $c->count + $cntN;
    //                 break;
    //             case 'Centralized':
    //                 $cntC = $c->count + $cntC;
    //                 break;
    //             case 'Decentralized':
    //                 $cntD = $c->count + $cntD;
    //                 break;
    //             case 'Mutual Recognition':
    //                 $cntM = $c->count + $cntM;
    //                 break;
    //         }
    //         $crtcount = $c->count + $crtcount;
    //     }

    //     return Inertia::render('DashboardKpi', [
    //         'cntN' => $cntN,
    //         'cntC' => $cntC,
    //         'cntD' => $cntD,
    //         'cntM' => $cntM,
    //         'macount' => $macount,
    //         'varcount' => $varcount,
    //         'rencount' => $rencount,
    //         'trancount' => $trancount,
    //         'basecount' => $basecount,
    //         'rtcount' => $rtcount,
    //         'clinicalcount' => $clinicalcount,
    //         'amencount' => $amencount,
    //         'crtcount' => $crtcount,
    //     ]);
    // }
}
