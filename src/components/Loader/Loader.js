import React from "react";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.outer} />
      <div className={classes.middle} />
      <div className={classes.inner} />
    </div>
  );
};

export default Loader;
