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

  
  useEffect(() => {
    const cartasGuardadas = localStorage.getItem('mis_cartas_bleach');
    if (cartasGuardadas) {
      const lista = JSON.parse(cartasGuardadas);
      setCartas(lista);

      if (idCard) {
        const encontrada = lista.find((c: CartaProps) => Number(c.idCard) === Number(idCard));
        if (encontrada) { 
          if (vista === 'detalle') {
            setSelectedCard(encontrada);
            setIsModalOpen(true);
          } else if (vista === 'editar') {
            setSelectedCard(encontrada); 
          }
        }
      }
    }
  }, [vista, idCard]);

  useEffect(() => {
    localStorage.setItem('mis_cartas_bleach', JSON.stringify(cartas));
  }, [cartas]);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <nav className="bg-gray-900 border-b border-red-900/50 p-4 sticky top-0 z-40 shadow-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-red-600 italic uppercase tracking-tighter">
            Anime <span className="text-white">TCG</span>
          </Link>
          
          <div className="flex gap-6">
            <Link to="/" className={`text-sm font-bold uppercase tracking-widest ${vista === 'inicio' ? 'text-red-500' : 'text-gray-400'}`}>
              Mazo Central
            </Link>
            <Link to="/forja" className={`text-sm font-bold uppercase tracking-widest ${vista === 'crear' ? 'text-red-500' : 'text-gray-400'}`}>
              Taller de Forja
            </Link>
          </div>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
      
        {vista === 'crear' && (
          <div className="py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <FormularioCrearCarta onNuevaCarta={(nueva) => {
              setCartas([nueva, ...cartas]);
              navigate('/');
            }} />
          </div>
        )}

       
        {vista === 'editar' && selectedCard && (
          <div className="py-10 animate-in zoom-in duration-300">
             <FormularioEditarCarta 
                cartaActual={selectedCard} 
                onGuardar={(editada) => { 
                  setCartas(cartas.map(c => c.idCard === editada.idCard ? editada : c));
                  navigate('/');
                }} 
                onCancelar={() => navigate('/')} 
              />
          </div>
        )}

       
        {(vista === 'inicio' || vista === 'detalle') && (
          <div className="animate-in fade-in duration-500">
            <MazoDeCartas 
              cartas={cartas} 
              onCardClick={(c) => navigate(`/carta/${c.idCard}`)} 
              onDelete={(idCard) => { setIdParaBorrar(idCard); setMostrarConfirmacion(true); }}
              onEdit={(c) => navigate(`/editar/${c.idCard}`)} 
            />
          </div>
        )}
      </main>

      
      {selectedCard && vista === 'detalle' && (
        <ModalCartaDetalle 
          carta={selectedCard} 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); navigate('/'); }} 
        />
      )}

      <ConfirmacionBorrado 
        abierto={mostrarConfirmacion}
        idCard={idParaBorrar}
        onConfirmar={() => {
          setCartas(cartas.filter(c => c.idCard !== idParaBorrar));
          setMostrarConfirmacion(false);
        } }
        onCancelar={() => setMostrarConfirmacion(false)}       />
    </div>
  )
}

export default Appv2