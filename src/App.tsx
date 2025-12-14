import './App.css';
// src/App.tsx
import React, { useState } from 'react';
import Carta from './componentes/carta';
import ModalCartaDetalle from './componentes/ModalCartaDetalle';
import FormularioCrearCarta from './componentes/FormularioCrearCarta'; 
import FormularioEditarCarta from './componentes/FormularioEditarCarta'; // ⚠️ NECESITAS CREAR ESTE COMPONENTE
import type { CartaProps } from './tipos/Carta';

// ... (DATOS INICIALES y lógica de useEffect se mantienen igual) ...

const DATOS_INICIALES: CartaProps[] = [
  ];

const App: React.FC = () => {
  const [cartas, setCartas] = useState<CartaProps[]>(DATOS_INICIALES);
  
  // Estados para Modal de Detalle
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CartaProps | null>(null);

  // Estado para Formulario de Creación
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // ⚠️ NUEVO ESTADO: Carta que se está editando (null si no hay edición)
  const [cartaAEditar, setCartaAEditar] = useState<CartaProps | null>(null);

  // --- Funciones de Modificación de Cartas ---

  const handleNuevaCarta = (nuevaCarta: CartaProps) => {
    setCartas(prevCartas => [nuevaCarta, ...prevCartas]);
    setMostrarFormulario(false);
  };
  
  // ⚠️ NUEVA FUNCIÓN: Borrar carta
  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta carta?')) {
        setCartas(prevCartas => prevCartas.filter(carta => carta.id !== id));
    }
  };

  // ⚠️ NUEVA FUNCIÓN: Iniciar el modo de edición
  const handleEdit = (carta: CartaProps) => {
    setCartaAEditar(carta); // Guarda la carta actual en el estado
  };

  // ⚠️ NUEVA FUNCIÓN: Actualizar carta editada
  const handleUpdate = (cartaActualizada: CartaProps) => {
    setCartas(prevCartas => 
      prevCartas.map(carta => 
        carta.id === cartaActualizada.id ? cartaActualizada : carta
      )
    );
    setCartaAEditar(null); // Sale del modo de edición
  };

  // --- Funciones de Modal de Detalle y UX ---
  const handleCardClick = (carta: CartaProps) => {
    setSelectedCard(carta);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
  };
  
  // useEffect para cerrar con Escape
  // ... (código de useEffect se mantiene igual) ...

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

        {/* Renderización condicional de FORMULARIOS */}
        {mostrarFormulario && (
            <FormularioCrearCarta onNuevaCarta={handleNuevaCarta} />
        )}

        {/* ⚠️ NUEVO: Renderiza el formulario de edición si hay una carta seleccionada para editar */}
        {cartaAEditar && (
            <FormularioEditarCarta 
                cartaInicial={cartaAEditar} 
                onUpdate={handleUpdate} 
                onCancel={() => setCartaAEditar(null)} // Función para cancelar la edición
            />
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
                    onDelete={handleDelete} // ⚠️ PASAR FUNCIÓN DE BORRADO
                    onEdit={handleEdit}     // ⚠️ PASAR FUNCIÓN DE EDICIÓN
                />
            ))}
        </div>

        {/* Renderiza el Modal de Detalle */}
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