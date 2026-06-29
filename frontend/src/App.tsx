import { Layout } from './features/core/components/Layout';
import { useConstellationStore } from './features/constellation/store/useConstellationStore';
import './App.css';

function App() {
  const hoveredNodeId = useConstellationStore((state) => state.hoveredNodeId);
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center p-8">

      </div>
    </Layout>
  );
}

export default App;
