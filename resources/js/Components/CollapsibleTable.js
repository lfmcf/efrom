import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{row.packaging_type}</TableCell>
                <TableCell align="center">{row.packaging_name}</TableCell>
                <TableCell align="center">{row.package_number}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.launched}</TableCell>
                <TableCell align="center">{moment(row.first_lunch_date).format('MM-DD-YYYY')}</TableCell>
                <TableCell align="center">{row.packaging_discontinued}</TableCell>
                <TableCell align="center">{moment(row.discontinuation_date).format('MM-DD-YYYY')}</TableCell>
                <TableCell align="center">{row.remarks}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {/* <Box sx={{ margin: 1 }}> */}
                            <Typography variant="h6" gutterBottom component="div">
                                Shelf-life
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Package Shelf-life Type</TableCell>
                                        <TableCell>Shelf Life</TableCell>
                                        <TableCell align="center">Shelf-life Unit</TableCell>
                                        <TableCell align="center">Package Storage Condition</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.packagelif.map((historyRow, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.package_shelf_life_type}
                                            </TableCell>
                                            <TableCell>{historyRow.shelf_life}</TableCell>
                                            <TableCell align="center">{historyRow.shelf_life_unit}</TableCell>
                                            <TableCell align="center">
                                                { historyRow.package_storage_condition ? historyRow.package_storage_condition.map((psc,i) => (
                                                    <ul key={i}>
                                                        <li>{psc}</li>
                                                    </ul>
                                                )) : ''}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        {/* </Box> */}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable(props) {
    const {data} = props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Packaging Type</TableCell>
                        <TableCell align="center">Packaging Name</TableCell>
                        <TableCell align="center">Package Size</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Launched</TableCell>
                        <TableCell align="center">First Launch Date</TableCell>
                        <TableCell align="center">Packaging Discontinued</TableCell>
                        <TableCell align="center">Discontinuation Date</TableCell>
                        <TableCell align="center">Remarks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <Row key={i} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
