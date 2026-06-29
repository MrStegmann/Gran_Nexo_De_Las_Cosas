import React, { useState } from 'react';
import type { CharacterState } from './types';
import { CATEGORY_DATA } from './constants';

interface Step6Props {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
}

export const Step6Spells: React.FC<Step6Props> = ({ state, setState }) => {
  const cat = CATEGORY_DATA[state.categoria];
  const [activeTab, setActiveTab] = useState<'hechizos' | 'habilidades'>('hechizos');

  return (
    <div className="animate-fade-in pb-12">
      <h2 className="text-3xl font-bold text-white mb-2">📖 Hechizos & Habilidades</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-white/10">Llena tus ranuras disponibles con lo que mejor encaje en tu personaje.</p>

      <div className="flex items-center gap-4 p-4 bg-black/40 border border-[#00ff88]/30 rounded mb-8">
        <span className="text-4xl">🎰</span>
        <div>
          <div className="text-2xl font-bold text-[#00ff88]">{cat.slots}</div>
          <div className="text-xs uppercase tracking-widest text-gray-400">ranuras disponibles</div>
        </div>
        <div className="ml-auto text-sm text-gray-500 border-l border-white/10 pl-4 max-w-xs">
          Mezcla hechizos y habilidades libremente. Cada uno indica las ranuras que ocupa.
        </div>
      </div>

      <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
        <button
          className={`px-4 py-2 font-bold uppercase tracking-widest text-sm rounded-t transition-colors ${activeTab === 'hechizos' ? 'bg-[#00d4ff]/20 text-[#00d4ff] border-b-2 border-[#00d4ff]' : 'text-gray-500 hover:text-white'}`}
          onClick={() => setActiveTab('hechizos')}
        >
          🔮 Hechizos
        </button>
        <button
          className={`px-4 py-2 font-bold uppercase tracking-widest text-sm rounded-t transition-colors ${activeTab === 'habilidades' ? 'bg-orange-500/20 text-orange-400 border-b-2 border-orange-500' : 'text-gray-500 hover:text-white'}`}
          onClick={() => setActiveTab('habilidades')}
        >
          ⚔️ Habilidades
        </button>
      </div>

      {activeTab === 'hechizos' && (
        <div className="animate-fade-in">
          <div className="p-4 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded text-[#00d4ff] mb-6 text-sm">
            Requieren <strong className="text-white">Inteligencia</strong> (arcano, vil, naturaleza, sombras, nigromancia) o <strong className="text-white">Voluntad</strong> (Fe, Elemental, Chi).
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-black/50 border border-white/10 rounded flex justify-between text-sm"><span className="font-bold text-[#00d4ff]">Trucos</span><span className="text-gray-400">0 rec — 1 ran — 1 acc</span></div>
            <div className="p-3 bg-black/50 border border-white/10 rounded flex justify-between text-sm"><span className="font-bold text-[#00d4ff]">Rápidos</span><span className="text-gray-400">2-4 rec — 1-2 ran — 1 acc</span></div>
            <div className="p-3 bg-black/50 border border-white/10 rounded flex justify-between text-sm"><span className="font-bold text-[#00d4ff]">Básicos</span><span className="text-gray-400">5-7 rec — 1-3 ran — 2 acc</span></div>
            <div className="p-3 bg-black/50 border border-white/10 rounded flex justify-between text-sm"><span className="font-bold text-[#00d4ff]">Potentes</span><span className="text-gray-400">8+ rec — 3-5 ran — 3 acc</span></div>
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Lista de Hechizos elegidos <span className="opacity-50">(uno por línea)</span></label>
            <textarea
              rows={6}
              className="w-full bg-black/50 border border-white/20 rounded p-4 text-white focus:border-[#00d4ff] focus:outline-none font-mono text-sm leading-relaxed"
              placeholder="Ej:&#10;Bola de Fuego (Básico, Arcano, 2 ranuras)&#10;Rayo de Escarcha (Rápido, Arcano, 1 ranura)..."
              value={state.hechizos}
              onChange={(e) => setState({ ...state, hechizos: e.target.value })}
            />
          </div>
        </div>
      )}

      {activeTab === 'habilidades' && (
        <div className="animate-fade-in">
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded text-orange-300 mb-6 text-sm">
            Técnicas no mágicas (marciales/técnicas). No consumen maná ni espíritu, pero pueden tener cooldown.
          </div>

          <div className="mb-4">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Lista de Habilidades elegidas <span className="opacity-50">(una por línea)</span></label>
            <textarea
              rows={6}
              className="w-full bg-black/50 border border-white/20 rounded p-4 text-white focus:border-orange-500 focus:outline-none font-mono text-sm leading-relaxed"
              placeholder="Ej:&#10;Golpe Brutal (Fuerza, Activa, 1 ranura)&#10;Guardia de Acero (Constitución, Pasiva, 2 ranuras)..."
              value={state.habilidades}
              onChange={(e) => setState({ ...state, habilidades: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
};
