'use client'
import all_product from "@/Assets/all_product";
import React, { createContext } from "react";


export const ShopContext = createContext(null)

const ShopContextProvider = (props)=>{
  const contextValue = {all_product};

  return(
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider