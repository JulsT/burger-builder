import React from "react";
import classes from "./Button.module.css";

const Button = ({ name, clicked, type, typeBtn, disabled }) => {
  return (
    <button
      onClick={clicked}
      disabled={disabled}
      className={`${classes.button} ${classes[type]}`}
      type={typeBtn}
    >
      {name}
    </button>
  );
};

export default Button;
