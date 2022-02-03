import Authenticated from "@/Layouts/Authenticated";
import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Hqproject from "@/Layouts/Hqproject";
import Nohqproject from "@/Layouts/Nohqproject";

const Variation = ({countries, auth}) => {

    const [isHq, setHq] = useState(false)
    const handlehqChange = (e) => {
        setHq(e.target.checked)
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Variation</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card main-card">
                        <div className="card-body">
                            {/* <div className="card_title">
                                <h5>First Submission</h5>
                                <h5 className="subhead">All fields markedd with * are required</h5>
                            </div> */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                                <div>
                                    <input className="form-check-input" type="checkbox" value="checked" id="flexCheckDefault" onChange={handlehqChange} />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        HQ project
                                    </label>
                                </div>
                            </div>
                            {isHq ? <Hqproject countries={countries} user={auth.user} handlehqChange={handlehqChange} /> : <Nohqproject countries={countries} user={auth.user} handlehqChange={handlehqChange} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Variation;

Variation.layout = page => <Authenticated children={page} auth={page.props.auth} />