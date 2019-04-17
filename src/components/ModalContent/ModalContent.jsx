import React from "react";
import classes from "./ModalContent.module.css";
const ModalContent = ({ ingredients, totalPrice, closeModal }) => {
  const ingredientsArray = Object.keys(ingredients);

  return (
    <div className={classes.container}>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientsArray.map((ing, i) => (
          <li key={i}>
            {ing}: {ingredients[ing]}
          </li>
        ))}
      </ul>
      <p>
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <footer className={classes.modalFooter}>
        <button className={classes.action}>Continue</button>
        <button onClick={closeModal} className={classes.action}>
          Cancel
        </button>
      </footer>
    </div>
  );
};

export default ModalContent;
