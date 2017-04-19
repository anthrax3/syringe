import React, { Component } from 'react';
import PackageSearch from './PackageSearch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: []
    };
  }

  addPackage = pkg => {
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
          {this.state.packages.map(pkg => (
            <div key={pkg}>
              <span onClick={this.removePackage.bind(null, pkg)}>✕</span>
              {pkg}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
