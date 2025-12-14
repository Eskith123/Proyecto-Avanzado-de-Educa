import './App.css'


// src/App.tsx
import React, { useState, useEffect } from 'react';
import Carta from './componentes/carta';
import ModalCartaDetalle from './componentes/ModalCartaDetalle';
import FormularioCrearCarta from './componentes/FormularioCrearCarta'; 
import type { CartaProps } from './tipos/Carta';

// --- DATOS INICIALES ---
const DATOS_INICIALES: CartaProps[] = [
  
  ];
// -------------------------

const App: React.FC = () => {
  // Estado principal de la colección de cartas
  const [cartas, setCartas] = useState<CartaProps[]>(DATOS_INICIALES);
  
  // Estado para controlar la visibilidad del Modal de detalle
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CartaProps | null>(null);

  // ⚠️ NUEVO ESTADO: Controla la visibilidad del formulario de creación
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Funciones de manejo
  const handleNuevaCarta = (nuevaCarta: CartaProps) => {
    setCartas(prevCartas => [nuevaCarta, ...prevCartas]);
    setMostrarFormulario(false); // ⚠️ OCULTAR el formulario después de crear
  };

  const handleCardClick = (carta: CartaProps) => {
    setSelectedCard(carta);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  // useEffect para cerrar con Escape (mantener funcionalidad)
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);


  return (
    <div 
      className="min-h-screen bg-gray-950 text-white p-8"
      style={{ 
          backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 100%)',
          backgroundSize: '20px 20px',
      }}
    >
        <h1 className="text-4xl font-black text-red-600 text-center mb-10 tracking-widest">
            BLEACH CARD PROJECT
        </h1>
        
        <div className="text-center mb-10">
            <button
                // ⚠️ Botón para alternar la visibilidad del formulario
                onClick={() => setMostrarFormulario(prev => !prev)}
                className={`py-3 px-8 text-lg font-bold rounded-lg transition-colors shadow-md 
                    ${mostrarFormulario 
                        ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                        : 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/50'
                    }`}
            >
                {mostrarFormulario ? 'Ocultar Formulario' : '➕ Crear Nueva Carta'}
            </button>
        </div>

        {/* ⚠️ RENDERIZACIÓN CONDICIONAL del formulario */}
        {mostrarFormulario && (
            <FormularioCrearCarta onNuevaCarta={handleNuevaCarta} />
        )}

        <h2 className="text-3xl font-extrabold text-white mb-6 text-center mt-12 border-t pt-6 border-gray-700">
            Deck de Cartas ({cartas.length})
        </h2>

        {/* Mapear la colección de cartas */}
        <div className="flex flex-wrap justify-center gap-6">
            {cartas.map((carta) => (
                <Carta 
                    key={carta.id} 
                    {...carta} 
                    onCardClick={handleCardClick} 
                />
            ))}
        </div>

        {/* Renderiza el Modal */}
        {selectedCard && (
            <ModalCartaDetalle
                carta={selectedCard}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        )}
    </div>
  );
};

export default App;