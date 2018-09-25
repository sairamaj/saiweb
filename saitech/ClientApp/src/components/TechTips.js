import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/TechTipsData';

class TechTips extends Component {
  componentWillMount() {
    this.props.requestTechTips();
  }

  render() {
    return (
      <div>
        <h1>Tips data</h1>
        {renderCategories(this.props)}
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
