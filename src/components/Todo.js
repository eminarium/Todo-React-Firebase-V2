import React, { useState} from 'react'
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton
} from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import db from '../firebase'
import UpdateTodoModal from './UpdateTodoModal'

function Todo({todo, listId}) {

    const [show, setShow] = useState(false)

    const toggleTodo = (todo) => {
        db.collection('lists').doc(listId).collection('todos').doc(todo.id).set({
            complete: !todo.complete
        }, { merge: true })
    }

    return (
        <>
            <div style={todoStyles}>
                <ListItem button>
                    <ListItemIcon>
                        <Icon onClick={() => toggleTodo(todo)}>
                            {
                                todo.complete ?
                                'check_box'
                                :
                                'check_box_outline_blank'
                            }
                        </Icon>
                    </ListItemIcon>
                    
                    {
                        todo.complete?
                        <ListItemText
                            primary={todo.task}
                            style={{
                                textDecoration: 'line-through'
                            }}
                        />
                        :
                        <ListItemText primary={todo.task} />
                    }

                    <IconButton 
                        aria-label="edit"
                        variant="contained"
                        style={{color: 'orange'}}
                        onClick={() => setShow(true)}
                    >
                        <Icon> edit </Icon>
                    </IconButton>

                    <IconButton
                        aria-label="edit"
                        variant="contained"
                        style={{ color: 'red' }}
                        onClick={() => db.collection('lists').doc(listId).collection('todos').doc(todo.id).delete()}
                    >
                        <Icon> delete_forever </Icon>
                    </IconButton>

                </ListItem>
                <UpdateTodoModal todo={todo} listId={listId} show={show} setShow={setShow} />
            </div>
            <br />
        </>
    )
}

export default Todo;

const todoStyles = {
    backgroundColor: 'whitesmoke',
    borderRadius: 5
}