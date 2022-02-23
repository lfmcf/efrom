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

const Show = (props) => {
    const {renewal} = props;

    return (
        <div>
            <Typography variant='h6' gutterBottom >Registration Identication</Typography>

            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Product Name : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.product} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Procedure Type : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.procedure_type} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Country : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.country} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >RMS : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.rms} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Procedure Number : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.procedure_num} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Local Tradename : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.local_tradename} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Application Stage : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.application_stage} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Product Type : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.product_type} </Typography>
            </div>

            <Divider style={{ margin: '10px 0' }} />
            <Typography variant='h6' gutterBottom >Renewal Details</Typography>

            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Renewal Title : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.renewal_title} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Reason For Renewal : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.validation_reason} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Dossier Submission Format : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.submission_format} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Renewal Procedure N° : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.application_num} </Typography>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                <Typography variant='p' gutterBottom color='success' component="div" >Remarks : </Typography>
                <Typography variant='p' gutterBottom component="div" style={{ marginLeft: '5px' }}> {renewal.remarks} </Typography>
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
                            <TableCell>Implementation Deadline</TableCell>
                            <TableCell>Next Renewals</TableCell>
                            <TableCell>Next Renewals Submission Deadline</TableCell>
                            <TableCell>Next Renewal Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renewal.statuses.map((status, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                <TableCell>{status.status}</TableCell>
                                <TableCell>{status.status_date ? moment(status.status_date).format('DD-MM-YYYY') : ''}</TableCell>
                                <TableCell>{status.ectd}</TableCell>
                                <TableCell>{status.control}</TableCell>
                                <TableCell>{status.cdds}</TableCell>
                                <TableCell>{status.remarks}</TableCell>
                                <TableCell>{status.implimentation_deadline ? moment(status.implimentation_deadline).format('DD-MM-YYYY') : ''}</TableCell>
                                <TableCell>{status.next_renewals}</TableCell>
                                <TableCell>{status.next_renewals_deadline ? moment(status.next_renewals_deadline).format('DD-MM-YYYY') : ''}</TableCell>
                                <TableCell>{status.next_renewals_date ? moment(status.next_renewals_date).format('DD-MM-YYYY') : ''}</TableCell>
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
                            {renewal.doc.map((docs, i) => (
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