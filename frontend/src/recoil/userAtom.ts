import { atom } from 'recoil';

interface User {
  id: string;
  username: string;
  email: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const userLoggedInState = atom({
  key: 'userLoggedInAtom',
  default: false, // Modify this based on your logic
});