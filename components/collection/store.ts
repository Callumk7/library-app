import { GameWithCover } from "@/types";
import { atom } from "jotai";
export const collectionAtom = atom<GameWithCover[]>([]);
