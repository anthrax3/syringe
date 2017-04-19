import React, { Component } from 'react';
import PackageSearch from './PackageSearch';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: []
    };
  }

  handlePackageSelect = pkg => {
    this.setState({
      packages: [...this.state.packages, pkg]
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Syringe</h1>
        <PackageSearch onSubmit={this.handlePackageSelect} />
        <div className="selected"></div>
      </div>
    );
  }
}

export default App;
