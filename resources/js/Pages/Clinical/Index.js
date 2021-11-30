import React, {useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import Select from 'react-select';
import { useForm } from '@inertiajs/inertia-react';
import Documents from '@/Layouts/Documents';

const Index = (props) => {

    const { data, setData, post, processing, errors, clearErrors,  reset } = useForm({
        procedure_type: '',
        country_global: '',
        eu_member_state: '',
        procedure_number: '',
        reference_memeber_state: '',
        concerned_member_state: '',
        product_type: '',
        product_name: '',
        application_stage: '',
        local_tradename: '',
        registration_holder: '',
        application_number: '',
        dossier_reference_number: '',
        remarks: '',
        orphan_designation_status: '',
        orphan_indication_type: '',
        under_intensive_monitoring: '',
        authorized_pharmaceutical_form: '',
        route_of_admin: '',
        atc: '',
        date_type: '',
        date: '',
        alternate_number_type: '',
        alternate_number: '',
        bi_remarks: '',
        local_agent_company: '',
        ingredient: '',
        strength_type: '',
        numerator_lower_val: '',
        numerator_upper_val: '',
        numerator_unit: '',
        function: '',
        packaging_type: '',
        packaging_name: '',
        description: '',
        package_registrationr_number: '',
        lunched: '',
        first_lunch_date: '',
        packaging_discontinued: '',
        discontinuation_date: '',
        package_shelf_life_type: '',
        shelf_life: '',
        shelf_life_unit: '',
        package_storage_condition: '',
        indication: '',
        paediatric_use: '',
        control_site: '',
        distributor: '',
        exploitant: '',
        manufacturer_of_the_active_substance: '',
        manufacturer_of_the_finished_product: '',
        inner_packaging_site: '',
        outer_packaging_site: '',
        release_site: '',
        supplier_of_active_ingredient: '',
        bulk_manufacturing_site: '',
        status: '',
        status_date: '',
        ectd_sequence: '',
        change_control_ref: '',
        internal_submission_reference: '',
        sremarks: '',
       
        doc: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('storefinishproduct'));
        // console.log(data)
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
    }

    const handleSelectChange = (e, name) => {
        setData(name.name, e.value);
        clearErrors(name.name)
    }

    const [formValues, setFormValues] = useState([{ document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}])

    let addFormFields = () => {
        setFormValues([...formValues, { document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}])
    }

    let handleChanged = (i, e) => {
        
        let newFormValues = [...formValues];
        if(e.target.name === "document" ) {
            newFormValues[i][e.target.name] = e.target.files[0];
            
        }else {
            newFormValues[i][e.target.name] = e.target.value;
            
        }
        
        setData("doc", newFormValues);
    }

    let options = props.companies.map(function (companie) {
        return {
            value: companie.name + " - " + companie.city  + " - " + companie.countryname,
            label: companie.name + " - " + companie.city + " - " + companie.countryname,
        };
    })

    let options_1 = props.substanceActive.map(function (sa) {
        return { value: sa.id_ingredient , label: sa.id_ingredient };
    })

    let options_2 = props.packagingItemTypes.map(function (pit) {
        return { value: pit.packagin_item_type , label: pit.packagin_item_type };
    })

    let options_4 = props.countries.map(function (country) {
        return { value: country.country_name , label: country.country_name };
    })

    let options_3 = [
        {value: "ASR Birthdate", label: "ASR Birthdate"},
        {value: "ASR Submission Date", label: "ASR Submission Date"},
        {value: "Development International Birth Date", label: "Development International Birth Date"},
        {value: "International Birth Date", label: "International Birth Date"},
        {value: "NR : Date of Inventory (STG Inventory FORM)", label: "NR : Date of Inventory (STG Inventory FORM)"},
        {value: "NR : Start Marketing Date", label: "NR : Start Marketing Date"},
        {value: "PSUR Birthdate", label: "PSUR Birthdate"},
        {value: "PSUR Submission Date", label: "PSUR Submission Date"},
        {value: "Study End Date", label: "Study End Date"},
        {value: "Study End Date Submitted", label: "Study End Date Submitted"},
        {value: "Study Results Submitted", label: "Study Results Submitted"},
        {value: "Study Start Date", label: "Study Start Date"},
    ]

    const selectStyles = (hasErrors) => ({
        control: (styles) => ({
            ...styles,
            
            ...(hasErrors && { borderColor: 'red' }),
        }),
    });

    return(
        <>
           
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">registration creation - finished product</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card main-card">
                        <div className="card-body">
                            <form className="form" onSubmit={handleSubmit}>
                                <Tabs defaultActiveKey="first">
                                    <Tab eventKey="first" title="New registration">
                                        <Accordion style={{ marginTop: '20px'  }} defaultActiveKey="0">
                                            <div className="card_title" style={{ marginBottom: '20px'  }}>
                                                <h5>First Submission</h5>
                                                <h5 className="subhead">All fields markedd with * are required</h5>
                                            </div>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    General information
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Procedure Type (*)</span>
                                                            <div className="form_group_field">
                                                                <select onChange={handleChange} name="procedure_type" style={{borderColor: errors.procedure_type ? 'red' : '' }}>
                                                                    <option value="National (NP)">National (NP)</option>
                                                                    <option value="Centralized (NP)">Centralized (NP)</option>
                                                                    <option value="Mutual Recognition (MRP)">Mutual Recognition (MRP)</option>
                                                                    <option value="Decentralized (DCP)">Decentralized (DCP)</option>
                                                                </select>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.procedure_type ? 'inline-block': 'none'}}>{errors.procedure_type}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Country global</span>
                                                            <div className="form_group_field">
                                                                {/* <input type="text" name="country_global" onChange={handleChange} placeholder="Country global" /> */}
                                                                <Select options={options_4}
                                                                    name="country_global"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="form_group">
                                                            <span className="form_group_label">EU member states</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="eu_member_state" onChange={handleChange} placeholder="EU member states" />
                                                            </div>
                                                        </div>

                                                        <div className="form_group">
                                                            <span className="form_group_label">Procedure number</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="procedure_number" onChange={handleChange} placeholder="Procedure number" />
                                                            </div>
                                                        </div>

                                                        <div className="form_group">
                                                            <span className="form_group_label">Reference memeber state</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="reference_memeber_state" onChange={handleChange} placeholder="Reference memeber state"  />
                                                            </div>
                                                        </div>

                                                        <div className="form_group">
                                                            <span className="form_group_label">Concerned member state</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="concerned_member_state" onChange={handleChange} placeholder="Concerned member state" />
                                                            </div>
                                                        </div>

                                                        <div className="form_group">
                                                            <span className="form_group_label">Product type (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="product_type" onChange={handleChange} style={{borderColor: errors.product_type ? 'red' : '' }}>
                                                                    <option>finished</option>
                                                                    <option>clinical</option>
                                                                </select>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.product_type ? 'inline-block': 'none'}}>{errors.product_type}</p>
                                                        </div>

                                                        <div className="form_group">
                                                            <span className="form_group_label">Product name (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="product_name" onChange={handleChange} placeholder="Product name" style={{borderColor: errors.product_name ? 'red' : '' }} />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.product_name ? 'inline-block': 'none'}}>{errors.product_name}</p>
                                                        </div>

                                                        <div className="form_group" >
                                                            <span className="form_group_label">Applcation Stage (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="application_stage" onChange={handleChange} style={{borderColor: errors.application_stage ? 'red' : '' }}>
                                                                    <option>Marketing Authorisation</option>
                                                                    <option>APSI / NPP</option>
                                                                    <option>CTA - Clinical Trial Authorisation</option>
                                                                    <option>PIP - Paediatric Investigation Plan</option>
                                                                    <option>IND - Investigational New Drug</option>
                                                                </select>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.application_stage ? 'inline-block': 'none'}}>{errors.application_stage}</p>
                                                        </div>

                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion >
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Basic information
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Local Tradename (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="local_tradename" onChange={handleChange} placeholder="Local Tradename" style={{borderColor: errors.local_tradename ? 'red' : '' }}/>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.local_tradename ? 'inline-block': 'none'}}>{errors.local_tradename}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Registration Holder (*)</span>
                                                            <div className="form_group_field form_group_holder" >
                                                                <Select options={options}
                                                                    name="registration_holder"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.registration_holder)}
                                                                />
                                                                {/* <button className="btn-success" onClick={(e) => handleShow(e)}>
                                                                    <span className="lnr lnr-plus-circle"></span>
                                                                </button> */}
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.registration_holder ? 'inline-block': 'none'}}>{errors.registration_holder}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Application Number</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="application_number" onChange={handleChange} placeholder="Application Number" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Dossier Reference Number</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="dossier_reference_number" onChange={handleChange} placeholder="Dossier Reference Number" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Remarks</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="remarks" onChange={handleChange} placeholder="Remarks" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Orphan Designation Status</span>
                                                            <div className="form_group_field">
                                                                <select name="orphan_designation_status" onChange={handleChange}>
                                                                    <option value="yes">yes</option>
                                                                    <option value="no">no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Orphan Indication Type</span>
                                                            <div className="form_group_field">
                                                                <select name="orphan_indication_type" onChange={handleChange}>
                                                                    <option value="diagnostic">diagnostic</option>
                                                                    <option value="prevention">prevention</option>
                                                                    <option value="treatment">treatment</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Under Intensive Monitoring</span>
                                                            <div className="form_group_field">
                                                                <select name="under_intensive_monitoring" onChange={handleChange}>
                                                                    <option value="yes">yes</option>
                                                                    <option value="no">no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Authorized Pharmaceutical Form (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="authorized_pharmaceutical_form" onChange={handleChange} style={{borderColor: errors.authorized_pharmaceutical_form ? 'red' : '' }}>
                                                                    <option>powder</option>
                                                                    <option>solution</option>
                                                                    <option>eye drops</option>
                                                                    <option>nebuliser solution</option>
                                                                    <option>oral solution</option>
                                                                    <option>powder and solvent for solution for injection</option>
                                                                    <option>solution for injection</option>
                                                                    <option>sublingual tablet</option>
                                                                    <option>suspension for injection</option>
                                                                    <option>sieved powder</option>
                                                                    <option>solution for skin-prick test</option>
                                                                    <option>eye drops powder and solvent for injection</option>
                                                                    <option>powder and solvent for nebuliser solution</option>
                                                                </select>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.authorized_pharmaceutical_form ? 'inline-block': 'none'}}>{errors.authorized_pharmaceutical_form}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Route Of Admin (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="route_of_admin" onChange={handleChange} style={{borderColor: errors.route_of_admin ? 'red' : '' }}>
                                                                    <option>cutaneous use</option>
                                                                    <option>intrademal use</option>
                                                                    <option>eye drops</option>
                                                                    <option>nasal use</option>
                                                                    <option>ocular use</option>
                                                                    <option>subcutaneous use</option>
                                                                    <option>sublingual use</option>
                                                                </select>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.route_of_admin ? 'inline-block': 'none'}}>{errors.route_of_admin}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Atc (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="atc" onChange={handleChange} style={{borderColor: errors.atc ? 'red' : '' }}>
                                                                    <option>option 1</option>
                                                                    <option>option 2</option>
                                                                </select>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.atc ? 'inline-block': 'none'}}>{errors.atc}</p>
                                                        </div>
                                                        {/* <div className="form_group">
                                                            <span className="form_group_label">Under Intensive Monitoring</span>
                                                            <div className="form_group_field">
                                                                <select name="under_intensive_monitoring" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div> */}
                                                        <div className="form_group">
                                                            <span className="form_group_label">Date Type</span>
                                                            <div className="form_group_field">
                                                                <Select options={options_3}
                                                                    name="date_type"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Date</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="date" onChange={handleChange} placeholder="Date" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Alternate number type</span>
                                                            <div className="form_group_field">
                                                                <select name="alternate_number_type" onChange={handleChange}></select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Alternate number</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="alternate_number" onChange={handleChange} placeholder="Alternate number" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Remarks</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="bi_remarks" onChange={handleChange} placeholder="Remarks" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Local Agent Company</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="local_agent_company" onChange={handleChange} placeholder="Local Agent Company" />
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion >
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Formulations
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Ingredient</span>
                                                            <div className="form_group_field">
                                                                <Select options={options_1}
                                                                    name="ingredient"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Strength Type</span>
                                                            <div className="form_group_field">
                                                                <select name="strength_type" onChange={handleChange}>
                                                                    <option>approximately</option>
                                                                    <option>average</option>
                                                                    <option>equal</option>
                                                                    <option>not less than</option>
                                                                    <option>q.s ad</option>
                                                                    <option>q.s ad pH 12</option>
                                                                    <option>q.s ad pH 5</option>
                                                                    <option>range</option>
                                                                    <option>up to</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Numerator Lower Val</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="numerator_lower_val" onChange={handleChange} placeholder="Numerator Lower Val" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Numerator Upper Val</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="numerator_upper_val" onChange={handleChange} placeholder="Numerator Upper Val" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Numerator Unit</span>
                                                            <div className="form_group_field">
                                                                <select name="numerator_unit" onChange={handleChange}>
                                                                    <option>% (W/V)</option>
                                                                    <option>% (W/W)</option>
                                                                    <option>IC</option>
                                                                    <option>IR</option>
                                                                    <option>mg</option>
                                                                    <option>ug</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Function</span>
                                                            <div className="form_group_field">
                                                                <select name="function" onChange={handleChange}>
                                                                    <option>active</option>
                                                                    <option>excipient</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion >
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Packagings
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Packaging Type</span>
                                                            <div className="form_group_field">
                                                                <Select options={options_2}
                                                                    name="packaging_type"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="ba"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Packaging Name (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="packaging_name" onChange={handleChange} placeholder="Packaging Name" style={{borderColor: errors.packaging_name ? 'red' : '' }}/>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.packaging_name ? 'inline-block': 'none'}}>{errors.packaging_name}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Description (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="description" onChange={handleChange} placeholder="Description" style={{borderColor: errors.description ? 'red' : '' }} />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.description ? 'inline-block': 'none'}}>{errors.description}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Package Registration Number (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="package_registrationr_number" onChange={handleChange} placeholder="Package Registration Number" style={{borderColor: errors.package_registrationr_number ? 'red' : '' }} />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.package_registrationr_number ? 'inline-block': 'none'}}>{errors.package_registrationr_number}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Lunched</span>
                                                            <div className="form_group_field">
                                                                <select name="lunched" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">First Lunch Date</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="first_lunch_date" onChange={handleChange} placeholder="First Lunch Date" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Packaging Discontinued</span>
                                                            <div className="form_group_field">
                                                                <select name="packaging_discontinued" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Discontinuation Date</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="discontinuation_date" onChange={handleChange} placeholder="Discontinuation Date" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Package Shelf-life Type</span>
                                                            <div className="form_group_field">
                                                                <select name="package_shelf_life_type" onChange={handleChange}>
                                                                    <option>shelf life of the medicinal product as packaged for sale</option>
                                                                    <option>shelf life after first opening the immediate packaging</option>
                                                                    <option>shelf life after dilution or reconstitution according to direction</option>
                                                                    <option>shelf life after incorporation into meal or pelleted feed</option>
                                                                    <option>shelf life from manufacturing time</option>
                                                                    <option>shelf life from the activity reference time stated on the label</option>
                                                                    <option>shelf life in unit-dose dispensing</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Shelf Life</span>
                                                            <div className="form_group_field">
                                                                <input name="shelf_life" onChange={handleChange} placeholder="Shelf Life" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Shelf-life Unit</span>
                                                            <div className="form_group_field">
                                                                <select name="shelf_life_unit" onChange={handleChange}>
                                                                    <option>Days</option>
                                                                    <option>Hours</option>
                                                                    <option>Months</option>
                                                                    <option>Weeks</option>
                                                                    <option>Years</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Package Storage Condition</span>
                                                            <div className="form_group_field">
                                                                <select name="package_storage_condition" onChange={handleChange}>
                                                                    <option>Atmospheric pressure limitation</option>
                                                                    <option>Avoid direct sunlight</option>
                                                                    <option>Between 1 and 75% relative humidity</option>
                                                                    <option>Between 8 and 80% RH</option>
                                                                    <option>Dangerous voltage - this way up - period after opening</option>
                                                                    <option>Do not expose to extreme heat</option>
                                                                    <option>Do not freeze</option>
                                                                    <option>Do not refrigerate</option>
                                                                    <option>Do not refrigerate or freeze</option>
                                                                    <option>Do not store above 25°</option>
                                                                    <option>Do not store above 30°</option>
                                                                    <option>Do not store at extreme temperature and humidity</option>
                                                                    <option>Fragile, handle with care</option>
                                                                    <option>Humidity limitation</option>
                                                                    <option>In order to protect from light</option>
                                                                    <option>In order to protect from moisture</option>
                                                                    <option>Keep away from sunlight</option>
                                                                    <option>Keep dry</option>
                                                                    <option>Keep the container in the outer carton</option>
                                                                    <option>Keep the container tightly closed</option>
                                                                    <option>Keep the transdermal patch in the sachet until use</option>
                                                                    <option>Lower limit of temperature</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Indications (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="indication" onChange={handleChange} style={{borderColor: errors.indication ? 'red' : '' }}>
                                                                    <option>10001709 - Allergic Conjunctivitis</option>
                                                                    <option>10056352 - Allergy Test Positive</option>
                                                                    <option>10001728 - Allergic Rhinoconjunctivitis</option>
                                                                    <option>10001705 - Allergic Asthma</option>
                                                                    <option>10001721 - Allergic Reaction To Bee Sting</option>
                                                                    <option>10053462 - Allergy Test</option>
                                                                    <option>10056362 - Allergy Test Negative</option>
                                                                    <option>10003555 - Asthma Bronchial</option>
                                                                    <option>10019170 - Hay Fever</option>
                                                                    <option>10001726 - Allergic rhinitis due to pollen</option>
                                                                    <option>10063482 - Medication Dilution</option>
                                                                    <option>10001722 - Allergic Reaction To Wasp Sting</option>
                                                                    <option>10044314 - Tracheobronchitis</option>
                                                                    <option>10016015 - Eyes tearing</option>
                                                                    <option>10030048 - Ocular itching</option>
                                                                </select>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.indication ? 'inline-block': 'none'}}>{errors.indication}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Paediatric Use</span>
                                                            <div className="form_group_field">
                                                                <select name="paediatric_use" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Manufacturing & Supply Chain
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Control Site (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="control_site"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.control_site)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.control_site ? 'inline-block': 'none'}}>{errors.control_site}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Distributor (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="distributor"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.distributor)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.distributor ? 'inline-block': 'none'}}>{errors.distributor}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Exploitant (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="exploitant"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.exploitant)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.exploitant ? 'inline-block': 'none'}}>{errors.exploitant}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Manufacturer Of The Active Substance (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="manufacturer_of_the_active_substance"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.manufacturer_of_the_active_substance)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.manufacturer_of_the_active_substance ? 'inline-block': 'none'}}>{errors.manufacturer_of_the_active_substance}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Manufacturer Of The Finished Product (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="manufacturer_of_the_finished_product"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.manufacturer_of_the_finished_product)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.manufacturer_of_the_finished_product ? 'inline-block': 'none'}}>{errors.manufacturer_of_the_finished_product}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Packaging I (inner packaging) Site (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="inner_packaging_site"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.inner_packaging_site)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.inner_packaging_site ? 'inline-block': 'none'}}>{errors.inner_packaging_site}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Packaging II (outer packaging) Site (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="outer_packaging_site"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.outer_packaging_site)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.outer_packaging_site ? 'inline-block': 'none'}}>{errors.outer_packaging_site}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Release Site (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="release_site"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.release_site)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.release_site ? 'inline-block': 'none'}}>{errors.release_site}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Supplier Of Active Ingredient (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="supplier_of_active_ingredient"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.supplier_of_active_ingredient)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.supplier_of_active_ingredient ? 'inline-block': 'none'}}>{errors.supplier_of_active_ingredient}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Bulk Manufacturing Site (*)</span>
                                                            <div className="form_group_field">
                                                                <Select options={options}
                                                                    name="bulk_manufacturing_site"
                                                                    onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                    styles={selectStyles(errors.bulk_manufacturing_site)}
                                                                />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.bulk_manufacturing_site ? 'inline-block': 'none'}}>{errors.bulk_manufacturing_site}</p>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Status
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Status (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="status" onChange={handleChange} style={{borderColor: errors.status ? 'red' : '' }}>
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
                                                            <p className="errors_wrap" style={{display: errors.status ? 'inline-block': 'none'}}>{errors.status}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Status Date (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="status_date" onChange={handleChange} placeholder="Status Date" style={{borderColor: errors.status_date ? 'red' : '' }} />
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.status_date ? 'inline-block': 'none'}}>{errors.status_date}</p>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">eCTD Sequence</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="ectd_sequence" onChange={handleChange} placeholder="eCTD Sequence" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Change Control Ref</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="change_control_ref" onChange={handleChange} placeholder="Change Control Ref" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Internal Submission Reference</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="internal_submission_reference" onChange={handleChange} placeholder="Internal Submission Reference" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Remarks</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="sremarks" onChange={handleChange} placeholder="Remarks" />
                                                            </div>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Tab>
                                    <Tab eventKey="second" title="Documents">
                                        <Documents handleChanged={handleChanged} addFormFields={addFormFields} formValues={formValues} />
                                    </Tab>
                                    
                                </Tabs>
                                <div className="form-button">
                                    <button type="submit" className="btn btn-primary" disabled={processing}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

Index.layout = page => <Authenticated children={page} auth={page.props.auth} />

export default Index;