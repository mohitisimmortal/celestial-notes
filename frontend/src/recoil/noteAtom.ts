import { atom } from 'recoil';

interface Note {
  _id: string;
  id: string;
  title: string;
  content: string;
}

export const noteState = atom<Note[]>({
  key: 'noteState',
  default: [],
});