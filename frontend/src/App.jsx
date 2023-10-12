import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Main } from './pages/User/Main';
import { AboutUs } from './pages/User/AboutUs';
import { ProductPage } from './pages/User/ProductPage';
import { Admin } from './pages/Admin/Admin';
import { CreateCategories } from './pages/Admin/CreateCategories';
import { Liked } from './pages/User/Liked';
import { Login } from './pages/Login_and_sign_up/Login';
import { Signup } from './pages/Login_and_sign_up/Signup';
import { CreateProduct } from './pages/Admin/CrudProductos/Create/CreateProduct';
import { EditBook } from './pages/Admin/CrudProductos/Edit/EditBook';
import { EditGames } from './pages/Admin/CrudProductos/Edit/EditGames';
import { EditMusicalIns } from './pages/Admin/CrudProductos/Edit/EditMusicalIns';
import { EditTechnology } from './pages/Admin/CrudProductos/Edit/EditTechnology';

import { Crud } from './pages/Admin/CrudProductos/Crud';
import { CreateCarouselInfo } from './pages/Admin/CreateCarouselInfo';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ProductDetail } from './components/ProductDetail';

function App() {
  const location = useLocation();
  const [showFooter, setshowFooter] = useState(false);
  useEffect(() => {
    const currentURL = location.pathname;
    console.log(currentURL)
    if (currentURL === '/' || currentURL === '/Nosotros' || currentURL === '/Mis-MeGusta' || currentURL.includes('/Productos/DetalleProducto/') || currentURL === '/Productos'){
      setshowFooter(true); 
    } 
    else {
      setshowFooter(false); 
    }
  }, [location.pathname]);

  return (
    <div>
      <Navigation />
      <Routes>
        {/* redirect to url element={<Navigate to="/Books" />} */}
        <Route path="/" element={<Main />} />
        <Route path="/Productos" element={<ProductPage />}/>
        <Route path="/Productos/Libros" element={<ProductPage />} />
        <Route path="/Productos/InstrumentosMusicales" element={<ProductPage />} />
        <Route path="/Productos/JuegosDeMesa" element={<ProductPage />} />
        <Route path="/Productos/Tecnologia" element={<ProductPage />} />
        <Route path="/Productos/DetalleProducto/:productId" element={<ProductDetail />} />
        <Route path="/Gestionar-Productos" element={<Crud />} />
        <Route path="/Crear-Productos" element={<CreateProduct />} />
        <Route path="/Editar-Libro/:productId" element={<EditBook />} />
        <Route path="/Editar-Juegos-Mesa/:productId" element={<EditGames />} />
        <Route path="/Editar-Instrumentos-Musicales/:productId" element={<EditMusicalIns />} />
        <Route path="/Editar-Tecnologia/:productId" element={<EditTechnology />} />
        <Route path="/Crear-Informacion-Carrusel" element={<CreateCarouselInfo />} />
        <Route path="/Crear-Categoria" element={<CreateCategories />} />
        <Route path="/Mis-MeGusta" element={<Liked />} />
        <Route path="/Iniciar-Sesion" element={<Login />} />
        <Route path="/Registro-Usuario" element={<Signup />} />
        <Route path="/Nosotros" element={<AboutUs />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
      {showFooter && <Footer/>}
      </div>
  )
}

export default App;