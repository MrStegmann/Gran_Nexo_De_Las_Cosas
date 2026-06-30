import { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from './features/core/components/Layout';
import { useConstellationStore } from './features/constellation/store/useConstellationStore';
import { NodeId } from './features/constellation/enums/NodeId';
import { AttributeId } from './features/constellation/enums/AttributeId';
import { MechanicsFeature } from './features/mechanics/screens/MechanicsFeature';
import { SpellsFeature } from './features/spells/components/SpellsFeature';
import { SheetsFeature } from './features/sheets/screens/SheetsFeature';
import { SkillsFeature } from './features/skills/components/SkillsFeature';
import { InventoryFeature } from './features/inventory/screens/InventoryFeature';
import { RunesFeature } from './features/runes/components/RunesFeature';
import './App.css';

function RouteSync() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedNodeId = useConstellationStore((state) => state.selectedNodeId);
  const selectedAttribute = useConstellationStore((state) => state.selectedAttribute);
  const selectedSchool = useConstellationStore((state) => state.selectedSchool);

  const transitioningNodeId = useConstellationStore((state) => state.transitioningNodeId);

  const lastTargetPath = useRef<string>('/');

  // Sync Zustand -> URL
  useEffect(() => {
    const currentNode = transitioningNodeId || selectedNodeId;
    let targetPath = '/';
    
    if (currentNode) {
      targetPath = `/${currentNode}`;
      if (currentNode === selectedNodeId) {
        if (selectedAttribute) {
          targetPath += `/${selectedAttribute}`;
          if (selectedSchool) {
            targetPath += `/${selectedSchool}`;
          }
        }
      }
    }
    
    if (targetPath !== lastTargetPath.current) {
      lastTargetPath.current = targetPath;
      if (location.pathname !== targetPath) {
        navigate(targetPath);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNodeId, transitioningNodeId, selectedAttribute, selectedSchool, navigate]);

  // Sync URL -> Zustand
  useEffect(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    const pathNode = parts[0];
    const pathAttr = parts[1];
    const pathSchool = parts[2];

    const validNodes = Object.values(NodeId) as string[];
    const state = useConstellationStore.getState();
    
    if (pathNode && validNodes.includes(pathNode)) {
      if (state.selectedNodeId !== pathNode) {
        if (!state.transitioningNodeId) {
          state.setTransitioningNode(pathNode as NodeId);
        }
      } else {
        if (pathAttr && state.selectedAttribute !== pathAttr) {
          if (!state.transitioningAttribute) {
            state.setTransitioningAttribute(pathAttr as AttributeId);
          }
        } else if (!pathAttr && state.selectedAttribute !== null) {
          if (!state.returningAttribute) {
            state.setReturningAttribute(state.selectedAttribute);
          }
        } else {
          if (pathSchool && state.selectedSchool !== pathSchool) {
            state.setSelectedSchool(pathSchool);
          } else if (!pathSchool && state.selectedSchool !== null) {
            state.setSelectedSchool(null);
          }
        }
      }
    } else if (!pathNode) {
      if (state.selectedNodeId !== null) {
        if (!state.returningNodeId) {
          state.setReturningNode(state.selectedNodeId);
        }
      }
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Layout>
      <RouteSync />
      <div className="flex flex-col items-center justify-start md:justify-center min-h-screen w-full text-center p-0 md:p-8">
        <Routes>
          <Route path="/" element={<div />} />
          <Route path={`/${NodeId.MECANICAS}/*`} element={<MechanicsFeature />} />
          <Route path={`/${NodeId.HECHIZOS}/*`} element={<SpellsFeature />} />
          <Route path={`/${NodeId.RUNAS}/*`} element={<RunesFeature />} />
          <Route path={`/${NodeId.FICHAS}/*`} element={<SheetsFeature />} />
          <Route path={`/${NodeId.HABILIDADES}/*`} element={<SkillsFeature />} />
          <Route path={`/${NodeId.INVENTARIO}/*`} element={<InventoryFeature />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
