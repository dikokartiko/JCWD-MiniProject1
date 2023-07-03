import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const ChangePhoneNumber = () => {
  const [isPhoneChanged, setIsPhoneChanged] = useState(false);

  const validationSchema = Yup.object().shape({
    currentPhone: Yup.string().required("Current phone number is required"),
    newPhone: Yup.string().required("New phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      currentPhone: "",
      newPhone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { currentPhone, newPhone } = values;
      const token = localStorage.getItem("token");
      const data = {
        currentPhone,
        newPhone,
        FE_URL: "http://localhost:3000",
      };
      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "https://minpro-blog.purwadhikabootcamp.com/api/auth/changePhone",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
      try {
        const response = await axios(config);
        console.log(response.data);
        setIsPhoneChanged(true);
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (!isPhoneChanged) {
    return (
      <div>
        <h1 className="text-xl mb-4">Change Phone Number</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currentPhone" className="block">
              Current Phone Number
            </label>
            <input
              id="currentPhone"
              type="text"
              name="currentPhone"
              value={formik.values.currentPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className={`border rounded-md p-2 w-full ${
                formik.errors.currentPhone && formik.touched.currentPhone
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.currentPhone && formik.errors.currentPhone && (
              <p className="text-red-500 text-sm">
                {formik.errors.currentPhone}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="newPhone" className="block">
              New Phone Number
            </label>
            <input
              id="newPhone"
              type="text"
              name="newPhone"
              value={formik.values.newPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border rounded-md p-2 w-full ${
                formik.errors.newPhone && formik.touched.newPhone
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.newPhone && formik.errors.newPhone && (
              <p className="text-red-500 text-sm">{formik.errors.newPhone}</p>
            )}
          </div>

          <button
            type="submit"
            className={`px-3 py-1 rounded-md text-white ${
              formik.isSubmitting
                ? "bg-gray-500"
                : "bg-teal-500 hover:bg-teal-600"
            }`}>
            Change Phone Number
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 mt-36">
      <h1 className="text-xl mb-4">Check your email</h1>
      <p>Check your email to verify the change of your phone number</p>
    </div>
  );
};

export default ChangePhoneNumber;
