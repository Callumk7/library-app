import { authMiddleware } from "@clerk/nextjs";

// This protects all routes, including api routes
export default authMiddleware({
	publicRoutes: ["/", "/api/users", "/api/collection"],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
