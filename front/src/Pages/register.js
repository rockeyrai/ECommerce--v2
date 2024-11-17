"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios"; // Import axios for HTTP requests
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import { Link,useNavigate } from "react-router-dom";

// Validation schema for the form
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Full Name must be at least 2 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Register</h2>
          <p className="text-gray-600 mt-2">
            Create an account to access our services
          </p>
        </div>
        <Formik
          initialValues={{
            fullName: "", // Change name to fullName
            email: "",
            phoneNumber: "", // Change phone to phoneNumber
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values)
            try {
              const response = await axios.post('http://localhost:8000/register', values);
              toast.success("Registration Successful: Your account has been created successfully.");
            } catch (error) {
              if (error.response) {
                if (error.response.status === 409) {
                  toast.error(error.response.data.msg);
                } else {
                  toast.error("Registration Failed: Something went wrong. Please try again.");
                }
              } else {
                toast.error("Network error. Please check your connection.");
              }
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Full Name Field */}
              <fieldset className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Field
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-2 border rounded"
                  aria-invalid={errors.fullName && touched.fullName ? "true" : "false"}
                />
                {errors.fullName && touched.fullName && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </fieldset>

              {/* Email Field */}
              <fieldset className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded"
                  aria-invalid={errors.email && touched.email ? "true" : "false"}
                />
                {errors.email && touched.email && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.email}
                  </p>
                )}
              </fieldset>

              {/* Phone Number Field */}
              <fieldset className="space-y-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full p-2 border rounded"
                  aria-invalid={errors.phoneNumber && touched.phoneNumber ? "true" : "false"}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.phoneNumber}
                  </p>
                )}
              </fieldset>

              {/* Password Field */}
              <fieldset className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-2 border rounded"
                    aria-invalid={errors.password && touched.password ? "true" : "false"}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.password}
                  </p>
                )}
              </fieldset>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
