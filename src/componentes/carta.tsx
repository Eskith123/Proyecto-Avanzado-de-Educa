type Props = {
    numero: number;
    nombre: string;
    tipo: string;
    ataque:number;
    defensa:number;
    imagen:string;
    vida:number;
    velocidad:number;
};

function CardDetail({
    ataque,
    defensa,
    imagen,
    nombre,
    numero,
    tipo,
    vida,
    velocidad 
    
}: Props){
    return(
  
   //div principal//   
   <div className="flex flex-col items-center p-4">

  
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800">Tarjeta de Personaje</h1>
  </div>

  <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-12 max-w-4xl w-full p-4">

    {/* 1. Bloque de la Carta Visual (simula la tarjeta de la izquierda) */}
    <div className="w-full md:w-1/3 max-w-[200px] mx-auto bg-white shadow-xl border border-gray-300 rounded-xl p-3 flex flex-col items-center aspect-2/3">
      
      {/* Número en la esquina superior izquierda */}
      <div className="text-4xl font-extrabold text-gray-800 self-start">{numero}</div>
      
      {/* Contenedor de la Imagen */}
      <div className="my-auto w-45 h-45 border-gray-400 rounded-full flex items-center justify-center">
        {/* Usamos la imagen original aquí */}
        <img
          src={imagen}
          className="object-cover w-full h-full"
          alt="Imagen del personaje"
        />
      </div>
</div>


    {/* 2. Bloque de la Información (simula el texto de la derecha) */}
    <div className="w-full md:w-2/3 space-y-4 text-gray-800 md:pt-2">
      
      {/* Nombre (Etiqueta principal) */}
      <p className="text-xl font-bold mb-4">
        <span className="text-gray-900 mr-2">Nombre:</span>
        {nombre}
      </p>

      {/* **Estadísticas Clave (Ataque, Defensa, Vida)** - Usando los emojis originales */}
      
      <p className="text-lg">
        <span className="font-semibold w-32 inline-block">⚔️ Ataque:</span>
        <span className="font-bold text-xl text-yellow-600">{ataque}</span>
      </p>

      <p className="text-lg">
        <span className="font-semibold w-32 inline-block">🛡️ Defensa:</span>
        <span className="font-bold text-xl text-blue-600">{defensa}</span>
      </p>
      
      <p className="text-lg">
        <span className="font-semibold w-32 inline-block">❤️ Vida:</span>
        <span className="font-bold text-xl text-red-600">{vida}</span>
      </p>
      
      {/* Información Adicional (Tipo y Velocidad) */}
      <p className="text-base pt-4">
        <span className="font-semibold w-32 inline-block">🆎 Tipo:</span>
        <span className="font-bold text-xl text-green-600">{tipo}</span> 
      </p>
      
      <p className="text-base">
        <span className="font-semibold w-32 inline-block">⚡ Velocidad:</span>
        <span className="font-bold text-xl text-orange-600">{velocidad}</span> 
      </p>
      
      
    
    </div>

  </div>
</div>
   );
}

export default CardDetail;



