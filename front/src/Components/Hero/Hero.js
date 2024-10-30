import React from 'react'
import './Hero.css'
const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>
        <h2>New ARRIVALS ONLY</h2>
        <div>
          <div className='hero-hand-icon'>
            <p>new</p>
            <img src='./hand_icon.png' alt=''/>
          </div>
          <p>collections</p>
          <p>for everyones</p>
        </div>
        <div className='hero-latest-btn'>
          <div>latest collection</div>
          <img src='arrow.png' className='h-5 w-5'/>
        </div>
      </div>
      <div className='hero-right'>
        <img src='hero_image.png'/>
        </div> 
    </div>
  )
}

export default Hero
