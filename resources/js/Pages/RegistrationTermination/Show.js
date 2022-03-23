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
    const {rt} = props;
    const [value, setValue] = useState(0);
   

    const handleMChange = (event, newValue) => {

        setValue(newValue);
    };
    return(
        <>
           <Head title="Registration Termination - Show" />
           <div className="row">
               <div className="col-md-12">
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
                    >
                        <Mtabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleMChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Mtab label="Registration Identification" {...a11yProps(0)} />
                            <Mtab label="Registration Termination Details" {...a11yProps(1)} />
                            <Mtab label="Status Details" {...a11yProps(2)} />
                            <Mtab label="Documents" {...a11yProps(3)} />
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
                                        <td>Product Name</td>
                                        <td>{rt.product.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Procedure Type</td>
                                        <td>{rt.procedure_type.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Country(s)</td>
                                        <td>{rt.procedure_type.value === 'Decentralized' || rt.procedure_type.value === 'Mutual Recognition'  ? rt.country.map((ele,i) => <ul key={i}><li>{ele.value}</li></ul>) : rt.country.value}</td>
                                    </tr>
                                    {rt.procedure_type.value === 'Decentralized' || rt.procedure_type.value === 'Mutual Recognition'  ? 
                                    <tr>
                                        <td>RMS</td>
                                        <td>{rt.rms ? rt.rms.value : ''}</td>

                                    </tr> : '' }
                                    <tr>
                                        <td>Procedure Number</td>
                                        <td>{rt.procedure_num}</td>
                                    </tr>
                                    <tr>
                                        <td>Local Tradename</td>
                                        <td>{rt.local_tradename}</td>
                                    </tr>
                                    <tr>
                                        <td>Application Stage</td>
                                        <td>{rt.application_stage ? rt.application_stage.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Product Type</td>
                                        <td>{rt.product_type ? rt.product_type.value : ''}</td>
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
                                        <td>Description of the event</td>
                                        <td>{rt.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Registration Termination Type</td>
                                        <td>{rt.rttype ? rt.rttype.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Reason of the event</td>
                                        <td>{rt.reason ? rt.reason.value : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Remarks</td>
                                        <td>{rt.remarks}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div value={value} index={2} className="muitab" style={{ display: value != 2 ? 'none' : '' }}>
                            {rt.statuses.map((element, index) => (
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
                                                    <td>{moment(element.status_date).format('YYYY-MM-DD')}</td>
                                                </tr>
                                                <tr>
                                                    <td>eCTD sequence</td>
                                                    <td>{element.ectd}</td>
                                                </tr>
                                                <tr>
                                                    <td>Change Control or pre-assessment</td>
                                                    <td>{element.control}</td>
                                                </tr>
                                                <tr>
                                                    <td>CCDS/Core PIL ref n°</td>
                                                    <td>{element.cdds}</td>
                                                </tr>
                                                <tr>
                                                    <td>Remarks</td>
                                                    <td>{element.remarks}</td>
                                                </tr>
                                                <tr>
                                                    <td>Effective internal implementation date</td>
                                                    <td>{element.implimentation_date ? moment(element.implimentation_date).format('YYYY-MM-DD') : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Implementation Deadline of deadline for answer</td>
                                                    <td>{element.deadline_for_answer ? moment(element.deadline_for_answer).format('YYYY-MM-DD') : ''}</td>
                                                </tr>
                                                <tr>
                                                    <td>Impacted of changes approved</td>
                                                    <td>{element.changes_approved ? element.changes_approved.value : ''}</td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div value={value} index={3} className="muitab" style={{ display: value != 3 ? 'none' : '' }}>
                            {rt.doc.map((element, index) => (
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
                                                    <td>{element.version_date ? moment(element.version_date).format('YYYY-MM-DD') : ''}</td>
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