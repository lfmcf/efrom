import React from 'react';

const Documents = ({handleChanged, addFormFields, formValues}) => {

    return (
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
    )
}

export default Documents;