import { useMutation } from "@tanstack/react-query";

export const useAddToCollectionMutation = () => {
	const addMutation = useMutation({
		mutationFn: (gameId: number) => {
			console.log("adding to collection..");
			return fetch(`/api/collection?gameId=${gameId}`, {
				method: "POST",
			});
		},

		onSuccess: (data) => {
			console.log(`success ${data.status}`);
		},
	});

	return addMutation;
};
