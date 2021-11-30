import React, { useState } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';

const Dashboard = (props) => {
    
    return (
        // <Authenticated
        //     auth={props.auth}
        //     errors={props.errors}
        //     header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        // >
        <>
            <Head title="Dashboard" />
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Online Marketing Dashboard</h3>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12" style={{height:"300px"}}>
                    <div className="card main-card">
                        <div className="card-body">
                            <h5>Variations Table</h5>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-6 col-xl-3"></div>
                <div className="col-12 col-md-12 col-lg-6 col-xl-3"></div>
                <div className="col-12 col-md-12 col-lg-6 col-xl-3"></div>
            </div>

        </>
        // </Authenticated>
    );
}

Dashboard.layout = page =>  <Authenticated children={page} auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} />

export default Dashboard;