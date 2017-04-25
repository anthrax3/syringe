import React, { Component } from 'react';
import PackageSearch from './PackageSearch';
import Package from './Package';
import inject from '../lib/inject';
import getInjectedPackages from '../lib/getInjectedPackages';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: []
    };
  }

  componentDidMount() {
    getInjectedPackages().then(packages => {
      packages && this.setState({
        packages
      });
    });
  }

  addPackage = pkg => {
    if(pkg === '' || this.state.packages.includes(pkg)) {
      return;
    }
    const packages = [...this.state.packages, pkg];
    inject(packages);
    this.setState({
      packages
    });
  };

  removePackage = pkg => {
    const packages = this.state.packages.filter(p => p !== pkg);
    inject(packages);
    this.setState({
      packages
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
