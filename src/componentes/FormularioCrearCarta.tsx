
import React, { useState } from 'react';
import type { CartaProps } from '../tipos/tiposCarta';

interface FormularioProps {
  onNuevaCarta: (carta: CartaProps) => void;
}

const FormularioCrearCarta: React.FC<FormularioProps> = ({ onNuevaCarta }) => {
  const [error, setError] = useState<string | null>(null);

 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    attack: 0,
    defense: 0,
    lifePoints: 0,
    raza: 'GUERRERO' as CartaProps['raza'],
    pictureUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (error) setError(null);
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (parseInt(value) || 0) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.pictureUrl.trim()) {
      setError("⚠️ Nombre y URL de imagen son obligatorios para forjar la carta.");
      return;
    }
    if (formData.attack <= 0 || formData.defense <= 0 || formData.lifePoints <= 0) {
      setError("⚠️ ¡Las estadísticas deben ser superiores a 0 para el Gotei 13!");
      return;
    }

    onNuevaCarta({
      ...formData,
      id: Date.now(),
      idCard: Date.now(),
    });

    setFormData({ name: '', description: '', attack: 0, defense: 0, lifePoints: 0, raza: 'GUERRERO', pictureUrl: '' });

      let urlAPI="https://educapi-v2.onrender.com/card";
       
      const respuesta = await fetch(urlAPI,{
        method:'POST',
        headers:{
          usersecretpasskey: "Yosk494348IO",
          "Content-type" : "application/json"
        },
        body: JSON.stringify(
          {
            name: formData.name,
            description: formData.description,
            attack: formData.attack,
            defense: formData.defense,
            lifePoints: formData.lifePoints,
            pictureUrl: formData.pictureUrl,
            attributes: {raza:formData.raza},
          }
        )
       
      });
          console.log(respuesta)
     
  };

  const labelClass = "text-xs font-bold text-gray-400 uppercase mb-1 block tracking-wider";
  const inputClass = "w-full p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all";

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-900 border-2 border-red-900 rounded-2xl shadow-2xl shadow-red-950/20 mb-10 relative overflow-hidden">
      
      
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
      
      <h2 className="text-3xl font-black text-white mb-8 text-center tracking-tighter uppercase italic">
        Forjar Carta de <span className="text-red-600">Batalla</span>
      </h2>
      
      {error && (
        <div className="bg-red-900/40 border-l-4 border-red-600 text-red-300 p-4 rounded-lg mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        
        <div>
          <label className={labelClass}>Nombre del Personaje</label>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Kenpachi Zaraki" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Raza / Facción</label>
          <select name="raza" value={formData.raza} onChange={handleChange} className={inputClass}>
            <option value="GUERRERO">GUERRERO</option>
            <option value="ARQUERO">ARQUERO</option>
            <option value="MAGICO">MAGICO</option>
            <option value="ELEMENTAL">ELEMENTAL</option>
            <option value="SUPER HUMANO">SUPER HUMANO</option>
            <option value="ESPADACHIN">ESPADACHIN</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Descripción y Poderes </label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Describe su poder espiritual único..." className={`${inputClass} resize-none`} />
        </div>

       
        <div className="md:col-span-2 grid grid-cols-3 gap-4 bg-black/30 p-4 rounded-xl border border-gray-800">
          <div>
            <label className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1 block">Ataque</label>
            <input type="number" name="attack" value={formData.attack} onChange={handleChange} className={`${inputClass} text-center text-xl font-black`} />
          </div>
          <div>
            <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 block">Defensa</label>
            <input type="number" name="defense" value={formData.defense} onChange={handleChange} className={`${inputClass} text-center text-xl font-black`} />
          </div>
          <div>
            <label className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-1 block">Vida</label>
            <input type="number" name="lifePoints" value={formData.lifePoints} onChange={handleChange} className={`${inputClass} text-center text-xl font-black`} />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>URL de la Imagen (Retrato)</label>
          <input name="pictureUrl" value={formData.pictureUrl} onChange={handleChange} placeholder="https://link-a-imagen-Portrait.webp" className={inputClass} />
        </div>

        <button type="submit"  className="md:col-span-2 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-red-950/30 active:scale-95">
          Forjar Carta del Seireitei   
        </button>
      </form>
    </div>
  );
};

export default FormularioCrearCarta;