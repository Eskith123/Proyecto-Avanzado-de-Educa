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
      descripcion="Ceruledge se pone una armadura antigua cargada de rencores y empuña espadas hechas de fuego y energía fantasma. En combate, estas hojas se transforman en grandes espadas para aumentar el poder de Ceruledge. Los cortes de estas grandes espadas dejan heridas de las que fluirá la energía vital."
      imagen="https://img.pokemondb.net/artwork/large/ceruledge.jpg"
      numero={937}
      tipo="FUEGO Y FANTASMA"
      vida={75}
      velocidad={85}
    />

   <CardDetail
      ataque={608}
      nombre="Armarouge"
      defensa={100}
      descripcion="El conjunto de armadura de Armarouge pertenecía a un guerrero distinguido y es la fuente de la energía utilizada para sus movimientos de tipo Psíquico. También utiliza las capacidades psíquicas de esta armadura para controlar la energía de fuego dentro de su cuerpo y desatar ataques."
      imagen="https://img.pokemondb.net/artwork/avif/armarouge.avif"
      numero={936}
      tipo="FUEGO Y PSIQUICO"
      vida={85}
      velocidad={75}
    />

    <CardDetail
      ataque={90}
      nombre="Hatterene"
      defensa={95}
      descripcion="Si haces demasiado ruido a su alrededor, corres el riesgo de que las garras de su tentáculo te destrozen. Este Pokémon también es conocido como la Bruja del Bosque."
      imagen="https://img.pokemondb.net/artwork/avif/hatterene.avif"
      numero={858}
      tipo="PSIQUICO Y HADA"
      vida={57}
      velocidad={29}
       />

     <CardDetail
      ataque={98}
      nombre="Toxtricity"
      defensa={95}
      descripcion="Tiene un órgano eléctrico en el pecho. Mientras genera electricidad, llena su entorno con lo que suena como el rasgueo de un bajo."
      imagen="https://img.pokemondb.net/artwork/large/toxtricity-amped.jpg"
      numero={849}
      tipo="ELECTRICO Y VENENO"
      vida={75}
      velocidad={75}
       />

       <CardDetail
      ataque={125}
      nombre="Golisopod"
      defensa={140}
      descripcion="Hace lo que sea por conseguir la victoria. Si el rival se descuida, aprovecha para asestarle un golpe letal con sus pequeñas garras frontales."
      imagen="https://img.pokemondb.net/artwork/large/golisopod.jpg"
      numero={768}
      tipo="BICHO Y AGUA"
      vida={75}
      velocidad={40}
       /> 

      
</div>
);
}

export default App;
