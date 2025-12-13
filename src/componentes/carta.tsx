// src/componentes/Carta.tsx (Version Compacta)
import React from 'react';
import type { CartaProps } from '../Tipos/Carta';

const Carta: React.FC<CartaProps> = ({
  id,
  nombre,
  descripcion,
  ataque,
  defensa,
  vida,
  raza,
  imagenUrl,
}) => {

  const obtenerEstiloRaza = (raza: string) => {
    switch (raza) {
      case 'Shinigami':
        return {
          claseBorde: 'border-red-600',
          claseTexto: 'text-red-400',
          fondoRaza: 'bg-red-900/30'
        };
      case 'Quincy':
        return {
          claseBorde: 'border-blue-400',
          claseTexto: 'text-blue-400',
          fondoRaza: 'bg-blue-900/30'
        };
      case 'Arrancar':
        return {
          claseBorde: 'border-gray-300',
          claseTexto: 'text-gray-300',
          fondoRaza: 'bg-gray-800/50'
        };
      default:
        return {
          claseBorde: 'border-gray-500',
          claseTexto: 'text-gray-500',
          fondoRaza: 'bg-gray-800/50'
        };
    }
  };

  const { claseBorde, claseTexto, fondoRaza } = obtenerEstiloRaza(raza);

  return (
    <div
      // AQUI se ha reducido el tamaño: max-w-72 (casi 300px)
      className={`max-w-72 w-full rounded-xl overflow-hidden shadow-2xl m-3
        bg-gray-900 border-3 ${claseBorde} 
        transform transition duration-500 hover:scale-105 hover:shadow-red-900/50
        relative p-1
      `}
    >
        {/* Capa de fondo que simula energía (Reiatsu) */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-950/90 to-transparent z-0"></div>

      {/* Imagen */}
      <img
        // Se reduce la altura de la imagen
        className="w-full h-48 object-cover rounded-t-lg opacity-80"
        src={imagenUrl}
        alt={`Imagen de ${nombre}`}
      />

      {/* Contenido de la Carta */}
      <div className="relative z-10 px-4 py-3 text-white">

        {/* Nombre y Raza */}
        <div className="flex justify-between items-start mb-1 border-b border-gray-700 pb-1">
            <h2 
              // Fuente más pequeña
              className="font-extrabold text-xl leading-tight uppercase tracking-wider text-red-500"
            >
                {nombre}
            </h2>
            <p className={`text-xs font-light tracking-widest uppercase p-1 rounded ${fondoRaza} ${claseTexto}`}>
                {raza}
            </p>
        </div>
        
        {/* Descripción */}
        <p className="text-gray-400 text-xs mb-3 italic h-10 overflow-hidden">
          {descripcion}
        </p>

        {/* Separador */}
        <div className="my-2 h-px bg-red-600 opacity-50"></div>


        {/* Estadísticas */}
        <div className="flex justify-around text-center mt-3">
          
          <div className="flex flex-col items-center">
            <span className="text-lg font-extrabold text-red-600">{ataque}</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest">Ataque</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-lg font-extrabold text-blue-500">{defensa}</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest">Defensa</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-lg font-extrabold text-green-500">{vida}</span>
            <span className="text-xs text-gray-400 uppercase tracking-widest">Vida</span>
          </div>
        </div>
      </div>
      
      {/* Footer de la carta (ID) */}
      <div className="relative z-10 px-4 pt-1 pb-3 text-right">
        <span className="text-xs text-gray-600 font-mono tracking-widest">ID: {id.toString().padStart(3, '0')}</span>
      </div>
    </div>
  );
};

export default Carta;