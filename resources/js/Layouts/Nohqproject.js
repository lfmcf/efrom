import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';
import Documents from "@/Layouts/Documents";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        statuses: [{status: '',status_date: '',ectd: '',control: '',cdds: '',remarks: '',local_implementation: '',implimentation_deadline: '',actual_implementation: ''}],
        doc: [{document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: ''}],
        isHq: false,
        created_by: props.user.id,
    });

    const countryRef = React.useRef();

    let addStatusFields = () => {
        let newArr = {...data};
        newArr.statuses.push({status:'',status_date:'',ectd_sequence:'',change_control_ref:'',internal_submission_reference:'',remarks:''});
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
    }

    let handleStatusChanged = (i, e) => {
        let newFormValues = {...data};
        newFormValues.statuses[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('statuses.'+i+'.'+e.target.name);
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
                                    <div className="inline_form">
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Product</span>
                                            <div className="form_group_field">
                                                <select name="product" defaultValue="" onChange={handleChange}>
                                                    <option value="" ></option>
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
                                                <select name="procedure_type" defaultValue="" onChange={handleProcedureTypeChange}>
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
                                                <select name="application_stage" defaultValue="" onChange={handleChange}>
                                                    <option value=""></option>
                                                    <option>Marketing Authorisation</option>
                                                    <option>APSI / NPP</option>
                                                    
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form_group_inline">
                                            <span className="form_group_label">Product Type</span>
                                            <div className="form_group_field">
                                                <select name="product_type" defaultValue="" onChange={handleChange}>
                                                    <option value="" ></option>
                                                    <option>Finished</option>
                                                    <option>Reference</option>
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
                                                <select defaultValue="" name="category" onChange={handleChange} style={{borderColor: errors.category ? 'red' : ''}}>
                                                    <option value="" ></option>
                                                    <option>Variation/Supplement</option>
                                                    <option>FUM</option>
                                                   
                                                </select>
                                            </div>
                                            <p className="errors_wrap" style={{ display: errors.category ? 'inline-block' : 'none' }}>{errors.category}</p>
                                        </div>
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Variation Type</span>
                                            <div className="form_group_field">
                                                <select defaultValue="" name="variation_type" onChange={handleChange}>
                                                    <option value="" ></option>
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
                                                <select defaultValue="" name="variation_reason" onChange={handleChange}>
                                                    <option value=""></option>
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
                                                <select defaultValue="" name="submission_type" onChange={handleChange} style={{borderColor: errors.submission_type ? 'red' : ''}}>
                                                    <option value=""></option>
                                                    <option>CARDEAC</option>
                                                    <option>Inetial MAA</option>
                                                    <option>NPP-Initial</option>
                                                </select>
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
                                                <select defaultValue="" name="submission_format" onChange={handleChange}>
                                                    <option value="" ></option>
                                                    <option>CTD</option>
                                                    <option>Nees</option>
                                                    <option>eCTD</option>
                                                    <option>briefing Book</option>
                                                    <option>Drug Master File</option>
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
                                Event Status
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
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Status (*)</span>
                                                    <div className="form_group_field">
                                                        <select name="status" defaultValue="" onChange={e => handleStatusChanged(index, e)} style={{ borderColor: errors['statuses.' + index + '.status'] ? 'red' : '' }}>
                                                            <option value="" ></option>
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
                                                        <input type="text" name="actual_implementation" onChange={e => handleStatusChanged(index, e)} />
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
                    <button style={{width:'100px'}} type="submit" className="btn_submit btn btn-primary" name="submit" disabled={processing}>Submit</button>
                </div>
                <div className="form-button">
                    <button type="submit" style={{width:'100px'}} className="btn_submit btn btn-primary" name="draft" disabled={processing}>Draft</button>
                </div>
                <div className="form-button">
                                        <button style={{ width: '100px' }} type="reset" className="btn_close btn btn-danger" name="Reset" disabled={processing}>Reset</button>
                                    </div>
            </div>
            
        </form>
    )
}

export default Nohqproject;