import React from 'react'
import './Subscribe.css'

const Subscribe = () => {
  return (
    <div className="subscribe">
        <h1>Subscribe To Get 50% Discount</h1>
        <div className="subscribe-box">
            <input type="email" placeholder="Email Address" />
            <button type="submit">Subscribe</button>
        </div>
    </div>
  )
}

export default Subscribe
