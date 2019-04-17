import React from "react";
import classes from "./HeroPage.module.css";
import logo from "../../assets/logo.png";

import { Link } from "react-router-dom";
const HeroPage = () => {
  return (
    <React.Fragment>
      <div className={classes.bg}>
        <div className={classes.brand}>
          <img className={classes.logo} src={logo} alt="Burger Logo" />
          Burger
        </div>
        <Link to="/builder" className={classes.link}>
          Create Burger
        </Link>
      </div>
    </React.Fragment>
  );
};

export default HeroPage;
