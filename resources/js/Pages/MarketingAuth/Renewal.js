import Authenticated from '@/Layouts/Authenticated';
import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Documents from "@/Layouts/Documents";
import Select from 'react-select';
import { useForm } from '@inertiajs/inertia-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BasicSpeedDial from '@/Components/SpeedDial';
import { Tabs as Mtabs, Tab as Mtab } from '@mui/material';
import Box from '@mui/material/Box';
import SaveModal from '@/Components/SaveModal';
import { Typography } from '@mui/material';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Renewal = (props) => {

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        product: '',
        procedure_type: '',
        country: [],
        rms: '',
        application_stage: '',
        procedure_num: '',
        local_tradename: '',
        product_type: '',
        renewal_title: '',
        // category: '',
        // description: '',
        application_num: '',
        submission_format: '',
        validation_reason: '',
        remarks: '',
        statuses: [{ country: '', status: '', status_date: '', ectd: '', control: '', cdds: '', remarks: '', implimentation_deadline: '', next_renewals: '', next_renewals_deadline: '', next_renewals_date: '' }],
        doc: [{ document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: '' }],
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

    let addFormFields = () => {
        let arr = { ...data };
        arr.doc.push({ document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: '' });
        setData(arr);
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
    }

    let addStatusFields = () => {
        let newArr = { ...data };
        newArr.statuses.push({ country: '', status: '', status_date: '', ectd: '', control: '', cdds: '', remarks: '', implimentation_deadline: '', next_renewals: '', next_renewals_deadline: '', next_renewals_date: '' });
        setData(newArr);
    }

    let removeStatusFields = (i) => {
        let newArr = { ...data };
        newArr.statuses.splice(i, 1);
        setData(newArr);
    }

    let handleDateChange = (i, name, e) => {
        let arr = { ...data };
        arr.statuses[i][name] = e;
        setData(arr);
        clearErrors('statuses.' + i + '.' + name)
    }

    let handleStatusChanged = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.statuses[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.' + e.target.name);
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

    let handleDocumentChange = (i, e) => {
        let arr = { ...data };
        if (e.target.name === "document") {
            arr.doc[i][e.target.name] = e.target.files[0];
        } else {
            arr.doc[i][e.target.name] = e.target.value;
        }
        setData(arr);
    }

    const handleDocumentdate = (i, date) => {
        let arr = { ...data };
        arr.doc[i].version_date = date
        setData(arr);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitType = window.event.submitter.name;
        post(route("storerenewal", { 'type': submitType }));
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

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Renewal</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                    <form className="form" onSubmit={handleSubmit}>
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="New Renewal" title="New Registration" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
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
                                        <Mtab label="Renewal Details" {...a11yProps(1)} />
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
                                                    <select name='product' defaultValue='' onChange={handleChange}>
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
                                                    </select>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Procedure Type</span>
                                                <div className="form_group_field">
                                                    <select name='procedure_type' defaultValue='' onChange={handleProcedureTypeChange}>
                                                        <option value=''></option>
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
                                                        name="registration_holder"
                                                        onChange={(e, k) => handleCountryChange(e, k)}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        isMulti={data.procedure_type === 'Mutual Recognition' || data.procedure_type === 'Decentralized' ? true : false}
                                                        ref={ele => countryRef.current = ele}
                                                        placeholder=''

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

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Procedure Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='procedure_num' onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Local Tradename</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='local_tradename' onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Application Stage</span>
                                                <div className="form_group_field">
                                                    <select name='application_stage' defaultValue='' onChange={handleChange}>
                                                        <option value=''></option>
                                                        <option>Marketing Authorisation</option>
                                                        <option>APSI / NPP</option>
                                                        {/* <option>PIP*</option>
                                                                        <option>CTA*</option>
                                                                        <option>IND*</option> */}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Product Type</span>
                                                <div className="form_group_field">
                                                    <select name='product_type' defaultValue='' onChange={handleChange}>
                                                        <option value=''></option>
                                                        {/* <option>Clinical</option> */}
                                                        <option>Finished</option>
                                                        <option>Reference</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div value={value} index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Renewal Title</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="renewal_title" onChange={handleChange} />
                                                </div>
                                            </div>
                                            {/* <div className="form_group_inline">
                                                                <span className="form_group_label">Variation Category (*)</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name='category' onChange={handleChange} style={{borderColor: errors.category ? 'red' : ''}} />
                                                                </div>
                                                                <p className="errors_wrap" style={{ display: errors.category ? 'inline-block' : 'none' }}>{errors.category}</p>
                                                            </div> */}
                                            {/* <div className="form_group_inline">
                                                                <span className="form_group_label">Event Description</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name='description' onChange={handleChange} />
                                                                </div>
                                                            </div> */}
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Reason For Renewal</span>
                                                <div className="form_group_field">
                                                    <select name='validation_reason' defaultValue='' onChange={handleChange}>
                                                        <option value=''></option>
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
                                                <span className="form_group_label">Dossier Submission Format</span>
                                                <div className="form_group_field">
                                                    <select name='submission_format' defaultValue='' onChange={handleChange}>
                                                        <option value=''></option>
                                                        <option>CTD</option>
                                                        <option>NeeS</option>
                                                        <option>eCTD</option>
                                                        <option>Briefing Book</option>
                                                        <option>Drug Master File</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Renewal Procedure N°</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='application_num' onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="form_group_inline">
                                                <span className="form_group_label">Remarks</span>
                                                <input type="text" name="remarks" onChange={handleChange} />
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
                                                <div key={index}>
                                                    {index > 0 ?
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
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
                                                                <select name='status' defaultValue='' onChange={e => handleStatusChanged(index, e)} style={{ borderColor: errors['statuses.' + index + '.status'] ? 'red' : '' }}>
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
                                                                <input type="text" name='ectd' onChange={e => handleStatusChanged(index, e)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="inline_form">
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Change Control or pre-assessment</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name='control' onChange={e => handleStatusChanged(index, e)} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">CCDS/Core PIL ref n°</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name='cdds' onChange={e => handleStatusChanged(index, e)} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Remarks</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name='remarks' onChange={e => handleStatusChanged(index, e)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="inline_form">
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Implementation Deadline</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="implimentation_deadline" selected={data.statuses[index].implimentation_deadline} onChange={(date) => handleDateChange(index, 'implimentation_deadline', date)} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Next Renewals</span>
                                                            <div className="form_group_field">
                                                                <select name='next_renewals' defaultValue='' onChange={e => handleStatusChanged(index, e)} >
                                                                    <option value=''></option>
                                                                    <option>Required</option>
                                                                    <option>Not Applicable</option>
                                                                    <option>Not Required</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Next Renewals Submission Deadline</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="next_renewals_deadline" selected={data.statuses[index].next_renewals_deadline} onChange={(date) => handleDateChange(index, 'next_renewals_deadline', date)} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Next Renewal Date</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="next_renewals_date" selected={data.statuses[index].next_renewals_date} onChange={(date) => handleDateChange(index, 'next_renewals_date', date)} />
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
                <Typography variant="p" component="p">Powered By <span style={{ color: 'green', fontWeight: '800' }}>Ekemia</span></Typography>
            </footer>
        </>
    )
}

export default Renewal;

Renewal.layout = page => <Authenticated children={page} auth={page.props.auth} />