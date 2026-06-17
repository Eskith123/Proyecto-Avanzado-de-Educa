import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CartaProps } from '../tipos/tiposCarta';
import Carta from './ComponenteCarta';

interface BatallaProps {
    cartas: CartaProps[];
}

interface LogTurno {
    id: number;
    numeroTurno: number;
    mensaje: string;
    tipo: 'ataque' | 'defensa' | 'curacion' | 'sistema';
}

interface EfectoVisual {
    texto: string;
    tipo: 'daño' | 'defensa' | 'curacion' | 'buff_ataque';
}

const PantallaBatalla: React.FC<BatallaProps> = ({ cartas }) => {
    const { id1, id2 } = useParams();
    const navigate = useNavigate();
    
    const [cargando, setCargando] = useState(true);

   
    const luchador1 = cartas.find(c => Number(c.idCard) === Number(id1));
    const luchador2 = cartas.find(c => Number(c.idCard) === Number(id2));

   
    const maxVidaJ1 = luchador1?.lifePoints || 100;
    const maxDefensaJ1 = luchador1?.defense || 100;
    const maxAtaqueJ1 = luchador1?.attack || 100;

    const maxVidaJ2 = luchador2?.lifePoints || 100;
    const maxDefensaJ2 = luchador2?.defense || 100;
    const maxAtaqueJ2 = luchador2?.attack || 100;


    const [vidaJ1, setVidaJ1] = useState(0);
    const [defensaJ1, setDefensaJ1] = useState(0);
    const [ataqueJ1, setAtaqueJ1] = useState(0); 
    
    const [vidaJ2, setVidaJ2] = useState(0);
    const [defensaJ2, setDefensaJ2] = useState(0);
    const [ataqueJ2, setAtaqueJ2] = useState(0);

   
    const [turnoActual, setTurnoActual] = useState(1);
    const [esTurnoJ1, setEsTurnoJ1] = useState(true);
    const [ganador, setGanador] = useState<string | null>(null);
    const [historialLogs, setHistorialLogs] = useState<LogTurno[]>([]);

    
    const [animacionJ1, setAnimacionJ1] = useState<string>('');
    const [animacionJ2, setAnimacionJ2] = useState<string>('');
    const [efectoFlotanteJ1, setEfectoFlotanteJ1] = useState<EfectoVisual | null>(null);
    const [efectoFlotanteJ2, setEfectoFlotanteJ2] = useState<EfectoVisual | null>(null);

   
    useEffect(() => {
        if (luchador1 && luchador2) {
            setVidaJ1(maxVidaJ1);
            setDefensaJ1(maxDefensaJ1);
            setAtaqueJ1(maxAtaqueJ1);
            
            setVidaJ2(maxVidaJ2);
            setDefensaJ2(maxDefensaJ2);
            setAtaqueJ2(maxAtaqueJ2);

            const j1Inicia = Math.random() < 0.5;
            setEsTurnoJ1(j1Inicia);

            setHistorialLogs([
                {
                    id: Date.now(),
                    numeroTurno: 0,
                    mensaje: `⚔️ ¡Duelo de voluntades! Los medidores de energía están sincronizados. Inicia el combate: ${j1Inicia ? luchador1.name : luchador2.name}.`,
                    tipo: 'sistema'
                }
            ]);
        }

        const timer = setTimeout(() => {
            setCargando(false);
        }, 2500); 

        return () => clearTimeout(timer);
    }, [luchador1, luchador2]);

    
    useEffect(() => {
        if (!cargando && luchador1 && luchador2) {
            if (vidaJ1 <= 0 && vidaJ2 <= 0) {
                setGanador("¡Colisión destructiva! Empate técnico.");
            } else if (vidaJ1 <= 0) {
                setGanador(luchador2.name);
            } else if (vidaJ2 <= 0) {
                setGanador(luchador1.name);
            }
        }
    }, [vidaJ1, vidaJ2, cargando, luchador1, luchador2]);

    if (cargando) {
        return (
            <div 
                className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white relative"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.85), rgba(3, 7, 18, 0.9)), url('https://i.pinimg.com/736x/8d/19/f7/8d19f7cea4bb799e34a3f1c0173ef6bf.jpg')` }}
            >
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-t-red-600 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-sm uppercase tracking-widest text-white animate-pulse">VS</div>
                </div>
                <h2 className="text-xl font-black uppercase italic tracking-widest text-gray-300 animate-pulse">Preparando la Arena de Combate...</h2>
            </div>
        );
    }

    if (!luchador1 || !luchador2) return null;

    
    const manejarSiguienteTurno = () => {
        if (ganador) return;

        const atacante = esTurnoJ1 ? luchador1 : luchador2;
        
       
        const seed = Math.random();
        let habilidadTurno: 'ATAQUE' | 'DEFENSIVA' | 'CURATIVA' = 'ATAQUE';
        if (seed > 0.5 && seed <= 0.75) habilidadTurno = 'DEFENSIVA';
        if (seed > 0.75) habilidadTurno = 'CURATIVA';

      
        const factorRNG = Number((Math.random() * (1.3 - 0.8) + 0.8).toFixed(2));

        let mensajeLog = "";
        let tipoAccion: LogTurno['tipo'] = 'sistema';

        setAnimacionJ1('');
        setAnimacionJ2('');

        if (habilidadTurno === 'ATAQUE') {
            tipoAccion = 'ataque';
            
            const statsAtaqueMomento = esTurnoJ1 ? ataqueJ1 : ataqueJ2;
            const dañoCalculado = Math.min(Math.floor(statsAtaqueMomento * factorRNG), 100);

            if (esTurnoJ1) {
                setAnimacionJ1('translate-x-8 scale-105 transition-transform duration-200');
                setAnimacionJ2('animate-shake bg-red-950/20');
                setEfectoFlotanteJ2({ texto: `-${dañoCalculado} HP`, tipo: 'daño' });

                if (defensaJ2 > 0) {
                    const diff = defensaJ2 - dañoCalculado;
                    if (diff < 0) {
                        setDefensaJ2(0);
                        setVidaJ2(prev => Math.max(prev - Math.abs(diff), 0));
                        mensajeLog = `⚔️ ¡${atacante.name} desató un impacto de ${dañoCalculado} (RNG: x${factorRNG}), destruyendo el escudo de ${luchador2.name} y restando ${Math.abs(diff)} HP!`;
                    } else {
                        setDefensaJ2(diff);
                        mensajeLog = `🛡️ ¡El escudo de ${luchador2.name} resistió el embate de ${dañoCalculado} pts de ${atacante.name}!`;
                    }
                } else {
                    setVidaJ2(prev => Math.max(prev - dañoCalculado, 0));
                    mensajeLog = `💥 ¡Golpe directo! ${atacante.name} inflige ${dañoCalculado} HP de daño real a ${luchador2.name}.`;
                }
                
                
                const debuffAtaque = Math.floor(10 * factorRNG);
                setAtaqueJ2(prev => Math.max(prev - debuffAtaque, 10));
            } else {
                
                setAnimacionJ2('-translate-x-8 scale-105 transition-transform duration-200');
                setAnimacionJ1('animate-shake bg-red-950/20');
                setEfectoFlotanteJ1({ texto: `-${dañoCalculado} HP`, tipo: 'daño' });

                if (defensaJ1 > 0) {
                    const diff = defensaJ1 - dañoCalculado;
                    if (diff < 0) {
                        setDefensaJ1(0);
                        setVidaJ1(prev => Math.max(prev - Math.abs(diff), 0));
                        mensajeLog = `⚔️ ¡Rival ${atacante.name} golpea por ${dañoCalculado} pts (RNG: x${factorRNG}), rompiendo tu guardia y drenando ${Math.abs(diff)} de vida!`;
                    } else {
                        setDefensaJ1(diff);
                        mensajeLog = `🛡️ ¡Tu escudo absorbió con éxito la ráfaga de ${dañoCalculado} de daño del oponente!`;
                    }
                } else {
                    setVidaJ1(prev => Math.max(prev - dañoCalculado, 0));
                    mensajeLog = `💥 ¡Alerta! ${atacante.name} te asesta un golpe directo al cuerpo de ${dañoCalculado} HP.`;
                }

                const debuffAtaque = Math.floor(10 * factorRNG);
                setAtaqueJ1(prev => Math.max(prev - debuffAtaque, 10));
            }
        } 
        else if (habilidadTurno === 'DEFENSIVA') {
            tipoAccion = 'defensa';
            
            const aumentoDef = Math.min(Math.floor((esTurnoJ1 ? maxDefensaJ1 : maxDefensaJ1) * 0.25 * factorRNG), 80);
            
            if (esTurnoJ1) {
                setDefensaJ1(prev => prev + aumentoDef);
                setAnimacionJ1('ring-4 ring-blue-500 transition-all');
                setEfectoFlotanteJ1({ texto: `+${aumentoDef} DEF`, tipo: 'defensa' });
            } else {
                setDefensaJ2(prev => prev + aumentoDef);
                setAnimacionJ2('ring-4 ring-blue-500 transition-all');
                setEfectoFlotanteJ2({ texto: `+${aumentoDef} DEF`, tipo: 'defensa' });
            }
            mensajeLog = `🛡️ ¡Aumento de Guardia! ${atacante.name} incrementa dinámicamente su resistencia en +${aumentoDef} (RNG: x${factorRNG}).`;
        } 
        else if (habilidadTurno === 'CURATIVA') {
            tipoAccion = 'curacion';
           
            const curacionEfectiva = Math.min(Math.floor(40 * factorRNG), 50);
            const buffAtaqueEfectivo = Math.floor(20 * factorRNG);

            if (esTurnoJ1) {
                setVidaJ1(prev => Math.min(prev + curacionEfectiva, maxVidaJ1));
                setAtaqueJ1(prev => prev + buffAtaqueEfectivo); 
                setAnimacionJ1('ring-4 ring-green-500 transition-all');
                setEfectoFlotanteJ1({ texto: `+${curacionEfectiva} HP / +${buffAtaqueEfectivo} ATQ`, tipo: 'curacion' });
            } else {
                setVidaJ2(prev => Math.min(prev + curacionEfectiva, maxVidaJ2));
                setAtaqueJ2(prev => prev + buffAtaqueEfectivo); 
                setAnimacionJ2('ring-4 ring-green-500 transition-all');
                setEfectoFlotanteJ2({ texto: `+${curacionEfectiva} HP / +${buffAtaqueEfectivo} ATQ`, tipo: 'curacion' });
            }
            mensajeLog = `💖 ¡Artes Sagradas! ${atacante.name} se sana por +${curacionEfectiva} HP y su adrenalina aumenta su ataque en +${buffAtaqueEfectivo}.`;
        }

        setTimeout(() => {
            setEfectoFlotanteJ1(null);
            setEfectoFlotanteJ2(null);
            setAnimacionJ1('');
            setAnimacionJ2('');
        }, 1200);

        setHistorialLogs(prev => [{ id: Date.now(), numeroTurno: turnoActual, mensaje: mensajeLog, tipo: tipoAccion }, ...prev]);
        setEsTurnoJ1(!esTurnoJ1);
        setTurnoActual(prev => prev + 1);
    };

   
    const pctVidaJ1 = Math.max(0, (vidaJ1 / maxVidaJ1) * 100);
    const pctDefensaJ1 = Math.max(0, (defensaJ1 / maxDefensaJ1) * 100);
    const pctAtaqueJ1 = Math.max(0, (ataqueJ1 / (maxAtaqueJ1 * 1.5)) * 100);

    const pctVidaJ2 = Math.max(0, (vidaJ2 / maxVidaJ2) * 100);
    const pctDefensaJ2 = Math.max(0, (defensaJ2 / maxDefensaJ2) * 100);
    const pctAtaqueJ2 = Math.max(0, (ataqueJ2 / (maxAtaqueJ2 * 1.5)) * 100);

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-no-repeat p-6 flex flex-col items-center justify-start relative overflow-x-hidden select-none"
            style={{ backgroundImage: `linear-gradient(to bottom, rgba(3, 7, 18, 0.8), rgba(3, 7, 18, 0.85)), url('https://i.pinimg.com/736x/5f/1c/25/5f1c2537e865d412ccdddfc4f08f4f49.jpg')` }}
        >
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-6px); }
                    40%, 80% { transform: translateX(6px); }
                }
                .animate-shake { animation: shake 0.4s ease-in-out; }
            `}</style>

            <h1 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-12 text-center pt-12 md:pt-0">
                ARENA DE <span className="text-red-600">BATALLA</span>
            </h1>

            {ganador && (
                <div className="w-full max-w-2xl bg-linear-to-r from-amber-600 to-red-700 border-2 border-yellow-400 rounded-2xl p-6 mb-8 text-center shadow-2xl">
                    <h2 className="text-3xl font-black uppercase text-white tracking-widest italic animate-pulse">🏆 ¡GANADOR: {ganador.toUpperCase()}! 🏆</h2>
                </div>
            )}

            <div className="flex flex-wrap justify-center items-center gap-8 w-full max-w-6xl mb-12 relative">
                
              
                <div className={`relative flex flex-col items-center ${animacionJ1}`}>
                    {efectoFlotanteJ1 && (
                        <span className={`absolute -top-12 text-3xl font-black z-50 animate-bounce tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,1)] ${
                            efectoFlotanteJ1.tipo === 'daño' ? 'text-red-500' : efectoFlotanteJ1.tipo === 'defensa' ? 'text-blue-400' : 'text-green-400'
                        }`}>
                            {efectoFlotanteJ1.texto}
                        </span>
                    )}

                    <div className="text-center mb-3">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                            esTurnoJ1 && !ganador ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-800 text-gray-500'
                        }`}>
                            {esTurnoJ1 ? '👉 Tu Turno' : 'Espera'}
                        </span>
                    </div>

                    <Carta {...luchador1} estaSeleccionada={false} onToggleSeleccion={() => {}} onCardClick={() => {}} onDelete={() => {}} onEdit={() => {}} ocultarAcciones={true} ocultarSeleccionar={true} />
                    
                
                    <div className="mt-4 bg-gray-950/90 p-4 rounded-xl border border-gray-800 text-xs font-bold space-y-3 w-full max-w-[280px] shadow-2xl">
                        <div>
                            <div className="flex justify-between text-green-400 mb-1">
                                <span>VIDA REAL:</span>
                                <span>{vidaJ1} / {maxVidaJ1} HP</span>
                            </div>
                            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                                <div className="bg-linear-to-r from-green-600 to-green-400 h-2 transition-all duration-500 ease-out" style={{ width: `${pctVidaJ1}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-blue-400 mb-1">
                                <span>ESCUDO REAL:</span>
                                <span>{defensaJ1} DEF</span>
                            </div>
                            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                                <div className="bg-linear-to-r from-blue-600 to-blue-400 h-2 transition-all duration-500 ease-out" style={{ width: `${pctDefensaJ1}%` }}></div>
                            </div>
                        </div>

                        
                        <div>
                            <div className="flex justify-between text-red-500 mb-1">
                                <span>ATAQUE EN TIEMPO REAL:</span>
                                <span>{ataqueJ1} ATQ</span>
                            </div>
                            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                                <div className="bg-linear-to-r from-red-600 to-orange-500 h-2 transition-all duration-500 ease-out" style={{ width: `${pctAtaqueJ1}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-6xl md:text-7xl font-black text-white italic opacity-25 my-4 md:my-0 tracking-tighter">VS</div>

               
                <div className={`relative flex flex-col items-center ${animacionJ2}`}>
                    {efectoFlotanteJ2 && (
                        <span className={`absolute -top-12 text-3xl font-black z-50 animate-bounce tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,1)] ${
                            efectoFlotanteJ2.tipo === 'daño' ? 'text-red-500' : efectoFlotanteJ2.tipo === 'defensa' ? 'text-blue-400' : 'text-green-400'
                        }`}>
                            {efectoFlotanteJ2.texto}
                        </span>
                    )}

                    <div className="text-center mb-3">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                            !esTurnoJ1 && !ganador ? 'bg-blue-600 text-white animate-pulse' : 'bg-gray-800 text-gray-500'
                        }`}>
                            {!esTurnoJ1 ? '👉 Turno Rival' : 'Espera'}
                        </span>
                    </div>

                    <Carta {...luchador2} estaSeleccionada={false} onToggleSeleccion={() => {}} onCardClick={() => {}} onDelete={() => {}} onEdit={() => {}} ocultarAcciones={true} ocultarSeleccionar={true} />
                    
                  
                    <div className="mt-4 bg-gray-950/90 p-4 rounded-xl border border-gray-800 text-xs font-bold space-y-3 w-full max-w-[280px] shadow-2xl">
                        <div>
                            <div className="flex justify-between text-green-400 mb-1">
                                <span>VIDA REAL:</span>
                                <span>{vidaJ2} / {maxVidaJ2} HP</span>
                            </div>
                            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                                <div className="bg-linear-to-r from-green-600 to-green-400 h-2 transition-all duration-500 ease-out" style={{ width: `${pctVidaJ2}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-blue-400 mb-1">
                                <span>ESCUDO REAL:</span>
                                <span>{defensaJ2} DEF</span>
                            </div>
                            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                                <div className="bg-linear-to-r from-blue-600 to-blue-400 h-2 transition-all duration-500 ease-out" style={{ width: `${pctDefensaJ2}%` }}></div>
                            </div>
                        </div>

                      
                        <div>
                            <div className="flex justify-between text-red-500 mb-1">
                                <span>ATAQUE EN TIEMPO REAL:</span>
                                <span>{ataqueJ2} ATQ</span>
                            </div>
                            <div className="w-full bg-gray-900 rounded-full h-2 overflow-hidden border border-gray-800">
                                <div className="bg-linear-to-r from-red-600 to-orange-500 h-2 transition-all duration-500 ease-out" style={{ width: `${pctAtaqueJ2}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
            <div className="w-full max-w-2xl bg-gray-950/80 border border-gray-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md mb-8">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-3">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Historial del Campo de Batalla
                    </h3>
                    <span className="text-[10px] font-mono text-gray-500">
                        Próximo movimiento: {esTurnoJ1 ? luchador1.name : luchador2.name}
                    </span>
                </div>

                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                    {historialLogs.map((log) => {
                        let borderCol = "border-amber-500";
                        if (log.tipo === 'ataque') borderCol = "border-red-600";
                        if (log.tipo === 'defensa') borderCol = "border-blue-500";
                        if (log.tipo === 'curacion') borderCol = "border-green-500";

                        return (
                            <div key={log.id} className={`flex items-center gap-3 p-2.5 bg-black/40 border-l-4 ${borderCol} rounded-r-lg text-white`}>
                                <span className="text-gray-400 font-mono text-[10px] bg-gray-900 px-1.5 py-0.5 rounded border border-gray-800">
                                    T- {log.numeroTurno}
                                </span>
                                <p className="text-gray-300 text-xs md:text-sm">{log.mensaje}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 pt-2 border-t border-gray-900 flex justify-end">
                    <button 
                        onClick={manejarSiguienteTurno}
                        disabled={!!ganador}
                        className={`font-bold py-2.5 px-6 rounded-xl uppercase text-[10px] tracking-wider transition-all ${
                            ganador 
                            ? 'bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed' 
                            : 'bg-red-600 hover:bg-red-700 text-white shadow-lg active:scale-95'
                        }`}
                    >
                        {ganador ? "Combate Concluido" : "Siguiente Turno"}
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