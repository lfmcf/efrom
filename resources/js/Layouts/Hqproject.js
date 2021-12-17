import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import Select from 'react-select';
import Documents from "@/Layouts/Documents";

const Hqproject = (props) => {

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        identification: [],
        status: []
    });

    const [prductValues, setProductValues] = useState([{ product: "", procedure_type: "na", country: [], application_stage: "", rms: "", procedure_num: "", local_tradename: "", product_type: "" }])
    const [variationValues, setVariationValues] = useState([{ category: "", variation_type: "", submission_type: "", application_number: "", submission_number: "", submission_format: "", variation_reason: "" }])
    const [statusValues, setStatusValues] = useState([{ status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "", implimentation_deadline: "", actual_implementation: "" }])
    const [formValues, setFormValues] = useState([{ document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: "" }])
    const [statuscountries, setStatusContries] = useState([])
    const selectInputRef = React.useRef({});

    let addProductFields = () => {
        setProductValues([...prductValues, { product: "", procedure_type: "", country: [], application_stage: "", rms: "", procedure_num: "", local_tradename: "", product_type: "" }])
    }

    let addVariationFields = () => {
        setVariationValues([...variationValues, { category: "", variation_type: "", submission_type: "", application_number: "", submission_number: "", submission_format: "", variation_reason: "" }])
    }

    let addStatusFields = () => {
        setStatusValues([...statusValues, { status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "", implimentation_deadline: "", actual_implementation: "" }]);
    }

    let removeProductFields = (i) => {
        let newFormValues = [...prductValues];
        newFormValues.splice(i, 1);
        setProductValues(newFormValues)
    }

    let removeVariationFields = (i) => {
        let newFormValues = [...variationValues];
        newFormValues.splice(i, 1);
        setVariationValues(newFormValues)
    }

    let removeStatusFields = (i) => {
        let newFormValues = [...statusValues];
        newFormValues.splice(i, 1);
        setStatusValues(newFormValues)
    }

    let addFormFields = () => {
        setFormValues([...formValues, { document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: "" }])
    }

    let contries = props.countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    })

    let handleChanged = (i, e) => {

        let newFormValues = [...prductValues];

        newFormValues[i][e.target.name] = e.target.value;

        setData("identification", newFormValues);
    }

    const handleprocedureChange = (i, e) => {
        let newFormValues = [...prductValues];
        console.log(selectInputRef.current[i])
        selectInputRef.current[i].setValue([]);

        newFormValues[i]["country"] = null;
        newFormValues[i]["procedure_type"] = e.target.value;

        setData("identification", newFormValues);
    }

    const handleSelectChange = (i, name) => {

        let newFormValues = [...prductValues];
        if (name.length > 0 && name) {
            newFormValues[i]["country"] = name;
        } else {
            newFormValues[i]["country"] = name.value;
        }

        setData("identification", newFormValues);

    }

    const StatusProductChange = (e) => {

        data.identification.map(ele => {
            if (ele.product === e.target.value) {

                setStatusContries(ele.country)
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(prductValues)
    }

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
                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                        <button type="button" className="add_doc_form" onClick={addProductFields}>
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                    </div>
                                    {prductValues.map((element, index) => (
                                        <div key={index}>
                                            {index > 0 ?
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <button style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeProductFields(index)}>
                                                        <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                    </button>
                                                </div>
                                                :
                                            ''}
                                            <div className="form_group">
                                                <span className="form_group_label">Product</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="product" placeholder="Product" onChange={e => handleChanged(index, e)} />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Procedure Type</span>
                                                <div className="form_group_field">
                                                    <select name="procedure_type" onChange={e => handleprocedureChange(index, e)}>
                                                        <option value="na">National</option>
                                                        <option value="cp">Centralized</option>
                                                        <option value="dcp">Decentralized</option>
                                                        <option value="mrp">Mutual Recognition</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Country</span>
                                                <div className="form_group_field">
                                                    <Select options={contries}
                                                        name="country"
                                                        onChange={e => handleSelectChange(index, e)}
                                                        className="basic"
                                                        isMulti={prductValues[index].procedure_type === "dcp" || prductValues[index].procedure_type === "mrp" ? true : false}
                                                        classNamePrefix="basic"
                                                        ref={ele => selectInputRef.current[index] = ele}
                                                        id={index}
                                                    // styles={selectStyles(errors.registration_holder)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Procedure Number</span>
                                                <div className="form_group_field">
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Local Tradename</span>
                                                <div className="form_group_field">
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Application Stage</span>
                                                <div className="form_group_field">
                                                    <select>
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
                                                    <select>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Product Type</span>
                                                <div className="form_group_field">
                                                    <select>
                                                        <option>Finished</option>
                                                        <option>Reference</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                        <button type="button" className="add_doc_form" onClick={addVariationFields}>
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                    </div>
                                    {variationValues.map((element, index) => (
                                        <div key={index}>
                                            {index > 0 ?
                                                <div style={{ display: 'flex', justifyContent: 'end' }}>
                                                    <button style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeVariationFields(index)}>
                                                        <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                                    </button>
                                                </div>
                                                : ''}
                                            <div className="form_group">
                                                <span className="form_group_label">Variation Category (*)</span>
                                                <div className="form_group_field">
                                                    <select>
                                                        <option>Variation/Supplement</option>
                                                        <option>FUM</option>
                                                        <option>Registration Termination</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Variation Type</span>
                                                <div className="form_group_field">
                                                    <select>
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
                                                    <select>
                                                        <option>CARDEAC</option>
                                                        <option>Inetial MAA</option>
                                                        <option>NPP-Initial</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Applcation N°</span>
                                                <div className="form_group_field">
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Submission/Procedure N°</span>
                                                <div className="form_group_field">
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Dossier Submission Format</span>
                                                <div className="form_group_field">
                                                    <select>
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
                                                    <select>
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
                                    ))}
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
                                            <div className="form_group">
                                                <span className="form_group_label">Product</span>
                                                <div className="form_group_field">
                                                    <select onChange={StatusProductChange}>
                                                        {data.identification.map((ele, i) => (
                                                            <option value={ele.product} key={i}>{ele.product}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form_group">
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
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Status (*)</span>
                                                <div className="form_group_field">
                                                    <select name="status" onChange={e => handleStatusChanged(index, e)}>
                                                        <option>value 1</option>
                                                        <option>value 2</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form_group">
                                                <span className="form_group_label">Status Date (*)</span>
                                                <div className="form_group_field">
                                                    <input type="text" name="status_date" onChange={e => handleStatusChanged(index, e)} />
                                                </div>
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

export default Hqproject;