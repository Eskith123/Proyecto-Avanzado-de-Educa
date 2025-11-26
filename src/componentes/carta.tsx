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
   <div className="flex items-start justify-center min-h-screen bg-gray-900 p-8">
  <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
    <div className="bg-white/95 border-4 border-yellow-500 rounded-2xl shadow-2xl p-3 w-64 font-sans transform hover:scale-105 transition duration-300" >
      {/* Sección Superior - Nombre y Número */}
      <div className="flex justify-between items-center mb-2 px-1">
        <h2 className="text-xl font-extrabold text-gray-800 uppercase tracking-wider">{nombre}</h2>
        <span className="text-base font-bold text-gray-600">N.º {numero}</span>
      </div>
    
      {/* Marco de Imagen */}
      <div className="border-4 border-gray-700 bg-gray-200 rounded-lg overflow-hidden shadow-inner-lg">
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-40 object-cover object-center"
          />
      </div>
    
      {/* Etiqueta de Tipo */}
      <div className="text-center my-2">
        <span className="inline-block bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
          Tipo: {tipo}
        </span>
      </div>
    
      {/* Estadísticas de Combate */}
      <div className="mt-2 p-2 border-2 border-red-500 bg-red-100/70 rounded-lg shadow-inner">
        <h3 className="text-sm font-bold text-red-700 mb-1 border-b border-red-300 pb-1">Stats Base</h3>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs font-semibold">
          <p className="text-gray-800"><span className="text-red-600">❤️ Vida:</span> {vida}</p>
          <p className="text-gray-800"><span className="text-blue-600">🛡️ Defensa:</span> {defensa}</p>
          <p className="text-gray-800"><span className="text-orange-600">⚔️ Ataque:</span> {ataque}</p>
          <p className="text-gray-800"><span className="text-yellow-600">⚡ Velocidad:</span> {velocidad}</p>
        </div>
      </div>
    
      {/* Descripción / Texto de Sabor */}
      <p className="mt-3 text-xs text-gray-600 italic border-t border-gray-300 pt-2 px-1">
        "{descripcion}"
      </p>
    
      <div className="flex justify-between gap-2 mt-4">
        <button 
        className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 text-sm rounded-lg shadow-lg uppercase tracking-wider transition duration-150 transform hover:scale-[1.02]"
        >
          ✏️ Editar
        </button>
        <button 
        className="w-1/2 bg-red-600 hover:bg-red-800 text-white font-bold py-1.5 text-sm rounded-lg shadow-lg uppercase tracking-wider transition duration-150 transform hover:scale-[1.02]"
        >
          🗑️ Borrar
        </button>
      </div>
    </div>
    </div>
</div>
    );
}

export default CardDetail;



