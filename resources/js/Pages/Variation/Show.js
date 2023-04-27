import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Tabs as Mtabs, Tab as Mtab, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import moment from 'moment';
import { Head } from '@inertiajs/inertia-react';
import DocumentShow from '@/Components/DocumentShow';

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
    const { variation } = props;

    const [value, setValue] = useState(0);


    const handleMChange = (event, newValue) => {

        setValue(newValue);
    };
    if (variation.isHq) {
        return (
            <div>
                <Head title="MA - Variation Show" />
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
                                <Mtab label="Registration Identification" {...a11yProps(0)} />
                                <Mtab label="Variation Details" {...a11yProps(1)} />
                                <Mtab label="Status Details" {...a11yProps(2)} />
                                <Mtab label="Documents" {...a11yProps(3)} />
                            </Mtabs>
                            <div value={value} index={0} className="muitab" style={{ display: value != 0 ? 'none' : '' }}>
                                {variation.identification.map((element, index) => (
                                    <div key={index}>
                                        <h2 className='sous-heading-show'>Identification - {index + 1}</h2>
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
                                                        <td>Product Name</td>
                                                        <td>{element.product.value}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Procedure Type</td>
                                                        <td>{element.procedure_type.value}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Country(s)</td>
                                                        <td>{element.procedure_type.value === 'Decentralized' || element.procedure_type.value === 'Mutual Recognition' ? element.country.map((ele, i) => <ul key={i}><li>{ele.value}</li></ul>) : element.country.value}</td>
                                                    </tr>
                                                    {element.procedure_type.value === 'Decentralized' || element.procedure_type.value === 'Mutual Recognition' ?
                                                    <tr>
                                                        <td>RMS</td>
                                                        <td>{element.rms ? element.rms.value : ''}</td>
                                                    </tr> : ''}
                                                    <tr>
                                                        <td>Procedure Number</td>
                                                        <td>{element.procedure_num}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Local Tradename</td>
                                                        <td>{element.local_tradename}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Submission type</td>
                                                        <td>{element.application_stage ? element.application_stage.value : ''}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>Product Type</td>
                                                        <td>{element.product_type ? element.product_type.value : ''}</td>
                                                    </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div value={value} index={1} className="muitab" style={{ display: value != 1 ? 'none' : '' }}>
                                {variation.variation.map((element, index) => (
                                    <div key={index}>
                                        <h2 className='sous-heading-show'>Variation - {index + 1}</h2>
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
                                                        <td>Variation Title</td>
                                                        <td>{element.variation_title}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>Variation Category</td>
                                                        <td>{element.category.value}</td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>Variation Type</td>
                                                        <td>{element.variation_type.value}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Reason for variation</td>
                                                        <td>{element.variation_reason ?  element.variation_reason.value : ''}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>Submission Type</td>
                                                        <td>{element.submission_type.value}</td>
                                                    </tr> */}
                                                    <tr>
                                                        <td>Applcation N°</td>
                                                        <td>{element.application_number}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Submission/Procedure N°</td>
                                                        <td>{element.submission_number}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Dossier Submission Format</td>
                                                        <td>{element.submission_format ?  element.submission_format.value : ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Change Control or pre-assessment</td>
                                                        <td>{element.control}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div value={value} index={2} className="muitab" style={{ display: value != 2 ? 'none' : '' }}>
                                {variation.statuses.map((element, index) => (
                                    <div key={index}>
                                        <h2 className='sous-heading-show'>Statut - {index + 1}</h2>
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
                                                        <td>eCTD sequence</td>
                                                        <td>{element.ectd}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>Change Control or pre-assessment</td>
                                                        <td>{element.control}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>CCDS/Core PIL ref n°</td>
                                                        <td>{element.cdds}</td>
                                                    </tr> */}
                                                    
                                                    <tr>
                                                        <td>Planned Local implementation Date</td>
                                                        <td>{element.local_implementation ? moment(element.local_implementation).format('DD-MMM-yy') : ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>HA Implimentation Deadline</td>
                                                        <td>{element.implimentation_deadline ? moment(element.implimentation_deadline).format('DD-MMM-yy') : ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Actual Local Implementation</td>
                                                        <td>{element.actual_implementation ? moment(element.actual_implementation).format('DD-MMM-yy') : ''}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Status note</td>
                                                        <td>{element.remarks}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div value={value} index={3} className="muitab" style={{ display: value != 3 ? 'none' : '' }}>
                                <DocumentShow docs={variation.doc} />
                                {/* {variation.doc.map((element, index) => (
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
                                ))} */}
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}>
                    <Mtabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleMChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Mtab label="Registration Identification" {...a11yProps(0)} />
                        <Mtab label="Variation Details" {...a11yProps(1)} />
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
                                    <td>{variation.product.value}</td>
                                </tr>
                                <tr>
                                    <td>Procedure Type</td>
                                    <td>{variation.procedure_type.value}</td>
                                </tr>
                                <tr>
                                    <td>Country(s)</td>
                                    <td>{variation.procedure_type.value === 'Decentralized' || variation.procedure_type.value === 'Mutual Recognition' ? variation.country.map((ele, i) => <ul key={i}><li>{ele.value}</li></ul>) : variation.country.value}</td>
                                </tr>
                                {variation.procedure_type.value === 'Decentralized' || variation.procedure_type.value === 'Mutual Recognition' ?
                                    <tr>
                                        <td>RMS</td>
                                        <td>{variation.rms ? variation.rms.value : ''}</td>
                                    </tr> : ''}
                                <tr>
                                    <td>Procedure Number</td>
                                    <td>{variation.procedure_num}</td>
                                </tr>
                                <tr>
                                    <td>Local Tradename</td>
                                    <td>{variation.local_tradename}</td>
                                </tr>
                                <tr>
                                    <td>Submission type</td>
                                    <td>{variation.application_stage ? variation.application_stage.value : ''}</td>
                                </tr>
                                {/* <tr>
                                    <td>Product Type</td>
                                    <td>{variation.product_type ? variation.product_type.value : ''}</td>
                                </tr> */}
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
                                    <td>Variation Title</td>
                                    <td>{variation.variation_title}</td>
                                </tr>
                                {/* <tr>
                                    <td>Variation Category</td>
                                    <td>{variation.category.value}</td>
                                </tr> */}
                                <tr>
                                    <td>Variation Type</td>
                                    <td>{variation.variation_type.value}</td>
                                </tr>
                                <tr>
                                    <td>Reason for variation</td>
                                    <td>{variation.variation_reason ? variation.variation_reason.value : ''}</td>
                                </tr>
                                {/* <tr>
                                    <td>Submission Type</td>
                                    <td>{variation.submission_type.value}</td>
                                </tr> */}
                                <tr>
                                    <td>Applcation N°</td>
                                    <td>{variation.application_number}</td>
                                </tr>
                                <tr>
                                    <td>Submission/Procedure N°</td>
                                    <td>{variation.submission_number}</td>
                                </tr>
                                <tr>
                                    <td>Dossier Submission Format</td>
                                    <td>{variation.submission_format ? variation.submission_format.value : ''}</td>
                                </tr>
                                <tr>
                                    <td>Change control or pre-assessment</td>
                                    <td>{variation.control}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div value={value} index={2} className="muitab" style={{ display: value != 2 ? 'none' : '' }}>
                        {variation.statuses.map((element, index) => (
                            <div key={index}>
                                <h2 className='sous-heading-show'>Statut - {index + 1}</h2>
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
                                                <td>eCTD sequence</td>
                                                <td>{element.ectd}</td>
                                            </tr>
                                            {/* <tr>
                                                <td>Change Control or pre-assessment</td>
                                                <td>{element.control}</td>
                                            </tr>
                                            <tr>
                                                <td>CCDS/Core PIL ref n°</td>
                                                <td>{element.cdds}</td>
                                            </tr> */}
                                           
                                            <tr>
                                                <td>Planned Local implementation Date</td>
                                                <td>{element.local_implementation ? moment(element.local_implementation).format('DD-MMM-yy') : ''}</td>
                                            </tr>
                                            <tr>
                                                <td>HA Implimentation Deadline</td>
                                                <td>{element.implimentation_deadline ? moment(element.implimentation_deadline).format('DD-MMM-yy') : ''}</td>
                                            </tr>
                                            <tr>
                                                <td>Actual Local Implementation</td>
                                                <td>{element.actual_implementation ? moment(element.actual_implementation).format('DD-MMM-yy') : ''}</td>
                                            </tr>
                                            <tr>
                                                <td>Status note</td>
                                                <td>{element.remarks}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div value={value} index={3} className="muitab" style={{ display: value != 3 ? 'none' : '' }}>
                        <DocumentShow docs={variation.doc} />
                        {/* {variation.doc.map((element, index) => (
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
                        ))} */}
                    </div>
                </Box>
            </div>
        )
    }

}

Show.layout = page => <Authenticated children={page} auth={page.props.auth} />
export default Show;