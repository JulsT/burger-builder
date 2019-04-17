import React, { Component } from "react";
import Burger from "../components/Burger/Burger";
import Controls from "../components/Controls/Controls";
import ReactModal from "react-modal";
import ModalContent from "../components/ModalContent/ModalContent";
import classes from "./BurgerBuilder.module.css";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
ReactModal.setAppElement("#root");
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      bacon: 0,
      salad: 0
    },
    totalPrice: 4.0,
    purchaseable: false,
    openModal: false
  };
  handleAddIngretient = ing => {
    const ingredients = { ...this.state.ingredients };
    ingredients[ing] += 1;
    this.setState({ ingredients });
    this.setState(prevState => ({
      totalPrice: prevState.totalPrice + INGREDIENT_PRICES[ing]
    }));
    this.updatePurchaseable(ingredients);
  };
  handleDeleteIngretient = ing => {
    const ingredients = { ...this.state.ingredients };
    ingredients[ing] -= 1;
    if (ingredients[ing] < 0) {
      return false;
    }
    this.setState({ ingredients });
    this.setState(prevState => ({
      totalPrice: prevState.totalPrice - INGREDIENT_PRICES[ing]
    }));
    this.updatePurchaseable(ingredients);
  };
  handleOpenModal = () => {
    this.setState({ openModal: true });
  };
  handleCloseModal = () => {
    this.setState({ openModal: false });
  };
  updatePurchaseable = state => {
    const arr = Object.values(state);
    const result = arr.reduce((sum, currentEl) => sum + currentEl, 0);
    this.setState({ purchaseable: result > 0 ? true : false });
  };
  render() {
    return (
      <React.Fragment>
        <ReactModal
          className={`${classes.content}`}
          isOpen={this.state.openModal}
          overlayClassName={classes.overlay}
          onRequestClose={this.handleCloseModal}
        >
          <ModalContent
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            closeModal={this.handleCloseModal}
          />
        </ReactModal>
        <Burger ingredients={this.state.ingredients} />
        <Controls
          ingredients={this.state.ingredients}
          addIngredient={this.handleAddIngretient}
          deleteIngredient={this.handleDeleteIngretient}
          totalPrice={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          openModal={this.handleOpenModal}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
