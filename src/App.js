import profile from './profile.png';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    if (theme) {
      document.body.style.backgoundColor = "#FFFFFF";
    } else {
      document.body.style.backgoundColor = "#000000";
    }
  }, [theme]);

console.log(theme)
  return (
    <div className="App" background-color='#EBEBEB'>
      <header className={theme ? "App-header-dark" : "App-header-light"}>
        <img src={profile} className="App-logo" alt="logo" />
        <p>
          An amazing site
        </p>
        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Don't click here
        </a>
        <button onClick={() => setTheme((theme) => !theme)} >{theme ? 'Light' : 'Dark' } Mode</button>
      </header>
    </div>
  );
}

export default App;
