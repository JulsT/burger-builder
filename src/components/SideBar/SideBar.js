import React from "react";
import classes from "./SideBar.module.css";
import { NavLink } from "react-router-dom";

const SideBar = ({ isAuth, logout, onToggleMenu }) => {
  let loginButton = (
    <NavLink to="/login" activeClassName={classes.active}>
      Login
    </NavLink>
  );
  if (isAuth) {
    loginButton = <span onClick={logout}>Logout</span>;
  }
  return (
    <>
      <div className={classes.sidenav}>
        <span className={classes.closeBtn} onClick={onToggleMenu}>
          &times;
        </span>
        <div onClick={onToggleMenu}>
          <NavLink to="/builder" activeClassName={classes.active}>
            Burger Builder
          </NavLink>
          {isAuth ? (
            <NavLink to="/orders" activeClassName={classes.active}>
              Orders
            </NavLink>
          ) : null}
          {loginButton}
        </div>
      </div>
      <div className={classes.backdrop} onClick={onToggleMenu} />
    </>
  );
};

export default SideBar;
