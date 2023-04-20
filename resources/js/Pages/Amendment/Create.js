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
import { Tabs as Mtabs, Tab as Mtab, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import SaveModal from '@/Components/SaveModal';
import { Typography } from '@mui/material';
import { product_name, procedure_type } from '@/Components/List';
import moment from "moment";
import ModalP from '@/Components/Modalp';
import AddIcon from '@mui/icons-material/Add';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


const Create = (props) => {

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        product: '',
        procedure_type: '',
        country: [],
        rms: '',
        application_stage: '',
        procedure_num: '',
        local_tradename: '',
        // product_type: '',
        aremarks: '',
        amendment_title: '',
        description: '',
        reason: '',
        remarks: '',
        statuses: [{ country: '', status: '', status_date: '', ectd: '', control: '', cdds: '', remarks: '', implimentation_date: '', deadline_for_answer: '', changes_approved: '' }],
        doc: [{ document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: '' }],
        created_by: props.auth.user.id,
    });

    const countryRef = React.useRef();
    const [showMP, setShowMP] = useState(false);
    const [value, setValue] = useState(0);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });
    // const [packagehaserror, setPackagehaserror] = useState(false);
    const [statuserror, setStatusError] = useState(false);
    const formRef = React.useRef();
    const [statusCountry, setStatusCountry] = useState([{label: 'All', value: 'All'}])

    const handleMChange = (event, newValue) => {

        setValue(newValue);
    };

    const handleCloseMP = () => {
        setShowMP(false)
    }

    let contries = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    })

    let porductOptions = props.products.map(function (product) {
        return {
            value : product.name,
            label : product.name,
        }
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

    const handleSelectChange = (selectedOption, name) => {
        setData(name.name, selectedOption);
        clearErrors(name.name)
    }

    let handleDateChange = (i, name, e) => {
        let arr = { ...data };
        arr.statuses[i][name] = e;
        setData(arr);
        clearErrors('statuses.' + i + '.' + name)
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
        clearErrors('country')
    }

    let addFormFields = () => {
        let arr = { ...data };
        arr.doc.push({ document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: '' });
        setData(arr);
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
        newArr.statuses.push({ country: '', status: '', status_date: '', ectd: '', control: '', cdds: '', remarks: '', implimentation_date: '', deadline_for_answer: '', changes_approved: '' });
        setData(newArr);
    }

    let removeStatusFields = (i) => {
        let newArr = { ...data };
        newArr.statuses.splice(i, 1);
        setData(newArr);
    }

    let handleStatusChanged = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.statuses[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.' + e.target.name);
    }

    const handleDocumentdate = (i, date) => {
        let arr = { ...data };
        arr.doc[i].version_date = date
        setData(arr);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitType = window.event.target.name;
        post(route("storeamendment", { 'type': submitType }));
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
        
        reset()
    }

    let removeDocumentsFields = (i) => {
        let newArr = { ...data };
        newArr.doc.splice(i, 1);
        setData(newArr);
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

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    let handleStatusSelectChange = (selectedOption, name, i) => {
        let newFormValues = { ...data };
        newFormValues.statuses[i][name.name] = selectedOption;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.' + name.name)
    }

    const handleDocumentSelectChange = (selectedOption, name, i) => {
        let arr = { ...data };
        arr.doc[i][name.name] = selectedOption;
        setData(arr);
    }

    React.useEffect(() => {
        if(data.procedure_type && data.procedure_type.value == "European Procedure" ) {
            if(data.country.length !== 0) {
                setStatusCountry(statusCountry => [{label: 'All', value: 'All'}, ...data.country])
            }else {
                setStatusCountry([{label: 'All', value: 'All'}])
            }
        }
    }, [data.country]);

    React.useEffect(() => {
        if(data.rms) {
            if(statusCountry.filter(item => item.value == data.rms.value) == 0) {
                setStatusCountry(statusCountry => [...statusCountry, data.rms])
            }
        }
    }, [data.rms])

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Amendment</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                    <form className="form" ref={formRef} onSubmit={handleSubmit}>
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="New Amendment" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
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
                                        <Mtab label="Registration Identification" {...a11yProps(0)} style={{ color: errors.product || errors.procedure_type || errors.country ? "red": '' }} />
                                        <Mtab label="Amendments Details" {...a11yProps(1)} style={{ color: errors.amendment_title ? 'red' : '' }} />
                                        <Mtab label="Status Details" {...a11yProps(2)} style={{ color: statuserror ? 'red' : '' }} />
                                    </Mtabs>
                                    <div value={value} index={0} className="muitab" style={{ display: value != 0 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors.product ? 'red' : ''}}>Product (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={porductOptions}
                                                        name="product"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        styles={selectStyles(errors.product)}
                                                        placeholder=''
                                                        isClearable
                                                        value={data.product}
                                                    />
                                                    <IconButton color="primary" onClick={(e) => setShowMP(true)} aria-label="add product">
                                                        <AddIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors.procedure_type ? 'red' : ''}}>Procedure Type (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        {value: "National Procedure", label: "National Procedure"},
                                                        {value: "European Procedure", label: "European Procedure"},
                                                    ]}
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
                                                <span className="form_group_label" style={{color: errors.country ? 'red' : ''}}>Country (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={contries}
                                                        name="country"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        isMulti={data.procedure_type && data.procedure_type.value === 'European Procedure' ? true : false}
                                                        ref={ele => countryRef.current = ele}
                                                        placeholder=''
                                                        isClearable
                                                        styles={selectStyles(errors.country)}
                                                        value={data.country}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" style={{display: data.procedure_type && data.procedure_type.value === 'European Procedure' ? '' : 'none'}}>
                                                <span className="form_group_label">RMS</span>
                                                <div className="form_group_field">
                                                    <Select options={contries}
                                                        name="rms"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        value={data.rms}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Procedure Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='procedure_num' onChange={handleChange} value={data.procedure_num} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Full protocol title</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='local_tradename' onChange={handleChange} value={data.local_tradename} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Submission Type</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { label: 'Marketing Authorisation', value: 'Marketing Authorisation' },
                                                        { label: 'APSI / NPP', value: 'APSI / NPP' },
                                                        { label: 'PIP*', value: 'PIP*' },
                                                        { label: 'CTA*', value: 'CTA*' },
                                                        { label: 'IND*', value: 'IND*' },
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
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Remarks</span>
                                                <textarea type="text" name="aremarks" onChange={handleChange} value={data.aremarks} />
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div value={value} index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors.amendment_title ? 'red' : ''}}>Amendment Title (*)</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="amendment_title" onChange={handleChange} style={{borderColor: errors.amendment_title ? 'red' : ''}} value={data.amendment_title} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Description of the event</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="description" onChange={handleChange} value={data.description} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Reason for variation</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { label: 'Indication', value: 'Indication' },
                                                        { label: 'Paediatric Indication', value: 'Paediatric Indication' },
                                                        { label: 'Safety', value: 'Safety' },
                                                        { label: 'Following Urgent Safety Restriction', value: 'Following Urgent Safety Restriction' },
                                                        { label: 'Quality', value: 'Quality' },
                                                        { label: 'Others', value: 'Others' },
                                                    ]}
                                                        name="reason"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={data.reason}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Remarks</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="remarks" onChange={handleChange} value={data.remarks} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div value={value} index={2} className="muitab" style={{ display: value != 2 ? 'none' : '' }}>
                                        {/* {data.procedure_type.value == 'European Procedure' ? */}
                                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Status" onClick={addStatusFields}>
                                                    <i className="bi bi-plus-lg"></i>
                                                </button>
                                            </div>
                                            {/* : ''
                                        } */}

                                        {data.statuses.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend>Statut {index + 1}</legend>
                                                {index > 0 ?
                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                        <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
                                                            <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                        </button>
                                                    </div>
                                                    : ''
                                                }
                                                <div className="inline_form">
                                                    {/* {data.procedure_type && data.procedure_type.value == 'European Procedure' ? */}
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
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* : ''} */}
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label" style={{color: errors['statuses.' + index + '.status'] ? 'red' : ''}}>Status (*)</span>
                                                        <div className="form_group_field">
                                                            <Select options={[
                                                                { label: 'Application / Submitted', value: 'Application / Submitted' },
                                                                { label: 'Positive Opinion / Obtained', value: 'Positive Opinion / Obtained' },
                                                                { label: 'Approval / Obtained', value: 'Approval / Obtained' },
                                                                { label: 'Application / Rejected', value: 'Application / Rejected' },
                                                                { label: 'Application / Withdrawn by MAH not due Safety/Efficacy', value: 'Application / Withdrawn by MAH not due Safety/Efficacy' },
                                                                { label: 'Study / Start Date Submitted', value: 'Study / Start Date Submitted' },
                                                                { label: 'Study / End Date Submitted', value: 'Study / End Date Submitted' },
                                                                { label: 'Study / Results Submitted', value: 'Study / Results Submitted' },
                                                                { label: 'Application / Dispatch to local RA', value: 'Application / Dispatch to local RA' },
                                                                { label: 'Application / Validated', value: 'Application / Validated' },
                                                                { label: 'Application / Dispatch Planned', value: 'Application / Dispatch Planned' },
                                                                { label: 'Application / Submission Planned', value: 'Application / Submission Planned' },
                                                                { label: 'Application / Approval Expected', value: 'Application / Approval Expected' },
                                                                { label: 'Application/ End of Procedure', value: 'Application/ End of Procedure' },
                                                                { label: 'Dossier Initial Submission - submitted', value: 'Dossier Initial Submission - submitted' },
                                                                { label: 'Assesment report -  received', value: 'Assesment report -  received' },
                                                                { label: 'Conditional Approval - obtained', value: 'Conditional Approval - obtained' },
                                                            ]}
                                                                name='status'
                                                                onChange={(selectedOption, name) => handleStatusSelectChange(selectedOption, name, index)}
                                                                className="basic"
                                                                classNamePrefix="basic"
                                                                placeholder=''
                                                                isClearable
                                                                styles={selectStyles(errors['statuses.' + index + '.status'])}
                                                                value={element.status}
                                                            />
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label" style={{color: errors['statuses.' + index + '.status_date'] ? 'red' : ''}}>Status Date (*)</span>
                                                        <div className="form_group_field">
                                                            <DatePicker name="status_date" 
                                                                selected={data.statuses[index].status_date} 
                                                                onChange={(date) => handleDateChange(index, 'status_date', date)} 
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
                                                        <span className="form_group_label">Change Control or pre-assessment</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="control" onChange={e => handleStatusChanged(index, e)} value={element.control} />
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">CCDS/Core PIL ref n°</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="cdds" onChange={e => handleStatusChanged(index, e)} value={element.cdds} />
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="inline_form">
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Effective internal implementation date</span>
                                                        <div className="form_group_field">
                                                            <DatePicker name="implimentation_date" 
                                                                selected={data.statuses[index].implimentation_date} 
                                                                onChange={(date) => handleDateChange(index, 'implimentation_date', date)} 
                                                                value={element.implimentation_date ? moment(element.implimentation_date).format('DD-MMM-yy') : ''} 
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Implementation Deadline of deadline for answer</span>
                                                        <div className="form_group_field">
                                                            <DatePicker name="deadline_for_answer" 
                                                                selected={data.statuses[index].deadline_for_answer} 
                                                                onChange={(date) => handleDateChange(index, 'deadline_for_answer', date)} 
                                                                value={element.deadline_for_answer ? moment(element.deadline_for_answer).format('DD-MMM-yy') : ''} 
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Impacted of changes approved</span>
                                                        <div className="form_group_field">
                                                            <Select options={[
                                                                {label: 'Yes', value: 'Yes'},
                                                                {label: 'No', value: 'No'}
                                                            ]}
                                                                name="changes_approved"
                                                                onChange={(selectedOption, name) => handleStatusSelectChange(selectedOption, name, index)}
                                                                className="basic"
                                                                classNamePrefix="basic"
                                                                placeholder=''
                                                                isClearable
                                                                value={element.changes_approved}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="inline_form">
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Remarks</span>
                                                        <div className="form_group_field">
                                                            <textarea type="text" name="remarks" onChange={e => handleStatusChanged(index, e)} value={element.remarks} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        ))}
                                    </div>
                                </Box>

                            </Tab>
                            <Tab eventKey="second" title="Documents" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
                                <Documents handleChanged={handleDocumentChange} handleDocumentdate={handleDocumentdate} addFormFields={addFormFields} formValues={data.doc} removeDocumentsFields={removeDocumentsFields} handleDocumentSelectChange={handleDocumentSelectChange} />
                            </Tab>
                        </Tabs>
                        <ModalP show={showMP} handleClose={handleCloseMP} />
                        <BasicSpeedDial processing={processing} showsavemodel={showsavemodel} showdraftmodel={showdraftmodel} reset={handleReset}  />
                        <SaveModal show={showsavemodal.show} handleClose={handleSaveModalClose} handleSubmited={handleSaveModalConfirm} name={showsavemodal.name}  />
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