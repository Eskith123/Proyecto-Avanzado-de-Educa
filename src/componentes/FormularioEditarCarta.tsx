// src/componentes/FormularioEditarCarta.tsx
import React, { useState } from 'react';
import type { CartaProps } from '../tipos/Carta';

const RAZAS_DISPONIBLES: CartaProps['raza'][] = [
  'Shinigami', 'Quincy', 'Arrancar', 'Humano', 'Visored', 'Hollow'
];

interface FormularioEditarProps {
  cartaInicial: CartaProps; // La carta que vamos a editar
  onUpdate: (carta: CartaProps) => void;
  onCancel: () => void; // Función para cerrar el formulario
}

const FormularioEditarCarta: React.FC<FormularioEditarProps> = ({ cartaInicial, onUpdate, onCancel }) => {
  
  // Usamos el estado inicial basado en la carta que se pasó
  const [formData, setFormData] = useState<CartaProps>(cartaInicial);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.imagenUrl.trim()) {
      alert('Por favor, completa los campos requeridos.');
      return;
    }
    
    // Llama a la función de actualización en App.tsx con la carta modificada
    onUpdate(formData);
  };

  const InputClass = "w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-500 focus:ring focus:ring-blue-500/50";
  const LabelClass = "block text-sm font-medium text-gray-300 mb-1";
  const SectionTitleClass = "text-xl font-bold text-blue-500 mb-4 border-b border-gray-700 pb-2";

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 border-2 border-blue-800 rounded-xl shadow-2xl shadow-blue-900/40 my-8">
      <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
        Editar Carta: {cartaInicial.nombre}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección de Identificación */}
        <div>
          <h3 className={SectionTitleClass}>Información Básica</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className={LabelClass}>Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                className={InputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="raza" className={LabelClass}>Raza</label>
              <select
                id="raza"
                name="raza"
                value={formData.raza}
                onChange={handleChange}
                className={InputClass}
                required
              >
                {RAZAS_DISPONIBLES.map((raza) => (
                  <option key={raza} value={raza}>{raza}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sección de Estadísticas (Ataque, Defensa, Vida) */}
        <div>
          <h3 className={SectionTitleClass}>Estadísticas</h3>
          <div className="grid grid-cols-3 gap-4">
            {['ataque', 'defensa', 'vida'].map((stat) => (
              <div key={stat}>
                <label htmlFor={stat} className={LabelClass}>{stat.toUpperCase()}</label>
                <input
                  id={stat}
                  name={stat}
                  type="number"
                  min="0"
                  // Esta conversión es necesaria para tipado
                  value={formData[stat as keyof CartaProps]}
                  onChange={handleChange}
                  className={InputClass}
                  required
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Sección de Contenido */}
        <div>
          <h3 className={SectionTitleClass}>Contenido y Multimedia</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="imagenUrl" className={LabelClass}>URL de la Imagen</label>
              <input
                id="imagenUrl"
                name="imagenUrl"
                type="url"
                value={formData.imagenUrl}
                onChange={handleChange}
                className={InputClass}
                required
              />
            </div>
            <div>
              <label htmlFor="descripcion" className={LabelClass}>Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={3}
                value={formData.descripcion}
                onChange={handleChange}
                className={`${InputClass} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* Botones de Acción (Guardar y Cancelar) */}
        <div className="pt-4 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-6 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md shadow-blue-900/50"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioEditarCarta;