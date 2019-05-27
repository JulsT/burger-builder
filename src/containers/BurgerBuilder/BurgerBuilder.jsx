import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import Controls from "../../components/Controls/Controls";
import ReactModal from "react-modal";
import ModalContent from "../../components/ModalContent/ModalContent";
import classes from "./BurgerBuilder.module.css";
import { connect } from "react-redux";
import { addIngredient, deleteIngredient } from "../../actions/burger";
import { bindActionCreators } from "redux";
import { purchaseOrder } from "../../actions/order";

ReactModal.setAppElement("#root");
class BurgerBuilder extends Component {
  state = {
    openModal: false,
    error: null
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleOpenModal = () => {
    this.setState({ openModal: true });
    this.props.purchaseOrder();
  };
  handleCloseModal = () => {
    this.setState({ openModal: false });
  };
  updatePurchaseable = state => {
    const arr = Object.values(state);
    const result = arr.reduce((sum, currentEl) => sum + currentEl, 0);
    return result > 0 ? true : false;
  };
  handleOrderContinue = () => {
    if (this.props.isAuth)
      this.props.history.push({
        pathname: "/checkout"
      });
    else this.props.history.push("/login");
  };
  render() {
    const { ingredients, totalPrice } = this.props;
    return (
      <React.Fragment>
        <ReactModal
          className={`${classes.content}`}
          isOpen={this.state.openModal}
          overlayClassName={classes.overlay}
          onRequestClose={this.handleCloseModal}
        >
          <ModalContent
            ingredients={ingredients}
            totalPrice={totalPrice}
            closeModal={this.handleCloseModal}
            orderContinue={this.handleOrderContinue}
            error={this.state.error}
          />
        </ReactModal>
        <Burger ingredients={ingredients} />
        <Controls
          ingredients={ingredients}
          addIngredient={this.props.addIngredient}
          deleteIngredient={this.props.deleteIngredient}
          totalPrice={totalPrice}
          purchaseable={this.updatePurchaseable(ingredients)}
          openModal={this.handleOpenModal}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addIngredient,
      deleteIngredient,
      purchaseOrder
    },
    dispatch
  );

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    isAuth: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BurgerBuilder);
