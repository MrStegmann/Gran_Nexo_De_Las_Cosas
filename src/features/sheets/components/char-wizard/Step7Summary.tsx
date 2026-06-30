import React, { useState } from 'react';
import type { CharacterState, MetaData } from './types';
import { ATTR_ICONS, ATTR_KEY_MAP, CAT_KEY_MAP, CATEGORY_DATA } from './constants';

interface Step7Props {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
  metaData: MetaData | null;
}

export const Step7Summary: React.FC<Step7Props> = ({ state, metaData }) => {
  const [exportString, setExportString] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const cat = CATEGORY_DATA[state.categoria];
  const hp = cat.hpBase + (state.atributos['Constitución'] || 0);
  const mana = cat.resourceBase + (state.atributos['Inteligencia'] || 0);
  const spirit = cat.resourceBase + (state.atributos['Voluntad'] || 0);

  const talentEntries = Object.entries(state.talentos).filter(([, v]) => v > 0);

  const toTraitKey = (nombre: string) => {
    const accents: Record<string, string> = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'ü': 'u', 'Ã': 'A'
    };
    const normalized = nombre
      .replace(/[\u00C0-\u024F]/g, c => accents[c] || c)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[\/\\]/g, ' ')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .trim();
    const words = normalized.split(/\s+/).filter(Boolean);
    return words
      .map((w, i) => i === 0 ? w.charAt(0).toLowerCase() + w.slice(1) : w.charAt(0).toUpperCase() + w.slice(1))
      .join('');
  };

  const buildExportString = () => {
    // 1. Race map
    let RACE_KEY_MAP: Record<string, string> = {};
    if (metaData?.racesData && metaData?.racesKeys) {
      const displayNames: string[] = [];
      Object.values(metaData.racesData).forEach((faction: any) => {
        Object.keys(faction).forEach(raceName => displayNames.push(raceName));
      });
      metaData.racesKeys.forEach((key, i) => {
        if (displayNames[i]) RACE_KEY_MAP[displayNames[i]] = key;
      });
    }

    // 2. Talent map
    let TALENT_KEY_MAP: Record<string, string> = {};
    if (metaData?.attributesData && metaData?.attributesKeys) {
      const attrKeysEs = Object.keys(metaData.attributesData);
      metaData.attributesKeys.forEach((metaAttr) => {
        const attrIndex = metaData.attributesKeys.findIndex(ma => ma.name === metaAttr.name);
        const esAttrKey = attrKeysEs[attrIndex];
        if (esAttrKey) {
          const esTalents = metaData.attributesData[esAttrKey]?.Talentos || [];
          metaAttr.talents.forEach((enKey: string, ti: number) => {
            const esName = esTalents[ti];
            if (esName) TALENT_KEY_MAP[esName] = enKey;
          });
        }
      });
    }

    const raza1 = RACE_KEY_MAP[state.raza] || 'void';
    const raza2 = RACE_KEY_MAP[state.razaSecundaria] || 'void';
    const nivel = '1';
    const categoria = CAT_KEY_MAP[state.categoria] || 'normal';
    const isWorgenCurse = state.isWorgenCurse ? 'true' : 'false';

    const attrPairs = Object.entries(state.atributos)
      .map(([esp, val]) => `${ATTR_KEY_MAP[esp] || esp}=${val}`)
      .join(',');

    const tPairs = talentEntries.length
      ? talentEntries.map(([esp, v]) => `${TALENT_KEY_MAP[esp] || toTraitKey(esp)}=${v}`).join(',')
      : 'void';

    const positivePairs = state.rasgosPositivos.length
      ? state.rasgosPositivos.map(r => `${toTraitKey(r.nombre)}=${r.nivel || 0}`).join(',')
      : 'void';

    const negativePairs = state.rasgosNegativos.length
      ? state.rasgosNegativos.map(r => `${toTraitKey(r)}=1`).join(',')
      : 'void';

    return [
      'GAC:v1',
      raza1,
      raza2,
      nivel,
      categoria,
      attrPairs,
      tPairs,
      isWorgenCurse,
      positivePairs,
      negativePairs
    ].join(':');
  };

  const handleExport = () => {
    setExportString(buildExportString());
  };

  const handleCopy = () => {
    if (exportString) {
      navigator.clipboard.writeText(exportString).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <div className="animate-fade-in pb-12">
      <h2 className="text-3xl font-bold text-white mb-2">🏆 Profesión & Resumen Final</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-white/10">Último paso: define tu trasfondo profesional y revisa toda la ficha.</p>

      <div className="mb-8">
        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Profesión de Trasfondo (En Desarrollo)</label>
        <select
          disabled
          className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-gray-500 cursor-not-allowed focus:outline-none opacity-50"
        >
          <option>WIP - Próximamente</option>
        </select>
      </div>

      <div className="p-6 bg-black/40 border border-white/10 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-6 mb-6">
          <div className="text-2xl font-bold text-white mb-4 md:mb-0">
            {state.nombre} {state.apellidos}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded bg-white/10 text-white font-bold text-sm">{state.categoria}</span>
            <span className="px-3 py-1 rounded bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30 font-bold text-sm">{state.raza || 'Sin raza'}</span>
            {state.faccion && <span className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-bold text-sm uppercase">{state.faccion}</span>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 text-center bg-black/30 p-4 rounded-lg">
          <div className="text-lg text-white">❤️ <strong className="text-xl ml-1">{hp}</strong> <span className="text-sm text-gray-500 uppercase block mt-1">Vida</span></div>
          <div className="text-lg text-white">🔮 <strong className="text-xl ml-1">{mana}</strong> <span className="text-sm text-gray-500 uppercase block mt-1">Maná</span></div>
          <div className="text-lg text-white">🌀 <strong className="text-xl ml-1">{spirit}</strong> <span className="text-sm text-gray-500 uppercase block mt-1">Espíritu</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/5 p-4 rounded">
            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><span className="text-lg">💪</span> Atributos</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(state.atributos).map(([a, v]) => (
                <div key={a} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{ATTR_ICONS[a]} {a}</span>
                  <span className={`font-bold ${v > 0 ? 'text-[#00ff88]' : 'text-gray-600'}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {talentEntries.length > 0 && (
            <div className="bg-white/5 border border-white/5 p-4 rounded">
              <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><span className="text-lg">✨</span> Talentos</h4>
              <div className="flex flex-col gap-2">
                {talentEntries.map(([t, v]) => (
                  <div key={t} className="flex justify-between items-center text-sm border-b border-white/5 pb-1 last:border-0">
                    <span className="text-gray-300">{t}</span>
                    <span className="font-bold text-indigo-400">+{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(state.rasgosPositivos.length > 0 || state.rasgosNegativos.length > 0) && (
            <div className="bg-white/5 border border-white/5 p-4 rounded md:col-span-2">
              <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><span className="text-lg">🎭</span> Rasgos</h4>
              <div className="flex flex-wrap gap-2">
                {state.rasgosPositivos.map(r => (
                  <span key={r.nombre} className="px-2 py-1 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">
                    ✦ {r.nombre}{r.nivel ? ` (Nv.${r.nivel})` : ''}
                  </span>
                ))}
                {state.rasgosNegativos.map(r => (
                  <span key={r} className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400 border border-red-500/30">
                    ✗ {r}
                  </span>
                ))}
              </div>
            </div>
          )}

          {state.aptitudes.filter(a => a.nombre).length > 0 && (
            <div className="bg-white/5 border border-white/5 p-4 rounded md:col-span-2">
              <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><span className="text-lg">⚡</span> Aptitudes</h4>
              <div className="flex flex-col gap-4">
                {state.aptitudes.filter(a => a.nombre).map((a, i) => (
                  <div key={i} className="border-l-2 border-indigo-500 pl-3">
                    <div className="font-bold text-white mb-1">{a.nombre} <span className="text-[10px] uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded ml-2">{a.tipo}</span></div>
                    {a.descripcion && <div className="text-sm text-gray-400">{a.descripcion}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(state.hechizos || state.habilidades) && (
            <div className="bg-white/5 border border-white/5 p-4 rounded md:col-span-2">
              <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2"><span className="text-lg">📖</span> Hechizos & Habilidades</h4>
              {state.hechizos && (
                <div className="mb-4">
                  <strong className="text-[#00d4ff] text-xs uppercase block mb-1">Hechizos:</strong>
                  <div className="text-sm text-gray-300 whitespace-pre-wrap">{state.hechizos}</div>
                </div>
              )}
              {state.habilidades && (
                <div>
                  <strong className="text-orange-400 text-xs uppercase block mb-1">Habilidades:</strong>
                  <div className="text-sm text-gray-300 whitespace-pre-wrap">{state.habilidades}</div>
                </div>
              )}
            </div>
          )}

          {state.profesion && (
            <div className="bg-white/5 border border-white/5 p-4 rounded md:col-span-2">
              <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2"><span className="text-lg">🛠️</span> Profesión</h4>
              <div className="text-white font-bold">{state.profesion}</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-2">📤 Exportar Ficha</h3>
        <p className="text-sm text-gray-400 mb-6">Genera una cadena de texto para importar tu personaje en el Addon ingame.</p>

        <button
          onClick={handleExport}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded shadow-lg transition-colors flex items-center gap-2"
        >
          <span className="text-xl">⬡</span> Generar Cadena de Exportación
        </button>

        {exportString && (
          <div className="mt-6 animate-fade-in">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs uppercase tracking-widest text-indigo-300">Cadena generada — cópiala en el Addon</span>
              <button
                onClick={handleCopy}
                className={`text-sm px-4 py-1 rounded font-bold transition-all ${copied ? 'bg-green-500 text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
              >
                {copied ? '✓ ¡Copiado!' : '📋 Copiar'}
              </button>
            </div>
            <textarea
              readOnly
              className="w-full bg-black border border-indigo-500/50 rounded p-4 text-gray-300 font-mono text-sm resize-none focus:outline-none"
              rows={4}
              value={exportString}
            />
            <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
              <span>✅</span> Formato <strong>GAC:v1</strong> — cadena base lista para importar en el Addon.
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
