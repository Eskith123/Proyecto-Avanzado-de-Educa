

import React from 'react';
import type { CartaProps } from '../tipos/tiposCarta';

const obtenerEstiloRaza = (raza: string) => {
  switch (raza) {
    case 'Shinigami': return { borde: 'border-red-600', texto: 'text-red-400' };
    case 'Quincy': return { borde: 'border-blue-400', texto: 'text-blue-400' };
    case 'Arrancar': return { borde: 'border-gray-400', texto: 'text-gray-300' };
    case 'Visored': return { borde: 'border-yellow-500', texto: 'text-yellow-400' };
    default: return { borde: 'border-gray-600', texto: 'text-gray-500' };
  }
};

interface ModalProps {
  carta: CartaProps;
  isOpen: boolean;
  onClose: () => void;
}

const ModalCartaDetalle: React.FC<ModalProps> = ({ carta, isOpen, onClose }) => {
 
  if (!isOpen || !carta) return null;

  const estilos = obtenerEstiloRaza(carta.raza);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex justify-center items-center p-4 backdrop-blur-sm">
      
     
      <div className={`bg-gray-900 border-4 ${estilos.borde} w-full max-w-4xl h-full max-h-[80vh] rounded-xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row`}>
        
     
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-4xl font-bold z-50 hover:text-red-600 p-2 transition-colors">
          &times;
        </button>

     
        <div className="w-full md:w-1/2 p-10 overflow-y-auto text-white flex flex-col relative z-10">
          <h1 className="text-5xl font-black mb-3 uppercase tracking-tighter italic text-red-500">
            {carta.name}
          </h1>
          <p className={`text-sm font-bold tracking-widest uppercase mb-8 border-b border-gray-800 pb-4 ${estilos.texto}`}>
            RAZA: {carta.raza} | ID: {carta.id}
          </p>

          <h3 className="text-red-500 font-bold uppercase text-xs mb-2 tracking-widest">Biografía y Habilidades:</h3>
          <p className="text-gray-300 text-lg leading-relaxed italic mb-10 bg-gray-950/50 p-4 rounded-lg border border-gray-800">
            {carta.description || "Esta carta no posee una descripción espiritual todavía."}
          </p>

          <h3 className="text-red-500 font-bold uppercase text-xs mb-4 tracking-widest">Estadísticas de Batalla:</h3>
          <div className="space-y-5 bg-gray-950/50 p-6 rounded-xl border border-gray-800">
            
           
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-500 uppercase font-black tracking-widest">Ataque</span>
              <span className="text-4xl font-black text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                {carta.attack || 0}
              </span>
            </div>

            
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-500 uppercase font-black tracking-widest">Defensa</span>
              <span className="text-4xl font-black text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                {carta.defense || 0}
              </span>
            </div>

           
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-gray-500 uppercase font-black tracking-widest">Puntos Vida</span>
              <span className="text-4xl font-black text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                {carta.lifepoint || 0}
              </span>
            </div>

          </div>
        </div>

       
        <div className="w-full md:w-1/2 bg-black flex justify-center items-center p-6 relative">
         
          <div className="absolute inset-0 bg-linear-to-t from-red-950/20 to-transparent"></div>
          
          <img 
            src={carta.pinctureUrl} 
            alt={carta.name} 
            className="max-h-full max-w-full object-contain rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] border-2 border-gray-800 z-10"
            onError={(e) => {
             
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Imagen+No+Encontrada';
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default ModalCartaDetalle;