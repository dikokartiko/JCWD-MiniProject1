import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import apiData from "../Service/apiData.json";
import "../Stylesheets/register.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("token") !== null
    ) {
      navigate("/");
    }
  }, []);

  let formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      FE_URL: "http://localhost:3000",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Email Must with @")
        .required("Email is required"),
      phone: Yup.string()
        .matches(
          /^[0-9]{10,12}$/,
          "Phone number minimum 10 numbers and maximum 12 numbers"
        )
        .required("Phone number is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/,
          "Password minimum 6 characters"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      registerAction(values);
    },
  });

  const registerAction = (values) => {
    setIsSubmitting(true);
    let payload = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    axios
      .post(apiData.register, payload)
      .then((res) => {
        setIsSubmitting(false);
        localStorage.setItem("token", res.data.token);
        navigate("/");
        toast.success("Register Successful", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.warning(error.response.data, {
          autoClose: 5000,
        });
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex justify-center formBlog">
      <div className="row justify-content-md-center mt-5">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">
                <strong>Register Form</strong>
              </h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter Your Username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p>{formik.errors.username}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p>{formik.errors.email}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Your Phone Number"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p>{formik.errors.phone}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Your Match Password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p>{formik.errors.confirmPassword}</p>
                    )}
                </div>
                <div className="d-grid gap-2">
                  <button disabled={isSubmitting} type="submit">
                    Register
                  </button>
                  <p className="text-center">
                    Have already an account{" "}
                    <Link to="/">
                      <strong>Login here</strong>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
