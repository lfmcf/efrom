import React, {useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from '@inertiajs/inertia-react';
import Documents from '@/Layouts/Documents';
import ModalS from '@/Components/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Index = (props) => {
    
    const { data, setData, post, processing, errors, clearErrors,  reset } = useForm({
        procedure_type: '',
        country: [],
        rms: '',
        procedure_number: '',
        product_type: '',
        application_stage: '',
        product_name: '',
        local_tradename: '',
        registration_holder: '',
        application_number: '',
        authorized_pharmaceutical_form: '',
        administrable_pharmaceutical_form: '',
        route_of_admin: '',
        atc: '',
        orphan_designation_status: '',
        orphan_indication_type: '',
        under_intensive_monitoring: '',
        key_dates: [{date_type: "", date: '',remarks:""}],
        alternate_number_type: '',
        alternate_number: '',
        remarks: '',
        local_agent_company: '',
        formulations: [{ingredient: '', strength_type: '', numerator_lower_val: '', numerator_upper_val: '', numerator_unit: '', function: ''}],
        packagings: [
            {
                packaging_type:'',packaging_name:'',package_number:'',description:'',launched:'',first_lunch_date:'',packaging_discontinued:'',discontinuation_date:'', 
                packagelif: [{package_shelf_life_type:'', shelf_life:'',shelf_life_unit:'',package_storage_condition:[], remarks:''}]
            }
        ],
        indication: '',
        paediatric_use: '',
        age: '',
        manufacturing: [{manufacturer:'',operation_type:[]}],
        statuses: [{status:'',status_date:'',ectd_sequence:'',change_control_ref:'',internal_submission_reference:'',remarks:''}],
        doc: [{document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: ''}],
        created_by: props.auth.user.id,
    });

    const [show, setShow] = useState(false);
    const countryRef = React.useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitType = window.event.submitter.name;
        post(route('storefinishproduct', {'type': submitType}));
    }

    let handleProcedureTypeChange = (e) => {
        countryRef.current.setValue([]);
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            country: []
        }));
        clearErrors(e.target.name);
    }

    let handleCountryChange = (e, k) => {
        let arr = {...data}
        if (k.action) {
            if(k.action == 'select-option')
            {
                if (e.length > 0) {
                    arr.country.push(k.option.value)
                } else {
                    arr.country.push(e.value)
                }
            }else if (k.action == 'remove-value') {
                let newarr = arr.country.filter((ele) => {
                    return ele != k.removedValue.value
                });
                arr.country = newarr;
            }else {
                arr.country.length = 0
            }
            
        }
        setData(arr)
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
    }

    const handleSelectChange = (e, name) => {
        setData(name.name, e.value);
        clearErrors(name.name)
    }

    let addFormFields = () => {
        let arr = {...data};
        arr.doc.push({document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: ''});
        setData(arr);
    }

    const addDatesFields = () => {
        let arr = {...data};
        arr.key_dates.push({date_type: "", date:'',remarks:""});
        setData(arr);
    }

    const removeDateFields = (i) => {
        let arr = {...data};
        arr.key_dates.splice(i, 1);
        setData(arr);
    }

    const addFormulationValues = () => {
        let arr = {...data};
        arr.formulations.push({ingredient: "", strength_type: "", numerator_lower_val: "", numerator_upper_val: "", numerator_unit: "", function: ""});
        setData(arr);
    }

    let removeFormulationFields = (i) => {
        let arr = {...data};
        arr.formulations.splice(i, 1);
        setData(arr);
    }

    let addPackageValues = () => {
        let arr = {...data};
        arr.packagings.push({packaging_type:"",packaging_name:"",package_number:"",description:"",launched:"",first_lunch_date:'',packaging_discontinued:"",discontinuation_date:'', packagelif: [{package_shelf_life_type:"", shelf_life:"",shelf_life_unit:"",package_storage_condition:[], remarks:""}]})
        setData(arr);
    }

    let removePackageValues = (i) => {
        let arr = {...data};
        arr.packagings.splice(i, 1);
        setData(arr);
    }

    let addPackagelifeValues = (i) => {
        let newArr = {...data};
        newArr.packagings[i].packagelif.push({package_shelf_life_type:'', shelf_life:'',shelf_life_unit:'',package_storage_condition:[], remarks:''});
        setData(newArr)
    }

    let removePackagelifeValues = (i) => {
        let newArr = {...data};
        newArr.packagings[i].packagelif.splice(i, 1);
        setData(newArr);
    }

    let addManufacturerFields = () => {
        let newArr = {...data};
        newArr.manufacturing.push({manufacturer:'', operation_type:[]});
        setData(newArr);
    }

    let removeManufacturerFields = (i) => {
        let newArr = {...data};
        newArr.manufacturing.splice(i, 1);
        setData(newArr);
    }

    let addStatusesFields = () => {
        let newArr = {...data};
        newArr.statuses.push({status:'',status_date:'',ectd_sequence:'',change_control_ref:'',internal_submission_reference:'',remarks:''});
        setData(newArr);
    }

    let removeStatusFields = (i) => {
        let newArr = {...data};
        newArr.statuses.splice(i, 1);
        setData(newArr);
    }

    let handleKyDateChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.key_dates[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let handleKyDateTypeChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.key_dates[i]['date_type'] = e.value;
        setData(newFormValues);
    }

    let handleDateChange = (i,name, e) => {
        let arr = {...data};
        switch(name) {
            case 'date':
                arr.key_dates[i][name] = e;
                break;
            case 'first_lunch_date':
                arr.packagings[i][name] = e;
                break;
            case 'discontinuation_date':
                arr.packagings[i][name] = e;
                break;
            case 'status_date':
                arr.statuses[i][name] = e;
        }
        setData(arr);

    }

    let handleSelectIngredientChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.formulations[i]['ingredient'] = e.value;
        setData(newFormValues);
    }

    let handleFormulationsChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.formulations[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let handlePackageTypeSelectChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.packagings[i]["packaging_type"] = e.value;
        setData(newFormValues);
    }

    let handlePackagingsChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.packagings[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('packagings.'+i+'.'+e.target.name)
    }

    let handlePackagelifeChange = (index, i, e) => {
        let newFormValues = {...data};
        newFormValues.packagings[index].packagelif[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let handlePackagelifeSelectChange = (index, i, e, key) => {
        let newFormValues = {...data};
        switch(key.action) {
            case "select-option":
                newFormValues.packagings[index].packagelif[i]['package_storage_condition'].push(key.option.value);
                break;
            case "remove-value":
                let newarr = newFormValues.packagings[index].packagelif[i]['package_storage_condition'].filter((ele) => {
                    return ele != key.removedValue.value
                });
                newFormValues.packagings[index].packagelif[i]['package_storage_condition'] = newarr;
                break;
            case "clear":
                newFormValues.packagings[index].packagelif[i]['package_storage_condition'].length = 0;
                break;
        }
        setData(newFormValues);
    }

    let handleManufacturerSelectChange = (index, e) => {
        let newFormValues = {...data};
        newFormValues.manufacturing[index]['manufacturer'] = e.value;
        setData(newFormValues);
    }

    let handleOperationTypeChange = (i, e, key) => {
        let newFormValues = {...data};
        switch(key.action) {
            case "select-option":
                newFormValues.manufacturing[i]['operation_type'].push(key.option.value);
                break;
            case "remove-value":
                let newarr = newFormValues.manufacturing[i]['operation_type'].filter((ele) => {
                    return ele != key.removedValue.value
                });
                newFormValues.manufacturing[i]['operation_type'] = newarr;
                break;
            case "clear":
                newFormValues.manufacturing[i]['operation_type'].length = 0;
                break;
        }
        setData(newFormValues);
    }

    let handleStatusesChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.statuses[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('statuses.'+i+'.'+e.target.name)
    }

    let handleDocumentChange = (i, e) => {
        let arr = {...data};
        if(e.target.name === "document" ) {
            arr.doc[i][e.target.name] = e.target.files[0];
        }else {
            arr.doc[i][e.target.name] = e.target.value; 
        }
        setData(arr);
    }

    let options = props.companies.map(function (companie) {
        return {
            value: companie.name + " - " + companie.city  + " - " + companie.countryname,
            label: companie.name + " - " + companie.city + " - " + companie.countryname,
        };
    })

    let options_1 = props.substanceActive.map(function (sa) {
        return { value: sa.ingredient_name , label: sa.ingredient_name };
    })

    let options_2 = props.packagingItemTypes.map(function (pit) {
        return { value: pit.packagin_item_type , label: pit.packagin_item_type };
    })

    let options_4 = props.countries.map(function (country) {
        return { value: country.country_name , label: country.country_name };
    })

    let options_3 = [
        {value: "ASR Birthdate", label: "ASR Birthdate"},
        {value: "ASR Submission Date", label: "ASR Submission Date"},
        {value: "Development International Birth Date", label: "Development International Birth Date"},
        {value: "International Birth Date", label: "International Birth Date"},
        {value: "NR : Date of Inventory (STG Inventory FORM)", label: "NR : Date of Inventory (STG Inventory FORM)"},
        {value: "NR : Start Marketing Date", label: "NR : Start Marketing Date"},
        {value: "PSUR Birthdate", label: "PSUR Birthdate"},
        {value: "PSUR Submission Date", label: "PSUR Submission Date"},
        {value: "Study End Date", label: "Study End Date"},
        {value: "Study End Date Submitted", label: "Study End Date Submitted"},
        {value: "Study Results Submitted", label: "Study Results Submitted"},
        {value: "Study Start Date", label: "Study Start Date"},
    ]

    let operations = [
        {value: "Control site", label: "Control site"},
        {value: "Release site", label: "Release site"},
        {value: "Distributor", label: "Distributor"},
        {value: "Bulk Manufacturer", label: "Bulk Manufacturer"},
        {value: "Exploitant", label: "Exploitant"},
        {value: "Diluent Manufacturer", label: "Diluent Manufacturer"},
        {value: "Active substance Manufacturer", label: "Active substance Manufacturer"},
        {value: "Finished product Manufacturer", label: "Finished product Manufacturer"},
        {value: "Primary Packaging", label: "Primary Packaging"},
        {value: "Secondary Packaging", label: "Secondary Packaging"},
        {value: "Labelling", label: "Labelling"},
        {value: "API Suppliers", label: "API Suppliers"},
        {value: "API Manufacturer", label: "API Manufacturer"},
        {value: "Batch Release", label: "Batch Release"},
        {value: "Packaging of finished product", label: "Packaging of finished product"},
        {value: "Manufacturer", label: "Manufacturer"},
        {value: "Re-Labelling", label: "Re-Labelling"},
        {value: "Re-Packaging", label: "Re-Packaging"},
        {value: "Analytical Testing", label: "Analytical Testing"},
        {value: "Batch control/Testing", label: "Batch control/Testing"},
        {value: "Total Manufacturing", label: "Total Manufacturing"},
        {value: "Packaging", label: "Packaging"},
        {value: "Distilling", label: "Distilling"},
        {value: "Intermediate Product Manufacturing", label: "Intermediate Product Manufacturing"},
        {value: "Raw Material Supply", label: "Raw Material Supply"},
        {value: "Stability Testing", label: "Stability Testing"},
        {value: "Manufacturing Facility", label: "Manufacturing Facility"},
        {value: "Design Facility", label: "Design Facility"},
    ];

    let packageCondistion = [
        {value: "Atmospheric pressure limitation", label:"Atmospheric pressure limitation"},
        {value: "Avoid direct sunlight", label:"Avoid direct sunlight"},
        {value: "Between 1 and 75% relative humidity", label:"Between 1 and 75% relative humidity"},
        {value: "Between 8 and 80% RH", label:"Between 8 and 80% RH"},
        {value: "Dangerous voltage - this way up - period after opening", label:"Dangerous voltage - this way up - period after opening"},
        {value: "Do not expose to extreme heat", label:"Do not expose to extreme heat"},
        {value: "Do not freeze", label:"Do not freeze"},
        {value: "Do not refrigerate", label:"Do not refrigerate"},
        {value: "Do not refrigerate or freeze", label:"Do not refrigerate or freeze"},
        {value: "Do not store above 25°", label:"Do not store above 25°"},
        {value: "Do not store above 30°", label:"Do not store above 30°"},
        {value: "Do not store at extreme temperature and humidity", label:"Do not store at extreme temperature and humidity"},
        {value: "Fragile, handle with care", label:"Fragile, handle with care"},
        {value: "Humidity limitation", label:"Humidity limitation"},
        {value: "In order to protect from light", label:"In order to protect from light"},
        {value: "In order to protect from moisture", label:"In order to protect from moisture"},
        {value: "Keep away from sunlight", label:"Keep away from sunlight"},
        {value: "Keep dry", label:"Keep dry"},
        {value: "Keep the container in the outer carton", label:"Keep the container in the outer carton"},
        {value: "Keep the container tightly closed", label:"Keep the container tightly closed"},
        {value: "Keep the transdermal patch in the sachet until use", label:"Keep the transdermal patch in the sachet until use"},
        {value: "Lower limit of temperature", label:"Lower limit of temperature"},
    ]

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    const handleShow = (e) => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    return(
        <>
           
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">registration creation - finished product</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card main-card">
                        <div className="card-body">
                            <form className="form" onSubmit={handleSubmit}>
                                <Tabs defaultActiveKey="first">
                                    <Tab eventKey="first" title="New registration">
                                        <Accordion style={{ marginTop: '20px'  }} defaultActiveKey="0">
                                            <div className="card_title" style={{ marginBottom: '20px'  }}>
                                                <h5>First Submission</h5>
                                                <h5 className="subhead">All fields markedd with * are required</h5>
                                            </div>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    General information
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className='inline_form'>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Procedure Type (*)</span>
                                                                <div className="form_group_field">
                                                                    <select onChange={handleProcedureTypeChange} defaultValue="" name="procedure_type" style={{ borderColor: errors.procedure_type ? 'red' : '' }}>
                                                                        <option value="" disabled></option>
                                                                        <option >National</option>
                                                                        <option >Centralized</option>
                                                                        <option >Decentralized</option>
                                                                        <option >Mutual Recognition</option>
                                                                    </select>
                                                                </div>
                                                                <p className="errors_wrap" style={{ display: errors.procedure_type ? 'inline-block' : 'none' }}>{errors.procedure_type}</p>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Country</span>
                                                                <div className="form_group_field">
                                                                    <Select options={options_4}
                                                                        name="country"
                                                                        onChange={(e, k) => handleCountryChange(e, k)}
                                                                        className="basic"
                                                                        classNamePrefix="basic"
                                                                        isMulti={data.procedure_type === 'Decentralized' || data.procedure_type === 'Mutual Recognition' ? true : false}
                                                                        ref={ele => countryRef.current = ele}
                                                                        placeholder=''
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form_group_inline" style={{ display: data.procedure_type === 'Decentralized' || data.procedure_type === 'Mutual Recognition' ? '' : 'none' }}>
                                                                <span className="form_group_label">RMS</span>
                                                                <div className="form_group_field">
                                                                    <Select options={options_4}
                                                                        name="rms"
                                                                        onChange={handleSelectChange}
                                                                        className="basic"
                                                                        classNamePrefix="basic"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='inline_form'>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Procedure Number</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name="procedure_number" onChange={handleChange} />
                                                                </div>
                                                            </div>

                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Product Type (*)</span>
                                                                <div className="form_group_field">
                                                                    <select name="product_type" defaultValue="" onChange={handleChange} style={{ borderColor: errors.product_type ? 'red' : '' }}>
                                                                        <option disabled value=""></option>
                                                                        <option>Finished</option>
                                                                        <option>References</option>
                                                                    </select>
                                                                </div>
                                                                <p className="errors_wrap" style={{ display: errors.product_type ? 'inline-block' : 'none' }}>{errors.product_type}</p>
                                                            </div>

                                                            <div className="form_group_inline" >
                                                                <span className="form_group_label">Applcation Stage (*)</span>
                                                                <div className="form_group_field">
                                                                    <select name="application_stage" defaultValue="" onChange={handleChange} style={{ borderColor: errors.application_stage ? 'red' : '' }}>
                                                                        <option value="" disabled></option>
                                                                        <option>Marketing Authorisation</option>
                                                                        <option>APSI / NPP</option>
                                                                    </select>
                                                                </div>
                                                                <p className="errors_wrap" style={{ display: errors.application_stage ? 'inline-block' : 'none' }}>{errors.application_stage}</p>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>  
                                        <Accordion >
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Basic information
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Product Name (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="product_name" defaultValue="" onChange={handleChange} style={{borderColor: errors.product_name ? 'red' : '' }}>
                                                                    <option value="" disabled></option>
                                                                    <option>STG 320</option>
                                                                    <option>ALBEY</option>
                                                                    <option>ALUSTAL</option>
                                                                    <option>ALYOSTAL IDR</option>
                                                                    <option>ALYOSTAL PRICK</option>
                                                                    <option>ALYOSTAL TPC</option>
                                                                    <option>ALYOSTAL TPN</option>
                                                                    <option>ALYOSTAL VENOM</option>
                                                                    <option>DILUENT</option>
                                                                    <option>ORALAIR</option>
                                                                    <option>PHOSTAL</option>
                                                                    <option>REFERENCES</option>
                                                                    <option>STALORAL</option>
                                                                    <option>STALORAL 300</option>
                                                                </select>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.product_name ? 'inline-block': 'none'}}>{errors.product_name}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Local Tradename (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="local_tradename" onChange={handleChange} style={{borderColor: errors.local_tradename ? 'red' : '' }}/>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.local_tradename ? 'inline-block': 'none'}}>{errors.local_tradename}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Registration Holder (*)</span>
                                                            <div className="form_group_field form_group_holder" >
                                                                <Select options={options}
                                                                    name="registration_holder"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.registration_holder)}
                                                                    placeholder=''
                                                                />
                                                                <button className="btn-success" type="button" onClick={(e) => handleShow(e)}>
                                                                    <span className="lnr lnr-plus-circle"></span>
                                                                </button>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.registration_holder ? 'inline-block': 'none'}}>{errors.registration_holder}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Application Number</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="application_number" onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group" style={{display: data.country_global == "France" ? '' : 'none'}}>
                                                            <span className="form_group_label">Dossier Reference Number</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="dossier_reference_number" onChange={handleChange}  />
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Dosage Form / Route of Admin / ATC
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="inline_form">
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Authorized Pharmaceutical Form (*)</span>
                                                                <div className="form_group_field">
                                                                    <select name="authorized_pharmaceutical_form" defaultValue="" onChange={handleChange} style={{ borderColor: errors.authorized_pharmaceutical_form ? 'red' : '' }}>
                                                                        <option value="" disabled></option>
                                                                        <option>Powder</option>
                                                                        <option>Solution</option>
                                                                        <option>EYE DROPS</option>
                                                                        <option>NEBULISER SOLUTION</option>
                                                                        <option>oral solution</option>
                                                                        <option>powder and solvent for solution for injection</option>
                                                                        <option>solution for injection</option>
                                                                        <option>sublingual tablet</option>
                                                                        <option>suspension for injection</option>
                                                                        <option>sieved powder</option>
                                                                        <option>solution for skin-prick test</option>
                                                                        <option>eye drops powder and solvent for injection</option>
                                                                        <option>powder and solvent for nebuliser solution</option>
                                                                    </select>
                                                                </div>
                                                                <p className="errors_wrap" style={{ display: errors.authorized_pharmaceutical_form ? 'inline-block' : 'none' }}>{errors.authorized_pharmaceutical_form}</p>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Administrable pharmaceutical form</span>
                                                                <div className="form_group_field">
                                                                    <select name="administrable_pharmaceutical_form" defaultValue="" onChange={handleChange} style={{ borderColor: errors.route_of_admin ? 'red' : '' }}>
                                                                        <option value="" disabled></option>
                                                                        <option>Same as Authorised pharmaceutical form</option>
                                                                        <option>EYE DROPS</option>
                                                                        <option>NEBULISER SOLUTION</option>
                                                                        <option>SOLUTION FOR INJECTION</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="inline_form">
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Route Of Admin (*)</span>
                                                                <div className="form_group_field">
                                                                    <select name="route_of_admin" defaultValue="" onChange={handleChange} style={{ borderColor: errors.route_of_admin ? 'red' : '' }}>
                                                                        <option value="" disabled></option>
                                                                        <option>cutaneous use</option>
                                                                        <option>intrademal use</option>
                                                                        <option>eye drops</option>
                                                                        <option>nasal use</option>
                                                                        <option>ocular use</option>
                                                                        <option>subcutaneous use</option>
                                                                        <option>sublingual use</option>
                                                                    </select>
                                                                </div>
                                                                <p className="errors_wrap" style={{ display: errors.route_of_admin ? 'inline-block' : 'none' }}>{errors.route_of_admin}</p>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">ATC (*)</span>
                                                                <div className="form_group_field">
                                                                    <select name="atc" onChange={handleChange} defaultValue="" style={{ borderColor: errors.atc ? 'red' : '' }}>
                                                                        <option value="" disabled></option>
                                                                        <option>V01 - ALLERGENS</option>
                                                                        <option>V01A - ALLERGENS</option>
                                                                        <option>V01AA - ALLERGEN EXTRACTS</option>
                                                                        <option>V01AA01 - FEATHER</option>
                                                                        <option>V01AA02 - GRASS POLLEN</option>
                                                                        <option>V01AA03 - HOUSE DUST MITES</option>
                                                                        <option>V01AA04 - MOULD FUNGUS AND YEAST FUNGUS</option>
                                                                        <option>V01AA05 - TREE POLLEN</option>
                                                                        <option>V01AA07 - INSECTS</option>
                                                                        <option>V01AA08 - FOOD</option>
                                                                        <option>V01AA09 - TEXTILES</option>
                                                                        <option>V01AA10 - FLOWERS</option>
                                                                        <option>V01AA11 - ANIMALS</option>
                                                                        <option>V01AA20 - VARIOUS</option>
                                                                        <option>V04C - OTHER DIAGNOSTIC AGENTS</option>
                                                                        <option>V04CL - TESTS FOR ALLERGIC DISEASES</option>
                                                                        <option>V07AB - SOLVENTS AND DILUTING AGENTS</option>
                                                                    </select>
                                                                </div>
                                                                <p className="errors_wrap" style={{ display: errors.atc ? 'inline-block' : 'none' }}>{errors.atc}</p>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Orphan Drug Details
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="inline_form">
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Orphan Designation Status</span>
                                                                <div className="form_group_field">
                                                                    <select name="orphan_designation_status" defaultValue="" onChange={handleChange}>
                                                                        <option value="" disabled></option>
                                                                        <option value="yes">Yes</option>
                                                                        <option value="no">No</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Orphan Indication Type</span>
                                                                <div className="form_group_field">
                                                                    <select name="orphan_indication_type" defaultValue="" onChange={handleChange}>
                                                                        <option value="" disabled></option>
                                                                        <option value="diagnostic">Diagnostic</option>
                                                                        <option value="prevention">Prevention</option>
                                                                        <option value="treatment">Treatment</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Under Intensive Monitoring Details
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Under Intensive Monitoring</span>
                                                            <div className="form_group_field">
                                                                <select name="under_intensive_monitoring" defaultValue="" onChange={handleChange}>
                                                                    <option value="" disabled></option>
                                                                    <option value="yes">Yes</option>
                                                                    <option value="no">No</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                        </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Key Dates / Alternate Numbers
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" className="add_doc_form" onClick={addDatesFields}>
                                                                <i className="bi bi-plus-lg"></i>
                                                            </button>
                                                        </div>
                                                        {data.key_dates.map((element, index) => (
                                                            <div key={index} style={{marginBottom:'20px'}}>
                                                                {index > 0 ?
                                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                                        <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeDateFields(index)}>
                                                                            <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                ''}
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Key Date Type</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={options_3}
                                                                                name="date_type"
                                                                                onChange={(e) => handleKyDateTypeChange(index, e)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Date</span>
                                                                        <div className="form_group_field">
                                                                            <DatePicker name="date" selected={data.key_dates[index].date} onChange={(date) => handleDateChange(index,'date', date)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form_group_inline">
                                                                    <span className="form_group_label">Remarks</span>
                                                                    <div className="form_group_field">
                                                                        <input type="text" name="remarks" onChange={e => handleKyDateChange(index, e)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div className="inline_form">
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Alternate Number Type</span>
                                                                <div className="form_group_field">
                                                                    <select name="alternate_number_type" defaultValue="" onChange={handleChange}>
                                                                        <option value="" disabled></option>
                                                                        <option>Application Number</option>
                                                                        <option>FDA Listing Number</option>
                                                                        <option>NDC Number</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Alternate Number</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name="alternate_number" onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Remarks</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="remarks" onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Local Agent
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Local Agent Company</span>
                                                            <div className="form_group_field">
                                                                
                                                                <Select options={options}
                                                                    name="local_agent_company"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.local_agent_company)}
                                                                    placeholder=''
                                                                />
                                                                <button className="btn-success" type="button" onClick={(e) => handleShow(e)}>
                                                                <span className="lnr lnr-plus-circle"></span>
                                                            </button>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion >
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Formulations
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Formulation" onClick={addFormulationValues}>
                                                                <i className="bi bi-plus-lg"></i>
                                                            </button>
                                                        </div>
                                                        {data.formulations.map((element, index) => (
                                                            <div key={index}>
                                                                {index > 0 ?
                                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                                        <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeFormulationFields(index)}>
                                                                            <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                    ''}
                                                                <div className="inline_form" >

                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Ingredient</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={options_1}
                                                                                name="ingredient"
                                                                                onChange={(e) => handleSelectIngredientChange(index, e)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Strength Type</span>
                                                                        <div className="form_group_field">
                                                                            <select name="strength_type" defaultValue="" onChange={(e) => handleFormulationsChange(index, e)}>
                                                                                <option value="" disabled></option>
                                                                                <option>approximately</option>
                                                                                <option>average</option>
                                                                                <option>equal</option>
                                                                                <option>not less than</option>
                                                                                <option>q.s ad</option>
                                                                                <option>q.s ad pH 12</option>
                                                                                <option>q.s ad pH 5</option>
                                                                                <option>range</option>
                                                                                <option>up to</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Numerator Lower Val</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="numerator_lower_val" onChange={(e) => handleFormulationsChange(index, e)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Numerator Upper Val</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="numerator_upper_val" onChange={(e) => handleFormulationsChange(index, e)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Numerator Unit</span>
                                                                        <div className="form_group_field">
                                                                            <select name="numerator_unit" defaultValue="" onChange={(e) => handleFormulationsChange(index, e)}>
                                                                                <option value="" disabled></option>
                                                                                <option>% (W/V)</option>
                                                                                <option>% (W/W)</option>
                                                                                <option>IC</option>
                                                                                <option>IR</option>
                                                                                <option>mg</option>
                                                                                <option>ug</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Function</span>
                                                                        <div className="form_group_field">
                                                                            <select name="function" defaultValue="" onChange={(e) => handleFormulationsChange(index, e)}>
                                                                                <option value="" disabled></option>
                                                                                <option>Active</option>
                                                                                <option>Excipient</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion >
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Packagings
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Package" onClick={addPackageValues}>
                                                                <i className="bi bi-plus-lg"></i>
                                                            </button>
                                                        </div>
                                                        {data.packagings.map((element, index) => (
                                                            <div key={index} style={{padding:"10px",marginBottom:'10px' }}>
                                                                
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Packaging Type</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={options_2}
                                                                                name="packaging_type"
                                                                                onChange={(e) => handlePackageTypeSelectChange(index, e)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Packaging Name (*)</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="packaging_name" onChange={(e) => handlePackagingsChange(index, e)} style={{ borderColor: errors['packagings.'+ index +'.packaging_name'] ? 'red' : '' }} />
                                                                        </div>
                                                                        <p className="errors_wrap" style={{ display: errors['packagings.'+ index +'.packaging_name'] ? 'inline-block' : 'none' }}>{errors['packagings.'+ index +'.packaging_name']}</p>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Package Number (*)</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="package_number" onChange={(e) => handlePackagingsChange(index, e)} style={{ borderColor: errors['packagings.'+ index +'.package_number'] ? 'red' : '' }} />
                                                                        </div>
                                                                        <p className="errors_wrap" style={{ display: errors['packagings.'+ index +'.package_number'] ? 'inline-block' : 'none' }}>{errors['packagings.'+ index +'.package_number']}</p>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Description (*)</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="description" onChange={(e) => handlePackagingsChange(index, e)} style={{ borderColor: errors['packagings.'+ index +'.description'] ? 'red' : '' }} />
                                                                        </div>
                                                                        <p className="errors_wrap" style={{ display: errors['packagings.'+ index +'.description'] ? 'inline-block' : 'none' }}>{errors['packagings.'+ index +'.description']}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Launched</span>
                                                                        <div className="form_group_field">
                                                                            <select name="launched" defaultValue="" onChange={(e) => handlePackagingsChange(index, e)}>
                                                                                <option value="" disabled></option>
                                                                                <option>Yes</option>
                                                                                <option>No</option>
                                                                                <option>Not Applicable</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">First Launch Date</span>
                                                                        <div className="form_group_field">
                                                                            {/* <input type="text" name="first_lunch_date" onChange={(e) => handlePackagingsChange(index, e)} /> */}
                                                                            <DatePicker name="first_lunch_date" selected={data.packagings[index].first_lunch_date} onChange={(date) => handleDateChange(index,'first_lunch_date', date)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Packaging Discontinued</span>
                                                                        <div className="form_group_field">
                                                                            <select name="packaging_discontinued" defaultValue="" onChange={(e) => handlePackagingsChange(index, e)}>
                                                                                <option value="" disabled></option>
                                                                                <option>Yes</option>
                                                                                <option>No</option>
                                                                                <option>Not Applicable</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Discontinuation Date</span>
                                                                        <div className="form_group_field">
                                                                            {/* <input type="text" name="discontinuation_date" onChange={(e) => handlePackagingsChange(index, e)} /> */}
                                                                            <DatePicker name="discontinuation_date" selected={data.packagings[index].discontinuation_date} onChange={(date) => handleDateChange(index,'discontinuation_date', date)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                                    <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Package life" onClick={() => addPackagelifeValues(index)}>
                                                                        <i className="bi bi-plus-lg"></i>
                                                                    </button>
                                                                </div>
                                                                {element.packagelif.map((ele, i) => (
                                                                    <div key={i} style={{padding:'20px' }}>
                                                                        <div className="inline_form">
                                                                            <div className="form_group_inline">
                                                                                <span className="form_group_label">Package Shelf-life Type</span>
                                                                                <div className="form_group_field">
                                                                                    <select name="package_shelf_life_type" defaultValue="" onChange={(e) => handlePackagelifeChange(index, i, e)}>
                                                                                        <option value="" disabled></option>
                                                                                        <option>shelf life of the medicinal product as packaged for sale</option>
                                                                                        <option>shelf life after first opening the immediate packaging</option>
                                                                                        <option>shelf life after dilution or reconstitution according to direction</option>
                                                                                        <option>shelf life after incorporation into meal or pelleted feed</option>
                                                                                        <option>shelf life from manufacturing time</option>
                                                                                        <option>shelf life from the activity reference time stated on the label</option>
                                                                                        <option>shelf life in unit-dose dispensing</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form_group_inline">
                                                                                <span className="form_group_label">Shelf Life</span>
                                                                                <div className="form_group_field">
                                                                                    <input name="shelf_life" onChange={(e) => handlePackagelifeChange(index, i, e)} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form_group_inline">
                                                                                <span className="form_group_label">Shelf-life Unit</span>
                                                                                <div className="form_group_field">
                                                                                    <select name="shelf_life_unit" defaultValue="" onChange={(e) => handlePackagelifeChange(index, i, e)}>
                                                                                        <option value="" disabled></option>
                                                                                        <option>Days</option>
                                                                                        <option>Hours</option>
                                                                                        <option>Months</option>
                                                                                        <option>Weeks</option>
                                                                                        <option>Years</option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form_group_inline">
                                                                                <span className="form_group_label">Package Storage Condition</span>
                                                                                <div className="form_group_field">
                                                                                    <Select options={packageCondistion} onChange={(e, key) => handlePackagelifeSelectChange(index, i, e, key)} isMulti name="package_storage_condition" className="basic" classNamePrefix="basic" placeholder='' />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                
                                                            </div>
                                                        ))}
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Indications
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="inline_form">
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Indications (*)</span>
                                                                <div className="form_group_field">
                                                                    <select name="indication" defaultValue="" onChange={handleChange} style={{ borderColor: errors.indication ? 'red' : '' }}>
                                                                        <option value="" disabled></option>
                                                                        <option>10001709 - Allergic Conjunctivitis</option>
                                                                        <option>10056352 - Allergy Test Positive</option>
                                                                        <option>10001728 - Allergic Rhinoconjunctivitis</option>
                                                                        <option>10001705 - Allergic Asthma</option>
                                                                        <option>10001721 - Allergic Reaction To Bee Sting</option>
                                                                        <option>10053462 - Allergy Test</option>
                                                                        <option>10056362 - Allergy Test Negative</option>
                                                                        <option>10003555 - Asthma Bronchial</option>
                                                                        <option>10019170 - Hay Fever</option>
                                                                        <option>10001726 - Allergic rhinitis due to pollen</option>
                                                                        <option>10063482 - Medication Dilution</option>
                                                                        <option>10001722 - Allergic Reaction To Wasp Sting</option>
                                                                        <option>10044314 - Tracheobronchitis</option>
                                                                        <option>10016015 - Eyes tearing</option>
                                                                        <option>10030048 - Ocular itching</option>
                                                                    </select>
                                                                </div>
                                                                <p className="errors_wrap" style={{ display: errors.indication ? 'inline-block' : 'none' }}>{errors.indication}</p>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Paediatric Use</span>
                                                                <div className="form_group_field">
                                                                    <select name="paediatric_use" defaultValue="" onChange={handleChange}>
                                                                        <option value="" disabled></option>
                                                                        <option>Yes</option>
                                                                        <option>No</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form_group_inline" style={{ display: data.paediatric_use == "Yes" ? "" : 'none' }}>
                                                                <span className="form_group_label">Age</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name='age' onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Manufacturing & Supply Chain
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Manufacturer" onClick={addManufacturerFields}>
                                                                <i className="bi bi-plus-lg"></i>
                                                            </button>
                                                        </div>
                                                        {data.manufacturing.map((element, index) => (
                                                            <div key={index}>
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Manufacturer</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={options}
                                                                                name="manufacturer"
                                                                                onChange={(e) => handleManufacturerSelectChange(index, e)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                styles={selectStyles(errors.manufacturer)}
                                                                                placeholder=''
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Operation Type</span>
                                                                        <div className="form_group_field">
                                                                            <Select className="basic" name="operation_type" onChange={(e, key) => handleOperationTypeChange(index, e, key)} classNamePrefix="basic" options={operations} isMulti placeholder='' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Status
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Status" onClick={addStatusesFields}>
                                                                <i className="bi bi-plus-lg"></i>
                                                            </button>
                                                        </div>
                                                        {data.statuses.map((element, index) => (
                                                            <div key={index}>
                                                                {index > 0 ?
                                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                                        <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
                                                                            <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                ''}
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Status (*)</span>
                                                                        <div className="form_group_field">
                                                                            <select name="status" defaultValue="" onChange={(e) => handleStatusesChange(index, e)} style={{ borderColor: errors['statuses.'+ index +'.status'] ? 'red' : '' }}>
                                                                                <option value="" disabled></option>
                                                                                <option>Application / Submitted</option>
                                                                                <option>Approval / Obtained</option>
                                                                                <option>Application / Rejected</option>
                                                                                <option>Application / Withdrawn by MAH due to Safety/Efficacy</option>
                                                                                <option>Application / Withdrawn by MAH not due Safety/Efficacy</option>
                                                                                <option>Marketing Application / Dispatched To Local RA</option>
                                                                                <option>Application / Validated (administrative / technical admissibility)</option>
                                                                                <option>Assessment report / received</option>
                                                                                <option>Dossier Update / Submitted</option>
                                                                                <option>eCTD Dossier Update / Submitted</option>
                                                                                <option>Marketing / Launched</option>
                                                                                <option>Marketing / Discontinued</option>
                                                                                <option>Application / Dispatch Planned</option>
                                                                                <option>Application / Submission Planned</option>
                                                                                <option>Application / Approval Expected</option>
                                                                                <option>Dossier Update / Submission Planned</option>
                                                                                <option>eCTD Dossier Update / Submission Planned</option>
                                                                                <option>Application / Submission of dossier update to RMS planned</option>
                                                                                <option>Application / Dossier update submitted to CMS</option>
                                                                                <option>Application / Submission to CMS Planned</option>
                                                                                <option>MRP Application / Dossier update submitted to CMS</option>
                                                                                <option>National Translations / Submitted</option>
                                                                                <option>Application / List of dispatch dates submitted</option>
                                                                                <option>Application / Start of procedure expected</option>
                                                                                <option>MRP Application / Procedure started</option>
                                                                                <option>Applicaton / CMS comments expected</option>
                                                                                <option>Application / / CMS comments received</option>
                                                                                <option>Assessment Report / Expected</option>
                                                                                <option>MRP Assessment Report / Received</option>
                                                                                <option>Positive Opinion / Obtained</option>
                                                                                <option>MRP Application / End of procedure</option>
                                                                            </select>
                                                                        </div>
                                                                        <p className="errors_wrap" style={{ display: errors['statuses.'+ index +'.status'] ? 'inline-block' : 'none' }}>{errors['statuses.'+ index +'.status']}</p>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Status Date (*)</span>
                                                                        <div className="form_group_field">
                                                                            <DatePicker name="status_date" selected={data.statuses[index].status_date} onChange={(date) => handleDateChange(index,'status_date', date)} />
                                                                        </div>
                                                                        <p className="errors_wrap" style={{ display: errors['statuses.'+ index +'.status_date'] ? 'inline-block' : 'none' }}>{errors['statuses.'+ index +'.status_date']}</p>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">eCTD Sequence</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="ectd_sequence" onChange={(e) => handleStatusesChange(index, e)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Change Control Ref</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="change_control_ref" onChange={(e) => handleStatusesChange(index, e)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Internal Submission Reference</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="internal_submission_reference" onChange={(e) => handleStatusesChange(index, e)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form_group_inline">
                                                                    <span className="form_group_label">Remarks</span>
                                                                    <div className="form_group_field">
                                                                        <input type="text" name="sremarks" onChange={(e) => handleStatusesChange(index, e)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Tab>
                                    <Tab eventKey="second" title="Documents">
                                        <Documents handleChanged={handleDocumentChange} addFormFields={addFormFields} formValues={data.doc} />
                                    </Tab>
                                    
                                </Tabs>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-button">
                                        <button style={{ width: '80px' }} type="submit" className="btn btn-primary" name="submit" disabled={processing}>Submit</button>
                                    </div>
                                    <div className="form-button">
                                        <button type="submit" style={{ width: '80px', marginLeft: '10px' }} className="btn btn-primary" name="draft" disabled={processing}>Draft</button>
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
                <ModalS show={show} handleClose={handleClose} />
            </div>
            
        </>
    )
}

Index.layout = page => <Authenticated children={page} auth={page.props.auth} />

export default Index;