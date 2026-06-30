import React, { useState } from 'react';
import { Tesseract, type TesseractSection } from '../../../components/Tesseract/Tesseract';
import { useConstellationStore } from '../../constellation/store/useConstellationStore';

import contextMd from '../../../assets/documents/runes/CONTEXT.md?raw';
import arcaneRunesData from '../../../data/meta/arcane_runes.json';

interface RuneData {
  id: string;
  nombre: string;
  activacion?: string;
  descripcion_base?: string;
  trazado?: {
    tipo_1?: string;
    tipo_2?: string;
    tipo_3?: string;
    tipo_4?: string;
  };
  escalado?: {
    tipo_1?: string;
    tipo_2?: string;
    tipo_3?: string;
    tipo_4?: string;
  };
  preparacion?: string;
  image_url?: string;
}

const RuneCards: React.FC<{ runes: RuneData[], searchQuery?: string, color?: string }> = ({ runes, searchQuery = '', color = '#ffffff' }) => {
  const filteredRunes = runes.filter(r =>
    r.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.descripcion_base && r.descripcion_base.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full text-white p-2 sm:p-4 md:p-6 lg:p-8 font-mono">
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 sm:pr-4 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pb-10">
        {filteredRunes.length === 0 ? (
          <p className="opacity-50 font-mono tracking-[0.2em] uppercase text-sm sm:text-base text-center col-span-full py-12" style={{ color: color }}>
            No hay runas registradas en este tomo.
          </p>
        ) : (
          filteredRunes.map((runa) => (
            <div
              key={runa.id}
              className="relative flex flex-col bg-black/60 border rounded-lg p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group overflow-hidden h-fit"
              style={{ borderColor: `${color}50`, boxShadow: `0 0 15px ${color}15` }}
            >
              {/* Tesseract glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(135deg, transparent 0%, ${color} 50%, transparent 100%)` }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start border-b pb-3 mb-4" style={{ borderColor: `${color}30` }}>
                  <h3
                    className="text-base sm:text-lg font-bold tracking-widest uppercase leading-snug"
                    style={{ color: '#ffffff', textShadow: `0 0 8px ${color}90` }}
                  >
                    {runa.nombre}
                  </h3>
                  <div
                    className="px-2 py-1 text-[10px] sm:text-xs rounded border bg-black/80 uppercase tracking-widest whitespace-nowrap ml-3"
                    style={{ color: color, borderColor: `${color}60`, boxShadow: `0 0 5px ${color}40` }}
                  >
                    {runa.activacion || 'Desconocida'}
                  </div>
                </div>

                <div className="flex-1 text-sm sm:text-base text-gray-200 leading-relaxed font-light opacity-90">
                  {runa.image_url && (
                    <div className="text-center mb-4">
                      <img
                        src={new URL(`../../../assets/${runa.image_url.split('/').pop()}`, import.meta.url).href}
                        alt={runa.nombre}
                        className="max-w-full rounded-md border shadow-[0_4px_10px_rgba(0,0,0,0.5)] mx-auto"
                        style={{ borderColor: `${color}30` }}
                      />
                    </div>
                  )}

                  <p className="mb-5 italic opacity-90">{runa.descripcion_base}</p>

                  {runa.trazado && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: `${color}30` }}>
                      <strong className="block mb-2 uppercase tracking-widest text-xs sm:text-sm font-semibold" style={{ color: color, opacity: 0.9 }}>Trazado:</strong>
                      <ul className="text-xs sm:text-sm text-gray-300 space-y-2">
                        {runa.trazado.tipo_1 && <li className="group/stat hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors"><b style={{ color: color, opacity: 0.8 }} className="uppercase tracking-wider mr-2">Nivel 1:</b> {runa.trazado.tipo_1}</li>}
                        {runa.trazado.tipo_2 && <li className="group/stat hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors"><b style={{ color: color, opacity: 0.8 }} className="uppercase tracking-wider mr-2">Nivel 2:</b> {runa.trazado.tipo_2}</li>}
                        {runa.trazado.tipo_3 && <li className="group/stat hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors"><b style={{ color: color, opacity: 0.8 }} className="uppercase tracking-wider mr-2">Nivel 3:</b> {runa.trazado.tipo_3}</li>}
                        {runa.trazado.tipo_4 && <li className="group/stat hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors"><b style={{ color: color, opacity: 0.8 }} className="uppercase tracking-wider mr-2">Nivel 4:</b> {runa.trazado.tipo_4}</li>}
                      </ul>
                    </div>
                  )}

                  {runa.escalado && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: `${color}30` }}>
                      <strong className="block mb-2 uppercase tracking-widest text-xs sm:text-sm font-semibold" style={{ color: color, opacity: 0.9 }}>Escalado:</strong>
                      <ul className="text-xs sm:text-sm text-gray-300 space-y-2">
                        {runa.escalado.tipo_1 && <li className="group/stat hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors"><b style={{ color: color, opacity: 0.8 }} className="uppercase tracking-wider mr-2">Nivel 1:</b> {runa.escalado.tipo_1}</li>}
                        {runa.escalado.tipo_2 && <li className="group/stat hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors"><b style={{ color: color, opacity: 0.8 }} className="uppercase tracking-wider mr-2">Nivel 2:</b> {runa.escalado.tipo_2}</li>}
                        {runa.escalado.tipo_3 && <li className="group/stat hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors"><b style={{ color: color, opacity: 0.8 }} className="uppercase tracking-wider mr-2">Nivel 3:</b> {runa.escalado.tipo_3}</li>}
                        {runa.escalado.tipo_4 && <li className="group/stat hover:bg-white/5 px-2 py-1 -mx-2 rounded transition-colors"><b style={{ color: color, opacity: 0.8 }} className="uppercase tracking-wider mr-2">Nivel 4:</b> {runa.escalado.tipo_4}</li>}
                      </ul>
                    </div>
                  )}

                  {runa.preparacion && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: `${color}30` }}>
                      <strong className="block mb-1 uppercase tracking-widest text-xs sm:text-sm font-semibold" style={{ color: color, opacity: 0.9 }}>Preparación:</strong>
                      <span className="text-gray-200 text-xs sm:text-sm block">{runa.preparacion}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const runesSections: TesseractSection[] = [
  {
    id: 'context',
    title: '1. El Arte de las Runas',
    markdown: contextMd
  },
  {
    id: 'arcane',
    title: '2. Runas Arcanas',
    markdown: '',
    customComponent: <RuneCards runes={arcaneRunesData as RuneData[]} color="#ffffff" />
  }
];

export const RunesFeature: React.FC = () => {
  const setSelectedNode = useConstellationStore((state) => state.setSelectedNode);
  const transitioningNodeId = useConstellationStore((state) => state.transitioningNodeId);
  const returningNodeId = useConstellationStore((state) => state.returningNodeId);

  return (
    <div className={`w-full mt-[1%] h-[80vh] pointer-events-auto relative md:absolute md:top-0 md:left-0 md:mt-0 md:w-[80%] md:h-[95vh] md:max-w-none md:z-40 flex items-center justify-center transition-opacity duration-700 ${transitioningNodeId || returningNodeId ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <Tesseract
        color="#ffffff"
        sections={runesSections}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
