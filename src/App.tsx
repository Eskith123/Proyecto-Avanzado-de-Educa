import './App.css';

import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import ModalCartaDetalle from './componentes/ModalCartaDetalle';
import FormularioCrearCarta from './componentes/FormularioCrearCarta'; 
import FormularioEditarCarta from './componentes/FormularioEditarCarta';
import ConfirmacionBorrado from './componentes/ConfirmacionBorrado'; 
import MazoDeCartas from './componentes/MazoDeCartas'; 
import type { CartaProps } from './tipos/tiposCarta';

interface AppProps {
  vista: 'inicio' | 'crear' | 'detalle' | 'editar';
}

const App: React.FC<AppProps> = ({ vista }) => {
  const [cartas, setCartas] = useState<CartaProps[]>([]);
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [selectedCard, setSelectedCard] = useState<CartaProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [idParaBorrar, setIdParaBorrar] = useState<number | null>(null);

  
  useEffect(() => {
    const cartasGuardadas = localStorage.getItem('mis_cartas_bleach');
    if (cartasGuardadas) {
      const lista = JSON.parse(cartasGuardadas);
      setCartas(lista);

      if (id) {
        const encontrada = lista.find((c: CartaProps) => c.id === Number(id));
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
  }, [vista, id]);

  useEffect(() => {
    localStorage.setItem('mis_cartas_bleach', JSON.stringify(cartas));
  }, [cartas]);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <nav className="bg-gray-900 border-b border-red-900/50 p-4 sticky top-0 z-40 shadow-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-red-600 italic uppercase tracking-tighter">
            Bleach <span className="text-white">TCG</span>
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
                  setCartas(cartas.map(c => c.id === editada.id ? editada : c));
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
              onCardClick={(c) => navigate(`/carta/${c.id}`)} 
              onDelete={(id) => { setIdParaBorrar(id); setMostrarConfirmacion(true); }}
              onEdit={(c) => navigate(`/editar/${c.id}`)} 
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
        onConfirmar={() => {
          setCartas(cartas.filter(c => c.id !== idParaBorrar));
          setMostrarConfirmacion(false);
        }}
        onCancelar={() => setMostrarConfirmacion(false)}
      />
    </div>
  );
};

export default App;