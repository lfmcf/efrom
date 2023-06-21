import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
// import { useTable, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';
// import BTable from 'react-bootstrap/Table';
import moment from 'moment';
// import FlashMessage from 'react-flash-message';
import 'regenerator-runtime/runtime'
import Table from '@/Components/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// import { Typography } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react'
import TableViewIcon from '@mui/icons-material/TableView';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import IconButton from '@mui/material/IconButton';
import { Grid, Paper, Typography, Tooltip as Tp, MenuItem } from '@mui/material';
// import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis, Tooltip } from '@devexpress/dx-react-chart-material-ui';
//import { EventTracker } from '@devexpress/dx-react-chart';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from 'axios';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
//import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts';
import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from "bizcharts";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { green } from '@mui/material/colors';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 58,
    height: 26,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(27px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 20 24" fill="${encodeURIComponent(
                    '#fff',
                )}"><g><rect fill="none" height="20" width="20"/></g><g><g><rect height="11" width="4" x="4" y="9"/><rect height="7" width="4" x="16" y="13"/><rect height="16" width="4" x="10" y="4"/></g></g></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#E9E9EA' : '#65C466',
        width: 23,
        height: 23,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="${encodeURIComponent(
                '#fff',)} " viewBox="0 0 16 16"> <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/> </svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#E9E9EA',
        borderRadius: 20 / 2,
    },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    margin: '0 !important'
}));

const cols = {
    month: {
        range: [0, 1]
    }
};


const Dashboard = (props) => {

    const { flash } = usePage().props

    const Rccolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.product_name == 'object' && originalRow.product_name !== null) {
                        return originalRow.product_name.value
                    } else {
                        return originalRow.product_name
                    }

                }
            },
            {
                Header: 'Procedure Type',
                accessor: function (originalRow, rowIndex) {
                    if (typeof originalRow.procedure_type == 'object' && originalRow.procedure_type !== null) {
                        return originalRow.procedure_type.value
                    } else {
                        return originalRow.procedure_type
                    }

                }
            },
            // {
            //     Header: 'Country / Countries',

            //     accessor: function (originalRow, rowIndex) {
            //         if (originalRow.country && Array.isArray(originalRow.country)) {

            //             return originalRow.country.map(ele => (
            //                 <ul>
            //                     <li>{ele}</li>
            //                 </ul>
            //             ))
            //         }
            //    }
            // },
            {
                Header: 'Procedure N°',
                accessor: 'procedure_number',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
                    return moment(originalRow.created_at).format('DD-MMM-yy');
                },
            }
        ],
        []
    )

    const Variationcolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                // accessor: 'product',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.product == 'object' && originalRow.product !== null) {
                        return originalRow.product.value
                    } else {
                        return originalRow.product
                    }

                }
            },
            {
                Header: 'Procedure Type',
                // accessor: 'procedure_type',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.procedure_type == 'object' && originalRow.procedure_type !== null) {
                        return originalRow.procedure_type.value
                    } else {
                        return originalRow.procedure_type
                    }

                }
            },
            // {
            //     Header: 'Country / Countries',
            //     accessor: function (originalRow, rowIndex) {
            //         if (originalRow.country && Array.isArray(originalRow.country)) {

            //             return originalRow.country.map(ele => (
            //                 <ul>
            //                     <li>{ele}</li>
            //                 </ul>
            //             ))
            //         }
            //    }
            // },
            {
                Header: 'Variation Title',
                accessor: 'variation_title',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
                    return moment(originalRow.created_at).format('DD-MMM-yy');
                },
            }
        ],
        []
    )

    const Renewalcolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                // accessor: 'product',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.product == 'object' && originalRow.product !== null) {
                        return originalRow.product.value
                    } else {
                        return originalRow.product
                    }

                }
            },
            {
                Header: 'Procedure Type',
                // accessor: 'procedure_type',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.procedure_type == 'object' && originalRow.procedure_type !== null) {
                        return originalRow.procedure_type.value
                    } else {
                        return originalRow.procedure_type
                    }

                }
            },
            // {
            //     Header: 'Country / Countries',
            //     accessor: function (originalRow, rowIndex) {
            //         if (originalRow.country && Array.isArray(originalRow.country)) {

            //             return originalRow.country.map(ele => (
            //                 <ul>
            //                     <li>{ele}</li>
            //                 </ul>
            //             ))
            //         }
            //    }
            // },
            {
                Header: 'Renewal Title',
                accessor: 'renewal_title',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
                    return moment(originalRow.created_at).format('DD-MMM-yy');
                },
            }
        ],
        []
    )

    const Baselinecolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.product == 'object' && originalRow.product !== null) {
                        return originalRow.product.value
                    } else {
                        return originalRow.product
                    }
                }
            },
            {
                Header: 'Procedure Type',
                // accessor: 'procedure_type',
                accessor: function (originalRow, rowIndex) {
                    if (typeof originalRow.procedure_type == 'object' && originalRow.procedure_type !== null) {
                        return originalRow.procedure_type.value
                    } else {
                        return originalRow.procedure_type
                    }
                }
            },
            {
                Header: 'Baseline Title',
                accessor: 'baseline_title',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
                    return moment(originalRow.created_at).format('DD-MMM-yy');
                },
            }
        ],
        []
    )

    const Clinicalrtcolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.product_name == 'object' && originalRow.product_name !== null) {
                        return originalRow.product_name.value
                    } else {
                        return originalRow.product_name
                    }
                }
            },
            {
                Header: 'Procedure Type',
                // accessor: 'procedure_type',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.procedure_type == 'object' && originalRow.procedure_type !== null) {
                        return originalRow.procedure_type.value
                    } else {
                        return originalRow.procedure_type
                    }
                }
            },
            {
                Header: 'Protocol Number',
                accessor: 'protocol_number',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
                    return moment(originalRow.created_at).format('DD-MMM-yy');
                },
            }
        ],
        []
    )

    const Amendmentcolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.product == 'object' && originalRow.product !== null) {
                        return originalRow.product.value
                    } else {
                        return originalRow.product
                    }
                }
            },
            {
                Header: 'Procedure Type',
                // accessor: 'procedure_type',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.procedure_type == 'object' && originalRow.procedure_type !== null) {
                        return originalRow.procedure_type.value
                    } else {
                        return originalRow.procedure_type
                    }
                }
            },
            {
                Header: 'Amendment Title',
                accessor: 'amendment_title',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
                    return moment(originalRow.created_at).format('DD-MMM-yy');
                },
            }
        ],
        []
    )

    const Transfercolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.product == 'object' && originalRow.product !== null) {
                        return originalRow.product.value
                    } else {
                        return originalRow.product
                    }
                }
            },
            {
                Header: 'Procedure Type',
                // accessor: 'procedure_type',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.procedure_type == 'object' && originalRow.procedure_type !== null) {
                        return originalRow.procedure_type.value
                    } else {
                        return originalRow.procedure_type
                    }
                }
            },
            {
                Header: 'Transfer Title',
                accessor: 'transfer_title',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
                    return moment(originalRow.created_at).format('DD-MMM-yy');
                },
            }
        ],
        []
    )

    const Rtcolumns = React.useMemo(
        () => [
            {
                Header: 'Product Family',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.product == 'object' && originalRow.product !== null) {
                        return originalRow.product.value
                    } else {
                        return originalRow.product
                    }
                }
            },
            {
                Header: 'Procedure Type',
                // accessor: 'procedure_type',
                accessor: function (originalRow, rowIndex) {

                    if (typeof originalRow.procedure_type == 'object' && originalRow.procedure_type !== null) {
                        return originalRow.procedure_type.value
                    } else {
                        return originalRow.procedure_type
                    }
                }
            },
            {
                Header: 'Termination Title',
                accessor: 'termination_title',
            },
            {
                Header: 'Status',
                accessor: function (originalRow, rowIndex) {
                    if (originalRow.type == 'submit') {
                        return 'Submitted'
                    } else {
                        return 'Saved'
                    }
                }
            },
            {
                Header: 'Date',
                accessor: function (originalRow, rowIndex) {
                    return moment(originalRow.created_at).format('DD-MMM-yy');
                },
            }
        ],
        []
    )

    const Rcdata = React.useMemo(() => props.rc, []);
    const VariationData = React.useMemo(() => props.variation, []);
    const RenewalData = React.useMemo(() => props.renewal, []);
    const BaselineData = React.useMemo(() => props.baseline, []);
    const Clinical = React.useMemo(() => props.clinical, []);
    const Amendment = React.useMemo(() => props.amendment, []);
    const Transfer = React.useMemo(() => props.transfer, []);
    const Rt = React.useMemo(() => props.rt, []);

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [numberForms, setNumberForms] = useState();
    const [value, setValue] = React.useState("01/01/2022");
    const [tovalue, setTovalue] = React.useState("02/15/2022");
    const [formType, setFormType] = React.useState("All");
    const [view, setView] = useState(localStorage.getItem('view') ? localStorage.getItem('view') : 'table');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChange = (event) => {
        setFormType(event.target.value);
    }

    React.useEffect(() => {
        axios.post('/formsByDate', { 'from': value, 'to': tovalue, 'formType': formType }).then(res => {
            setNumberForms(res.data)
        });
    }, [value, tovalue, formType])

    let fchdata = [
        {
            type: 'NP',
            number: props.cntN
        },
        {
            type: 'CP',
            number: props.cntC
        },
        {
            type: 'DCP',
            number: props.cntD
        },
        {
            type: 'MRP',
            number: props.cntM
        }
    ]

    let arr = [
        { form: 'MA Registration Creation', number: props.macount },
        { form: 'Variation', number: props.varcount },
        { form: 'Renewal', number: props.rencount },
        { form: 'Transfer', number: props.trancount },
        { form: 'Baseline', number: props.basecount },
        { form: 'Registration Termination', number: props.rtcount },
        { form: 'Clinical Registration Creation', number: props.clinicalcount },
        { form: 'Amendment', number: props.amencount },
        { form: 'Clinical Registration Termination', number: props.crtcount },
    ];



    React.useEffect(() => {
        flash.message ? setOpen(true) : setOpen(false)
    }, []);

    const handleviewchenge = (e) => {
        if (e.target.checked) {
            localStorage.setItem('view', 'kpi');
            setView('kpi');
        } else {
            localStorage.setItem('view', 'table');
            setView('table');
        }
    }

    return (
        <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {props.flash.message}
                </Alert>
            </Snackbar>

            <Head title="Dashboard" />
            <div className="row">
                <div className="col-md-6">
                    <h3 className="page-title">Dashboard</h3>
                </div>
                <div className='col-6'>

                    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'end', marginBottom: '10px' }}>

                        <FormGroup>
                            <StyledFormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} onClick={(e) => handleviewchenge(e)} checked={view == 'kpi' ? true : false} />} label={<h3 className='page-title' style={{ margin: '0', fontSize: '16px', fontWeight: '400' }}>switch view</h3>} />
                        </FormGroup>
                        {/* <div>
                            <Tp title="Tables view">
                                <IconButton onClick={() => localStorage.setItem('view', 'table') & setView('table')} size='small' aria-label="delete" color="success">
                                    <TableViewIcon />
                                </IconButton>
                            </Tp>
                            <span style={{ fontSize: '20px' }}>/</span>
                            <Tp title="KPI view">
                                <IconButton onClick={() => localStorage.setItem('view', 'kpi') & setView('kpi')} size='small' aria-label="delete" color="secondary">
                                    <EqualizerIcon />
                                </IconButton>
                            </Tp>
                        </div>*/}
                    </div>


                </div>
            </div>

            <div style={{ display: view === 'table' ? '' : 'none' }}>
                <div className="row">
                    <div className="col-12" >
                        <div className="card main-card">
                            <div className="card-body dash-table">
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: Rcdata.length > 0 ? 'left' : '' }}>MA Registration Creation</h5>
                                    {Rcdata.length > 0 ?
                                        <Table columns={Rccolumns} data={Rcdata} for="ma" />
                                        :
                                        <div className='row' >
                                            <div className='col-12'>
                                                <p>No submitted/saved eForm to display</p>
                                            </div>

                                        </div>}
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: VariationData.length > 0 ? 'left' : '' }}>Variation</h5>
                                    {VariationData.length > 0 ?
                                        <Table columns={Variationcolumns} data={VariationData} for="variation" />
                                        :
                                        <div className='row' >
                                            <div className='col-12'>
                                                <p>No submitted/saved eForm to display</p>
                                            </div>

                                        </div>}
                                </div>

                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: RenewalData.length > 0 ? 'left' : '' }}>Renewal</h5>
                                    {RenewalData.length > 0 ?
                                        <Table columns={Renewalcolumns} data={RenewalData} for="renewal" />
                                        :
                                        <div className='row' >
                                            <div className='col-12'>
                                                <p>No submitted/saved eForm to display</p>
                                            </div>

                                        </div>}
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: BaselineData.length > 0 ? 'left' : '' }}>Baseline</h5>
                                    {BaselineData.length > 0 ?
                                        <Table columns={Baselinecolumns} data={BaselineData} for="baseline" />
                                        :
                                        <div className='row' >
                                            <div className='col-12'>
                                                <p>No submitted/saved eForm to display</p>
                                            </div>

                                        </div>}
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: Clinical.length > 0 ? 'left' : '' }}>Clinical Registration Creation</h5>
                                    {Clinical.length > 0 ?
                                        <Table columns={Clinicalrtcolumns} data={Clinical} for="crc" />
                                        :
                                        <div className='row' >
                                            <div className='col-12'>
                                                <p>No submitted/saved eForm to display</p>
                                            </div>

                                        </div>}
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: Amendment.length > 0 ? 'left' : '' }}>Amendment</h5>
                                    {Amendment.length > 0 ?
                                        <Table columns={Amendmentcolumns} data={Amendment} for="amendment" />
                                        :
                                        <div className='row' >
                                            <div className='col-12'>
                                                <p>No submitted/saved eForm to display</p>
                                            </div>

                                        </div>}
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: Transfer.length > 0 ? 'left' : '' }}>MA Transfer</h5>
                                    {Transfer.length > 0 ?
                                        <Table columns={Transfercolumns} data={Transfer} for="transfer" />
                                        :
                                        <div className='row' >
                                            <div className='col-12'>
                                                <p>No submitted/saved eForm to display</p>
                                            </div>

                                        </div>}
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: Rt.length > 0 ? 'left' : '' }}>Registration Termination</h5>
                                    {Rt.length > 0 ?
                                        <Table columns={Rtcolumns} data={Rt} for="rt" />
                                        :
                                        <div className='row' >
                                            <div className='col-12'>
                                                <p>No submitted/saved eForm to display</p>
                                            </div>

                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div style={{ display: view === 'kpi' ? '' : 'none' }}>

                <Grid container spacing={5}>
                    <Grid item xs={3}>
                        <div className='dashboard_rec' style={{ backgroundColor: '#77DD77' }}>
                            <Typography variant="h6" gutterBottom color={'white'}>
                                {props.totalForms}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                                Forms
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='dashboard_rec' style={{ backgroundColor: 'rgb(76, 179, 230)' }}>
                            <Typography variant="h6" gutterBottom color={'white'}>
                                {props.totalSubmittedForms}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                                Submitted forms
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className='dashboard_rec' style={{ backgroundColor: 'rgb(180, 92, 221)' }}>
                            <Typography variant="h6" gutterBottom color={'white'}>
                                {props.totalSavedForms}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                                Saved forms
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                    <Grid item xs={6}>
                        <Paper className='dashpaper' >
                            <h5 className='mb-1 head-table' style={{ fontSize: '15px' }}>Forms by procedure type </h5>
                            <Chart height={400} data={fchdata} forceFit>
                                <Coord transpose />
                                <Axis name='type' label={{ offset: 12 }} />
                                <Axis name='nombre' />
                                <Tooltip />
                                <Geom type='interval' position='type*number' />
                            </Chart>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Paper className='dashpaper'>
                            <h5 className='mb-1 head-table' style={{ fontSize: '15px' }}>Forms by type</h5>

                            {/* <Chart height={400} data={data} scale={cols} forceFit>
                                <Axis name='form' />
                                <Axis name='number' />
                                <Tooltip />
                                <Geom type='interval' position='form*number' />
                            </Chart> */}
                            <Chart className='mt-3' height={300} data={arr} scale={cols} forceFit>
                                <Coord type="theta" />

                                <Tooltip showTitle={false} />
                                <Legend offsetY={40} />
                                <Geom
                                    type="intervalStack"
                                    position="number"
                                    color={"form"}
                                >
                                    <Label content="form" />
                                </Geom>

                            </Chart>

                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='dashpaper'>
                            <h5 className='mb-1 head-table' style={{ fontSize: '15px' }}></h5>
                            <Chart height={300} data={[{ type: 'MA atuhrorisation', value: props.MAau }, { type: 'Clinical', value: props.MAcli }, { type: 'Device', value: 0 }]} padding={[40, 0]}>
                                <Coord type='theta' startAngle={Math.PI} endAngle={Math.PI * (3 / 2)} />
                                <Tooltip title='value' />
                                <Legend />
                                <Geom type='intervalStack' position='value' color='type'>
                                    <Label content="type" />
                                </Geom>
                            </Chart>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className='dashpaper' >
                            <h5 className='mb-1 head-table' style={{ fontSize: '15px' }}>Forms by year</h5>
                            <Chart height={400} data={[{ year: '2022', value: 0 }, { year: '2023', value: 0 }, { year: '2024', value: 0 }]} scale={cols} forceFit>
                                <Axis name='year' title={{
                                    position: 'end',
                                    offset: 15,
                                    textStyle: {
                                        fontSize: '12',
                                        textAlign: 'center',
                                        fill: '#999',
                                        fontWeight: 'bold',
                                        rotate: 0,
                                        autoRotate: true
                                    }
                                }} />
                                <Axis name="value" title={{
                                    position: 'end',
                                    offset: 15,
                                    textStyle: {
                                        fontSize: '12',
                                        textAlign: 'right',
                                        fill: '#999',
                                        fontWeight: 'bold',
                                        rotate: 0,
                                    }
                                }} />
                                <Tooltip
                                    crosshairs={{
                                        type: "y"
                                    }}
                                />
                                <Geom type="line" position="year*value" size={2}
                                    tooltip={['year*value', (year, value) => {
                                        return {
                                            name: 'value',
                                            value: value,
                                            title: year
                                        }
                                    }]}
                                    color='#6FCB9F'
                                />
                                <Geom
                                    type="point"
                                    position="year*value"
                                    size={4}
                                    shape={"circle"}
                                    style={{
                                        stroke: "#6FCB9F",
                                        lineWidth: 1
                                    }}
                                    color='#6FCB9F'
                                    tooltip={['year*value', (year, value) => {
                                        return {
                                            name: 'value',
                                            value: value,
                                            title: year
                                        }
                                    }]}
                                />
                            </Chart>
                        </Paper>
                    </Grid>
                    {/* <Paper className='dashpaper' >
                            <h5 className='mb-1 head-table' style={{ fontSize: '15px' }}>Forms by procedure type </h5>
                            <ul>
                                <li>
                                    <p>National procedure</p>
                                    <small>{props.cntN}</small>
                                </li>
                                <li>
                                    <p>Centralized procedure</p>
                                    <small>{props.cntC}</small>
                                </li>
                                <li>
                                    <p>Decentralized procedure</p>
                                    <small>{props.cntD}</small>
                                </li>
                                <li>
                                    <p>Mutual recognition procedure</p>
                                    <small>{props.cntM}</small>
                                </li>
                            </ul>
                        </Paper> */}

                </Grid>

                {/* <Paper className='dashpaper mt-4'>
                    <h5 className='mb-1 head-table' style={{ fontSize: '15px' }}>Forms in date</h5>
                    <Chart className='mt-1' height={300} data={demodata} scale={cols} forceFit>
                        <Legend />
                        <Axis name="month" />
                        <Axis name="quantite" />
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Geom
                            type="line"
                            position="month*quantite"
                            size={2}
                            color={"form"}
                            shape={"smooth"}
                        />
                        <Geom
                            type="point"
                            position="month*quantite"
                            size={4}
                            shape={"circle"}
                            color={"form"}
                            style={{
                                stroke: "#fff",
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                </Paper> */}

            </div>

            <footer style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="p" component="p">Powered By <span style={{ color: 'rgb(44, 197,162)', fontWeight: '800' }}>EKEMIA</span> &copy; 2022</Typography>
            </footer>
        </>

    );
}

Dashboard.layout = page => <Authenticated children={page} auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} />

export default Dashboard;