import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Toast } from "flowbite-react";
const ChangeUsernamePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    currentUsername: Yup.string().required("Current Username is required"),
    newUsername: Yup.string().required("New Username is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      // Send the PATCH request to the endpoint with the Authorization header
      await axios.patch(
        "https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername",
        {
          currentUsername: values.currentUsername,
          newUsername: values.newUsername,
          FE_URL: "http://localhost:3000",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success response
      console.log("Username changed successfully");
      // reset screen
      window.location.reload(false);
    } catch (error) {
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <h1>❌</h1>
        </div>
        <div className="ml-3 text-sm font-normal">
          UserName change failed !.
        </div>
        <Toast.Toggle />
      </Toast>;
    }

    setIsSubmitting(false);
  };
  return (
    <div>
      <Formik
        initialValues={{ currentUsername: "", newUsername: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div>
              <label>Current Username</label>
              <Field
                as="input"
                type="text"
                name="currentUsername"
                required
                className="border rounded-md p-2"
              />
              <ErrorMessage
                name="currentUsername"
                component="p"
                className="text-red-500"
              />
            </div>
            <div>
              <label>New Username</label>
              <Field
                as="input"
                type="text"
                name="newUsername"
                required
                className="border rounded-md p-2"
              />
              <ErrorMessage
                name="newUsername"
                component="p"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className={`px-3 py-1 rounded-md text-white ${
                isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              }`}>
              {isSubmitting ? "Submitting" : "Change Username"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeUsernamePage;
