export interface CartaProps {
  id?: number;
  idCard: number;
  name: string;       
  description: string; 
  attack: number;      
  defense: number;     
  lifePoints: number;   
  habilidad: 'ATAQUE' | 'DEFENSIVA' | 'CURATIVA';
  pictureUrl: string; 
}