import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export class TechTips extends Component {
  displayName = TechTips.name

  constructor(props) {
    super(props);
    this.state = { categories: [], searchData: [], loading: true, searching: false };

    fetch('https://saitools.azurewebsites.net/api/techtips')
      .then(response => response.json())
      .then(data => {
        this.setState({ categories: data, loading: false });
      });
  }

  onSearch(value){
    fetch('https://saitools.azurewebsites.net/api/techtips?q='+ value)
    .then(response => response.json())
    .then(searchData => {
      console.log(searchData.length)
      searchData.forEach(d=>{
        console.log(d)
      })
      this.setState({ categories: this.state.categories, searchData: searchData, searching: false });
    });
  }

  static renderSearchResults(tips) {
    if( tips.length === 0 ){
      return (
        <div></div>
      )
    }

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
            <tr>
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
    let searchResults = TechTips.renderSearchResults(this.state.searchData);
    return (
      <div>
        <h2>Tech Tips</h2>
        <br/>
        <br/>
      <MuiThemeProvider>
        <SearchBar
      value={this.state.value}
      onChange={(newValue) => this.setState({ value: newValue })} 
      onRequestSearch={() => this.onSearch(this.state.value)}
      />
      <div>
        {searchResults}
      </div>
      <br/>
      <br/>
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
