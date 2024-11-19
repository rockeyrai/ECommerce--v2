import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddProduct.css";

const AddProduct = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    name: "",
    new_price: "",
    old_price: "",
    category: "women",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Product title must be at least 5 characters")
      .required("Product title is required"),
    new_price: Yup.number()
      .typeError("Offer price must be a number")
      .required("Offer price is required")
      .positive("Price must be a positive number")
      .test("is-greater", "New price must be less than old price", function (value) {
        const { old_price } = this.parent;
        return !old_price || value < old_price;
      }),
    old_price: Yup.number()
      .typeError("Old price must be a number")
      .positive("Old price must be a positive number")
      .nullable(),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed().required("Product image is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
  
    let responsedData;
  
    // Create FormData and append the image
    let formData = new FormData();
    formData.append("product", values.image);
  
    try {
      // Send the image to the backend
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      responsedData = await response.json();
  
      if (responsedData.success) {
        const product = {
          ...values,
          image: responsedData.image_url, // Use the uploaded image URL
        };
  
        // Save the product in the database
        const productResponse = await fetch("http://localhost:8000/addproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
  
        const productData = await productResponse.json();
  
        if (productData.success) {
          console.log("Product added:", productData);
          alert("Product added successfully!");
  
          // Clear the form fields
          resetForm();
          setPreviewImage(null);
        } else {
          alert("Failed to add product.");
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while adding the product.");
    }
  };
  
  const handleImagePreview = (file) => {
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="add-product">
          <div className="addproduct-itemfield">
            <p>Product title</p>
            <Field type="text" name="name" placeholder="Type here" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>

          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <Field type="text" name="new_price" placeholder="New price" />
              <ErrorMessage name="new_price" component="div" className="error-message" />
            </div>
            <div className="addproduct-itemfield">
              <p>Price</p>
              <Field type="text" name="old_price" placeholder="Old price" />
              <ErrorMessage name="old_price" component="div" className="error-message" />
            </div>
          </div>

          <div className="addproduct-itemfield">
            <p>Product Category</p>
            <Field as="select" name="category" className="add-product-selector">
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kid</option>
            </Field>
            <ErrorMessage name="category" component="div" className="error-message" />
          </div>

          <div className="addproduct-itemfield">
            <label htmlFor="file-input">
              <img
                src={previewImage || "upload_area.svg"}
                className="addproduct-thumbnail-img"
                alt="Product thumbnail"
              />
            </label>
            <input
              type="file"
              id="file-input"
              name="image"
              hidden
              onChange={(event) => {
                const file = event.target.files[0];
                setFieldValue("image", file);
                handleImagePreview(file);
              }}
            />
            <ErrorMessage name="image" component="div" className="error-message" />
          </div>

          <button type="submit" className="addproduct-btn">
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
