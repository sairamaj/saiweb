import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/TechTipsData";
import ReactMarkdown from "react-markdown";
import { Accordion, AccordionItem } from 'react-sanfona';
import { Link } from 'react-router-dom';


class Tasks extends Component {
  componentWillMount() {
    this.props.requestTechInfo();
  }

  onTaskClick(props, task) {
    console.log('onTaskClick.')
    props.requestTaskDetail(task);
  }

  render() {
    if( this.props.currentError !== undefined){
      return <div><h1>{this.props.currentError.toString()}</h1></div>
    }
    
    return <div>{this.renderTasks(this.props, this.onTaskClick)}</div>;
  }

  renderTasksold(props, func) {
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
                <a onClick={() => func(props, task)}>{task.name}</a>
              </td>
            </tr>
            <tr>
              <td>
                <ReactMarkdown source={task.detail} />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    );
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
      <Accordion className="react-sanfona">
        {props.tasks.map((task) => {
          return (
            <AccordionItem title={task.name} slug={task.name} key={task.name} onExpand={() => func(props, task)} >
              <div>
                <ReactMarkdown source={task.detail} />
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }

}



export default connect(
  state => state.categories,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Tasks);
