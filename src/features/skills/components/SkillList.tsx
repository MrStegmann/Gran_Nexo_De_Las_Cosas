import React, { useState } from 'react';
import { Card } from '../../../components/Card/Card';

export const SkillList: React.FC<{ skills: any[], color: string, searchQuery?: string }> = ({ skills, color, searchQuery = '' }) => {
  const [filter, setFilter] = useState<string>('Todos');

  const filters = ['Todos', 'Activa', 'Pasiva'];

  const filteredSkills = skills?.filter(s => {
    const matchesFilter = filter === 'Todos' || s['Tipo de habilidad'] === filter || s.Tipo === filter;
    const matchesSearch = searchQuery === '' || 
      s.Nombre?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.Descripción?.toLowerCase().includes(searchQuery.toLowerCase());
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
        {filteredSkills.map((s, idx) => {
          const stats = [];
          if (s.Efecto) stats.push({ label: 'Efecto', value: s.Efecto });
          if (s.Coste) stats.push({ label: 'Coste', value: s.Coste });
          if (s['Coste de Acciones'] !== undefined) stats.push({ label: 'Acciones', value: String(s['Coste de Acciones']) });
          if (s['Coste de Ranuras'] !== undefined) stats.push({ label: 'Ranuras', value: String(s['Coste de Ranuras']) });
          if (s['Turnos de Enfriamiento (Cooldown)'] !== undefined) stats.push({ label: 'Cooldown', value: String(s['Turnos de Enfriamiento (Cooldown)']) });
          
          return (
            <Card
              key={idx}
              title={s.Nombre}
              color={color}
              description={s.Descripción}
              tags={[s['Tipo de habilidad'] || s.Tipo]}
              stats={stats}
            />
          );
        })}
        {filteredSkills.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-10 opacity-50">
            No hay habilidades para este filtro o atributo.
          </div>
        )}
      </div>
    </div>
  );
};
