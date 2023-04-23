import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';
import BTable from 'react-bootstrap/Table';
import moment from 'moment';
import FlashMessage from 'react-flash-message';
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
import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis, Tooltip } from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from 'axios';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



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
    const [view, setView] = useState(localStorage.getItem('view') ?  localStorage.getItem('view') : 'table');

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
        axios.post('/formsByDate', {'from' : value, 'to': tovalue, 'formType': formType}).then(res => {
            console.log(res);
            setNumberForms(res.data)
        });
    }, [value, tovalue, formType])


    React.useEffect(() => {
        flash.message ? setOpen(true) : setOpen(false)
        let arr = [
            { form: 'MA Registration Creatio', population: props.macount },
            { form: 'Variation', population: props.varcount },
            { form: 'Renewal', population: props.rencount },
            { form: 'Transfer', population: props.trancount },
            { form: 'Baseline', population: props.basecount },
            { form: 'Registration Termination', population: props.rtcount },
            { form: 'Clinical Registration Creation', population: props.clinicalcount },
            { form: 'Amendments', population: props.amencount },
            { form: 'Clinical Registration Termination', population: props.crtcount },
        ];
        setData(arr)
    }, [view]);

    return (
        <>


            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {props.flash.message}
                </Alert>
            </Snackbar>


            <Head title="Dashboard" />
            <div className="row">
                <div className="col-md-12">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div></div>
                        {/* <h3 className="page-title"><i style={{ paddingBottom: '8px' }} className="fas fa-home"></i> / Dashboard</h3> */}
                        <div>
                            <Tp title="Tables view">
                                <IconButton onClick={() => localStorage.setItem('view', 'table') & setView('table') } size='small' aria-label="delete" color="success">
                                    <TableViewIcon />
                                </IconButton>
                            </Tp>
                            <span style={{ fontSize: '20px' }}>/</span>
                            <Tp title="KPI view">
                                <IconButton onClick={() => localStorage.setItem('view', 'kpi') & setView('kpi')} size='small' aria-label="delete" color="secondary">
                                    <EqualizerIcon />
                                </IconButton>
                            </Tp>
                        </div>
                    </div>

                </div>
            </div>
            <div style={{ display: view === 'table' ? '' : 'none' }}>
                <div className="row">
                    <div className="col-12" >
                        <div className="card main-card">
                            <div className="card-body dash-table">
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: 'left' }}>MA Registration Creation</h5>
                                    <Table columns={Rccolumns} data={Rcdata} for="ma" />
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: 'left' }}>Variation</h5>
                                    <Table columns={Variationcolumns} data={VariationData} for="variation" />
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: 'left' }}>Renewal</h5>
                                    <Table columns={Renewalcolumns} data={RenewalData} for="renewal" />
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: 'left' }}>Baseline</h5>
                                    <Table columns={Baselinecolumns} data={BaselineData} for="baseline" />
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: 'left' }}>Clinical Registration Creation</h5>
                                    <Table columns={Clinicalrtcolumns} data={Clinical} for="crc" />
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: 'left' }}>Amendment</h5>
                                    <Table columns={Amendmentcolumns} data={Amendment} for="amendment" />
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: 'left' }}>MA Transfer</h5>
                                    <Table columns={Transfercolumns} data={Transfer} for="transfer" />
                                </div>
                                <div className='dash-table-wrap'>
                                    <h5 className="mb-3 head-table" style={{ float: 'left' }}>Registration Termination</h5>
                                    <Table columns={Rtcolumns} data={Rt} for="rt" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div style={{ display: view === 'kpi' ? '' : 'none' }}>

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper elevation={0}>
                            <h5 className='mb-3 head-table' style={{ fontSize: '15px' }}>Number of Forms by procedure type </h5>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper elevation={0} variant="outlined" className='dashpaper' style={{ background: '#2196f3' }}>
                                        <p>National</p>
                                        <p>{props.cntN}</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper elevation={0} variant="outlined" className='dashpaper' style={{ background: '#66bb6a' }}>
                                        <p>Centralized</p>
                                        <p>{props.cntC}</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper elevation={0} variant="outlined" className='dashpaper' style={{ background: '#ffc107' }}>
                                        <p>Decentralized</p>
                                        <p>{props.cntD}</p>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper elevation={0} variant="outlined" className='dashpaper' style={{ background: '#607d8b' }}>
                                        <p>Mutual Recognition</p>
                                        <p>{props.cntM}</p>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <h5 className='mb-3 head-table' style={{ fontSize: '15px' }}>Number of Forms by type of forms</h5>
                        <Paper elevation={0} variant="outlined" style={{ margin: '10px 0' }}>
                            <Chart
                                data={data}
                            >
                                <ArgumentAxis />
                                <ValueAxis />

                                <BarSeries
                                    valueField="population"
                                    argumentField="form"
                                />
    
                                <EventTracker />
                                <Tooltip />
                            </Chart>
                        </Paper>
                    </Grid>
                </Grid>
                <h5 className='mb-4 mt-4 head-table' style={{ fontSize: '15px' }}>Number of Forms In Date</h5>
                <Paper elevation={0} variant="outlined" style={{ margin: '10px 0', padding: '20px 0' }}>
                    <Grid container spacing={2} style={{ alignItems: 'center' }}>
                        <Grid item xs={3}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                {/* <label>From </label> */}
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="From"
                                        value={value}
                                        onChange={(newValue) => {
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                {/* <label>To </label> */}
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="To"
                                        value={tovalue}
                                        onChange={(newtoValue) => {
                                            setTovalue(newtoValue);
                                        }}
                                        renderInput={(params) => <TextField size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl sx={{minWidth: 200 }} size='small'>
                                <InputLabel id="demo-simple-select-helper-label">Form</InputLabel>
                                <Select label="Form" onChange={handleChange} value={formType}>
                                    <MenuItem value="All">All</MenuItem>
                                    <MenuItem value="Medicinal product">Medicinal product</MenuItem>
                                    <MenuItem value="Variation">Variation</MenuItem>
                                    <MenuItem value="Renewal">Renewal</MenuItem>
                                    <MenuItem value="Transfer">Transfer</MenuItem>
                                    <MenuItem value="Baseline">Baseline</MenuItem>
                                    <MenuItem value="Registration Termination">Registration Termination</MenuItem>
                                    <MenuItem value="Clinical Registration Creation">Clinical Registration Creation</MenuItem>
                                    <MenuItem value="Amendment">Amendment</MenuItem>
                                    <MenuItem value="Clinical Registration Termination">Clinical Registration Termination</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={3}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <label style={{ fontSize: '17px', color: '#2e7d32', marginRight: '6px', fontWeight: '600' }}>{numberForms}</label>
                                <label style={{ fontSize: '17px', color: '#2e7d32', fontWeight: '600' }}>Forms</label>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </div>

            <footer style={{ margin: '5px 0', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="p" component="p">Powered By <span style={{ color: 'rgb(44, 197,162)', fontWeight: '800' }}>Ekemia</span> &copy; 2022</Typography>
            </footer>
        </>

    );
}

Dashboard.layout = page => <Authenticated children={page} auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} />

export default Dashboard;