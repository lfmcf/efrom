import React, {useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from '@inertiajs/inertia-react';
import Documents from '@/Layouts/Documents';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Clinical = (props) => {

    const { data, setData, post, processing, errors, clearErrors,  reset } = useForm({
        procedure_type: '',
        country: [],
        rms: '',
        procedure_number: '',
        product_type: '',
        application_stage: '',
        product_name: '',
        registration_title: '',
        protocol_number: '',
        study_sponsor: '',
        full_study_title: '',
        remarks: '',
        protocol_type: '',
        clinical_phase: '',
        authorized_pharmaceutical_form: '',
        route_of_admin: '',
        atc: '',
        indication: '',
        paediatric_use: '',
        manufacturing: [{manufacturer:'',operation_type:[]}],
        statuses: [{status:'',status_date:'',ectd_sequence:'',change_control_ref:'',internal_submission_reference:'',remarks:''}],
        doc: [{document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: ''}],
        created_by: props.auth.user.id,
    });

    const countryRef = React.useRef();

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
    

    let options = props.companies.map(function (companie) {
        return {
            value: companie.name + " - " + companie.city  + " - " + companie.countryname,
            label: companie.name + " - " + companie.city + " - " + companie.countryname
        };
    })

    let options_4 = props.countries.map(function (country) {
        return { value: country.country_name , label: country.country_name };
    })

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
   
    
    const handleSelectChange = (e, name) => {
        setData(name.name, e.value)
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

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
    }

    let addFormFields = () => {
        let arr = {...data};
        arr.doc.push({document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: ''});
        setData(arr);
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

    let handleManufacturerSelectChange = (index, e) => {
        let newFormValues = {...data};
        newFormValues.manufacturing[index]['manufacturer'] = e.value;
        setData(newFormValues);
    }

    let handleStatusesChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.statuses[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('statuses.'+i+'.'+e.target.name)
    }

    let handleDateChange = (i,name, e) => {
        let arr = {...data};
        arr.statuses[i][name] = e;
        setData(arr);
        clearErrors('statuses.'+i+'.'+name)
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

    let handleDocumentChange = (i, e) => {
        let arr = {...data};
        if(e.target.name === "document" ) {
            arr.doc[i][e.target.name] = e.target.files[0];
        }else {
            arr.doc[i][e.target.name] = e.target.value; 
        }
        setData(arr);
    }

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitType = window.event.submitter.name;
        post(route('storeclinical', {'type': submitType}));
    }


    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">registration creation - clinical</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card main-card">
                        <div className="card-body">
                            <form className="form" onSubmit={handleSubmit}>
                                <Tabs defaultActiveKey="first">
                                    <Tab eventKey="first" title="New registration">
                                        <Accordion style={{ marginTop: '20px' }} defaultActiveKey="0">
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
                                                                        <option value="National (NP)">National (NP)</option>
                                                                        <option value="Centralized (NP)">Centralized (NP)</option>
                                                                        <option value="Mutual Recognition">Mutual Recognition</option>
                                                                        <option value="Decentralized">Decentralized</option>
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
                                                                        placeholder=''
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
                                                        <div className='inline_form'>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Product name (*)</span>
                                                                <div className="form_group_field">
                                                                    <select defaultValue='' name='product_name' onChange={handleChange} style={{ borderColor: errors.product_name ? 'red' : '' }} >
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
                                                                <p className="errors_wrap" style={{ display: errors.product_name ? 'inline-block' : 'none' }}>{errors.product_name}</p>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Registration Title</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name="registration_title" onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Protocol Number</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name="protocol_number" onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='inline_form'>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Study Sponsor</span>
                                                                <div className="form_group_field">
                                                                    <select name="study_sponsor" onChange={handleChange}></select>
                                                                </div>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Full Study Title</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name="full_study_title" onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Remarks</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name="remarks" onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='inline_form'>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Protocol Type</span>
                                                                <div className="form_group_field">
                                                                    <select name="protocol_type" defaultValue='' onChange={handleChange}>
                                                                        <option value=''></option>
                                                                        <option>Dose Response</option>
                                                                        <option>Efficacy</option>
                                                                        <option>Safety</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Clinical Phase</span>
                                                                <div className="form_group_field">
                                                                    <select name="clinical_phase" onChange={handleChange}>

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
                                                    Dosages Form
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className='inline_form'>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Authorized Pharmaceutical Form (*)</span>
                                                                <div className="form_group_field">
                                                                    <select name="authorized_pharmaceutical_form" defaultValue='' onChange={handleChange} style={{ borderColor: errors.authorized_pharmaceutical_form ? 'red' : '' }}>
                                                                        <option value='' disabled></option>
                                                                        <option>powder</option>
                                                                        <option>solution</option>
                                                                        <option>eye drops</option>
                                                                        <option>nebuliser solution</option>
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
                                                                <span className="form_group_label">Route Of Admin (*)</span>
                                                                <div className="form_group_field">
                                                                    <select name="route_of_admin" defaultValue='' onChange={handleChange} style={{ borderColor: errors.route_of_admin ? 'red' : '' }}>
                                                                        <option value='' disabled></option>
                                                                        <option>cutaneous use</option>
                                                                        <option>intrademal use</option>
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
                                                                    <select name="atc" defaultValue='' onChange={handleChange} style={{ borderColor: errors.atc ? 'red' : '' }}>
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
                                                    Indications
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className='inline_form'>
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Indications (*)</span>
                                                                <div className="form_group_field">
                                                                    <select name="indication" defaultValue='' onChange={handleChange} style={{ borderColor: errors.indication ? 'red' : '' }}>
                                                                        <option value='' disabled></option>
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
                                                                <span className="form_group_label">Paediatric use</span>
                                                                <div className="form_group_field">
                                                                    <select name="paediatric_use" defaultValue='' onChange={handleChange}>
                                                                        <option value='' disabled></option>
                                                                        <option>Yes</option>
                                                                        <option>No</option>
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
                                                                        <input type="text" name="remarks" onChange={(e) => handleStatusesChange(index, e)} />
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
                                        <button style={{ width: '100px' }} type="submit" className="btn_submit btn btn-primary" name="submit" disabled={processing}>Submit</button>
                                    </div>
                                    <div className="form-button">
                                        <button type="submit" style={{ width: '100px', marginLeft: '10px' }} className="btn_submit btn btn-primary" name="draft" disabled={processing}>Draft</button>
                                    </div>
                                    <div className="form-button">
                                        <button type="submit" style={{ width: '100px', marginLeft: '10px' }} className="btn btn-danger" name="reset" disabled={processing}>Reset</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Clinical.layout = page => <Authenticated children={page} auth={page.props.auth} />

export default Clinical;