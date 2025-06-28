import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface UserActions {
  setPassCode: (passCode: string) => void;
  setUserEmail: (userEmail: string) => void;
}

interface UserState {
  passCode: string;
  userEmail: string;
  actions: UserActions;
}

const userStore = create(
  immer<UserState>((set) => ({
    passCode: '',
    userEmail: '',
    actions: {
      setPassCode: (passCode) => set((state) => {
        state.passCode = passCode;
      }),
      setUserEmail: (userEmail) => set((state) => {
        state.userEmail = userEmail;
      }),
    },
  }))
);

export const useUserActions = userStore((state) => state.actions);
export const useUserEmail = userStore((state) => state.userEmail);
export const usePassCode = userStore((state) => state.passCode);
