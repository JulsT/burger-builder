import React, { Component } from "react";
import classes from "./CheckoutPage.module.css";
import Burger from "../../components/Burger/Burger";
import Button from "../../components/Button/Button";
import ContactForm from "../../components/ContactForm/ContactForm";
import { Route, Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { connect } from "react-redux";
import { submitOrder } from "../../actions/order";
import { bindActionCreators } from "redux";

class CheckoutPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  updatePurchaseable = state => {
    const arr = Object.values(state);
    const result = arr.reduce((sum, currentEl) => sum + currentEl, 0);
    return result > 0 ? true : false;
  };
  handleCancelOrder = () => {
    this.props.history.goBack();
  };
  handleContinueOrder = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let form = (
      <Route
        path={`${this.props.match.path}/contact-data`}
        render={() => (
          <ContactForm
            onOrderClick={this.props.submitOrder}
            contactData={this.props.contactData}
          />
        )}
      />
    );
    if (this.props.isLoading) {
      form = <Loader />;
    }
    if (this.props.error) {
      form = (
        <h2>
          {this.props.error}
          <br />
          Please try later{" "}
        </h2>
      );
    }
    return (
      <>
        {this.updatePurchaseable(this.props.ingredients) === true ? (
          <div>
            <h1>My order</h1>
            <div className={classes.burger}>
              <Burger ingredients={this.props.ingredients} />
            </div>
            <Button
              name="Cancel"
              clicked={this.handleCancelOrder}
              type="cancel"
            />
            <Button
              name="Continue"
              clicked={this.handleContinueOrder}
              type="continue"
            />
            <div className={classes.innerContainer}>{form}</div>
          </div>
        ) : (
          <Redirect to="/builder" />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    isLoading: state.order.isLoading,
    error: state.order.error,
    contactData: state.auth.contactData
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitOrder
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutPage);
