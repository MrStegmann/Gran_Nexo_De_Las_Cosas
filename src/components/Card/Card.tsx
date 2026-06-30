import React from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  color?: string;
  imageUrl?: string;
  description: React.ReactNode;
  tags?: string[];
  stats?: { label: string; value: string | React.ReactNode }[];
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  color = '#ffffff',
  imageUrl,
  description,
  tags,
  stats
}) => {
  return (
    <div 
      className="bg-black/60 border rounded-lg p-4 flex flex-col transition-all h-fit relative overflow-hidden group hover:-translate-y-1"
      style={{ borderColor: `${color}40` }}
    >
      {/* Background glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }}
      />
      
      <div className="flex justify-between items-start border-b pb-2 mb-3 relative z-10" style={{ borderColor: `${color}20` }}>
        <div>
          <h3 className="text-xl font-bold text-white drop-shadow-md">{title}</h3>
          {subtitle && (
            <div className="text-xs text-white/60 uppercase tracking-widest mt-1">
              {subtitle}
            </div>
          )}
        </div>
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-end max-w-[50%]">
            {tags.map((tag, i) => (
              <div 
                key={i} 
                className="px-2 py-1 rounded text-[10px] text-white/90 border bg-black/50 uppercase tracking-wider"
                style={{ borderColor: `${color}40`, boxShadow: `0 0 5px ${color}20` }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex-1 text-sm text-white/90 relative z-10">
        {imageUrl && (
          <div className="text-center mb-4">
            <img
              src={imageUrl}
              alt={title}
              className="max-w-full rounded-md border shadow-[0_4px_10px_rgba(0,0,0,0.5)] mx-auto"
              style={{ borderColor: `${color}30` }}
            />
          </div>
        )}
        
        <div className="mb-4 opacity-90 leading-relaxed">
          {description}
        </div>
        
        {stats && stats.length > 0 && (
          <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: `${color}20` }}>
            {stats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <strong className="text-white/80">{stat.label}:</strong>
                <span className="text-gray-300 text-right">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
