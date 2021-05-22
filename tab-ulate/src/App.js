    /*global chrome*/
import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import { NavbarComponent } from "./components/NavbarComponent";
import { signIn, getWidgets as getWidgetsFirebase } from "./scripts/login.js";
import Dashboard from "./components/Dashboard";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <NavbarComponent/>
          <Dashboard/>
          {/* <Switch>
              <Route path="/analytics">
                <h1>Analytics</h1>
              </Route>
              <Route path="/settings">
                <h1>Settings</h1>
              </Route>
              <Route path="/">
                <Dashboard/>
              </Route>
            </Switch> */}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
