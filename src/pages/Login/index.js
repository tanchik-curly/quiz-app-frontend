import React, { useState } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";

import "./Login.scss";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const history = useHistory();

  const handleSubmit = (values) => {
    axios
      .post("http://localhost:8080/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.data.auth) {
          setIsAuthorized(true);
          localStorage.setItem("jwtToken", `${res.data.jwt_token}`);
          history.push("/");
        } else {
          setIsAuthorized(false);
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err?.response.data?.message);
      });
  };

  return (
    <>
      <Header />

      <div className="form-wrapper">
        <div className="form-border">
          <div className="loginHeader">
            <h2>Login form</h2>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) errors.email = "Required email";
              else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              )
                errors.email = "Incorrect email adress";
              else return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
              <form
                className="login-form"
                onSubmit={handleSubmit}
                method="POST"
              >
                <div className="input-container">
                  <TextField
                    required
                    id="outlined-required"
                    label="Email address"
                    variant="outlined"
                    name="email"
                    placeholder="email@gmail.com"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <span>
                    If you do not have an account yet, you can create one{" "}
                  </span>
                  <a href="/signup" className="link-form">
                    here
                  </a>
                </div>
                <Button
                  variant="outlined"
                  className="submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
