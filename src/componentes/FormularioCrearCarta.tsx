
import React, { useState } from 'react';
import type { CartaProps } from '../tipos/tiposCarta';

interface FormularioProps {
  onNuevaCarta: (carta: CartaProps) => void;
}

const FormularioCrearCarta: React.FC<FormularioProps> = ({ onNuevaCarta }) => {
  // 1. Estado para el mensaje de error
  const [error, setError] = useState<string | null>(null);

  // 2. Estado inicial del formulario
  const [formData, setFormData] = useState<Omit<CartaProps, 'id'>>({
    nombre: '',
    descripcion: '',
    ataque: 0,
    defensa: 0,
    vida: 0,
    raza: 'Shinigami',
    imagenUrl: '',
  });

  // Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // Limpiamos el error en cuanto el usuario empieza a escribir
    if (error) setError(null);

    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  // 3. Lógica de Validación completa
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de texto
    if (!formData.nombre.trim()) {
      setError("⚠️ El nombre es obligatorio. ¿Quién es este guerrero?");
      return;
    }
    if (!formData.descripcion.trim()) {
      setError("⚠️ La descripción es necesaria para conocer su historia.");
      return;
    }

    // Validación de estadísticas (Mayores a 0)
    if (formData.ataque <= 0) {
      setError("⚠️ El ataque debe ser mayor a 0. ¡Necesita poder ofensivo!");
      return;
    }
    if (formData.defensa <= 0) {
      setError("⚠️ La defensa debe ser mayor a 0. ¡Debe poder protegerse!");
      return;
    }
    if (formData.vida <= 0) {
      setError("⚠️ La vida debe ser mayor a 0. ¡No puede nacer derrotado!");
      return;
    }

    // Validación de imagen
    if (!formData.imagenUrl.trim()) {
      setError("⚠️ La URL de la imagen es obligatoria.");
      return;
    }

    // Si todo está correcto, creamos la carta
    onNuevaCarta({ ...formData, id: Date.now() });
    
    // Limpiamos el formulario y errores
    setError(null);
    setFormData({
      nombre: '', descripcion: '', ataque: 0, defensa: 0, vida: 0, raza: 'Shinigami', imagenUrl: '',
    });
  };

  // Clases de Tailwind para ahorrar código
  const labelClass = "text-xs font-bold text-gray-400 uppercase mb-1 block";
  const inputClass = "w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all";
  const errorInputClass = "border-red-500 ring-1 ring-red-500";

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-900 border-2 border-red-900 rounded-2xl shadow-2xl my-10 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
      
      <h2 className="text-3xl font-black text-white mb-8 text-center tracking-tighter uppercase italic">
        Forjar Nueva Carta de <span className="text-red-600">Batalla</span>
      </h2>
      
      {/* 4. Alerta de Error Animada */}
      {error && (
        <div className="bg-red-600/15 border-l-4 border-red-600 text-red-400 p-4 rounded mb-6 animate-pulse font-medium text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="md:col-span-1">
          <label className={labelClass}>Nombre del Personaje</label>
          <input 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            placeholder="Ej: Kenpachi Zaraki"
            className={`${inputClass} ${error && !formData.nombre ? errorInputClass : ''}`}
          />
        </div>

        {/* Raza */}
        <div className="md:col-span-1">
          <label className={labelClass}>Raza / Facción</label>
          <select name="raza" value={formData.raza} onChange={handleChange} className={inputClass}>
            <option value="Shinigami">Shinigami</option>
            <option value="Quincy">Quincy</option>
            <option value="Arrancar">Arrancar</option>
            <option value="Visored">Visored</option>
            <option value="Hollow">Hollow</option>
            <option value="Humano">Humano</option>
          </select>
        </div>

        {/* Descripción */}
        <div className="md:col-span-2">
          <label className={labelClass}>Descripción y Habilidades</label>
          <textarea 
            name="descripcion" 
            value={formData.descripcion} 
            onChange={handleChange} 
            rows={3}
            placeholder="Describe su Bankai o sus poderes únicos..."
            className={`${inputClass} resize-none ${error && !formData.descripcion ? errorInputClass : ''}`}
          />
        </div>

        {/* Estadísticas */}
        <div className="md:col-span-2 grid grid-cols-3 gap-4 bg-black/30 p-4 rounded-xl border border-gray-800">
          <div>
            <label className="text-[10px] font-black text-red-500 uppercase">Ataque</label>
            <input 
              type="number" 
              name="ataque" 
              value={formData.ataque} 
              onChange={handleChange} 
              className={`${inputClass} text-center font-bold ${error && formData.ataque <= 0 ? errorInputClass : ''}`}
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-blue-500 uppercase">Defensa</label>
            <input 
              type="number" 
              name="defensa" 
              value={formData.defensa} 
              onChange={handleChange} 
              className={`${inputClass} text-center font-bold ${error && formData.defensa <= 0 ? errorInputClass : ''}`}
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-green-500 uppercase">Vida</label>
            <input 
              type="number" 
              name="vida" 
              value={formData.vida} 
              onChange={handleChange} 
              className={`${inputClass} text-center font-bold ${error && formData.vida <= 0 ? errorInputClass : ''}`}
            />
          </div>
        </div>

        {/* URL Imagen */}
        <div className="md:col-span-2">
          <label className={labelClass}>URL de la Imagen (Portrait)</label>
          <input 
            name="imagenUrl" 
            value={formData.imagenUrl} 
            onChange={handleChange} 
            placeholder="https://link-a-tu-imagen.jpg"
            className={`${inputClass} ${error && !formData.imagenUrl ? errorInputClass : ''}`}
          />
        </div>

        {/* Botón de envío */}
        <div className="md:col-span-2 pt-4">
          <button 
            type="submit" 
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all shadow-xl shadow-red-900/20 active:scale-[0.98] uppercase tracking-widest"
          >
            Añadir al Deck del Gotei 13
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCrearCarta;