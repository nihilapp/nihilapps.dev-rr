import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CommonActions {
  setWord: (word: string) => void;
}

interface CommonState {
  word: string;
  actions: CommonActions;
}

const commonStore = create(persist(
  immer<CommonState>((set) => ({
    word: '',
    actions: {
      setWord: (word) => set((state) => {
        state.word = word;
      }),
    },
  })),
  {
    name: 'common',
    // storage: createJSONStorage(() => localStorage),
  }
));

export const useWord = commonStore((state) => state.word);

export const useCommonActions = commonStore((state) => state.actions);
