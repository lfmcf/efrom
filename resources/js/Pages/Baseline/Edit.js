import Authenticated from "@/Layouts/Authenticated";
import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useForm } from '@inertiajs/inertia-react';
import Documents from "@/Layouts/Documents";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BasicSpeedDial from '@/Components/SpeedDial';
import { Tabs as Mtabs, Tab as Mtab } from '@mui/material';
import Box from '@mui/material/Box';
import SaveModal from '@/Components/SaveModal';
import { Typography } from "@mui/material";
import { product_name, procedure_type, status } from '@/Components/List';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Create = (props) => {
    const {baseline} = props
    console.log(baseline)
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        product: baseline.product,
        procedure_type: baseline.procedure_type,
        country: baseline.country,
        rms: baseline.rms,
        application_stage: baseline.application_stage,
        procedure_num: baseline.procedure_num,
        local_tradename: baseline.local_tradename,
        product_type: baseline.product_type,
        baseline_title: baseline.baseline_title,
        description: baseline.description,
        application_num: baseline.application_num,
        reason: baseline.reason,
        remarks: baseline.remarks,
        statuses: baseline.statuses,
        doc: baseline.doc,
        created_by: props.auth.user.id,
    });

    const countryRef = React.useRef();
    const [value, setValue] = useState(0);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });

    const handleMChange = (event, newValue) => {

        setValue(newValue);
    };

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

    const handleSelectChange = (e, name) => {
        if (!e) {
            e = {
                value: ''
            }
        }
        setData(name.name, e.value)
    }

    let handleCountryChange = (e, k) => {
        let arr = { ...data }
        if (k.action) {
            if (k.action == 'select-option') {
                if (e.length > 0) {
                    arr.country.push(k.option.value)
                } else {
                    arr.country.push(e.value)
                }
            } else if (k.action == 'remove-value') {
                let newarr = arr.country.filter((ele) => {
                    return ele != k.removedValue.value
                });
                arr.country = newarr;
            } else {
                arr.country.length = 0
            }

        }
        setData(arr)
    }

    let addFormFields = () => {
        let arr = { ...data };
        arr.doc.push({ document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: '' });
        setData(arr);
    }

    let removeStatusFields = (i) => {
        let newArr = { ...data };
        newArr.statuses.splice(i, 1);
        setData(newArr);
    }

    let handleDocumentChange = (i, e) => {
        let arr = { ...data };
        if (e.target.name === "document") {
            arr.doc[i][e.target.name] = e.target.files[0];
        } else {
            arr.doc[i][e.target.name] = e.target.value;
        }
        setData(arr);
    }

    let addStatusFields = () => {
        let newArr = { ...data };
        newArr.statuses.push({ country: '', status: '', status_date: '', ectd: '', control: '', cdds: '', remarks: '', implimentation_deadline: '', next_renewals: '', next_renewals_deadline: '', next_renewals_date: '' });
        setData(newArr);
    }

    let handleStatusChanged = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.statuses[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.' + e.target.name);
    }

    let handleDateChange = (i, name, e) => {
        let arr = { ...data };
        arr.statuses[i][name] = e;
        setData(arr);
        clearErrors('statuses.' + i + '.' + name)
    }

    const handleDocumentdate = (i, date) => {
        let arr = { ...data };
        arr.doc[i].version_date = date
        setData(arr);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitType = window.event.submitter.name;
        post(route("storebaseline", { 'type': submitType }));
    }

    const showsavemodel = () => {
        setSavemodal(prev => ({ ...prev, show: true, name: 'submit' }))
    }

    const showdraftmodel = () => {
        setSavemodal(prev => ({ ...prev, show: true, name: 'draft' }))
    }

    const handleSaveModalClose = () => {
        setSavemodal(prev => ({
            ...prev,
            show: false
        }))
    }

    const handleSaveModalConfirm = () => {
        setSavemodal(prev => ({
            ...prev,
            show: false
        }))
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }

    let handleReset = () => {
        console.log('here')
        reset()
    }

    let removeDocumentsFields = (i) => {
        let newArr = { ...data };
        newArr.doc.splice(i, 1);
        setData(newArr);
    }

    let handleStatusSelectChange = (i, e, name) => {
       
        if (!e) {
            e = {
                value: ''
            }
        }
        let newFormValues = { ...data };
        newFormValues.statuses[i][name] = e.value;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.' + name)
    }

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Baseline</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                    <form className="form" onSubmit={handleSubmit}>
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="New Baseline" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
                                <Box
                                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
                                >
                                    <Mtabs
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={value}
                                        onChange={handleMChange}
                                        aria-label="Vertical tabs example"
                                        sx={{ borderRight: 1, borderColor: 'divider' }}
                                    >
                                        <Mtab label="Registration Identification" {...a11yProps(0)} />
                                        <Mtab label="Baseline Details" {...a11yProps(1)} />
                                        <Mtab label="Status Details" {...a11yProps(2)} />
                                    </Mtabs>
                                    <div value={value} index={0} className="muitab" style={{ display: value != 0 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Registration ID</span>
                                                <div className="form_group_field">
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Product</span>
                                                <div className="form_group_field">
                                                    {/* <select name='product' defaultValue='' onChange={handleChange}>
                                                        <option value=''></option>
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
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        defaultValue={{ label: data.product, value: data.product }}
                                                    />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Procedure Type</span>
                                                <div className="form_group_field">
                                                    {/* <select name='procedure_type' defaultValue='' onChange={handleProcedureTypeChange}>
                                                        <option value=''></option>
                                                        <option>National</option>
                                                        <option>Centralized</option>
                                                        <option>Decentralized</option>
                                                        <option>Mutual Recognition</option>
                                                    </select> */}
                                                    <Select options={procedure_type}
                                                        name="procedure_type"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        defaultValue={{ label: data.procedure_type, value: data.procedure_type }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Country</span>
                                                <div className="form_group_field">
                                                    <Select options={contries}
                                                        name="registration_holder"
                                                        onChange={(e, k) => handleCountryChange(e, k)}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        isMulti={data.procedure_type === 'Mutual Recognition' || data.procedure_type === 'Decentralized' ? true : false}
                                                        ref={ele => countryRef.current = ele}
                                                        placeholder=''
                                                        isClearable
                                                        defaultValue={data.country.map(function(option) { return {label:option, value: option} })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" style={{ display: data.procedure_type === 'Mutual Recognition' || data.procedure_type === 'Decentralized' ? '' : 'none' }}>
                                                <span className="form_group_label">RMS</span>
                                                <div className="form_group_field">
                                                    <Select options={contries}
                                                        name="rms"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        defaultValue={{ label: data.rms, value: data.rms }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Procedure Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='procedure_num' defaultValue={data.procedure_num} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Local Tradename</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='local_tradename' defaultValue={data.local_tradename} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Application Stage</span>
                                                <div className="form_group_field">
                                                    {/* <select name='application_stage' defaultValue='' onChange={handleChange}>
                                                        <option value=''></option>
                                                        <option>Marketing Authorisation</option>
                                                        <option>APSI / NPP</option>
                                                    </select> */}
                                                    <Select options={[
                                                        { label: 'Marketing Authorisation', value: 'Marketing Authorisation' },
                                                        { label: 'APSI / NPP', value: 'APSI / NPP' }
                                                    ]}
                                                        name='application_stage'
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        defaultValue={{ label: data.application_stage, value: data.application_stage }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Product Type</span>
                                                <div className="form_group_field">
                                                    {/* <select name='product_type' defaultValue='' onChange={handleChange}>
                                                        <option value=''></option>
                                                        <option>Finished</option>
                                                        <option>Reference</option>
                                                    </select> */}
                                                    <Select options={[
                                                        { label: 'Finished', value: 'Finished' },
                                                        { label: 'Reference', value: 'Reference' }
                                                    ]}
                                                        name='product_type'
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        defaultValue={{ label: data.product_type, value: data.product_type }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div value={value} index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Baseline Title</span>
                                                <div className="form_group_field">
                                                    <input type="" name="baseline_title" defaultValue={data.baseline_title} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Description of the event</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="description" defaultValue={data.description} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Application N°</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="application_num" defaultValue={data.application_num} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Reason for variation</span>
                                                <div className="form_group_field">
                                                    {/* <select name="reason" defaultValue='' onChange={handleChange} >
                                                        <option value='' ></option>
                                                        <option>Indication</option>
                                                        <option>Paediatric Indication</option>
                                                        <option>Safety</option>
                                                        <option>Following Urgent Safety Restriction</option>
                                                        <option>Quality</option>
                                                        <option>Others</option>
                                                    </select> */}
                                                     <Select options={[
                                                        { label: 'Indication', value: 'Indication' },
                                                        { label: 'Paediatric Indication', value: 'Paediatric Indication' },
                                                        { label: 'Safety', value: 'Safety' },
                                                        { label: 'Following Urgent Safety Restriction', value: 'Following Urgent Safety Restriction' },
                                                        { label: 'Quality', value: 'Quality' },
                                                        { label: 'Others', value: 'Others' },
                                                    ]}
                                                        name='reason'
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        defaultValue={{ label: data.reason, value: data.reason }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Remarks</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="remarks" defaultValue={data.remarks} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div value={value} index={2} className="muitab" style={{ display: value != 2 ? 'none' : '' }}>
                                        
                                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                <button type="button" className="add_doc_form" onClick={addStatusFields}>
                                                    <i className="bi bi-plus-lg"></i> Add Status
                                                </button>
                                            </div>
                                            
                                        {data.statuses.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend>Statut {index + 1}</legend>
                                            <div >
                                                {index > 0 ?
                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                        <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
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
                                                            {/* <select name='status' defaultValue='' onChange={e => handleStatusChanged(index, e)} style={{ borderColor: errors['statuses.' + index + '.status'] ? 'red' : '' }}>
                                                                <option value=''></option>
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
                                                            </select> */}
                                                            <Select options={status}
                                                                onChange={(e) => handleStatusSelectChange(index, e, 'status')}
                                                                name="status"
                                                                className="basic"
                                                                classNamePrefix="basic"
                                                                styles={selectStyles(errors['statuses.' + index + '.status'])}
                                                                placeholder=''
                                                                isClearable
                                                                defaultValue={{ label: element.status, value: element.status }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Status Date (*)</span>
                                                        <div className="form_group_field">
                                                            <DatePicker name="status_date" selected={element.status_date ? new Date(element.status_date) : new Date()} onChange={(date) => handleDateChange(index, 'status_date', date)} style={{ borderColor: errors['statuses.' + index + '.status_date'] ? 'red' : '' }} />
                                                        </div>
                                                        <p className="errors_wrap" style={{ display: errors['statuses.' + index + '.status_date'] ? 'inline-block' : 'none' }}>{errors['statuses.' + index + '.status_date']}</p>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">eCTD sequence</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="ectd" defaultValue={element.ectd} onChange={e => handleStatusChanged(index, e)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="inline_form">
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Change Control or pre-assessment</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="control" defaultValue={element.control} onChange={e => handleStatusChanged(index, e)} />
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">CCDS/Core PIL ref n°</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="cdds" defaultValue={element.cdds} onChange={e => handleStatusChanged(index, e)} />
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Remarks</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="remarks" defaultValue={element.remarks} onChange={e => handleStatusChanged(index, e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="inline_form">
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Effective internal implementation date</span>
                                                        <div className="form_group_field">
                                                            <DatePicker name="implimentation_date" selected={element.implimentation_date ? new Date(element.implimentation_date) : new Date()} onChange={(date) => handleDateChange(index, 'implimentation_date', date)} />
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Implementation Deadline of deadline for answer</span>
                                                        <div className="form_group_field">
                                                            <DatePicker name="deadline_for_answer" selected={element.deadline_for_answer ? new Date(element.deadline_for_answer) : new Date()} onChange={(date) => handleDateChange(index, 'deadline_for_answer', date)} />
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Impacted of changes approved</span>
                                                        <div className="form_group_field">
                                                            {/* <select name="changes_approved" defaultValue='' onChange={e => handleStatusChanged(index, e)}>
                                                                <option value='' ></option>
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select> */}
                                                            <Select options={[
                                                                    { label: 'Yes', value: 'Yes' },
                                                                    { label: 'No', value: 'No' }
                                                                ]}
                                                                name="changes_approved"
                                                                onChange={(e) => handleStatusSelectChange(index, e, 'changes_approved')}
                                                                className="basic"
                                                                classNamePrefix="basic"
                                                                placeholder=''
                                                                isClearable
                                                                defaultValue={{ label: element.changes_approved, value: element.changes_approved }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            </fieldset>
                                        ))}
                                    </div>
                                </Box>

                            </Tab>
                            <Tab eventKey="second" title="Documents" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
                                <Documents handleChanged={handleDocumentChange} handleDocumentdate={handleDocumentdate} addFormFields={addFormFields} formValues={data.doc} removeDocumentsFields={removeDocumentsFields} />
                            </Tab>
                        </Tabs>
                        <BasicSpeedDial processing={processing} showsavemodel={showsavemodel} showdraftmodel={showdraftmodel} reset={handleReset} />
                        <SaveModal show={showsavemodal.show} handleClose={handleSaveModalClose} handleSubmited={handleSaveModalConfirm} name={showsavemodal.name} />
                    </form>
                </div>
            </div>
            <footer style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="p" component="p">Powered By <span style={{ color: 'rgb(44, 197,162)', fontWeight: '800' }}>Ekemia</span> &copy; 2022</Typography>
            </footer>
        </>
    )
}

export default Create;

Create.layout = page => <Authenticated children={page} auth={page.props.auth} />