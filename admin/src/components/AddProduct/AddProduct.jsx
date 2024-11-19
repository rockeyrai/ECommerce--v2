import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddProduct.css";

const AddProduct = () => {
  const [image, setImage] = useState(null);

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
      .required("Offer price is required")
      .positive("Price must be a positive number")
      .test("is-greater", "price must be greater than old price", function (value) {
        const { old_price } = this.parent;
        return !old_price || value < old_price;
      })
      .transform((value, originalValue) => (originalValue.trim() === "" ? null : value)),
    old_price: Yup.number()
      .positive("price must be a positive number")
      .nullable()
      .transform((value, originalValue) => (originalValue.trim() === "" ? null : value)),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed().required("Product image is required"),
  });
  
  const onSubmit = (values) => {
    console.log(values);
    // handle form submission here
  };

  const imageHandler = (e, setFieldValue) => {
    const file = e.target.files[0];
    setImage(file);
    setFieldValue("image", file);
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
                src={image ? URL.createObjectURL(image) : "upload_area.svg"}
                className="addproduct-thumnail-img"
                alt="Product thumbnail"
              />
            </label>
            <input
              type="file"
              id="file-input"
              name="image"
              hidden
              onChange={(e) => imageHandler(e, setFieldValue)}
            />
            <ErrorMessage name="image" component="div" className="error-message" />
          </div>

          <button type="submit" className="addproduct-bth">
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
