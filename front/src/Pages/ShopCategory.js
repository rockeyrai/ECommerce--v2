import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '@/Context/shopcontext'
import Item from '@/Components/Item/Item'

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner}/>
      <div className='shopcategory-indexSort'>
        <p><span>Showing 1-12</span>out of 36 products </p>
        <div className='shopcategory-sort'>
          sort by <img src='dropdown_icon.png'/>

        </div>
      </div>
      <div className='shopcategory-products'>
        {all_product.map((item,i)=>{
          if(props.category === item.category){
            console.log('working')
            return <Item 
            key={i} 
            id={item.id} 
            name={item.name} 
            image={item.image}  // This should be a string
            new_price={item.new_price} 
            old_price={item.old_price} 
          />
          }else{    console.log('not-working')
             return null }
        })}
      </div>
      <div className='shopcategory-loadmore'>
        Explore More
      </div>
      
    </div>
  )
}

export default ShopCategory
