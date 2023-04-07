import { useForm } from '@inertiajs/inertia-react';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const SaveModal = ({show, handleClose, handleSubmited, name}) => {
    return(
        // <Modal show={show}>
        //     <Modal.Body>
        //         {name == 'submit' ? <Typography>Confirmez-vous la soumission du formulaire</Typography> : 
        //         <Typography>Confirmez-vous la sauvegarde du formulaire</Typography>}
                
        //     </Modal.Body>
        //     <Modal.Footer style={{justifyContent: 'space-between'}}>
        //         <Button variant='outlined' color="error" size='small' onClick={handleClose}>
        //             Close
        //         </Button>
        //         <Button variant='outlined' color="success" size='small' name={name} onClick={handleSubmited}>
        //             Save Changes
        //         </Button>
        //     </Modal.Footer>
        // </Modal>
        <div>
            
            <Dialog
                open={show}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {name == 'submit' ? 'Do you want to Submit your eForm?' : 'Do you want to Save your eForm?'}
                    
                </DialogTitle>
                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button name={name} onClick={handleSubmited}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SaveModal;