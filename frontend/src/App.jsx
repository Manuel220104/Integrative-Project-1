import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, redirect } from 'react-router-dom';
import { Main } from './pages/User/Main';
import { AboutUs } from './pages/User/AboutUs';
//import { MyAccount } from './pages/User/MyAccount';
import { ProductPage } from './pages/User/ProductPage';
import { Admin } from './pages/Admin/Admin';
import { CreateCategories } from './pages/Admin/CreateCategories';
import { CreateLibrero } from './pages/Admin/CreateLibrero';
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
import { ProductAnalysis } from './pages/Admin/AnaliticaDatos';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ProductDetail } from './components/ProductDetail';

function App() {
  const location = useLocation();
  const [showFooter, setshowFooter] = useState(false);
  useEffect(() => {
    const currentURL = location.pathname;
    console.log(currentURL)
    if (currentURL === '/' || currentURL === '/Nosotros' || currentURL === '/Mis-MeGusta' || currentURL.includes('/Productos/DetalleProducto/') || currentURL === '/Productos') {
      setshowFooter(true);
    }
    else {
      setshowFooter(false);
    }
  }, [location.pathname]);


  const token = localStorage.getItem('token');
  const username_or_email = localStorage.getItem('username_or_email');
  const user_type = localStorage.getItem('user_type');

  return (
    <div>
      <Navigation />
      <Routes>
        {/* redirect to url element={<Navigate to="/Books" />} */}
        <Route path="/" element={<Main />} />
        <Route path="/Productos" element={<ProductPage />} />
        <Route path="/Productos/Libros" element={<ProductPage />} />
        <Route path="/Productos/InstrumentosMusicales" element={<ProductPage />} />
        <Route path="/Productos/JuegosDeMesa" element={<ProductPage />} />
        <Route path="/Productos/Tecnologia" element={<ProductPage />} />
        <Route path="/Productos/DetalleProducto/:productId" element={<ProductDetail />} />
        
        {/*
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admin/Crear-Productos" element={<CreateProduct />} />
        <Route path="/Admin/Editar-Libro/:productId" element={<EditBook />} />
        <Route path="/Admin/-Juegos-Mesa/:productId" element={<EditGames />} />
        <Route path="/Admin/Editar-Instrumentos-Musicales/:productId" element={<EditMusicalIns />} />
        <Route path="/Admin/-Tecnologia/:productId" element={<EditTechnology />} />
        <Route path="/Admin/-Informacion-Carrusel" element={<CreateCarouselInfo />} />
        <Route path="/Admin/-Categoria" element={<CreateCategories />} />
        <Route path="/Admin/Gestionar-Productos" element={<Crud />} />
        */}
        <Route path="/Mis-MeGusta" element={<Liked />} />
        <Route path="/Iniciar-Sesion" element={<Login />} />
        <Route path="/Registro-Usuario" element={<Signup />} />
        <Route path="/Nosotros" element={<AboutUs />} />
        {/* <Route path="/Mi-cuenta" element={<MyAccount />} /> */}

        {token && user_type === 'admin' ? (
          <Route path="/Admin" element={<Admin />} />
        ) : (
          <Route path="/Admin" element={<Main />} />
        )}

        {token && user_type === 'admin' ? (
          <Route path="/Admin/Crear-Productos" element={<CreateProduct />} />
        ) : (
          <Route path="/Admin/Crear-Productos" element={<Main />} />
        )}

        {token && user_type === 'admin' ? (
            <Route path="/Admin/Editar-Libro/:productId" element={<EditBook />} />
        ) : (
          <Route path="/Admin/Editar-Libro/:productId" element={<Main />} />
        )}

        {token && user_type === 'admin' ? (
            <Route path="/Admin/-Juegos-Mesa/:productId" element={<EditGames />} />
        ) : (
          <Route path="/Admin/-Juegos-Mesa/:productId" element={<Main />} />
        )}

        {token && user_type === 'admin' ? (
            <Route path="/Admin/Editar-Instrumentos-Musicales/:productId" element={<EditMusicalIns />} />
        ) : (
          <Route path="/Admin/Editar-Instrumentos-Musicales/:productId" element={<Main />} />
        )}

        {token && user_type === 'admin' ? (
            <Route path="/Admin/-Tecnologia/:productId" element={<EditTechnology />} />
        ) : (
          <Route path="/Admin/-Tecnologia/:productId" element={<Main />} />
        )}

        {token && user_type === 'admin' ? (
            <Route path="/Admin/-Informacion-Carrusel" element={<CreateCarouselInfo />} />
        ) : (
          <Route path="/Admin/-Informacion-Carrusel" element={<Main />} />

        )}

        {token && user_type === 'admin' ? (
            <Route path="/Admin/Crear-Categoria" element={<CreateCategories />} />
        ) : (
          <Route path="/Admin/Crear-Categoria" element={<Main />} />
        )}

        {token && user_type === 'admin' ? (
            <Route path="/Admin/Gestionar-Productos" element={<Crud />} />
        ) : (
          <Route path="/Admin/Gestionar-Productos" element={<Main />} />
        )}

        {token && user_type === 'admin' ? (
          <Route path="/Admin/Crear-Librero" element={<CreateLibrero />} />
        ) : (
          <Route path="/Admin/Crear-librero" element={<Main />} />
        )}

        {token && user_type === 'admin' ? (
          <Route path="/Admin/Analitica-de-Datos" element={<ProductAnalysis />} />
        ) : (
          <Route path="/Admin/Analitica-de-Datos" element={<Main />} />
        )}





      </Routes>
      {showFooter && <Footer />}
    </div>
  )
}

export default App;