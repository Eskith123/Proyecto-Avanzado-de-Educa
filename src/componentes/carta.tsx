type Props = {
    numero: number;
    nombre: string;
    tipo: string;
    ataque:number;
    defensa:number;
    descripcion:string;
    imagen:string;
    vida:number;
};

function CardDetail({
    ataque,
    defensa,
    descripcion,
    imagen,
    nombre,
    numero,
    tipo,
    vida

}: Props){
    return(
       <div className="bg-gradient-to-br from-yellow-300 to-red-400 border-4 border-black rounded-xl shadow-xl p-4 w-72">
  <h2 className="text-2xl font-bold text-center text-white">{nombre}</h2>
  <img src={imagen} alt={nombre} className="w-full h-48 object-cover rounded-md" />
  <div className="mt-2 text-sm text-white">
    <p><strong>Tipo:</strong> {tipo}</p>
    <p><strong>Ataque:</strong> {ataque}</p>
    <p><strong>Defensa:</strong> {defensa}</p>
    <p><strong>Vida:</strong> {vida}</p>
    <p className="italic">{descripcion}</p>
  </div>
  <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 mt-2 rounded">Borrar</button>
</div>

    );
}

export default CardDetail;



