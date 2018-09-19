import React, { Component } from 'react';

export class TechTips extends Component {
  displayName = TechTips.name

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };

    fetch('https://saitools.azurewebsites.net/api/techtips')
      .then(response => response.json())
      .then(data => {
        this.setState({ forecasts: data, loading: false });
      });
  }

  static renderTechTips(techtips) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {techtips.map(techtip =>
            <tr key={techtip.name}>
              <td>{techtip.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : TechTips.renderTechTips(this.state.forecasts);

    return (
      <div>
        <h1>Tech Tips</h1>
        {contents}
      </div>
    );
  }
}
