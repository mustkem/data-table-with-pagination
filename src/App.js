import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import logo from './logo.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { appStore } from './AppStore/store';
import { Provider } from 'react-redux';
import TableView from './Components/TableView';

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <Router>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Data Table
          </p>
          </header>
          <div className="content">
            <Switch>
              <Route path="/" exact component={TableView} />
              <Route path="/user/:id" component={() => (<div className="container">
                User Page
                <div>
                  Mock url for user is not working.
                  https://demo9197058.mockable.io/users/1

                </div>
                <div>
                  I will implement this page once it will start working. Leveing it for now.
                </div>
                </div>)} />
            </Switch>

          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
