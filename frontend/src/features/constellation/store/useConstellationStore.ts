import { create } from 'zustand';
import { NodeId } from '../enums/NodeId';

export interface ConstellationState {
  hoveredNodeId: NodeId | null;
  selectedNodeId: NodeId | null;
  setHoveredNode: (id: NodeId | null) => void;
  setSelectedNode: (id: NodeId | null) => void;
}

export const useConstellationStore = create<ConstellationState>((set) => ({
  hoveredNodeId: null,
  selectedNodeId: null,
  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
}));
