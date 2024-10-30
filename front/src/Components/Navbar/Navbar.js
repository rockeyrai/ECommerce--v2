'use client'
import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {

  const [menu,setMenu]= useState('shop')

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src='./logo.png' alt="" />
        <p>Rockey</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link>  {menu==='shop'&&<hr/>}</li>
        <li onClick={()=>{setMenu("mens")}}> <Link to='/mens'>Mens</Link> {menu==='mens'&&<hr/>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link to='/womens'>Womens</Link> {menu==='womens'&&<hr/>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link> {menu==='kids'&&<hr/>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><button className="bg-blue-500">login</button></Link>
        <Link to='/cart'><img src='./cart_icon.png' alt="" /></Link>
        <div className="nav-cart-count">0</div>      
      </div>
    </div>
  );
};

export default Navbar;
