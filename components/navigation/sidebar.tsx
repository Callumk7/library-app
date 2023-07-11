import { getAllRoutes } from "@/lib/route-util";
import Link from "next/link";

export default function Sidebar() {
  const routes = getAllRoutes("/app");
  const links = [];

  for (const route of routes) {
    const link = () => <Link href={route}>{route}</Link>;
    links.push(link);
  }
  return (
    <div className="sticky left-0 top-0 h-[100vh] w-full bg-slate-800">
      <h1>sidebar</h1>
      <nav className="flex flex-col space-y-2">
        {links.map((Component, index) => (
          <Component key={index} />
        ))}
      </nav>
    </div>
  );
}
