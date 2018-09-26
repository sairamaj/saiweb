import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store/TechTipsData";

class TechTipDetails extends Component {

  componentWillMount() {
    let category = this.props.match.params.name;
    this.props.requestTechTips(category);
  }

  isCommand(tips) {
    console.log('>>> tips:' + JSON.stringify(tips));
    return tips.some(tip => tip.command !== undefined);
  }

  render() {
    return (this.isCommand(this.props.tips) 
    ? TechTipDetails.renderCommandTips(this.props.tips) 
    : TechTipDetails.renderInfoTips(this.props.tips) )
  }

  static renderCommandTips(tips) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Command</th>
            <th>Description</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {tips.map(tip => (
            <tr key={tip.name}>
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

  static renderInfoTips(tips) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {tips.map(tip => (
            <tr key={tip.name}>
              <td>{tip.name}</td>
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
}

export default connect(
  state => state.tips,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(TechTipDetails);
