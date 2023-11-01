import { atom } from "nanostores";

export interface FormData {
  value: string | number;
  error: boolean;
}

export const nameInput = atom<FormData>({ value: '', error: true });
export const numberInput = atom<FormData>({ value: '', error: true });