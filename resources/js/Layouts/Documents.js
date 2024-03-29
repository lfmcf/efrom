import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { Tooltip } from '@mui/material';
import moment from 'moment';
import { usePage } from '@inertiajs/inertia-react';
import InfoIcon from '@mui/icons-material/Info';

const Documents = ({ handleChanged, handleDocumentdate, addFormFields, formValues, removeDocumentsFields, handleDocumentSelectChange }) => {
    const { lang } = usePage().props

    let langOptions = lang.map(function (l) {
        
        return {
            value : l.langue,
            label : l.langue,
        }
    })

    return (
        <div className="row" style={{ height: '100%' }}>
            <div className="col-md-12 col-lg-12" style={{ height: '100%' }}>
                <div style={{ marginTop: '20px', padding: '20px', overflowY: 'auto', height: '100%' }}>
                    <div className="row" >
                        <div className="d-flex justify-content-end">
                            <button className="add_doc_form" type="button" style={{ float: 'right', marginTop: '-10px', marginBottom: '-10px' }} onClick={() => addFormFields()}>
                                <i className="bi bi-plus-lg"></i> Add Document
                            </button>
                        </div>
                    </div>
                    <br></br>
                    {formValues.map((element, index) => (
                        <fieldset key={index}>
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
                                            <Select options={[
                                                {label: 'Agency correspondence', value: 'Agency correspondence'},
                                                {label: 'Approval Letter', value: 'Approval Letter'},
                                                {label: 'Investigational Medicinal Product Dossier (IMPD)', value: 'Investigational Medicinal Product Dossier (IMPD)'},
                                                {label: 'Investigator\'s Brochure', value: 'Investigator\'s Brochure'},
                                                {label: 'Labeling', value: 'Labeling'},
                                                {label: 'Medication Guide', value: 'Medication Guide'},
                                                {label: 'Package Insert', value: 'Package Insert'},
                                                {label: 'Package Leaflet', value: 'Package Leaflet'},
                                                {label: 'Patient Information Leaflet', value: 'Patient Information Leaflet'},
                                                {label: 'Proof of submission', value: 'Proof of submission'},
                                                {label: 'Protocol', value: 'Protocol'},
                                                {label: 'Questions', value: 'Questions'},
                                                {label: 'Regulatory Decision Document', value: 'Regulatory Decision Document'},
                                                {label: 'SMPC', value: 'SMPC'},
                                            ]}
                                                onChange={(selectedOption, name) => handleDocumentSelectChange(selectedOption, name, index)}
                                                name="document_type"
                                                className="basic"
                                                classNamePrefix="basic"
                                                value={element.document_type}
                                                placeholder=''
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className="form_group_inline">
                                        <span className="form_group_label">Document title</span>
                                        <div className="form_group_field">
                                            <input type="text" name="document_title" onChange={e => handleChanged(index, e)} value={element.document_title} />
                                        </div>
                                    </div>
                                </div>
                                <div className="inline_form">
                                    <div className="form_group_inline" >
                                        <span className="form_group_label">Language</span>
                                        <div className="form_group_field">
                                            <Select options={langOptions}
                                               onChange={(selectedOption, name) => handleDocumentSelectChange(selectedOption, name, index)}
                                                name="language"
                                                className="basic"
                                                classNamePrefix="basic"
                                                value={element.language}
                                                placeholder=''
                                                isClearable
                                            />
                                        </div>
                                    </div>
                                    <div className="form_group_inline">
                                        <span className="form_group_label">Version date</span>
                                        <div className="form_group_field">
                                            <DatePicker name="version_date" selected={element.version_date ? new Date(element.version_date) : ''} onChange={(date) => handleDocumentdate(index, date)} value={element.version_date ? moment(element.version_date).format('DD-MMM-yy') : ''} />
                                        </div>
                                    </div>
                                </div>

                                <div className="inline_form">

                                    <div className="form_group_inline">
                                        <Tooltip arrow title="for SmPC or PIL approved only. please note that only approved and finalized Product Information (PI) is to be provided like approved SmPC, PIL and labels. Do not add submitted PI">
                                            <span className="form_group_label">CCDS/Core PIL ref n° <InfoIcon fontSize='small' /></span>
                                        </Tooltip>
                                        <div className="form_group_field">
                                            <input type="text" name="cdds" onChange={e => handleChanged(index, e)} value={element.cdds} />
                                        </div>
                                    </div>

                                    <div className="form_group_inline">
                                        <span className="form_group_label">Document</span>
                                        <div className="form_group_field">
                                            <input type="file" name="document" style={{ paddingTop: '2.5px' }} onChange={e => handleChanged(index, e)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form_group_inline">
                                    <Tooltip arrow title="for product Information like SmPC, PIL, Mock-up please provide internal reference">
                                        <span className="form_group_label">Remarks <InfoIcon fontSize='small' /></span>
                                    </Tooltip>

                                    <div className="form_group_field">
                                        <input type="text" name="dremarks" onChange={e => handleChanged(index, e)} value={element.dremarks} />
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