import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Tabs, Tab } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from '@inertiajs/inertia-react';
import Documents from '@/Layouts/Documents';
import ModalS from '@/Components/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SaveModal from '@/Components/SaveModal';
import { key_dates_list, operations, packageCondistion, product_name, procedure_type, apf, atc, SlType, indications, status } from '@/Components/List';
import PropTypes from 'prop-types';
import BasicSpeedDial from '@/Components/SpeedDial';
import { Tabs as Mtabs, Tab as Mtab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Head } from '@inertiajs/inertia-react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Create = (props) => {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        procedure_type: '',
        country: [],
        rms: '',
        procedure_number: '',
        product_type: '',
        application_stage: '',
        registration_title: '',
        product_name: '',
        local_tradename: '',
        registration_holder: '',
        application_number: '',
        dossier_reference: '',
        bremarks: '',
        authorized_pharmaceutical_form: '',
        administrable_pharmaceutical_form: '',
        route_of_admin: [],
        atc: [],
        orphan_designation_status: '',
        orphan_indication_type: '',
        under_intensive_monitoring: '',
        key_dates: [{ date_type: "", date: '', remarks: "" }],
        alternate_number_type: '',
        alternate_number: '',
        remarks: '',
        local_agent_company: '',
        formulations: [{ ingredient: '', strength_type: '', numerator_lower_val: '', numerator_upper_val: '', numerator_unit: '', function: '' }],
        packagings: [
            {
                packaging_type: '', packaging_name: '', package_number: '', description: '', launched: '', first_lunch_date: '', packaging_discontinued: '', discontinuation_date: '', remarks: '',
                packagelif: [{ package_shelf_life_type: '', shelf_life: '', shelf_life_unit: '', package_storage_condition: [], remarks: '' }]
            }
        ],
        indication: '',
        paediatric_use: '',
        age: '',
        manufacturing: [{ manufacturer: '', operation_type: [] }],
        interaction_remarks: '',
        commitment_remarks: '',
        statuses: [{ country: '', status: '', status_date: '', ectd_sequence: '', change_control_ref: '', internal_submission_reference: '', remarks: '' }],
        doc: [{ document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: '' }],
        created_by: props.auth.user.id,
    });

    const [show, setShow] = useState(false);
    const [packagehaserror, setPackagehaserror] = useState(false);
    const [statuserror, setStatusError] = useState(false);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });
    const countryRef = React.useRef();
    const formRef = React.useRef();
    const [value, setValue] = useState(0);

    const handleMChange = (event, newValue) => {

        setValue(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitType = window.event.target.name;
        post(route('storefinishproduct', { 'type': submitType }));
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
        console.log(typeof (e))
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

    let handleAtcChange = (e, k) => {
        let arr = { ...data }
        if (k.action) {
            if (k.action == 'select-option') {
                if (e.length > 0) {
                    arr.atc.push(k.option.value)
                } else {
                    arr.atc.push(e.value)
                }
            } else if (k.action == 'remove-value') {
                let newarr = arr.atc.filter((ele) => {
                    return ele != k.removedValue.value
                });
                arr.atc = newarr;
            } else {
                arr.atc.length = 0
            }

        }
        setData(arr);
        clearErrors("atc");
    }

    let handleRoutOfAdminChange = (e, k) => {
        let arr = { ...data }
        if (k.action) {
            if (k.action == 'select-option') {
                if (e.length > 0) {
                    arr.route_of_admin.push(k.option.value)
                } else {
                    arr.route_of_admin.push(e.value)
                }
            } else if (k.action == 'remove-value') {
                let newarr = arr.route_of_admin.filter((ele) => {
                    return ele != k.removedValue.value
                });
                arr.route_of_admin = newarr;
            } else {
                arr.route_of_admin.length = 0
            }

        }
        setData(arr);
        clearErrors("route_of_admin")
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
    }

    const handleSelectChange = (e, name) => {

        if (!e) {
            e = {
                value: ''
            }
        }
        setData(name.name, e.value);
        clearErrors(name.name)
    }

    let addFormFields = () => {
        let arr = { ...data };
        arr.doc.push({ document_type: '', document_title: '', language: '', version_date: '', dremarks: '', document: '' });
        setData(arr);
    }

    const addDatesFields = () => {
        let arr = { ...data };
        arr.key_dates.push({ date_type: "", date: '', remarks: "" });
        setData(arr);
    }

    const removeDateFields = (i) => {
        let arr = { ...data };
        arr.key_dates.splice(i, 1);
        setData(arr);
    }

    const addFormulationValues = () => {
        let arr = { ...data };
        arr.formulations.push({ ingredient: "", strength_type: "", numerator_lower_val: "", numerator_upper_val: "", numerator_unit: "", function: "" });
        setData(arr);
    }

    let removeFormulationFields = (i) => {
        let arr = { ...data };
        arr.formulations.splice(i, 1);
        setData(arr);
    }

    let addPackageValues = () => {
        let arr = { ...data };
        arr.packagings.push({ packaging_type: "", packaging_name: "", package_number: "", description: "", launched: "", first_lunch_date: '', packaging_discontinued: "", discontinuation_date: '', remarks: '', packagelif: [{ package_shelf_life_type: "", shelf_life: "", shelf_life_unit: "", package_storage_condition: [] }] })
        setData(arr);
    }

    let removePackageValues = (i) => {
        let arr = { ...data };
        arr.packagings.splice(i, 1);
        setData(arr);
    }

    let addPackagelifeValues = (i) => {
        let newArr = { ...data };
        newArr.packagings[i].packagelif.push({ package_shelf_life_type: '', shelf_life: '', shelf_life_unit: '', package_storage_condition: [] });
        setData(newArr)
    }

    let removePackagelifeValues = (index, i) => {

        let newArr = { ...data };
        newArr.packagings[index].packagelif.splice(i, 1);
        setData(newArr);
    }

    let addManufacturerFields = () => {
        let newArr = { ...data };
        newArr.manufacturing.push({ manufacturer: '', operation_type: [] });
        setData(newArr);
    }

    let removeManufacturerFields = (i) => {
        let newArr = { ...data };
        newArr.manufacturing.splice(i, 1);
        setData(newArr);
    }

    let addStatusesFields = () => {
        let newArr = { ...data };
        newArr.statuses.push({ country: '', status: '', status_date: '', ectd_sequence: '', change_control_ref: '', internal_submission_reference: '', remarks: '' });
        setData(newArr);
    }

    let removeStatusFields = (i) => {
        let newArr = { ...data };
        newArr.statuses.splice(i, 1);
        setData(newArr);
    }

    let removeDocumentsFields = (i) => {
        let newArr = { ...data };
        newArr.doc.splice(i, 1);
        setData(newArr);
    }

    let handleKyDateChange = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.key_dates[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let handleKyDateTypeChange = (i, e) => {
        if (!e) {
            e = {
                value: ''
            }
        }
        let newFormValues = { ...data };
        newFormValues.key_dates[i]['date_type'] = e.value;
        setData(newFormValues);
    }

    let handleDateChange = (i, name, e) => {
        let arr = { ...data };
        switch (name) {
            case 'date':
                arr.key_dates[i][name] = e;
                break;
            case 'first_lunch_date':
                arr.packagings[i][name] = e;
                break;
            case 'discontinuation_date':
                arr.packagings[i][name] = e;
                break;
            case 'status_date':
                arr.statuses[i][name] = e;
                // clearErrors(errors['statuses.'+ i +'.status_date']);
                clearErrors('statuses.' + i + '.' + name)
        }
        setData(arr);
    }

    let handleFormulationSelectChange = (i, e, name) => {
        if (!e) {
            e = {
                value: ''
            }
        }
        let newFormValues = { ...data };
        newFormValues.formulations[i][name] = e.value;
        setData(newFormValues);
    }


    let handleFormulationsChange = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.formulations[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let handlePackageSelectChange = (i, e, name) => {
        if (!e) {
            e = {
                value: ''
            }
        }
        let newFormValues = { ...data };
        newFormValues.packagings[i][name] = e.value;
        setData(newFormValues);
    }

    let handlePackagingsChange = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.packagings[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('packagings.' + i + '.' + e.target.name)
    }

    let handleStatusSelectChange = (i, e) => {
        if (!e) {
            e = {
                value: ''
            }
        }
        let newFormValues = { ...data };
        newFormValues.statuses[i]['status'] = e.value;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.status')
    }

    let handlePackagelifeChange = (index, i, e) => {
        let newFormValues = { ...data };
        newFormValues.packagings[index].packagelif[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let handlePackagelifeSelectChange = (index, i, e, name) => {
        if (!e) {
            e = {
                value: ''
            }
        }
        let newFormValues = { ...data };
        newFormValues.packagings[index].packagelif[i][name] = e.value;
        setData(newFormValues);
    }

    let handlePackageslifeSelectChange = (index, i, e, key) => {
        let newFormValues = { ...data };
        switch (key.action) {
            case "select-option":
                newFormValues.packagings[index].packagelif[i]['package_storage_condition'].push(key.option.value);
                break;
            case "remove-value":
                let newarr = newFormValues.packagings[index].packagelif[i]['package_storage_condition'].filter((ele) => {
                    return ele != key.removedValue.value
                });
                newFormValues.packagings[index].packagelif[i]['package_storage_condition'] = newarr;
                break;
            case "clear":
                newFormValues.packagings[index].packagelif[i]['package_storage_condition'].length = 0;
                break;
        }
        setData(newFormValues);
    }

    let handleManufacturerSelectChange = (index, e) => {
        if (!e) {
            e = {
                value: ''
            }
        }
        let newFormValues = { ...data };
        newFormValues.manufacturing[index]['manufacturer'] = e.value;
        setData(newFormValues);
    }

    let handleOperationTypeChange = (i, e, key) => {
        let newFormValues = { ...data };
        switch (key.action) {
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

    let handleStatusesChange = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.statuses[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.' + e.target.name)
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

    let options = props.companies.map(function (companie) {
        return {
            value: companie.name + " - " + companie.city + " - " + companie.countryname,
            label: companie.name + " - " + companie.city + " - " + companie.countryname,
        };
    })

    let options_1 = props.substanceActive.map(function (sa) {
        return { value: sa.ingredient_name, label: sa.ingredient_name };
    })

    let options_2 = props.packagingItemTypes.map(function (pit) {
        return { value: pit.packagin_item_type, label: pit.packagin_item_type };
    })

    let options_4 = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    })

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    const handleShow = (e) => {
        setShow(true)
    }

    const handleDocumentdate = (i, date) => {
        let arr = { ...data };
        arr.doc[i].version_date = date
        setData(arr);
    }

    const handleClose = () => {
        setShow(false)
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

    const handleSaveModalConfirm = () => {
        setSavemodal(prev => ({
            ...prev,
            show: false
        }))
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }

    React.useEffect(() => {
        let l = data.packagings.length
        for (let i = 0; i <= l; i++) {
            if (errors['packagings.' + i + '.packaging_name'] || errors['packagings.' + i + '.package_number'] || errors['packagings.' + i + '.description']) {
                setPackagehaserror(true);
                break;
            } else {
                setPackagehaserror(false);
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

    return (
        <>
            <Head title="Dashboard" />
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">MA - registration creation</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">

                    <form className="form" onSubmit={handleSubmit} ref={formRef} style={{ marginBottom: '10px' }}>
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="New Registration" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
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
                                        <Mtab label="General information" {...a11yProps(0)} style={{ color: errors.procedure_type || errors.procedure_type || errors.application_stage ? 'red' : '' }} />
                                        <Mtab label="Basic information" {...a11yProps(1)} style={{ color: errors.product_name || errors.local_tradename || errors.registration_holder ? 'red' : '' }} />
                                        <Mtab label="Dosage Form / ATC" {...a11yProps(2)} style={{ color: errors.authorized_pharmaceutical_form || errors.route_of_admin || errors.atc ? 'red' : '' }} />
                                        <Mtab label="Orphan Drug Details" {...a11yProps(3)} />
                                        <Mtab label="Under Intensive Monitoring Details" {...a11yProps(4)} />
                                        <Mtab label="Key Dates / Alternate Numbers" {...a11yProps(5)} />
                                        <Mtab label="Local Agent" {...a11yProps(6)} />
                                        <Mtab label="Formulations" {...a11yProps(7)} />
                                        <Mtab label="Packagings" {...a11yProps(8)} style={{ color: packagehaserror ? 'red' : '' }} />
                                        <Mtab label="Indications" {...a11yProps(9)} style={{ color: errors.indication ? 'red' : '' }} />
                                        <Mtab label="Manufacturing & Supply Chain" {...a11yProps(10)} />
                                        <Mtab label="Interaction / Commitment remarks" {...a11yProps(11)} />
                                        <Mtab label="Status Details" {...a11yProps(12)} style={{ color: statuserror ? 'red' : '' }} />
                                        {/* <Mtab label="Documents" {...a11yProps(11)} /> */}

                                    </Mtabs>
                                    <div index={0} className="muitab" style={{ display: value != 0 ? 'none' : '' }}>

                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Procedure Type (*)</span>
                                                <div className="form_group_field">

                                                    <Select options={procedure_type}
                                                        name="procedure_type"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        styles={selectStyles(errors.procedure_type)}
                                                    />
                                                </div>
                                                {/* <p className="errors_wrap" style={{ display: errors.procedure_type ? 'inline-block' : 'none' }}>{errors.procedure_type}</p> */}
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
                                                        isClearable
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
                                                        isClearable
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

                                                    <Select options={[
                                                        { value: 'Finished', label: 'Finished' },
                                                        { value: 'References', label: 'References' },
                                                    ]}
                                                        name="product_type"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        styles={selectStyles(errors.product_type)}
                                                        isClearable

                                                    />
                                                </div>
                                                {/* <p className="errors_wrap" style={{ display: errors.product_type ? 'inline-block' : 'none' }}>{errors.product_type}</p> */}
                                            </div>

                                            <div className="form_group_inline" >
                                                <span className="form_group_label">Application Stage (*)</span>
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
                                                        styles={selectStyles(errors.application_stage)}
                                                        isClearable

                                                    />
                                                </div>
                                                {/* <p className="errors_wrap" style={{ display: errors.application_stage ? 'inline-block' : 'none' }}>{errors.application_stage}</p> */}
                                            </div>
                                        </div>

                                    </div>
                                    <div index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Registration Title</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='registration_title' onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Product Name (*)</span>
                                                <div className="form_group_field">

                                                    <Select options={product_name}
                                                        name="product_name"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        styles={selectStyles(errors.product_name)}
                                                        placeholder=''
                                                        isClearable

                                                    />
                                                </div>
                                                {/* <p className="errors_wrap" style={{ display: errors.product_name ? 'inline-block' : 'none' }}>{errors.product_name}</p> */}
                                            </div>
                                        </div>
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Local Tradename (*)</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="local_tradename" onChange={handleChange} style={{ borderColor: errors.local_tradename ? 'red' : '' }} />
                                                </div>
                                                {/* <p className="errors_wrap" style={{ display: errors.local_tradename ? 'inline-block' : 'none' }}>{errors.local_tradename}</p> */}
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Registration Holder (*)</span>
                                                <div className="form_group_field form_group_holder" >
                                                    <Select options={options}
                                                        name="registration_holder"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        styles={selectStyles(errors.registration_holder)}
                                                        placeholder=''
                                                        isClearable

                                                    />
                                                    {/* <button className="btn-success" type="button" onClick={(e) => handleShow(e)}>
                                                        <span className="lnr lnr-plus-circle"></span>
                                                    </button> */}
                                                    <IconButton color="primary" onClick={(e) => handleShow(e)} aria-label="add an company">
                                                        <AddIcon />
                                                    </IconButton>
                                                </div>
                                                {/* <p className="errors_wrap" style={{ display: errors.registration_holder ? 'inline-block' : 'none' }}>{errors.registration_holder}</p> */}
                                                {/* <p className="errors_wrap" style={{display: errors.local_tradename ? 'inline-block': 'none'}}>{errors.local_tradename}</p> */}
                                            </div>
                                        </div>


                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Application Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="application_number" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" >
                                                <span className="form_group_label">Dossier Reference Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="dossier_reference" onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" >
                                                <span className="form_group_label">Remarks</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="bremarks" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div index={2} className="muitab" style={{ display: value != 2 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Authorized Pharmaceutical Form (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={apf}
                                                        name="authorized_pharmaceutical_form"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        styles={selectStyles(errors.authorized_pharmaceutical_form)}
                                                        placeholder=''
                                                        isClearable

                                                    />
                                                </div>
                                                {/* <p className="errors_wrap" style={{ display: errors.authorized_pharmaceutical_form ? 'inline-block' : 'none' }}>{errors.authorized_pharmaceutical_form}</p> */}
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Administrable pharmaceutical form</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { value: 'Same as authorised pharmaceutical form', label: 'Same as authorised pharmaceutical form' },
                                                        { value: 'Eye drops', label: 'Eye drops' },
                                                        { value: 'Nebuliserer solution', label: 'Nebuliserer solution' },
                                                        { value: 'Solution for injection', label: 'Solution for injection' }
                                                    ]}
                                                        name="administrable_pharmaceutical_form"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Route Of Admin (*)</span>
                                                <div className="form_group_field">

                                                    <Select options={[
                                                        { value: 'Cutaneous use', label: 'Cutaneous use' },
                                                        { value: 'Intrademal use', label: 'Intrademal use' },
                                                        { value: 'Eye drops', label: 'Eye drops' },
                                                        { value: 'Nasal use', label: 'Nasal use' },
                                                        { value: 'Ocular use', label: 'Ocular use' },
                                                        // { value: 'Subcutaneous use', label: 'Subcutaneous use' },
                                                        { value: 'Subcutaneous use', label: 'Subcutaneous use' },
                                                        { value: 'Sublingual use', label: 'Sublingual use' },
                                                    ]}
                                                        name="route_of_admin"
                                                        onChange={(e, k) => handleRoutOfAdminChange(e, k)}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isMulti
                                                        styles={selectStyles(errors.route_of_admin)}

                                                    />
                                                </div>
                                                {/* <p className="errors_wrap" style={{ display: errors.route_of_admin ? 'inline-block' : 'none' }}>{errors.route_of_admin}</p> */}
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">ATC (*)</span>
                                                <div className="form_group_field">

                                                    <Select options={atc}
                                                        name="atc"
                                                        onChange={(e, k) => handleAtcChange(e, k)}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isMulti
                                                        styles={selectStyles(errors.atc)}

                                                    />
                                                </div>
                                                {/* <p className="errors_wrap" style={{ display: errors.atc ? 'inline-block' : 'none' }}>{errors.atc}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div index={3} className="muitab" style={{ display: value != 3 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Orphan Designation Status</span>
                                                <div className="form_group_field">

                                                    <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                                                        name="orphan_designation_status"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable

                                                    />
                                                </div>
                                            </div>

                                            <div className="form_group_inline">
                                                <span className="form_group_label">Orphan Indication Type</span>
                                                <div className="form_group_field">

                                                    <Select options={[{ value: 'Diagnostic', label: 'Diagnostic' }, { value: 'Prevention', label: 'Prevention' }, { value: 'Treatment', label: 'Treatment' }]}
                                                        name="orphan_indication_type"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div index={4} className="muitab" style={{ display: value != 4 ? 'none' : '' }}>
                                        <div className="form_group">
                                            <span className="form_group_label">Under Intensive Monitoring</span>
                                            <div className="form_group_field">

                                                <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                                                    name="under_intensive_monitoring"
                                                    onChange={handleSelectChange}
                                                    className="basic"
                                                    classNamePrefix="basic"
                                                    placeholder=''
                                                    isClearable

                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div index={5} className="muitab" style={{ display: value != 5 ? 'none' : '' }}>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button type="button" className="add_doc_form" onClick={addDatesFields}>
                                                <i className="bi bi-plus-lg"></i>Add Key
                                            </button>
                                        </div>

                                        {data.key_dates.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend>Key {index + 1}</legend>
                                                <div style={{ marginBottom: '30px' }}>

                                                    {index > 0 ?
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" style={{ width: '14px', height: '14px', background: '000', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeDateFields(index)}>
                                                                <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="40" height="40" fill="#000" viewBox="0 0 56 32"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                            </button>
                                                        </div>
                                                        :
                                                        ''}
                                                    <div className="inline_form">
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Key Date Type</span>
                                                            <div className="form_group_field">
                                                                <Select options={key_dates_list}
                                                                    name="date_type"
                                                                    onChange={(e) => handleKyDateTypeChange(index, e)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Date</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="date" selected={data.key_dates[index].date} onChange={(date) => handleDateChange(index, 'date', date)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Remarks</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="remarks" onChange={e => handleKyDateChange(index, e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        ))}

                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Alternate Number Type</span>
                                                <div className="form_group_field">

                                                    <Select options={[
                                                        { value: 'Application Number', label: 'Application Number' },
                                                        { value: 'FDA Listing Number', label: 'FDA Listing Number' },
                                                        { value: 'NDC Number', label: 'NDC Number' },
                                                    ]}
                                                        name="alternate_number_type"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable

                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Alternate Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="alternate_number" onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form_group_inline">
                                            <span className="form_group_label">Remarks</span>
                                            <div className="form_group_field">
                                                <input type="text" name="remarks" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div index={6} className="muitab" style={{ display: value != 6 ? 'none' : '' }}>
                                        <div className="form_group">
                                            <span className="form_group_label">Local Agent Company</span>
                                            <div className="form_group_field">

                                                <Select options={options}
                                                    name="local_agent_company"
                                                    onChange={handleSelectChange}
                                                    className="basic"
                                                    classNamePrefix="basic"
                                                    styles={selectStyles(errors.local_agent_company)}
                                                    placeholder=''
                                                    isClearable

                                                />
                                                {/* <button className="btn-success" style={{ background: '#77a6f7', width: '6%' }} type="button" onClick={(e) => handleShow(e)}>
                                                    <span className="lnr lnr-plus-circle"></span>
                                                </button> */}
                                                <IconButton color="primary" onClick={(e) => handleShow(e)} aria-label="add an company">
                                                    <AddIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>

                                    <div index={7} className="muitab" style={{ display: value != 7 ? 'none' : '' }}>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Formulation" onClick={addFormulationValues}>
                                                <i className="bi bi-plus-lg"></i>Add Formulation
                                            </button>
                                        </div>
                                        {data.formulations.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend >Formulation {index + 1}</legend>
                                                <div>

                                                    {index > 0 ?
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeFormulationFields(index)}>
                                                                <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                            </button>
                                                        </div>
                                                        :
                                                        ''}
                                                    <div className="inline_form" >

                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Ingredient</span>
                                                            <div className="form_group_field">
                                                                <Select options={options_1}
                                                                    name="ingredient"
                                                                    onChange={(e) => handleFormulationSelectChange(index, e, 'ingredient')}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Function</span>
                                                            <div className="form_group_field">
                                                                <Select options={[
                                                                    { value: 'Active', label: 'Active' },
                                                                    { value: 'Excipient', label: 'Excipient' },
                                                                ]}
                                                                    name="function"
                                                                    onChange={(e) => handleFormulationSelectChange(index, e, 'function')}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="inline_form" >
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Strength Type</span>
                                                            <div className="form_group_field">
                                                                <Select options={[
                                                                    { value: 'Approximately', label: 'Approximately' },
                                                                    { value: 'Average', label: 'Average' },
                                                                    { value: 'Equal', label: 'Equal' },
                                                                    { value: 'Not less than', label: 'Not less than' },
                                                                    { value: 'q.s ad', label: '' },
                                                                    { value: 'q.s ad pH 12', label: 'q.s ad pH 12' },
                                                                    { value: 'q.s ad pH 5', label: 'q.s ad pH 5' },
                                                                    { value: 'Range', label: 'Range' },
                                                                    { value: 'Up To', label: 'Up To' },
                                                                ]}
                                                                    name="strength_type"
                                                                    onChange={(e) => handleFormulationSelectChange(index, e, 'strength_type')}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Numerator Lower Val</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="numerator_lower_val" onChange={(e) => handleFormulationsChange(index, e)} />
                                                            </div>
                                                        </div>

                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Numerator Upper Val</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="numerator_upper_val" onChange={(e) => handleFormulationsChange(index, e)} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Numerator Unit</span>
                                                            <div className="form_group_field">

                                                                <Select options={[
                                                                    { value: '% (W/V)', label: '% (W/V)' },
                                                                    { value: '% (W/W)', label: '% (W/W)' },
                                                                    { value: 'IC', label: 'IC' },
                                                                    { value: 'IR', label: 'IR' },
                                                                    { value: 'mg', label: 'mg' },
                                                                    { value: 'ug', label: 'ug' },
                                                                ]}
                                                                    name="numerator_unit"
                                                                    onChange={(e) => handleFormulationSelectChange(index, e, 'numerator_unit')}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        ))}
                                    </div>

                                    <div index={8} className="muitab" style={{ display: value != 8 ? 'none' : '' }}>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Package" onClick={addPackageValues}>
                                                <i className="bi bi-plus-lg"></i> Add Packaging
                                            </button>
                                        </div>

                                        {data.packagings.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend >Packaging {index + 1}</legend>
                                                <div style={{ padding: "10px", marginBottom: '10px' }}>
                                                    {index > 0 ?
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" style={{ width: '14px', height: '14px', background: '000', padding: '0', margin: '0 0 20px 0' }} onClick={() => removePackageValues(index)}>
                                                                <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="40" height="40" fill="#000" viewBox="0 0 56 32"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                            </button>
                                                        </div>
                                                        :
                                                        ''}
                                                    <div className="inline_form">
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Packaging Type</span>
                                                            <div className="form_group_field">
                                                                <Select options={options_2}
                                                                    name="packaging_type"
                                                                    onChange={(e) => handlePackageSelectChange(index, e, 'packaging_type')}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Packaging Name (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="packaging_name" onChange={(e) => handlePackagingsChange(index, e)} style={{ borderColor: errors['packagings.' + index + '.packaging_name'] ? 'red' : '' }} />
                                                            </div>
                                                            {/* <p className="errors_wrap" style={{ display: errors['packagings.' + index + '.packaging_name'] ? 'inline-block' : 'none' }}>{errors['packagings.' + index + '.packaging_name']}</p> */}
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Package Size (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="package_number" onChange={(e) => handlePackagingsChange(index, e)} style={{ borderColor: errors['packagings.' + index + '.package_number'] ? 'red' : '' }} />
                                                            </div>
                                                            {/* <p className="errors_wrap" style={{ display: errors['packagings.' + index + '.package_number'] ? 'inline-block' : 'none' }}>{errors['packagings.' + index + '.package_number']}</p> */}
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Description (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="description" onChange={(e) => handlePackagingsChange(index, e)} style={{ borderColor: errors['packagings.' + index + '.description'] ? 'red' : '' }} />
                                                            </div>
                                                            {/* <p className="errors_wrap" style={{ display: errors['packagings.' + index + '.description'] ? 'inline-block' : 'none' }}>{errors['packagings.' + index + '.description']}</p> */}
                                                        </div>
                                                    </div>
                                                    <div className="inline_form">
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Launched</span>
                                                            <div className="form_group_field">
                                                                <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: 'Not Applicable', label: 'Not Applicable' }]}
                                                                    name="launched"
                                                                    onChange={(e) => handlePackageSelectChange(index, e, 'launched')}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">First Launch Date</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="first_lunch_date" selected={data.packagings[index].first_lunch_date} onChange={(date) => handleDateChange(index, 'first_lunch_date', date)} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Packaging Discontinued</span>
                                                            <div className="form_group_field">
                                                                <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: '', label: 'Not Applicable' }]}
                                                                    name="packaging_discontinued"
                                                                    onChange={(e) => handlePackageSelectChange(index, e, 'packaging_discontinued')}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Discontinuation Date</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="discontinuation_date" selected={data.packagings[index].discontinuation_date} onChange={(date) => handleDateChange(index, 'discontinuation_date', date)} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div>
                                                        <div className='form_group_inline'>
                                                            <span className='form_group_label'>Remarks</span>
                                                            <div className='form_group_field'>
                                                                <input type="text" name='remarks' onChange={(e) => handlePackagingsChange(index, e)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                        <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Package life" onClick={() => addPackagelifeValues(index)}>
                                                            <i className="bi bi-plus-lg"></i>Add Shelf-life
                                                        </button>
                                                    </div>

                                                    {element.packagelif.map((ele, i) => (
                                                        <fieldset key={i} style={{ border: '1px dotted #e6e6e6' }}>
                                                            <legend>Shelf-life {index + 1}-{i + 1}</legend>
                                                            <div style={{ padding: '20px' }}>
                                                                {i > 0 ?
                                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                                        <button type="button" style={{ width: '14px', height: '14px', background: '000', padding: '0', margin: '0 0 20px 0' }} onClick={() => removePackagelifeValues(index, i)}>
                                                                            <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="40" height="40" fill="#000" viewBox="0 0 56 32"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                                        </button>
                                                                    </div>
                                                                    :
                                                                    ''}
                                                                <div className="inline_form">

                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Shelf Life</span>
                                                                        <div className="form_group_field">
                                                                            <input name="shelf_life" onChange={(e) => handlePackagelifeChange(index, i, e)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Shelf-life Unit</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={[
                                                                                { value: 'Days', label: 'Days' },
                                                                                { value: 'Hours', label: 'Hours' },
                                                                                { value: 'Months', label: 'Months' },
                                                                                { value: 'Weeks', label: 'Weeks' },
                                                                                { value: 'Years', label: 'Years' },
                                                                            ]}
                                                                                onChange={(e) => handlePackagelifeSelectChange(index, i, e, 'shelf_life_unit')}
                                                                                name='shelf_life_unit'
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                isClearable
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Package Shelf-life Type</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={SlType}
                                                                                name='package_shelf_life_type'
                                                                                onChange={(e) => handlePackagelifeSelectChange(index, i, e, 'package_shelf_life_type')}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                isClearable
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Package Storage Condition</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={packageCondistion}
                                                                                onChange={(e, key) => handlePackageslifeSelectChange(index, i, e, key)}
                                                                                isMulti name="package_storage_condition"
                                                                                className="basic" classNamePrefix="basic"
                                                                                placeholder=''
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className='form_group_label'>Remarks</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name='remarks' onChange={(e) => handlePackagelifeChange(index, i, e)}  />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    ))}


                                                </div>
                                            </fieldset>
                                        ))}
                                    </div>

                                    <div index={9} className="muitab" style={{ display: value != 9 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Indications (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={indications}
                                                        name="indication"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        styles={selectStyles(errors.indication)}
                                                        isClearable
                                                    />
                                                </div>
                                                <p className="errors_wrap" style={{ display: errors.indication ? 'inline-block' : 'none' }}>{errors.indication}</p>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Paediatric Use</span>
                                                <div className="form_group_field">
                                                    <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                                                        name="paediatric_use"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" style={{ display: data.paediatric_use == "Yes" ? "" : 'none' }}>
                                                <span className="form_group_label">Age</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='age' onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div index={10} className="muitab" style={{ display: value != 10 ? 'none' : '' }}>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Manufacturer" onClick={addManufacturerFields}>
                                                <i className="bi bi-plus-lg"></i> Add Manufacturer
                                            </button>
                                        </div>
                                        {data.manufacturing.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend>Manufacturer {index + 1}</legend>
                                                <div >
                                                    {index > 0 ?
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" style={{ width: '14px', height: '14px', background: '000', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeManufacturerFields(index)}>
                                                                <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="40" height="40" fill="#000" viewBox="0 0 56 32"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                            </button>
                                                        </div>
                                                        :
                                                        ''}
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
                                                                    isClearable

                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Operation Type</span>
                                                            <div className="form_group_field">
                                                                <Select className="basic"
                                                                    name="operation_type"
                                                                    onChange={(e, key) => handleOperationTypeChange(index, e, key)}
                                                                    classNamePrefix="basic"
                                                                    options={operations}
                                                                    isMulti
                                                                    placeholder=''

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        ))}
                                    </div>
                                    <div index={11} className="muitab" style={{ display: value != 11 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Interaction remarks</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='interaction_remarks' onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Commitment remarks</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='commitment_remarks' onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div index={12} className="muitab" style={{ display: value != 12 ? 'none' : '' }}>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Status" onClick={addStatusesFields}>
                                                <i className="bi bi-plus-lg"></i>Add Status
                                            </button>
                                        </div>

                                        {data.statuses.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend>Status {index + 1}</legend>
                                                <div >

                                                    {index > 0 ?
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
                                                                <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                            </button>
                                                        </div>
                                                        :
                                                        ''}
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
                                                                    isClearable
                                                                />
                                                            </div>
                                                            {/* <p className="errors_wrap" style={{ display: errors['statuses.' + index + '.status'] ? 'inline-block' : 'none' }}>{errors['statuses.' + index + '.status']}</p> */}
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Status Date (*)</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="status_date" selected={data.statuses[index].status_date} onChange={(date) => handleDateChange(index, 'status_date', date)} />
                                                            </div>
                                                            <p className="errors_wrap" style={{ display: errors['statuses.' + index + '.status_date'] ? 'inline-block' : 'none' }}>{errors['statuses.' + index + '.status_date']}</p>
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
                                                            <input type="text" name="sremarks" onChange={(e) => handleStatusesChange(index, e)} />
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
                        <BasicSpeedDial showsavemodel={showsavemodel} showdraftmodel={showdraftmodel} />

                    </form>
                </div>

                <ModalS show={show} handleClose={handleClose} />
                <SaveModal show={showsavemodal.show} handleClose={handleSaveModalClose} handleSubmited={handleSaveModalConfirm} name={showsavemodal.name} />
            </div>
            <footer style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="p" component="p">Powered By <span style={{ color: 'rgb(44, 197,162)', fontWeight: '800' }}>Ekemia</span> &copy; 2022</Typography>
            </footer>
        </>
    )
}

Create.layout = page => <Authenticated children={page} auth={page.props.auth} />

export default Create;