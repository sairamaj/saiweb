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

  onTaskClick(props,task) {
    console.log('onTaskClick.')
    props.requestTaskDetail(task);
  }

  render() {
    return <div>{this.renderTasks(this.props, this.onTaskClick)}</div>;
  }

  renderTasks(props, func) {
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
        {props.tasks.map(task => (
          <tbody>
            <tr key={task.name}>
              <td>
                <a onClick={() => func(props,task)}>{task.name}</a>
              </td>
            </tr>
            <tr>
              <td>
              <div>{task.detail}</div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}



export default connect(
  state => state.categories,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Tasks);
