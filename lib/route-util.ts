import fs from "fs";
import path from "path";
import { cwd } from "process";

export function getAllRoutes(directoryPath: string): string[] {
	const fullDirectoryPath = path.join(cwd(), directoryPath);
	const results: string[] = []; //init results

	// nested recursive function
	const traverseDirectory = (currentPath: string) => {
		const files = fs.readdirSync(currentPath);

		for (const file of files) {
			const filePath = path.join(currentPath, file);
			const stat = fs.statSync(filePath);

			if (stat.isDirectory()) {
				traverseDirectory(filePath);
			} else if (file === "page.tsx") {
				const route = path.dirname(filePath);
				const routeFromApp = path.relative(fullDirectoryPath, route);
				console.log(`pushing route ${routeFromApp}`);
				results.push(routeFromApp);
			}
		}
	};

	traverseDirectory(fullDirectoryPath);

	return results;
}
