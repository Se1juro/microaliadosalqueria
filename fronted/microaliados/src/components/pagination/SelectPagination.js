import React, { Component } from 'react';

export default class SelectPagination extends Component {
  handleLimitChange = (e) => {
    this.props.changeInput(e);
  };
  render() {
    return (
      <select
        id="limitItem"
        className="form-control col-md-3"
        name="limitItem"
        onChange={this.handleLimitChange}
        style={{ marginBottom: '10px' }}
        defaultValue={this.props.limitItem}
      >
        {this.props.totalDocs.map((product) => (
          <option key={product} value={product}>
            {product}
          </option>
        ))}
      </select>
    );
  }
}
