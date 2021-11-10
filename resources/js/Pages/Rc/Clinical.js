import React, {useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';

const Clinical = (props) => {

    const [formValues, setFormValues] = useState([{ document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}])

    let addFormFields = () => {
        setFormValues([...formValues, { document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}])
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {

    }
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">registration creation - clinical</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card main-card">
                        <div className="card-body">
                            <form className="form" onSubmit={handleSubmit}>
                                <Tabs defaultActiveKey="first">
                                    <Tab eventKey="first" title="New registration">
                                        <Accordion style={{ marginTop: '20px' }} defaultActiveKey="0">
                                            <Card>
                                                <Card.Body>
                                                    <div className="card_title">
                                                        <h5>First Submission</h5>
                                                        <h5 className="subhead">All fields markedd with * are required</h5>
                                                    </div>
                                                </Card.Body>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    General information
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Procedure Type (*)</span>
                                                            <div className="form_group_field">
                                                                <select onChange={handleChange} name="procedure_type">
                                                                    <option value="National (NP)">National (NP)</option>
                                                                    <option value="Centralized (NP)">Centralized (NP)</option>
                                                                    <option value="Mutual Recognition (MRP)">Mutual Recognition (MRP)</option>
                                                                    <option value="Decentralized (DCP)">Decentralized (DCP)</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Country global</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="country_global" onChange={handleChange} placeholder="Country global" />
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
                                                                <select name="product_type" onChange={handleChange}>
                                                                    <option>finished</option>
                                                                    <option>clinical</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="form_group">
                                                            <span className="form_group_label">Product name (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="product_name" onChange={handleChange} placeholder="Product name" />
                                                            </div>
                                                        </div>

                                                        <div className="form_group" >
                                                            <span className="form_group_label">Applcation Stage (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="application_stage" onChange={handleChange}>
                                                                    <option>PIP - Paediatric Investigation Plan</option>
                                                                    <option>CTA - Clinical Trial Authorisation</option>
                                                                    <option>IND - Investigational New Drug</option>
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
                                                    Basic information
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Registration Title</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="registration_title" onChange={handleChange} placeholder="Registration Title" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Protocol Number</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="protocol_number" onChange={handleChange} placeholder="Protocol Number" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Study Sponsor</span>
                                                            <div className="form_group_field">
                                                                <select name="study_sponsor" onChange={handleChange}></select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Full Study Title</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="full_study_title" onChange={handleChange} placeholder="Full Study Title" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Remarks</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="remarks" onChange={handleChange} placeholder="Remarks" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Protocol Type</span>
                                                            <div className="form_group_field">
                                                                <select name="protocol_type" onChange={handleChange}>
                                                                    <option>Dose Response</option>
                                                                    <option>Efficacy</option>
                                                                    <option>Safety</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Clinical Phase</span>
                                                            <div className="form_group_field">
                                                                <select name="clinical_phase" onChange={handleChange}>
                                                                   
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
                                                    Dosages Form
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Authorized Pharmaceutical Form (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="authorized_pharmaceutical_form" onChange={handleChange}>
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
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Route Of Admin (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="route_of_admin" onChange={handleChange}>
                                                                    <option>cutaneous use</option>
                                                                    <option>intrademal use</option>
                                                                    <option>nasal use</option>
                                                                    <option>ocular use</option>
                                                                    <option>subcutaneous use</option>
                                                                    <option>sublingual use</option>

                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Atc (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="atc" onChange={handleChange}></select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Indications (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="indication" onChange={handleChange}>
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
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Paediatric use</span>
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
                                                                <select name="control_site" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Distributor (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="distributor" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Exploitant (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="exploitant" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Manufacturer Of The Active Substance (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="manufacturer_of_the_active_substance" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Manufacturer Of The Finished Product (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="manufacturing_of_the_finished_product" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Packaging I (inner packaging) Site (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="inner_packaging_site" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Packaging II (outer packaging) Site (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="outer_packaging_site" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Release Site (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="release_site" onChange={handleChange}>
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Supplier Of Active Ingredient (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="supplier_of_active_ingredient">
                                                                    <option>yes</option>
                                                                    <option>no</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Bulk Manufacturing Site (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="bulk_manufacturing_site" onChange={handleChange}>
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
                                                    Status
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    <Card.Body>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Status (*)</span>
                                                            <div className="form_group_field">
                                                                <select name="status" onChange={handleChange}>
                                                                    <option>Application / Submitted</option>
                                                                    <option>Positive Opionion / Obtained</option>
                                                                    <option>Approval / Obtained</option>
                                                                    <option>Application / Rejected</option>
                                                                    <option>Application / Withdrawn by MAH due to Safety/Efficacy</option>
                                                                    <option>Application / Withdrawn by MAH not due Safety/Efficacy</option>
                                                                    <option>Study / Start Date Submitted</option>
                                                                    <option>Study / End Date Submitted</option>
                                                                    <option>Study / Results Submitted</option>
                                                                    <option>Application / Dispatched To Local RA</option>
                                                                    <option>Application / Validated</option>
                                                                    <option>Application / Dispatch Planned</option>
                                                                    <option>Application / Submission Planned</option>
                                                                    <option>Application / Approval Expected</option>
                                                                    <option>Application / End of Procedure</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Status Date (*)</span>
                                                            <div className="form_group_field">
                                                                <input type="text" name="status_date" onChange={handleChange} placeholder="Status Date" />
                                                            </div>
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
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="card_title">
                                                            <h5>Documents forms</h5>
                                                            <h5 className="subhead" >All fields markedd with * are required</h5>
                                                            <div><button type="button" onClick={() => addFormFields()}>add</button></div>
                                                            {formValues.map((element, index) => (
                                                                <div style={{ marginTop: '20px' }} key={index}>
                                                                    <div className="form_group" >
                                                                        <span className="form_group_label">Document type</span>
                                                                        <div className="form_group_field">
                                                                            <select name="document_type" onChange={e => handleChanged(index, e)} value={element.document_type || ""}>
                                                                                <option>Agency correspondence</option>
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
                                                                </div>
                                                            ))}
                                                            {/* <div className="form_group" >
                                                                <span className="form_group_label">Document type</span>
                                                                <div className="form_group_field">
                                                                    <select>
                                                                        <option>Agency correspondence</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form_group">
                                                                <span className="form_group_label">Document title</span>
                                                                <div className="form_group_field">
                                                                    <input type="text" />
                                                                </div>
                                                            </div> 
                                                            <div className="form_group" >
                                                                <span className="form_group_label">Language</span>
                                                                <div className="form_group_field">
                                                                    <select>
                                                                        <option></option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form_group">
                                                                <span className="form_group_label">Version date</span>
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
                                                                <span className="form_group_label">Document</span>
                                                                <div className="form_group_field">
                                                                    <input type="file" />
                                                                   
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                                <div className="form-button">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Clinical.layout = page => <Authenticated children={page} auth={page.props.auth} />

export default Clinical;