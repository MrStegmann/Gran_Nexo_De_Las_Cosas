import { Layout } from './features/core/components/Layout';
import { useConstellationStore } from './features/constellation/store/useConstellationStore';
import { NodeId } from './features/constellation/enums/NodeId';
import { MechanicsFeature } from './features/mechanics/components/MechanicsFeature';
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
      </div>
    </Layout>
  );
}

export default App;
