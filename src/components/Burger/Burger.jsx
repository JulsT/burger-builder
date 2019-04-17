import React from "react";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";
const Burger = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients).map(ing => {
    return [...Array(ingredients[ing])].map((_, i) => (
      <BurgerIngredient key={ing + i} type={ing} />
    ));
  });
  const result = transformedIngredients.reduce(
    (sum, current) => sum.concat(current),
    []
  );
  if (result.length === 0) {
    transformedIngredients = <p>Please add ingredients</p>;
  }
  return (
    <div className={classes.container}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
