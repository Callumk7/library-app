import { Genre } from "@prisma/client";

export function GenreFilter({genres}: {genres: string[]}) {
  return (
    <div className="flex flex-row gap-1">
      {genres.map((genre, index) => (
        <div key={index}>{genre}</div>
      ))}
    </div>
  )
}
