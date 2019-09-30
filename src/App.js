import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import logo from './logo.svg';
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
              <Route path="/user/:id" component={() => (<div>user</div>)} />
            </Switch>

          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
