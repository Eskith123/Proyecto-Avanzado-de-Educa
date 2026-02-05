import './App.css';


import React, { useState, useEffect } from 'react';
import Carta from './componentes/ComponenteCarta';
import ModalCartaDetalle from './componentes/ModalCartaDetalle';
import FormularioCrearCarta from './componentes/FormularioCrearCarta'; 
import FormularioEditarCarta from './componentes/FormularioEditarCarta';
import ConfirmacionBorrado from './componentes/ConfirmacionBorrado'; 
import type { CartaProps } from './tipos/tiposCarta';

const DATOS_INICIALES: CartaProps[] = [
  { id: 1, nombre: 'Ichigo K.', descripcion: 'Sustituto de Shinigami.', ataque: 95, defensa: 80, vida: 100, raza: 'Shinigami', imagenUrl: 'https://tse3.mm.bing.net/th/id/OIP.0ztng8mHFhP-gMNCt2G5hwHaF4?rs=1&pid=ImgDetMain&o=7&rm=3' },
];

const App: React.FC = () => {
  const [cartas, setCartas] = useState<CartaProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CartaProps | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cartaAEditar, setCartaAEditar] = useState<CartaProps | null>(null);

 
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [idParaBorrar, setIdParaBorrar] = useState<number | null>(null);

  useEffect(() => {
    const cartasGuardadas = localStorage.getItem('mis_cartas_bleach');
    if (cartasGuardadas) {
      setCartas(JSON.parse(cartasGuardadas));
    } else {
      setCartas(DATOS_INICIALES);
    }
  }, []); 

  useEffect(() => {
    if (cartas.length >= 0) { 
      localStorage.setItem('mis_cartas_bleach', JSON.stringify(cartas));
    }
  }, [cartas]); 

  const handleNuevaCarta = (nuevaCarta: CartaProps) => {
    setCartas(prevCartas => [nuevaCarta, ...prevCartas]);
    setMostrarFormulario(false);
  };

  
  const prepararBorrado = (id: number) => {
    setIdParaBorrar(id);        
    setMostrarConfirmacion(true);
  };

  
  const ejecutarBorradoFinal = () => {
    if (idParaBorrar !== null) {
      const nuevasCartas = cartas.filter(carta => carta.id !== idParaBorrar);
      setCartas(nuevasCartas);
      setMostrarConfirmacion(false); 
      setIdParaBorrar(null);        
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
        <h1 className="text-4xl font-black text-red-600 text-center mb-10 tracking-widest uppercase italic">
            Bleach Brave Card
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
                    onDelete={() => prepararBorrado(carta.id)} // 5. LLAMAMOS AL NUEVO PASO
                    onEdit={(c) => setCartaAEditar(c)}
                />
            ))}
        </div>

       
        <ConfirmacionBorrado 
          abierto={mostrarConfirmacion}
          onConfirmar={ejecutarBorradoFinal}
          onCancelar={() => setMostrarConfirmacion(false)}
        />

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