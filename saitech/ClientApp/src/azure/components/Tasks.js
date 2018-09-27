import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/TechTipsData";
import ReactMarkdown from "react-markdown";
import fs from "fs";

const input =
  "# This is a \n\n" +
  "And this is a paragraph\n\n" +
  "* az\n\n" +
  "   * az vm create";

class Tasks extends Component {
  componentWillMount() {
    this.props.requestTechInfo();
  }
  render() {
    return (
      <div>
        <ReactMarkdown source={this.props.techdata} />
      </div>
    );
  }
}

export default connect(
  state => state.categories,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Tasks);
