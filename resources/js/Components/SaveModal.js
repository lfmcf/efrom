import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SaveModal = ({show, handleClose, handleSubmited, name}) => {
    return(
        <Modal show={show}>
            <Modal.Body>
                {name == 'submit' ? <p>Confirmez-vous la soumission du formulaire</p> : 
                <p>Confirmez-vous la sauvegarde du formulaire</p>}
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="btn btn-danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="btn_submit btn btn-success" name={name} onClick={handleSubmited}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SaveModal;