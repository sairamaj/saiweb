import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/TechTipsData";
import ReactMarkdown from "react-markdown";
import { Accordion, AccordionItem } from 'react-sanfona';


class Snippet extends Component {
  componentWillMount() {
    this.props.requestCodeSnippets();
  }

  onTaskClick(props, snippet) {
    console.log('onTaskClick.')
    props.requestSnippetDetail(snippet);
  }

  render() {
    if (this.props.currentError !== undefined) {
      return <div><h1>{this.props.currentError.toString()}</h1></div>
    }

    return <div>
      <br/><br/>
      <h3>Tasks</h3>
      {this.renderTasks(this.props, this.onTaskClick)}
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
        {props.codesnippets.map((snippet) => {
          return (
            <AccordionItem
              title={snippet.name}
              slug={snippet.name}
              key={snippet.name}
              onExpand={() => func(props, snippet)} 
              >
              <div>
                <ReactMarkdown source={snippet.detail} />
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
)(Snippet);
