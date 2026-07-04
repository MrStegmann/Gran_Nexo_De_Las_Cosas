import { create } from 'zustand';
import { AZULITO_SPEECHES } from '../constants/azulitoSpeeches';

export type AzulitoMood = 'talk' | 'confused' | 'hehe';
export type NotyType = 'alert' | 'info' | 'error';

export interface NotyMessage {
  id: string;
  msg: string;
  type: NotyType;
  timeLife: number;
}

interface AzulitoState {
  speech: string;
  mood: AzulitoMood;
  isVisible: boolean;
  queue: NotyMessage[];
  currentNoty: NotyMessage | null;
  setSpeech: (speech: string) => void;
  setMood: (mood: AzulitoMood) => void;
  setSpeechAndMood: (speech: string, mood: AzulitoMood) => void;
  show: () => void;
  hide: () => void;
  sendNoty: (msg: string, type?: NotyType, timeLife?: number) => void;
  popNoty: () => void;
  clearCurrentNoty: () => void;
}

export const useAzulitoStore = create<AzulitoState>((set) => ({
  speech: "",
  mood: 'talk',
  isVisible: true,
  queue: [],
  currentNoty: null,
  setSpeech: (speech) => set({ speech }),
  setMood: (mood) => set({ mood }),
  setSpeechAndMood: (speech, mood) => set({ speech, mood }),
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
  sendNoty: (msg, type = 'info', timeLife = 5000) => set((state) => {
    const newNoty: NotyMessage = {
      id: Math.random().toString(36).substring(7),
      msg,
      type,
      timeLife,
    };
    return { queue: [...state.queue, newNoty] };
  }),
  popNoty: () => set((state) => {
    if (state.queue.length === 0) return { currentNoty: null };
    const [next, ...rest] = state.queue;
    return { currentNoty: next, queue: rest };
  }),
  clearCurrentNoty: () => set({ currentNoty: null }),
}));
