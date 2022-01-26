import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';


const ModalS = ({ show, handleClose}) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        adress: '',
        city: '',
        postalcode: '',
        countryname: '',
        organizationrole: '',
        status: 1,
    
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('addcompany'));
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Company</Modal.Title>
            </Modal.Header>
            <form className="form" onSubmit={submit}>
            <Modal.Body>
                
                    <div className="form_group">
                        <span className="form_group_label">Company Name</span>
                        <div className="form_group_field">
                            <input type="text" name="name" onChange={onHandleChange} />
                        </div>
                    </div>
                    <div className="form_group">
                        <span className="form_group_label">Adresse</span>
                        <div className="form_group_field">
                            <input type="text" name="adress" onChange={onHandleChange} />
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="btn_submit btn btn-success" type="submit">
                    Save Changes
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
    )
};

export default ModalS;