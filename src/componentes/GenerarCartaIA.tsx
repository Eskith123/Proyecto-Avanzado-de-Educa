import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartaProps } from '../tipos/tiposCarta';
import Carta from './ComponenteCarta';

interface GenerarCartaIAProps {
    onCartaCreada: (nuevaCarta: CartaProps) => void;
}

const GenerarCartaIA: React.FC<GenerarCartaIAProps> = ({ onCartaCreada }) => {
    const navigate = useNavigate();
    const [cardPrompt, setCardPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cartaGenerada, setCartaGenerada] = useState<CartaProps | null>(null);

   
    const globalContext = "Temática Anime TCG, guerreros, monstruos y personajes legendarios. Ataque entre 10 y 120, defensa entre 10 y 100, vida entre 50 y 250.";

    const manejarGeneracion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cardPrompt.trim()) return;

        setLoading(true);
        setError(null);
        setCartaGenerada(null);

        try {
            const response = await fetch('https://educapi-v2.onrender.com/ai/generate-card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'usersecretpasskey': "Yosk494348IO",
                },
                body: JSON.stringify({
                    globalContext: globalContext,
                    cardPrompt: cardPrompt
                })
            });

            if (!response.ok) {
                if (response.status === 503) {
                    throw new Error("La IA no está disponible en este momento. ¡Inténtalo de nuevo!");
                }
                throw new Error("Error al invocar la energía de la IA. Revisa tu conexión o credenciales.");
            }

            const data = await response.json();

          
            const nuevaCarta: CartaProps = {
                idCard: data.idCard,
                name: data.name,
                description: data.description,
                attack: data.attack,
                defense: data.defense,
                lifePoints: data.lifePoints,
                pictureUrl: data.pictureUrl,
                habilidad: 'ATAQUE'
            };

            setCartaGenerada(nuevaCarta);
            onCartaCreada(nuevaCarta);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error inesperado en el nexo cuántico.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-no-repeat p-6 flex flex-col items-center justify-start relative overflow-x-hidden select-none"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.85), rgba(3, 7, 18, 0.9)), url('https://i.pinimg.com/736x/5f/1c/25/5f1c2537e865d412ccdddfc4f08f4f49.jpg')` }}
        >
            
            <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-2 text-center pt-12 md:pt-6">
                NEXO DE <span className="text-purple-500 animate-pulse">INVOCACIÓN IA</span>
            </h1>
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-bold mb-10 text-center">
                Canaliza tu prompt para materializar una carta legendaria en la base de datos
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 w-full max-w-5xl">
                
               
                <div className="w-full max-w-lg bg-gray-950/80 border border-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
                    <form onSubmit={manejarGeneracion} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-purple-400 mb-2">
                                🔮 Atributos y Concepto de la Carta:
                            </label>
                            <textarea
                                value={cardPrompt}
                                onChange={(e) => setCardPrompt(e.target.value)}
                                placeholder="Ej. Un guerrero saiyajin maligno envuelto en un aura oscura, dominando el fuego negro..."
                                disabled={loading}
                                rows={4}
                                className="w-full bg-black/60 border border-gray-800 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none font-medium"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-950/40 border border-red-800 rounded-xl text-xs font-bold text-red-400 animate-shake">
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !cardPrompt.trim()}
                            className={`w-full font-black py-4 px-6 rounded-xl uppercase text-xs tracking-widest transition-all ${
                                loading 
                                ? 'bg-gray-900 text-gray-500 border border-gray-800 cursor-not-allowed'
                                : 'bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg active:scale-[0.98]'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-t-purple-400 border-r-transparent border-b-purple-400 border-l-transparent rounded-full animate-spin"></div>
                                    <span>Materializando Ente...</span>
                                </div>
                            ) : (
                                "👁️ Generar Carta Legendaria"
                            )}
                        </button>
                    </form>
                </div>

             
                <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-[320px]">
                    {loading && (
                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full animate-spin"></div>
                            <p className="text-xs font-black uppercase text-gray-400 tracking-wider animate-pulse">
                                Reconfigurando Ilustración y Atributos...
                            </p>
                        </div>
                    )}

                    {!loading && !cartaGenerada && (
                        <div className="border-2 border-dashed border-gray-800 rounded-2xl p-8 text-center text-gray-600 flex flex-col items-center justify-center w-full h-[430px] bg-black/20">
                            <span className="text-4xl mb-3">🎴</span>
                            <p className="text-xs font-bold uppercase tracking-wider">
                                La Carta se manifestará aquí tras la invocación
                            </p>
                        </div>
                    )}

                    {!loading && cartaGenerada && (
                        <div className="animate-fade-in flex flex-col items-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-green-400 bg-green-950/30 border border-green-900/50 px-3 py-1 rounded-full mb-4 animate-pulse">
                                ¡Invocación Exitosa!
                            </p>
                            <Carta 
                            estaSeleccionada={false} {...cartaGenerada}
                            onToggleSeleccion={() => { } }
                            onCardClick={() => { } }
                            onDelete={() => { } }
                            onEdit={() => { } }
                            ocultarAcciones={true}
                            ocultarSeleccionar={true}                            />
                        </div>
                    )}
                </div>

            </div>

            
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
                <button 
                    onClick={() => navigate('/')}
                    disabled={loading}
                    className="bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white font-black py-3 px-8 rounded-full transition-all border border-gray-800 uppercase text-[10px] tracking-widest shadow-xl disabled:opacity-50"
                >
                    Volver al Mazo
                </button>
            </div>
        </div>
    );
};

export default GenerarCartaIA;