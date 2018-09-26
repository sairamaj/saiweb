import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/TechTipsData';
import SearchBar from "material-ui-search-bar";
import { Link } from 'react-router-dom';

class SearchTechTips extends Component {

    render() {
        return (
            <div>
                <SearchBar
                    value={this.searchValue}
                    onChange={newValue => this.searchValue = newValue}
                    onRequestSearch={() => onSearch(this.props, this.searchValue)}
                />
                <div>{renderSearchResults(this.props.searchTips)}</div>
            </div>
        )
    }
}

function onSearch(props, value) {
    props.requestSearch(value);
}

function renderSearchResults(tips) {
    console.log('>>>>>>> renderSearchResults: tips:' + JSON.stringify(tips));
    if (tips.length === 0) {
      return <div />;
    }
  
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Command</th>
            <th>Description</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {tips.map(tip => (
            <tr>
              <td>
                <img src={"images/" + tip.category + ".png"} /> &nbsp;&nbsp;
                  <Link to={"/techtipdetails/" + tip.category}>
                  {tip.category}
                </Link>
              </td>
  
              <td>{tip.name}</td>
              <td>
                {tip.command}
                {/* <CopyToClipboard onCopy={this.onCopy} text={tip.command}>
              <button>Copy</button>
            </CopyToClipboard> */}
              </td>
              <td>{tip.description}</td>
              <td>
                <a href={tip.url}>{tip.url}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  

export default connect(
    state => state.searchTips,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SearchTechTips);