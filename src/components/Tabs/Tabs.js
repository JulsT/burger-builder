import React, { Component } from "react";

import classes from "./Tabs.module.css";
import Tab from "./Tab";

class Tabs extends Component {
  state = {
    activeTab: this.props.children[0].props.label
  };
  handleChangeTab = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    return (
      <React.Fragment>
        <ul className={classes.tabs}>
          {this.props.children.map(child => (
            <Tab
              activeTab={this.state.activeTab}
              key={child.props.label}
              label={child.props.label}
              onhandleChangeTab={this.handleChangeTab}
            />
          ))}
        </ul>
        {this.props.children.map(child => {
          if (child.props.label !== this.state.activeTab) return null;
          return child.props.children;
        })}
      </React.Fragment>
    );
  }
}

export default Tabs;
