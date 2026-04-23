import React from 'react';

interface Props {
  abierto: boolean;
  idCard: number;
  onConfirmar: (id: number) => void;
  onCancelar: () => void;
}

const ConfirmacionBorrado: React.FC<Props> = ({ abierto, idCard, onConfirmar, onCancelar }) => {
  console.log(idCard);
  if (!abierto) return null;

  const handleBorrarEnAPI = async () => {
  
    let urlAPI = `https://educapi-v2.onrender.com/card/${idCard}`;
        
    const respuesta = await fetch(urlAPI, {
      method: 'DELETE',
      headers: {
        usersecretpasskey: "Yosk494348IO",
      }
      
    });

    console.log(respuesta);

    if (respuesta.ok) {
      onConfirmar(idCard);
    } else {
      alert("Error al eliminar el guerrero en la API");
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border-2 border-red-600 p-8 rounded-xl text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 uppercase italic text-white">¿Eliminar Guerrero?</h2>
        <p className="text-gray-400 mb-8">Esta acción es permanente.</p>
        <div className="flex gap-4">
          <button onClick={onCancelar} className="flex-1 py-2 bg-gray-700 text-white font-bold rounded">NO</button>
          <button onClick={handleBorrarEnAPI} className="flex-1 py-2 bg-red-600 text-white font-bold rounded shadow-lg shadow-red-900/50">SÍ, BORRAR</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionBorrado;