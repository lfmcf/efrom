import Authenticated from "@/Layouts/Authenticated";
import React, {useState} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';
import Documents from "@/Layouts/Documents";
import Select from 'react-select';

const Variation = (props) => {

    const { data, setData, post, processing, errors, clearErrors,  reset } = useForm({
        status: []
    });

    const [isHq, setHq] = useState(false)
    const [formValues, setFormValues] = useState([{ document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}])
    const [statusValues, setStatusValues] = useState([{ status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "",  implimentation_deadline: "", actual_implementation: ""}])
    const [prductValues, setProductValues] = useState([{country: "", application_stage:"",product:"",product_type:"",rms:"",procedure_num:"",local_tradename:"",product_type:""}])
    const [variationValues, setVariationValues] = useState([{category:"",variation_type:"",submission_type:"",application_number:"",submission_number:"",submission_format:"",variation_reason:""}])
    
    let addFormFields = () => {
        setFormValues([...formValues, { document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: ""}])
    }

    let addStatusFields = () => {
        setStatusValues([...statusValues, {status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "",  implimentation_deadline: "", actual_implementation: ""}]);
        addVariationFields();
    }

    let addProductFields = () => {
        setProductValues([...prductValues, {country: "", application_stage:"",product:"",product_type:"",rms:"",procedure_num:"",local_tradename:"",product_type:""}])
    }

    let addVariationFields = () => {
        setVariationValues([...variationValues, {category:"",variation_type:"",submission_type:"",application_number:"",submission_number:"",submission_format:"",variation_reason:""}])
    }

    let contries = props.countries.map(function (country) {
        return { value: country.country_name , label: country.country_name };
    })

    let handleChanged = (i, e) => {
        
        let newFormValues = [...formValues];
        if(e.target.name === "document" ) {
            newFormValues[i][e.target.name] = e.target.files[0];
            
        }else {
            newFormValues[i][e.target.name] = e.target.value;
            
        }
        
        setData("doc", newFormValues);
    }

    let handleStatusChanged = (i, e) => {
        
        let newFormValues = [...statusValues];
        newFormValues[i][e.target.name] = e.target.value; 
        setData("status", newFormValues);
    }

    const handlehqChange = (e) => {
        setHq(e.target.checked)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
    }

    return(
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Variation</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card main-card">
                        <div className="card-body">
                            {/* <div className="card_title">
                                <h5>First Submission</h5>
                                <h5 className="subhead">All fields markedd with * are required</h5>
                            </div> */}
                            <form className="form" onSubmit={handleSubmit}>
                                <Tabs defaultActiveKey="first">
                                    <Tab eventKey="first" title="Form">
                                        <Accordion defaultActiveKey="0" style={{ marginTop: '20px'  }}>
                                            <div className="card_title" style={{ marginBottom: '20px'  }}>
                                                {/* <h5>First Submission</h5> */}
                                                <h5 className="subhead">All fields markedd with * are required</h5>
                                            </div>
                                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',margin:'10px 0'}}>
                                                <div>
                                                    <input className="form-check-input" type="checkbox" value="checked" id="flexCheckDefault" onChange={handlehqChange} />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        HQ project
                                                    </label>
                                                </div>
                                                
                                                {isHq ? (
                                                <div >
                                                <button type="button" className="add_doc_form" onClick={addProductFields}>Add Form</button>
                                                </div>) : 
                                                ''
                                            }
                                            </div>
                                            
                                            <Card>

                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Registration identification
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    {isHq ? (
                                                        <Card.Body>
                                                        
                                                        {prductValues.map((element, index) => (
                                                            
                                                            <div key={index}>
                                                                    <div style={{background:"#70bbfd",height:'24px',width:'24px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'white',margin:'10px'}}>
                                                                        {index+1}
                                                                    </div>
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
                                                                    <span className="form_group_label">Product</span>
                                                                    <div className="form_group_field">
                                                                        <select>
                                                
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="form_group">
                                                                    <span className="form_group_label">Procedure Type</span>
                                                                    <div className="form_group_field">
                                                                        <select>
                                                                            <option>National</option>
                                                                            <option>Centralized</option>
                                                                            <option>Decentralized</option>
                                                                            <option>Mutual Recognition</option>
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
                                                                    <span className="form_group_label">Product Type</span>
                                                                    <div className="form_group_field">
                                                                        <select>
                                                                            <option>Clinical</option>
                                                                            <option>Finished</option>
                                                                            <option>Reference</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Card.Body>
                                                    ) : 
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
                                                            <span className="form_group_label">Product</span>
                                                            <div className="form_group_field">
                                                                <select>

                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Procedure Type</span>
                                                            <div className="form_group_field">
                                                                <select>
                                                                    <option>National</option>
                                                                    <option>Centralized</option>
                                                                    <option>Decentralized</option>
                                                                    <option>Mutual Recognition</option>
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
                                                            <span className="form_group_label">Product Type</span>
                                                            <div className="form_group_field">
                                                                <select>
                                                                    <option>Clinical</option>
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
                                                    }
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                        <Accordion>
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Variation Details
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0" >
                                                    {isHq ? (
                                                        <Card.Body>
                                                            {prductValues.map((element, index) => (
                                                                <div key={index}>
                                                                    <div style={{ background: "#70bbfd", height: '24px', width: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '10px' }}>
                                                                        {index + 1}
                                                                    </div>
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
                                                    ): 
                                                    <Card.Body>
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
                                                    </Card.Body>
                                                    }
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
                                                        <button type="button" onClick={addStatusFields}>add</button>
                                                        {statusValues.map((element, index) => (
                                                            <div key={index}>
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
                                                        {/* <div className="form_group">
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
                                                            <span className="form_group_label">Planned Local implementation Date</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">HA Implimentation Deadline</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div>
                                                        <div className="form_group">
                                                            <span className="form_group_label">Actual Local Implementation</span>
                                                            <div className="form_group_field">
                                                                <input type="text" />
                                                            </div>
                                                        </div> */}
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Variation;

Variation.layout = page => <Authenticated children={page} auth={page.props.auth} />