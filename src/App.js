import React, { Component } from "react";
import Header from "./components/Header/Header";
import BurgerBuilder from "./containers/BurgerBuilder";
import HeroPage from "./components/HeroPage/HeroPage";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import CheckoutPage from "./containers/CheckoutPage";
import OrdersPage from "./containers/OrdersPage";
import WelcomePage from "./containers/WelcomePage/WelcomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { logout, recieveAuth } from "./actions/auth";
import { bindActionCreators } from "redux";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";
class App extends Component {
  componentDidMount() {
    this.props.recieveAuth();
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.isAuth !== this.props.isAuth) {
  //     this.props.recieveAuth();
  //   }
  // }
  render() {
    return (
      <main>
        {this.props.location.pathname !== "/" &&
        this.props.location.pathname !== "/not-found" ? (
          <Header isAuth={this.props.isAuth} logout={this.props.logout} />
        ) : (
          ""
        )}
        <div className="container">
          <Switch>
            <Route path="/" exact component={HeroPage} />
            <Route path="/builder" component={BurgerBuilder} />
            <Route path="/checkout" component={CheckoutPage} />
            <PrivateRoute
              path="/orders"
              component={OrdersPage}
              isAuth={this.props.isAuth}
            />
            <Route path="/login" component={WelcomePage} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
          <ToastContainer
            style={{ fontSize: "20px", width: "400px" }}
            position="bottom-left"
            autoClose={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange={false}
            draggable
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuthenticated
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      recieveAuth
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
