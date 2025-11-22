import './App.css';
import './componentes/carta';
import CardDetail from './componentes/carta';

function App() {
  return(
  <div>  
   <CardDetail
      ataque={123}
      nombre="Ceruledge"
      defensa={80}
      descripcion="Ceruledge se pone una armadura antigua cargada de rencores y empuña espadas hechas de fuego y energía fantasma. En combate, estas hojas se transforman en grandes espadas para aumentar el poder de Ceruledge. Los cortes de estas grandes espadas dejan heridas de las que fluirá la energía vital."
      imagen="https://img.pokemondb.net/artwork/large/ceruledge.jpg"
      numero={937}
      tipo="FUEGO Y FANTASMA"
      vida={75}
    />

   <CardDetail
      ataque={60}
      nombre="Armarouge"
      defensa={100}
      descripcion="El conjunto de armadura de Armarouge pertenecía a un guerrero distinguido y es la fuente de la energía utilizada para sus movimientos de tipo Psíquico. También utiliza las capacidades psíquicas de esta armadura para controlar la energía de fuego dentro de su cuerpo y desatar ataques."
      imagen="https://img.pokemondb.net/artwork/avif/armarouge.avif"
      numero={936}
      tipo="FUEGO Y PSIQUICO"
      vida={85}
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
       />

      <button className='cursor-pointer bg-blue-500 hover:bg-blue-700 transition duration-300 text-white font-bold py-2 px-4 rounded w-10 h-32'></button>
</div>
);
}

export default App;
