
import React from 'react';
import type { CartaProps } from '../tipos/tiposCarta';

const obtenerEstiloRaza = (raza: string) => { 
    switch (raza) {
        case 'Shinigami': return { claseBorde: 'border-red-600', claseTexto: 'text-red-400' };
        case 'Quincy': return { claseBorde: 'border-blue-400', claseTexto: 'text-blue-400' };
        case 'Arrancar': return { claseBorde: 'border-gray-300', claseTexto: 'text-gray-300' };
        case 'Hollow': return { claseBorde: 'border-green-500', claseTexto: 'text-green-500' };
        case 'Humano': return { claseBorde: 'border-white', claseTexto: 'text-white' };
        default: return { claseBorde: 'border-amber-600', claseTexto: 'text-amber-500' };
    }
};

interface CartaDisplayProps extends CartaProps {
    onCardClick: (carta: CartaProps) => void;
    onDelete: (id: number) => void;    
    onEdit: (carta: CartaProps) => void;     
}

const Carta: React.FC<CartaDisplayProps> = (props) => {
   
    const { id, name, attack, defense, lifepoint, pinctureUrl, raza } = props;
    const { claseBorde } = obtenerEstiloRaza(raza);

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
    };

    return (
        <div
            onClick={() => props.onCardClick(props)}
            className={`max-w-72 w-full rounded-xl overflow-hidden shadow-2xl m-3
                bg-gray-900 border-2 ${claseBorde} 
                transform transition duration-500 hover:scale-105 hover:shadow-red-900/50 cursor-pointer
                relative p-1
            `}
        >
           
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/90 to-transparent z-0 pointer-events-none"></div>

           
            <div className="absolute top-2 right-2 z-20 flex space-x-2">
                <button
                    onClick={(e) => { handleButtonClick(e); props.onEdit(props); }}
                    className="p-2 bg-blue-600/70 hover:bg-blue-600 rounded-full text-white transition-colors shadow-lg"
                    title="Editar Carta"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                </button>
                
                <button
                    onClick={(e) => { handleButtonClick(e); props.onDelete(id); }}
                    className="p-2 bg-red-600/70 hover:bg-red-700 rounded-full text-white transition-colors shadow-lg"
                    title="Eliminar Carta"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.86 12.14A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.86L5 7m5 4v6m4-6v6M1 7h22" />
                    </svg>
                </button>
            </div>

           
            <div className="h-48 overflow-hidden bg-black">
                <img
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    src={pinctureUrl}
                    alt={name}
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=Imagen+No+Encontrada'; }}
                />
            </div>
            
            
            <div className="relative z-10 px-4 py-3 text-white">
                <div className="border-b border-gray-700/50 pb-1 mb-2">
                    <h2 className="font-black text-xl leading-tight uppercase tracking-tighter text-red-500 truncate">
                        {name || "Sin Nombre"}
                    </h2>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{raza}</span>
                </div>

              
                <div className="flex justify-between items-center bg-black/40 rounded-lg p-2 border border-gray-800">
                    <div className="text-center">
                        <p className="text-[9px] text-gray-500 font-bold">ATK</p>
                        <p className="font-black text-red-600">{attack}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] text-gray-500 font-bold">DEF</p>
                        <p className="font-black text-blue-500">{defense}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[9px] text-gray-500 font-bold">VIT</p>
                        <p className="font-black text-green-500">{lifepoint}</p>
                    </div>
                </div>
            </div>
            
           
            <div className="relative z-10 px-4 pb-2 text-right">
                <span className="text-[9px] text-gray-600 font-mono tracking-widest uppercase">
                    ID-CORE: {id.toString().slice(-6)}
                </span>
            </div>
        </div>
    );
};

export default Carta;