import React, { Component } from "react";
import classes from "./Tabs.module.css";

class Tab extends Component {
  state = {};
  render() {
    const { activeTab, label } = this.props;
    let className = classes.tab;
    if (activeTab === label) {
      className = `${classes.tab} ${classes.active}`;
    }
    return (
      <li
        className={className}
        onClick={() => this.props.onhandleChangeTab(label)}
      >
        {label}
      </li>
    );
  }
}

export default Tab;
