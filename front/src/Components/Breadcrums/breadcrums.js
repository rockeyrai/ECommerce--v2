'use client';
import React from 'react';
import './Breadcrums.css';

const Breadcrums = (props) => {
  const { product } = props;

  return (
    <div className='breadcrum flex'>
      HOME <img className='h-5 w-5' src="/arrow_head.png" alt="arrow" /> SHOP <img className='h-5 w-5' src="/arrow_head.png" alt="arrow" /> {product.category}<img className='h-5 w-5' src="/arrow_head.png" alt="arrow" /> {product.name}
    </div>
  );
};

export default Breadcrums;
