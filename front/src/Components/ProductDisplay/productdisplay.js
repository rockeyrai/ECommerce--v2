import React from "react";
import "./ProductDisplay.css";

const ProductDisplay = (props) => {
  const { product } = props;
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list ">
          <img src={product.image} />
          <img src={product.image} />
          <img src={product.image} />
          <img src={product.image} />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star ">
          <img src="/star_icon.png" />
          <img src="/star_icon.png" />
          <img src="/star_icon.png" />
          <img src="/star_icon.png" />
          <img src="/star_dull_icon.png" />
          <p>(122)</p>
        </div>
        <di className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            {product.new_price}
          </div>
          </di>
          <div className="productdisplay-right-description">
            A lightweight, usually knitted, pullower shirt, close-fitting and
            warm around neckline and short sleeves,
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
              <div>S</div>
              <div>M</div>
              <div>L</div>
              <div>XL</div>
              <div>XXL</div>
            </div>
          </div>
          <button>ADD TO CART</button>
          <p className="productdisplay-right-category">
            <span>Category:</span>Women,T-Shirt,Crop Top
          </p>
          <p className="productdisplay-right-category">
            <span>Tag:</span>Modern,Latest{" "}
          </p>

      </div>
    </div>
  );
};

export default ProductDisplay;
