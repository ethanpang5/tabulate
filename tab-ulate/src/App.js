    /*global chrome*/
import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { NavbarComponent } from "./components/NavbarComponent";

function App() {
  console.log('new');
  const [recents, setRecents] = useState([]);
  useEffect(() => {
    chrome.history.search({text: '', maxResults: 10}, function(data) {
      data.forEach(function(page) {
          console.log(page.url);
          setRecents(old => [...old, page.url]);
          console.log(recents);
      });
    });
  }, [])

  const handleClick = () => {
    console.log('clicked')
    //to create multiple, have this in for loop with array of urls
    chrome.tabs.create({
      url: "https://nba.com",
    });
    chrome.tabs.create({
      url: "https://cs61a.org",
    });
  }

  return (
    <>
      <NavbarComponent/>
      <button onClick={handleClick}>Test</button>
        <ul>
          {recents.map((link) => (
            <li>{link}</li>
          ))}
        </ul>
    </>
  );
}

export default App;
