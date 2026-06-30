import React, { useState, useMemo, useEffect } from 'react';
import type { CharacterState } from './types';
import { CATEGORY_DATA } from './constants';
import { schoolsData } from '../../../spells/data/spellsData';
import { skillsAttributes } from '../../../skills/data/skillsData';
import { AttributeId } from '../../../constellation/enums/AttributeId';
import { Card } from '../../../../components/Card/Card';

interface Step6Props {
  state: CharacterState;
  setState: React.Dispatch<React.SetStateAction<CharacterState>>;
}

export const Step6Spells: React.FC<Step6Props> = ({ state, setState }) => {
  const cat = CATEGORY_DATA[state.categoria];
  const [activeTab, setActiveTab] = useState<'hechizos' | 'habilidades'>('hechizos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  // Flatten spells
  const allSpells = useMemo(() => {
    return [
      ...schoolsData[AttributeId.INTELIGENCIA].flatMap(s => s.spells?.map((spell: any) => ({ ...spell, schoolName: s.label, color: s.color })) || []),
      ...schoolsData[AttributeId.VOLUNTAD].flatMap(s => s.spells?.map((spell: any) => ({ ...spell, schoolName: s.label, color: s.color })) || [])
    ];
  }, []);

  // Flatten skills
  const allSkills = useMemo(() => {
    return skillsAttributes.flatMap(attr => attr.skills?.map((skill: any) => ({ ...skill, attrName: attr.label, color: attr.color })) || []);
  }, []);

  const handleToggleSpell = (spell: any) => {
    const isSelected = state.selectedSpells.includes(spell.Nombre);
    if (!isSelected) {
      const cost = typeof spell['Ranuras de hechizo'] === 'number' ? spell['Ranuras de hechizo'] : 0;
      if (availableSlots < cost) {
        alert("No tienes suficientes ranuras disponibles.");
        return;
      }
    }

    let newSelected = [];
    if (isSelected) {
      newSelected = state.selectedSpells.filter(n => n !== spell.Nombre);
    } else {
      newSelected = [...state.selectedSpells, spell.Nombre];
    }
    
    // Update string representation for export/summary
    const formatted = newSelected.map(name => {
      const s = allSpells.find(x => x.Nombre === name);
      return s ? `${s.Nombre} (${s['Tipo de hechizo']}, ${s.schoolName}, ${s['Ranuras de hechizo']} ranuras)` : name;
    }).join('\n');

    setState({ ...state, selectedSpells: newSelected, hechizos: formatted });
  };

  const handleToggleSkill = (skill: any) => {
    const isSelected = state.selectedSkills.includes(skill.Nombre);
    if (!isSelected) {
      const cost = typeof skill['Coste de Ranuras'] === 'number' ? skill['Coste de Ranuras'] : 0;
      if (availableSlots < cost) {
        alert("No tienes suficientes ranuras disponibles.");
        return;
      }
    }

    let newSelected = [];
    if (isSelected) {
      newSelected = state.selectedSkills.filter(n => n !== skill.Nombre);
    } else {
      newSelected = [...state.selectedSkills, skill.Nombre];
    }
    
    // Update string representation for export/summary
    const formatted = newSelected.map(name => {
      const s = allSkills.find(x => x.Nombre === name);
      return s ? `${s.Nombre} (${s.Tipo || s['Tipo de habilidad']}, ${s.attrName}, ${s['Coste de Ranuras']} ranuras)` : name;
    }).join('\n');

    setState({ ...state, selectedSkills: newSelected, habilidades: formatted });
  };

  // Calculate used slots
  const usedSlots = useMemo(() => {
    let used = 0;
    state.selectedSpells.forEach(name => {
      const s = allSpells.find(x => x.Nombre === name);
      if (s && typeof s['Ranuras de hechizo'] === 'number') used += s['Ranuras de hechizo'];
    });
    state.selectedSkills.forEach(name => {
      const s = allSkills.find(x => x.Nombre === name);
      if (s && typeof s['Coste de Ranuras'] === 'number') used += s['Coste de Ranuras'];
    });
    return used;
  }, [state.selectedSpells, state.selectedSkills, allSpells, allSkills]);

  const availableSlots = Math.max(0, cat.slots - usedSlots);

  // Filters
  const filteredSpells = useMemo(() => {
    return allSpells.filter(s => {
      const matchesFilter = activeFilter === 'Todos' || s['Tipo de hechizo'] === activeFilter;
      const matchesSearch = searchQuery === '' || 
        s.Nombre?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.Descripción?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [allSpells, activeFilter, searchQuery]);

  const filteredSkills = useMemo(() => {
    return allSkills.filter(s => {
      const tipo = s['Tipo de habilidad'] || s.Tipo;
      const matchesFilter = activeFilter === 'Todos' || tipo === activeFilter || tipo + 's' === activeFilter || tipo === activeFilter + 's';
      const matchesSearch = searchQuery === '' || 
        s.Nombre?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.Descripción?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [allSkills, activeFilter, searchQuery]);

  const spellFilters = ['Todos', 'Truco', 'Rápido', 'Básico', 'Potente'];
  const skillFilters = ['Todos', 'Activa', 'Pasiva'];

  return (
    <div className="animate-fade-in pb-12">
      <h2 className="text-3xl font-bold text-white mb-2">📖 Hechizos & Habilidades</h2>
      <p className="text-gray-400 mb-8 pb-4 border-b border-white/10">Llena tus ranuras disponibles con lo que mejor encaje en tu personaje.</p>

      <div className="flex items-center gap-4 p-4 bg-black/40 border border-[#00ff88]/30 rounded mb-8">
        <span className="text-4xl">🎰</span>
        <div>
          <div className={`text-2xl font-bold ${availableSlots === 0 ? 'text-orange-500' : 'text-[#00ff88]'}`}>
            {availableSlots} <span className="text-sm text-gray-400 font-normal">/ {cat.slots}</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-400">ranuras disponibles</div>
        </div>
        <div className="ml-auto text-sm text-gray-500 border-l border-white/10 pl-4 max-w-xs">
          Mezcla hechizos y habilidades libremente. Selecciona las cartas para añadirlas a tu grimorio.
        </div>
      </div>

      <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
        <button
          className={`px-4 py-2 font-bold uppercase tracking-widest text-sm rounded-t transition-colors ${activeTab === 'hechizos' ? 'bg-[#00d4ff]/20 text-[#00d4ff] border-b-2 border-[#00d4ff]' : 'text-gray-500 hover:text-white'}`}
          onClick={() => { setActiveTab('hechizos'); setActiveFilter('Todos'); }}
        >
          🔮 Hechizos ({state.selectedSpells.length})
        </button>
        <button
          className={`px-4 py-2 font-bold uppercase tracking-widest text-sm rounded-t transition-colors ${activeTab === 'habilidades' ? 'bg-orange-500/20 text-orange-400 border-b-2 border-orange-500' : 'text-gray-500 hover:text-white'}`}
          onClick={() => { setActiveTab('habilidades'); setActiveFilter('Todos'); }}
        >
          ⚔️ Habilidades ({state.selectedSkills.length})
        </button>
      </div>

      {/* Buscador y Filtros */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <input 
          type="text" 
          placeholder={`Buscar ${activeTab}...`} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-black/50 border border-white/20 rounded px-4 py-2 text-white focus:border-[#00ff88] focus:outline-none w-full md:w-64"
        />
        <div className="flex flex-wrap gap-2">
          {(activeTab === 'hechizos' ? spellFilters : skillFilters).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded text-xs uppercase tracking-widest border transition-colors ${
                activeFilter === f 
                  ? 'bg-white/20 text-white border-white/50' 
                  : 'bg-black/40 text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'hechizos' && (
        <div className="animate-fade-in">
          <div className="p-4 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded text-[#00d4ff] mb-6 text-sm">
            Requieren <strong className="text-white">Inteligencia</strong> (arcano, vil, naturaleza, sombras, nigromancia) o <strong className="text-white">Voluntad</strong> (Fe, Elemental, Chi).
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[50vh] custom-scrollbar pr-2 pb-4">
            {filteredSpells.map((s, idx) => {
              const isSelected = state.selectedSpells.includes(s.Nombre);
              const stats = [];
              if (s['Ranuras de hechizo'] !== undefined) stats.push({ label: 'Ranuras', value: String(s['Ranuras de hechizo']) });
              if (s.Acciones !== undefined) stats.push({ label: 'Acciones', value: String(s.Acciones) });
              
              return (
                <div 
                  key={idx} 
                  onClick={() => handleToggleSpell(s)}
                  className={`cursor-pointer transition-all rounded-lg overflow-hidden ${
                    isSelected ? 'ring-2 ring-[#00ff88] scale-[1.02] shadow-[0_0_15px_rgba(0,255,136,0.3)]' : 'opacity-80 hover:opacity-100 hover:scale-[1.01]'
                  }`}
                >
                  <Card
                    title={s.Nombre}
                    color={s.color}
                    description={s.Descripción}
                    tags={[s['Tipo de hechizo'], s.schoolName]}
                    stats={stats}
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#00ff88] text-black text-xs font-bold px-2 py-1 rounded-full z-20 shadow-md">
                      ✓ Seleccionado
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {filteredSpells.length === 0 && (
            <div className="text-center text-gray-500 py-8">No se encontraron hechizos.</div>
          )}
        </div>
      )}

      {activeTab === 'habilidades' && (
        <div className="animate-fade-in">
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded text-orange-300 mb-6 text-sm">
            Técnicas no mágicas (marciales/técnicas). No consumen maná ni espíritu, pero pueden tener cooldown.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[50vh] custom-scrollbar pr-2 pb-4">
            {filteredSkills.map((s, idx) => {
              const isSelected = state.selectedSkills.includes(s.Nombre);
              const stats = [];
              if (s['Coste de Ranuras'] !== undefined) stats.push({ label: 'Ranuras', value: String(s['Coste de Ranuras']) });
              if (s['Coste de Acciones'] !== undefined) stats.push({ label: 'Acciones', value: String(s['Coste de Acciones']) });
              if (s['Turnos de Enfriamiento (Cooldown)'] !== undefined) stats.push({ label: 'Cooldown', value: String(s['Turnos de Enfriamiento (Cooldown)']) });

              return (
                <div 
                  key={idx} 
                  onClick={() => handleToggleSkill(s)}
                  className={`cursor-pointer transition-all rounded-lg overflow-hidden ${
                    isSelected ? 'ring-2 ring-[#00ff88] scale-[1.02] shadow-[0_0_15px_rgba(0,255,136,0.3)]' : 'opacity-80 hover:opacity-100 hover:scale-[1.01]'
                  }`}
                >
                  <Card
                    title={s.Nombre}
                    color={s.color}
                    description={s.Descripción}
                    tags={[s['Tipo de habilidad'] || s.Tipo, s.attrName]}
                    stats={stats}
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#00ff88] text-black text-xs font-bold px-2 py-1 rounded-full z-20 shadow-md">
                      ✓ Seleccionado
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {filteredSkills.length === 0 && (
            <div className="text-center text-gray-500 py-8">No se encontraron habilidades.</div>
          )}
        </div>
      )}
    </div>
  );
};
