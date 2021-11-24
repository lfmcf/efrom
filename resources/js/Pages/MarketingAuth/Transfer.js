import Authenticated from "@/Layouts/Authenticated";
import React, {useState} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';

const Transfer = (props) => {

    const { data, setData, post, processing, errors, clearErrors,  reset } = useForm({

    });

    const [formValues, setFormValues] = useState([{ document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}]);

    let addFormFields = () => {
        setFormValues([...formValues, { document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}])
    }

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
        clearErrors(e.target.name);
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
                                                                <select>

                                                                </select>
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
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12">
                                                <div style={{ marginTop: '20px' }}>
                                                    <div className="row">
                                                        <div className="card_title col-6">
                                                            <h5>Documents forms</h5>
                                                            <h5 className="subhead" >All fields markedd with * are required</h5>
                                                        </div>
                                                        <div className="col-6 d-flex justify-content-end">
                                                            <button className="add_doc_form" type="button" onClick={() => addFormFields()}>Add Form</button>
                                                        </div>
                                                    </div>

                                                    {formValues.map((element, index) => (
                                                        <div style={{ marginTop: '20px' }} key={index}>
                                                            <div className="form_group" >
                                                                <span className="form_group_label">Document type</span>
                                                                <div className="form_group_field">
                                                                    <select name="document_type" onChange={e => handleChanged(index, e)} value={element.document_type || ""}>
                                                                        <option>Agency correspondence</option>
                                                                        <option>Approval Letter</option>
                                                                        <option>Investigational Medicinal Product Dossier (IMPD)</option>
                                                                        <option>Investigator's Brochure</option>
                                                                        <option>Labeling</option>
                                                                        <option>Medication Guide</option>
                                                                        <option>Package Insert</option>
                                                                        <option>Package Leaflet</option>
                                                                        <option>Patient Information Leaflet</option>
                                                                        <option>Proof of submission</option>
                                                                        <option>Protocol</option>
                                                                        <option>Regulatory Decision Document</option>
                                                                        <option>Questions</option>
                                                                        <option>SMPC</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form_group">
                                                                <span className="form_group_label">Document title</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name="document_title" onChange={e => handleChanged(index, e)} value={element.document_title || ""} />
                                                                </div>
                                                            </div>
                                                            <div className="form_group" >
                                                                <span className="form_group_label">Language</span>
                                                                <div className="form_group_field">
                                                                    <select name="language" onChange={e => handleChanged(index, e)} value={element.language || ""} >
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form_group">
                                                                <span className="form_group_label">Version date</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name="version_date" onChange={e => handleChanged(index, e)} value={element.version_date || ""} />
                                                                </div>
                                                            </div>
                                                            <div className="form_group">
                                                                <span className="form_group_label">Remarks</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" name="dremarks" onChange={e => handleChanged(index, e)} value={element.dremarks || ""} />
                                                                </div>
                                                            </div>
                                                            <div className="form_group">
                                                                <span className="form_group_label">Document</span>
                                                                <div className="form_group_field">
                                                                    <input type="file" name="document" onChange={e => handleChanged(index, e)} alue={element.document || ""} />
                                                                </div>
                                                            </div>
                                                            <hr />
                                                        </div>

                                                    ))}

                                                </div>

                                            </div>
                                        </div>
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