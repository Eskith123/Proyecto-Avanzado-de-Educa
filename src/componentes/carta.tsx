type Props = {
    numero: number;
    nombre: string;
    tipo: string;
    ataque:number;
    defensa:number;
    descripcion:string;
    imagen:string;
    vida:number;
    velocidad:number;
};

function CardDetail({
    ataque,
    defensa,
    descripcion,
    imagen,
    nombre,
    numero,
    tipo,
    vida,
    velocidad 
    
}: Props){
    return(
  
   <div className="bg-gray-900 p-8 min-h-screen flex justify-center items-start">
  <div className="max-w-6xl flex flex-wrap justify-center gap-6">

    <div className="bg-white border-4 border-yellow-500 rounded-xl shadow-xl p-3 w-64 transition duration-300 hover:scale-105">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold uppercase text-gray-800">{nombre}</h2>
        <span className="text-base font-semibold text-gray-600">N.º {numero}</span>
      </div>

      <div className="border-4 border-gray-700 rounded-lg overflow-hidden">
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-40 object-cover"
        />
      </div>

      <div className="text-center my-2">
        <span className="inline-block bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          Tipo: {tipo}
        </span>
      </div>

      <div className="mt-2 p-2 border-2 border-red-500 bg-red-100 rounded-lg">
        <h3 className="text-sm font-bold text-red-700 mb-1 border-b border-red-300">Stats Base</h3>
        <div className="grid grid-cols-2 gap-x-2 text-xs font-medium">
          <p><span className="text-red-600">❤️ Vida:</span> {vida}</p>
          <p><span className="text-blue-600">🛡️ Defensa:</span> {defensa}</p>
          <p><span className="text-orange-600">⚔️ Ataque:</span> {ataque}</p>
          <p><span className="text-yellow-600">⚡ Velocidad:</span> {velocidad}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-600 italic border-t border-gray-300 pt-2">
        "{descripcion}"
      </p>
   </div>
  </div>
</div>
    );
}

export default CardDetail;



