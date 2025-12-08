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
</div>
);
}

export default App;
