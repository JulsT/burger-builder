import React from "react";
import classes from "./Controls.module.css";
const Controls = ({
  ingredients,
  addIngredient,
  deleteIngredient,
  totalPrice,
  purchaseable,
  openModal
}) => {
  const labels = Object.keys(ingredients).map((ing, i) => (
    <div key={i} className={classes.row}>
      <p className={classes.label}>{ing}</p>
      <div>
        <button
          onClick={() => addIngredient(ing)}
          className={`${classes.btn} ${classes.addBtn} `}
        >
          +
        </button>
        <button
          disabled={ingredients[ing] < 1}
          onClick={() => deleteIngredient(ing)}
          className={`${classes.btn} ${classes.deleteBtn} `}
        >
          -
        </button>
      </div>
    </div>
  ));
  return (
    <div className={classes.container}>
      <p>
        Current Price:<strong> $ {totalPrice.toFixed(2)}</strong>{" "}
      </p>
      {labels}
      <button
        disabled={!purchaseable}
        className={`${classes.btn} ${classes.orderBtn}`}
        onClick={openModal}
      >
        order now
      </button>
    </div>
  );
};

export default Controls;
