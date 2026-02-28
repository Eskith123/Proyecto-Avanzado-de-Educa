import React from 'react';
import Carta from './ComponenteCarta';
import type { CartaProps } from '../tipos/tiposCarta';

interface MazoProps {
  cartas: CartaProps[];
  onCardClick: (carta: CartaProps) => void;
  onDelete: (id: number) => void;
  onEdit: (carta: CartaProps) => void;
}

const MazoCartas: React.FC<MazoProps> = ({ cartas, onCardClick, onDelete, onEdit }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-12">
      {cartas.length === 0 ? (
        <p className="text-gray-500 italic mt-10">No hay cartas en el mazo...</p>
      ) : (
        cartas.map((carta) => (
          <Carta 
            key={carta.id} 
            {...carta} 
            onCardClick={() => onCardClick(carta)}
            onDelete={() => onDelete(carta.id)}
            onEdit={() => onEdit(carta)}
          />
        ))
      )}
    </div>
  );
};



export default MazoCartas;