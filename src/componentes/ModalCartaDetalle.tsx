
import React from 'react';
import type { CartaProps } from '../tipos/Carta';



interface ModalProps {
  carta: CartaProps;
  isOpen: boolean;
  onClose: () => void;
}

const ModalCartaDetalle: React.FC<ModalProps> = ({ carta, isOpen, onClose }) => {
  if (!isOpen) return null;

  
  const obtenerEstiloRaza = (raza: string) => { 
    switch (raza) {
        case 'Shinigami': return { claseBorde: 'border-red-600', claseTexto: 'text-red-400', fondoRaza: 'bg-red-900/30' };
        case 'Quincy': return { claseBorde: 'border-blue-400', claseTexto: 'text-blue-400', fondoRaza: 'bg-blue-900/30' };
        case 'Arrancar': return { claseBorde: 'border-gray-300', claseTexto: 'text-gray-300', fondoRaza: 'bg-gray-800/50' };
        case 'Hollow': return { claseBorde: 'border-green-500', claseTexto: 'text-green-500', fondoRaza: 'bg-green-900/30' };
        case 'Visored': return { claseBorde: 'border-yellow-500', claseTexto: 'text-yellow-400', fondoRaza: 'bg-yellow-900/30' };
        case 'Humano': return { claseBorde: 'border-amber-600', claseTexto: 'text-amber-500', fondoRaza: 'bg-amber-900/30' };
        default: return { claseBorde: 'border-gray-500', claseTexto: 'text-gray-500', fondoRaza: 'bg-gray-800/50' };
    }
  };

  const estilos = obtenerEstiloRaza(carta.raza);
  const claseRazaTexto = estilos.claseTexto;
  const bordeRaza = estilos.claseBorde;

  return (
    
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center p-4">
      
      
      <div className={`bg-gray-900 border-4 ${bordeRaza} w-full max-w-4xl h-full max-h-[80vh] rounded-xl shadow-2xl overflow-hidden relative`}>
        
       
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold p-2 z-20 hover:text-red-600 transition-colors"
        >
          &times;
        </button>

       
        <div className="flex h-full">
          
          
          <div className="w-1/2 p-8 overflow-y-auto text-white">
            
            <h1 className={`text-5xl font-extrabold mb-2 uppercase ${claseRazaTexto}`}>
              {carta.nombre}
            </h1>
            <p className={`text-lg font-light tracking-widest uppercase mb-6 border-b pb-4 ${claseRazaTexto}`}>
              Raza: {carta.raza} (ID: {carta.id.toString().padStart(3, '0')})
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2 text-red-400">Descripción:</h3>
            <p className="text-gray-300 text-base leading-relaxed italic mb-8">
              {carta.descripcion}
            </p>

            <h3 className="text-xl font-semibold mb-3 text-red-400">Estadísticas:</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-gray-400 uppercase tracking-widest">ATAQUE</span>
                <span className="text-3xl font-extrabold text-red-600">{carta.ataque}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-gray-400 uppercase tracking-widest">DEFENSA</span>
                <span className="text-3xl font-extrabold text-blue-500">{carta.defensa}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <span className="text-gray-400 uppercase tracking-widest">VIDA</span>
                <span className="text-3xl font-extrabold text-green-500">{carta.vida}</span>
              </div>
            </div>

          </div>

          
          <div className="w-1/2 p-4 flex justify-center items-center bg-gray-950">
            <img
              src={carta.imagenUrl}
              alt={carta.nombre}
              className={`max-h-full w-auto object-contain rounded-lg border-2 ${bordeRaza}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCartaDetalle;