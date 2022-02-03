import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import Select from 'react-select';
import Documents from "@/Layouts/Documents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Hqproject = (props) => {

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        identification: [{product: "", procedure_type: "", country: [], application_stage: "", rms: "", procedure_num: "", local_tradename: "", product_type: ""}],
        variation: [{product: "",country:"",category: "", variation_type: "", submission_type: "", application_number: "", submission_number: "", submission_format: "", variation_reason: ""}],
        statuses: [{product: "",country:"",status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "", implimentation_deadline: "", actual_implementation: ""}],
        doc: [{document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: ''}],
        isHq: true,
        created_by: props.user.id,
    });

    const [variationcountries, setVariationCountries] = useState([]);
    const [statuscountries, setStatusContries] = useState([]);

    const selectInputRef = React.useRef({});
    const ctrRef = React.useRef({});

    let addProductFields = () => {
        let arr = {...data};
        arr.identification.push({product: "", procedure_type: "", country: [], application_stage: "", rms: "", procedure_num: "", local_tradename: "", product_type: ""});
        setData(arr);
    }

    let addVariationFields = () => {
        let arr = {...data};
        arr.variation.push({product: "",country:"",category: "", variation_type: "", submission_type: "", application_number: "", submission_number: "", submission_format: "", variation_reason: ""});
        setData(arr);
    }

    let addStatusFields = () => {
        let arr = {...data};
        arr.statuses.push({product: "",country:"",status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "", implimentation_deadline: "", actual_implementation: ""});
        setData(arr);
    }

    let removeProductFields = (i) => {
        let newFormValues = {...data}
        newFormValues.identification.splice(i, 1);
        setData(newFormValues)
    }

    let removeVariationFields = (i) => {
        let newFormValues = {...data}
        newFormValues.variation.splice(i, 1);
        setData(newFormValues);
    }

    let removeStatusFields = (i) => {
        let newFormValues = {...data}
        newFormValues.statuses.splice(i, 1);
        setData(newFormValues);
    }

    let addFormFields = () => {
        let arr = {...data};
        arr.doc.push({document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: ''});
        setData(arr);
    }

    let contries = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    });

    const handlIdentificationeChange = (i, e) => {
        let arr = {...data}
        arr.identification[i][e.target.name] = e.target.value
        setData(arr);
        
    }

    const handleIdentificationProductChange = (i, e) => {
        let arr = {...data}
        arr.identification[i][e.target.name] = e.target.value
        setData(arr);
        // setStatusContries([])
    }

    const handleVariationChange = (i, e) => {
        let arr = {...data}
        arr.variation[i][e.target.name] = e.target.value
        setData(arr);
        clearErrors('variation.'+i+'.'+e.target.name);
    }

    const handleStatusChange = (i, e) => {
        let arr = {...data}
        arr.statuses[i][e.target.name] = e.target.value
        setData(arr);
        clearErrors('statuses.'+i+'.'+e.target.name);
    }

   
    let handleCountryChange = (i, e, k) => {
        let arr = {...data}
        if (k.action) {
            if(k.action == 'select-option')
            {
                if (e.length > 0) {
                    arr.identification[i].country.push(k.option.value)
                } else {
                    arr.identification[i].country.push(e.value)
                }
            }else if (k.action == 'remove-value') {
                let newarr = arr.identification[i].country.filter((ele) => {
                    return ele != k.removedValue.value
                });
                arr.identification[i].country = newarr;
            }else {
                arr.identification[i].country.length = 0
            } 
        }
        setData(arr)
    }

    let handleChanged = (i, e) => {
        let newFormValues = [...prductValues];
        newFormValues[i][e.target.name] = e.target.value;
        setData("identification", newFormValues);
    }

    let handleDateChange = (i,name, e) => {
        let arr = {...data};
        arr.statuses[i][name] = e;
        setData(arr);
        clearErrors('statuses.'+i+'.'+name)
    }

    const handleprocedureChange = (i, e) => {
        let newFormValues = {...data};
        selectInputRef.current[i].setValue([]);
        newFormValues.identification[i]["country"] = [];
        newFormValues.identification[i]["procedure_type"] = e.target.value;
        setData(newFormValues);
    }

    const handleSelectChange = (i, name) => {
        let newFormValues = {...data};
        if (name.length > 0 && name) {
            newFormValues.identification[i]["rms"] = name;
        } else {
            newFormValues.identification[i]["rms"] = name.value;
        }
        setData(newFormValues);
    }

    const handleVariationProductChange = (i, e) => {
        let arr = {...data}
        arr.variation[i][e.target.name] = e.target.value
        setData(arr);
        data.identification.map(ele => {
            if (ele.product === e.target.value) {
                setVariationCountries([{id: i, country:ele.country}])
            }
        })
        
    }
    
    const StatusProductChange = (i, e) => {
        let arr = {...data}
        arr.statuses[i][e.target.name] = e.target.value
        setData(arr);
        data.identification.map(ele => {
            if (ele.product === e.target.value) {
                setStatusContries([{id: i, country:ele.country}])
            }
        })
    }

    const CountryStatusEventChange = (i, e) => {
        let arr = {...data}
        arr.statuses[i][e.target.name] = e.target.value
        setData(arr);
    }

    const handleDocumentdate = (i, date) => {
        let arr = {...data};
        arr.doc[i].version_date = date
        setData(arr);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let submitType = window.event.submitter.name;
        post(route("storehqproject", {'type': submitType}));
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <Tabs defaultActiveKey="first">
                <Tab eventKey="first" title="Form">
                    <Accordion defaultActiveKey="0" style={{ marginTop: '20px' }}>
                        <div className="card_title" style={{ marginBottom: '20px' }}>
                            {/* <h5>First Submission</h5> */}
                            <h5 className="subhead">All fields markedd with * are required</h5>
                        </div>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Registration identification
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0" >
                                <Card.Body>
                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                        <button type="button" className="add_doc_form" onClick={addProductFields}>
                                            <i className="bi bi-plus-lg"></i> Add Registration
                                        </button>
                                    </div>
                                    {data.identification.map((element, index) => (
                                        <fieldset>
                                         <legend>Registration 1</legend>
                                        <div key={index}>
                                            {index > 0 ?
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <button type='button' style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeProductFields(index)}>
                                                        <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                    </button>
                                                </div>
                                                :
                                            ''}
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Product</span>
                                                    <div className="form_group_field">
                                                        <select name="product" defaultValue="" onChange={(e) => handleIdentificationProductChange(index, e)}>
                                                            <option value=""></option>
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
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Procedure Type</span>
                                                    <div className="form_group_field">
                                                        <select name="procedure_type" defaultValue="" onChange={e => handleprocedureChange(index, e)}>
                                                            <option value=""></option>
                                                            <option>National</option>
                                                            <option>Centralized</option>
                                                            <option>Decentralized</option>
                                                            <option>Mutual Recognition</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Country</span>
                                                    <div className="form_group_field">
                                                        <Select options={contries}
                                                            name="country"
                                                            onChange={(e, k) => handleCountryChange(index, e, k)}
                                                            className="basic"
                                                            isMulti={data.identification[index].procedure_type === "Decentralized" || data.identification[index].procedure_type === "Mutual Recognition" ? true : false}
                                                            classNamePrefix="basic"
                                                            ref={ele => selectInputRef.current[index] = ele}
                                                            id={index}
                                                            placeholder=''
                                                        // styles={selectStyles(errors.registration_holder)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline" style={{ display: data.identification[index].procedure_type === "Decentralized" || data.identification[index].procedure_type === "Mutual Recognition" ? '' : 'none' }}>
                                                    <span className="form_group_label">RMS</span>
                                                    <div className="form_group_field">
                                                        <Select options={contries}
                                                            name="rms"
                                                            onChange={e => handleSelectChange(index, e)}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                        // styles={selectStyles(errors.registration_holder)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Procedure Number</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name='procedure_num' onChange={(e) => handlIdentificationeChange(index, e)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Local Tradename</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name='local_tradename' onChange={(e) => handlIdentificationeChange(index, e)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Application Stage</span>
                                                    <div className="form_group_field">
                                                        <select defaultValue="" name='application_stage' onChange={(e) => handlIdentificationeChange(index, e)} >
                                                            <option value="" ></option>
                                                            <option>Marketing Authorisation</option>
                                                            <option>APSI / NPP</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Product Type</span>
                                                    <div className="form_group_field">
                                                        <select defaultValue='' name='product_type' onChange={(e) => handlIdentificationeChange(index, e)}>
                                                            <option value='' ></option>
                                                            <option>Finished</option>
                                                            <option>Reference</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </fieldset>
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Variation Details
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0" >
                                <Card.Body>
                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                        <button type="button" className="add_doc_form" onClick={addVariationFields}>
                                            <i className="bi bi-plus-lg"></i>Add Variation
                                        </button>
                                    </div>
                                    {data.variation.map((element, index) => (
                                        <fieldset>
                                            <legend>Variation 1</legend>
                                       
                                        <div key={index}>
                                            {index > 0 ?
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <button style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeVariationFields(index)}>
                                                        <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                    </button>
                                                </div>
                                                : ''}
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Product</span>
                                                    <div className="form_group_field">
                                                        <select name='product' onChange={(e) => handleVariationProductChange(index, e)} defaultValue='' >
                                                            <option defaultValue=''></option>
                                                            {data.identification.map((ele, i) => {
                                                                if (ele.product) {
                                                                    return <option value={ele.product} key={i}>{ele.product}</option>
                                                                }
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Country</span>
                                                    <div className="form_group_field">
                                                        <select defaultValue='' name='country' onChange={(e) => handleVariationChange(index, e)} >
                                                            <option defaultValue=''></option>
                                                            {variationcountries.map(s => (
                                                                s.id == index ? 
                                                                <React.Fragment key={s.id}>
                                                                <option value="All">All</option>
                                                                
                                                                {s.country.map(country => (
                                                                    <option value={country} key={country}>{country}</option>
                                                                ))}
                                                                </React.Fragment>
                                                                : ""
                                                            ))}        
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Variation Title</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name='variation_title' onChange={(e) => handleVariationChange(index, e)} />
                                                    </div>

                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Variation Category (*)</span>
                                                    <div className="form_group_field">
                                                        <select defaultValue="" name='category' onChange={(e) => handleVariationChange(index, e)} style={{ borderColor: errors['variation.' + index + '.category'] ? 'red' : '' }}>
                                                            <option value=""></option>
                                                            <option>Variation/Supplement</option>
                                                            <option>FUM</option>
                                                            
                                                        </select>
                                                    </div>
                                                    <p className="errors_wrap" style={{ display: errors['variation.' + index + '.category'] ? 'inline-block' : 'none' }}>{errors['variation.' + index + '.category']}</p>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Variation Type</span>
                                                    <div className="form_group_field">
                                                        <select defaultValue="" name='variation_type' onChange={(e) => handleVariationChange(index, e)}>
                                                            <option value=""></option>
                                                            <option>Prior Authorisation (II)</option>
                                                            <option>Do and Tell Immediate (IAIN Immediate Notification)</option>
                                                            <option>Do and Tell Later (IA)</option>
                                                            <option>Tell, Wait and Do (IB)</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Reason for variation</span>
                                                    <div className="form_group_field">
                                                        <select defaultValue="" name='variation_reason' onChange={(e) => handleVariationChange(index, e)}>
                                                            <option value="" ></option>
                                                            <option>Indication</option>
                                                            <option>Paediatric Indication</option>
                                                            <option>Safety</option>
                                                            <option>Following Urgent Safety Restriction</option>
                                                            <option>Quality</option>
                                                            <option>Others</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Submission Type (*)</span>
                                                    <div className="form_group_field">
                                                        <select defaultValue="" name='submission_type' onChange={(e) => handleVariationChange(index, e)} style={{ borderColor: errors['variation.' + index + '.submission_type'] ? 'red' : '' }}>
                                                            <option value="" ></option>
                                                            <option>CARDEAC</option>
                                                            <option>Initial MAA</option>
                                                            <option>NPP-Initial</option>
                                                        </select>
                                                    </div>
                                                    <p className="errors_wrap" style={{ display: errors['variation.' + index + '.submission_type'] ? 'inline-block' : 'none' }}>{errors['variation.' + index + '.submission_type']}</p>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Applcation N°</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name='application_number' onChange={(e) => handleVariationChange(index, e)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Submission/Procedure N°</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name='submission_number' onChange={(e) => handleVariationChange(index, e)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Dossier Submission Format</span>
                                                    <div className="form_group_field" >
                                                        <select defaultValue="" name='submission_format' onChange={(e) => handleVariationChange(index, e)}>
                                                            <option value=""></option>
                                                            <option>CTD</option>
                                                            <option>Nees</option>
                                                            <option>eCTD</option>
                                                            <option>briefing Book</option>
                                                            <option>Drug Master File</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        </fieldset>
                                    ))}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Event Status
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0" >
                                <Card.Body>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                        <button type="button" className="add_doc_form" onClick={addStatusFields}>
                                            <i className="bi bi-plus-lg"></i> Add Status
                                        </button>
                                    </div>
                                    
                                    {data.statuses.map((element, index) => (
                                    <fieldset>
                                        <legend>Statut 1</legend>
                                    
                                        <div key={index}>
                                            {index > 0 ?
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <button type='button' style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
                                                        <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                    </button>
                                                </div>
                                            : ''}
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Product</span>
                                                    <div className="form_group_field">
                                                        <select name='product' onChange={(e) => StatusProductChange(index, e)} defaultValue='' >
                                                            <option value=''></option>
                                                            {data.identification.map((ele, i) => {
                                                                if(ele.product) {
                                                                    return <option value={ele.product} key={i}>{ele.product}</option>
                                                                }
                                                                
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Country</span>
                                                    <div className="form_group_field">
                                                        <select defaultValue='' name='country' onChange={(e) => CountryStatusEventChange(index, e)}>
                                                            <option value=''></option>
                                                            {statuscountries.map(s => (
                                                                s.id == index ? 
                                                                <React.Fragment key={s.id}>
                                                                <option value="All">All</option>
                                                                
                                                                {s.country.map(country => (
                                                                    <option value={country} key={country}>{country}</option>
                                                                ))}
                                                                </React.Fragment>
                                                                : ""
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Status (*)</span>
                                                    <div className="form_group_field">
                                                        <select name="status" defaultValue='' onChange={e => handleStatusChange(index, e)}>
                                                            <option value=""></option>
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
                                                    <p className="errors_wrap" style={{ display: errors['statuses.' + index + '.status'] ? 'inline-block' : 'none' }}>{errors['statuses.' + index + '.status']}</p>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Status Date (*)</span>
                                                    <div className="form_group_field">
                                                        <DatePicker name="status_date" selected={data.statuses[index].status_date} onChange={(date) => handleDateChange(index, 'status_date', date)} style={{ borderColor: errors['statuses.' + index + '.status_date'] ? 'red' : '' }} />
                                                    </div>
                                                    <p className="errors_wrap" style={{ display: errors['statuses.' + index + '.status_date'] ? 'inline-block' : 'none' }}>{errors['statuses.' + index + '.status_date']}</p>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">eCTD sequence</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="ectd" onChange={e => handleStatusChange(index, e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Change Control or pre-assessment</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="control" onChange={e => handleStatusChange(index, e)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">CCDS/Core PIL ref n°</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="cdds" onChange={e => handleStatusChange(index, e)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Remarks</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="remarks" onChange={e => handleStatusChange(index, e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Planned Local implementation Date</span>
                                                    <div className="form_group_field">
                                                        <DatePicker name="local_implementation" selected={data.statuses[index].local_implementation} onChange={(date) => handleDateChange(index, 'local_implementation', date)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">HA Implimentation Deadline</span>
                                                    <div className="form_group_field">
                                                        <DatePicker name="implimentation_deadline" selected={data.statuses[index].implimentation_deadline} onChange={(date) => handleDateChange(index, 'implimentation_deadline', date)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Actual Local Implementation</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="actual_implementation" onChange={e => handleStatusChange(index, e)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </fieldset>
                                    ))}

                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Tab>
                <Tab eventKey="second" title="Documents">
                    <Documents handleChanged={handleChanged} handleDocumentdate={handleDocumentdate} addFormFields={addFormFields} formValues={data.doc} />
                </Tab>
            </Tabs>
            <div style={{display:'flex'}}>
                <div className="form-button">
                    <button style={{width:'80px'}} type="submit" className="btn_submit btn btn-primary" name="submit" disabled={processing}>Submit</button>
                </div>
                <div className="form-button">
                    <button type="submit" style={{width:'100px'}} className="btn_submit btn btn-primary" name="draft" disabled={processing}>Save</button>
                </div>
                <div className="form-button">
                                        <button style={{ width: '100px' }} type="reset" className="btn_close btn btn-danger" name="Reset" disabled={processing}>Reset</button>
                                    </div>
            </div>
        </form>
    )
}

export default Hqproject;