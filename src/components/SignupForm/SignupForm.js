import React, { Component } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import classes from "./SignupForm.module.css";
import { withRouter } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Login is required"),
  password: Yup.string()
    .min(6, "Must be more than 6 characters")
    .max(16, "Must be less than 16 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords are not the same!")
    .required("Password confirmation is required!")
});

class SignupForm extends Component {
  state = {};
  render() {
    const animation = `${classes.input} ${classes.error} ${classes.animated} ${
      classes.shake
    }`;
    const animationMsg = `${classes.errorMsg} ${classes.error} ${
      classes.animated
    } ${classes.shake}`;
    return (
      <div className={classes.container}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            passwordConfirm: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, isValid) => {
            if (isValid) {
              const user = {
                email: values.email,
                password: values.password
              };
              this.props.signup(user);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="email"
              />
              <Field
                className={
                  touched.email && errors.email
                    ? `${animation}`
                    : `${classes.input}`
                }
                type="text"
                name="email"
                placeholder="Your email"
              />
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="password"
              />
              <Field
                className={
                  touched.password && errors.password
                    ? `${animation}`
                    : `${classes.input}`
                }
                type="password"
                name="password"
                placeholder="Your password"
              />
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="passwordConfirm"
              />
              <Field
                className={
                  touched.passwordConfirm && errors.passwordConfirm
                    ? `${animation}`
                    : `${classes.input}`
                }
                type="password"
                name="passwordConfirm"
                placeholder="Repeat password"
              />

              <Button name="SIGN-UP" type="continue" typeBtn="submit" />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(SignupForm);
