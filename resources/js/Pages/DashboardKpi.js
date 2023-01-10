import React, { useEffect, useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
//import { Head } from '@inertiajs/inertia-react';
import Select from 'react-select';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';
import {Chart,BarSeries,Title,ArgumentAxis,ValueAxis,Tooltip} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';

const DashboardKpi = (props) => {

    const [data, setData] = useState([]);

    useEffect( () => {
    
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
    }, []);

    return (
        <>
        
            <Paper elevation={0} variant="outlined" style={{ marginTop: '15px', padding: '10px' }}>
                <Typography variant='h6' style={{ marginBottom: '10px', fontSize: '25px' }}>Number of Forms by procedure type </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper elevation={0} variant="outlined" className='dashpaper'>
                            <p>National</p>
                            <p>{props.cntN}</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={0} variant="outlined" className='dashpaper'>
                            <p>Centralized</p>
                            <p>{props.cntC}</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={0} variant="outlined" className='dashpaper'>
                            <p>Decentralized</p>
                            <p>{props.cntD}</p>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={0} variant="outlined" className='dashpaper'>
                            <p>Mutual Recognition</p>
                            <p>{props.cntM}</p>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={0} variant="outlined" style={{ margin: '10px 0'}}>
                <Chart
                    data={data}
                >
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries
                        valueField="population"
                        argumentField="form"
                    />
                    <Title
                        text="Number of Forms by type of forms"
                    />
                    <EventTracker />
                    <Tooltip />
                </Chart>
            </Paper>

        </>
    )
}

DashboardKpi.layout = page => <Authenticated children={page} auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} />

export default DashboardKpi;