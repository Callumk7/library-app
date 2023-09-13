/* eslint-disable @typescript-eslint/require-await */
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/lib/clients/prisma";

export const options: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_ID!,
			clientSecret: process.env.DISCORD_SECRET!,
		}),
	],
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id;

			return session;
		},
	},
};
