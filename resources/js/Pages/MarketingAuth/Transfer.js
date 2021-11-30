import Authenticated from "@/Layouts/Authenticated";
import React, {useState} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';
import Documents from "@/Layouts/Documents";
import Select from 'react-select';

const Transfer = (props) => {

    const { data, setData, post, processing, errors, clearErrors,  reset } = useForm({

    });

    const [formValues, setFormValues] = useState([{ document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}]);

    let addFormFields = () => {
        setFormValues([...formValues, { document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}])
    }

    let contries = props.countries.map(function (country) {
        return { value: country.country_name , label: country.country_name };
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
    }

    let handleChanged = (i, e) => {
        
        let newFormValues = [...formValues];
        if(e.target.name === "document" ) {
            newFormValues[i][e.target.name] = e.target.files[0];
            
        }else {
            newFormValues[i][e.target.name] = e.target.value;
            
        }
        
        //setData("doc", newFormValues);
    }

    return(
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Transfer</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card main-card">
                        <div className="card-body">
                            <form className="form">
                                <Tabs defaultActiveKey="first">
                                    <Tab eventKey="first" title="Form">
                                        <Accordion defaultActiveKey="0" style={{ marginTop: '20px'  }}>
                                            <div className="card_title" style={{ marginBottom: '20px'  }}>
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
                                                            <span className="form_group_label">Country</span>
                                                            <div className="form_group_field">
                                                                <Select options={contries}
                                                                    name="registration_holder"
                                                                    // onChange={handleSelectChange}
                                                                    className="basic"
                                                                    classNamePrefix="basic"
                                                                // styles={selectStyles(errors.registration_holder)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Product</span>
                                                            <div className="form_group_field">
                                                                <select></select>
                                                            </div>
                                                        </div>
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
                                                            <span className="form_group_label">RMS</span>
                                                            <div className="form_group_field">
                                                                <select></select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Procedure number</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="procedure_number" onChange={handleChange} placeholder="Procedure number" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Local Tradename</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="local_tradename" onChange={handleChange} placeholder="Local Tradename" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Product type (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="product_type" onChange={handleChange} style={{borderColor: errors.product_type ? 'red' : '' }}>
                                                                    <option>finished</option>
                                                                    
                                                                </select>
                                                            </div>
                                                            <p className="errors_wrap" style={{display: errors.product_type ? 'inline-block': 'none'}}>{errors.product_type}</p>
                                                        </div>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    MA Transfer Details
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Event Description</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="event_description" onChange={handleChange} placeholder="Event Description" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Reason for the event</span>
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
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                   Events Status
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Status (*)</span>
                                                            <div className="form_group_field">
                                                                <select>

                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Status Date (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">eCTD sequence</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Change Control or pre-assessment</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">CCDS/Core PIL ref n°</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Remarks</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Effective internal implementation date</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Implementation Deadline of deadline for answer</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Impacted of changes approved</span>
                                                            <div className="form_group_field">
                                                                <select>
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </select>
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

export default Transfer;

Transfer.layout = page => <Authenticated children={page} auth={page.props.auth} />