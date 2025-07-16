import React, { useState, useEffect } from 'react'
import './Hero.css'
import model1 from '../Assets/model.png'
import model2 from '../Assets/model2.png'
import model3 from '../Assets/model3.png'
import { Link } from 'react-router-dom'

const images = [model1, model2, model3];
const imageClasses = ['model-img-1', 'model-img-2', 'model-img-3'];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 1500) 

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])
  const p1 = "Experience the future of shopping. From the moment\nyou browse to the excitement of unboxing, every\nstep has been thoughtfully crafted to bring joy and\nconvenience at your door step. Elevate your \neveryday purchases into a rewarding journey\nwhere style, quality, and satisfaction meet";
  return (
    <section>
    <div className='Hero'>
      <div className="Hero-left">
        <h3>Summer Season Sale Upto 70% OFF</h3>
        <h1>Elevate Your Shopping<br/> Experience Today!</h1>
        <p style={{ whiteSpace: 'pre-line' }}>{p1}</p>
        <Link to={'/shopall'}><button>Explore Now</button></Link>
      </div>
      <div className="Hero-right">
        <div className="pinkBckg"></div>
        <img src={images[currentImageIndex]} alt="Model" className={`model-img ${imageClasses[currentImageIndex]}`} />
      </div>
    </div>
    </section>
  )
}

export default Hero
