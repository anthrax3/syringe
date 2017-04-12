import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';

class PackageSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      packages: [],
      loading: false
    };
  }

  selectHandler = value => {
    this.setState({ value, packages: [] });
    if(typeof this.props.onSelect === 'function') {
      this.props.onSelect(value);
    }
  }

  keyPressHandler = e => {
    if(e.key === 'Enter') {
      this.selectHandler(this.state.value);
    }
  }

  changeHandler = (e, value) => {
    this.setState({ value, loading: true })
    fetch(`https://ac.cnstrc.com/autocomplete/${value}?autocomplete_key=CD06z4gVeqSXRiDL2ZNK`)
      .then(res => res.json())
      .then(res => {
        const packages = res.sections.packages;
        if(packages.length > 0) {
          this.setState({ packages, loading: false });
        }
      })
      .catch(err => this.setState({ loading: false }));
  }

  render() {
    return (
      <Autocomplete
          inputProps={{onKeyPress: this.keyPressHandler}}
          ref="autocomplete"
          value={this.state.value}
          items={this.state.packages}
          getItemValue={(item) => item.value}
          onSelect={this.selectHandler}
          onChange={this.changeHandler}
          renderItem={(item, isHighlighted) => (
            <div className={'Package' + (isHighlighted && ' highlighted')}>
              <div className="Name">{item.value}</div>
              <div className="Description">{item.data.description}</div>
            </div>
          )}
        />
    )
  }
}

export default PackageSearch;
