import { redirect } from "next/navigation";

export function GET() {
	const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";

	if (!userId) {
		redirect("/sign-in");
	} else {
		redirect(`/collection/${userId}`);
	}
}
