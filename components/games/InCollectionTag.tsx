"use client";

import { useCollectionGameIdsQuery } from "@/lib/hooks/queries";
import { Tag } from "../ui/tag";

export function InCollectionTag({  gameId }: {  gameId: number }) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const collectionIds = useCollectionGameIdsQuery(userId);

  if (collectionIds.data?.includes(gameId)) {
    return <Tag variant={"primary"} className="animate-in">In collection</Tag>;
  }
}
