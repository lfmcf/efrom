import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Documents = ({handleChanged,handleDocumentdate, addFormFields, formValues, removeDocumentsFields}) => {

    return (
        <div className="row"  style={{height:'100%'}}>
            <div className="col-md-12 col-lg-12" style={{height:'100%'}}>
                <div style={{ marginTop: '20px',padding:'20px',  overflowY: 'auto',height: '100%' }}>
                    <div className="row" >
                      
                        
                        <div className="d-flex justify-content-end">
                        <button className="add_doc_form" type="button" style={{float:'right',marginTop:'-10px',marginBottom:'-10px'}} onClick={() => addFormFields()}>
                                <i className="bi bi-plus-lg"></i> Add Document
                            </button>
                        </div>
                    </div>
<br></br>
                    {formValues.map((element, index) => (
                       
                        <fieldset  key={index}>
                            <legend>Document {index + 1}</legend>
                        
                        <div style={{ marginTop: '20px' }}>
                                {index > 0 ?
                                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                                        <button type="button" style={{ width: '14px', height: '14px', background: 'transparent', padding: '0', margin: '0 0 20px 0' }} onClick={() => removeDocumentsFields(index)}>
                                            <svg className="mdi-icon" style={{ verticalAlign: 'middle' }} width="14" height="14" fill="#000" viewBox="0 0 24 24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
                                        </button>
                                    </div>
                                    :
                                    ''}
                            <div className="inline_form">
                                <div className="form_group_inline" >
                                    <span className="form_group_label">Document type</span>
                                    <div className="form_group_field">
                                        <select name="document_type" onChange={e => handleChanged(index, e)} value={element.document_type || ""}>
                                            <option value="" disabled></option>
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
                                <div className="form_group_inline">
                                    <span className="form_group_label">Document title</span>
                                    <div className="form_group_field">
                                        <input type="text" name="document_title" onChange={e => handleChanged(index, e)} value={element.document_title || ""} />
                                    </div>
                                </div>
                            </div>
                            <div className="inline_form">
                                <div className="form_group_inline" >
                                    <span className="form_group_label">Language</span>
                                    <div className="form_group_field">
                                        <select defaultValue="" name="language" onChange={e => handleChanged(index, e)} value={element.language || ""} >
                                            <option value=''></option>
                                            <option>English</option>
                                            <option>Frensh</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form_group_inline">
                                    <span className="form_group_label">Version date</span>
                                    <div className="form_group_field">
                                        
                                        <DatePicker name="version_date" selected={element.version_date} onChange={(date) => handleDocumentdate(index, date)} />
                                    </div>
                                </div>
                            </div>
                            <div className="inline_form">
                                <div className="form_group_inline">
                                    <span className="form_group_label">Remarks</span>
                                    <div className="form_group_field">
                                        <input type="text" name="dremarks" onChange={e => handleChanged(index, e)} value={element.dremarks || ""} />
                                    </div>
                                </div>
                                <div className="form_group_inline">
                                    <span className="form_group_label">Document</span>
                                    <div className="form_group_field">
                                        <input type="file" name="document" style={{paddingTop:'2.5px'}} onChange={e => handleChanged(index, e)} alue={element.document || ""} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        </fieldset>
                    ))}

                </div>

            </div>
        </div>
    )
}

export default Documents;