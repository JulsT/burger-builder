import React from "react";
import classes from "./OrderInfo.module.css";

const OrderInfo = ({ ingredients, price }) => {
  const order = Object.entries(ingredients).map(([key, value], i) => {
    return (
      <span
        key={i}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "7px"
        }}
      >
        {key} ({value})
      </span>
    );
  });
  return (
    <div className={classes.order}>
      <p>Ingredients: {order}</p>
      <p>
        Price: <strong>USD {price}</strong>
      </p>
    </div>
  );
};

export default OrderInfo;
