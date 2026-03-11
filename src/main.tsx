import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<App vista="inicio" />} />
      
      
      <Route path="/forja" element={<App vista="crear" />} />

      
      <Route path="/carta/:id" element={<App vista="detalle" />} />

      
      <Route path="/editar/:id" element={<App vista="editar" />} />
    </Routes>
  </BrowserRouter>
)