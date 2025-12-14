export interface CartaProps {
  id: number;
  nombre: string;
  descripcion: string;
  ataque: number;
  defensa: number;
  vida: number;
  raza: 'Shinigami' | 'Quincy' | 'Arrancar' | 'Humano' | 'Visored'; // Ejemplo de unión de tipos para 'raza'
  imagenUrl: string; // URL para la imagen de la carta
}