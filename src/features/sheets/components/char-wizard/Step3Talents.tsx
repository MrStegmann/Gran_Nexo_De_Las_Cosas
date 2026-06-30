import React from 'react';
import type { CharacterState, MetaData } from './types';
import { ATTR_ICONS } from './constants';

interface Step3Props {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
  metaData: MetaData | null;
}

export const Step3Talents: React.FC<Step3Props> = ({ state, setState, metaData }) => {
  const attrEntries = Object.entries(state.atributos).filter(([, val]) => val > 0);

  const talentSpent = (attr: string) => {
    if (!metaData?.attributesData) return 0;
    const talents = metaData.attributesData[attr]?.Talentos || [];
    return talents.reduce((sum: number, t: string) => sum + (state.talentos[t] || 0), 0);
  };

  const talentRemaining = (attr: string) => {
    return (state.atributos[attr] || 0) * 2 - talentSpent(attr);
  };

  const handleMinus = (talent: string) => {
    if ((state.talentos[talent] || 0) > 0) {
      setState({ ...state, talentos: { ...state.talentos, [talent]: state.talentos[talent] - 1 } });
    }
  };

  const handlePlus = (talent: string, attr: string) => {
    if (talentRemaining(attr) > 0) {
      setState({ ...state, talentos: { ...state.talentos, [talent]: (state.talentos[talent] || 0) + 1 } });
    }
  };

  if (attrEntries.length === 0) {
    return (
      <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6">✨ Talentos</h2>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/50 rounded text-yellow-200 mb-4">
          No tienes puntos en ningún atributo, por lo que <strong>no hay puntos de talento</strong> que distribuir. Puedes volver al paso anterior para asignar atributos, o continuar así.
        </div>
        <p className="text-sm text-gray-400">Los talentos se desbloquean cuando inviertes puntos en su atributo. Cada punto de atributo otorga 2 puntos de talento.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-2">✨ Talentos</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-white/10">Cada punto de atributo te da <strong className="text-indigo-400">2 puntos de talento</strong> para gastar dentro de esa rama. Son exclusivos de su atributo.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attrEntries.map(([attr, attrVal]) => {
          const total = attrVal * 2;
          const rem = talentRemaining(attr);
          const talents = metaData?.attributesData ? (metaData.attributesData[attr]?.Talentos || []) : [];

          return (
            <div key={attr} className="bg-black/40 border border-white/10 rounded overflow-hidden flex flex-col">
              <div className="bg-white/5 border-b border-white/10 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white">
                  <span>{ATTR_ICONS[attr]}</span> {attr}
                </div>
                <div className={`text-xs px-2 py-1 rounded font-bold ${rem === 0 ? 'bg-green-500/20 text-green-400' : 'bg-indigo-500/20 text-indigo-400'}`}>
                  {rem} / {total} pts
                </div>
              </div>
              <div className="p-3 flex flex-col gap-2">
                {talents.map((talent: string) => (
                  <div key={talent} className="flex items-center justify-between bg-black/30 p-2 rounded">
                    <span className="text-sm text-gray-300">{talent}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMinus(talent)}
                        disabled={(state.talentos[talent] || 0) <= 0}
                        className="w-6 h-6 flex items-center justify-center rounded bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                      >−</button>
                      <span className="w-4 text-center text-sm font-bold text-white">{state.talentos[talent] || 0}</span>
                      <button
                        onClick={() => handlePlus(talent, attr)}
                        disabled={rem <= 0}
                        className="w-6 h-6 flex items-center justify-center rounded bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/40 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
