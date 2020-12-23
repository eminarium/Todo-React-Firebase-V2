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

function UpdateTodoModal({todo, listId, show, setShow}) {

    const [input, setInput] = useState(todo.task)

    const updateTodo = (event) => {

        event.preventDefault();
        db.collection('lists').doc(listId).collection('todos').doc(todo.id).set({
            task: input
        }, { merge: true })

        setInput(input);
        setShow(false);
    }

    const handleClose = () => {
        setInput(todo.task);
        setShow(false);
    }


    return (
        <Dialog open={show} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
            <form onSubmit={updateTodo}>
                <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={input}
                        label="Todo"
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
                    <Button onClick={updateTodo} color="primary" type="submit">
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default UpdateTodoModal;