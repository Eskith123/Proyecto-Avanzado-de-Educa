import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CartaProps } from '../tipos/tiposCarta';
import Carta from './ComponenteCarta';

interface BatallaProps {
    cartas: CartaProps[];
}

const PantallaBatalla: React.FC<BatallaProps> = ({ cartas }) => {
    const { id1, id2 } = useParams();
    const navigate = useNavigate();
    
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCargando(false);
        }, 2500); 

        return () => clearTimeout(timer);
    }, []);

    const luchador1 = cartas.find(c => Number(c.idCard) === Number(id1));
    const luchador2 = cartas.find(c => Number(c.idCard) === Number(id2));

    if (cargando) {
        return (
            <div 
                className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white relative"
                style={{ 
                    backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.85), rgba(3, 7, 18, 0.9)), url('https://i.pinimg.com/736x/8d/19/f7/8d19f7cea4bb799e34a3f1c0173ef6bf.jpg')` 
                }}
            >
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-t-red-600 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-sm uppercase tracking-widest text-white animate-pulse">
                        VS
                    </div>
                </div>
                <h2 className="text-xl font-black uppercase italic tracking-widest text-gray-300 animate-pulse">
                    Preparando la Arena de Combate...
                </h2>
                <p className="text-xs text-gray-500 mt-2 font-mono">Invocando personajes...</p>
            </div>
        );
    }

    if (!luchador1 || !luchador2) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center p-6">
                <p className="text-red-500 text-xl font-bold uppercase">Error: No se encontraron los luchadores en el mazo.</p>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg uppercase text-sm transition-all"
                >
                    Volver al Mazo
                </button>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-no-repeat p-6 flex flex-col items-center justify-start relative overflow-x-hidden"
            style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.8), rgba(3, 7, 18, 0.85)), url('https://i.pinimg.com/736x/5f/1c/25/5f1c2537e865d412ccdddfc4f08f4f49.jpg')` 
            }}
        >
           
            <button 
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-gray-900/90 hover:bg-gray-800 border border-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-all font-bold uppercase text-[10px] tracking-widest shadow-2xl"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al Mazo
            </button>

            <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-12 text-center pt-12 md:pt-0">
                ARENA DE <span className="text-red-600">BATALLA</span>
            </h1>

           
            <div className="flex flex-wrap justify-center items-center gap-8 w-full max-w-6xl mb-12">
                
               
                <div className="transition-all duration-700 transform translate-x-0">
                    <div className="text-center mb-4">
                        <span className="bg-red-600 text-white px-5 py-1 rounded-full font-black uppercase text-[10px] tracking-wider shadow-lg">
                            Retador 1
                        </span>
                    </div>
                   
                    <Carta 
                        {...luchador1} 
                        estaSeleccionada={false} 
                        onToggleSeleccion={() => {}} 
                        onCardClick={() => {}} 
                        onDelete={() => {}} 
                        onEdit={() => {}} 
                        ocultarAcciones={true}
                        ocultarSeleccionar={true}
                    />
                </div>

               
                <div className="text-6xl md:text-7xl font-black text-white italic opacity-40 my-4 md:my-0 tracking-tighter scale-110">
                    VS
                </div>

               
                <div className="transition-all duration-700 transform translate-x-0">
                    <div className="text-center mb-4">
                        <span className="bg-blue-600 text-white px-5 py-1 rounded-full font-black uppercase text-[10px] tracking-wider shadow-lg">
                            Retador 2
                        </span>
                    </div>
                   
                    <Carta 
                        {...luchador2} 
                        estaSeleccionada={false} 
                        onToggleSeleccion={() => {}} 
                        onCardClick={() => {}} 
                        onDelete={() => {}} 
                        onEdit={() => {}} 
                        ocultarAcciones={true}
                        ocultarSeleccionar={true}
                    />
                </div>
            </div>

           
            <div className="w-full max-w-2xl bg-gray-950/80 border border-gray-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md mb-8">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Logs de Batalla
                    </h3>
                    <span className="text-[10px] font-mono text-gray-600">TURNO 1: {luchador1.name}</span>
                </div>

               
                <div className="flex flex-col gap-2">
                   
                    <div className="flex items-center gap-3 p-2.5 bg-black/30 border-l-4 border-amber-500 rounded-r-lg">
                        <span className="text-amber-400 font-black text-xs uppercase tracking-wider bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            Turno 1
                        </span>
                        <p className="text-gray-300 text-sm">
                            <span className="text-red-500 font-bold uppercase tracking-tight">{luchador1.name}</span> hizo <span className="text-yellow-400 font-extrabold">90</span> de daño a <span className="text-blue-400 font-bold uppercase tracking-tight">{luchador2.name}</span>
                        </p>
                    </div>

                   
                    <div className="flex items-center gap-3 p-2.5 bg-black/30 border-l-4 border-amber-500 rounded-r-lg">
                        <span className="text-amber-400 font-black text-xs uppercase tracking-wider bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            Turno 2
                        </span>
                        <p className="text-gray-300 text-sm">
                            <span className="text-red-500 font-bold uppercase tracking-tight">{luchador2.name}</span> hizo <span className="text-yellow-400 font-extrabold">70</span> de daño a <span className="text-blue-400 font-bold uppercase tracking-tight">{luchador1.name}</span>
                        </p>
                    </div>

                  
                    <div className="flex items-center gap-3 p-2.5 bg-black/30 border-l-4 border-amber-500 rounded-r-lg">
                        <span className="text-amber-400 font-black text-xs uppercase tracking-wider bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            Turno 3
                        </span>
                        <p className="text-gray-300 text-sm">
                            <span className="text-red-500 font-bold uppercase tracking-tight">{luchador1.name}</span> hizo <span className="text-yellow-400 font-extrabold">90</span> de daño a <span className="text-blue-400 font-bold uppercase tracking-tight">{luchador2.name}</span>
                        </p>
                    </div>
                </div>

                
                <div className="mt-4 pt-2 border-t border-gray-900 flex justify-end">
                    <button className="bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 font-bold py-2 px-4 rounded-xl uppercase text-[10px] tracking-wider transition-all">
                        Siguiente Turno
                    </button>
                </div>
            </div>

          
            <button 
                onClick={() => navigate('/')}
                className="bg-gray-900 hover:bg-red-600 text-gray-400 hover:text-white font-black py-3 px-10 rounded-full transition-all border border-gray-800 hover:border-red-600 uppercase text-xs tracking-widest shadow-xl"
            >
                Abandonar Combate
            </button>
        </div>
    );
};

export default PantallaBatalla;

