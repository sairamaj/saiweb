import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';


export class TechTipDetails extends Component {
  constructor(props) {
    super(props);
    let category = this.props.match.params.name
    this.state = { techTips: [], loading: true };

    fetch('https://saitools.azurewebsites.net/api/techtips/' + category)
      .then(response => response.json())
      .then(data => {
        this.setState({ techTips: data, loading: false });
      });
  }

  static renderTips(tips) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Command</th>
            <th>Description</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {tips.map(tip =>
            <tr key={tip.name}>
              <td>
               {tip.name}
              </td>
              <td>
               {tip.command} 
               {/* <CopyToClipboard onCopy={this.onCopy} text={tip.command}>
            <button>Copy</button>
          </CopyToClipboard> */}
              </td>
              <td>
               {tip.description}
              </td>
              <td>
               <a href={tip.url}>{tip.url}</a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
  render() {
    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : TechTipDetails.renderTips(this.state.techTips);

  return (
    <div>
      <h1>Details</h1>
      {contents}
    </div>
  );
  }
}
