import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BooksPage } from './pages/BooksPage';
import { BooksFormPage } from './pages/BooksFormPage';
import { Navigation } from './components/Navigation';

function App(){
  return(
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Navigate to="/Books" />} />
      <Route path="/Books" element={<BooksPage/>} />
      <Route path="/Books-create" element={<BooksFormPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;