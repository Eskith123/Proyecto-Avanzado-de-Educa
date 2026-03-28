export interface CartaProps {
  id?: number;
  idCard: number;
  name: string;       
  description: string; 
  attack: number;      
  defense: number;     
  lifePoints: number;   
  raza: 'ESPADACHIN' | 'ARQUERO' | 'ELEMENTAL' | 'MAGICO' | 'GUERRERO' | 'SUPER HUMANO';
  pictureUrl: string; 
}