import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class PackageSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };

    this.latestRequest = null;
  }

  onSuggestionsFetchRequested = ({ value }) => {

    this.setState({
      isLoading: true
    });

    const thisRequest = this.latestRequest = fetch(`https://ac.cnstrc.com/autocomplete/${value}?autocomplete_key=CD06z4gVeqSXRiDL2ZNK`)
      .then(res => res.json())
      .then(res => {
        if(thisRequest !== this.latestRequest) {
          return;
        }
        const suggestions = res.sections.packages.length > 0
          ? res.sections.packages
          : [];
        this.setState({
          suggestions,
          isLoading: false
        });
      })
      .catch(err => this.setState({ loading: false }));
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestionValue = suggestion => suggestion.value;

  renderSuggestion = suggestion => (
    <div className="Package">
      <div className="Name">{suggestion.value}</div>
      <div className="Description">{suggestion.data.description}</div>
    </div>
  );

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onKeyPress = e => {
    if(e.key === 'Enter') {
      if(typeof this.props.onSubmit === 'function') {
        this.props.onSubmit(this.state.value);
      }
      this.setState({
        value: ''
      });
    }
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    return (
      <div className="PackageSearch">
        <Autosuggest
          inputProps={inputProps}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion} />
      </div>
    );
  }
}

export default PackageSearch;
