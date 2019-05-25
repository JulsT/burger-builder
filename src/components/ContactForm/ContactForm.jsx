import React, { Component } from "react";
import Button from "../Button/Button";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classes from "./ContactForm.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "C'mon, your name is longer than that")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("email is required"),
  country: Yup.string().required("Country is required"),
  region: Yup.string().required("Region is required"),
  street: Yup.string().required("Street is required"),
  postalCode: Yup.number()
    .typeError("Postal Code must be a number")
    .test(
      "len",
      "Must be more than 5 and less than 8 characters",
      val =>
        !!val &&
        val.toString().length >= 5 &&
        (!!val && val.toString().length <= 8)
    )
    .required("Postal Code is required"),
  deliveryMethod: Yup.string().required("Method is required")
});

class ContactForm extends Component {
  render() {
    const { onOrderClick } = this.props;
    const animation = `${classes.input} ${classes.error} ${classes.animated} ${
      classes.shake
    }`;
    const animationMsg = `${classes.errorMsg} ${classes.error} ${
      classes.animated
    } ${classes.shake}`;
    return (
      <div className={classes.container}>
        <h2>Enter your Contact Data</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            country: "",
            region: "",
            street: "",
            postalCode: "",
            deliveryMethod: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values, isValid) => {
            if (isValid) {
              onOrderClick(values);
            }
          }}
          validateOnBlur={true}
        >
          {({ values, errors, touched, handleChange }) => (
            <Form>
              <Field
                className={
                  touched.name && errors.name
                    ? `${animation}`
                    : `${classes.input}`
                }
                type="text"
                name="name"
                placeholder="Your name"
              />
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="name"
              />
              <Field
                className={
                  touched.email && errors.email
                    ? `${animation}`
                    : `${classes.input}`
                }
                type="email"
                name="email"
                placeholder="Your email"
              />
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="email"
              />
              <CountryDropdown
                defaultOptionLabel="Select a country, man."
                className={
                  touched.country && errors.country
                    ? `${animation}`
                    : `${classes.dropdown}`
                }
                value={values.country}
                name="country"
                onChange={(_, val) => handleChange(val)}
              />
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="country"
              />
              <RegionDropdown
                className={
                  touched.region && errors.region
                    ? `${animation}`
                    : `${classes.dropdown}`
                }
                blankOptionLabel="No country selected, man."
                defaultOptionLabel="Now select a region, pal."
                country={values.country}
                value={values.region}
                onChange={(_, val) => handleChange(val)}
                name="region"
              />
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="region"
              />
              <Field
                className={
                  touched.street && errors.street
                    ? `${animation}`
                    : `${classes.input}`
                }
                type="text"
                name="street"
                placeholder="Your address"
              />
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="street"
              />
              <Field
                className={
                  touched.postalCode && errors.postalCode
                    ? `${animation}`
                    : `${classes.input}`
                }
                type="text"
                name="postalCode"
                placeholder="Your postalCode"
              />
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="postalCode"
              />
              <select
                className={
                  touched.deliveryMethod && errors.deliveryMethod
                    ? `${animation}`
                    : `${classes.dropdown}`
                }
                name="deliveryMethod"
                value={values.deliveryMethod}
                onChange={handleChange}
              >
                <option value="" defaultValue>
                  Choose delivery method...
                </option>
                <option value="fastest">Fastest</option>
                <option value="cheapest">Cheapest</option>
              </select>
              <ErrorMessage
                component="span"
                className={animationMsg}
                name="deliveryMethod"
              />
              <Button name="ORDER" type="continue" typeBtn="submit" />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default ContactForm;
