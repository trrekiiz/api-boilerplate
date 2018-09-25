import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
        <form>
          Name <input type="text" name="firstName"/>
          LastName <input type="text" name="lastName"/>
          MobileNumber <input type="text" name="mobileNumber"/>
          Upload <input type="file"/>
          <button type="submit" > submit </button>
        </form>
        </div>
      </div>
    );
  }
}

export default App;
