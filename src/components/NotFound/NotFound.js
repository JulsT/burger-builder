import React from "react";
import classes from "./NotFound.module.css";
import notFound from "../../assets/404-burger.jpg";

const NotFound = () => {
  return (
    <React.Fragment>
      <h2>Page not found</h2>
      <img className={classes.burger} src={notFound} alt="Page not found" />
    </React.Fragment>
  );
};

export default NotFound;
