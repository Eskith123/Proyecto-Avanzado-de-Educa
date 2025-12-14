import './App.css';

import React, { useState } from 'react';
import Carta from './componentes/ComponenteCarta';
import ModalCartaDetalle from './componentes/ModalCartaDetalle';
import FormularioCrearCarta from './componentes/FormularioCrearCarta'; 
import FormularioEditarCarta from './componentes/FormularioEditarCarta'; 
import type { CartaProps } from './tipos/Carta';



const DATOS_INICIALES: CartaProps[] = [
  ];

const App: React.FC = () => {
  const [cartas, setCartas] = useState<CartaProps[]>(DATOS_INICIALES);
  
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CartaProps | null>(null);


  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  

  const [cartaAEditar, setCartaAEditar] = useState<CartaProps | null>(null);

  

  const handleNuevaCarta = (nuevaCarta: CartaProps) => {
    setCartas(prevCartas => [nuevaCarta, ...prevCartas]);
    setMostrarFormulario(false);
  };
  

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta carta?')) {
        setCartas(prevCartas => prevCartas.filter(carta => carta.id !== id));
    }
  };

  
  const handleEdit = (carta: CartaProps) => {
    setCartaAEditar(carta); 
  };

 
  const handleUpdate = (cartaActualizada: CartaProps) => {
    setCartas(prevCartas => 
      prevCartas.map(carta => 
        carta.id === cartaActualizada.id ? cartaActualizada : carta
      )
    );
    setCartaAEditar(null); 
  };

  
  const handleCardClick = (carta: CartaProps) => {
    setSelectedCard(carta);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
  };
  
  

  return (
    <div 
      className="min-h-screen bg-gray-950 text-white p-8"
      style={{ 
          backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.05) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 100%)',
          backgroundSize: '20px 20px',
      }}
    >
        <h1 className="text-4xl font-black text-red-600 text-center mb-10 tracking-widest">
            BLEACH BRAVE CARD
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

        
        {mostrarFormulario && (
            <FormularioCrearCarta onNuevaCarta={handleNuevaCarta} />
        )}

       
        {cartaAEditar && (
            <FormularioEditarCarta 
                cartaInicial={cartaAEditar} 
                onUpdate={handleUpdate} 
                onCancel={() => setCartaAEditar(null)}
            />
        )}


        <h2 className="text-3xl font-extrabold text-white mb-6 text-center mt-12 border-t pt-6 border-gray-700">
            Deck de Cartas ({cartas.length})
        </h2>

       
        <div className="flex flex-wrap justify-center gap-6">
            {cartas.map((carta) => (
                <Carta 
                    key={carta.id} 
                    {...carta} 
                    onCardClick={handleCardClick} 
                    onDelete={handleDelete}  
                    onEdit={handleEdit}     
                />
            ))}
        </div>

        
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