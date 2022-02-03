import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';
import Documents from "@/Layouts/Documents";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {key_dates_list, operations, packageCondistion, product_name, procedure_type, apf, atc, SlType,indications, status } from '@/Components/List';

const Nohqproject = (props) => {
    
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        product: '',
        procedure_type: '',
        country: [],
        rms: '',
        application_stage: '',
        procedure_num: '',
        local_tradename: '',
        product_type: '',
        variation_title: '',
        category: '',
        variation_type: '',
        submission_type: '',
        application_number: '',
        submission_number: '',
        submission_format: '',
        variation_reason: '',
        statuses: [{country:'',status: '',status_date: '',ectd: '',control: '',cdds: '',remarks: '',local_implementation: '',implimentation_deadline: '',actual_implementation: ''}],
        doc: [{document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: ''}],
        isHq: false,
        created_by: props.user.id,
    });

    const countryRef = React.useRef();

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    let addStatusFields = () => {
        let newArr = {...data};
        newArr.statuses.push({country:'',status:'',status_date:'',ectd_sequence:'',change_control_ref:'',internal_submission_reference:'',remarks:''});
        setData(newArr);
    }

    let removeStatusFields = (i) => {
        let newArr = {...data};
        newArr.statuses.splice(i, 1);
        setData(newArr);
    }

    let addFormFields = () => {
        let arr = {...data};
        arr.doc.push({document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: ''});
        setData(arr);
    }

    let contries = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
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

    const handleSelectChange = (e, name) => {
        setData(name.name, e.value)
        clearErrors(name.name)
    }

    let handleStatusChanged = (i, e) => {
        let newFormValues = {...data};
        newFormValues.statuses[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('statuses.'+i+'.'+e.target.name);
    }

    let handleStatusSelectChange = (i, e) => {
        let newFormValues = {...data};
        newFormValues.statuses[i]['status'] = e.value;
        setData(newFormValues);
        clearErrors('statuses.'+i+'.status')
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

    let handleDateChange = (i,name, e) => {
        let arr = {...data};
        arr.statuses[i][name] = e;
        setData(arr);
        clearErrors('statuses.'+i+'.'+name)
    }

    const handleDocumentdate = (i, date) => {
        let arr = {...data};
        arr.doc[i].version_date = date
        setData(arr);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitType = window.event.submitter.name;
        post(route("storevariation", {'type': submitType}));
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
                                    <div className="inline_form">
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Product Name</span>
                                            <div className="form_group_field">
                                                
                                                <Select options={product_name}
                                                    name="product"
                                                    onChange={handleSelectChange}
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
                                               
                                                <Select options={procedure_type}
                                                    name="procedure_type"
                                                    onChange={handleSelectChange}
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
                                                    onChange={(e, k) => handleCountryChange(e, k)}
                                                    className="basic"
                                                    classNamePrefix="basic"
                                                    isMulti={data.procedure_type === 'Mutual Recognition' || data.procedure_type === 'Decentralized' ? true : false}
                                                    ref={ele => countryRef.current = ele}
                                                    placeholder=''
                                                // styles={selectStyles(errors.registration_holder)}
                                                />
                                            </div>
                                        </div>

                                        <div className="form_group_inline" style={{ display: data.procedure_type === 'Mutual Recognition' || data.procedure_type === 'Decentralized' ? '' : 'none' }}>
                                            <span className="form_group_label">RMS</span>
                                            <div className="form_group_field" >
                                                <Select options={contries}
                                                    name="rms"
                                                    onChange={handleSelectChange}
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
                                                <input type="text" name="procedure_num" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Local Tradename</span>
                                            <div className="form_group_field">
                                                <input type="text" name="local_tradename" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Application Stage</span>
                                            <div className="form_group_field">
                                                
                                                <Select options={[
                                                    { value: 'Marketing Authorisation', label: 'Marketing Authorisation' },
                                                    { value: 'APSI / NPP', label: 'APSI / NPP' },
                                                ]}
                                                    name="application_stage"
                                                    onChange={handleSelectChange}
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
                                                
                                                <Select options={[
                                                    { value: 'Finished', label: 'Finished' },
                                                    { value: 'References', label: 'References' },
                                                ]}
                                                    name="product_type"
                                                    onChange={handleSelectChange}
                                                    className="basic"
                                                    classNamePrefix="basic"
                                                    placeholder=''
                                                    // styles={selectStyles(errors.product_type)}
                                                />
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
                                Variation Details
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0" >

                                <Card.Body>
                                    <div className="inline_form">
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Variation Title</span>
                                            <div className="form_group_field">
                                                <input type="text" name='variation_title' onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Variation Category (*)</span>
                                            <div className="form_group_field">
                                                {/* <select defaultValue="" name="category" onChange={handleChange} style={{borderColor: errors.category ? 'red' : ''}}>
                                                    <option value="" ></option>
                                                    <option>Variation/Supplement</option>
                                                    <option>FUM</option>
                                                   
                                                </select> */}
                                                <Select options={[
                                                    { value: 'Variation/Supplement', label: 'Variation/Supplement' },
                                                    { value: 'FUM', label: 'FUM' },
                                                ]}
                                                    name="category"
                                                    onChange={handleSelectChange}
                                                    className="basic"
                                                    classNamePrefix="basic"
                                                    placeholder=''
                                                    styles={selectStyles(errors.category)}
                                                />
                                            </div>
                                            <p className="errors_wrap" style={{ display: errors.category ? 'inline-block' : 'none' }}>{errors.category}</p>
                                        </div>
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Variation Type</span>
                                            <div className="form_group_field">
                                                {/* <select defaultValue="" name="variation_type" onChange={handleChange}>
                                                    <option value="" ></option>
                                                    <option>Prior Authorisation (II)</option>
                                                    <option>Do and Tell Immediate (IAIN Immediate Notification)</option>
                                                    <option>Do and Tell Later (IA)</option>
                                                    <option>Tell, Wait and Do (IB)</option>
                                                    <option>Other</option>
                                                </select> */}
                                                <Select options={[
                                                    { value: 'Variation/Supplement', label: 'Variation/Supplement' },
                                                    { value: 'FUM', label: 'FUM' },
                                                ]}
                                                    name="variation_type"
                                                    onChange={handleSelectChange}
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
                                                {/* <select defaultValue="" name="variation_reason" onChange={handleChange}>
                                                    <option value=""></option>
                                                    <option>Indication</option>
                                                    <option>Paediatric Indication</option>
                                                    <option>Safety</option>
                                                    <option>Following Urgent Safety Restriction</option>
                                                    <option>Quality</option>
                                                    <option>Others</option>
                                                </select> */}
                                                <Select options={[
                                                    { value: 'Indication', label: 'Indication'},
                                                    { value: 'Paediatric Indication', label: 'Paediatric Indication'},
                                                    { value: 'Safety', label: 'Safety'},
                                                    { value: 'Following Urgent Safety Restriction', label: 'Following Urgent Safety Restriction'},
                                                    { value: 'Quality', label: 'Quality'},
                                                    { value: 'Others', label: 'Others'},
                                                ]}
                                                    name="variation_reason"
                                                    onChange={handleSelectChange}
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
                                                {/* <select defaultValue="" name="submission_type" onChange={handleChange} style={{borderColor: errors.submission_type ? 'red' : ''}}>
                                                    <option value=""></option>
                                                    <option>CARDEAC</option>
                                                    <option>Initial MAA</option>
                                                    <option>NPP-Initial</option>
                                                </select> */}
                                                <Select options={[
                                                    { value: 'CARDEAC', label: 'CARDEAC'},
                                                    { value: 'Initial MAA', label: 'Initial MAA'},
                                                    { value: 'Safety', label: 'Safety'},
                                                    { value: 'NPP-Initial', label: 'NPP-Initial'},
                                                ]}
                                                    name="submission_type"
                                                    onChange={handleSelectChange}
                                                    className="basic"
                                                    classNamePrefix="basic"
                                                    placeholder=''
                                                    styles={selectStyles(errors.submission_type)}
                                                />
                                            </div>
                                            <p className="errors_wrap" style={{ display: errors.submission_type ? 'inline-block' : 'none' }}>{errors.submission_type}</p>
                                        </div>
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Applcation N°</span>
                                            <div className="form_group_field">
                                                <input type="text" name="application_number" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Submission/Procedure N°</span>
                                            <div className="form_group_field">
                                                <input type="text" name="submission_number" onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Dossier Submission Format</span>
                                            <div className="form_group_field">
                                                {/* <select defaultValue="" name="submission_format" onChange={handleChange}>
                                                    <option value="" ></option>
                                                    <option>CTD</option>
                                                    <option>Nees</option>
                                                    <option>eCTD</option>
                                                    <option>briefing Book</option>
                                                    <option>Drug Master File</option>
                                                </select> */}
                                                <Select options={[
                                                    { value: 'CTD', label: 'CTD'},
                                                    { value: 'Nees', label: 'Nees'},
                                                    { value: 'eCTD', label: 'eCTD'},
                                                    { value: 'briefing Book', label: 'briefing Book'},
                                                    { value: 'Drug Master File', label: 'Drug Master File'},
                                                ]}
                                                    name="submission_type"
                                                    onChange={handleSelectChange}
                                                    className="basic"
                                                    classNamePrefix="basic"
                                                    placeholder=''
                                                    // styles={selectStyles(errors.product_type)}
                                                />
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
                                Status Details
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0" >
                                <Card.Body>
                                    {data.procedure_type == 'Decentralized' || data.procedure_type == 'Mutual Recognition' ?
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button type="button" className="add_doc_form" onClick={addStatusFields}>
                                                <i className="bi bi-plus-lg"></i>
                                            </button>
                                        </div>
                                    : ''}
                                    {data.statuses.map((element, index) => (
                                        <div key={index}>
                                            {index > 0 ?
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <button type='button' style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
                                                        <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                    </button>
                                                </div>
                                                : ''
                                            }
                                            <div className="inline_form">
                                                {data.procedure_type == 'Decentralized' || data.procedure_type == 'Mutual Recognition' ?
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Country</span>
                                                        <div className="form_group_field">
                                                            <select defaultValue="" name='country' onChange={(e) => handleStatusesChange(index, e)}>
                                                                <option value=""></option>
                                                                <option value="All">All</option>
                                                                {data.country.map(c => (
                                                                    <option key={c}>{c}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    : ''}
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
                                                        <DatePicker name="status_date" selected={data.statuses[index].status_date} onChange={(date) => handleDateChange(index, 'status_date', date)}   style={{ borderColor: errors['statuses.' + index + '.status_date'] ? 'red' : '' }}/>
                                                    </div>
                                                    <p className="errors_wrap" style={{ display: errors['statuses.' + index + '.status_date'] ? 'inline-block' : 'none' }}>{errors['statuses.' + index + '.status_date']}</p>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">eCTD sequence</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="ectd" onChange={e => handleStatusChanged(index, e)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Change Control or pre-assessment</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="control" onChange={e => handleStatusChanged(index, e)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">CCDS/Core PIL ref n°</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="cdds" onChange={e => handleStatusChanged(index, e)} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Remarks</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="reamrks" onChange={e => handleStatusChanged(index, e)} />
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
                                                        {/* <input type="text" name="actual_implementation" onChange={(date) => handleDateChange(index, 'actual_implementation', date)}  /> */}
                                                    </div>
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
                    <Documents handleChanged={handleDocumentChange} handleDocumentdate={handleDocumentdate} addFormFields={addFormFields} formValues={data.doc} />
                </Tab>
            </Tabs>
            <div style={{display:'flex'}}>
                <div className="form-button">
                    <button style={{width:'80px'}} type="submit" className="btn btn-primary" name="submit" disabled={processing}>Submit</button>
                </div>
                <div className="form-button">
                    <button type="submit" style={{width:'80px',marginLeft:'10px'}} className="btn btn-primary" name="draft" disabled={processing}>Draft</button>
                </div>
            </div>
            
        </form>
    )
}

export default Nohqproject;