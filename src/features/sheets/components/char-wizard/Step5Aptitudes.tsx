import React from 'react';
import type { CharacterState } from './types';

interface Step5Props {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
}

export const Step5Aptitudes: React.FC<Step5Props> = ({ state, setState }) => {

  const addAptitud = () => {
    setState({
      ...state,
      aptitudes: [...state.aptitudes, { nombre: '', tipo: 'Activa', acciones: 1, cooldown: 0, descripcion: '' }]
    });
  };

  const removeAptitud = (index: number) => {
    const newAptitudes = [...state.aptitudes];
    newAptitudes.splice(index, 1);
    setState({ ...state, aptitudes: newAptitudes });
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newAptitudes = [...state.aptitudes];
    newAptitudes[index] = { ...newAptitudes[index], [field]: value };
    setState({ ...state, aptitudes: newAptitudes });
  };

  return (
    <div className="animate-fade-in pb-12">
      <h2 className="text-3xl font-bold text-white mb-2">⚡ Aptitudes Heroicas</h2>
      <p className="text-gray-400 mb-6">Lo que hace único a tu personaje. No son hechizos: el Máster las revisa y aprueba.</p>

      <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded text-indigo-200 mb-8">
        <strong className="text-indigo-400">Recuerda:</strong> Las aptitudes no tienen coste de maná ni espíritu. Deben definir: tipo, acciones, cooldown y efecto exacto. Todas pasan por revisión del Máster antes de ser válidas.
      </div>

      <div className="space-y-6">
        {state.aptitudes.map((apt, index) => (
          <div key={index} className="p-6 bg-black/40 border border-white/10 rounded shadow-lg">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <span className="text-lg font-bold text-indigo-400">⚡ Aptitud #{index + 1}</span>
              <button onClick={() => removeAptitud(index)} className="text-sm text-red-400 hover:text-red-300">✕ Eliminar</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Nombre</label>
                <input
                  type="text"
                  placeholder="Ej: Estocada Relámpago"
                  className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white focus:border-indigo-400 focus:outline-none"
                  value={apt.nombre}
                  onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Tipo</label>
                <select
                  className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white focus:border-indigo-400 focus:outline-none appearance-none"
                  value={apt.tipo}
                  onChange={(e) => handleChange(index, 'tipo', e.target.value)}
                >
                  <option value="Activa">Activa</option>
                  <option value="Pasiva">Pasiva</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Acciones (coste)</label>
                <input
                  type="number"
                  min="0" max="5"
                  className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white focus:border-indigo-400 focus:outline-none"
                  value={apt.acciones}
                  onChange={(e) => handleChange(index, 'acciones', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Cooldown (turnos)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0 = sin cooldown"
                  className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white focus:border-indigo-400 focus:outline-none"
                  value={apt.cooldown}
                  onChange={(e) => handleChange(index, 'cooldown', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Descripción del efecto</label>
              <textarea
                rows={3}
                placeholder="Describe exactamente qué hace y en qué condiciones..."
                className="w-full bg-black/50 border border-white/20 rounded px-3 py-2 text-white focus:border-indigo-400 focus:outline-none resize-y"
                value={apt.descripcion}
                onChange={(e) => handleChange(index, 'descripcion', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {state.aptitudes.length === 0 && (
        <p className="text-center text-gray-500 my-8 italic">
          Puedes dejar este paso vacío y definir tus aptitudes con el Máster más adelante.
        </p>
      )}

      <button
        onClick={addAptitud}
        className="mt-6 w-full py-4 border-2 border-dashed border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-400 rounded transition-colors font-bold tracking-widest uppercase text-sm"
      >
        + Añadir Aptitud Heroica
      </button>
    </div>
  );
};
