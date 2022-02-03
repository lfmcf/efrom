import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import Select from 'react-select';
import Documents from "@/Layouts/Documents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {product_name, procedure_type, status } from '@/Components/List';

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

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

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

    // const handleIdentificationProductChange = (i, e) => {
    //     let arr = {...data}
    //     arr.identification[i][e.target.name] = e.target.value
    //     setData(arr);
        
    // }

    let handleIdentificationSelectChange = (i, e, name) => {
        let arr = {...data}
        arr.identification[i][name] = e.value;
        setData(arr);
    }

    let handleVariationSelectChange = (i, e, name) => {
        let arr = {...data}
        arr.variation[i][name] = e.value;
        setData(arr);
        clearErrors('variation.' + i + '.' + name)
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

    let handleStatusSelectChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.statuses[i]['status'] = e.value;
        setData(newFormValues);
        clearErrors('statuses.'+i+'.status')
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <Tabs defaultActiveKey="first">
                <Tab eventKey="first" title="New Variation">
                    <Accordion defaultActiveKey="0" style={{ marginTop: '20px' }}>
                        <div className="card_title" style={{ marginBottom: '20px' }}>
                            {/* <h5>First Submission</h5> */}
                            <h5 className="subhead">All fields marked with * are required</h5>
                        </div>
                        
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Registration Identification
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
                                                    <span className="form_group_label">Product Name</span>
                                                    <div className="form_group_field">
                                                        {/* <select name="product" defaultValue="" onChange={(e) => handleIdentificationProductChange(index, e)}>
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
                                                        </select> */}
                                                        <Select options={product_name}
                                                            name="product"
                                                            onChange={(e) => handleIdentificationSelectChange(index, e, 'product')}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            // styles={selectStyles(errors.product_name)}
                                                            placeholder=''
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Procedure Type</span>
                                                    <div className="form_group_field">
                                                        {/* <select name="procedure_type" defaultValue="" onChange={e => handleprocedureChange(index, e)}>
                                                            <option value=""></option>
                                                            <option>National</option>
                                                            <option>Centralized</option>
                                                            <option>Decentralized</option>
                                                            <option>Mutual Recognition</option>
                                                        </select> */}
                                                        <Select options={procedure_type}
                                                            name="procedure_type"
                                                            onChange={(e) => handleIdentificationSelectChange(index, e, 'procedure_type')}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                        />
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
                                                        {/* <select defaultValue="" name='application_stage' onChange={(e) => handlIdentificationeChange(index, e)} >
                                                            <option value="" ></option>
                                                            <option>Marketing Authorisation</option>
                                                            <option>APSI / NPP</option>
                                                        </select> */}
                                                        <Select options={[
                                                            { value: 'Marketing Authorisation', label: 'Marketing Authorisation' },
                                                            { value: 'APSI / NPP', label: 'APSI / NPP' },
                                                        ]}
                                                            name="application_stage"
                                                            onChange={(e) => handleIdentificationSelectChange(index, e, 'application_stage')}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                        // styles={selectStyles(errors.application_stage)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Product Type</span>
                                                    <div className="form_group_field">
                                                        {/* <select defaultValue='' name='product_type' onChange={(e) => handlIdentificationeChange(index, e)}>
                                                            <option value='' ></option>
                                                            <option>Finished</option>
                                                            <option>Reference</option>
                                                        </select> */}
                                                        <Select options={[
                                                            { value: 'Finished', label: 'Finished' },
                                                            { value: 'References', label: 'References' },
                                                        ]}
                                                            name="product_type"
                                                            onChange={(e) => handleIdentificationSelectChange(index, e, 'product_type')}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                        // styles={selectStyles(errors.product_type)}
                                                        />
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
                                                        
                                                        <Select options={[
                                                            { value: 'Variation/Supplement', label: 'Variation/Supplement' },
                                                            { value: 'FUM', label: 'FUM' },
                                                        ]}
                                                            name="category"
                                                            onChange={(e) => handleVariationSelectChange(index, e, 'category')}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                            styles={selectStyles(errors['variation.' + index + '.category'])}
                                                        />
                                                    </div>
                                                    <p className="errors_wrap" style={{ display: errors['variation.' + index + '.category'] ? 'inline-block' : 'none' }}>{errors['variation.' + index + '.category']}</p>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Variation Type</span>
                                                    <div className="form_group_field">
                                                       
                                                        <Select options={[
                                                            { value: 'Variation/Supplement', label: 'Variation/Supplement' },
                                                            { value: 'FUM', label: 'FUM' },
                                                        ]}
                                                            name="variation_type"
                                                            onChange={(e) => handleVariationSelectChange(index, e, 'variation_type')}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                        // styles={selectStyles(errors.product_type)}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Reason for variation</span>
                                                    <div className="form_group_field">
                                                        
                                                        <Select options={[
                                                            { value: 'Indication', label: 'Indication' },
                                                            { value: 'Paediatric Indication', label: 'Paediatric Indication' },
                                                            { value: 'Safety', label: 'Safety' },
                                                            { value: 'Following Urgent Safety Restriction', label: 'Following Urgent Safety Restriction' },
                                                            { value: 'Quality', label: 'Quality' },
                                                            { value: 'Others', label: 'Others' },
                                                        ]}
                                                            name="variation_reason"
                                                            onChange={(e) => handleVariationSelectChange(index, e, 'variation_reason')}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                        // styles={selectStyles(errors.product_type)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Submission Type (*)</span>
                                                    <div className="form_group_field">
                                                       
                                                        <Select options={[
                                                            { value: 'CARDEAC', label: 'CARDEAC' },
                                                            { value: 'Initial MAA', label: 'Initial MAA' },
                                                            { value: 'Safety', label: 'Safety' },
                                                            { value: 'NPP-Initial', label: 'NPP-Initial' },
                                                        ]}
                                                            name="submission_type"
                                                            onChange={(e) => handleVariationSelectChange(index, e, 'submission_type')}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                            styles={selectStyles(errors['variation.' + index + '.submission_type'])}
                                                        />
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
                                                        
                                                        <Select options={[
                                                            { value: 'CTD', label: 'CTD' },
                                                            { value: 'Nees', label: 'Nees' },
                                                            { value: 'eCTD', label: 'eCTD' },
                                                            { value: 'briefing Book', label: 'briefing Book' },
                                                            { value: 'Drug Master File', label: 'Drug Master File' },
                                                        ]}
                                                            name="submission_format"
                                                            onChange={(e) => handleVariationSelectChange(index, e, 'submission_format')}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                        // styles={selectStyles(errors.product_type)}
                                                        />
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
                                Status Details
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
                                                                    return <option value={ele.product} key={i}>{ele.product} - {ele.procedure_type}</option>
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
                                                        <Select options={status}
                                                            onChange={(e) => handleStatusSelectChange(index, e)}
                                                            name="status"
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            styles={selectStyles(errors['statuses.' + index + '.status'])}
                                                            placeholder=''
                                                        />
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
                                                        <DatePicker  name="actual_implementation" selected={data.statuses[index].actual_implementation} onChange={(date) => handleDateChange(index, 'actual_implementation', date)} />
                                                        {/* <input type="text" name="actual_implementation" onChange={e => handleStatusChange(index, e)} /> */}
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
            <div style={{ display: 'flex' , width:'80%' }}>
                <div className="form-button">
                    <button style={{ width: '100px' }} type="submit" className="btn_submit btn btn-primary" name="submit" disabled={processing}>Submit</button>
                </div>
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