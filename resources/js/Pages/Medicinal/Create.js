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
import { Tabs as Mtabs, Tab as Mtab, IconButton, Tooltip, Radio, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Head } from '@inertiajs/inertia-react';
import moment from 'moment';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { CheckBox } from '@mui/icons-material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ModalP from '@/Components/Modalp';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import ActionAlerts from '@/Components/ActionAlerts';

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
    const { data, setData, post, processing, errors, clearErrors, reset, setDefaults } = useForm({
        procedure_type: '',
        country: [],
        rms: '',
        procedure_number: '',
        // product_type: '',
        application_stage: '',
        // registration_title: '',
        product_name: '',
        local_tradename: '',
        registration_holder: '',
        application_number: '',
        dossier_reference: '',
        pv_contact_email: '',
        pv_contact_phone: '',
        change_control_ref: '',
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
        formulations: [
            { ingredient: [{ ingredient: '', strength_type: '', numerator_lower_val: '', numerator_upper_val: '', numerator_unit: '', function: '', denominator_value: '', denominator_unit: '' }] }
        ],
        packagings: [
            {
                sellable_unit_determined_by: '', product_legal_status_of_supply: '', packaging_type: '', packaging_registration_number: '', packaging_name: '', description: '', launched: '', first_lunch_date: '', packaging_discontinued: '', discontinuation_date: '', remarks: '',
                packagelif: [{ package_shelf_life_type: '', shelf_life: '', shelf_life_unit: '', package_storage_condition: [], remarks: '' }]
            }
        ],
        indication: '',
        paediatric_use: '',
        age: '',
        manufacturing: [{ manufacturer: '', operation_type: [] }],
        interaction_remarks: '',
        commitment_remarks: '',
        statuses: [{ country: '', status: '', status_date: '', ectd_sequence: '', internal_submission_reference: '', remarks: '' }],
        next_renewals: '',
        nr_submission_deadline: '',
        nr_date: '',
        doc: [{ document_type: '', document_title: '', language: '', version_date: '', cdds: '', dremarks: '', document: '' }],
        created_by: props.auth.user.id,
    });

    const handleReset = () => {
        reset()
    }

    const [show, setShow] = useState(false);
    const [showMP, setShowMP] = useState(false);
    const [packagehaserror, setPackagehaserror] = useState(false);
    const [statuserror, setStatusError] = useState(false);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });
    const countryRef = React.useRef();
    const formRef = React.useRef();
    const [value, setValue] = useState(0);
    const [statusCountry, setStatusCountry] = useState([{ label: 'All', value: 'All' }]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const handleMChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let submitType = window.event.target.name;
        post(route('storefinishproduct', { 'type': submitType }), {
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

    const handleChange = (e) => {

        e.target.name == "next_renewals" ? setData(e.target.name, e.target.checked) : setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
    }

    const handleSelectChange = (selectedOption, name) => {
        setData(name.name, selectedOption);
        clearErrors(name.name)
    }

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
        setData('country', [])
    }, [data.procedure_type]);

    let handleKeyDateSelectChange = (selectedOption, name, i) => {
        let newFormValues = { ...data };
        newFormValues.key_dates[i][name.name] = selectedOption;
        setData(newFormValues);
    }


    let addFormFields = () => {
        let arr = { ...data };
        arr.doc.push({ document_type: '', document_title: '', language: '', version_date: '', cdds: '', dremarks: '', document: '' });
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
        arr.formulations.push({ ingredient: [{ ingredient: "", strength_type: "", numerator_lower_val: "", numerator_upper_val: "", numerator_unit: "", function: "", denominator_value: "", denominator_unit: "" }] });
        setData(arr);
    }

    const addIngredient = (i) => {
        let newArr = { ...data };
        newArr.formulations[i].ingredient.push({ ingredient: "", strength_type: "", numerator_lower_val: "", numerator_upper_val: "", numerator_unit: "", function: "", denominator_value: "", denominator_unit: "" })
        setData(newArr);
    }

    const removeIngredient = (index, i) => {
        let newArr = { ...data };
        newArr.formulations[index].ingredient.splice(i, 1);
        setData(newArr);
    }

    let removeFormulationFields = (i) => {
        let arr = { ...data };
        arr.formulations.splice(i, 1);
        setData(arr);
    }

    let addPackageValues = () => {
        let arr = { ...data };
        arr.packagings.push({ sellable_unit_determined_by: '', product_legal_status_of_supply: '', packaging_type: "", packaging_registration_number: '', packaging_name: "", description: "", launched: "", first_lunch_date: '', packaging_discontinued: "", discontinuation_date: '', remarks: '', packagelif: [{ package_shelf_life_type: "", shelf_life: "", shelf_life_unit: "", package_storage_condition: [], remarks: '' }] })
        setData(arr);
    }

    let removePackageValues = (i) => {
        let arr = { ...data };
        arr.packagings.splice(i, 1);
        setData(arr);
    }

    let addPackagelifeValues = (i) => {
        let newArr = { ...data };
        newArr.packagings[i].packagelif.push({ package_shelf_life_type: '', shelf_life: '', shelf_life_unit: '', package_storage_condition: [], remarks: '' });
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
        newArr.statuses.push({ country: '', status: '', status_date: '', ectd_sequence: '', internal_submission_reference: '', remarks: '' });
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

    let handleNrDateChange = (name, date) => {
        setData(name, date)
    }

    let handleFormulationSelectChange = (selectedOption, name, index, i) => {
        let newFormValues = { ...data };
        newFormValues.formulations[index].ingredient[i][name.name] = selectedOption;
        setData(newFormValues);
    }


    let handleFormulationsChange = (index, i, e) => {
        let newFormValues = { ...data };
        newFormValues.formulations[index].ingredient[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let handlePackageSelectChange = (selectedOption, name, i) => {
        let newFormValues = { ...data };
        newFormValues.packagings[i][name.name] = selectedOption;
        setData(newFormValues);
        clearErrors('packagings.' + i + '.' + name.name)
    }

    let handlePackagingsChange = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.packagings[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('packagings.' + i + '.' + e.target.name)
    }

    let handleStatusSelectChange = (selectedOption, name, i) => {
        let newFormValues = { ...data };
        newFormValues.statuses[i][name.name] = selectedOption;
        setData(newFormValues);
        clearErrors('statuses.' + i + '.' + name.name)
    }

    let handlePackagelifeChange = (index, i, e) => {
        let newFormValues = { ...data };
        newFormValues.packagings[index].packagelif[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let handlePackagelifeSelectChange = (selectedOption, name, i, j) => {
        let newFormValues = { ...data };
        newFormValues.packagings[i].packagelif[j][name.name] = selectedOption;
        setData(newFormValues);
    }

    let handleManufacturerSelectChange = (selectedOption, name, i) => {
        let newFormValues = { ...data };
        newFormValues.manufacturing[i][name.name] = selectedOption;
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

    let porductOptions = props.products.map(function (product) {
        return {
            value: product.name,
            label: product.name,
        }
    })

    let options = props.companies.map(function (companie) {
        return {
            value: companie.name + " - " + companie.adressone + " - " + companie.city + " - " + companie.countryname,
            label: companie.name + " - " + companie.adressone + " - " + companie.city + " - " + companie.countryname,
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

    const handleCloseMP = () => {
        setShowMP(false)
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
        handleSubmit(name);
        //formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true, detail: name }))
    }

    const handleDocumentSelectChange = (selectedOption, name, i) => {
        let arr = { ...data };
        arr.doc[i][name.name] = selectedOption;
        setData(arr);
    }

    React.useEffect(() => {
        let l = data.packagings.length
        for (let i = 0; i <= l; i++) {
            if (errors['packagings.' + i + '.packaging_name'] || errors['packagings.' + i + '.packaging_type']) {
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

    const closeAlert = () => {
        setAlert(false);
    }

    return (
        <>
            <Head title="MA - Registration Creation Create" />
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">MA - registration creation</h3>
                </div>
            </div>
            {alert ? <ActionAlerts message={alertContent} closeAlert={closeAlert} /> : <></>}
            <div className="row">
                <div className="col-md-12">

                    <form className="form" onSubmit={handleSubmit} ref={formRef} id="ccform" style={{ marginBottom: '10px' }}>
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="New Registration" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
                                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}>
                                    <Mtabs
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={value}
                                        onChange={handleMChange}
                                        aria-label="Vertical tabs example"
                                        sx={{ borderRight: 1, borderColor: 'divider' }}
                                    >
                                        <Mtab label="General information" {...a11yProps(0)} style={{ color: errors.country || errors.procedure_type || errors.application_stage ? 'red' : '' }} />
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
                                        <Mtab label="Next Renewals" {...a11yProps(13)} />
                                    </Mtabs>
                                    <div index={0} className="muitab" style={{ display: value != 0 ? 'none' : '' }}>
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.procedure_type ? 'red' : '' }}>Procedure Type (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={procedure_type}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        styles={selectStyles(errors.procedure_type)}
                                                        value={data.procedure_type}
                                                        onChange={handleSelectChange}
                                                        name="procedure_type"
                                                        isClearable
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.country ? 'red' : '' }}>Country (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={options_4}
                                                        name="country"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        isMulti={data.procedure_type && data.procedure_type.value === 'Decentralized' || data.procedure_type && data.procedure_type.value === 'Mutual Recognition' ? true : false}
                                                        ref={ele => countryRef.current = ele}
                                                        placeholder=''
                                                        isClearable
                                                        styles={selectStyles(errors.country)}
                                                        value={data.country}
                                                        defaultValue={data.country}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" style={{ display: data.procedure_type && data.procedure_type.value === 'Decentralized' || data.procedure_type && data.procedure_type.value === 'Mutual Recognition' ? '' : 'none' }}>
                                                <span className="form_group_label">RMS</span>
                                                <div className="form_group_field">
                                                    <Select options={options_4}
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
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Procedure Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="procedure_number" onChange={handleChange} value={data.procedure_number} />
                                                </div>
                                            </div>
                                            {/* <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors.product_type ? 'red' : ''}}>Product Type (*)</span>
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
                                                        styles={selectStyles(errors.product_type)}
                                                        value={data.product_type}
                                                    />
                                                </div>
                                            </div> */}
                                            <div className="form_group_inline" >
                                                <span className="form_group_label" style={{ color: errors.application_stage ? 'red' : '' }}>Submission Type (*)</span>
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
                                                        value={data.application_stage}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='npw'>
                                            <div></div>
                                            <div>
                                                <Button type='button' size='small' variant='outlined' onClick={() => handleMChange('', 1)}>Next</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                                        <div className='inline_form'>
                                            {/* <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.registration_title ? 'red' : '' }}>Registration Title (*)</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='registration_title' onChange={handleChange} style={{ borderColor: errors.registration_title ? 'red' : '' }} value={data.registration_title} />
                                                </div>
                                            </div> */}
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.product_name ? 'red' : '' }}>Product (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={porductOptions}
                                                        name="product_name"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        styles={selectStyles(errors.product_name)}
                                                        placeholder=''
                                                        isClearable
                                                        value={data.product_name}
                                                    />
                                                    <IconButton color="primary" onClick={(e) => setShowMP(true)} aria-label="add product">
                                                        <AddIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <Tooltip arrow title="Section 1 of the SmPC or equivalent outside the European Union">
                                                    <span className="form_group_label" style={{ color: errors.local_tradename ? 'red' : '' }}>Local Tradename (*)</span>
                                                </Tooltip>
                                                <div className="form_group_field">
                                                    <input type="text" name="local_tradename" onChange={handleChange} style={{ borderColor: errors.local_tradename ? 'red' : '' }} value={data.local_tradename} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='inline_form'>

                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.registration_holder ? 'red' : '' }}>Registration Holder (*)</span>
                                                <div className="form_group_field form_group_holder" >
                                                    <Select options={options}
                                                        name="registration_holder"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        styles={selectStyles(errors.registration_holder)}
                                                        placeholder=''
                                                        isClearable
                                                        value={data.registration_holder}
                                                    />
                                                    <IconButton color="primary" onClick={(e) => handleShow(e)} aria-label="add an company">
                                                        <AddIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Application Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="application_number" onChange={handleChange} value={data.application_number} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" >
                                                <Tooltip arrow title="Required for French Specialities: NL Number">
                                                    <span className="form_group_label">Dossier Reference Number</span>
                                                </Tooltip>
                                                <div className="form_group_field">
                                                    <input type="text" name="dossier_reference" onChange={handleChange} value={data.dossier_reference} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">PV Contact Email</span>
                                                <div className="form_group_field">
                                                    <input type="email" name="pv_contact_email" onChange={handleChange} value={data.pv_contact_email} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" >
                                                <span className="form_group_label">PV Contact Phone</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="pv_contact_phone" onChange={handleChange} value={data.pv_contact_phone} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Change Control Ref</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="change_control_ref" onChange={handleChange} value={data.change_control_ref} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='inline_form'>
                                            <div className="form_group_inline" >
                                                <span className="form_group_label">Remarks</span>
                                                <div className="form_group_field">
                                                    <textarea type="text" name="bremarks" onChange={handleChange} value={data.bremarks} />
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
                                    <div index={2} className="muitab" style={{ display: value != 2 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.authorized_pharmaceutical_form ? 'red' : '' }}>Authorized Pharmaceutical Form (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={apf}
                                                        name="authorized_pharmaceutical_form"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        styles={selectStyles(errors.authorized_pharmaceutical_form)}
                                                        placeholder=''
                                                        isClearable
                                                        value={data.authorized_pharmaceutical_form}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Administrable pharmaceutical Form</span>
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
                                                        value={data.administrable_pharmaceutical_form}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.route_of_admin ? 'red' : '' }} >Route Of Admin (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { value: 'Cutaneous use', label: 'Cutaneous use' },
                                                        { value: 'Intrademal use', label: 'Intrademal use' },
                                                        { value: 'Eye drops', label: 'Eye drops' },
                                                        { value: 'Nasal use', label: 'Nasal use' },
                                                        { value: 'Ocular use', label: 'Ocular use' },
                                                        { value: 'Subcutaneous use', label: 'Subcutaneous use' },
                                                        { value: 'Sublingual use', label: 'Sublingual use' },
                                                    ]}
                                                        isMulti
                                                        name="route_of_admin"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        styles={selectStyles(errors.route_of_admin)}
                                                        value={data.route_of_admin}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.atc ? 'red' : '' }}>ATC (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={atc}
                                                        name="atc"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isMulti
                                                        styles={selectStyles(errors.atc)}
                                                        value={data.atc}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 1)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 3)} variant='outlined'>Next</Button>
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
                                                        value={data.orphan_designation_status}
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
                                                        value={data.orphan_indication_type}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 2)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 4)} variant='outlined'>Next</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div index={4} className="muitab" style={{ display: value != 4 ? 'none' : '' }}>
                                        <div className="form_group_inline" style={{ marginBottom: '20px' }}>
                                            <span className="form_group_label">Under Intensive Monitoring</span>
                                            <div className="form_group_field">
                                                <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                                                    name="under_intensive_monitoring"
                                                    onChange={handleSelectChange}
                                                    className="basic"
                                                    classNamePrefix="basic"
                                                    placeholder=''
                                                    isClearable
                                                    value={data.under_intensive_monitoring}
                                                />
                                            </div>
                                        </div>
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 3)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 5)} variant='outlined'>Next</Button>
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
                                                                    onChange={(selectedOption, name) => handleKeyDateSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                    value={data.key_dates[index].date_type}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Date</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="date" selected={data.key_dates[index].date} onChange={(date) => handleDateChange(index, 'date', date)} value={data.key_dates[index].date ? moment(data.key_dates[index].date).format('DD-MMM-yy') : ''} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Remarks</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="remarks" onChange={e => handleKyDateChange(index, e)} value={data.key_dates[index].remarks} />
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
                                                        value={data.alternate_number_type}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Alternate Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="alternate_number" onChange={handleChange} value={data.alternate_number} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form_group_inline" style={{ marginBottom: '20px' }}>
                                            <span className="form_group_label">Remarks</span>
                                            <div className="form_group_field">
                                                <input type="text" name="remarks" onChange={handleChange} value={data.remarks} />
                                            </div>
                                        </div>
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 4)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 6)} variant='outlined'>Next</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div index={6} className="muitab" style={{ display: value != 6 ? 'none' : '' }}>
                                        <div className="form_group_inline" style={{ marginBottom: '20px' }}>
                                            <span className="form_group_label">Local Agent Company</span>
                                            <div className="form_group_field">
                                                <Select options={options}
                                                    name="local_agent_company"
                                                    onChange={handleSelectChange}
                                                    className="basic"
                                                    classNamePrefix="basic"
                                                    placeholder=''
                                                    isClearable
                                                    value={data.local_agent_company}
                                                />
                                                {/* <button className="btn-success" style={{ background: '#77a6f7', width: '6%' }} type="button" onClick={(e) => handleShow(e)}>
                                                    <span className="lnr lnr-plus-circle"></span>
                                                </button> */}
                                                <IconButton color="primary" onClick={(e) => handleShow(e)} aria-label="add an company">
                                                    <AddIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 5)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 7)} variant='outlined'>Next</Button>
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
                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                        <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Formulation" onClick={() => addIngredient(index)}>
                                                            <i className="bi bi-plus-lg"></i>Add Ingredient
                                                        </button>
                                                    </div>
                                                    {element.ingredient.map((ele, i) =>
                                                        <fieldset key={i}>
                                                            <legend >Ingredient {i + 1}</legend>
                                                            <div>
                                                                {i > 0 ?
                                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                                        <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeIngredient(index, i)}>
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
                                                                                onChange={(selectedOption, name) => handleFormulationSelectChange(selectedOption, name, index, i)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                isClearable
                                                                                value={ele.ingredient}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Function</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={[
                                                                                { value: 'Active', label: 'Active' },
                                                                                { value: 'Excipient', label: 'Excipient' },
                                                                                { value: 'Adjuvant', label: 'Adjuvant' },
                                                                            ]}
                                                                                name="function"
                                                                                onChange={(selectedOption, name) => handleFormulationSelectChange(selectedOption, name, index, i)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                isClearable
                                                                                value={ele.function}
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
                                                                                onChange={(selectedOption, name) => handleFormulationSelectChange(selectedOption, name, index, i)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                isClearable
                                                                                value={ele.strength_type}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Numerator Lower Val</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="numerator_lower_val" onChange={(e) => handleFormulationsChange(index, i, e)} value={ele.numerator_lower_val} />
                                                                        </div>
                                                                    </div>
                                                                    {ele.strength_type && ele.strength_type.value == 'Range' ?
                                                                        <div className="form_group_inline">
                                                                            <span className="form_group_label">Numerator Upper Val</span>
                                                                            <div className="form_group_field">
                                                                                <input type="text" name="numerator_upper_val" onChange={(e) => handleFormulationsChange(index, i, e)} value={ele.numerator_upper_val} />
                                                                            </div>
                                                                        </div> : ''
                                                                    }

                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Numerator Unit</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={[
                                                                                { value: '% (W/V)', label: '% (W/V)' },
                                                                                { value: '% (W/W)', label: '% (W/W)' },
                                                                                { value: 'µg', label: 'µg' },
                                                                                { value: 'Each', label: 'Each' },
                                                                                { value: 'IC', label: 'IC' },
                                                                                { value: 'IR', label: 'IR' },
                                                                                { value: 'mg', label: 'mg' },
                                                                                { value: 'ml', label: 'ml' },
                                                                                { value: 'Tablet', label: 'Tablet' },
                                                                                { value: 'Vial', label: 'Vial' },
                                                                            ]}
                                                                                name="numerator_unit"
                                                                                onChange={(selectedOption, name) => handleFormulationSelectChange(selectedOption, name, index, i)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                isClearable
                                                                                value={ele.numerator_unit}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Denominator Value</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="denominator_value" onChange={(e) => handleFormulationsChange(index, i, e)} value={ele.denominator_value} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Denominator Unit</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={[
                                                                                { value: '% (W/V)', label: '% (W/V)' },
                                                                                { value: '% (W/W)', label: '% (W/W)' },
                                                                                { value: 'µg', label: 'µg' },
                                                                                { value: 'Each', label: 'Each' },
                                                                                { value: 'IC', label: 'IC' },
                                                                                { value: 'IR', label: 'IR' },
                                                                                { value: 'mg', label: 'mg' },
                                                                                { value: 'ml', label: 'ml' },
                                                                                { value: 'Tablet', label: 'Tablet' },
                                                                                { value: 'Vial', label: 'Vial' },
                                                                            ]}
                                                                                name="denominator_unit"
                                                                                onChange={(selectedOption, name) => handleFormulationSelectChange(selectedOption, name, index, i)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                isClearable
                                                                                value={ele.denominator_unit}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    )}
                                                </div>
                                            </fieldset>
                                        ))}
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 6)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 8)} variant='outlined'>Next</Button>
                                            </div>
                                        </div>
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
                                                            <span className="form_group_label" style={{ color: errors['packagings.' + index + '.sellable_unit_determined_by'] ? 'red' : '' }}>Sellable Unit Determined By (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={[
                                                                    { label: 'Product', value: 'Product' },
                                                                    { label: 'Packaging', value: 'Packaging' }
                                                                ]}
                                                                    name="sellable_unit_determined_by"
                                                                    onChange={(selectedOption, name) => handlePackageSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                    styles={selectStyles(errors['packagings.' + index + '.sellable_unit_determined_by'])}
                                                                    value={data.packagings[index].sellable_unit_determined_by}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form_group_inline">
                                                            <span className="form_group_label" style={{ color: errors['packagings.' + index + '.product_legal_status_of_supply'] ? 'red' : '' }}>Product Legal Status of Supply (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={[
                                                                    { label: 'Medicinal product subject to medical prescription exempt for some presentations', value: 'Medicinal product subject to medical prescription exempt for some presentations' },
                                                                    { label: 'Subject to veterinary prescription except for some pack sizes', value: 'Subject to veterinary prescription except for some pack sizes' },
                                                                    { label: 'Subject to veterinary prescription', value: 'Subject to veterinary prescription' },
                                                                    { label: 'Not subject to veterinary prescription', value: 'Not subject to veterinary prescription' },
                                                                    { label: 'Legacy - as applicable', value: 'Legacy - as applicable' },
                                                                    { label: 'Subject to medical prescription', value: 'Subject to medical prescription' },
                                                                    { label: 'Not subject to medical prescription', value: 'Not subject to medical prescription' },
                                                                    { label: 'On medical prescription for renewable or non-renewable delivery', value: 'On medical prescription for renewable or non-renewable delivery' },
                                                                    { label: 'Subject to special and restricted medical prescription', value: 'Subject to special and restricted medical prescription' },
                                                                    { label: 'Subject to special medical prescription', value: 'Subject to special medical prescription' },
                                                                    { label: 'Subject to restricted medical prescription', value: 'Subject to restricted medical prescription' },
                                                                    { label: 'On medical prescription for renewable delivery', value: 'On medical prescription for renewable delivery' },
                                                                    { label: 'On medical prescription for non-renewable delivery', value: 'On medical prescription for non-renewable delivery' },
                                                                ]}
                                                                    name="product_legal_status_of_supply"
                                                                    onChange={(selectedOption, name) => handlePackageSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                    styles={selectStyles(errors['packagings.' + index + '.product_legal_status_of_supply'])}
                                                                    value={data.packagings[index].product_legal_status_of_supply}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form_group_inline">
                                                            <span className="form_group_label" style={{ color: errors['packagings.' + index + '.packaging_type'] ? 'red' : '' }}>Packaging Type (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options_2}
                                                                    name="packaging_type"
                                                                    onChange={(selectedOption, name) => handlePackageSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                    styles={selectStyles(errors['packagings.' + index + '.packaging_type'])}
                                                                    value={data.packagings[index].packaging_type}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="inline_form">
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label" style={{ color: errors['packagings.' + index + '.packaging_registration_number'] ? 'red' : '' }}>Packaging Registration number</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="packaging_registration_number" onChange={(e) => handlePackagingsChange(index, e)} value={data.packagings[index].packaging_registration_number} />
                                                            </div>
                                                        </div>

                                                        <div className="form_group_inline">

                                                            <Tooltip arrow title='Concerned part of the Localtradenames of section 1 of SmPC, if not available, name in the Marketing Authorization document applicable to this packaging'>
                                                                <span className="form_group_label" style={{ color: errors['packagings.' + index + '.packaging_name'] ? 'red' : '' }}>
                                                                    Packaging Name (*)
                                                                </span>
                                                            </Tooltip>

                                                            <div className="form_group_field">
                                                                <input type="text" name="packaging_name" onChange={(e) => handlePackagingsChange(index, e)} style={{ borderColor: errors['packagings.' + index + '.packaging_name'] ? 'red' : '' }} value={data.packagings[index].packaging_name} />
                                                            </div>
                                                        </div>

                                                        {/* <div className="form_group_inline">
                                                            <span className="form_group_label">Package Size (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="package_number" onChange={(e) => handlePackagingsChange(index, e)} style={{ borderColor: errors['packagings.' + index + '.package_number'] ? 'red' : '' }} />
                                                            </div>
                                                            
                                                        </div> */}
                                                        <div className="form_group_inline">
                                                            <Tooltip arrow title='Description of sellable unit like "Concerned part of the section 6.5 Nature and contents of container of SmPC"'>
                                                                <span className="form_group_label">Description</span>
                                                            </Tooltip>
                                                            <div className="form_group_field">
                                                                <input type="text" name="description" onChange={(e) => handlePackagingsChange(index, e)} style={{ borderColor: errors['packagings.' + index + '.description'] ? 'red' : '' }} value={data.packagings[index].description} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="inline_form">
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Launched</span>
                                                            <div className="form_group_field">
                                                                <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: 'Not Applicable', label: 'Not Applicable' }]}
                                                                    name="launched"
                                                                    onChange={(selectedOption, name) => handlePackageSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                    value={data.packagings[index].launched}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">First Launch Date</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="first_lunch_date" selected={data.packagings[index].first_lunch_date} onChange={(date) => handleDateChange(index, 'first_lunch_date', date)} value={element.first_lunch_date ? moment(element.first_lunch_date).format('DD-MMM-yy') : ''} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Packaging Discontinued</span>
                                                            <div className="form_group_field">
                                                                <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: '', label: 'Not Applicable' }]}
                                                                    name="packaging_discontinued"
                                                                    onChange={(selectedOption, name) => handlePackageSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                    value={data.packagings[index].packaging_discontinued}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Discontinuation Date</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="discontinuation_date" selected={data.packagings[index].discontinuation_date} onChange={(date) => handleDateChange(index, 'discontinuation_date', date)} value={element.discontinuation_date ? moment(element.discontinuation_date).format('DD-MMM-yy') : ''} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div>
                                                        <div className='form_group_inline'>
                                                            <span className='form_group_label'>Remarks</span>
                                                            <div className='form_group_field'>
                                                                <input type="text" name='remarks' onChange={(e) => handlePackagingsChange(index, e)} value={data.packagings[index].remarks} />
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
                                                                            <input name="shelf_life" onChange={(e) => handlePackagelifeChange(index, i, e)} value={data.packagings[index].packagelif[i].shelf_life} />
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
                                                                                onChange={(selectedOption, name) => handlePackagelifeSelectChange(selectedOption, name, index, i)}
                                                                                name='shelf_life_unit'
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                isClearable
                                                                                value={data.packagings[index].packagelif[i].shelf_life_unit}
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
                                                                                onChange={(selectedOption, name) => handlePackagelifeSelectChange(selectedOption, name, index, i)}
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                isClearable
                                                                                value={data.packagings[index].packagelif[i].package_shelf_life_type}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Package Storage Condition</span>
                                                                        <div className="form_group_field">
                                                                            <Select options={packageCondistion}
                                                                                onChange={(selectedOption, name) => handlePackagelifeSelectChange(selectedOption, name, index, i)}
                                                                                isMulti
                                                                                name="package_storage_condition"
                                                                                className="basic"
                                                                                classNamePrefix="basic"
                                                                                placeholder=''
                                                                                value={data.packagings[index].packagelif[i].package_storage_condition}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <Tooltip arrow title="Any specific information about shelflife ie. SmPC 6.4 Special precautions for storage">
                                                                            <span className='form_group_label'>Shelf-life Remarks</span>
                                                                        </Tooltip>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name='remarks' onChange={(e) => handlePackagelifeChange(index, i, e)} value={data.packagings[index].packagelif[i].remarks} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </fieldset>
                                                    ))}


                                                </div>
                                            </fieldset>
                                        ))}
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 7)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 9)} variant='outlined'>Next</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div index={9} className="muitab" style={{ display: value != 9 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.indication ? 'red' : '' }}>Indications (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={indications}
                                                        name="indication"
                                                        isMulti
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        styles={selectStyles(errors.indication)}
                                                        isClearable
                                                        value={data.indication}
                                                    />
                                                </div>

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
                                                        value={data.paediatric_use}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline" style={{ display: data.paediatric_use && data.paediatric_use.value == "Yes" ? "" : 'none' }}>
                                                <span className="form_group_label">Age</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='age' onChange={handleChange} value={data.age} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 8)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 10)} variant='outlined'>Next</Button>
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
                                                                    onChange={(selectedOption, name) => handleManufacturerSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.manufacturer)}
                                                                    placeholder=''
                                                                    isClearable
                                                                    value={data.manufacturing[index].manufacturer}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Operation Type</span>
                                                            <div className="form_group_field">
                                                                <Select className="basic"
                                                                    name="operation_type"
                                                                    onChange={(selectedOption, name) => handleManufacturerSelectChange(selectedOption, name, index)}
                                                                    classNamePrefix="basic"
                                                                    options={operations}
                                                                    isMulti
                                                                    placeholder=''
                                                                    value={data.manufacturing[index].operation_type}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        ))}
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 9)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 11)} variant='outlined'>Next</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div index={11} className="muitab" style={{ display: value != 11 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Interaction remarks</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='interaction_remarks' onChange={handleChange} value={data.interaction_remarks} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Commitment remarks</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='commitment_remarks' onChange={handleChange} value={data.commitment_remarks} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 10)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 12)} variant='outlined'>Next</Button>
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
                                                <div>
                                                    {index > 0 ?
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
                                                                <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                            </button>
                                                        </div>
                                                        :
                                                        ''}
                                                    <div className="inline_form">
                                                        {data.procedure_type && data.procedure_type.value == 'Decentralized' || data.procedure_type && data.procedure_type.value == 'Mutual Recognition' ?
                                                            <div className="form_group_inline">
                                                                <span className="form_group_label">Country</span>
                                                                <div className="form_group_field">
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
                                                                    value={data.statuses[index].status}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label" style={{ color: errors['statuses.' + index + '.status_date'] ? 'red' : '' }}>Status Date (*)</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="status_date" selected={data.statuses[index].status_date} onChange={(date) => handleDateChange(index, 'status_date', date)} value={element.status_date ? moment(element.status_date).format('DD-MMM-yy') : ''} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">eCTD Sequence</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="ectd_sequence" onChange={(e) => handleStatusesChange(index, e)} value={data.statuses[index].ectd_sequence} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Internal Submission Reference</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="internal_submission_reference" onChange={(e) => handleStatusesChange(index, e)} value={data.statuses[index].internal_submission_reference} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Status note</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="remarks" onChange={(e) => handleStatusesChange(index, e)} value={data.statuses[index].remarks} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        ))}
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 11)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 13)} variant='outlined'>Next</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div index={13} className="muitab" style={{ display: value != 13 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                {/* <span className="form_group_label">Next Renewals ?</span> */}
                                                <div className="form_group_field">
                                                    <FormControl>
                                                        <FormLabel id="demo-row-radio-buttons-group-label">Next Renewals ?</FormLabel>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="row-radio-buttons-group"
                                                        >
                                                            <FormControlLabel value="required" control={<Radio onChange={() => setData('next_renewals', true)} />} label="Required" />
                                                            <FormControlLabel value="notrequired" control={<Radio onChange={() => setData('next_renewals', false)} />} label="Not Required" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                    {/* <input type="checkbox" name="next_renewals" /> */}
                                                    {/* <FormGroup>
                                                        <FormControlLabel control={<Radio name='next_renewals' onChange={() => setData('next_renewals', true)} />} label="Required" />
                                                        <FormControlLabel control={<Radio name='next_renewals' onChange={() => setData('next_renewals', false)} />} label="Not Required" />
                                                    </FormGroup> */}
                                                </div>
                                            </div>
                                        </div>
                                        {data.next_renewals ?
                                            <div className="inline_form">
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Next Renewal Submission Deadline</span>
                                                    <div className="form_group_field">
                                                        <DatePicker name='nr_submission_deadline' selected={data.nr_submission_deadline} onChange={(date) => handleNrDateChange('nr_submission_deadline', date)} value={data.nr_submission_deadline ? moment(data.nr_submission_deadline).format('DD-MMM-yy') : ''} />
                                                    </div>
                                                </div>
                                                <div className="form_group_inline">
                                                    <span className="form_group_label">Next Renewal Date</span>
                                                    <div className="form_group_field">
                                                        <DatePicker name='nr_date' selected={data.nr_date} onChange={(date) => handleNrDateChange('nr_date', date)} value={data.nr_date ? moment(data.nr_date).format('DD-MMM-yy') : ''} />
                                                    </div>
                                                </div>
                                            </div>
                                            : ''}
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 12)} variant='outlined'>Previous</Button>
                                            </div>
                                            {/* <div>
                                            <Button type='button' size='small' onClick={() => handleMChange('', 9)} variant='outlined'>Next</Button>
                                        </div> */}
                                        </div>
                                    </div>

                                </Box>
                            </Tab>
                            <Tab eventKey="second" title="Documents" style={{ border: '1px solid #dee2e6', height: 'calc(100vh - 200px)', padding: '20px 0' }}>
                                <Documents handleChanged={handleDocumentChange} handleDocumentdate={handleDocumentdate} addFormFields={addFormFields} formValues={data.doc} removeDocumentsFields={removeDocumentsFields} handleDocumentSelectChange={handleDocumentSelectChange} />
                            </Tab>
                        </Tabs>
                        <BasicSpeedDial reset={handleReset} showsavemodel={showsavemodel} showdraftmodel={showdraftmodel} processing={processing} />

                    </form>
                </div>
                <ModalP show={showMP} handleClose={handleCloseMP} />
                <ModalS show={show} handleClose={handleClose} />
                <SaveModal show={showsavemodal.show} handleClose={handleSaveModalClose} handleSubmited={handleSaveModalConfirm} name={showsavemodal.name} />
            </div>
            <footer style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="p" component="p">Powered By <span style={{ color: 'rgb(44, 197,162)', fontWeight: '800' }}>EKEMIA</span> &copy; 2022</Typography>
            </footer>
        </>
    )
}

Create.layout = page => <Authenticated children={page} auth={page.props.auth} />

export default Create;