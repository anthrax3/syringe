import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Syringe</h1>
        <input type="search" className="search" />
        <div className="results"></div>
        <div className="selected"></div>
      </div>
    );
  }
}

export default App;
