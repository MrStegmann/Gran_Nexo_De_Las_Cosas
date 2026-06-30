import React, { useState } from 'react';
import { Card } from '../../../components/Card/Card';

export const SpellList: React.FC<{ spells: any[], color: string, searchQuery?: string }> = ({ spells, color, searchQuery = '' }) => {
  const [filter, setFilter] = useState<string>('Todos');

  const filters = ['Todos', 'Truco', 'Rápido', 'Básico', 'Potente'];

  const filteredSpells = spells?.filter(s => {
    const matchesFilter = filter === 'Todos' || s['Tipo de hechizo'] === filter;
    const matchesSearch = searchQuery === '' || 
      s.Nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.Descripción.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  return (
    <div className="flex flex-col h-full text-white">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded border text-sm transition-colors ${filter === f ? 'bg-opacity-40' : 'bg-transparent border-opacity-30 hover:bg-opacity-10'}`}
              style={{ 
                borderColor: color, 
                backgroundColor: filter === f ? color : 'transparent',
                textShadow: filter === f ? '0 0 5px rgba(255,255,255,0.5)' : 'none'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10 overflow-y-auto custom-scrollbar flex-1 pr-2">
        {filteredSpells.map((s, idx) => {
          const stats = [];
          if (s.Efecto) stats.push({ label: 'Efecto', value: s.Efecto });
          if (s['Ranuras de hechizo'] !== undefined) stats.push({ label: 'Ranuras', value: String(s['Ranuras de hechizo']) });
          if (s.Acciones) stats.push({ label: 'Acciones', value: String(s.Acciones) });
          if (s.Maná !== undefined) stats.push({ label: 'Maná', value: String(s.Maná) });
          if (s.Espíritu !== undefined) stats.push({ label: 'Espíritu', value: String(s.Espíritu) });

          return (
            <Card
              key={idx}
              title={s.Nombre}
              color={color}
              description={s.Descripción}
              tags={[s['Tipo de hechizo']]}
              stats={stats}
            />
          );
        })}
        {filteredSpells.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-10 opacity-50">
            No hay hechizos para este filtro o escuela.
          </div>
        )}
      </div>
    </div>
  );
};
