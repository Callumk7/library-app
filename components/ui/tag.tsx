export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline rounded-lg bg-accent px-2 py-1 text-[10px] text-accent-foreground/80">
      {children}
    </div>
  );
}
