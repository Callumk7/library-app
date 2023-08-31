"use client";

import { useCollectionGameIdsQuery } from "@/features/collection/hooks/queries";
import { Tag } from "../ui/tag";

export function InCollectionTag({ gameId }: { gameId: number }) {
  const userId = "user_2Tmlvj4Ju83ZYElhXRg9pNjvakf";
  const collectionIds = useCollectionGameIdsQuery(userId);

  return (
    <>
      {collectionIds.data && collectionIds.data.includes(gameId) ? (
        <Tag variant={"primary"}>In collection</Tag>
      ) : (
        <Tag variant={"default"}>Save..</Tag>
      )}
    </>
  );
}
