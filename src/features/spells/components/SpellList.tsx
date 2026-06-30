import React from 'react';
import { Card } from '../../../components/Card/Card';

export const SpellList: React.FC<{ spells: any[], color: string, searchQuery?: string, activeFilter?: string }> = ({ spells, color, searchQuery = '', activeFilter = 'Todos' }) => {
  const filteredSpells = spells?.filter(s => {
    const matchesFilter = activeFilter === 'Todos' || s['Tipo de hechizo'] === activeFilter;
    const matchesSearch = searchQuery === '' || 
      s.Nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.Descripción.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  const order = ['Truco', 'Rápido', 'Básico', 'Potente'];
  const groupedSpells = order.map(type => ({
    type,
    items: filteredSpells.filter(s => s['Tipo de hechizo'] === type)
  })).filter(g => g.items.length > 0);

  const otherSpells = filteredSpells.filter(s => !order.includes(s['Tipo de hechizo']));
  if (otherSpells.length > 0) {
    groupedSpells.push({ type: 'Otros', items: otherSpells });
  }

  return (
    <div className="flex flex-col h-full text-white">
      <div className="flex flex-col gap-6 pb-10 overflow-y-auto custom-scrollbar flex-1 pr-2">
        {groupedSpells.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-4">
            <h3 className="text-xl font-bold border-b border-opacity-30 pb-2 mb-2" style={{ borderColor: color }}>
              {group.type}
            </h3>
            <div className="flex flex-col gap-4">
              {group.items.map((s, idx) => {
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
            </div>
          </div>
        ))}
        {filteredSpells.length === 0 && (
          <div className="text-center py-10 opacity-50">
            No hay hechizos para este filtro o escuela.
          </div>
        )}
      </div>
    </div>
  );
};
