import React, { useState, useMemo } from "react";

// Import all JSON files directly
import cueros from "../../../../sistema_de_rol/professions/cueros.json";
import encantamiento from "../../../../sistema_de_rol/professions/encantamiento.json";
import gemas from "../../../../sistema_de_rol/professions/gemas.json";
import hierbas from "../../../../sistema_de_rol/professions/hierbas.json";
import maderas from "../../../../sistema_de_rol/professions/maderas.json";
import minerales from "../../../../sistema_de_rol/professions/minerales.json";
import telas from "../../../../sistema_de_rol/professions/telas.json";
import { renderWithHighlights } from "../../../components/Tesseract/Tesseract";
import type { MaterialItem } from "../types";

const collections: Record<string, MaterialItem[]> = {
  Cueros: cueros,
  Encantamiento: encantamiento,
  Gemas: gemas,
  Hierbas: hierbas,
  Maderas: maderas,
  Minerales: minerales,
  Telas: telas,
};

export const gatheringMatchSearch = (query: string) => {
  const q = query.toLowerCase();
  return Object.values(collections).some(list =>
    list.some(item => Object.values(item).some(val => val && val.toString().toLowerCase().includes(q)))
  );
};

export const Gathering: React.FC<{ searchQuery?: string }> = ({ searchQuery = "" }) => {
  const [activeTab, setActiveTab] = useState<string>("Cueros");

  // Filter states
  const [localSearch, setLocalSearch] = useState("");
  const search = searchQuery || localSearch;
  const [priceMin, setPriceMin] = useState<number | "">("");
  const [priceMax, setPriceMax] = useState<number | "">("");
  const [mapFilter, setMapFilter] = useState("");
  const [qualityFilter, setQualityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");

  const currentList = collections[activeTab] || [];

  // Derived options for filters based on current list
  const uniqueMaps = useMemo(() => Array.from(new Set(currentList.map(item => item.map).filter(Boolean))), [currentList]);
  const uniqueQualities = useMemo(() => Array.from(new Set(currentList.map(item => item.quality).filter(Boolean))), [currentList]);
  const uniqueTypes = useMemo(() => Array.from(new Set(currentList.map(item => item.type).filter(Boolean))), [currentList]);
  const uniqueMaterials = useMemo(() => Array.from(new Set(currentList.map(item => item.material).filter(Boolean))), [currentList]);

  const filteredList = useMemo(() => {
    return currentList.filter((item) => {
      // 1. Text Search (Global across properties of the item)
      if (search) {
        const query = search.toLowerCase();
        const matchesSearch = Object.values(item).some(val =>
          val && val.toString().toLowerCase().includes(query)
        );
        if (!matchesSearch) return false;
      }

      // 2. Price Range
      if (priceMin !== "" && item.price < priceMin) return false;
      if (priceMax !== "" && item.price > priceMax) return false;

      // 3. Map
      if (mapFilter && item.map !== mapFilter) return false;

      // 4. Quality
      if (qualityFilter && item.quality !== qualityFilter) return false;

      // 5. Type (Dynamic)
      if (typeFilter && item.type !== typeFilter) return false;

      // 6. Material (Dynamic)
      if (materialFilter && item.material !== materialFilter) return false;

      return true;
    });
  }, [currentList, search, priceMin, priceMax, mapFilter, qualityFilter, typeFilter, materialFilter]);

  // Reset dynamic filters when changing tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setLocalSearch("");
    setPriceMin("");
    setPriceMax("");
    setMapFilter("");
    setQualityFilter("");
    setTypeFilter("");
    setMaterialFilter("");
  };

  const matchCounts = useMemo(() => {
    if (!search) return null;
    const q = search.toLowerCase();
    const counts: Record<string, number> = {};
    for (const [tab, list] of Object.entries(collections)) {
      counts[tab] = list.filter(item =>
        Object.values(item).some(val => val && val.toString().toLowerCase().includes(q))
      ).length;
    }
    return counts;
  }, [search]);

  const translateQuality = (q: string) => {
    switch (q) {
      case "common": return "Común";
      case "uncommon": return "Poco Común";
      case "rare": return "Raro";
      case "epic": return "Épico";
      case "legendary": return "Legendario";
      default: return q;
    }
  };

  const translateType = (t?: string) => {
    if (!t) return "";
    switch (t) {
      case "cloth": return "Tela";
      case "metal": return "Metal";
      case "leather": return "Cuero";
      case "herb": return "Hierba";
      case "gem": return "Gema";
      case "enchanting": return "Encantamiento";
      case "wood": return "Madera";
      case "scale": return "Escama";
      case "meat": return "Carne";
      case "fish": return "Pescado";
      case "bone": return "Hueso";
      case "element": return "Elemento";
      default: return t.charAt(0).toUpperCase() + t.slice(1);
    }
  };

  const translateMaterial = (material?: string) => {
    if (!material) return "";
    for (const list of Object.values(collections)) {
      const item = list.find(i => i.material === material);
      if (item) return item.label;
    }
    return material.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getQualityColor = (q: string) => {
    switch (q) {
      case "common": return "text-gray-300";
      case "uncommon": return "text-green-400";
      case "rare": return "text-blue-400";
      case "epic": return "text-purple-400";
      case "legendary": return "text-orange-400";
      default: return "text-white";
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-white/20 pb-4">
        {Object.keys(collections).map((tab) => {
          const matchCount = matchCounts ? matchCounts[tab] : null;
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === tab
                ? "bg-white/20 text-white shadow-inner"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90"
                }`}
            >
              {tab} {matchCount !== null && `(${matchCount})`}
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-white/5 p-4 rounded-lg border border-white/10">

        {/* Search */}
        <div className="flex flex-col">
          <label className="text-xs text-white/50 mb-1">Buscar</label>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            disabled={!!searchQuery}
            placeholder={searchQuery ? "Buscando en Tesseract..." : "Buscar..."}
            className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500 disabled:opacity-50"
          />
        </div>

        {/* Price Min/Max */}
        <div className="flex flex-col">
          <label className="text-xs text-white/50 mb-1">Precio (Min - Max)</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Min"
              className="bg-black/50 border border-white/20 rounded px-2 py-1.5 text-sm text-white w-full focus:outline-none focus:border-yellow-500"
            />
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Max"
              className="bg-black/50 border border-white/20 rounded px-2 py-1.5 text-sm text-white w-full focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Quality */}
        <div className="flex flex-col">
          <label className="text-xs text-white/50 mb-1">Calidad</label>
          <select
            value={qualityFilter}
            onChange={(e) => setQualityFilter(e.target.value)}
            className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
          >
            <option value="">Todas</option>
            {uniqueQualities.map(q => (
              <option key={q} value={q}>{translateQuality(q)}</option>
            ))}
          </select>
        </div>

        {/* Map */}
        {uniqueMaps.length > 0 && (
          <div className="flex flex-col">
            <label className="text-xs text-white/50 mb-1">Mapa</label>
            <select
              value={mapFilter}
              onChange={(e) => setMapFilter(e.target.value)}
              className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
            >
              <option value="">Todos</option>
              {uniqueMaps.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        )}

        {/* Type (Dynamic) */}
        {uniqueTypes.length > 0 && (
          <div className="flex flex-col">
            <label className="text-xs text-white/50 mb-1">Tipo</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
            >
              <option value="">Todos</option>
              {uniqueTypes.map(t => (
                <option key={t} value={t}>{translateType(t)}</option>
              ))}
            </select>
          </div>
        )}

        {/* Material (Dynamic) */}
        {uniqueMaterials.length > 0 && (
          <div className="flex flex-col">
            <label className="text-xs text-white/50 mb-1">Material</label>
            <select
              value={materialFilter}
              onChange={(e) => setMaterialFilter(e.target.value)}
              className="bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-yellow-500"
            >
              <option value="">Todos</option>
              {uniqueMaterials.map(m => (
                <option key={m} value={m}>{translateMaterial(m)}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredList.length === 0 ? (
          <div className="text-center text-white/50 mt-10">
            No se encontraron resultados para los filtros seleccionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredList.map((item) => (
              <div key={item.id} className="bg-black/40 border border-white/10 rounded-lg p-4 hover:border-white/30 transition-colors flex flex-col relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`font-bold text-lg ${getQualityColor(item.quality)}`}>
                    {renderWithHighlights(item.label, searchQuery)}
                  </h4>
                  <span className="bg-yellow-600/30 text-yellow-500 border border-yellow-600/50 px-2 py-0.5 rounded text-xs whitespace-nowrap ml-2">
                    {item.price} oro
                  </span>
                </div>

                <div className="text-sm text-white/70 space-y-1 mb-2 flex-1">
                  {item.map && <p><strong className="text-white/90">Mapa:</strong> {renderWithHighlights(item.map, searchQuery)}</p>}
                  {item.zone && <p><strong className="text-white/90">Zona:</strong> {renderWithHighlights(item.zone, searchQuery)}</p>}
                  {item.type && <p><strong className="text-white/90">Tipo:</strong> {renderWithHighlights(translateType(item.type), searchQuery)}</p>}
                  {item.material && <p><strong className="text-white/90">Material:</strong> {renderWithHighlights(translateMaterial(item.material), searchQuery)}</p>}
                </div>

                <div className="flex justify-between text-xs text-white/50 border-t border-white/10 pt-2 mt-auto">
                  <span>Rastreo: {item.trackD || "-"}</span>
                  <span>Prospección: {item.prospect || "-"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
