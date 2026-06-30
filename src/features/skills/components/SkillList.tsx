import React from 'react';
import { Card } from '../../../components/Card/Card';

export const SkillList: React.FC<{ skills: any[], color: string, searchQuery?: string, activeFilter?: string }> = ({ skills, color, searchQuery = '', activeFilter = 'Todos' }) => {
  const filteredSkills = skills?.filter(s => {
    const matchesFilter = activeFilter === 'Todos' || s['Tipo de habilidad'] === activeFilter || s.Tipo === activeFilter;
    const matchesSearch = searchQuery === '' || 
      s.Nombre?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.Descripción?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];
    return (
      <div className="flex flex-col h-full text-white">
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
