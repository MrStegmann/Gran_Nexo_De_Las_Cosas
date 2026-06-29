import { create } from 'zustand';
import { NodeId } from '../enums/NodeId';

export interface ConstellationState {
  hoveredNodeId: NodeId | null;
  selectedNodeId: NodeId | null;
  transitioningNodeId: NodeId | null;
  returningNodeId: NodeId | null;
  setHoveredNode: (id: NodeId | null) => void;
  setSelectedNode: (id: NodeId | null) => void;
  setTransitioningNode: (id: NodeId | null) => void;
  setReturningNode: (id: NodeId | null) => void;
}

export const useConstellationStore = create<ConstellationState>((set) => ({
  hoveredNodeId: null,
  selectedNodeId: null,
  transitioningNodeId: null,
  returningNodeId: null,
  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setTransitioningNode: (id) => set({ transitioningNodeId: id }),
  setReturningNode: (id) => set({ returningNodeId: id }),
}));
