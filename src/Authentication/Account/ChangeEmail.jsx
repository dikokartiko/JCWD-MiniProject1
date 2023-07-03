import { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ChangeEmail = () => {
  const [isEmailChanged, setIsEmailChanged] = useState(false);

  const validationSchema = Yup.object().shape({
    currentEmail: Yup.string()
      .email("Invalid email")
      .required("Current Email is required"),
    newEmail: Yup.string()
      .email("Invalid email")
      .required("New Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentEmail: "",
      newEmail: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { currentEmail, newEmail } = values;
      const token = localStorage.getItem("token");

      const data = {
        currentEmail,
        newEmail,
        FE_URL: "http://localhost:3000",
      };

      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeEmail",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      try {
        const response = await axios(config);
        console.log(response.data);
        setIsEmailChanged(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (!isEmailChanged) {
    return (
      <div className="">
        <h1 className="font-mono text-xl mb-4">Change Email</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currentEmail" className="block">
              Current Email
            </label>
            <input
              id="currentEmail"
              type="email"
              value={formik.values.currentEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="currentEmail"
              required
              className={`border rounded-md p-2 w-full ${
                formik.touched.currentEmail && formik.errors.currentEmail
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.currentEmail && formik.errors.currentEmail && (
              <p className="text-red-500 text-sm">
                {formik.errors.currentEmail}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="newEmail" className="block">
              New Email
            </label>
            <input
              id="newEmail"
              type="email"
              value={formik.values.newEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="newEmail"
              required
              className={`border rounded-md p-2 w-full ${
                formik.touched.newEmail && formik.errors.newEmail
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.newEmail && formik.errors.newEmail && (
              <p className="text-red-500 text-sm">{formik.errors.newEmail}</p>
            )}
          </div>
          <button
            type="submit"
            className={`mt-2 px-3 py-1 rounded-md text-white ${
              formik.isSubmitting
                ? "bg-gray-500"
                : "bg-teal-500 hover:bg-teal-600"
            }`}>
            Change Email
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <h1 className="text-xl mb-4">Email Changed Successfully!</h1>
      <p>Please check your email for verification</p>
    </div>
  );
};

export default ChangeEmail;
