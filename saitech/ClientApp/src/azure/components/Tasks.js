import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/TechTipsData";
import ReactMarkdown from "react-markdown";
import { Link } from 'react-router-dom';

const input =
  "# This is a \n\n" +
  "And this is a paragraph\n\n" +
  "* az\n\n" +
  "   * az vm create extra";

class Tasks extends Component {
  componentWillMount() {
    this.props.requestTechInfo();
  }
  render() {
    return <div>{renderTasks(this.props)}</div>;
  }
}

function renderTasks(props) {
  if (props.isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Tasks</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks.map(task => (
          <tr key={task.name}>
            <td>
              <Link to={"/techtipdetails/" + task.name}>{task.name}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default connect(
  state => state.categories,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Tasks);
