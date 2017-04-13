import React, { Component } from 'react';
import PackageSearch from './PackageSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Syringe</h1>
        <PackageSearch onSelect={console.log} />
        <div className="results"></div>
        <div className="selected"></div>
      </div>
    );
  }
}

export default App;
