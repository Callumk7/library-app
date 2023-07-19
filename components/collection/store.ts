import { GameWithCoverAndCollection } from "@/types";
import { atom } from "jotai";
export const collectionAtom = atom<GameWithCoverAndCollection[]>([]);
