import { authMiddleware } from "@clerk/nextjs";

// This protects all routes, including api routes
export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/users",
		"/api/worker",
		"/api/collection",
		"/api/collection/(.*)",
		"/api/collection/genres/(.*)",
		"/api/collection/artwork/(.*)",
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
