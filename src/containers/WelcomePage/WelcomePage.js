import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginFrom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login, signup, logout } from "../../actions/auth";
import Loader from "../../components/Loader/Loader";
import SignupForm from "../../components/SignupForm/SignupForm";
import classes from "./WelcomePage.module.css";
import Tabs from "../../components/Tabs/Tabs";
class WelcomePage extends Component {
  render() {
    return (
      <div className={classes.container}>
        <Tabs>
          <div label="Login">
            {this.props.isLoading ? (
              <Loader />
            ) : (
              <LoginForm
                isAuth={this.props.isAuth}
                setCheckoutPath={this.props.setCheckoutPath}
                error={this.props.error}
                login={this.props.login}
                logout={this.props.logout}
              />
            )}
          </div>
          <div label="Sign-Up">
            {this.props.isLoading ? (
              <Loader />
            ) : (
              <SignupForm
                error={this.props.error}
                isAuth={this.props.isAuth}
                setCheckoutPath={this.props.setCheckoutPath}
                signup={this.props.signup}
              />
            )}
          </div>
        </Tabs>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.auth.isLoading,
    isAuth: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      signup,
      logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
