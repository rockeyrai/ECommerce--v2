import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src="logo_big.png" />
        <p>Rockey</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icon-container">
          <img src="instagram_icon.png" />
        </div>
        <div className="footer-icon-container">
          <img src="pintester_icon.png" />
        </div>
        <div className="footer-icon-container">
          <img src="whatsapp_icon.png" />
        </div>
      </div>
        <div className="footer-copyright">
        <hr />
        <p>copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
