import React from "react";
import logo from "../../assets/logo.png";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.brand}>
        <img className={classes.logo} src={logo} alt="Burger Logo" />
        Burger
      </div>
      <nav>
        <NavLink to="/builder" activeClassName={classes.active}>
          Burger Builder
        </NavLink>
        <NavLink to="/orders" activeClassName={classes.active}>
          Orders
        </NavLink>
        <NavLink to="/login" activeClassName={classes.active}>
          Login
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
