// import { GameWithCover } from "@/types";
// import { create } from "zustand";
//
// interface CollectionState {
// 	collection: number[];
// 	addToCollection: (gameId: number) => void;
// 	removeFromCollection: (gameId: number) => void;
// 	setCollection: (gameArray: number[]) => void;
// }
//
// interface GameCollectionState {
// 	games: GameWithCover[];
// 	addToCollection: (game: GameWithCover) => void;
// 	removeFromCollection: (game: GameWithCover) => void;
// 	setCollection: (gameArray: GameWithCover[]) => void;
// }
//
// export const useCollectionStore = create<CollectionState>()((set) => ({
// 	collection: [],
// 	addToCollection: (gameId: number) =>
// 		set((state) => ({ games: [...state.games, gameId] })),
// 	removeFromCollection: (gameId: number) =>
// 		set((state) => ({ games: state.games.filter((game) => game != gameId) })),
// 	setCollection: (gameArray: number[]) => set((state) => ({ games: gameArray })),
// }));
