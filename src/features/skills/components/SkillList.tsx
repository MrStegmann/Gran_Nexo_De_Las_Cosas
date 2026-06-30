import React from 'react';
import { Card } from '../../../components/Card/Card';

export const SkillList: React.FC<{ skills: any[], color: string, searchQuery?: string, activeFilter?: string }> = ({ skills, color, searchQuery = '', activeFilter = 'Todos' }) => {
  const filteredSkills = skills?.filter(s => {
    const tipo = s['Tipo de habilidad'] || s.Tipo;
    const matchesFilter = activeFilter === 'Todos' || tipo === activeFilter || tipo + 's' === activeFilter || tipo === activeFilter + 's';
    const matchesSearch = searchQuery === '' || 
      s.Nombre?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.Descripción?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  const order = ['Pasiva', 'Activa'];
  const groupedSkills = order.map(type => ({
    type,
    items: filteredSkills.filter(s => {
      const tipo = s['Tipo de habilidad'] || s.Tipo;
      return tipo === type || tipo === type + 's';
    })
  })).filter(g => g.items.length > 0);

  const otherSkills = filteredSkills.filter(s => {
    const tipo = s['Tipo de habilidad'] || s.Tipo;
    return !order.some(t => tipo === t || tipo === t + 's');
  });

  if (otherSkills.length > 0) {
    groupedSkills.push({ type: 'Otros', items: otherSkills });
  }

  return (
    <div className="flex flex-col h-full text-white">
      <div className="flex flex-col gap-6 pb-10 overflow-y-auto custom-scrollbar flex-1 pr-2">
        {groupedSkills.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-4">
            <h3 className="text-xl font-bold border-b border-opacity-30 pb-2 mb-2 capitalize" style={{ borderColor: color }}>
              {group.type}s
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {group.items.map((s, idx) => {
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
            </div>
          </div>
        ))}
        {filteredSkills.length === 0 && (
          <div className="text-center py-10 opacity-50">
            No hay habilidades para este filtro o atributo.
          </div>
        )}
      </div>
    </div>
  );
};
