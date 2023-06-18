import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Select from 'react-select';
import { useForm } from '@inertiajs/inertia-react';
import Documents from '@/Layouts/Documents';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ModalS from '@/Components/Modal';
import BasicSpeedDial from '@/Components/SpeedDial';
import { Tabs as Mtabs, Tab as Mtab, Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import SaveModal from '@/Components/SaveModal';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { key_dates_list, operations, packageCondistion, product_name, procedure_type, apf, atc, SlType, indications, status } from '@/Components/List';
import { Head } from '@inertiajs/inertia-react';
import moment from 'moment';
import ModalP from '@/Components/Modalp';
import ActionAlerts from '@/Components/ActionAlerts';

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
        application_stage: '',
        // registration_title: '',
        product_name: '',
        protocol_number: '',
        study_sponsor: '',
        full_study_title: '',
        clinical_phase: '',
        protocol_type: '',
        procedure_number: '',
        paediatric_indication: '',
        investigationnal_code: '',
        application_number: '',
        registration_alternate_number: '',
        registration_number: '',
        registration_date: '',
        change_control_ref: '',
        medicines_regulatory_authority: '',
        remarks: '',
        authorized_pharmaceutical_form: '',
        administrable_pharmaceutical_form: '',
        route_of_admin: [],
        atc: [],
        orphan_designation: '',
        orphan_indication: '',
        under_intensive_monitoring: '',
        key_dates: [{ date_type: "", date: '', remarks: "" }],
        // alternate_number_type: '',
        // alternate_number: '',
        // atcremarks: '',
        local_agent_company: '',
        formulations: [
            { ingredient: [{ ingredient: '', strength_type: '', numerator_lower_val: '', numerator_upper_val: '', numerator_unit: '', function: '', denominator_value: '', denominator_unit: '' }] }
        ],
        packagings: [
            {
                packaging_type: '', packaging_name: '', description: '', launched: '', first_lunch_date: '', packaging_discontinued: '', discontinuation_date: '', remarks: '',
                packagelif: [{ package_shelf_life_type: '', shelf_life: '', shelf_life_unit: '', package_storage_condition: [], remarks: '' }]
            }
        ],

        indication: [],
        // paediatric_use: '',
        manufacturing: [{ manufacturer: '', operation_type: [] }],
        statuses: [{ country: '', status: '', status_date: '', ectd_sequence: '', internal_submission_reference: '', remarks: '' }],
        doc: [{ document_type: '', document_title: '', language: '', version_date: '', cdds: '', dremarks: '', document: '' }],
        created_by: props.auth.user.id,
    });

    const [show, setShow] = useState(false);
    const [showMP, setShowMP] = useState(false);
    const countryRef = React.useRef();
    const [value, setValue] = useState(0);
    const [showsavemodal, setSavemodal] = useState({ show: false, name: '' });
    const [packagehaserror, setPackagehaserror] = useState(false);
    const [statuserror, setStatusError] = useState(false);
    const formRef = React.useRef();
    const [statusCountry, setStatusCountry] = useState([{ label: 'All', value: 'All' }]);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const handleMChange = (event, newValue) => {

        setValue(newValue);
    };

    let operations = [
        { value: "Control site", label: "Control site" },
        { value: "Release site", label: "Release site" },
        { value: "Distributor", label: "Distributor" },
        { value: "Bulk Manufacturer", label: "Bulk Manufacturer" },
        { value: "Exploitant", label: "Exploitant" },
        { value: "Diluent Manufacturer", label: "Diluent Manufacturer" },
        { value: "Active substance Manufacturer", label: "Active substance Manufacturer" },
        { value: "Finished product Manufacturer", label: "Finished product Manufacturer" },
        { value: "Primary Packaging", label: "Primary Packaging" },
        { value: "Secondary Packaging", label: "Secondary Packaging" },
        { value: "Labelling", label: "Labelling" },
        { value: "API Suppliers", label: "API Suppliers" },
        { value: "API Manufacturer", label: "API Manufacturer" },
        { value: "Batch Release", label: "Batch Release" },
        { value: "Packaging of finished product", label: "Packaging of finished product" },
        { value: "Manufacturer", label: "Manufacturer" },
        { value: "Re-Labelling", label: "Re-Labelling" },
        { value: "Re-Packaging", label: "Re-Packaging" },
        { value: "Analytical Testing", label: "Analytical Testing" },
        { value: "Batch control/Testing", label: "Batch control/Testing" },
        { value: "Total Manufacturing", label: "Total Manufacturing" },
        { value: "Packaging", label: "Packaging" },
        { value: "Distilling", label: "Distilling" },
        { value: "Intermediate Product Manufacturing", label: "Intermediate Product Manufacturing" },
        { value: "Raw Material Supply", label: "Raw Material Supply" },
        { value: "Stability Testing", label: "Stability Testing" },
        { value: "Manufacturing Facility", label: "Manufacturing Facility" },
        { value: "Design Facility", label: "Design Facility" },
    ];

    let options_1 = props.substanceActive.map(function (sa) {
        return { value: sa.ingredient_name, label: sa.ingredient_name };
    })

    let options_2 = props.packagingItemTypes.map(function (pit) {
        return { value: pit.packagin_item_type, label: pit.packagin_item_type };
    })

    let options_3 = [
        { value: "ASR Birthdate", label: "ASR Birthdate" },
        { value: "ASR Submission Date", label: "ASR Submission Date" },
        { value: "Development International Birth Date", label: "Development International Birth Date" },
        { value: "International Birth Date", label: "International Birth Date" },
        { value: "NR : Date of Inventory (STG Inventory FORM)", label: "NR : Date of Inventory (STG Inventory FORM)" },
        { value: "NR : Start Marketing Date", label: "NR : Start Marketing Date" },
        { value: "PSUR Birthdate", label: "PSUR Birthdate" },
        { value: "PSUR Submission Date", label: "PSUR Submission Date" },
        { value: "Study End Date", label: "Study End Date" },
        { value: "Study End Date Submitted", label: "Study End Date Submitted" },
        { value: "Study Results Submitted", label: "Study Results Submitted" },
        { value: "Study Start Date", label: "Study Start Date" },
    ];

    let packageCondistion = [
        { value: "Atmospheric pressure limitation", label: "Atmospheric pressure limitation" },
        { value: "Avoid direct sunlight", label: "Avoid direct sunlight" },
        { value: "Between 1 and 75% relative humidity", label: "Between 1 and 75% relative humidity" },
        { value: "Between 8 and 80% RH", label: "Between 8 and 80% RH" },
        { value: "Dangerous voltage - this way up - period after opening", label: "Dangerous voltage - this way up - period after opening" },
        { value: "Do not expose to extreme heat", label: "Do not expose to extreme heat" },
        { value: "Do not freeze", label: "Do not freeze" },
        { value: "Do not refrigerate", label: "Do not refrigerate" },
        { value: "Do not refrigerate or freeze", label: "Do not refrigerate or freeze" },
        { value: "Do not store above 25°", label: "Do not store above 25°" },
        { value: "Do not store above 30°", label: "Do not store above 30°" },
        { value: "Do not store at extreme temperature and humidity", label: "Do not store at extreme temperature and humidity" },
        { value: "Fragile, handle with care", label: "Fragile, handle with care" },
        { value: "Humidity limitation", label: "Humidity limitation" },
        { value: "In order to protect from light", label: "In order to protect from light" },
        { value: "In order to protect from moisture", label: "In order to protect from moisture" },
        { value: "Keep away from sunlight", label: "Keep away from sunlight" },
        { value: "Keep dry", label: "Keep dry" },
        { value: "Keep the container in the outer carton", label: "Keep the container in the outer carton" },
        { value: "Keep the container tightly closed", label: "Keep the container tightly closed" },
        { value: "Keep the transdermal patch in the sachet until use", label: "Keep the transdermal patch in the sachet until use" },
        { value: "Lower limit of temperature", label: "Lower limit of temperature" },
    ]

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

    let options_4 = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    })

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


    const handleSelectChange = (selectedOption, name) => {
        setData(name.name, selectedOption);
        clearErrors(name.name)
    }

    // const handleStudySponsorChange = (e, name) => {
    //     setData(name.name, e.value)
    // }

    let handleProcedureTypeChange = (e) => {
        countryRef.current.setValue([]);
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
            country: []
        }));
        clearErrors(e.target.name);
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
    }

    let addFormFields = () => {
        let arr = { ...data };
        arr.doc.push({ document_type: '', document_title: '', language: '', version_date: '', cdds: '', dremarks: '', document: '' });
        setData(arr);
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
        }
        setData(arr);
        clearErrors('statuses.' + i + '.' + name)
    }

    let handleRegistrationDateChange = (date) => {
        console.log(date)
        setData('registration_date', date)
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

    let handleSelectIngredientChange = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.formulations[i]['ingredient'] = e.value;
        setData(newFormValues);
    }

    let handlePackageTypeSelectChange = (i, e) => {
        if (!e) {
            e = {
                value: ''
            }
        }
        let newFormValues = { ...data };
        newFormValues.packagings[i]["packaging_type"] = e.value;
        setData(newFormValues);
        clearErrors('packagings.' + i + '.' + 'packaging_type')
    }

    let handleFormulationsChange = (index, i, e) => {
        let newFormValues = { ...data };
        newFormValues.formulations[index].ingredient[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let handlePackagingsChange = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.packagings[i][e.target.name] = e.target.value;
        setData(newFormValues);
        clearErrors('packagings.' + i + '.' + e.target.name)
    }

    let handlePackagelifeChange = (index, i, e) => {
        let newFormValues = { ...data };
        newFormValues.packagings[index].packagelif[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    let addPackageValues = () => {
        let arr = { ...data };
        arr.packagings.push({ packaging_type: "", packaging_name: "", description: "", launched: "", first_lunch_date: '', packaging_discontinued: "", discontinuation_date: '', remarks: '', packagelif: [{ package_shelf_life_type: "", shelf_life: "", shelf_life_unit: "", package_storage_condition: [], remarks: "" }] })
        setData(arr);
    }

    let addPackagelifeValues = (i) => {
        let newArr = { ...data };
        newArr.packagings[i].packagelif.push({ package_shelf_life_type: '', shelf_life: '', shelf_life_unit: '', package_storage_condition: [], remarks: '' });
        setData(newArr)
    }

    let handlePackagelifeSelectChange = (selectedOption, name, i, j) => {
        let newFormValues = { ...data };
        newFormValues.packagings[i].packagelif[j][name.name] = selectedOption;
        setData(newFormValues);
    }

    let handlePackageSelectChange = (selectedOption, name, i) => {
        let newFormValues = { ...data };
        newFormValues.packagings[i][name.name] = selectedOption;
        setData(newFormValues);
        clearErrors('packagings.' + i + '.' + name.name)
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

    const addFormulationValues = () => {
        let arr = { ...data };
        arr.formulations.push({ ingredient: [{ ingredient: "", strength_type: "", numerator_lower_val: "", numerator_upper_val: "", numerator_unit: "", function: "", denominator_value: "", denominator_unit: "" }] });
        setData(arr);
    }

    let removeFormulationFields = (i) => {
        let arr = { ...data };
        arr.formulations.splice(i, 1);
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

    const addDatesFields = () => {
        let arr = { ...data };
        arr.key_dates.push({ date_type: "", date: '', remarks: "" });
        setData(arr);
    }

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    let handleKyDateTypeChange = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.key_dates[i]['date_type'] = e.value;
        setData(newFormValues);
    }

    let handleKyDateChange = (i, e) => {
        let newFormValues = { ...data };
        newFormValues.key_dates[i][e.target.name] = e.target.value;
        setData(newFormValues);
    }

    const handleDocumentdate = (i, date) => {
        let arr = { ...data };
        arr.doc[i].version_date = date
        setData(arr);
    }

    const handleShow = (e) => {
        setShow(true)
    }

    const handleSubmit = (name) => {
        // e.preventDefault();
        // let submitType = window.event.target.name;
        post(route('storeclinical', { 'type': name }), {
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

    const handleClose = () => {
        setShow(false)
    }

    const handleCloseMP = () => {
        setShowMP(false)
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

    const handleSaveModalConfirm = (name) => {
        setSavemodal(prev => ({
            ...prev,
            show: false
        }))
        handleSubmit(name)
        // formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    }

    let handleReset = () => {

        reset()
    }

    let removeDocumentsFields = (i) => {
        let newArr = { ...data };
        newArr.doc.splice(i, 1);
        setData(newArr);
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

    const removeDateFields = (i) => {
        let arr = { ...data };
        arr.key_dates.splice(i, 1);
        setData(arr);
    }

    let removePackagelifeValues = (index, i) => {

        let newArr = { ...data };
        newArr.packagings[index].packagelif.splice(i, 1);
        setData(newArr);
    }

    let removePackageValues = (i) => {
        let arr = { ...data };
        arr.packagings.splice(i, 1);
        setData(arr);
    }

    let removeStatusFields = (i) => {
        let newArr = { ...data };
        newArr.statuses.splice(i, 1);
        setData(newArr);
    }

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

    let handleKeyDateSelectChange = (selectedOption, name, i) => {
        let newFormValues = { ...data };
        newFormValues.key_dates[i][name.name] = selectedOption;
        setData(newFormValues);
    }

    let handleFormulationSelectChange = (selectedOption, name, index, i) => {
        let newFormValues = { ...data };
        newFormValues.formulations[index].ingredient[i][name.name] = selectedOption;
        setData(newFormValues);
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

    React.useEffect(() => {
        if (data.procedure_type && data.procedure_type.value == "European Procedure") {
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

    const closeAlert = () => {
        setAlert(false);
    }


    return (
        <>
            <Head title="Clinical Registration Creation Create" />
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">registration creation - clinical</h3>
                </div>
            </div>
            {alert ? <ActionAlerts message={alertContent} closeAlert={closeAlert} /> : <></>}
            <div className="row">
                <div className="col-md-12">

                    <form className="form" ref={formRef} onSubmit={handleSubmit}>
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
                                        <Mtab label="General information" {...a11yProps(0)} style={{ color: errors.procedure_type || errors.application_stage || errors.country ? 'red' : '' }} />
                                        <Mtab label="Basic information" {...a11yProps(1)} style={{ color: errors.product_name ? 'red' : '' }} />
                                        <Mtab label="Dosage Form / ATC" {...a11yProps(2)} style={{ color: errors.authorized_pharmaceutical_form || errors.route_of_admin || errors.atc ? 'red' : '' }} />
                                        <Mtab label="Orphan Drug Details" {...a11yProps(3)} />
                                        <Mtab label="Under Intensive Monitoring Details" {...a11yProps(4)} />
                                        <Mtab label="Key Dates / Alternate Numbers" {...a11yProps(5)} />
                                        <Mtab label="Local Agent" {...a11yProps(6)} />
                                        <Mtab label="Formulations" {...a11yProps(7)} />
                                        <Mtab label="Packagings" {...a11yProps(8)} style={{ color: packagehaserror ? 'red' : '' }} />
                                        <Mtab label="Indications" {...a11yProps(9)} style={{ color: errors.indication ? 'red' : '' }} />
                                        <Mtab label="Manufacturing & Supply Chain" {...a11yProps(10)} />
                                        <Mtab label="Status Details" {...a11yProps(11)} style={{ color: statuserror ? 'red' : '' }} />
                                    </Mtabs>
                                    <div value={value} index={0} className="muitab" style={{ display: value != 0 ? 'none' : '' }}>
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.procedure_type ? 'red' : '' }}>Procedure Type (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { value: "National Procedure", label: "National Procedure" },
                                                        { value: "European Procedure", label: "European Procedure" },
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
                                                <span className="form_group_label" style={{ color: errors.country ? 'red' : '' }}>Country (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={options_4}
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
                                            <div className="form_group_inline" style={{ display: data.procedure_type && data.procedure_type.value === 'European Procedure' ? '' : 'none' }}>
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

                                            <div className="form_group_inline" >
                                                <span className="form_group_label" style={{ color: errors.application_stage ? 'red' : '' }}>Submission Type (*)</span>
                                                <div className="form_group_field">

                                                    <Select options={[
                                                        { label: 'CTA', value: 'CTA' },
                                                        { label: 'PIP', value: 'PIP' },
                                                        { label: 'IND', value: 'IND' },
                                                        { label: 'Ethics Approvals', value: 'Ethics Approvals' },
                                                    ]}
                                                        name="application_stage"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        styles={selectStyles(errors.application_stage)}
                                                        value={data.application_stage}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='npw'>

                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 1)} variant='outlined'>Next</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div value={value} index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                                        <div className='inline_form'>
                                            {/* <div className="form_group_inline">
                                                <span className="form_group_label" style={{color: errors.registration_title ? 'red' : ''}}>Registration Title (*)</span>
                                                <div className="form_group_field">
                                                    <input type="text" name='registration_title' onChange={handleChange} style={{borderColor: errors.registration_title ? 'red' : ''}} value={data.registration_title} />
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
                                                <span className="form_group_label">Protocol Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="protocol_number" onChange={handleChange} value={data.protocol_number} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Study Sponsor</span>
                                                <div className="form_group_field">
                                                    <Select options={options}
                                                        name="study_sponsor"
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        onChange={handleSelectChange}
                                                        isClearable
                                                        value={data.study_sponsor}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Full Study Title</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="full_study_title" onChange={handleChange} value={data.full_study_title} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Clinical Phase</span>
                                                <div className="form_group_field">
                                                    <div className="form_group_field">
                                                        <Select options={[
                                                            { label: 'Clinical phase 1', value: 'Clinical phase 1' },
                                                            { label: 'Clinical phase 2', value: 'Clinical phase 2' },
                                                            { label: 'Clinical phase 1&2', value: 'Clinical phase 1&2' },
                                                            { label: 'Clinical phase 3', value: 'Clinical phase 3' },
                                                            { label: 'Clinical phase 2&3', value: 'Clinical phase 2&3' },
                                                            { label: 'Clinical phase 4', value: 'Clinical phase 4' },
                                                        ]}
                                                            name="clinical_phase"
                                                            onChange={handleSelectChange}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                            placeholder=''
                                                            isClearable
                                                            value={data.clinical_phase}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Protocol Type</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { label: 'Dose Response', value: 'Dose Response' },
                                                        { label: 'Efficacy', value: 'Efficacy' },
                                                        { label: 'Safety', value: 'Safety' },
                                                    ]}
                                                        name="protocol_type"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={data.protocol_type}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Peadiatric indication</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { label: 'Peadiatric Only', value: 'Peadiatric Only' },
                                                        { label: 'Adults Only', value: 'Adults Only' },
                                                        { label: 'Peadiatric & Adults', value: 'Peadiatric & Adults' },
                                                    ]}
                                                        name="paediatric_indication"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={data.paediatric_indication}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Procedure Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="procedure_number" onChange={handleChange} value={data.procedure_number} />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Investigationnal Code</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="investigationnal_code" onChange={handleChange} value={data.investigationnal_code} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Application  Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="application_number" onChange={handleChange} value={data.application_number} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Medicines Regulatory Authority</span>
                                                <div className="form_group_field">
                                                    <Select options={options}
                                                        name='medicines_regulatory_authority'
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
                                                <span className="form_group_label">Registration number type</span>
                                                <div className="form_group_field">
                                                    {/* <input type="text" name="registration_alternate_number" onChange={handleChange} value={data.registration_alternate_number} /> */}
                                                    <Select options={[
                                                        { label: 'EudraCT', value: 'EudraCT' },
                                                        { label: 'IND number', value: 'IND number' },
                                                        { label: 'Registration number ', value: 'Registration number ' },
                                                        { label: 'Sponsor study report number', value: 'Sponsor study report number' },
                                                        { label: 'ClinicalTrials.gov Identifier', value: 'ClinicalTrials.gov Identifier' },
                                                        { label: 'UTN', value: 'UTN' },
                                                    ]}
                                                        name='registration_alternate_number'
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Registration number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="registration_number" onChange={handleChange} value={data.registration_number} />
                                                    {/* <Select options={[
                                                        { label: 'EudraCT', value: 'EudraCT' },
                                                        { label: 'IND number', value: 'IND number' },
                                                        { label: 'registration number ', value: 'registration number ' },
                                                        { label: 'Sponsor study report number', value: 'Sponsor study report number' },
                                                        { label: 'ClinicalTrials.gov Identifier', value: 'ClinicalTrials.gov Identifier' },
                                                        { label: 'UTN', value: 'UTN' },
                                                    ]}
                                                        name='registration_number'
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Registration Date</span>
                                                <div className="form_group_field">
                                                    <DatePicker selected={data.registration_date} name="registration_date" onChange={(date) => handleRegistrationDateChange(date)} value={data.registration_date ? moment(data.registration_date).format('DD-MMM-yy') : ''} />
                                                </div>
                                            </div>
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Change Control Ref</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="change_control_ref" onChange={handleChange} value={data.change_control_ref} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Remarks</span>
                                                <div className="form_group_field">
                                                    <textarea rows="3" name="remarks" onChange={handleChange} value={data.remarks} />
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
                                        <div className='inline_form'>
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
                                                        value={data.authorized_pharmaceutical_form}
                                                    />
                                                </div>
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
                                                        value={data.administrable_pharmaceutical_form}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='inline_form'>
                                            <div className="form_group_inline">
                                                <span className="form_group_label" style={{ color: errors.route_of_admin ? 'red' : '' }}>Route Of Admin (*)</span>
                                                <div className="form_group_field">
                                                    <Select options={[
                                                        { value: 'Cutaneous use', label: 'Cutaneous use' },
                                                        { value: 'Intrademal use', label: 'Intrademal use' },
                                                        { value: 'Nasal use', label: 'Nasal use' },
                                                        { value: 'Ocular use', label: 'Ocular use' },
                                                        { value: 'Subcutaneous use', label: 'Subcutaneous use' },
                                                        { value: 'Sublingual use', label: 'Sublingual use' },
                                                    ]}
                                                        name="route_of_admin"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isMulti
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
                                    <div value={value} index={3} className="muitab" style={{ display: value != 3 ? 'none' : '' }}>
                                        <div className="inline_form">
                                            <div className="form_group_inline">
                                                <span className="form_group_label">Orphan Designation Status</span>
                                                <div className="form_group_field">
                                                    <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                                                        name="orphan_designation"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={data.orphan_designation}
                                                    />
                                                </div>
                                            </div>

                                            <div className="form_group_inline">
                                                <span className="form_group_label">Orphan Indication Type</span>
                                                <div className="form_group_field">
                                                    <Select options={[{ value: 'Diagnostic', label: 'Diagnostic' }, { value: 'Prevention', label: 'Prevention' }, { value: 'Treatment', label: 'Treatment' }]}
                                                        name="orphan_indication"
                                                        onChange={handleSelectChange}
                                                        className="basic"
                                                        classNamePrefix="basic"
                                                        placeholder=''
                                                        isClearable
                                                        value={data.orphan_indication}
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
                                    <div value={value} index={4} className="muitab" style={{ display: value != 4 ? 'none' : '' }}>
                                        <div className="form_group_inline">
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
                                    <div value={value} index={5} className="muitab" style={{ display: value != 5 ? 'none' : '' }}>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            <Button variant="outlined" size="small" style={{ marginBottom: '10px' }} onClick={addDatesFields} endIcon={<AddIcon />}>
                                                Add Key
                                            </Button>
                                        </div>
                                        {data.key_dates.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend>Key {index + 1}</legend>
                                                <div key={index} style={{ marginBottom: '20px' }}>
                                                    {index > 0 ?
                                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                            <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeDateFields(index)}>
                                                                <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                            </button>
                                                        </div>
                                                        :
                                                        ''}
                                                    <div className="inline_form">
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Key Date Type</span>
                                                            <div className="form_group_field">
                                                                <Select options={options_3}
                                                                    name="date_type"
                                                                    onChange={(selectedOption, name) => handleKeyDateSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                    value={element.date_type}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Date</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="date"
                                                                    selected={data.key_dates[index].date}
                                                                    onChange={(date) => handleDateChange(index, 'date', date)}
                                                                    value={element.date ? moment(element.date).format('DD-MMM-yy') : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Remarks</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="remarks" onChange={e => handleKyDateChange(index, e)} value={element.remarks} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        ))}

                                        <div className="inline_form">
                                            {/* <div className="form_group_inline">
                                                <span className="form_group_label">Alternate Number Type</span>
                                                <div className="form_group_field"> 
                                                    <Select options={[
                                                        { label: 'Application Number', value: 'Application Number' },
                                                        { label: 'FDA Listing Number', value: 'FDA Listing Number' },
                                                        { label: 'NDC Number', value: 'NDC Number' },
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
                                            </div> */}
                                            {/* <div className="form_group_inline">
                                                <span className="form_group_label">Alternate Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="alternate_number" onChange={handleChange} value={data.alternate_number} />
                                                </div>
                                            </div> */}
                                        </div>
                                        {/* <div className="form_group_inline">
                                            <span className="form_group_label">Remarks</span>
                                            <div className="form_group_field">
                                                <input type="text" name="atcremarks" onChange={handleChange} value={data.atcremarks} />
                                            </div>
                                        </div> */}
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 4)} variant='outlined'>Previous</Button>
                                            </div>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 6)} variant='outlined'>Next</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div value={value} index={6} className="muitab" style={{ display: value != 6 ? 'none' : '' }}>
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
                                                    value={data.local_agent_company}
                                                />
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
                                    <div value={value} index={7} className="muitab" style={{ display: value != 7 ? 'none' : '' }}>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            <Button variant="outlined" size="small" style={{ marginBottom: '10px' }} onClick={addFormulationValues} endIcon={<AddIcon />}>
                                                Add Formulation
                                            </Button>
                                        </div>
                                        {data.formulations.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend>Formulation {index + 1}</legend>
                                                <div key={index}>
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
                                    <div value={value} index={8} className="muitab" style={{ display: value != 8 ? 'none' : '' }}>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            {/* <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Package" onClick={addPackageValues}>
                                                <i className="bi bi-plus-lg"></i> Add Package
                                            </button> */}
                                            <Button variant="outlined" size="small" style={{ marginBottom: '10px' }} onClick={addPackageValues} endIcon={<AddIcon />}>
                                                Add Package
                                            </Button>
                                        </div>
                                        {data.packagings.map((element, index) => (
                                            <fieldset key={index}>
                                                <legend >Packaging {index + 1}</legend>
                                                <div style={{ padding: "20px" }}>
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
                                                            <span className="form_group_label" style={{ color: errors['packagings.' + index + '.packaging_type'] ? 'red' : '' }}>Packaging Type</span>
                                                            <div className="form_group_field">
                                                                <Select options={options_2}
                                                                    name="packaging_type"
                                                                    onChange={(selectedOption, name) => handlePackageSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                    // styles={selectStyles(errors['packagings.' + index + '.packaging_type'] ? 'red' : '' )}
                                                                    value={element.packaging_type}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label" style={{ color: errors['packagings.' + index + '.packaging_name'] ? 'red' : '' }}>Packaging Name</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="packaging_name" onChange={(e) => handlePackagingsChange(index, e)} value={element.packaging_name} />
                                                            </div>

                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Description</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="description" onChange={(e) => handlePackagingsChange(index, e)} value={element.description} />
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
                                                                    value={element.launched}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">First Launch Date</span>
                                                            <div className="form_group_field">
                                                                {/* <input type="text" name="first_lunch_date" onChange={(e) => handlePackagingsChange(index, e)} /> */}
                                                                <DatePicker name="first_lunch_date"
                                                                    selected={data.packagings[index].first_lunch_date}
                                                                    onChange={(date) => handleDateChange(index, 'first_lunch_date', date)}
                                                                    value={element.first_lunch_date ? moment(element.first_lunch_date).format('DD-MMM-yy') : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Packaging Discontinued</span>
                                                            <div className="form_group_field">
                                                                <Select options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: 'Not Applicable', label: 'Not Applicable' }]}
                                                                    name="packaging_discontinued"
                                                                    onChange={(selectedOption, name) => handlePackageSelectChange(selectedOption, name, index)}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    placeholder=''
                                                                    isClearable
                                                                    value={element.packaging_discontinued}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Discontinuation Date</span>
                                                            <div className="form_group_field">
                                                                {/* <input type="text" name="discontinuation_date" onChange={(e) => handlePackagingsChange(index, e)} /> */}
                                                                <DatePicker name="discontinuation_date"
                                                                    selected={data.packagings[index].discontinuation_date}
                                                                    onChange={(date) => handleDateChange(index, 'discontinuation_date', date)}
                                                                    value={element.discontinuation_date ? moment(element.discontinuation_date).format('DD-MMM-yy') : ''}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='form_group_inline'>
                                                            <span className='form_group_label'>Remarks</span>
                                                            <div className='form_group_field'>
                                                                <input type="text" name='remarks' onChange={(e) => handlePackagingsChange(index, e)} value={element.remarks} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                        {/* <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Package life" onClick={() => addPackagelifeValues(index)}>
                                                            <i className="bi bi-plus-lg"></i> Add Shelf-life
                                                        </button> */}
                                                        <Button variant="outlined" size="small" style={{ margin: '20px 0' }} onClick={() => addPackagelifeValues(index)} endIcon={<AddIcon />}>
                                                            Add Shelf-life
                                                        </Button>
                                                    </div>
                                                    {element.packagelif.map((ele, i) => (
                                                        <fieldset key={i}>
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
                                                                            <input name="shelf_life" onChange={(e) => handlePackagelifeChange(index, i, e)} value={ele.shelf_life} />
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
                                                                                value={ele.shelf_life_unit}
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
                                                                                value={ele.package_shelf_life_type}
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
                                                                                value={ele.package_storage_condition}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="inline_form">
                                                                    <div className="form_group_inline">
                                                                        <span className="form_group_label">Shelf-life Remarks</span>
                                                                        <div className="form_group_field">
                                                                            <input type="text" name="remarks" onChange={(e) => handlePackagelifeChange(index, i, e)} value={ele.remarks} />
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
                                    <div value={value} index={9} className="muitab" style={{ display: value != 9 ? 'none' : '' }}>
                                        <div className='inline_form'>
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
                                            {/* <div className="form_group_inline">
                                                <span className="form_group_label">Paediatric use</span>
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
                                            </div> */}
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
                                    <div value={value} index={10} className="muitab" style={{ display: value != 10 ? 'none' : '' }}>
                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            {/* <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Manufacturer" onClick={addManufacturerFields}>
                                                <i className="bi bi-plus-lg"></i> Add Manufacturer
                                            </button> */}
                                            <Button variant="outlined" size="small" style={{ marginBottom: '10px' }} onClick={addManufacturerFields} endIcon={<AddIcon />}>
                                                Add Manufacturer
                                            </Button>
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
                                                                    value={element.manufacturer}
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
                                                                    value={element.operation_type}
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
                                    <div value={value} index={11} className="muitab" style={{ display: value != 11 ? 'none' : '' }}>

                                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                                            {/* <button type="button" className="add_doc_form" data-toggle="tooltip" data-placement="top" title="Add Status" onClick={addStatusesFields}>
                                                <i className="bi bi-plus-lg"></i> Add Status
                                            </button> */}
                                            <Button variant="outlined" size="small" style={{ marginBottom: '10px' }} onClick={addStatusesFields} endIcon={<AddIcon />}>
                                                Add Status
                                            </Button>
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
                                                        {data.procedure_type && data.procedure_type.value == 'European Procedure' ?
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
                                                            : ''}
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label" style={{ color: errors['statuses.' + index + '.status'] ? 'red' : '' }}>Status (*)</span>
                                                            <div className="form_group_field">

                                                                <Select options={status}
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
                                                            <span className="form_group_label" style={{ color: errors['statuses.' + index + '.status_date'] ? 'red' : '' }}>Status Date (*)</span>
                                                            <div className="form_group_field">
                                                                <DatePicker name="status_date" selected={data.statuses[index].status_date} onChange={(date) => handleDateChange(index, 'status_date', date)} value={element.status_date ? moment(element.status_date).format('DD-MMM-yy') : ''} />
                                                            </div>

                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">eCTD Sequence</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="ectd_sequence" onChange={(e) => handleStatusesChange(index, e)} value={element.ectd_sequence} />
                                                            </div>
                                                        </div>
                                                        <div className="form_group_inline">
                                                            <span className="form_group_label">Internal Submission Reference</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="internal_submission_reference" onChange={(e) => handleStatusesChange(index, e)} value={element.internal_submission_reference} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form_group_inline">
                                                        <span className="form_group_label">Status note</span>
                                                        <div className="form_group_field">
                                                            <input type="text" name="remarks" onChange={(e) => handleStatusesChange(index, e)} value={element.remarks} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        ))}
                                        <div className='npw'>
                                            <div>
                                                <Button type='button' size='small' onClick={() => handleMChange('', 10)} variant='outlined'>Previous</Button>
                                            </div>

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

                </div>
                <ModalP show={showMP} handleClose={handleCloseMP} />
                <ModalS show={show} handleClose={handleClose} />
            </div>
            <footer style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="p" component="p">Powered By <span style={{ color: 'rgb(44, 197,162)', fontWeight: '800' }}>EKEMIA</span> &copy; 2022</Typography>
            </footer>
        </>
    )
}

Create.layout = page => <Authenticated children={page} auth={page.props.auth} />

export default Create;