'use client'
import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { ShopContext } from "@/Context/shopcontext";


const Navbar = () => {

  const [menu,setMenu]= useState('shop')
 const {getTotalCartItems} = useContext(ShopContext)
 const menuRef = useRef()

 const dropdown_toggle = (e)=>{
  menuRef.current.classList.toggle('nav-menu-visible');
  e.target.classList.toggle('open')
 }
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src='./logo.png' alt="" />
        <p>Rockey</p>
      </div>
      <img className="nav-dropdown" onClick={dropdown_toggle} src="/nav_dropdown.png"/>
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link to='/'>Shop</Link>  {menu==='shop'&&<hr/>}</li>
        <li onClick={()=>{setMenu("mens")}}> <Link to='/mens'>Mens</Link> {menu==='mens'&&<hr/>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link to='/womens'>Womens</Link> {menu==='womens'&&<hr/>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link> {menu==='kids'&&<hr/>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><button className="bg-blue-500">login</button></Link>
        <Link to='/cart'><img src='./cart_icon.png' alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>      
      </div>
    </div>
  );
};

export default Navbar;
