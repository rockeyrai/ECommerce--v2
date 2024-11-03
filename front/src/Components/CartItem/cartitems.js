import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '@/Context/shopcontext';

const CartItems = () => {
  const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className='cartitmes'>
      <div className='cartitems-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className='cartitems-format cartitems-format-main'>
                <img src={e.image} alt={e.name} className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>Rs.{e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p >{e.new_price * cartItems[e.id]}</p>
                <img className='cartitems-remove-icon'
                  src='/cart_cross_icon.png'
                  alt='Remove item'
                  onClick={() => removeFromCart(e.id)}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null
      })}
      <div className='cartitems-down'>
        <div className='cartitems-total'>
          <h1>cart Total</h1>
          <div>
            <div className='cartitems-total-item'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className='cartitems-total-item'>
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <div className='cartitems-total-item'>
              <p>Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
          </div>
        <button>Proceed to checkout</button>
        </div>
        <div className='cartitems-promocode'>
          <p>If you have a promo code, Enter it here</p>
          <div className='cartitems-promobox'>
            <input placeholder='Promo Code' type='text'/>
            <button>Submit</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartItems;

