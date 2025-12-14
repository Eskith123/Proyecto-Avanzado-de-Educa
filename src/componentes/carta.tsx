
import React from 'react';
import type { CartaProps } from '../tipos/Carta';



interface CartaDisplayProps extends CartaProps {
    onCardClick: (carta: CartaProps) => void;
}

const Carta: React.FC<CartaDisplayProps> = (props) => {
    
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
    
    const { claseBorde } = obtenerEstiloRaza(props.raza);

    return (
        <div
            onClick={() => props.onCardClick(props)}
            className={`max-w-72 w-full rounded-xl overflow-hidden shadow-2xl m-3
                bg-gray-900 border-3 ${claseBorde} 
                transform transition duration-500 hover:scale-105 hover:shadow-red-900/50 cursor-pointer
                relative p-1
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 to-transparent z-0"></div>

            <img
                className="w-full h-48 object-cover rounded-t-lg opacity-80"
                src={props.imagenUrl}
                alt={`Imagen de ${props.nombre}`}
            />
            
            <div className="relative z-10 px-4 py-3 text-white">
                <div className="flex justify-between items-start mb-1 border-b border-gray-700 pb-1">
                    <h2 className="font-extrabold text-xl leading-tight uppercase tracking-wider text-red-500">
                        {props.nombre}
                    </h2>
                </div>
                {/* Stats resumidos */}
                <div className="flex justify-around text-center mt-3">
                    <span className="text-lg font-extrabold text-red-600">{props.ataque}</span>
                    <span className="text-lg font-extrabold text-blue-500">{props.defensa}</span>
                    <span className="text-lg font-extrabold text-green-500">{props.vida}</span>
                </div>
            </div>
            
            <div className="relative z-10 px-4 pt-1 pb-3 text-right">
                <span className="text-xs text-gray-600 font-mono tracking-widest">ID: {props.id.toString().padStart(3, '0')}</span>
            </div>
        </div>
    );
};

export default Carta;