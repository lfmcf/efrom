import React from "react";
import { useForm } from '@inertiajs/inertia-react';
import Authenticated from "@/Layouts/Authenticated";
import { Head } from '@inertiajs/inertia-react';
import { Button } from "@mui/material";

const Create = (props) => {
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        nom: '',
        email: '',
        message: '',
    })

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('storecontact'))
    }

    return (
        <>
            <Head title="Contact" />
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Contact</h3>
                </div>
            </div>
            <div className="row">
                {/* <div className="col-md-4">
                    <h4 style={{ textAlign: 'center' }}>Contact us</h4>
                </div> */}
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="contact_form">
                            <div className="form_group_inline" >
                                <span className="form_group_label">Name</span>
                                <div className="form_group_field">
                                    <input type="text" name="nom" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form_group_inline">
                                <span className="form_group_label">Email</span>
                                <div className="form_group_field">
                                    <input type="text" name="email" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form_group_inline">
                                <span className="form_group_label">File</span>
                                <div className="form_group_field">
                                    <input type="file" name="file" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form_group_inline">
                                <span className="form_group_label">Message</span>
                                <div className="form_group_field" style={{ padding: '5px 20px 0 0' }}>
                                    <textarea name="message" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" style={{ marginTop: '10px' }} variant="outlined">Submit</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Create;

Create.layout = page => <Authenticated children={page} auth={page.props.auth} />