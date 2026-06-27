import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router';
import type { CartaProps } from './tipos/tiposCarta';
import Appv2 from './componentes/Appv2';
import PantallaBatalla from './componentes/PantallaBatalla';
import GenerarCartaIA from './componentes/GenerarCartaIA';

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

     setCartas(objeto.data);

      console.log(objeto.data);
    };
  
useEffect(() => {
  getCartas();
}, []);


  return (
     <Routes>
     
      <Route path="/" element={<Appv2 vista="inicio" cartas={cartas} setCartas={setCartas} />} />
      
      
      <Route path="/forja" element={<Appv2 vista="crear" cartas={cartas} setCartas={setCartas}/>} />

      
      <Route path="/carta/:idCard" element={<Appv2 vista="detalle" cartas={cartas} setCartas={setCartas}/>} />

      
      <Route path="/editar/:idCard" element={<Appv2 vista="editar" cartas={cartas} setCartas={setCartas}/>} />

      <Route path="/batalla/:id1/:id2" element={<PantallaBatalla cartas={cartas}  />} />

      <Route  path="/generar-carta-ia"  element={<GenerarCartaIA onCartaCreada={(nuevaCarta) => setCartas(prev => [nuevaCarta, ...prev])} />} />
    </Routes>
  );
}

export default App