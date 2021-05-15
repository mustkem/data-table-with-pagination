import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { appStore } from "./AppStore/store";
import { Provider } from "react-redux";
import Home from "./Components/Home";
import styles from "./Components/table.module.css";


function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <Router>
          <h3 className={`${styles.container} ${styles.heading}`}>Data Table</h3>
          <div className="content">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/user/:id"
                component={() => <div className="container">User Page</div>}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
