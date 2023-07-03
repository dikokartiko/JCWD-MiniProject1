import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import apiData from "../Service/apiData.json";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be 6 characters at minimum")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      loginAction(values);
    },
  });

  const loginAction = (values) => {
    setIsSubmitting(true);
    let payload = {
      email: values.email,
      password: values.password,
    };
    axios
      .post(apiData.login, payload)
      .then((res) => {
        setIsSubmitting(false);
        toast.success("Login Successful", {
          autoClose: 3000,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((error) => {
        toast.warning(error.response.err, {
          autoClose: 5000,
        });
        setIsSubmitting(false);
      });
  };
  return (
    <div className="flex justify-center mt-5">
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title mb-4 text-center">
              <strong>Login Form</strong>
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p>{formik.errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter Your Password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p>{formik.errors.password}</p>
                  )}
                  <button
                    type="button"
                    className="ml-5 p-1 w-10 bg-gray-200 rounded-md focus:outline-none "
                    onClick={togglePasswordVisibility}>
                    🔐
                  </button>
                </div>
              </div>
              <div className="d-grid gap-2">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  style={{ backgroundColor: "blue" }}
                  className="btn btn-primary btn-block">
                  Login
                </button>
                <p className="text-center">
                  Don't have account ? &nbsp;
                  <Link to="/register">
                    <strong>Register here</strong>
                  </Link>
                </p>
                <p className="text-center">
                  <Link to="/ForgotPass">
                    <strong>Forgot password?</strong>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
