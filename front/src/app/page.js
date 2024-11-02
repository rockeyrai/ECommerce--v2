"use client";
import Footer from "@/Components/Footer/footer";
import Navbar from "@/Components/Navbar/Navbar";
import Cart from "@/Pages/Cart";
import LoginSignup from "@/Pages/LoginSignup";
import Product from "@/Pages/Product";
import Shop from "@/Pages/Shop";
import ShopCategory from "@/Pages/ShopCategory";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCategory banner={"banner_mens.png"} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={"banner_women.png"} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={"banner_kids.png"} category="kid" />} />     
          <Route path="product" element={<Product />}>
            <Route path=":productId" element={<product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}
