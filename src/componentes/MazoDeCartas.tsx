import React from 'react';
import Carta from './ComponenteCarta'; 
import type { CartaProps } from '../tipos/tiposCarta';

interface MazoProps {
  cartas: CartaProps[];
  onCardClick: (carta: CartaProps) => void;
  onDelete: (id: number) => void;
  onEdit: (carta: CartaProps) => void;
}



const MazoDeCartas: React.FC<MazoProps> = ({ cartas, onCardClick, onDelete, onEdit }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {cartas.length === 0 ? (
        <p className="text-gray-500 mt-10 italic">No hay cartas en el mazo del Gotei 13...</p>
      ) : (
        cartas.map((carta) => (
          <Carta 
            key={carta.id}
            {...carta} 
            onCardClick={onCardClick}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default MazoDeCartas;