"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
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
          initialValues={{ name: "", email: "", phone: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Registration attempt", values);
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name Field */}
              <fieldset className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 border rounded"
                  aria-invalid={errors.name && touched.name ? "true" : "false"}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.name}
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  className="w-full p-2 border rounded"
                  aria-invalid={errors.phone && touched.phone ? "true" : "false"}
                />
                {errors.phone && touched.phone && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.phone}
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
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
