import React from 'react';
import type { CharacterState, MetaData } from './types';
import { CATEGORY_DATA } from './constants';

interface Step1Props {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
  metaData: MetaData | null;
}

export const Step1Identity: React.FC<Step1Props> = ({ state, setState, metaData }) => {
  const factions = metaData?.racesData ? Object.keys(metaData.racesData) : [];
  const activeFaction = state.faccion || factions[0];

  const handleCategoryChange = (cat: string) => {
    if (state.categoria !== cat) {
      const newState = { ...state, categoria: cat };
      if (cat === 'Novato') {
        newState.atributos = { Destreza: 0, Fuerza: 0, Inteligencia: 0, Voluntad: 0, Constitución: 0, Sabiduría: 0, Carisma: 0 };
        newState.talentos = {};
      }
      setState(newState);
    }
  };

  const handleRaceSelect = (raceName: string, faction: string) => {
    setState(prev => ({ ...prev, raza: raceName, faccion: faction }));
  };

  const renderRaceCards = () => {
    if (!metaData?.racesData || !activeFaction) return null;
    const races = metaData.racesData[activeFaction];
    if (!races) return <p className="text-gray-400">Sin razas disponibles.</p>;

    return Object.keys(races).map(raceName => {
      const rd = races[raceName];
      const isSelected = state.raza === raceName && state.faccion === activeFaction;

      if (activeFaction === 'Especiales') {
        return (
          <div
            key={raceName}
            onClick={() => handleRaceSelect(raceName, activeFaction)}
            className={`p-4 border rounded cursor-pointer transition-colors ${isSelected ? 'border-[#00ff88] bg-[#00ff88]/10' : 'border-gray-700 hover:border-gray-500'}`}
          >
            <div className="font-bold text-[#00ff88]">{raceName}</div>
            <div className="text-sm text-gray-400">Condición especial sobre raza base</div>
          </div>
        );
      }

      const ventajas = (rd.Ventajas || []).slice(0, 2);
      const desventajas = (rd.Desventajas || []).slice(0, 1);
      const especial = (rd.Especial || []).slice(0, 1);

      return (
        <div
          key={raceName}
          onClick={() => handleRaceSelect(raceName, activeFaction)}
          className={`p-4 border rounded cursor-pointer transition-colors flex flex-col gap-2 ${isSelected ? 'border-[#00ff88] bg-[#00ff88]/10' : 'border-gray-700 hover:border-gray-500 bg-black/40'}`}
        >
          <div className="font-bold text-lg text-white">{raceName}</div>
          {ventajas.length > 0 && (
            <div className="text-sm text-green-400 flex flex-col">
              {ventajas.map((v: string) => <span key={v}>+ {v}</span>)}
            </div>
          )}
          {desventajas.length > 0 && (
            <div className="text-sm text-red-400 flex flex-col">
              {desventajas.map((d: string) => <span key={d}>- {d}</span>)}
            </div>
          )}
          {especial.length > 0 && (
            <div className="text-sm text-[#00ff88] mt-auto">✦ {especial[0]}</div>
          )}
        </div>
      );
    });
  };

  const renderRacePreview = () => {
    if (!state.raza || !state.faccion || !metaData?.racesData) return null;
    const facData = metaData.racesData[state.faccion];
    if (!facData) return null;
    const raceObj = facData[state.raza];
    if (!raceObj) return null;

    if (state.faccion === 'Especiales') {
      return (
        <div className="mt-6 p-4 border border-[#00ff88]/50 bg-black/50 rounded">
          <div className="text-xl font-bold text-[#00ff88] mb-4">✦ {state.raza} <span className="text-sm text-gray-400 uppercase tracking-widest">{state.faccion}</span></div>
          {Object.entries(raceObj).map(([form, fd]: [string, any]) => (
            <div key={form} className="mb-4">
              <div className="font-bold text-white mb-2">{form}</div>
              <div className="flex flex-wrap gap-2">
                {(fd.Ventajas || []).map((v: string) => <span key={v} className="px-2 py-1 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">{v}</span>)}
                {(fd.Desventajas || []).map((d: string) => <span key={d} className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400 border border-red-500/30">{d}</span>)}
                {(fd.Especial || []).map((e: string) => <span key={e} className="px-2 py-1 text-xs rounded bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30">✦ {e}</span>)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    const v = raceObj.Ventajas || [];
    const d = raceObj.Desventajas || [];
    const e = raceObj.Especial || [];

    return (
      <div className="mt-6 p-6 border border-[#00ff88]/30 bg-black/40 rounded shadow-lg">
        <div className="text-2xl font-bold text-[#00ff88] mb-4">✦ {state.raza} <span className="text-sm text-gray-400 uppercase tracking-widest ml-2">{state.faccion}</span></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm uppercase tracking-widest text-gray-500 mb-2">Ventajas</div>
            <div className="flex flex-col gap-2">
              {v.map((x: string) => <span key={x} className="px-2 py-1 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">{x}</span>)}
            </div>
          </div>
          <div>
            <div className="text-sm uppercase tracking-widest text-gray-500 mb-2">Desventajas</div>
            <div className="flex flex-col gap-2">
              {d.map((x: string) => <span key={x} className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400 border border-red-500/30">{x}</span>)}
            </div>
          </div>
          {e.length > 0 && (
            <div>
              <div className="text-sm uppercase tracking-widest text-gray-500 mb-2">Especial</div>
              <div className="flex flex-col gap-2">
                {e.map((x: string) => <span key={x} className="px-2 py-1 text-xs rounded bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30">✦ {x}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">🪪 Identidad del Personaje</h2>
      <div className="mb-8">
        <label className="block text-gray-400 text-sm uppercase tracking-widest mb-4">Categoría <span className="text-[#00ff88]">*</span></label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Novato', 'Normal'].map(cat => {
            const cd = CATEGORY_DATA[cat];
            const isSelected = state.categoria === cat;
            return (
              <label key={cat} className={`cursor-pointer p-5 border rounded transition-all ${isSelected ? 'border-[#00ff88] bg-[#00ff88]/10' : 'border-gray-700 bg-black/40 hover:border-gray-500'}`}>
                <input
                  type="radio"
                  name="categoria"
                  value={cat}
                  checked={isSelected}
                  onChange={() => handleCategoryChange(cat)}
                  className="sr-only"
                />
                <div className="text-xl font-bold text-white mb-4">{cat === 'Novato' ? '⚔️ Novato' : '🌟 Normal'}</div>
                <ul className="text-sm text-gray-300 space-y-2 mb-4">
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>Puntos Atributo</span><strong className="text-white">{cd.attrPoints}</strong></li>
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>Ranuras (Hechizos/Hab.)</span><strong className="text-white">{cd.slots}</strong></li>
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>Puntos de Vida</span><strong className="text-white">{cd.hpBase}</strong></li>
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>Maná / Espíritu</span><strong className="text-white">{cd.resourceBase}</strong></li>
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>Ranuras Rasgos +</span><strong className="text-white">{cd.positiveSlots}</strong></li>
                  <li className="flex justify-between border-b border-white/10 pb-1"><span>Mín. Rasgos −</span><strong className="text-white">{cd.negativeMin}</strong></li>
                </ul>
                <div className="text-xs text-gray-400">
                  {cat === 'Novato' ? 'Experiencia desafiante. Más restricciones iniciales.' : 'Más opciones desde el inicio. Recomendado.'}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-gray-400 text-sm uppercase tracking-widest mb-4">Raza <span className="text-[#00ff88]">*</span></label>
        <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-700 pb-2">
          {factions.map(f => (
            <button
              key={f}
              className={`px-4 py-2 text-sm uppercase tracking-wider rounded-t ${activeFaction === f ? 'bg-[#00ff88]/20 text-[#00ff88] border-b-2 border-[#00ff88]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              onClick={() => setState(prev => ({ ...prev, faccion: f }))}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {renderRaceCards()}
        </div>
        {renderRacePreview()}
      </div>

      <div className="mb-8 p-4 border border-indigo-500/30 bg-indigo-500/10 rounded flex items-center justify-between">
        <div>
          <label htmlFor="worgenCurse" className="text-lg font-bold text-indigo-300 cursor-pointer flex items-center gap-2">
            🐺 Maldición Huargen
          </label>
          <p className="text-sm text-gray-400 mt-1">Marca esta opción si tu personaje porta la Maldición Huargen.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            id="worgenCurse"
            className="sr-only peer"
            checked={state.isWorgenCurse}
            onChange={(e) => setState({ ...state, isWorgenCurse: e.target.checked })}
          />
          <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-500"></div>
        </label>
      </div>

    </div>
  );
};
