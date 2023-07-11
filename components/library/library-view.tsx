export default function LibraryView({ content }: { content: any }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {content.map((item, index) => (
        <LibraryItem key={index} item={item} />
      ))}
    </div>
  );
}

function LibraryItem({ item }: { item: any }) {
  return (
    <div className="rounded-md border px-2 py-4 border-white">
      <h1 className="text-red-500">{item.name}</h1>
      {item.genres && <p className="text-slate-400">{item.genres[0].name}</p>}
    </div>
  );
}
