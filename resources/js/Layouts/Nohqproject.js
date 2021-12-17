import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';
import Documents from "@/Layouts/Documents";
import Select from 'react-select';

const Nohqproject = (props) => {

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        product: "",
        procedure_type: "",
        country: "",
        application_stage: "",
        rms: "",
        procedure_num: "",
        local_tradename: "",
        product_type: "",
        category: "",
        variation_type: "",
        submission_type: "",
        application_number: "",
        submission_number: "",
        submission_format: "",
        variation_reason: "",
        status: {
            status: "", 
            status_date: "", 
            ectd: "", 
            control: "", 
            cdds: "", 
            remarks: "", 
            local_implementation: "", 
            implimentation_deadline: "", 
            actual_implementation: ""
        },
        doc: []
    });

    const [statusValues, setStatusValues] = useState([{ status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "", implimentation_deadline: "", actual_implementation: "" }])
    const [formValues, setFormValues] = useState([{ document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: "" }])

    let addStatusFields = () => {
        setStatusValues([...statusValues, { status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "", implimentation_deadline: "", actual_implementation: "" }]);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: "" }])
    }

    let contries = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        // clearErrors(e.target.name);
    }

    const handleSelectChange = (e, name) => {
        setData(name.name, e.value)
    }

    let handleStatusChanged = (i, e) => {
        let newFormValues = [...statusValues];
        newFormValues[i][e.target.name] = e.target.value;
        setData("status", newFormValues);
    }

    let handleChanged = (i, e) => {

        let newFormValues = [...formValues];

        newFormValues[i][e.target.name] = e.target.value;

        setData("doc", newFormValues);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("storevariation"));
        
    }

    // console.log(errors)

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
                                    <div className="form_group">
                                        <span className="form_group_label">Product</span>
                                        <div className="form_group_field">
                                            <input type="text" name="product" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Procedure Type</span>
                                        <div className="form_group_field">
                                            <select name="procedure_type" onChange={handleChange}>
                                                <option>National</option>
                                                <option>Centralized</option>
                                                <option>Decentralized</option>
                                                <option>Mutual Recognition</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Country</span>
                                        <div className="form_group_field">
                                            <Select options={contries}
                                                name="country"
                                                onChange={handleSelectChange}
                                                className="basic"
                                                classNamePrefix="basic"
                                            // styles={selectStyles(errors.registration_holder)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Procedure Number</span>
                                        <div className="form_group_field">
                                            <input type="text" name="procedure_num" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Local Tradename</span>
                                        <div className="form_group_field">
                                            <input type="text" name="local_tradename" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Application Stage</span>
                                        <div className="form_group_field">
                                            <select name="application_stage" onChange={handleChange}>
                                                <option>Marketing Authorisation</option>
                                                <option>APSI / NPP</option>
                                                <option>PIP*</option>
                                                <option>CTA*</option>
                                                <option>IND*</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">RMS</span>
                                        <div className="form_group_field">
                                            <select name="rms" onChange={handleChange}>
                                                <option>opt 1</option>
                                                <option>opt 2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Product Type</span>
                                        <div className="form_group_field">
                                            <select name="product_type" onChange={handleChange}>

                                                <option>Finished</option>
                                                <option>Reference</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Single</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">Grouped</label>
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
                                    <div className="form_group">
                                        <span className="form_group_label">Variation Category (*)</span>
                                        <div className="form_group_field">
                                            <select name="category" onChange={handleChange}>
                                                <option>Variation/Supplement</option>
                                                <option>FUM</option>
                                                <option>Registration Termination</option>
                                            </select>
                                        </div>
                                        <p className="errors_wrap" style={{display: errors.category ? 'inline-block': 'none'}}>{errors.category}</p>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Variation Type</span>
                                        <div className="form_group_field">
                                            <select name="variation_type" onChange={handleChange}>
                                                <option>Prior Authorisation (II)</option>
                                                <option>Do and Tell Immediate (IAIN Immediate Notification)</option>
                                                <option>Do and Tell Later (IA)</option>
                                                <option>Tell, Wait and Do (IB)</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Submission Type (*)</span>
                                        <div className="form_group_field">
                                            <select name="submission_type" onChange={handleChange}>
                                                <option>CARDEAC</option>
                                                <option>Inetial MAA</option>
                                                <option>NPP-Initial</option>
                                            </select>
                                        </div>
                                        <p className="errors_wrap" style={{display: errors.submission_type ? 'inline-block': 'none'}}>{errors.submission_type}</p>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Applcation N°</span>
                                        <div className="form_group_field">
                                            <input type="text" name="application_number" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Submission/Procedure N°</span>
                                        <div className="form_group_field">
                                            <input type="text" name="submission_number" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Dossier Submission Format</span>
                                        <div className="form_group_field">
                                            <select name="submission_format" onChange={handleChange}>
                                                <option>CTD</option>
                                                <option>Nees</option>
                                                <option>eCTD</option>
                                                <option>briefing Book</option>
                                                <option>Drug Master File</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form_group">
                                        <span className="form_group_label">Reason for variation</span>
                                        <div className="form_group_field">
                                            <select name="variation_reason" onChange={handleChange}>
                                                <option>Indication</option>
                                                <option>Paediatric Indication</option>
                                                <option>Safety</option>
                                                <option>Following Urgent Safety Restriction</option>
                                                <option>Quality</option>
                                                <option>Others</option>
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
                                Event Status
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0" >
                                <Card.Body>
                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                        <button type="button" className="add_doc_form" onClick={addStatusFields}>
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                    </div>
                                    {statusValues.map((element, index) => (

                                        <div key={index}>
                                            {index > 0 ?
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <button style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeStatusFields(index)}>
                                                        <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                    </button>
                                                </div>
                                                : ''}
                                            {/* <div className="form_group">
                                                <span className="form_group_label">Product</span>
                                                <div className="form_group_field">
                                                    <select onChange={StatusProductChange}>
                                                        {data.identification.map((ele, i) => (
                                                            <option value={ele.product} key={i}>{ele.product}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div> */}
                                            {/* <div className="form_group">
                                                <span className="form_group_label">Country</span>
                                                <div className="form_group_field">
                                                    {typeof statuscountries === 'object' ? (
                                                        <Select options={statuscountries}
                                                            name="registration_holder"
                                                            // onChange={handleSelectChange}
                                                            className="basic"
                                                            classNamePrefix="basic"
                                                        // styles={selectStyles(errors.registration_holder)}
                                                        />
                                                    ) :
                                                        <input type="text" defaultValue={statuscountries} />
                                                    }
                                                </div>
                                            </div> */}
                                            <div className="form_group">
                                                <span className="form_group_label">Status (*)</span>
                                                <div className="form_group_field">
                                                    <select name="status" onChange={e => handleStatusChanged(index, e)}>
                                                        <option>value 1</option>
                                                        <option>value 2</option>
                                                    </select>
                                                </div>
                                                <p className="errors_wrap" style={{display: errors.status ? 'inline-block': 'none'}}>{errors.status}</p>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Status Date (*)</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="status_date" onChange={e => handleStatusChanged(index, e)} />
                                                </div>
                                                <p className="errors_wrap" style={{display: errors.status_date ? 'inline-block': 'none'}}>{errors.status_date}</p>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">eCTD sequence</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="ectd" onChange={e => handleStatusChanged(index, e)} />
                                                </div>
                                            </div>

                                            <div className="form_group">
                                                <span className="form_group_label">Change Control or pre-assessment</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="control" onChange={e => handleStatusChanged(index, e)} />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">CCDS/Core PIL ref n°</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="cdds" onChange={e => handleStatusChanged(index, e)} />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Remarks</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="reamrks" onChange={e => handleStatusChanged(index, e)} />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Planned Local implementation Date</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="local_implementation" onChange={e => handleStatusChanged(index, e)} />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">HA Implimentation Deadline</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="implimentation_deadline" onChange={e => handleStatusChanged(index, e)} />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Actual Local Implementation</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="actual_implementation" onChange={e => handleStatusChanged(index, e)} />
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}

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
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default Nohqproject;