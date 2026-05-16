
import React from 'react';
import type { CartaProps } from '../tipos/tiposCarta';


interface CartaDisplayProps extends CartaProps {
    onCardClick: (carta: CartaProps) => void;
    onDelete: (id: number) => void;    
    onEdit: (carta: CartaProps) => void;
    estaSeleccionada: boolean;
    onToggleSeleccion: (id: number) => void;
}

const Carta: React.FC<CartaDisplayProps> = (props) => {
    const { idCard, name, attack, defense, lifePoints, pictureUrl, raza } = props;
   
    return (
        <div
            onClick={() => props.onCardClick(props)}
            className={`max-w-72 w-full rounded-xl overflow-hidden shadow-2xl m-3 bg-gray-900 border-2  relative p-1 transition-all hover:scale-105 ${props.estaSeleccionada ? 'ring-4 ring-red-600' : ''}`}
        >
           
            <div className="absolute top-2 right-2 z-20 flex space-x-2">
                <button onClick={(e) => { e.stopPropagation(); props.onEdit(props); }} className="p-2 bg-blue-600/70 rounded-full text-white hover:bg-blue-600 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                <button onClick={(e) => { e.stopPropagation(); props.onDelete(idCard); }} className="p-2 bg-red-600/70 rounded-full text-white hover:bg-red-700 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.86 12.14A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.86L5 7m5 4v6m4-6v6M1 7h22" /></svg></button>
            </div>

            <div className="h-48 overflow-hidden bg-black">
                <img className="w-full h-full object-cover opacity-90" src={pictureUrl} alt={name} />
            </div>
            
            <div className="px-4 py-3">
                <h2 className="font-black text-xl uppercase text-red-500 truncate">{name}</h2>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{raza}</span>

                
                <div className="flex justify-between items-center bg-black/40 rounded-lg p-2 border border-gray-800 mt-2 mb-4">
                    <div className="text-center"><p className="text-[9px] text-gray-500">ATK</p><p className="font-black text-red-600">{attack}</p></div>
                    <div className="text-center"><p className="text-[9px] text-gray-500">DEF</p><p className="font-black text-blue-500">{defense}</p></div>
                    <div className="text-center"><p className="text-[9px] text-gray-500">VIT</p><p className="font-black text-green-500">{lifePoints}</p></div>
                </div>

                
                <button 
                    onClick={(e) => { e.stopPropagation(); props.onToggleSeleccion(idCard); }}
                    className={`w-full py-2 rounded-lg font-black text-[10px] uppercase transition-all ${props.estaSeleccionada ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                >
                    {props.estaSeleccionada ? '✓ Seleccionada' : 'Seleccionar'}
                </button>
            </div>

            <div className="px-4 pb-2 text-right">
                <span className="text-[8px] text-gray-600 font-mono">ID: {idCard}</span>
            </div>
        </div>
    );
};

export default Carta;