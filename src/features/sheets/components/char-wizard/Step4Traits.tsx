import React from 'react';
import type { CharacterState, MetaData } from './types';
import { CATEGORY_DATA } from './constants';

interface Step4Props {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
  metaData: MetaData | null;
}

export const Step4Traits: React.FC<Step4Props> = ({ state, setState, metaData }) => {
  const cat = CATEGORY_DATA[state.categoria];
  
  const usedPositiveSlots = () => {
    return state.rasgosPositivos.reduce((sum, r) => sum + (r.nivel === 2 ? 2 : 1), 0);
  };

  const slotsUsed = usedPositiveSlots();
  const slotsTotal = cat.positiveSlots;
  const selectedNeg = state.rasgosNegativos.length;

  const isIncompatible = (traitName: string) => {
    if (!metaData?.negativeTraits) return false;
    return state.rasgosNegativos.some(r => {
      const t = metaData.negativeTraits.find(nt => nt.Nombre === r);
      return t?.Incompatibilidad === traitName;
    }) || (() => {
      const td = metaData.negativeTraits.find(t => t.Nombre === traitName);
      return td?.Incompatibilidad && state.rasgosNegativos.includes(td.Incompatibilidad);
    })();
  };

  const handlePositiveClick = (traitName: string) => {
    const existing = state.rasgosPositivos.find(r => r.nombre === traitName);
    if (existing) {
      setState({
        ...state,
        rasgosPositivos: state.rasgosPositivos.filter(r => r.nombre !== traitName)
      });
    } else {
      if (slotsUsed >= slotsTotal) return;
      const traitData = metaData?.positiveTraits.find(t => t.Nombre === traitName);
      const levels = [1, 2, 3].filter(l => traitData?.[`Nivel ${l}`] !== null && traitData?.[`Nivel ${l}`] !== undefined);
      const defaultLevel = levels.length > 0 ? 1 : null;
      setState({
        ...state,
        rasgosPositivos: [...state.rasgosPositivos, { nombre: traitName, nivel: defaultLevel }]
      });
    }
  };

  const handleLevelClick = (e: React.MouseEvent, traitName: string, level: number) => {
    e.stopPropagation();
    const existing = state.rasgosPositivos.find(r => r.nombre === traitName);
    if (existing) {
      const currentCost = existing.nivel === 2 ? 2 : 1;
      const newCost = level === 2 ? 2 : 1;
      const slotsWithoutThis = slotsUsed - currentCost;
      if (slotsWithoutThis + newCost > slotsTotal) return;
      setState({
        ...state,
        rasgosPositivos: state.rasgosPositivos.map(r => r.nombre === traitName ? { ...r, nivel: level } : r)
      });
    }
  };

  const handleNegativeClick = (traitName: string) => {
    const isSel = state.rasgosNegativos.includes(traitName);
    const incompat = isIncompatible(traitName);

    if (incompat && !isSel) return;

    if (isSel) {
      setState({
        ...state,
        rasgosNegativos: state.rasgosNegativos.filter(r => r !== traitName)
      });
    } else {
      setState({
        ...state,
        rasgosNegativos: [...state.rasgosNegativos, traitName]
      });
    }
  };

  return (
    <div className="animate-fade-in pb-12">
      <h2 className="text-3xl font-bold text-white mb-2">🎭 Rasgos</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-white/10">Los rasgos definen la personalidad mecánica. Los rasgos negativos <strong className="text-red-400">deben ser interpretados</strong>.</p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 p-4 bg-green-500/10 border border-green-500/30 rounded flex flex-col justify-center">
          <div className="flex items-center gap-2 text-green-400 font-bold mb-1">
            <span className="text-xl">✦</span> Ranuras positivas: <span className="text-white ml-2 text-xl">{slotsUsed} / {slotsTotal}</span>
          </div>
          <div className="text-xs text-green-500/70">(Nv.1 = 1 ranura · Nv.2 = 2 ranuras)</div>
        </div>
        <div className="flex-1 p-4 bg-red-500/10 border border-red-500/30 rounded flex flex-col justify-center">
          <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
            <span className="text-xl">✗</span> Negativos: <span className="text-white ml-2 text-xl">{selectedNeg}</span>
          </div>
          <div className="text-xs text-red-500/70">(mín. {cat.negativeMin} — sin máximo)</div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest text-[#00ff88]">Rasgos Positivos</h3>
      <p className="text-sm text-gray-500 mb-4">Muchos rasgos tienen 3 niveles. Haz clic para seleccionar y elige el nivel.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {metaData?.positiveTraits?.map(trait => {
          const sel = state.rasgosPositivos.find(r => r.nombre === trait.Nombre);
          const levels = [1, 2, 3].filter(l => trait[`Nivel ${l}`] !== null && trait[`Nivel ${l}`] !== undefined);
          const hasLevels = levels.length > 0;
          const isDisabled = !sel && slotsUsed >= slotsTotal;

          return (
            <div
              key={trait.Nombre}
              onClick={() => handlePositiveClick(trait.Nombre)}
              className={`p-4 border rounded cursor-pointer transition-all flex flex-col h-full ${
                sel ? 'border-[#00ff88] bg-[#00ff88]/10' : 
                isDisabled ? 'border-gray-800 bg-black/20 opacity-50 cursor-not-allowed' : 
                'border-gray-700 bg-black/40 hover:border-gray-500'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`font-bold ${sel ? 'text-[#00ff88]' : 'text-white'}`}>{trait.Nombre}</div>
                {sel && <div className="text-[#00ff88] font-bold">✓</div>}
              </div>
              <div className="text-xs text-gray-400 flex-1">{(trait.Descripción || '').split('\n')[0]}</div>
              
              {hasLevels && (
                <div className={`mt-4 flex gap-2 ${sel ? '' : 'hidden'}`}>
                  {levels.map(l => {
                    const currentCost = sel?.nivel === 2 ? 2 : 1;
                    const newCost = l === 2 ? 2 : 1;
                    const slotsWithoutThis = slotsUsed - currentCost;
                    const btnDisabled = slotsWithoutThis + newCost > slotsTotal;
                    
                    return (
                      <button
                        key={l}
                        disabled={btnDisabled}
                        onClick={(e) => handleLevelClick(e, trait.Nombre, l)}
                        className={`px-2 py-1 text-xs rounded border transition-colors ${
                          sel?.nivel === l 
                            ? 'bg-[#00ff88] text-black border-[#00ff88] font-bold' 
                            : btnDisabled 
                              ? 'bg-gray-800 text-gray-600 border-gray-700 cursor-not-allowed' 
                              : 'bg-black text-gray-300 border-gray-600 hover:border-[#00ff88]'
                        }`}
                      >
                        Nv.{l}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest text-red-400">Rasgos Negativos</h3>
      <p className="text-sm text-gray-500 mb-4">El Máster puede intervenir si no los interpretas correctamente.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metaData?.negativeTraits?.map(trait => {
          const sel = state.rasgosNegativos.includes(trait.Nombre);
          const incompat = isIncompatible(trait.Nombre);

          return (
            <div
              key={trait.Nombre}
              onClick={() => handleNegativeClick(trait.Nombre)}
              className={`p-4 border rounded cursor-pointer transition-all flex flex-col h-full ${
                sel ? 'border-red-500 bg-red-500/10' : 
                incompat ? 'border-gray-800 bg-black/20 opacity-30 cursor-not-allowed' : 
                'border-gray-700 bg-black/40 hover:border-gray-500'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`font-bold ${sel ? 'text-red-400' : incompat ? 'text-gray-500 line-through' : 'text-white'}`}>{trait.Nombre}</div>
                {sel && <div className="text-red-500 font-bold">✓</div>}
                {incompat && !sel && <div className="text-xs text-red-700 font-bold px-1 bg-red-900/30 rounded">✗ Incomp.</div>}
              </div>
              <div className="text-xs text-gray-400 flex-1">{(trait.Descripción || '').split('\n')[0]}</div>
              {trait.Incompatibilidad && (
                <div className="mt-2 text-[10px] text-gray-500 bg-black/50 p-1 rounded">No comp. con: {trait.Incompatibilidad}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
