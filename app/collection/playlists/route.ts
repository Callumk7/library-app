import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export function GET() {
	const { userId } = auth();
	redirect(`/collection/playlists/${userId}`);
}
