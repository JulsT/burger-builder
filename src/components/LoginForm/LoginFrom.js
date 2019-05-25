import React, { Component } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import classes from "./LoginForm.module.css";
import { withRouter } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Login is required"),
  password: Yup.string()
    .min(6, "Must be more than 6 characters")
    .max(16, "Must be less than 16 characters")
    .required("Password is required")
});

class LoginForm extends Component {
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
            password: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, isValid) => {
            if (isValid) {
              this.props.login(values);
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

              <Button name="LOGIN" type="continue" typeBtn="submit" />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(LoginForm);
