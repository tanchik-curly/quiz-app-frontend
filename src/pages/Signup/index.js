import React, { useState } from "react";
import { Formik } from "formik";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

import "./Signup.scss";
import "../Login/Login.scss";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const history = useHistory();

  const handleSubmit = (values) => {
    axios
      .post("http://localhost:8080/auth/register", {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        gender: values.gender,
        position: values.position,
      })
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header isAuthorized={isAuthorized} />
      <div className="form-wrapper">
        <div className="form-border">
          <div className="loginHeader">
            <h2>Signup form</h2>
          </div>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              gender: "male",
              position: "student",
            }}
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
              console.log(JSON.stringify(values));
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleSubmit,
            }) => (
              <form
                className="login-form"
                onSubmit={handleSubmit}
                method="POST"
              >
                <div className="input-container">
                  <TextField
                    required
                    id="outlined-required"
                    label="Full name"
                    variant="outlined"
                    name="fullName"
                    placeholder="Lili Swon"
                    value={values.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div>{errors.email && touched.email && errors.email}</div>
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
                <div className="select-container">
                  <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Position
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={values.position}
                      onChange={handleChange}
                      name="position"
                      label="Position"
                    >
                      <MenuItem value="Student">Student</MenuItem>
                      <MenuItem value="Teacher">Teacher</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="select-container">
                  <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Sex
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={values.gender}
                      onChange={handleChange}
                      label="Sex"
                      name="gender"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
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
                  <span>Do you have the account? </span>
                  <a href="/login" className="link-form">
                    Login
                  </a>
                </div>
                <Button
                  variant="outlined"
                  className="submit-btn"
                  disabled={isSubmitting}
                  type="submit"
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

export default Signup;
