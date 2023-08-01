import { SignIn, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export function GET() {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in");
	} else {
		redirect(`/collection/${userId}`);
	}
}
