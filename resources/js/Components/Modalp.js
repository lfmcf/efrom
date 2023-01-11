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
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalP = ({ show, handleClose }) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const handleSubmit = () => {}

    return (
        <div>
            <Dialog fullWidth maxWidth="sm" open={show} onClose={handleClose} TransitionComponent={Transition}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name='name'
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default ModalP;