import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import CollapsibleTable from '@/Components/CollapsibleTable';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

const Show = (props) => {
    const { rc } = props;
    
    return(
        <div>

            <Typography variant='h6'gutterBottom >General Information</Typography>

            <div style={{display:'flex', alignItems:'center',height:'20px'}}>
                <Typography variant='p' gutterBottom color='success' component="div" >Procedure Type : </Typography> 
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}> {rc.procedure_type} </Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom  component="div">Country : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.country}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div" >Procedure Number : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.procedure_number}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom  component="div" >Product Type : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.product_type}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div" >Application Stage : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.application_stage}</Typography>
            </div>

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom >Basic Information</Typography>

            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div" >Registration Title : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.registration_title}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div" >Product Name : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.product_name}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div">Local Tradename : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.local_tradename}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div">Registration Holder : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.registration_holder}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div">Application Number :</Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.application_number}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div">Dossier Reference Number : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.dossier_reference}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div">Remarks : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.bremarks}</Typography>
            </div>

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Dosage Form / ATC</Typography>

            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div">Authorized Pharmaceutical Form : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.authorized_pharmaceutical_form}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div">Route Of Admin : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.route_of_admin}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' gutterBottom component="div">Administrable pharmaceutical form : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.administrable_pharmaceutical_form}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">ATC : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.atc}</Typography>
            </div>

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Orphan Drug Details</Typography>

            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Orphan Designation Status : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.orphan_designation_status}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Orphan Indication Type : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.orphan_indication_type}</Typography>
            </div>

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Under Intensive Monitoring Details</Typography>

            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Under Intensive Monitoring : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.under_intensive_monitoring}</Typography>
            </div>


            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Key Dates / Alternate Number</Typography>
            {/* <Typography variant='p' display="block" gutterBottom component="div">Keys {i + 1}</Typography> */}
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Key Date Type</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Remarks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rc.key_dates.map((kd, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell >{kd.date_type}</TableCell>
                                <TableCell >{moment(kd.date).format('MM-DD-YYYY')}</TableCell>
                                <TableCell >{kd.remarks}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Alternate Number Type : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.alternate_number_type}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Alternate Number : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.alternate_number}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Remarks : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.remarks}</Typography>
            </div>

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Local Agent</Typography>

            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Local Agent Company : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.local_agent_company}</Typography>
            </div>

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Formulations</Typography>

            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ingredient</TableCell>
                            <TableCell>trength Type</TableCell>
                            <TableCell>Numerator Lower Val</TableCell>
                            <TableCell>Numerator Upper Val</TableCell>
                            <TableCell>Numerator Unit</TableCell>
                            <TableCell>Function</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rc.formulations.map((formulation, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell >{formulation.ingredient}</TableCell>
                                <TableCell >{formulation.strength_type}</TableCell>
                                <TableCell >{formulation.numerator_lower_val}</TableCell>
                                <TableCell >{formulation.numerator_upper_val}</TableCell>
                                <TableCell >{formulation.numerator_unit}</TableCell>
                                <TableCell >{formulation.function}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Packagings</Typography>
            <CollapsibleTable data={rc.packagings} />

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Indications</Typography>
            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Indications : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.indication}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Paediatric Use : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.paediatric_use}</Typography>
            </div>
            <div style={{display:'flex'}}>
                <Typography variant='p' display="block" gutterBottom component="div">Age : </Typography>  
                <Typography variant='p' gutterBottom component="div" style={{marginLeft:'5px'}}>{rc.age}</Typography>
            </div>

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Manufacturing & Supply Chain</Typography>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Manufacturer</TableCell>
                            <TableCell>Operation Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rc.manufacturing.map((man, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell >{man.manufacturer}</TableCell>
                                <TableCell >{man.operation_type.map((ot,j) => (
                                    <ul key={j}>
                                        <li>{ot}</li>
                                    </ul>
                                ))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Status Details</Typography>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>Status Date</TableCell>
                            <TableCell>eCTD Sequence</TableCell>
                            <TableCell>Change Control Re</TableCell>
                            <TableCell>Internal Submission Reference</TableCell>
                            <TableCell>Remarks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rc.statuses.map((status, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{status.status}</TableCell>
                                <TableCell>{moment(status.status_date).format('MM-DD-YYYY')}</TableCell>
                                <TableCell>{status.ectd_sequence}</TableCell>
                                <TableCell>{status.change_control_ref}</TableCell>
                                <TableCell>{status.internal_submission_reference}</TableCell>
                                <TableCell>{status.remarks}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider style={{margin:'10px 0'}} />
            <Typography variant='h6' gutterBottom>Documents</Typography>
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
                        {rc.doc.map((docs, i) => (
                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{docs.document_type}</TableCell>
                                <TableCell>{docs.document_title}</TableCell>
                                <TableCell>{docs.language}</TableCell>
                                <TableCell>{moment(docs.version_date).format('MM-DD-YYYY')}</TableCell>
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