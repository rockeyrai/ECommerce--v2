import Hero from "@/Components/Hero/Hero";
import NewCollection from "@/Components/NewCollection/newcollection";
import Offers from "@/Components/Offers/offers";
import Popular from "@/Components/Popular/popular";

import React from "react";

const Shop = () => {
  return (
    <div>
      <Hero /> 
   <Popular/> 
   <Offers/> 
       <NewCollection/>
    </div>
  );
};

export default Shop;
