import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export class TechTips extends Component {
  displayName = TechTips.name

  constructor(props) {
    super(props);
    this.state = { categories: [], loading: true };

    fetch('https://saitools.azurewebsites.net/api/techtips')
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data, loading: false });
      });
  }

  static renderCategories(categories) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category =>
            <tr key={category.name}>
              <td>
              <Link to={'/techtipdetails/' + category.name}>{category.name}</Link>
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
      : TechTips.renderCategories(this.state.categories);

    return (
      <div>
        <h1>Tech Tips</h1>
      <MuiThemeProvider>
        <SearchBar
      value={this.state.value}
      onChange={(newValue) => this.setState({ value: newValue })} />
      <div>
      {contents}
      </div>
    </MuiThemeProvider>
    </div>
    )
  //     return (
  //     <div>
  //       <h1>Tech Tips</h1>
  //       <SearchBar
  //   value={this.state.value}
  //   onChange={(newValue) => this.setState({ value: newValue })}
  // />
  //   {/* <div>
  //       {contents}
  //       </div> */}
  //     </div>
  //   );
  }
}
