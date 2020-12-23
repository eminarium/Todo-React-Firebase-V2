import React from 'react'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history'

import {
  Router,
  Route
} from "react-router-dom";

import "./application.css";
import Sidebar from './components/layout/Sidebar'
import Content from './components/layout/Content'

export const history = createBrowserHistory()

class App extends React.Component {
  constructor(props) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true
    };

    this.previousWidth = -1;
  }

  updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile
      });
    }

    this.previousWidth = width;
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this));
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (

      <Router history={history}>
        <Route path="/"
          render={() => (
            <div className="App">
              <Sidebar toggle={this.toggle} isOpen={this.state.isOpen} />
              <Content toggle={this.toggle} isOpen={this.state.isOpen} />
            </div>
          )
          }
        />
      </Router>
    )
  }
}

export default App;