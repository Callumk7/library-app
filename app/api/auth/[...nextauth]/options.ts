/* eslint-disable @typescript-eslint/require-await */
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "Enter your username",
				},
				password: { label: "Password", type: "password" },
			},
			authorize(credentials) {
				// hard coded user example, will be replaced with actual authentication logic
				const user = {
					id: "42",
					username: "Kieran Teirney",
					password: "kt2arsenal",
					name: "Kieran Teirney",
				};

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id;

			return session;
		},
	},
};
