import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/Home';
import Cart from './pages/cart';
import Product from './pages/product';
import Categories from './pages/categories';
import AboutUs from './pages/AboutUs'
import More from './pages/More'
import Women from './pages/women'
import Men from './pages/men'
import Kids from './pages/kids'
import AllCollection from './pages/AllCollection';
import Layout from './Layout';
import { Routes,Route } from 'react-router-dom';
import SearchResults from './pages/SearchResults';
import Checkoutpage from './pages/Checkoutpage';

function App() {
  return (
    <div>
      <Layout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/more' element={<More/>}/>
        <Route path='/men' element={<Men/>}/>
        <Route path='/women' element={<Women/>}/>
        <Route path='/kids' element={<Kids/>}/>
        <Route path='/shopall' element={<AllCollection/>}/>
        <Route path='/checkout' element={<Checkoutpage/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='search' element={<SearchResults/>}/>
      </Routes>
      </Layout>
    </div>
  );
}

export default App;
