import { Layout } from './features/core/components/Layout';
import { useConstellationStore } from './features/constellation/store/useConstellationStore';
import { NodeId } from './features/constellation/enums/NodeId';
import { MechanicsFeature } from './features/mechanics/components/MechanicsFeature';
import { SpellsFeature } from './features/spells/components/SpellsFeature';
import { SheetsFeature } from './features/sheets/components/SheetsFeature';
import { SkillsFeature } from './features/skills/components/SkillsFeature';
import { InventoryFeature } from './features/inventory/components/InventoryFeature';
import { RunesFeature } from './features/runes/components/RunesFeature';
import './App.css';

function App() {
  const hoveredNodeId = useConstellationStore((state) => state.hoveredNodeId);
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start md:justify-center min-h-screen w-full text-center p-0 md:p-8">
        {selectedNodeId === NodeId.MECANICAS && (
          <MechanicsFeature />
        )}
        {selectedNodeId === NodeId.HECHIZOS && (
          <SpellsFeature />
        )}
        {selectedNodeId === NodeId.RUNAS && (
          <RunesFeature />
        )}
        {selectedNodeId === NodeId.FICHAS && (
          <SheetsFeature />
        )}
        {selectedNodeId === NodeId.HABILIDADES && (
          <SkillsFeature />
        )}
        {selectedNodeId === NodeId.INVENTARIO && (
          <InventoryFeature />
        )}
      </div>
    </Layout>
  );
}

export default App;
