import './../App.css';

import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import type { CartaProps } from '../tipos/tiposCarta';
import FormularioCrearCarta from './FormularioCrearCarta';
import FormularioEditarCarta from './FormularioEditarCarta';
import MazoDeCartas from './MazoDeCartas';
import ModalCartaDetalle from './ModalCartaDetalle';
import ConfirmacionBorrado from './ConfirmacionBorrado';

interface AppProps {
  vista: 'inicio' | 'crear' | 'detalle' | 'editar';
  cartas: CartaProps[];
  setCartas: Function
}

function Appv2({vista, cartas, setCartas} : AppProps) {
  const { idCard } = useParams(); 
  const navigate = useNavigate();
  
  const [selectedCard, setSelectedCard] = useState<CartaProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [idParaBorrar, setIdParaBorrar] = useState<number>(0);

  
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

  const toggleSeleccion = (id: number) => {
    setSeleccionadas(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const cartasGuardadas = localStorage.getItem('mis_cartas_anime');
    if (cartasGuardadas) {
      const lista = JSON.parse(cartasGuardadas);
      setCartas(lista);
      if (idCard) {
        const encontrada = lista.find((c: CartaProps) => Number(c.idCard) === Number(idCard));
        if (encontrada) { 
          if (vista === 'detalle') { setSelectedCard(encontrada); setIsModalOpen(true); }
          else if (vista === 'editar') { setSelectedCard(encontrada); }
        }
      }
    }
  }, [vista, idCard]);

  useEffect(() => {
    localStorage.setItem('mis_cartas_anime', JSON.stringify(cartas));
  }, [cartas]);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <nav className="bg-gray-900 border-b border-red-900/50 p-4 sticky top-0 z-40 shadow-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-red-600 italic uppercase tracking-tighter">
            Anime <span className="text-white">TCG</span>
          </Link>
          
          <div className="flex gap-6 items-center">
            
              <button 
      onClick={() => {
        if (seleccionadas.length === 2) {
          navigate(`/batalla/${seleccionadas[0]}/${seleccionadas[1]}`);
        } else {
          alert("Debes seleccionar exactamente 2 cartas para iniciar una batalla.");
        }
      }}
      className={`text-[10px] font-black py-1.5 px-4 rounded-full shadow-lg transition-all uppercase mr-4 ${
        seleccionadas.length === 2 
        ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer scale-110' 
        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
      }`}
    >
      Batalla 
    </button>

            <Link to="/" className={`text-sm font-bold uppercase ${vista === 'inicio' ? 'text-red-500' : 'text-gray-400'}`}>
              Mazo Central
            </Link>
            <Link to="/forja" className={`text-sm font-bold uppercase ${vista === 'crear' ? 'text-red-500' : 'text-gray-400'}`}>
              Taller de Forja
            </Link>
          </div>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        {(vista === 'inicio' || vista === 'detalle') && (
          <MazoDeCartas 
            cartas={cartas} 
            onCardClick={(c) => navigate(`/carta/${c.idCard}`)} 
            onDelete={(id) => { setIdParaBorrar(id); setMostrarConfirmacion(true); }}
            onEdit={(c) => navigate(`/editar/${c.idCard}`)} 
            seleccionadas={seleccionadas}
            onToggleSeleccion={toggleSeleccion}
          />
        )}

        {vista === 'crear' && (
          <FormularioCrearCarta onNuevaCarta={(nueva) => { setCartas([nueva, ...cartas]); navigate('/'); }} />
        )}

        {vista === 'editar' && selectedCard && (
          <FormularioEditarCarta 
            cartaActual={selectedCard} 
            onGuardar={(editada) => { setCartas(cartas.map(c => c.idCard === editada.idCard ? editada : c)); navigate('/'); }} 
            onCancelar={() => navigate('/')} 
          />
        )}
      </main>

      {selectedCard && vista === 'detalle' && (
        <ModalCartaDetalle carta={selectedCard} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); navigate('/'); }} />
      )}

      <ConfirmacionBorrado 
        abierto={mostrarConfirmacion} idCard={idParaBorrar}
        onConfirmar={() => { setCartas(cartas.filter(c => c.idCard !== idParaBorrar)); setMostrarConfirmacion(false); }}
        onCancelar={() => setMostrarConfirmacion(false)} 
      />
    </div>
  )
}

export default Appv2;