import React, { Component } from "react";
import logo from "../../assets/logo.png";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

class Header extends Component {
  state = { isOpen: false };
  handleToggleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };
  render() {
    const { isAuth, logout } = this.props;
    let loginButton = (
      <NavLink to="/login" activeClassName={classes.active}>
        Login
      </NavLink>
    );
    if (isAuth) {
      loginButton = <span onClick={logout}>Logout</span>;
    }
    return (
      <div className={classes.header}>
        <div className={classes.brand}>
          <NavLink to="/builder">
            <img className={classes.logo} src={logo} alt="Burger Logo" />
            Burger
          </NavLink>
        </div>
        <nav>
          <NavLink to="/builder" activeClassName={classes.active}>
            Burger Builder
          </NavLink>
          {isAuth ? (
            <NavLink to="/orders" activeClassName={classes.active}>
              Orders
            </NavLink>
          ) : null}
          {loginButton}
        </nav>
        <div
          className={
            this.state.isOpen
              ? `${classes.burger} ${classes.change}`
              : `${classes.burger}`
          }
          onClick={this.handleToggleMenu}
        >
          <div className={classes.bar1} />
          <div className={classes.bar2} />
          <div className={classes.bar3} />
        </div>
        {this.state.isOpen ? (
          <SideBar
            isAuth={isAuth}
            logout={logout}
            onToggleMenu={this.handleToggleMenu}
          />
        ) : null}{" "}
      </div>
    );
  }
}

export default Header;
