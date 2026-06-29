import { create } from 'zustand';
import { NodeId } from '../enums/NodeId';

export interface ConstellationState {
  hoveredNodeId: NodeId | null;
  selectedNodeId: NodeId | null;
  transitioningNodeId: NodeId | null;
  returningNodeId: NodeId | null;
  selectedAttribute: 'inteligencia' | 'voluntad' | null;
  transitioningAttribute: 'inteligencia' | 'voluntad' | null;
  returningAttribute: 'inteligencia' | 'voluntad' | null;
  setHoveredNode: (id: NodeId | null) => void;
  setSelectedNode: (id: NodeId | null) => void;
  setTransitioningNode: (id: NodeId | null) => void;
  setReturningNode: (id: NodeId | null) => void;
  setSelectedAttribute: (attr: 'inteligencia' | 'voluntad' | null) => void;
  setTransitioningAttribute: (attr: 'inteligencia' | 'voluntad' | null) => void;
  setReturningAttribute: (attr: 'inteligencia' | 'voluntad' | null) => void;
}

export const useConstellationStore = create<ConstellationState>((set) => ({
  hoveredNodeId: null,
  selectedNodeId: null,
  transitioningNodeId: null,
  returningNodeId: null,
  selectedAttribute: null,
  transitioningAttribute: null,
  returningAttribute: null,
  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),
  setTransitioningNode: (id) => set({ transitioningNodeId: id }),
  setReturningNode: (id) => set({ returningNodeId: id, selectedAttribute: null, returningAttribute: null, transitioningAttribute: null }),
  setSelectedAttribute: (attr) => set({ selectedAttribute: attr }),
  setTransitioningAttribute: (attr) => set({ transitioningAttribute: attr }),
  setReturningAttribute: (attr) => set({ returningAttribute: attr, selectedAttribute: null }),
}));
