import React from 'react'
import { withRouter } from "react-router-dom";
import {
    Switch,
    Route
} from "react-router-dom";

import TodoList from '../TodoList'
import Header from './Header'
import Welcome from '../Welcome'
import classNames from "classnames";
import { Container } from "react-bootstrap";

function Content (props) {
    return (
        <>
            <Container
                fluid
                className={classNames("content", { "is-open": props.isOpen })}
            >
                <Header toggle={props.toggle} />

                <Switch>
                    <Route exact path="/lists/:listId" component={TodoList} />
                    <Route path="/" component={Welcome} />
                </Switch>

            </Container>
        </>
    );
}

export default Content;