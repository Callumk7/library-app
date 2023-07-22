import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function GET() {
	const { userId } = auth();
	redirect(`/collection/${userId}`);
}
