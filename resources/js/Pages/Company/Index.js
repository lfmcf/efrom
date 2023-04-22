import Authenticated from '@/Layouts/Authenticated';
import React, {useState} from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Index = (props) => {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        adressone: '',
        adresstwo: '',
        city: '',
        postalcode: '',
        countryname: '',
        // organizationrole: '',
        boxnumber: '',
        status: 1,
    
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('addcompany'));
        handleClose();
    };

    return(
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">MA - Company Registration</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                     <div className="card main-card">
                         <div className="card-body">
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form_group">
                                    <span className="form_group_label">Company Name</span>
                                    <div className="form_group_field">
                                        <input type="text" name="name" onChange={onHandleChange} />
                                    </div>
                                </div>
                                <div className="form_group">
                                    <span className="form_group_label">Adress (Line 1)</span>
                                    <div className="form_group_field">
                                        <input type="text" name="adressone" onChange={onHandleChange} />
                                    </div>
                                </div>
                                <div className="form_group">
                                    <span className="form_group_label">Adress (Line 2)</span>
                                    <div className="form_group_field">
                                        <input type="text" name="adresstwo" onChange={onHandleChange} />
                                    </div>
                                </div>
                                <div className="form_group">
                                    <span className="form_group_label">City</span>
                                    <div className="form_group_field">
                                        <input type="text" name="city" onChange={onHandleChange} />
                                    </div>
                                </div>
                                <div className="form_group">
                                    <span className="form_group_label">Postal Code</span>
                                    <div className="form_group_field">
                                        <input type="text" name="postalcode" onChange={onHandleChange} />
                                    </div>
                                </div>
                                <div className="form_group">
                                    <span className="form_group_label">Country Name</span>
                                    <div className="form_group_field">
                                        <input type="text" name="countryname" onChange={onHandleChange} />
                                    </div>
                                </div>
                                <div className="form_group">
                                    <span className="form_group_label">PO Box Number</span>
                                    <div className="form_group_field">
                                        <input type="text" name="boxnumber" onChange={onHandleChange} />
                                    </div>
                                </div>
                                <div className="form-button">
                                    <button type="submit" className="btn btn-primary" disabled={processing}>Submit</button>
                                </div>
                            </form>
                         </div>
                     </div>
                </div>
            </div>
        </>
    )
}

export default Index;

Index.layout = page => <Authenticated children={page} auth={page.props.auth} />