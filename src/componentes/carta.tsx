// src/componentes/Carta.tsx
import React from 'react';
import type { CartaProps } from '../tipos/Carta';

// ⚠️ IMPORTANTE: La función obtenerEstiloRaza debe estar definida aquí (copia del punto 2 anterior).
const obtenerEstiloRaza = (raza: string) => { 
    switch (raza) {
        case 'Shinigami': return { claseBorde: 'border-red-600', claseTexto: 'text-red-400', fondoRaza: 'bg-red-900/30' };
        case 'Quincy': return { claseBorde: 'border-blue-400', claseTexto: 'text-blue-400', fondoRaza: 'bg-blue-900/30' };
        case 'Arrancar': return { claseBorde: 'border-gray-300', claseTexto: 'text-gray-300', fondoRaza: 'bg-gray-800/50' };
        case 'Hollow': return { claseBorde: 'border-green-500', claseTexto: 'text-green-500', fondoRaza: 'bg-green-900/30' };
        case 'Visored': return { claseBorde: 'border-yellow-500', claseTexto: 'text-yellow-400', fondoRaza: 'bg-yellow-900/30' };
        default: return { claseBorde: 'border-amber-600', claseTexto: 'text-amber-500', fondoRaza: 'bg-amber-900/30' };
    }
};

// Interfaz que incluye las funciones de click, borrar y editar
interface CartaDisplayProps extends CartaProps {
    onCardClick: (carta: CartaProps) => void;
    onDelete: (id: number) => void;    // ⚠️ NUEVO: Función para borrar
    onEdit: (carta: CartaProps) => void;     // ⚠️ NUEVO: Función para editar
}

const Carta: React.FC<CartaDisplayProps> = (props) => {
    const { claseBorde } = obtenerEstiloRaza(props.raza);

    // Evita que el click en los botones active el onCardClick del contenedor
    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
    };

    return (
        // El contenedor principal activa la vista de detalle
        <div
            onClick={() => props.onCardClick(props)}
            className={`max-w-72 w-full rounded-xl overflow-hidden shadow-2xl m-3
                bg-gray-900 border-3 ${claseBorde} 
                transform transition duration-500 hover:scale-105 hover:shadow-red-900/50 cursor-pointer
                relative p-1
            `}
        >
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/90 to-transparent z-0"></div>

            {/* ZONA DE BOTONES DE ACCIÓN */}
            <div className="absolute top-2 right-2 z-20 flex space-x-2">
                
                {/* Botón Editar */}
                <button
                    onClick={(e) => { handleButtonClick(e); props.onEdit(props); }}
                    className="p-2 bg-blue-600/70 hover:bg-blue-600 rounded-full text-white transition-colors"
                    title="Editar Carta"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-3l-4 4L19 7l4 4-4-4zm4-4h.01M17 7l-4 4M17 7l4 4" />
                    </svg>
                </button>
                
                {/* Botón Borrar */}
                <button
                    onClick={(e) => { handleButtonClick(e); props.onDelete(props.id); }}
                    className="p-2 bg-red-600/70 hover:bg-red-700 rounded-full text-white transition-colors"
                    title="Eliminar Carta"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.86 12.14A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.86L5 7m5 4v6m4-6v6M1 7h22" />
                    </svg>
                </button>
            </div>

            {/* ... (El resto del contenido de la carta sigue igual) ... */}
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