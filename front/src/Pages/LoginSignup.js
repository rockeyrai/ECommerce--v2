"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate from react-router-dom
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Validation schema for the form
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

const LoginSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="text-gray-600 mt-2">
            Enter your credentials to access your account
          </p>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const { data } = await axios.post('http://localhost:8000/login', values);
              console.log(data);  // Check what the response contains
              const { isLoggedIn, user } = data;
              if (isLoggedIn) {
                console.log("Navigating to homepage");  // Debugging log
                navigate(`/`);  // Navigate to home page
              }
              if (data.msg) {
                toast.success(data.msg);
              }
            } catch (error) {
              console.error("Login error:", error);
              toast.error(error?.response?.data?.msg || "Login failed. Please try again.");
            }
          }}
          
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Field */}
              <fieldset className="space-y-2">
                <legend className="sr-only">Email</legend>
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

              {/* Password Field */}
              <fieldset className="space-y-2">
                <legend className="sr-only">Password</legend>
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </Form>
          )}
        </Formik>
        
        {/* Link to Register Page */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginSignup;
