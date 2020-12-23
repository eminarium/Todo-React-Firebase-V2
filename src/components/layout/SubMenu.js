import React from "react";
import { Accordion, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faHome } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

class SubMenu extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        const { icon, title, items } = this.props;

        return (
            <Nav.Item className={classNames({ open: !this.state.collapsed })}>
                <Accordion>
                    <Accordion.Toggle
                        as={Nav.Link}
                        variant="link"
                        eventKey="0"
                        onClick={this.toggleNavbar}
                    >
                        <FontAwesomeIcon icon={icon} className="mr-2" />
                        {title}
                        <FontAwesomeIcon
                            icon={this.state.collapsed ? faCaretDown : faCaretUp}
                            className="float-right"
                        />
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <nav className="nav flex-column">
                            {items.map(item => (
                                <Nav.Link as={Link} to={item.src}
                                    className={`nav-link nav-item pl-5 ${
                                        item.title === "Active" ? "active" : ""
                                        } `}
                                    key={item.title}
                                >
                                    <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                    {item.title}
                                </Nav.Link>
                            ))}
                        </nav>
                    </Accordion.Collapse>
                </Accordion>
            </Nav.Item>
        );
    }
}

export default SubMenu;