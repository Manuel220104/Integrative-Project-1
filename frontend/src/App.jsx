import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AcentosPage } from './pages/AcentosPage';
import { AcentosFormPage } from './pages/AcentosFormPage';
import { Navigation } from './components/Navigation';

function App(){
  return(
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Navigate to="/Acentos" />} />
      <Route path="/Acentos" element={<AcentosPage/>} />
      <Route path="/Acentos-create" element={<AcentosFormPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;