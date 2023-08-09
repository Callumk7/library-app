import { authMiddleware } from "@clerk/nextjs";

// This protects all routes, including api routes
export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/test",
		"/api/users",
		"/api/games",
		"/api/genres",
		"/api/artwork",
		"/api/playlists",
		"/api/playlists/(.*)",
		"/api/worker",
		"/api/worker/(.*)",
		"/api/collection",
		"/api/collection/games",
		"/api/collection/(.*)",
		"/api/collection/genres/(.*)",
		"/api/collection/artwork/(.*)",
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
