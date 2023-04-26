import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Tabs as Mtabs, Tab as Mtab, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import moment from 'moment';
import { Head } from '@inertiajs/inertia-react';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Show = (props) => {
    
    const { clinical } = props;
    console.log(clinical)
    const [value, setValue] = useState(0);


    const handleMChange = (event, newValue) => {

        setValue(newValue);
    };
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}>
                        <Mtabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleMChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Mtab label="General information" {...a11yProps(0)} />
                            <Mtab label="Basic information" {...a11yProps(1)} />
                            <Mtab label="Dosage Form / ATC" {...a11yProps(2)} />
                            <Mtab label="Orphan Drug Details" {...a11yProps(3)} />
                            <Mtab label="Under Intensive Monitoring Details" {...a11yProps(4)} />
                            <Mtab label="Key Dates / Alternate Numbers" {...a11yProps(5)} />
                            <Mtab label="Local Agent" {...a11yProps(6)} />
                            <Mtab label="Formulations" {...a11yProps(7)} />
                            <Mtab label="Packagings" {...a11yProps(8)} />
                            <Mtab label="Indications" {...a11yProps(9)} />
                            <Mtab label="Manufacturing & Supply Chain" {...a11yProps(10)} />
                            <Mtab label="Status Details" {...a11yProps(11)} />
                            <Mtab label="Documents" {...a11yProps(12)} />
                        </Mtabs>
                        <div value={value} index={0} className="muitab" style={{ display: value != 0 ? 'none' : '' }}>
                            <table className='showTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Procedure Type</td>
                                        <td>{clinical.procedure_type.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Country(s)</td>
                                        <td>{clinical.procedure_type.value === 'Decentralized' || clinical.procedure_type.value === 'Mutual Recognition' ? clinical.country.map((ele, i) => <ul key={i}><li>{ele.value}</li></ul>) : clinical.country.value}</td>
                                    </tr>
                                    {clinical.procedure_type.value === 'Decentralized' || clinical.procedure_type.value === 'Mutual Recognition' ?
                                    <tr>
                                        <td>RMS</td>
                                        <td>{clinical.rms ? clinical.rms.value : ''}</td>
                                    </tr> : ''}
                                    <tr>
                                        <td>Submission Type</td>
                                        <td>{clinical.application_stage.value}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div value={value} index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                            <table className='showTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <tr>
                                        <td>Product</td>
                                        <td>{clinical.product_name.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Protocol Number</td>
                                        <td>{clinical.protocol_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Study Sponsor</td>
                                        <td>{clinical.study_sponsor ? clinical.study_sponsor.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Full Study Title</td>
                                        <td>{clinical.full_study_title}</td>
                                    </tr>
                                    <tr>
                                        <td>Clinical Phase</td>
                                        <td>{clinical.clinical_phase ? clinical.clinical_phase.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Protocol Type</td>
                                        <td>{clinical.protocol_type ? clinical.protocol_type.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Peadiatric indication</td>
                                        <td>{clinical.paediatric_indication ? clinical.paediatric_indication.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Procedure Number</td>
                                        <td>{clinical.procedure_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Investigationnal Code</td>
                                        <td>{clinical.investigationnal_code}</td>
                                    </tr>
                                    <tr>
                                        <td>Application Number</td>
                                        <td>{clinical.application_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Medicines Regulatory Authority</td>
                                        <td>{clinical.medicines_regulatory_authority ? clinical.medicines_regulatory_authority.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Registration alternate number</td>
                                        <td>{clinical.registration_alternate_number ? clinical.registration_alternate_number.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Registration number</td>
                                        <td>{clinical.registration_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Registration Date</td>
                                        <td>{clinical.registration_date ? moment(clinical.registration_date).format('DD-MMM-yy') : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Remarks</td>
                                        <td>{clinical.remarks}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div value={value} index={2} className="muitab" style={{ display: value != 2 ? 'none' : '' }}>
                            <table className='showTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Authorized Pharmaceutical Form</td>
                                        <td>{clinical.authorized_pharmaceutical_form.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Administrable pharmaceutical form</td>
                                        <td>{clinical.administrable_pharmaceutical_form ? clinical.administrable_pharmaceutical_form.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Route Of Admin</td>
                                        <td>{clinical.route_of_admin.map((ele, i) => <ul key={i}><li>{ele.value}</li></ul>)}</td>
                                    </tr>
                                    <tr>
                                        <td>ATC</td>
                                        <td>{clinical.atc.map((ele, i) => <ul key={i}><li>{ele.value}</li></ul>)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div value={value} index={3} className="muitab" style={{ display: value != 3 ? 'none' : '' }}>
                            <table className='showTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Orphan Designation Status</td>
                                        <td>{clinical.orphan_designation ? clinical.orphan_designation.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Orphan Indication Type</td>
                                        <td>{clinical.orphan_indication ? clinical.orphan_indication.value : ''}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div value={value} index={4} className="muitab" style={{ display: value != 4 ? 'none' : '' }}>
                            <table className='showTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Under Intensive Monitoring</td>
                                        <td>{clinical.under_intensive_monitoring ? clinical.under_intensive_monitoring.value : ''}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div value={value} index={5} className="muitab" style={{ display: value != 5 ? 'none' : '' }}>
                            {clinical.key_dates.map((element, index) => (
                                <div key={index}>
                                    <h2 className='sous-heading-show'>Key Date - {index + 1}</h2>
                                    <div>
                                        <table className='showTable'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Key Date Type</td>
                                                    <td>{element.date_type ? element.date_type.value : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date</td>
                                                    <td>{element.date ? moment(element.date).format('DD-MMM-yy') : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Remarks</td>
                                                    <td>{element.remarks}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                            <table className='showTable'>
                                <tbody>
                                    <tr>
                                        <td>Alternate Number Type</td>
                                        <td>{clinical.alternate_number_type ? clinical.alternate_number_type.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Alternate Number</td>
                                        <td>{clinical.alternate_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Remarks</td>
                                        <td>{clinical.atcremarks}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div value={value} index={6} className="muitab" style={{ display: value != 6 ? 'none' : '' }}>
                            <table className='showTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Local Agent Company</td>
                                        <td>{clinical.local_agent_company ? clinical.local_agent_company.value : ''}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div value={value} index={7} className="muitab" style={{ display: value != 7 ? 'none' : '' }}>
                            {clinical.formulations.map((element, index) => (
                                <div key={index}>
                                    <h2 className='sous-heading-show'>Formulation - {index + 1}</h2>
                                    
                                    {element.ingredient.map((ele, i) => (
                                        <div key={i}>
                                            <h2 className='sous-heading-show'>Ingredient - {i + 1}</h2>
                                            <table className='showTable'>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Ingredient</td>
                                                        <td>{ele.ingredient ? ele.ingredient.value : ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Function</td>
                                                        <td>{ele.function ? ele.function.value : ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Strength Type</td>
                                                        <td>{ele.strength_type ? ele.strength_type.value : ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Numerator Lower Val</td>
                                                        <td>{ele.numerator_lower_val}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Numerator Upper Val</td>
                                                        <td>{ele.numerator_upper_val}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Numerator Unit</td>
                                                        <td>{ele.numerator_unit ? ele.numerator_unit.value : ''}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                    
                                </div>
                            ))}
                        </div>
                        <div value={value} index={8} className="muitab" style={{ display: value != 8 ? 'none' : '' }}>
                            {clinical.packagings.map((element, i) => (
                                <div key={i}>
                                    <h2 className='sous-heading-show'>Package - {i + 1}</h2>
                                    <div>
                                        <table className='showTable'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Packaging Type</td>
                                                    <td>{element.packaging_type ? element.packaging_type.value : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Packaging Name</td>
                                                    <td>{element.packaging_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Description</td>
                                                    <td>{element.description}</td>
                                                </tr>
                                                <tr>
                                                    <td>Launched</td>
                                                    <td>{element.launched ? element.launched.value : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>First Launch Date</td>
                                                    <td>{element.first_lunch_date ? moment(element.first_lunch_date).format('DD-MMM-yy') : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Packaging Discontinued</td>
                                                    <td>{element.packaging_discontinued ? element.packaging_discontinued.value : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Discontinuation Date</td>
                                                    <td>{element.discontinuation_date ? moment(element.discontinuation_date).format('DD-MMM-yy') : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Remarks</td>
                                                    <td>{element.remarks}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {element.packagelif.map((ele, index) => (
                                            <div className='sous-container' key={index}>
                                                <h2 className='sous-heading-show'>Shelf life {i + 1} - {index + 1}</h2>
                                                <table className='showTable'>
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Shelf Life</td>
                                                            <td>{ele.shelf_life}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Shelf-life Unit</td>
                                                            <td>{ele.shelf_life_unit ? ele.shelf_life_unit.value : ''}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Package Shelf-life Type</td>
                                                            <td>{ele.package_shelf_life_type ? ele.package_shelf_life_type.value : ""}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Package Storage Condition</td>
                                                            <td>{ele.package_storage_condition.map((e, j) => <ul key={j}><li>{e.value}</li></ul>)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Remarks</td>
                                                            <td>{ele.remarks}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div value={value} index={9} className="muitab" style={{ display: value != 9 ? 'none' : '' }}>
                            <table className='showTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Indications</td>
                                        <td>{clinical.indication.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Paediatric Use</td>
                                        <td>{clinical.paediatric_use ? clinical.paediatric_use.value : ''}</td>
                                    </tr>
                                
                                </tbody>
                            </table>
                        </div>
                        <div value={value} index={10} className="muitab" style={{ display: value != 10 ? 'none' : '' }}>
                            {clinical.manufacturing.map((element, index) => (
                                <div key={index}>
                                    <h2 className='sous-heading-show'>Manufacturer - {index + 1}</h2>
                                    <div>
                                        <table className='showTable'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Manufacturer</td>
                                                    <td>{element.manufacturer ? element.manufacturer.value : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Operation Type</td>
                                                    <td>{element.operation_type.map((ele, i) => <ul key={i}><li>{ele.value}</li></ul>)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div value={value} index={11} className="muitab" style={{ display: value != 11 ? 'none' : '' }}>
                            {clinical.statuses.map((element, index) => (
                                <div key={index}>
                                    <h2 className='sous-heading-show'>Status - {index + 1}</h2>
                                    <div>
                                        <table className='showTable'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>{element.status ? element.status.value : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status Date</td>
                                                    <td>{moment(element.status_date).format('DD-MMM-yy')}</td>
                                                </tr>
                                                <tr>
                                                    <td>eCTD Sequence</td>
                                                    <td>{element.ectd_sequence}</td>
                                                </tr>
                                                <tr>
                                                    <td>Change Control Ref</td>
                                                    <td>{element.change_control_ref}</td>
                                                </tr>
                                                <tr>
                                                    <td>Internal Submission Reference</td>
                                                    <td>{element.internal_submission_reference}</td>
                                                </tr>
                                                <tr>
                                                    <td>Remarks</td>
                                                    <td>{element.remarks}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div index={12} className="muitab" style={{ display: value != 12 ? 'none' : '' }}>
                            {clinical.doc.map((element, index) => (
                                <div key={index}>
                                    <h2 className='sous-heading-show'>Document - {index + 1}</h2>
                                    <div>
                                        <table className='showTable'>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Document type</td>
                                                    <td>{element.document_type ? element.document_type.value : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Document title</td>
                                                    <td>{element.document_title}</td>
                                                </tr>
                                                <tr>
                                                    <td>Language</td>
                                                    <td>{element.language ? element.language.value : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Version date</td>
                                                    <td>{element.version_date ? moment(element.version_date).format('DD-MMM-yy') : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Remarks</td>
                                                    <td>{element.dremarks}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Box>
                </div>
            </div>
        </>
    )
}

Show.layout = page => <Authenticated children={page} auth={page.props.auth} />
export default Show;