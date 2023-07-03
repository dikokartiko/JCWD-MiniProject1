import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const initialValues = {
    email: "",
    FE_URL: "http://localhost:3000",
  };
  const handleSubmit = async (values) => {
    try {
      const { email } = values;
      const response = await axios.put(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass",
        {
          email: email,
          FE_URL: "http://localhost:3000",
        }
      );
      console.log(response.data);

      toast.success("Reset password success!");
      setTimeout(() => {
        window.location.href = "/LoginPage";
      }, 2000);
    } catch (error) {
      toast.error(error.response.data);
      console.error(error);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div className="flex flex-col justify-center min-h-screen items-center">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form className="w-1/4">
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email:
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="border rounded w-full p-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded">
              Reset Password
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;
