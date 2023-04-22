import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Select from 'react-select';
import Documents from "@/Layouts/Documents";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {product_name, procedure_type, status } from '@/Components/List';
import BasicSpeedDial from '@/Components/SpeedDial';
import { Tabs as Mtabs, Tab as Mtab } from '@mui/material';
import Box from '@mui/material/Box';
import SaveModal from '@/Components/SaveModal';
import { Typography } from '@mui/material';
import { Head } from '@inertiajs/inertia-react';
import moment from 'moment';

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const EditHqproject = (props) => {

    const {variation} = props;

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        id: variation._id,
        identification: variation.identification,
        variation: variation.variation,
        statuses: variation.statuses,
        doc: variation.doc,
        isHq: true,
        created_by: props.user.id,
    });

    const [variationcountries, setVariationCountries] = useState([]);
    const [statusCountry, setStatusCountry] = useState([])
    const selectInputRef = React.useRef({});
    const ctrRef = React.useRef({});
    const formRef = React.useRef();
    const [value, setValue] = useState(0);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });
    const [statuserror, setStatusError] = useState(false);
    const [variationhaserror, setVariationhaserror] = useState(false);
    const [identhaserror, setIdenthaserror] = useState(false);
    const indexRef = React.useRef(0);
    const firstTimeRender = React.useRef(true);

    let porductOptions = props.products.map(function (product) {
        return {
            value : product.name,
            label : product.name,
        }
    })

    // React.useEffect(() => {
        
    //     if(data.identification[indexRef.current].procedure_type && data.identification[indexRef.current].procedure_type.value == "Decentralized" || data.identification[indexRef.current].procedure_type && data.identification[indexRef.current].procedure_type.value == "Mutual Recognition" ) {
    //         //console.log(data.identification[indexRef.current].country)
    //         if(data.identification[indexRef.current].country.length !== 0) {
    //             setStatusCountry(...statusCountry => [{label: 'All', value: 'All'}, ...data.identification[indexRef.current].country])
    //             let arr = {...statusCountry}
    //             arr[indexRef.current] = data.identification[indexRef.current].country
    //             setStatusCountry(arr);
            
    //         }else {
    //             setStatusCountry([{label: 'All', value: 'All'}])
    //         }
    //     }
    // }, [data.identification[indexRef.current].country]);

    // React.useEffect(() => {
    //     if(data.rms) {
    //         if(statusCountry.filter(item => item.value == data.rms.value) == 0) {
    //             setStatusCountry(statusCountry => [...statusCountry, data.rms])
    //         }
    //     }
    // }, [data.identification[indexRef.current].rms]);

    // React.useEffect(() => {
    //     let arr = { ...data}
    //     arr.identification[indexRef.current].country = []
    //     setData(arr)
        
    // }, [data.identification[indexRef.current].procedure_type]);

    const handleMChange = (event, newValue) => {
        setValue(newValue);
    };

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    let addProductFields = () => {
        let arr = {...data};
        arr.identification.push({product: "", procedure_type: "", country: [], application_stage: "", rms: "", procedure_num: "", local_tradename: ""});
        setData(arr);
    }

    let addVariationFields = () => {
        let arr = {...data};
        arr.variation.push({product: "",country:"",variation_title: "", variation_type: "", application_number: "", submission_number: "", submission_format: "", variation_reason: "", control:''});
        setData(arr);
    }

    let addStatusFields = () => {
        let arr = {...data};
        arr.statuses.push({product: "",country:"",status: "", status_date: "", ectd: "", control: "", remarks: "", local_implementation: "", implimentation_deadline: "", actual_implementation: ""});
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
        arr.doc.push({document_type: '', document_title: '', language: '', version_date: '', cdds: "", dremarks: '', document: ''});
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

    let handleIdentificationSelectChange = (i, e, name) => {
        // indexRef.current = i;
        let arri = {...data}
        arri.identification[i][name] = e;
        setData(arri);
        clearErrors('identification.' + i + '.' + name)
    }

    let handleVariationSelectChange = (i, e, name) => {
       
        let arr = {...data}
        arr.variation[i][name] = e;
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

    let removeDocumentsFields = (i) => {
        let newArr = { ...data };
        newArr.doc.splice(i, 1);
        setData(newArr);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitType = window.event.target.name;
        const search = window.location.search
        const opname = new URLSearchParams(search).get('opr');
        if (opname === 'edit') {
            post(route("updatehqvariation", {'type': submitType}), {
                onError: (e) => e.create ? alert(e.create) : alert('The eForm cannot be submitted due to field in Red not properly populated')
            });
        }else {
            post(route("storehqproject", {'type': submitType}), {
                onError: (e) => e.create ? alert(e.create) : alert('The eForm cannot be submitted due to field in Red not properly populated')
            });
        }
        
    }

    let handleStatusSelectChange = (i, e, name) => {
        let newFormValues = {...data};
        newFormValues.statuses[i][name] = e;
        setData(newFormValues);
        clearErrors('statuses.'+i+name)
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

    React.useEffect(() => {
        let il = data.identification.length
        for (let i = 0; i <= il; i++) {
            if (errors['identification.' + i + '.product'] || errors['identification.' + i + '.procedure_type'] || errors['identification.' + i + '.country']) {
                setIdenthaserror(true);
                break;
            } else {
                setIdenthaserror(false);
            }
        }
        let l = data.variation.length
        for (let i = 0; i <= l; i++) {
            if (errors['variation.' + i + '.variation_title'] || errors['variation.' + i + '.variation_type']) {
                setVariationhaserror(true);
                break;
            } else {
                setVariationhaserror(false);
            }
        }
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

    let handleReset = () => {
        reset()
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

    const handleDocumentSelectChange = (i, e, name) => {
        let arr = { ...data };
        arr.doc[i][name] = e;
        setData(arr);
    }

    const handleVariationProductChange = (i, e) => {
        let varr = {...data}
        varr.variation[i]['product'] = e
        setData(varr);
        data.identification.map(ele => {
            if (ele.product === e) {
                let arr = {...variationcountries}
                if(data.identification[i].procedure_type && data.identification[i].procedure_type.value == "Decentralized" || data.identification[i].procedure_type && data.identification[i].procedure_type.value == "Mutual Recognition") {
                    arr[i] = [...ele.country]
                    if(data.identification[i].rms.value && ele.country.filter(item => item.value == data.identification[i].rms.value) == 0) {
                        arr[i].push(data.identification[i].rms)
                    }
                    if(ele.country.filter(item => item.value == 'All' == 0)) {
                        arr[i].push({label: 'All', value: 'All'})
                    }
                    setVariationCountries(arr)
                }else {
                    arr[i] = [ele.country]
                    setVariationCountries(arr)
                } 
                // setVariationCountries([{id: i, country:ele.country}])
            }
        })
    }

    const StatusProductChange = (i, e) => {
        let arr = {...data}
        arr.statuses[i]['product'] = e
        setData(arr);
        let pr = e.value.split(' - ');        
        data.identification.map(ele => {
            if (ele.product.value == pr[0]) {
                
                let arr = {...statusCountry}
                if(data.identification[i].procedure_type && data.identification[i].procedure_type.value == "Decentralized" || data.identification[i].procedure_type && data.identification[i].procedure_type.value == "Mutual Recognition") {
                    arr[i] = [...ele.country]
                    if(data.identification[i].rms.value && ele.country.filter(item => item.value == data.identification[i].rms.value) == 0) {
                        arr[i].push(data.identification[i].rms)
                    }
                    if(data.identification[i].rms.value && ele.country.filter(item => item.value == 'All' == 0)) {
                        arr[i].push({label: 'All', value: 'All'})
                    }
                    setStatusCountry(arr)
                }else {
                    arr[i] = [ele.country]
                    setStatusCountry(arr)
                } 
                // setVariationCountries([{id: i, country:ele.country}])
            }
        })
    }

    // React.useEffect(() => {
    //     if (!firstTimeRender.current) {
    //         let arr = { ...data}
    //         arr.identification[indexRef.current].country = []
    //         setData(arr)
    //     }
    // }, [data.identification[indexRef.current].product]);



    return (
        <>
        <Head title="Create Variation" />
        <form className="form" onSubmit={handleSubmit} ref={formRef}>
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
                            <Mtab label="Registration Identification" {...a11yProps(0)} style={{ color: identhaserror ? "red": '' }} />
                            <Mtab label="Variation Details" {...a11yProps(1)} style={{ color: variationhaserror ? "red": '' }} />
                            <Mtab label="Status Details" {...a11yProps(2)} style={{color: statuserror ? 'red' : ''}} />
                        </Mtabs>
                        <div value={value} index={0} className="muitab" style={{ display: value != 0 ? 'none' : '' }}>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <button type="button" className="add_doc_form" onClick={addProductFields}>
                                    <i className="bi bi-plus-lg"></i> Add Registration
                                </button>
                            </div>
                            {data.identification.map((element, index) => (
                                <fieldset key={index}>
                                    <legend>Registration {index +1 }</legend>
                                    <div >
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
                                                <span className="form_group_label">Registration ID</span>
                                                <div className="form_group_field">
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors['identification.' + index + '.product'] ? 'red' : ''}}>Product (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={porductOptions}
                                                        name="product"
                                                        onChange={(e) => handleIdentificationSelectChange(index, e, 'product')}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        styles={selectStyles(errors['identification.' + index + '.product'])}
                                                        value={element.product}
                                                    />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors['identification.' + index + '.procedure_type'] ? 'red' : ''}}>Procedure Type (*)</span>
                                                <div className="form_group_field">    
                                                    <Select options={procedure_type}
                                                        name="procedure_type"
                                                        onChange={(e) => handleIdentificationSelectChange(index, e, 'procedure_type')}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        styles={selectStyles(errors['identification.' + index + '.procedure_type'])}
                                                        value={element.procedure_type}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors['identification.' + index + '.country'] ? 'red' : ''}}>Country (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={contries}
                                                        name="country"
                                                        onChange={(e) => handleIdentificationSelectChange(index, e, 'country')}
                                                        className="basic"
                                                        isMulti={element.procedure_type && element.procedure_type.value === "Decentralized" || element.procedure_type && element.procedure_type.value === "Mutual Recognition" ? true : false}
                                                        classNamePrefix="basic"
                                                        ref={ele => selectInputRef.current[index] = ele}
                                                        id={index}
                                                        placeholder=''
                                                        isClearable
                                                        styles={selectStyles(errors['identification.' + index + '.country'])}
                                                        value={data.identification[index].country}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" style={{ display: element.procedure_type && element.procedure_type.value === "Decentralized" || element.procedure_type && element.procedure_type.value === "Mutual Recognition" ? '' : 'none' }}>
                                                <span className="form_group_label">RMS</span>
                                                <div className="form_group_field">
                                                    <Select options={contries}
                                                        name="rms"
                                                        onChange={(e) => handleIdentificationSelectChange(index, e, 'rms')}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={element.rms}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Procedure Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='procedure_num' onChange={(e) => handlIdentificationeChange(index, e)} value={element.procedure_num} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Local Tradename</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='local_tradename' onChange={(e) => handlIdentificationeChange(index, e)} value={element.local_tradename} />
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
                                                        onChange={(e) => handleIdentificationSelectChange(index, e, 'application_stage')}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={element.application_stage}
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
                                                        onChange={(e) => handleIdentificationSelectChange(index, e, 'product_type')}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={element.product_type}
                                                    />
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </fieldset>
                            ))}
                        </div>
                        <div value={value} index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <button type="button" className="add_doc_form" onClick={addVariationFields}>
                                    <i className="bi bi-plus-lg"></i>Add Variation
                                </button>
                            </div>
                            {data.variation.map((element, index) => (
                                <fieldset key={index}>
                                    <legend>Variation {index +1 }</legend>

                                    <div >
                                        {index > 0 ?
                                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                <button style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeVariationFields(index)}>
                                                    <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                </button>
                                            </div>
                                            : ''}
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Product Name</span>
                                                <div className="form_group_field">
                                                    {/* <select name='product' onChange={(e) => handleVariationProductChange(index, e)} defaultValue='' >
                                                        <option defaultValue=''></option>
                                                        {data.identification.map((ele, i) => {
                                                            if (ele.product) {
                                                                return <option value={ele.product} key={i}>{ele.product}</option>
                                                            }
                                                        })}
                                                    </select> */}
                                                    <Select options={data.identification.map((ele) => ele.product)}
                                                        name="product"
                                                        onChange={(e) => handleVariationProductChange(index, e)}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={element.product}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Country</span>
                                                <div className="form_group_field">
                                                    <Select options={variationcountries[index]}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        name='country'
                                                        onChange={(e) => handleVariationSelectChange(index, e, 'country')}
                                                        placeholder=''
                                                        isClearable
                                                        value={element.country}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors['variation.' + index + '.variation_title'] ? 'red' : ''}}>Variation Title (*)</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='variation_title' onChange={(e) => handleVariationChange(index, e)} style={{borderColor : errors['variation.' + index + '.variation_title'] ? 'red' : ''}} value={element.variation_title} />
                                                </div>
                                            </div>
                                            {/* <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors['variation.' + index + '.category'] ? 'red' : ''}}>Variation Category (*)</span>
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
                                                        isClearable
                                                        styles={selectStyles(errors['variation.' + index + '.category'])}
                                                        value={element.category}
                                                    />
                                                </div>
                                            </div> */}
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors['variation.' + index + '.variation_type'] ? 'red' : ''}}>Variation Type (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { value: 'Prior Authorisation (II)', label: 'Prior Authorisation (II)' },
                                                        { value: 'Do and Tell Immediate (IAIN Immediate Notification)', label: 'Do and Tell Immediate (IAIN Immediate Notification)' },
                                                        { value: 'Do and Tell Later (IA)', label: 'Do and Tell Later (IA)' },
                                                        { value: 'Tell, Wait and Do (IB)', label: 'Tell, Wait and Do (IB)' },
                                                        { value: 'Other', label: 'Other' },
                                                    ]}
                                                        name="variation_type"
                                                        onChange={(e) => handleVariationSelectChange(index, e, 'variation_type')}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        styles={selectStyles(errors['variation.' + index + '.variation_type'])}
                                                        value={element.variation_type}
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
                                                        isClearable
                                                        value={element.variation_reason}
                                                        // styles={selectStyles(errors['variation.' + index + '.variation_reason'])}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            {/* <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors['variation.' + index + '.submission_type'] ? 'red' : ''}}>Submission Type (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { value: 'CARDEAC', label: 'CARDEAC' },
                                                        { value: 'Initial MAA', label: 'Initial MAA' },
                                                        { value: 'NPP-Initial', label: 'NPP-Initial' },
                                                    ]}
                                                        name="submission_type"
                                                        onChange={(e) => handleVariationSelectChange(index, e, 'submission_type')}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        styles={selectStyles(errors['variation.' + index + '.submission_type'])}
                                                        value={element.submission_type}
                                                    />
                                                </div>
                                                
                                            </div> */}
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Application N°</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='application_number' onChange={(e) => handleVariationChange(index, e)} value={element.application_number} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Submission/Procedure N°</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='submission_number' onChange={(e) => handleVariationChange(index, e)} value={element.submission_number} />
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
                                                        isClearable
                                                        value={element.submission_format}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Change Control or pre-assessment</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="control" onChange={e => handleVariationChange(index, e)} value={element.control} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            ))}
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
                                            : ''}
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Product Name</span>
                                                <div className="form_group_field">
                                                    <Select options={data.identification.map((ele) => (
                                                        { label: ele.product.label + ' - ' + ele.procedure_type.label, value: ele.product.value + ' - ' + ele.procedure_type.value }
                                                    )
                                                    )}
                                                        name="product"
                                                        onChange={(e) => StatusProductChange(index, e)}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={element.product}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Country</span>
                                                <div className="form_group_field">
                                                    {/* <select defaultValue='' name='country' onChange={(e) => CountryStatusEventChange(index, e)}>
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
                                                    </select> */}
                                                    <Select options={statusCountry[index]}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        name='country'
                                                        onChange={(e) => handleStatusSelectChange(index, e, 'country')}
                                                        placeholder=''
                                                        isClearable
                                                        value={element.country}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors['statuses.' + index + '.status'] ? 'red' : ''}}>Status</span>
                                                <div className="form_group_field">
                                                    <Select options={status}
                                                        onChange={(e) => handleStatusSelectChange(index, e, 'status')}
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
                                                <span className="form_group_label" style={{color: errors['statuses.' + index + '.status_date'] ? 'red' : ''}}>Status Date</span>
                                                <div className="form_group_field">
                                                    <DatePicker name="status_date" 
                                                        selected={element.status_date ? new Date(element.status_date) : ''} 
                                                        onChange={(date) => handleDateChange(index, 'status_date', date)} 
                                                        value={element.status_date ? moment(element.status_date).format('DD-MMM-yy') : ''} 
                                                        style={{ borderColor: errors['statuses.' + index + '.status_date'] ? 'red' : '' }} 
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">eCTD sequence</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="ectd" onChange={e => handleStatusChange(index, e)} value={element.ectd} />
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
                                                <span className="form_group_label">HA Implimentation Deadline</span>
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
                                                        selected={element.actual_implementation ? new Date(element.implimentation_deadline) : ''} 
                                                        onChange={(date) => handleDateChange(index, 'actual_implementation', date)}
                                                        value={element.actual_implementation ? moment(element.actual_implementation).format('DD-MMM-yy') : ''}
                                                    />
                                                    {/* <input type="text" name="actual_implementation" onChange={e => handleStatusChange(index, e)} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                           
                                           {/* <div className="form_group_inline">
                                               <span className="form_group_label">CCDS/Core PIL ref n°</span>
                                               <div className="form_group_field">
                                                   <input type="text" name="cdds" onChange={e => handleStatusChange(index, e)} value={element.cdds} />
                                               </div>
                                           </div> */}
                                           <div className="form_group_inline">
                                               <span className="form_group_label">Status note</span>
                                               <div className="form_group_field">
                                                   <input type="text" name="remarks" onChange={e => handleStatusChange(index, e)} value={element.remarks} />
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
                    <Documents handleChanged={handleDocumentChange} handleDocumentdate={handleDocumentdate} addFormFields={addFormFields} formValues={data.doc} removeDocumentsFields={removeDocumentsFields} handleDocumentSelectChange={handleDocumentSelectChange} />
                </Tab>
            </Tabs>
            <BasicSpeedDial processing={processing} showsavemodel={showsavemodel} showdraftmodel={showdraftmodel} reset={handleReset}  />
            <SaveModal show={showsavemodal.show} handleClose={handleSaveModalClose} handleSubmited={handleSaveModalConfirm} name={showsavemodal.name}  />
        </form>
         <footer style={{margin:'5px 0', display:'flex', justifyContent:'center'}}>
                <Typography variant="p" component="p">Powered By <span style={{color:'rgb(44, 197,162)',fontWeight:'800'}}>Ekemia</span> &copy; 2022</Typography>
            </footer>
            </>
    )
}

export default EditHqproject;