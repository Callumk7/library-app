import { prisma } from "@/lib/db/prisma";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const data = (await req.json()) as WebhookEvent;
	switch (data.type) {
		case "user.created":
			{
				const newUser = await prisma.user.create({
					data: {
						userId: data.data.id,
						username: data.data.username!,
						email: data.data.email_addresses[0].email_address,
					},
				});
				console.log(`new user: ${newUser.username}, ${newUser.id}`);
			}
			return new NextResponse(`new user: ${data.data.username}`);

		default:
			break;
	}
}
