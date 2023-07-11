import Sidebar from "@/components/navigation/sidebar";

export default function GamesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid w-full grid-cols-6 text-center">
      <div className="col-span-1 box-border">
        <Sidebar />
      </div>
      <div className="col-span-5">
        <h1>This is the games layout</h1>
        {children}
      </div>
    </main>
  );
}
