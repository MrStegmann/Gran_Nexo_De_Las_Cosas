import type { CharacterState, MetaData } from './types';
import { ATTR_KEY_MAP, CAT_KEY_MAP } from './constants';

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

export const buildExportString = (state: CharacterState, metaData: MetaData | null): string => {
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

  const talentEntries = Object.entries(state.talentos).filter(([, v]) => v > 0);

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
