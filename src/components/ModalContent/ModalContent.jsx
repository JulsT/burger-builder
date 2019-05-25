import React from "react";
import classes from "./ModalContent.module.css";
import Button from "../Button/Button";
const ModalContent = ({
  ingredients,
  totalPrice,
  closeModal,
  orderContinue,
  error
}) => {
  const ingredientsArray = Object.keys(ingredients);
  let modalContent = (
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
        <Button name="Cancel" clicked={closeModal} type="cancel" />
        <Button name="Continue" clicked={orderContinue} type="continue" />
      </footer>
    </div>
  );
  if (error) {
    modalContent = (
      <div className={classes.container}>
        <p>{error}</p>
      </div>
    );
  }
  return <React.Fragment>{modalContent}</React.Fragment>;
};

export default ModalContent;
