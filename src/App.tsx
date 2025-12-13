import { useState } from 'react';
import './App.css';
import './componentes/carta';
import CardDetail from './componentes/carta';


function App() {
  return(
  <div>  
    <CardDetail 
      ataque={125}
      nombre="Ceruledge"
      defensa={80}
      imagen="https://img.pokemondb.net/artwork/large/ceruledge.jpg"
      numero={937}
      tipo="FUEGO Y FANTASMA"
      vida={75}
      velocidad={85}
    />
  </div>
);
}

export default App;
