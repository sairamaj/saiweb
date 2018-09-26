import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/TechTipsData';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchTechTips from './SearchTechTips';

class TechTips extends Component {
  componentWillMount() {
    this.props.requestTechCategories();
  }

  render() {
    return (
      <div>
        <h2>Tech Tips</h2>
        <br />
        <br />
        <MuiThemeProvider>
          <SearchTechTips />
          <div>{renderCategories(this.props)}</div>
          <br />
          <br />
          <div>{renderCategories(this.props)}</div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function renderCategories(props) {

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {props.categories.map(category =>
          <tr key={category.name}>
            <td>
              <img src={"images/" + category.name + ".png"} /> &nbsp;&nbsp;
              <Link to={"/techtipdetails/" + category.name}>
                {category.name}
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}


export default connect(
  state => state.categories,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(TechTips);
