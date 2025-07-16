import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideFooterPaths = ['/login', '/signup'];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      {children}
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default Layout;
