export interface CartaProps {
  id: number;
  nombre: string;
  descripcion: string;
  ataque: number;
  defensa: number;
  vida: number;
  raza: 'Shinigami' | 'Quincy' | 'Arrancar' | 'Humano' | 'Visored'; 
  imagenUrl: string; 
}