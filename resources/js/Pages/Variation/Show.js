import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { Head } from '@inertiajs/inertia-react';

const Show = (props) => {
    const { variation } = props;
    if (variation.isHq) {
        return (
            <div>
                <Typography variant='h6' gutterBottom >Registrations</Typography>
                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Procedure Type</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>RMS</TableCell>
                                <TableCell>Procedure Number</TableCell>
                                <TableCell>Local Tradename</TableCell>
                                <TableCell>Application Stage</TableCell>
                                <TableCell>Product Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {variation.identification.map((iden, i) => (
                                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{iden.product}</TableCell>
                                    <TableCell>{iden.procedure_type}</TableCell>
                                    <TableCell>{iden.country}</TableCell>
                                    <TableCell>{iden.rms}</TableCell>
                                    <TableCell>{iden.application_stage}</TableCell>
                                    <TableCell>{iden.procedure_num}</TableCell>
                                    <TableCell>{iden.local_tradename}</TableCell>
                                    <TableCell>{iden.product_type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider style={{ margin: '10px 0' }} />
                <Typography variant='h6' gutterBottom >Variations</Typography>

                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Variation Title</TableCell>
                                <TableCell>Variation Category</TableCell>
                                <TableCell>Variation Type</TableCell>
                                <TableCell>Reason for variation</TableCell>
                                <TableCell>Submission Type</TableCell>
                                <TableCell>Applcation N°</TableCell>
                                <TableCell>Submission/Procedure N°</TableCell>
                                <TableCell>Dossier Submission Format</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {variation.variation.map((vari, i) => (
                                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{vari.product}</TableCell>
                                    <TableCell>{vari.country}</TableCell>
                                    <TableCell>{vari.category}</TableCell>
                                    <TableCell>{vari.variation_type}</TableCell>
                                    <TableCell>{vari.submission_type}</TableCell>
                                    <TableCell>{vari.application_number}</TableCell>
                                    <TableCell>{vari.submission_number}</TableCell>
                                    <TableCell>{vari.submission_format}</TableCell>
                                    <TableCell>{vari.variation_reason}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider style={{ margin: '10px 0' }} />
                <Typography variant='h6' gutterBottom >Status Details</Typography>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Status Date </TableCell>
                                <TableCell>eCTD sequence</TableCell>
                                <TableCell>Change Control or pre-assessment</TableCell>
                                <TableCell>CCDS/Core PIL ref n°</TableCell>
                                <TableCell>Remarks</TableCell>
                                <TableCell>Planned Local implementation Date</TableCell>
                                <TableCell>HA Implimentation Deadline</TableCell>
                                <TableCell>Actual Local Implementation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {variation.variation.map((status, i) => (
                                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{status.product}</TableCell>
                                    <TableCell>{status.country}</TableCell>
                                    <TableCell>{status.status}</TableCell>
                                    <TableCell>{status.status_date ? moment(status.status_date).format('DD-MM-YYYY') : ''}</TableCell>
                                    <TableCell>{status.ectd}</TableCell>
                                    <TableCell>{status.control}</TableCell>
                                    <TableCell>{status.cdds}</TableCell>
                                    <TableCell>{status.remarks}</TableCell>
                                    <TableCell>{status.local_implementation}</TableCell>
                                    <TableCell>{status.implimentation_deadline}</TableCell>
                                    <TableCell>{status.actual_implementation}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider style={{ margin: '10px 0' }} />
                <Typography variant='h6' gutterBottom >Documents</Typography>

                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Document type</TableCell>
                                <TableCell>Document title</TableCell>
                                <TableCell>Language</TableCell>
                                <TableCell>Version date</TableCell>
                                <TableCell>Remarks</TableCell>
                                <TableCell>Document</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {variation.doc.map((docs, i) => (
                                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{docs.document_type}</TableCell>
                                    <TableCell>{docs.document_title}</TableCell>
                                    <TableCell>{docs.language}</TableCell>
                                    <TableCell>{docs.version_date ? moment(docs.version_date).format('MM-DD-YYYY') : ''}</TableCell>
                                    <TableCell>{docs.dremarks}</TableCell>
                                    <TableCell>{docs.document}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    } else {
        return (
            <div>
                <Typography variant='h6' gutterBottom >Registration</Typography>

                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Product Name : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.product} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Procedure Type : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.procedure_type} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Country : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.country} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >RMS : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.rms} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Procedure Number : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.procedure_num} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Local Tradename : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.local_tradename} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Application Stage : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.application_stage} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Product Type : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.product_type} </Typography>
                </div>

                <Divider style={{margin:'10px 0'}} />
                <Typography variant='h6' gutterBottom >Variation Details</Typography>

                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Variation Title : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.variation_title} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Variation Category : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.category} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Variation Type : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.variation_type} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Reason for variation : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.variation_reason} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Submission Type : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.submission_type} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Applcation N° : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.application_number} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Submission/Procedure N° : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.submission_number} </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                    <Typography variant='p' gutterBottom color='success' component="div" >Dossier Submission Format : </Typography>
                    <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {variation.submission_format} </Typography>
                </div>

                <Divider style={{margin:'10px 0'}} />
                <Typography variant='h6' gutterBottom >Status Details</Typography>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                               
                                <TableCell>Status</TableCell>
                                <TableCell>Status Date </TableCell>
                                <TableCell>eCTD sequence</TableCell>
                                <TableCell>Change Control or pre-assessment</TableCell>
                                <TableCell>CCDS/Core PIL ref n°</TableCell>
                                <TableCell>Remarks</TableCell>
                                <TableCell>Planned Local implementation Date</TableCell>
                                <TableCell>HA Implimentation Deadline</TableCell>
                                <TableCell>Actual Local Implementation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {variation.statuses.map((status, i) => (
                                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                   
                                    <TableCell>{status.status}</TableCell>
                                    <TableCell>{status.status_date ? moment(status.status_date).format('DD-MM-YYYY') : ''}</TableCell>
                                    <TableCell>{status.ectd}</TableCell>
                                    <TableCell>{status.control}</TableCell>
                                    <TableCell>{status.cdds}</TableCell>
                                    <TableCell>{status.remarks}</TableCell>
                                    <TableCell>{status.local_implementation}</TableCell>
                                    <TableCell>{status.implimentation_deadline}</TableCell>
                                    <TableCell>{status.actual_implementation}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider style={{ margin: '10px 0' }} />
                <Typography variant='h6' gutterBottom >Documents</Typography>

                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Document type</TableCell>
                                <TableCell>Document title</TableCell>
                                <TableCell>Language</TableCell>
                                <TableCell>Version date</TableCell>
                                <TableCell>Remarks</TableCell>
                                <TableCell>Document</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {variation.doc.map((docs, i) => (
                                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{docs.document_type}</TableCell>
                                    <TableCell>{docs.document_title}</TableCell>
                                    <TableCell>{docs.language}</TableCell>
                                    <TableCell>{docs.version_date ? moment(docs.version_date).format('MM-DD-YYYY') : ''}</TableCell>
                                    <TableCell>{docs.dremarks}</TableCell>
                                    <TableCell>{docs.document}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        )
    }

}

Show.layout = page => <Authenticated children={page} auth={page.props.auth} />
export default Show;