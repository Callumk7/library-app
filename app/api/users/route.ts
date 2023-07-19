import { prisma } from "@/lib/prisma/client";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const data: WebhookEvent = await req.json();
	switch (data.type) {
		case "user.created":
			{
				const newUser = await prisma.user.create({
					data: {
						clerkId: data.data.id,
						username: data.data.username!,
						email: data.data.email_addresses[0].email_address,
					},
				});
				console.log(`new user: ${data.data.username}`);
			}
			return new NextResponse(`new user: ${data.data.username}`);

		default:
			break;
	}
}
