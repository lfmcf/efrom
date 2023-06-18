import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';
import Documents from "@/Layouts/Documents";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { key_dates_list, operations, packageCondistion, product_name, procedure_type, apf, atc, SlType, indications, status } from '@/Components/List';
import BasicSpeedDial from '@/Components/SpeedDial';
import { Tabs as Mtabs, Tab as Mtab } from '@mui/material';
import Box from '@mui/material/Box';
import SaveModal from '@/Components/SaveModal';
import { Typography, Button } from '@mui/material';
import { Head } from '@inertiajs/inertia-react';
import moment from 'moment';
import ActionAlerts from '@/Components/ActionAlerts';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const EditNoHqproject = (props) => {

    const { variation } = props;

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        id: variation._id,
        product: variation.product,
        procedure_type: variation.procedure_type,
        country: variation.country,
        rms: variation.rms,
        application_stage: variation.application_stage,
        procedure_num: variation.procedure_num,
        local_tradename: variation.local_tradename,
        //product_type: variation.product_type,
        variation_title: variation.variation_title,
        //category: variation.category,
        variation_type: variation.variation_type,
        //submission_type: variation.submission_type,
        application_number: variation.application_number,
        submission_number: variation.submission_number,
        submission_format: variation.submission_format,
        variation_reason: variation.variation_reason,
        control: variation.control,
        statuses: variation.statuses,
        doc: variation.doc,
        isHq: false,
        created_by: props.user.id,
    });

    let porductOptions = props.products.map(function (product) {
        return {
            value: product.name,
            label: product.name,
        }
    })

    const handleReset = () => {
        reset()
    }

    const countryRef = React.useRef();
    const formRef = React.useRef();
    const [value, setValue] = useState(0);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });
    const [statuserror, setStatusError] = useState(false);
    const [statusCountry, setStatusCountry] = useState([{ label: 'All', value: 'All' }])
    const firstTimeRender = React.useRef(true);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const handleMChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        if (data.procedure_type && data.procedure_type.value == "Decentralized" || data.procedure_type && data.procedure_type.value == "Mutual Recognition") {
            if (data.country.length !== 0) {
                setStatusCountry(statusCountry => [{ label: 'All', value: 'All' }, ...data.country])
            } else {
                setStatusCountry([{ label: 'All', value: 'All' }])
            }
        }
    }, [data.country]);

    React.useEffect(() => {
        if (data.rms) {
            if (statusCountry.filter(item => item.value == data.rms.value) == 0) {
                setStatusCountry(statusCountry => [...statusCountry, data.rms])
            }
        }
    }, [data.rms])

    React.useEffect(() => {
        if (!firstTimeRender.current) {
            setData('country', [])
        }

    }, [data.procedure_type]);

    React.useEffect(() => {
        firstTimeRender.current = false
    }, [])


    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    let addStatusFields = () => {
        let newArr = { ...data };
        newArr.statuses.push({ country: '', status: '', status_date: '', ectd_sequence: '', change_control_ref: '', internal_submission_reference: '', remarks: '' });
        setData(newArr);
    }

    let removeStatusFields = (i) => {
        let newArr = { ...data };
        newArr.statuses.splice(i, 1);
        setData(newArr);
    }

    let addFormFields = () => {
        let arr = { ...data };
        arr.doc.push({ document_type: '', document_title: '', language: '', version_date: '', cdds: '', dremarks: '', document: '' });
        setData(arr);
    }

    let contries = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
    }

    const handleSelectChange = (e, name) => {
        setData(name.name, e)
        clearErrors(name.name)
    }

    let handleStatusChanged = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.statuses[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.' + e.target.name);
    }

    let handleStatusSelectChange = (selectedOption, name, i) => {
        let newFormValues = { ...data };
        newFormValues.statuses[i][name.name] = selectedOption;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.' + name.name)
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

    const handleSubmit = (name) => {
        // e.preventDefault();
        // let submitType = window.event.target.name;
        const search = window.location.search
        const opname = new URLSearchParams(search).get('opr');
        if (opname === 'edit') {
            post(route("updatevariation", { 'type': submitType }), {
                onError: (e) => {
                    if (e.create) {
                        setAlert(true);
                        setAlertContent(e.create)
                    }
                    else {
                        setAlert(true);
                        setAlertContent('The eForm cannot be submitted due to field in Red not properly populated');
                    }
                }
            });
        } else {
            post(route("storevariation", { 'type': submitType }), {
                onError: (e) => {
                    if (e.create) {
                        setAlert(true);
                        setAlertContent(e.create)
                    }
                    else {
                        setAlert(true);
                        setAlertContent('The eForm cannot be submitted due to field in Red not properly populated');
                    }
                }
            });
        }

    }

    const handleSaveModalClose = () => {
        setSavemodal(prev => ({
            ...prev,
            show: false
        }))
    }

    const showdraftmodel = () => {
        setSavemodal(prev => ({ ...prev, show: true, name: 'draft' }))
    }

    const showsavemodel = () => {
        setSavemodal(prev => ({ ...prev, show: true, name: 'submit' }))
    }

    const handleSaveModalConfirm = (name) => {
        setSavemodal(prev => ({
            ...prev,
            show: false
        }))
        handleSubmit(name)
        // formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }

    React.useEffect(() => {
        let s = data.statuses.length
        for (let j = 0; j <= s; j++) {
            if (errors['statuses.' + j + '.status'] || errors['statuses.' + j + '.status_date']) {
                setStatusError(true);
                break;
            } else {
                setStatusError(false);
            }
        }
    }, [errors]);

    let removeDocumentsFields = (i) => {
        let newArr = { ...data };
        newArr.doc.splice(i, 1);
        setData(newArr);
    }

    const handleDocumentSelectChange = (selectedOption, name, i) => {
        let arr = { ...data };
        arr.doc[i][name.name] = selectedOption;
        setData(arr);
    }

    const closeAlert = () => {
        setAlert(false);
    }

    return (
        <>
            <Head title="MA - Variation Edit" />
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Variation</h3>
                </div>
            </div>
            {alert ? <ActionAlerts message={alertContent} closeAlert={closeAlert} /> : <></>}
            <form className="form" onSubmit={handleSubmit} ref={formRef} id='eform'>
                <Tabs defaultActiveKey="first">
                    <Tab eventKey="first" title="New Variation" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
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
                                <Mtab label="Registration Identification" {...a11yProps(0)} style={{ color: errors.product || errors.procedure_type || errors.country ? "red" : '' }} />
                                <Mtab label="Variation Details" {...a11yProps(1)} style={{ color: errors.variation_title || errors.variation_type ? "red" : '' }} />
                                <Mtab label="Status Details" {...a11yProps(2)} style={{ color: statuserror ? 'red' : '' }} />

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
                                        <span className="form_group_label" style={{ color: errors.product ? 'red' : '' }}>Product (*)</span>
                                        <div className="form_group_field">
                                            <Select options={porductOptions}
                                                name="product"
                                                onChange={handleSelectChange}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                styles={selectStyles(errors.product)}
                                                value={data.product}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="inline_form">
                                    <div className="form_group_inline">
                                        <span className="form_group_label" style={{ color: errors.procedure_type ? 'red' : '' }}>Procedure Type (*)</span>
                                        <div className="form_group_field">
                                            <Select options={procedure_type}
                                                name="procedure_type"
                                                onChange={handleSelectChange}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                styles={selectStyles(errors.procedure_type)}
                                                value={data.procedure_type}
                                            />
                                        </div>
                                    </div>
                                    <div className="form_group_inline">
                                        <span className="form_group_label" style={{ color: errors.country ? 'red' : '' }}>Country (*)</span>
                                        <div className="form_group_field">
                                            <Select options={contries}
                                                name="country"
                                                onChange={handleSelectChange}
                                                className="basic"
                                                classNamePrefix="basic"
                                                isMulti={data.procedure_type && data.procedure_type.value === 'Mutual Recognition' || data.procedure_type && data.procedure_type.value === 'Decentralized' ? true : false}
                                                ref={ele => countryRef.current = ele}
                                                placeholder=''
                                                styles={selectStyles(errors.country)}
                                                value={data.country}
                                            />
                                        </div>
                                    </div>

                                    <div className="form_group_inline" style={{ display: data.procedure_type && data.procedure_type.value === 'Mutual Recognition' || data.procedure_type && data.procedure_type.value === 'Decentralized' ? '' : 'none' }}>
                                        <span className="form_group_label">RMS</span>
                                        <div className="form_group_field" >
                                            <Select options={contries}
                                                name="rms"
                                                onChange={handleSelectChange}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                value={data.rms}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="inline_form">
                                    <div className="form_group_inline">
                                        <span className="form_group_label">Procedure Number</span>
                                        <div className="form_group_field">
                                            <input type="text" name="procedure_num" onChange={handleChange} value={data.procedure_num} />
                                        </div>
                                    </div>
                                    <div className="form_group_inline">
                                        <span className="form_group_label">Local Tradename</span>
                                        <div className="form_group_field">
                                            <input type="text" name="local_tradename" onChange={handleChange} value={data.local_tradename} />
                                        </div>
                                    </div>
                                    <div className="form_group_inline">
                                        <span className="form_group_label">Submission Type</span>
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
                                                isClearable
                                                value={data.application_stage}
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="form_group_inline">
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
                                            isClearable
                                            value={data.product_type}
                                        />
                                    </div>
                                </div> */}
                                </div>
                                <div className='npw'>
                                    <div></div>
                                    <div>
                                        <Button type='button' size='small' variant='outlined' onClick={() => handleMChange('', 1)}>Next</Button>
                                    </div>
                                </div>
                            </div>
                            <div value={value} index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                                <div className="inline_form">
                                    <div className="form_group_inline">
                                        <span className="form_group_label" style={{ color: errors.variation_title ? 'red' : '' }}>Variation Title (*)</span>
                                        <div className="form_group_field">
                                            <input type="text" name='variation_title' onChange={handleChange} style={{ borderColor: errors.variation_title ? 'red' : '' }} value={data.variation_title} />
                                        </div>
                                    </div>
                                    {/* <div className="form_group_inline">
                                    <span className="form_group_label" style={{color: errors.category ? 'red' : ''}}>Variation Category (*)</span>
                                    <div className="form_group_field">
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
                                            isClearable
                                            value={data.category}
                                        />
                                    </div>
                                    
                                </div> */}
                                    <div className="form_group_inline">
                                        <span className="form_group_label" style={{ color: errors.variation_type ? 'red' : '' }}>Variation Type (*)</span>
                                        <div className="form_group_field">

                                            <Select options={[
                                                { value: 'Prior Authorisation (II)', label: 'Prior Authorisation (II)' },
                                                { value: 'Do and Tell Immediate (IAIN Immediate Notification)', label: 'Do and Tell Immediate (IAIN Immediate Notification)' },
                                                { value: 'Do and Tell Later (IA)', label: 'Do and Tell Later (IA)' },
                                                { value: 'Tell, Wait and Do (IB)', label: 'Tell, Wait and Do (IB)' },
                                                { value: 'Other', label: 'Other' },
                                            ]}
                                                name="variation_type"
                                                onChange={handleSelectChange}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                styles={selectStyles(errors.variation_type)}
                                                value={data.variation_type}
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
                                                onChange={handleSelectChange}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                value={data.variation_reason}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="inline_form">
                                    {/* <div className="form_group_inline">
                                    <span className="form_group_label" style={{color: errors.submission_type ? 'red' : ''}}>Submission Type (*)</span>
                                    <div className="form_group_field">
                                        
                                        <Select options={[
                                            { value: 'CARDEAC', label: 'CARDEAC' },
                                            { value: 'Initial MAA', label: 'Initial MAA' },
                                            { value: 'NPP-Initial', label: 'NPP-Initial' },
                                        ]}
                                            name="submission_type"
                                            onChange={handleSelectChange}
                                            className="basic"
                                            classNamePrefix="basic"
                                            placeholder=''
                                            styles={selectStyles(errors.submission_type)}
                                            isClearable
                                            value={data.submission_type}
                                        />
                                    </div>  
                                </div> */}
                                    <div className="form_group_inline">
                                        <span className="form_group_label">Application N°</span>
                                        <div className="form_group_field">
                                            <input type="text" name="application_number" onChange={handleChange} value={data.application_number} />
                                        </div>
                                    </div>
                                    <div className="form_group_inline">
                                        <span className="form_group_label">Submission/Procedure N°</span>
                                        <div className="form_group_field">
                                            <input type="text" name="submission_number" onChange={handleChange} value={data.submission_number} />
                                        </div>
                                    </div>
                                    <div className="form_group_inline">
                                        <span className="form_group_label">Dossier Submission Format</span>
                                        <div className="form_group_field">
                                            <Select options={[
                                                { value: 'CTD', label: 'CTD' },
                                                { value: 'Nees', label: 'Nees' },
                                                { value: 'eCTD', label: 'eCTD' },
                                                { value: 'briefing Book', label: 'briefing Book' },
                                                { value: 'Drug Master File', label: 'Drug Master File' },
                                            ]}
                                                name="submission_format"
                                                onChange={handleSelectChange}
                                                className="basic"
                                                classNamePrefix="basic"
                                                placeholder=''
                                                isClearable
                                                value={data.submission_format}
                                            />
                                        </div>
                                    </div>
                                    <div className="form_group_inline">
                                        <span className="form_group_label">Change Control or pre-assessment</span>
                                        <div className="form_group_field">
                                            <input type="text" name="control" onChange={handleChange} value={data.control} />
                                        </div>
                                    </div>
                                </div>
                                <div className='npw'>
                                    <div>
                                        <Button type='button' size='small' onClick={() => handleMChange('', 0)} variant='outlined'>Previous</Button>
                                    </div>
                                    <div>
                                        <Button type='button' size='small' onClick={() => handleMChange('', 2)} variant='outlined'>Next</Button>
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
                                        <legend>Status {index + 1}</legend>

                                        <div >
                                            {index > 0 ?
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <button type='button' style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
                                                        <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                    </button>
                                                </div>
                                                : ''
                                            }
                                            <div className="inline_form">
                                                {data.procedure_type && data.procedure_type.value == 'Decentralized' || data.procedure_type && data.procedure_type.value == 'Mutual Recognition' ?
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Country</span>
                                                        <div className="form_group_field">
                                                            {/* <select defaultValue="" name='country' onChange={(e) => handleStatusesChange(index, e)}>
                                                            <option value=""></option>
                                                            <option value="All">All</option>
                                                            {data.country.map(c => (
                                                                <option key={c}>{c}</option>
                                                            ))}
                                                        </select> */}
                                                            <Select options={statusCountry}
                                                                className="basic"
                                                                classNamePrefix="basic"
                                                                name='country'
                                                                onChange={(selectedOption, name) => handleStatusSelectChange(selectedOption, name, index)}
                                                                placeholder=''
                                                                isClearable
                                                                value={element.country}
                                                            />
                                                        </div>
                                                    </div>
                                                    : ''}
                                                <div className="form_group_inline">
                                                    <span className="form_group_label" style={{ color: errors['statuses.' + index + '.status'] ? 'red' : '' }}>Status (*)</span>
                                                    <div className="form_group_field">
                                                        <Select options={status}
                                                            onChange={(selectedOption, name) => handleStatusSelectChange(selectedOption, name, index)}
                                                            name="status"
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            styles={selectStyles(errors['statuses.' + index + '.status'])}
                                                            placeholder=''
                                                            isClearable
                                                            value={element.status}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label" style={{ color: errors['statuses.' + index + '.status_date'] ? 'red' : '' }}>Status Date (*)</span>
                                                    <div className="form_group_field">
                                                        <DatePicker name="status_date"
                                                            selected={element.status_date ? new Date(element.status_date) : ''}
                                                            onChange={(date) => handleDateChange(index, 'status_date', date)}
                                                            style={{ borderColor: errors['statuses.' + index + '.status_date'] ? 'red' : '' }}
                                                            value={element.status_date ? moment(element.status_date).format('DD-MMM-yy') : ''}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">eCTD sequence</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="ectd" onChange={e => handleStatusChanged(index, e)} value={element.ectd} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Planned Local implementation Date</span>
                                                    <div className="form_group_field">
                                                        <DatePicker name="local_implementation"
                                                            selected={element.local_implementation ? new Date(element.local_implementation) : ''}
                                                            onChange={(date) => handleDateChange(index, 'local_implementation', date)}
                                                            value={element.local_implementation ? moment(element.local_implementation).format('DD-MMM-yy') : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">HA Implementation Deadline</span>
                                                    <div className="form_group_field">
                                                        <DatePicker name="implimentation_deadline"
                                                            selected={element.implimentation_deadline ? new Date(element.implimentation_deadline) : ''}
                                                            onChange={(date) => handleDateChange(index, 'implimentation_deadline', date)}
                                                            value={element.implimentation_deadline ? moment(element.implimentation_deadline).format('DD-MMM-yy') : ''}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Actual Local Implementation</span>
                                                    <div className="form_group_field">
                                                        <DatePicker name="actual_implementation"
                                                            selected={element.actual_implementation ? new Date(element.actual_implementation) : ''}
                                                            onChange={(date) => handleDateChange(index, 'actual_implementation', date)}
                                                            value={element.actual_implementation ? moment(element.actual_implementation).format('DD-MMM-yy') : ''}
                                                        />
                                                        {/* <input type="text" name="actual_implementation" onChange={(date) => handleDateChange(index, 'actual_implementation', date)}  /> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inline_form">

                                                {/* <div className="form_group_inline">
                                                <span className="form_group_label">CCDS/Core PIL ref n°</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="cdds" onChange={e => handleStatusChanged(index, e)} value={element.cdds} />
                                                </div>
                                            </div> */}
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Status note</span>
                                                    <div className="form_group_field">
                                                        <input type="text" name="remarks" onChange={e => handleStatusChanged(index, e)} value={element.remarks} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                ))}
                                <div className='npw'>
                                    <div>
                                        <Button type='button' size='small' onClick={() => handleMChange('', 1)} variant='outlined'>Previous</Button>
                                    </div>
                                    {/* <div>
                                        <Button type='button' size='small' onClick={() => handleMChange('', 2)} variant='outlined'>Next</Button>
                                    </div> */}
                                </div>
                            </div>
                        </Box>



                    </Tab>
                    <Tab eventKey="second" title="Documents" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
                        <Documents handleChanged={handleDocumentChange} handleDocumentdate={handleDocumentdate} addFormFields={addFormFields} formValues={data.doc} removeDocumentsFields={removeDocumentsFields} handleDocumentSelectChange={handleDocumentSelectChange} />
                    </Tab>
                </Tabs>
                <BasicSpeedDial processing={processing} showsavemodel={showsavemodel} showdraftmodel={showdraftmodel} reset={handleReset} />
                <SaveModal show={showsavemodal.show} handleClose={handleSaveModalClose} handleSubmited={handleSaveModalConfirm} name={showsavemodal.name} />

            </form>
            <footer style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="p" component="p">Powered By <span style={{ color: 'rgb(44, 197,162)', fontWeight: '800' }}>EKEMIA</span> &copy; 2022</Typography>
            </footer>
        </>

    )
}

export default EditNoHqproject;