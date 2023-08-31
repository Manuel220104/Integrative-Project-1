import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Main } from './pages/Main';
import { AboutUs } from './pages/AboutUs';
import { ProductPage } from './pages/ProductPage';
import { Admin } from './pages/Admin';
import { Liked } from './pages/Liked';
import { CreateProduct } from './pages/CreateProduct'
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';




function App(){
  return(
    <BrowserRouter>
    <Navigation/>
    <Routes>
      {/* redirect to url element={<Navigate to="/Books" />} */}
      <Route path="/" element={<Main/>} />
      <Route path="/Productos" element={<ProductPage/>} />
      <Route path="/Crear-Productos" element={<CreateProduct/>} />
      <Route path="/Mis-MeGusta" element={<Liked/>} />
      <Route path="/Nosotros" element={<AboutUs/>} />
      <Route path="/Admin" element={<Admin/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App;