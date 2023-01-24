import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { useForm } from '@inertiajs/inertia-react';
import Documents from '@/Layouts/Documents';
import PropTypes from 'prop-types';
import { Tabs as Mtabs, Tab as Mtab, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Head } from '@inertiajs/inertia-react';
import moment from 'moment';

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
   
    const { rc } = props;

    const [value, setValue] = useState(0);
   
    const handleMChange = (event, newValue) => {

        setValue(newValue);
    };

    return (
        <>
            <Head title="MA - Show" />

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
                            <Mtab label="Packagings" {...a11yProps(8)}  />
                            <Mtab label="Indications" {...a11yProps(9)}  />
                            <Mtab label="Manufacturing & Supply Chain" {...a11yProps(10)} />
                            <Mtab label="Interaction / Commitment remarks" {...a11yProps(11)} />
                            <Mtab label="Status Details" {...a11yProps(12)} />
                            <Mtab label="Next Renewals" {...a11yProps(13)} />
                            <Mtab label="Documents" {...a11yProps(14)} />
                        </Mtabs>
                        <div index={0} className="muitab" style={{ display: value != 0 ? 'none' : '' }}>
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
                                        <td>{rc.procedure_type.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Country(s)</td>
                                        <td>{rc.procedure_type.value === 'Decentralized' || rc.procedure_type.value === 'Mutual Recognition'  ? rc.country.map((ele,i) => <ul key={i}><li>{ele.value}</li></ul>) : rc.country.value}</td>
                                    </tr>
                                    {rc.procedure_type.value === 'Decentralized' || rc.procedure_type.value === 'Mutual Recognition'  ? 
                                    <tr>
                                        <td>RMS</td>
                                        <td>{rc.rms ? rc.rms.value : ''}</td>

                                    </tr> : '' }
                                    <tr>
                                        <td>Procedure Number</td>
                                        <td>{rc.procedure_number}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>Product Type</td>
                                        <td>{rc.product_type.value}</td>
                                    </tr> */}
                                    <tr>
                                        <td>Submission Type</td>
                                        <td>{rc.application_stage.value}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                            <table className='showTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                        <td>Registration Title </td>
                                        <td>{rc.registration_title}</td>
                                    </tr> */}
                                    <tr>
                                        <td>Product Name </td>
                                        <td>{rc.product_name.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Local Tradename</td>
                                        <td>{rc.local_tradename}</td>
                                    </tr>
                                    <tr>
                                        <td>Registration Holder</td>
                                        <td>{rc.registration_holder.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Application Number</td>
                                        <td>{rc.application_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Dossier Reference Number</td>
                                        <td>{rc.dossier_reference}</td>
                                    </tr>
                                    <tr>
                                        <td>Remarks</td>
                                        <td>{rc.remarks}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div index={2} className="muitab" style={{ display: value != 2 ? 'none' : '' }}>
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
                                        <td>{rc.authorized_pharmaceutical_form.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Administrable pharmaceutical Form</td>
                                        <td>{rc.administrable_pharmaceutical_form ? rc.administrable_pharmaceutical_form.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Route Of Admin</td>
                                        <td>{rc.route_of_admin.map((ele, i) => (<ul key={i}><li>{ele.value}</li></ul>))}</td>
                                    </tr>
                                    <tr>
                                        <td>ATC</td>
                                        <td>{rc.atc.map((ele, i) => (<ul key={i}><li>{ele.value}</li></ul>))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div index={3} className="muitab" style={{ display: value != 3 ? 'none' : '' }}>
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
                                        <td>{rc.orphan_designation_status ? rc.orphan_designation_status.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Orphan Indication Type</td>
                                        <td>{rc.orphan_indication_type ? rc.orphan_indication_type.value : ''}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div index={4} className="muitab" style={{ display: value != 4 ? 'none' : '' }}>   
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
                                        <td>{rc.under_intensive_monitoring ? rc.under_intensive_monitoring.value : ''}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div index={5} className="muitab" style={{ display: value != 5 ? 'none' : '' }}>
                            {rc.key_dates.map((element, index) => (
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
                                        <td>{rc.alternate_number_type ? rc.alternate_number_type.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Alternate Number</td>
                                        <td>{rc.alternate_number}</td>
                                    </tr>
                                    <tr>
                                        <td>Remarks</td>
                                        <td>{rc.remarks}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div index={6} className="muitab" style={{ display: value != 6 ? 'none' : '' }}>
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
                                        <td>{rc.local_agent_company ? rc.local_agent_company.value : ''}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div index={7} className="muitab" style={{ display: value != 7 ? 'none' : '' }}>
                           {rc.formulations.map((element, index) => (
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
                        <div index={8} className="muitab" style={{ display: value != 8 ? 'none' : '' }}>
                            {rc.packagings.map((element, i) => (
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
                                                    <td>{moment(element.first_lunch_date).format('DD-MMM-yy')}</td>
                                                </tr>
                                                <tr>
                                                    <td>Packaging Discontinued</td>
                                                    <td>{element.packaging_discontinued ? element.packaging_discontinued.value : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Discontinuation Date</td>
                                                    <td>{moment(element.discontinuation_date).format('DD-MMM-yy')}</td>
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
                                                            <td>{ele.package_storage_condition.map((e,j) => <ul key={j}><li>{e.value}</li></ul>)}</td>
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
                        <div index={9} className="muitab" style={{ display: value != 9 ? 'none' : '' }}>
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
                                        <td>{rc.indication.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Paediatric Use</td>
                                        <td>{rc.paediatric_use ? rc.paediatric_use.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Age</td>
                                        <td>{rc.age}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div index={10} className="muitab" style={{ display: value != 10 ? 'none' : '' }}>
                            {rc.manufacturing.map((element, index) => (
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
                                                    <td>{element.operation_type.map((ele,i) => <ul key={i}><li>{ele.value}</li></ul>)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div index={11} className="muitab" style={{ display: value != 11 ? 'none' : '' }}>
                            <table className='showTable'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Interaction remarks</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Commitment remarks</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div index={12} className="muitab" style={{ display: value != 12 ? 'none' : '' }}>
                            {rc.statuses.map((element, index) => (
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
                        <div index={13} className="muitab" style={{ display: value != 13 ? 'none' : '' }}>
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
                                            <td>Next Renewals</td>
                                            <td>{rc.next_renewals}</td>
                                        </tr>
                                        <tr>
                                            <td>Next Renewal Submission Deadline</td>
                                            <td>{rc.nr_submission_deadline}</td>
                                        </tr>
                                        <tr>
                                            <td>Next Renewal Date</td>
                                            <td>{rc.nr_date}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div index={14} className="muitab" style={{ display: value != 14 ? 'none' : '' }}>
                            {rc.doc.map((element, index) => (
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
            <footer style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="p" component="p">Powered By <span style={{ color: 'rgb(44, 197,162)', fontWeight: '800' }}>Ekemia</span> &copy; 2022</Typography>
            </footer>
        </>
    )
}

Show.layout = page => <Authenticated children={page} auth={page.props.auth} />

export default Show;