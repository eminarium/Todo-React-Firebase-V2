import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import {
    TextField,
    Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import db from '../../firebase'
import firebase from 'firebase'
import TodoListItem from '../TodoListItem'


function Sidebar(props) {

    const location = useLocation();
    const activeListId = location.pathname.split('/').reverse()[0];

    const [lists, setLists] = useState(null)
    const [input, setInput] = useState('');

    useEffect(() => {
        db.collection('lists').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setLists(snapshot.docs.map(doc =>
                ({
                    id: doc.id,
                    title: doc.data().title
                })
            ))
        });
    }, [])

    const addList = (event) => {
        // Prevent default behaviour of a form (Prevent page refresh)
        event.preventDefault();

        // Add current value of input as a new todo
        db.collection('lists').add({
            title: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        // Clear up input field after submit
        setInput('');
    }

    return (
        <div className={classNames("sidebar", { "is-open": props.isOpen })}>
            <div className="sidebar-header">
                <Button
                    variant="link"
                    onClick={props.toggle}
                    style={{ color: "#fff" }}
                    className="mt-4"
                >
                    <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
                </Button>
                <h3>TODO LISTS</h3>
            </div>

            <Nav className="flex-column pt-2">

                <form onSubmit={addList}>
                    <TextField
                        value={input}
                        placeholder="Start new list"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        fullWidth
                        onChange={(event) => setInput(event.target.value)}
                        style={{ backgroundColor: 'whitesmoke', marginRight: 5, borderRadius: 5 }}
                    />
                </form>

                {
                    // List only not yet completed tasks
                    lists && lists.map(list => {
                        return <TodoListItem key={list.id} list={list} isActive={list.id === activeListId} />

                    })
                }
                <Divider />
            </Nav>
        </div>
    );
}

export default Sidebar;