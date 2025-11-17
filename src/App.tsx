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
      descripcion="Ceruledge está basado en un caballero medieval, en especial en el Cid Campeador, caballero de la Reconquista muy conocido en España por sus leyendas, pinturas, cantares y escrituras. También era muy conocido por sus dos famosas espadas: Tizona y Colada, como las que posee Ceruledge. Finalmente, el tipo fantasma está relacionado con la famosa leyenda de que el Cid ganó una batalla después de haber muerto.
                     Estecontenido proviene de wikidex.net, y debe darse atribución a sus autores, tal como especifica la licencia.
                       Se prohíbe su uso a PlagioDex (el wiki de FANDOOM), por copiar reiteradamente sin dar atribución"
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
</div>


  


);
}

export default App;
