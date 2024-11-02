'use client';
import Breadcrums from '@/Components/Breadcrums/breadcrums';
import { ShopContext } from '@/Context/shopcontext';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  
  console.log('all_Product:', all_product); // Debugging line
  console.log('productId:', productId); // Debugging line

  // Check if all_Product is defined before filtering
  const product =  all_product.find((e) => e.id === Number(productId))

  return (
    <div>
      <Breadcrums product={product} />
    </div>
  );
}

export default Product;
