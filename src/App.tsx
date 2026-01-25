import './App.css';

// src/App.tsx
import React, { useState, useEffect } from 'react';
import Carta from './componentes/ComponenteCarta';
import ModalCartaDetalle from './componentes/ModalCartaDetalle';
import FormularioCrearCarta from './componentes/FormularioCrearCarta'; 
import FormularioEditarCarta from './componentes/FormularioEditarCarta';
import type { CartaProps } from './tipos/tiposCarta';

// Datos que se mostrarán solo la PRIMERA VEZ que alguien abra la app
const DATOS_INICIALES: CartaProps[] = [
  { id: 1, nombre: 'Ichigo K.', descripcion: 'Sustituto de Shinigami.', ataque: 95, defensa: 80, vida: 100, raza: 'Shinigami', imagenUrl: 'https://tse3.mm.bing.net/th/id/OIP.0ztng8mHFhP-gMNCt2G5hwHaF4?rs=1&pid=ImgDetMain&o=7&rm=3' },
];

const App: React.FC = () => {
  // Inicializamos el estado vacío para luego llenarlo con el localStorage
  const [cartas, setCartas] = useState<CartaProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CartaProps | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cartaAEditar, setCartaAEditar] = useState<CartaProps | null>(null);

  // ---------------------------------------------------------
  // 1er useEffect: CARGAR las cartas al abrir la aplicación
  // ---------------------------------------------------------
  useEffect(() => {
    const cartasGuardadas = localStorage.getItem('mis_cartas_bleach');
    
    if (cartasGuardadas) {
      // Si existen datos guardados, los transformamos de texto (JSON) a objeto JS
      setCartas(JSON.parse(cartasGuardadas));
    } else {
      // Si es la primera vez, cargamos los datos por defecto
      setCartas(DATOS_INICIALES);
    }
  }, []); // Se ejecuta solo UNA VEZ al montar el componente

  // ---------------------------------------------------------
  // 2do useEffect: GUARDAR las cartas cada vez que la lista cambie
  // ---------------------------------------------------------
  useEffect(() => {
    // Solo guardamos si hay cartas para evitar sobreescribir con un array vacío accidentalmente
    if (cartas.length > 0) {
      localStorage.setItem('mis_cartas_bleach', JSON.stringify(cartas));
    }
  }, [cartas]); // Se ejecuta cada vez que 'cartas' se crea, borra o edita


  // --- Funciones de Gestión (CRUD) ---
  const handleNuevaCarta = (nuevaCarta: CartaProps) => {
    setCartas(prevCartas => [nuevaCarta, ...prevCartas]);
    setMostrarFormulario(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Eliminar esta carta?')) {
      const nuevasCartas = cartas.filter(carta => carta.id !== id);
      setCartas(nuevasCartas);
      // Actualizamos localstorage también en caso de que borremos la última carta
      localStorage.setItem('mis_cartas_bleach', JSON.stringify(nuevasCartas));
    }
  };

  const handleUpdate = (cartaActualizada: CartaProps) => {
    setCartas(prevCartas => 
      prevCartas.map(carta => carta.id === cartaActualizada.id ? cartaActualizada : carta)
    );
    setCartaAEditar(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCard(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
        <h1 className="text-4xl font-black text-red-600 text-center mb-10 tracking-widest uppercase">
            Bleach Deck Manager
        </h1>
        
        <div className="text-center mb-10">
            <button
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                className="bg-red-600 hover:bg-red-700 py-3 px-8 font-bold rounded-lg transition-all"
            >
                {mostrarFormulario ? 'Cerrar' : '➕ Crear Nueva Carta'}
            </button>
        </div>

        {mostrarFormulario && <FormularioCrearCarta onNuevaCarta={handleNuevaCarta} />}
        
        {cartaAEditar && (
            <FormularioEditarCarta 
                cartaInicial={cartaAEditar} 
                onUpdate={handleUpdate} 
                onCancel={() => setCartaAEditar(null)} 
            />
        )}

        <div className="flex flex-wrap justify-center gap-6 mt-12">
            {cartas.map((carta) => (
                <Carta 
                    key={carta.id} 
                    {...carta} 
                    onCardClick={(c) => { setSelectedCard(c); setIsModalOpen(true); }}
                    onDelete={handleDelete}
                    onEdit={(c) => setCartaAEditar(c)}
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