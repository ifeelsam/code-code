import { atom } from "recoil";

export const userAtom = atom<{
  loading: boolean;
  user?: {
    email: string | null;
    uid: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
}>({
  key: "userAtom",
  default: {
    loading: true,
  }
});

export const counter = atom(
  {
    key: "counter", 
    default: 1
  }
)