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
  console.log('new');
  // const [recents, setRecents] = useState([]);
  // useEffect(() => {
  //   chrome.history.search({text: '', maxResults: 10}, function(data) {
  //     data.forEach(function(page) {
  //         console.log(page.url);
  //         setRecents(old => [...old, page.url]);
  //         console.log(recents);
  //     });
  //   });
  // }, [])

  // const handleClick = () => {
  //   console.log('clicked')
  //   //to create multiple, have this in for loop with array of urls
  //   chrome.tabs.create({
  //     url: "https://nba.com",
  //   });
  //   chrome.tabs.create({
  //     url: "https://cs61a.org",
  //   });
  // }
  const [widgets, getWidgets] = useState([])

  async function load() {
    console.log("start loading");
    signIn().then(() => {
      getWidgets(getWidgetsFirebase());
      console.log("loaded");
      console.log(widgets);
    }).catch(function (error) {
      console.error("Error loading widgets", error);
    });
    
  }

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
