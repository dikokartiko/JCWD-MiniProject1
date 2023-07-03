import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ChangePassword = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
    useState(false);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    password: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { currentPassword, password, confirmPassword } = values;
      const token = localStorage.getItem("token");

      const data = {
        currentPassword,
        password,
        confirmPassword,
      };

      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      try {
        const response = await axios(config);
        console.log(response.data);
        setIsPasswordChanged(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleToggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible(!isOldPasswordVisible);
  };

  const handleToggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleToggleConfirmNewPasswordVisibility = () => {
    setIsConfirmNewPasswordVisible(!isConfirmNewPasswordVisible);
  };

  if (!isPasswordChanged) {
    return (
      <div className="mb-64 px-6 py-4 ">
        <h1 className="font-mono text-xl mb-4">Change Password</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block">
              Old Password
            </label>
            <div className="flex">
              <input
                id="oldPassword"
                type={isOldPasswordVisible ? "text" : "password"}
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="currentPassword"
                required
                className={`border rounded-md p-2 w-full ${
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                className="ml-5 p-1 w-10 bg-gray-200 rounded-md focus:outline-none "
                onClick={handleToggleOldPasswordVisibility}>
                🔐
              </button>
            </div>
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.currentPassword}
                </p>
              )}
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block">
              New Password
            </label>
            <div className="flex">
              <input
                id="newPassword"
                type={isNewPasswordVisible ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                required
                className={`border rounded-md p-2 w-full ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                className="ml-5 p-1 w-10 bg-gray-200 rounded-md focus:outline-none "
                onClick={handleToggleNewPasswordVisibility}>
                🔐
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="block">
              Confirm New Password
            </label>
            <div className="flex">
              <input
                id="confirmNewPassword"
                type={isConfirmNewPasswordVisible ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="confirmPassword"
                required
                className={`border rounded-md p-2 w-full ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                className="ml-5 p-1 w-10 bg-gray-200 rounded-md focus:outline-none "
                onClick={handleToggleConfirmNewPasswordVisibility}>
                🔐
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            className={`mt-2 px-3 py-1 rounded-md text-white ${
              formik.isSubmitting
                ? "bg-gray-500"
                : "bg-teal-500 hover:bg-teal-600"
            }`}>
            Change Password
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <h1 className="text-xl mb-4">Password Changed Successfully!</h1>
      <p>Your password has been successfully changed.</p>
    </div>
  );
};

export default ChangePassword;
