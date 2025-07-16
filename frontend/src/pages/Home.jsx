import React, {useEffect} from 'react'
import Hero from '../components/Hero/Hero'
import NewCollection from '../components/NewCollection/NewCollection'
import ShopByCategory from '../components/ShopByCategory/ShopByCategory'
import ExlusiveBlack from '../components/ExclusiveBlack/ExclusiveBlack'
import Subscribe from '../components/Subscribe/Subscribe'
// import Footer from '../components/Footer/Footer'

const Home = () => {

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <Hero/>
      <NewCollection/>
      <ShopByCategory/>
      <ExlusiveBlack/>
      <Subscribe/>
      {/* <Footer/> */}
    </div>
  )
}

export default Home
