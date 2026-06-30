import React from 'react';

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
    <div className="flex flex-col h-full text-white p-2 sm:p-4 md:p-6 lg:p-8 font-mono">
      <div className="flex flex-col gap-8 md:gap-10 pb-10 overflow-y-auto custom-scrollbar flex-1 min-h-0 pr-2 sm:pr-4">
        {groupedSkills.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-4 sm:gap-6">
            <h3 
              className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.2em] border-b pb-2 sm:pb-3 mb-2 sm:mb-4 drop-shadow-md" 
              style={{ borderColor: color, color: color, textShadow: `0 0 12px ${color}80` }}
            >
              {group.type}s
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {group.items.map((s, idx) => {
                const stats = [];
                if (s.Efecto) stats.push({ label: 'Efecto', value: s.Efecto });
                if (s.Coste) stats.push({ label: 'Coste', value: s.Coste });
                if (s['Coste de Acciones'] !== undefined) stats.push({ label: 'Acciones', value: String(s['Coste de Acciones']) });
                if (s['Coste de Ranuras'] !== undefined) stats.push({ label: 'Ranuras', value: String(s['Coste de Ranuras']) });
                if (s['Turnos de Enfriamiento (Cooldown)'] !== undefined) stats.push({ label: 'Cooldown', value: String(s['Turnos de Enfriamiento (Cooldown)']) });

                return (
                  <div 
                    key={idx}
                    className="relative flex flex-col bg-black/60 border rounded-lg p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group overflow-hidden"
                    style={{ borderColor: `${color}50`, boxShadow: `0 0 15px ${color}15` }}
                  >
                    {/* Tesseract glow overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, transparent 0%, ${color} 50%, transparent 100%)` }}
                    />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start border-b pb-3 mb-4" style={{ borderColor: `${color}30` }}>
                        <h4 
                          className="text-base sm:text-lg font-bold tracking-widest uppercase leading-snug"
                          style={{ color: '#ffffff', textShadow: `0 0 8px ${color}90` }}
                        >
                          {s.Nombre}
                        </h4>
                        <div 
                          className="px-2 py-1 text-[10px] sm:text-xs rounded border bg-black/80 uppercase tracking-widest whitespace-nowrap ml-3"
                          style={{ color: color, borderColor: `${color}60`, boxShadow: `0 0 5px ${color}40` }}
                        >
                          {s['Tipo de habilidad'] || s.Tipo}
                        </div>
                      </div>
                      
                      <div className="flex-1 text-sm sm:text-base text-gray-200 leading-relaxed font-light mb-5 opacity-90">
                        {s.Descripción}
                      </div>
                      
                      {stats.length > 0 && (
                        <div className="mt-auto pt-3 sm:pt-4 border-t space-y-1 sm:space-y-2 text-xs sm:text-sm" style={{ borderColor: `${color}30` }}>
                          {stats.map((stat, i) => (
                            <div key={i} className="flex justify-between items-center group/stat hover:bg-white/5 px-2 py-1 rounded transition-colors -mx-2">
                              <span className="font-semibold uppercase tracking-widest" style={{ color: color, opacity: 0.9 }}>
                                {stat.label}
                              </span>
                              <span className="text-gray-200 font-medium text-right ml-2">
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12 opacity-50 font-mono tracking-[0.2em] uppercase text-sm sm:text-base" style={{ color: color }}>
            No hay habilidades para este filtro o atributo.
          </div>
        )}
      </div>
    </div>
  );
};
