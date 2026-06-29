import { create } from 'zustand';
import { AZULITO_SPEECHES } from '../constants/azulitoSpeeches';

export type AzulitoMood = 'talk' | 'confused' | 'hehe';

interface AzulitoState {
  speech: string;
  mood: AzulitoMood;
  isVisible: boolean;
  setSpeech: (speech: string) => void;
  setMood: (mood: AzulitoMood) => void;
  setSpeechAndMood: (speech: string, mood: AzulitoMood) => void;
  show: () => void;
  hide: () => void;
}

export const useAzulitoStore = create<AzulitoState>((set) => ({
  speech: AZULITO_SPEECHES.DEFAULT,
  mood: 'talk',
  isVisible: true,
  setSpeech: (speech) => set({ speech }),
  setMood: (mood) => set({ mood }),
  setSpeechAndMood: (speech, mood) => set({ speech, mood }),
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));
