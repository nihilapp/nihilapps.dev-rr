import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface UserActions {
  setPassCode: (passCode: string) => void;
}

interface UserState {
  passCode: string;
  actions: UserActions;
}

const userStore = create(
  immer<UserState>((set) => ({
    passCode: '',
    actions: {
      setPassCode: (passCode) => set((state) => {
        state.passCode = passCode;
      }),
    },
  }))
);

export const usePassCode = userStore((state) => state.passCode);

export const useUserActions = userStore((state) => state.actions);
