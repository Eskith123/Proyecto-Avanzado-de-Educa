export interface CartaProps {
  [x: string]: any;
  id: number;
  idCard: number;
  name: string;
  description: string;
  attack: number;
  defense: number;
  lifepoint: number;
  raza: 'Shinigami' | 'Quincy' | 'Arrancar' | 'Humano' | 'Visored' | 'Hollow' ; 
  pinctureUrl: string; 
}