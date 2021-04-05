    /*global chrome*/
import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edited <code>src/App.js</code> and saved to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleClick}>Test</button>
        <ul>
          {recents.map((link) => (
            <li>{link}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
