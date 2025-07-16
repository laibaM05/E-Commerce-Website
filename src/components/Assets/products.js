import img1 from './kids/image1.png';
import img2 from './kids/image2.png';
import img3 from './kids/image3.png';
import img5 from './men/image5.png';
import img6 from './men/image6.png';
import img7 from './men/image7.png';
import img8 from './men/image8.png';
import img9 from './men/image9.png';
import img10 from './men/image10.png';
import img11 from './men/image11.png';
import img12 from './men/image12.png';
import img13 from './men/image13.png';
import img15 from './women/image15.png';
import img16 from './women/image16.png';
import img17 from './women/image17.png';
import img18 from './women/image18.png';
import img19 from './women/image19.png';
import img20 from './women/image20.png';
import img21 from './women/image21.png';
import img22 from './women/image22.png';
import img23 from './women/image23.png';
import img24 from './women/image24.png';
import img25 from './women/image25.png';
import img26 from './women/image26.png';
import img27 from './women/image28.png';
const products = [
{
  id: 1,
  name: 'Playtime Shorts',
  category: 'kids',
  image: img1,
  price: 43.42,
  description: 'Comfortable sneakers designed for little feet.',
  rating: 4
},
{
  id: 2,
  name: 'Graphic Tee',
  category: 'kids',
  image: img2,
  price: 37.05,
  description: 'Durable shorts for active playtime.',
  rating: 5
},
{
  id: 3,
  name: 'Cartoon Hoodie',
  category: 'kids',
  image: img3,
  price: 56.71,
  description: 'Durable shorts for active playtime.',
  rating: 3
},
// {
//   id: 4,
//   name: 'Playtime Shorts',
//   category: 'kids',
//   image: img4,
//   price: 38.62,
//   description: 'Durable shorts for active playtime.',
//   rating: 4
// },
{
  id: 5,
  name: 'Casual Shirt',
  category: 'men',
  image: img5,
  price: 20.11,
  description: 'Perfect for formal occasions and office wear.',
  rating: 3
},
{
  id: 6,
  name: 'Leather Boots',
  category: 'men',
  image: img6,
  price: 52.04,
  description: 'High-quality leather boots for all-day comfort.',
  rating: 4
},
{
  id: 7,
  name: 'Leather Boots',
  category: 'men',
  image: img7,
  price: 16.63,
  description: 'High-quality leather boots for all-day comfort.',
  rating: 3
},
{
  id: 8,
  name: 'Formal Pants',
  category: 'men',
  image: img8,
  price: 29.57,
  description: 'Perfect for formal occasions and office wear.',
  rating: 5
},
{
  id: 9,
  name: 'Formal Pants',
  category: 'men',
  image: img9,
  price: 36.7,
  description: 'Perfect for formal occasions and office wear.',
  rating: 4
},
{
  id: 10,
  name: 'Leather Boots',
  category: 'men',
  image: img10,
  price: 30.46,
  description: 'Perfect for formal occasions and office wear.',
  rating: 5
},
{
  id: 11,
  name: 'Denim Jacket',
  category: 'men',
  image: img11,
  price: 29.42,
  description: 'High-quality leather boots for all-day comfort.',
  rating: 4
},
{
  id: 12,
  name: 'Formal Pants',
  category: 'men',
  image: img12,
  price: 51.11,
  description: 'High-quality leather boots for all-day comfort.',
  rating: 5
},
{
  id: 13,
  name: 'Denim Jacket',
  category: 'men',
  image: img13,
  price: 23.19,
  description: 'High-quality leather boots for all-day comfort.',
  rating: 3
},
// {
//   id: 14,
//   name: 'Formal Pants',
//   category: 'men',
//   image: img14,
//   price: 15.29,
//   description: 'Classic denim with a modern twist.',
//   rating: 4
// },
{
  id: 15,
  name: 'Skinny Jeans',
  category: 'women',
  image: img15,
  price: 42.67,
  description: 'Lightweight dress ideal for summer outings.',
  rating: 4
},
{
  id: 16,
  name: 'Skinny Jeans',
  category: 'women',
  image: img16,
  price: 57.93,
  description: 'Elegant top suitable for both work and casual wear.',
  rating: 5
},
{
  id: 17,
  name: 'Heeled Sandals',
  category: 'women',
  image: img17,
  price: 54.21,
  description: 'Comfortable and fashionable sandals.',
  rating: 3
},
{
  id: 18,
  name: 'Skinny Jeans',
  category: 'women',
  image: img18,
  price: 45.37,
  description: 'Comfortable and fashionable sandals.',
  rating: 4
},
{
  id: 19,
  name: 'Summer Dress',
  category: 'women',
  image: img19,
  price: 27.96,
  description: 'Trendy and stretchy jeans with a flattering fit.',
  rating: 4
},
{
  id: 20,
  name: 'Heeled Sandals',
  category: 'women',
  image: img20,
  price: 17.03,
  description: 'Elegant top suitable for both work and casual wear.',
  rating: 3
},
{
  id: 21,
  name: 'Summer Dress',
  category: 'women',
  image: img21,
  price: 53.99,
  description: 'Trendy and stretchy jeans with a flattering fit.',
  rating: 5
},
{
  id: 22,
  name: 'Summer Dress',
  category: 'women',
  image: img22,
  price: 58.48,
  description: 'Trendy and stretchy jeans with a flattering fit.',
  rating: 4
},
{
  id: 23,
  name: 'Summer Dress',
  category: 'women',
  image: img23,
  price: 31.67,
  description: 'Trendy and stretchy jeans with a flattering fit.',
  rating: 5
},
{
  id: 24,
  name: 'Blouse Top',
  category: 'women',
  image: img24,
  price: 51.12,
  description: 'Trendy and stretchy jeans with a flattering fit.',
  rating: 4
},
{
  id: 25,
  name: 'Skinny Jeans',
  category: 'women',
  image: img25,
  price: 49.14,
  description: 'Elegant top suitable for both work and casual wear.',
  rating: 5
},
{
  id: 26,
  name: 'Skinny Jeans',
  category: 'women',
  image: img26,
  price: 37.84,
  description: 'Comfortable and fashionable sandals.',
  rating: 3
},
{
  id: 27,
  name: 'Blouse Top',
  category: 'women',
  image: img27,
  price: 30.29,
  description: 'Elegant top suitable for both work and casual wear.',
  rating: 4
},
// {
//   id: 28,
//   name: 'Skinny Jeans',
//   category: 'women',
//   image: img28,
//   price: 27.93,
//   description: 'Elegant top suitable for both work and casual wear.',
//   rating: 5
// }
];

export default products;