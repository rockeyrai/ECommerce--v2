'use client'
import React, { useState } from "react";
import "./Navbar.css";


const Navbar = () => {

  const [menu,setMenu]= useState('shop')

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src='./logo.png' alt="" />
        <p>Rockey</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}>Shop {menu==='shop'&&<hr/>}</li>
        <li onClick={()=>{setMenu("mens")}}>Mens{menu==='mens'&&<hr/>}</li>
        <li onClick={()=>{setMenu("women")}}>Womens {menu==='women'&&<hr/>}</li>
        <li onClick={()=>{setMenu("kids")}}>Kids {menu==='kids'&&<hr/>}</li>
      </ul>
      <div className="nav-login-cart">
        <button className="bg-blue-500">login</button>
        <img src='./cart_icon.png' alt="" />
        <div className="nav-cart-count">0</div>      
      </div>
    </div>
  );
};

export default Navbar;
