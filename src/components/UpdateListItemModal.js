import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@material-ui/core'
import db from '../firebase'

function UpdateListItemModal({list, show, setShow}) {

    const [input, setInput] = useState(list.title)

    const updateList = (event) => {

        event.preventDefault();
        db.collection('lists').doc(list.id).set({
            title: input
        }, { merge: true })

        setInput(input);
        setShow(false);
    }

    const handleClose = () => {
        setInput(list.title);
        setShow(false);
    }


    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
            <form onSubmit={updateList}>
                <DialogTitle id="form-dialog-title">Update List</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={input}
                        label="List"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        onChange={(event) => setInput(event.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateList} color="primary" type="submit">
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default UpdateListItemModal;