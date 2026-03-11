import './App.css';

import React, { useState, useEffect } from 'react';
import ModalCartaDetalle from './componentes/ModalCartaDetalle';
import FormularioCrearCarta from './componentes/FormularioCrearCarta'; 
import FormularioEditarCarta from './componentes/FormularioEditarCarta'; // IMPORTADO
import ConfirmacionBorrado from './componentes/ConfirmacionBorrado'; 
import MazoCartas from './componentes/MazoDeCartas'; 
import type { CartaProps } from './tipos/tiposCarta';

const App: React.FC = () => {
  const [cartas, setCartas] = useState<CartaProps[]>([]);
  const [selectedCard, setSelectedCard] = useState<CartaProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // ESTADOS NUEVOS PARA EDICIÓN
  const [cartaAEditar, setCartaAEditar] = useState<CartaProps | null>(null);

  // ESTADOS PARA BORRADO
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [idParaBorrar, setIdParaBorrar] = useState<number | null>(null);

  useEffect(() => {
    const cartasGuardadas = localStorage.getItem('mis_cartas_bleach');
    if (cartasGuardadas) setCartas(JSON.parse(cartasGuardadas));
  }, []);

  useEffect(() => {
    localStorage.setItem('mis_cartas_bleach', JSON.stringify(cartas));
  }, [cartas]);

  const handleNuevaCarta = (nuevaCarta: CartaProps) => {
    setCartas(prev => [nuevaCarta, ...prev]);
    setMostrarFormulario(false);
  };

  // FUNCIONES DE EDICIÓN
  const iniciarEdicion = (carta: CartaProps) => {
    setCartaAEditar(carta);
    setMostrarFormulario(false); // Cerramos el de crear si está abierto
  };

  const actualizarCarta = (cartaEditada: CartaProps) => {
    setCartas(prev => prev.map(c => c.id === cartaEditada.id ? cartaEditada : c));
    setCartaAEditar(null); // Cerramos el formulario de editar
  };

  // BORRADO
  const abrirConfirmacionBorrado = (id: number) => {
    setIdParaBorrar(id);
    setMostrarConfirmacion(true);
  };

  const ejecutarBorradoFinal = () => {
    if (idParaBorrar !== null) {
      setCartas(cartas.filter(c => c.id !== idParaBorrar));
      setMostrarConfirmacion(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-black text-red-600 tracking-tighter italic uppercase">
          Bleach <span className="text-white">TCG</span>
        </h1>
      </header>

      <div className="flex justify-center mb-8">
        {!cartaAEditar && (
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              mostrarFormulario ? 'bg-gray-800 text-gray-400' : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {mostrarFormulario ? '✕ Cancelar' : '＋ Forjar Nueva Carta'}
          </button>
        )}
      </div>

      {/* FORMULARIO DE CREAR */}
      {mostrarFormulario && <FormularioCrearCarta onNuevaCarta={handleNuevaCarta} />}

      {/* FORMULARIO DE EDITAR (Se muestra si cartaAEditar tiene datos) */}
      {cartaAEditar && (
        <FormularioEditarCarta 
          cartaActual={cartaAEditar} 
          onGuardar={actualizarCarta} 
          onCancelar={() => setCartaAEditar(null)} 
        />
      )}

      <MazoCartas 
        cartas={cartas} 
        onCardClick={(c) => { setSelectedCard(c); setIsModalOpen(true); }} 
        onDelete={abrirConfirmacionBorrado}
        onEdit={iniciarEdicion} // PASAMOS LA FUNCIÓN DE EDITAR
      />

      {selectedCard && (
        <ModalCartaDetalle 
          carta={selectedCard} 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setSelectedCard(null); }} 
        />
      )}

      <ConfirmacionBorrado 
        abierto={mostrarConfirmacion}
        onConfirmar={ejecutarBorradoFinal}
        onCancelar={() => setMostrarConfirmacion(false)}
      />
    </div>
  );
};

export default App;