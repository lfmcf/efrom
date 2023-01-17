
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

const ModalS = ({ show, handleClose }) => {

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

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value)
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        console.log(e)
        e.preventDefault();
        post(route('addcompany'));
        handleClose();
    };

    return (
        <div>

            <Dialog open={show} onClose={handleClose} TransitionComponent={Transition}>
                <form onSubmit={submit}>
                    <DialogTitle>Add New Organization</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {/* To subscribe to this website, please enter your email address here. We
                        will send updates occasionally. */}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name='name'
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            name='adressone'
                            margin="dense"
                            label="Adress (Line 1)"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            name='adresstwo'
                            margin="dense"
                            label="Adress (Line 2)"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            name='postalcode'
                            margin="dense"
                            label="Postal Code"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            name='city'
                            margin="dense"
                            label="City"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            name='countryname'
                            margin="dense"
                            label="Country Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            name='boxnumber'
                            margin="dense"
                            label="PO Box Number"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
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
};

export default ModalS;