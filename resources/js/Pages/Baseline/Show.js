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
    const {baseline} = props;

    return(
        <div>
            <Typography variant='h6' gutterBottom >Registration Identication</Typography>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Product Name : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.product} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Procedure Type : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.procedure_type} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Country : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.country} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >RMS : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.rms} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Procedure Number : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.procedure_num} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Local Tradename : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.local_tradename} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Application Stage : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.application_stage} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Product Type : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.product_type} </Typography>
            </div>

            <Divider style={{ margin: '10px 0' }} />
            <Typography variant='h6' gutterBottom >Baseline Details</Typography>

            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Baseline Title : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.baseline_title} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Description of the event : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.description} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Application N° : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.application_num} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Reason for variation : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.reason} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Remarks : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {baseline.remarks} </Typography>
            </div>

            <Divider style={{ margin: '10px 0' }} />
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
                            <TableCell>Effective internal implementation date</TableCell>
                            <TableCell>Implementation Deadline of deadline for answer</TableCell>
                            <TableCell>Impacted of changes approved</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {baseline.statuses.map((status, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                <TableCell>{status.status}</TableCell>
                                <TableCell>{status.status_date ? moment(status.status_date).format('DD-MM-YYYY') : ''}</TableCell>
                                <TableCell>{status.ectd}</TableCell>
                                <TableCell>{status.control}</TableCell>
                                <TableCell>{status.cdds}</TableCell>
                                <TableCell>{status.remarks}</TableCell>
                                <TableCell>{status.implimentation_date ? moment(status.implimentation_date).format('DD-MM-YYYY'): ''}</TableCell>
                                <TableCell>{status.deadline_for_answer ? moment(status.deadline_for_answer).format('DD-MM-YYYY') : ''}</TableCell>
                                <TableCell>{status.changes_approved}</TableCell>
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
                            {baseline.doc.map((docs, i) => (
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

Show.layout = page => <Authenticated children={page} auth={page.props.auth} />
export default Show;