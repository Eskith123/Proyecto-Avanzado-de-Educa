import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router';
import type { CartaProps } from './tipos/tiposCarta';
import Appv2 from './componentes/Appv2';

function App() {
  const [cartas, setCartas] = useState<CartaProps[]>([]);
  
  const getCartas = async () => {
      let urlAPI="https://educapi-v2.onrender.com/card";
      const respuesta = await fetch(urlAPI,{
        method:'GET',
        headers:{
          usersecretpasskey: "Yosk494348IO"
        }
      });

      const objeto = await respuesta.json();

     // setCartas(objeto.data);

      console.log(objeto.data);
    };
  
useEffect(() => {
  getCartas();
}, []);


  return (
     <Routes>
     
      <Route path="/" element={<Appv2 vista="inicio" cartas={cartas} setCartas={setCartas} />} />
      
      
      <Route path="/forja" element={<Appv2 vista="crear" cartas={cartas} setCartas={setCartas}/>} />

      
      <Route path="/carta/:id" element={<Appv2 vista="detalle" cartas={cartas} setCartas={setCartas}/>} />

      
      <Route path="/editar/:id" element={<Appv2 vista="editar" cartas={cartas} setCartas={setCartas}/>} />
    </Routes>
  );
}

export default App