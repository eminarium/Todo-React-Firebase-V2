import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav, Badge } from "react-bootstrap";
import { Link } from 'react-router-dom'

class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showModal: false
        }
    }

    render() {
        return (
            <>
            <Navbar
                bg="light"
                className="navbar shadow-sm p-3 mb-5 bg-white rounded"
                expand
            >
                <Button variant="outline-info" onClick={this.props.toggle}>
                    <FontAwesomeIcon icon={faAlignLeft} />
                </Button>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto" navbar>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            </>
        );
    }
}

export default Header