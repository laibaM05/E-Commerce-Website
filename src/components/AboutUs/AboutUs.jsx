import React, {useEffect} from 'react';
import './AboutUs.css';

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Fashion Store</h1>
        <p>Your Destination for Trendy, Affordable Fashion</p>
      </div>

      <div className="about-content">
        <section>
          <h2>Who We Are</h2>
          <p>
            Fashion Store is a leading online destination for fashion-forward individuals.
            Established in 2024, we are dedicated to bringing you the latest trends in apparel, accessories,
            and lifestyle — all at unbeatable prices. Whether you're dressing for work, a night out, or just everyday comfort,
            we have something for everyone.
          </p>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            Our mission is to make fashion accessible, enjoyable, and inspiring. We strive to provide a seamless online
            shopping experience where style meets convenience, and customer satisfaction is our top priority.
          </p>
        </section>

        <section>
          <h2>Why Shop With Us?</h2>
          <ul>
            <li>Curated collections with the latest trends</li>
            <li>Fast and reliable shipping</li>
            <li>Secure payment options</li>
            <li>Responsive customer support</li>
            <li>Easy returns & exchanges</li>
          </ul>
        </section>

        <section>
          <h2>Join Our Community</h2>
          <p>
            Follow us on social media and subscribe to our newsletter to get exclusive offers, fashion tips, and early
            access to new arrivals. Be part of the Fashion Store family and redefine your wardrobe — one outfit at a time.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
