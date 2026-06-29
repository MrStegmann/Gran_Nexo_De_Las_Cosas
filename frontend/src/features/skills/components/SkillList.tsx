import React, { useState } from 'react';

export const SkillList: React.FC<{ skills: any[], color: string }> = ({ skills, color }) => {
  const [filter, setFilter] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filters = ['Todos', 'Activa', 'Pasiva'];

  const filteredSkills = skills?.filter(s => {
    const matchesFilter = filter === 'Todos' || s['Tipo de habilidad'] === filter;
    const matchesSearch = searchQuery === '' || 
      s.Nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.Descripción.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  return (
    <div className="flex flex-col h-full text-white">
      <div className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar habilidades..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 bg-black/50 border rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-all text-sm"
          style={{ borderColor: `${color}60`, outlineColor: color }}
        />
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
        {filteredSkills.map((s, idx) => (
          <div key={idx} className="bg-black/50 border rounded p-4 flex flex-col" style={{ borderColor: `${color}40` }}>
            <h3 className="text-lg font-bold mb-2" style={{ color }}>{s.Nombre}</h3>
            <p className="text-sm opacity-90 mb-3 flex-1">{s.Descripción}</p>
            <div className="text-xs opacity-70 grid grid-cols-2 gap-2 mt-auto pt-2 border-t" style={{ borderColor: `${color}20` }}>
              <div><strong>Tipo:</strong> {s['Tipo de habilidad']}</div>
              <div><strong>Efecto:</strong> {s.Efecto}</div>
              {s.Coste && <div><strong>Coste:</strong> {s.Coste}</div>}
            </div>
          </div>
        ))}
        {filteredSkills.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-10 opacity-50">
            No hay habilidades para este filtro o atributo.
          </div>
        )}
      </div>
    </div>
  );
};
