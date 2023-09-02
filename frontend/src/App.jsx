import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Main } from './pages/Main';
import { AboutUs } from './pages/AboutUs';
import { ProductPage } from './pages/ProductPage';
import { Admin } from './pages/Admin';
import { Liked } from './pages/Liked';
import { CreateProduct } from './pages/CreateProduct';
import { EditProduct } from './pages/EditProduct';
import { DeleteProduct } from './pages/DeleteProduct';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';


function App() {

  const [showFooter, setShowFooter] = useState([]);;
    useEffect(() => {
      const handleShowFooter = () => {
        const location = window.location.pathname;
        const shouldShowFooter = !location.includes('/admin');
        setShowFooter(shouldShowFooter);
      };
      handleShowFooter();
  },[window.location.pathname]);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* redirect to url element={<Navigate to="/Books" />} */}
        <Route path="/" element={<Main />} />
        <Route path="/Productos" element={<ProductPage />} />
        <Route path="/Crear-Productos" element={<CreateProduct />} />
        <Route path="/Editar-Productos" element={<EditProduct />} />
        <Route path="/Delete-Productos" element={<DeleteProduct />} />
        <Route path="/Mis-MeGusta" element={<Liked />} />
        <Route path="/Nosotros" element={<AboutUs />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
      {showFooter && <Footer/>} 
    </BrowserRouter>
  )
}

export default App;