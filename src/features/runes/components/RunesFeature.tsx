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

const RuneCards: React.FC<{ runes: RuneData[], searchQuery?: string }> = ({ runes, searchQuery = '' }) => {
  const filteredRunes = runes.filter(r =>
    r.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.descripcion_base && r.descripcion_base.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max">
        {filteredRunes.length === 0 ? (
          <p className="text-gray-400 text-center col-span-full">No hay runas registradas en este tomo.</p>
        ) : (
          filteredRunes.map((runa) => (
            <div key={runa.id} className="bg-black/60 border border-white/20 rounded-lg p-4 flex flex-col hover:border-white/40 transition-colors h-fit">
              <div className="flex justify-between items-start border-b border-white/20 pb-2 mb-3">
                <h3 className="text-xl font-bold text-white">{runa.nombre}</h3>
                <div className="bg-white/10 px-2 py-1 rounded text-xs text-white/80 border border-white/10 uppercase tracking-wider">
                  {runa.activacion || 'Desconocida'}
                </div>
              </div>
              
              <div className="flex-1 text-sm text-white/90">
                {runa.image_url && (
                  <div className="text-center mb-4">
                    <img
                      src={new URL(`../../../assets/${runa.image_url.split('/').pop()}`, import.meta.url).href}
                      alt={runa.nombre}
                      className="max-w-full rounded-md border border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.5)] mx-auto"
                    />
                  </div>
                )}
                
                <p className="mb-4 italic opacity-90">{runa.descripcion_base}</p>
                
                {runa.trazado && (
                  <div className="mt-4">
                    <strong className="text-white block mb-1">Trazado:</strong>
                    <ul className="pl-5 text-sm text-gray-300 list-disc space-y-1">
                      {runa.trazado.tipo_1 && <li><b className="text-white">Nivel 1:</b> {runa.trazado.tipo_1}</li>}
                      {runa.trazado.tipo_2 && <li><b className="text-white">Nivel 2:</b> {runa.trazado.tipo_2}</li>}
                      {runa.trazado.tipo_3 && <li><b className="text-white">Nivel 3:</b> {runa.trazado.tipo_3}</li>}
                      {runa.trazado.tipo_4 && <li><b className="text-white">Nivel 4:</b> {runa.trazado.tipo_4}</li>}
                    </ul>
                  </div>
                )}
                
                {runa.escalado && (
                  <div className="mt-4">
                    <strong className="text-white block mb-1">Escalado:</strong>
                    <ul className="pl-5 text-sm text-gray-300 list-disc space-y-1">
                      {runa.escalado.tipo_1 && <li><b className="text-white">Nivel 1:</b> {runa.escalado.tipo_1}</li>}
                      {runa.escalado.tipo_2 && <li><b className="text-white">Nivel 2:</b> {runa.escalado.tipo_2}</li>}
                      {runa.escalado.tipo_3 && <li><b className="text-white">Nivel 3:</b> {runa.escalado.tipo_3}</li>}
                      {runa.escalado.tipo_4 && <li><b className="text-white">Nivel 4:</b> {runa.escalado.tipo_4}</li>}
                    </ul>
                  </div>
                )}
                
                {runa.preparacion && (
                  <div className="mt-4">
                    <strong className="text-white">Preparación:</strong> <span className="text-gray-300 text-sm">{runa.preparacion}</span>
                  </div>
                )}
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
    customComponent: <RuneCards runes={arcaneRunesData as RuneData[]} />
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
