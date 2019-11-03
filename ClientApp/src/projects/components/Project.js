import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/TechTipsData";
import ReactMarkdown from "react-markdown";
import { Accordion, AccordionItem } from 'react-sanfona';


class Project extends Component {
  componentWillMount() {
    this.props.requestProjects();
  }

  onProjectClick(props, project) {
    props.requestProjectDetail(project);
  }

  render() {
    if (this.props.currentError !== undefined) {
      return <div><h1>{this.props.currentError.toString()}</h1></div>
    }

    return <div>
      <br/><br/>
      <h3>Projects</h3>
      {this.renderTasks(this.props, this.onProjectClick)}
    </div>;
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
        {props.projects.map((project) => {
          return (
            <AccordionItem
              title={project.name}
              slug={project.name}
              key={project.name}
              onExpand={() => func(props, project)} 
              >
              <div>
                <ReactMarkdown source={project.detail} />
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
)(Project);
