import { atom } from "nanostores";

export const nameInput = atom<string>('');
export const numberInput = atom<string>('');
export const errorName = atom<boolean>(false);
export const errorNumber = atom<boolean>(false);