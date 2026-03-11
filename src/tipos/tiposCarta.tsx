export interface CartaProps {
  id: number;
  idCard?: number;
  name: string;       
  description: string; 
  attack: number;      
  defense: number;     
  lifepoint: number;   
  raza: 'Shinigami' | 'Quincy' | 'Arrancar' | 'Visored' | 'Hollow' | 'Humano';
  pinctureUrl: string; 
}