import React, { useEffect, useState } from "react";
import "./ListProduct.css";

const ListProduct = () => {
  const [allproducts, setAlProducts] = useState([]);
  const fetchInfo = async () => {
    try {
      const res = await fetch("http://localhost:8000/allproducts");
      const data = await res.json();
      setAlProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const remove_product = async (id) => {
    try {
      const response = await fetch("http://localhost:8000/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove product");
      }
      await fetchInfo(); // Refresh the product list
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts ">
        <hr />
        {allproducts.map((product) => (
          <div>
            <div
              key={product.id}
              className="listproduct-format-main listproduct-format"
            >
              <img
                src={product.image}
                alt=""
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => {
                  remove_product(product.id);
                }}
                className="listproduct-remove-icon"
                src="cross_icon.png"
                alt="remove"
              />
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;