import React from 'react'
import './NewCollection.css'
import { Link } from 'react-router-dom'

const NewCollection = () => {
  return (
    <div className='Collection'>
      <h1>NEW COLLECTION</h1>
      <p>Check out our new arrivals that refreshes your wardrobe with the season’s latest trends</p>
      <Link style={{textDecoration: 'none'}} to={'/shopall'}><button>Shop Now</button></Link>
    </div>
  )
}

export default NewCollection
