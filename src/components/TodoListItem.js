import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    IconButton,
    Menu,
    MenuItem,
} from '@material-ui/core'

import Icon from '@material-ui/core/Icon';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Nav } from "react-bootstrap";
import { history } from '../App'
import db from '../firebase'
import UpdateListItemModal from './UpdateListItemModal'

function TodoListItem({ list, isActive }) {

    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Nav.Item
            key={list.id}
            className={(isActive) ? "active" : ""}
        >
            <Nav.Link
                as={Link}
                to={"/lists/" + list.id}
            >
                <FontAwesomeIcon icon={faList} className="mr-2" />
                {list.title}

                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    style={{ color: 'white', float: 'right' }}
                    onClick={handleClick}
                >
                    <Icon fontSize="small"> more_vert </Icon>
                </IconButton>
            </Nav.Link>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        setShow(true);
                        handleClose();
                    }}
                >
                    <Icon
                        fontSize="small"
                        style={{ color: 'orange' }}
                    >
                        edit
                        </Icon> &nbsp;
                        Edit
                    </MenuItem>
                <MenuItem
                    onClick={() => {
                        if (window.confirm("Really delete?")) {
                            var doc_ref = db.collection('lists').doc(list.id)

                            var collection_ref = doc_ref.collection('todos').orderBy('timestamp')
                            collection_ref.get().then((querySnapshot) => {
                                querySnapshot.forEach((doc) => doc.ref.delete())
                            })

                            doc_ref.delete()
                                .then(() => history.push('/'))
                        }
                        handleClose();
                    }}

                >
                    <Icon
                        fontSize="small"
                        style={{ color: 'red' }}
                    >
                        delete_forever
                        </Icon> &nbsp;
                        Delete
                    </MenuItem>
            </Menu>

            <UpdateListItemModal list={list} show={show} setShow={setShow} />
        </Nav.Item>
    )
}

export default TodoListItem;