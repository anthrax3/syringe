import React, { Component } from 'react';
import PackageSearch from './PackageSearch';
import Package from './Package';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: []
    };
  }

  addPackage = pkg => {
    if(pkg === '' || this.state.packages.includes(pkg)) {
      return;
    }
    this.setState({
      packages: [...this.state.packages, pkg]
    });
  };

  removePackage = pkg => {
    this.setState({
      packages: this.state.packages.filter(p => p !== pkg)
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Syringe</h1>
        <PackageSearch onSubmit={this.addPackage} />
        <div className="selected">
          {this.state.packages.map(pkg =>
            <Package key={pkg} pkg={pkg} onCrossClick={this.removePackage} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
