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
      imagen="https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/52/latest/20220907144154/Ceruledge.png/1200px-Ceruledge.png"
      numero={937}
      tipo="FUEGO Y FANTASMA"
      vida={75}
    />
</div>);
}

export default App;
