// played, remove, collections dropdown

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

interface CardToolbarProps {
  isPlayed: boolean;
  handleRemoveClicked: () => Promise<void>;
  handlePlayedToggled: () => Promise<void>;
}

export function CardToolbar({
  isPlayed,
  handleRemoveClicked,
  handlePlayedToggled,
}: CardToolbarProps) {
  const handlePlayedClicked = async () => {
    await handlePlayedToggled();
  };

  const handleRemoveClickedSync = () => {
    handleRemoveClicked().catch((reason) => console.error(reason));
  };

  return (
    <div className="m-2 rounded-md border px-2 py-2">
      <div className="flex flex-row items-center justify-between">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant={isPlayed ? "default" : "outline"}
              onClick={handlePlayedClicked}
            >
              {isPlayed ? "played" : "not played"}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Toggle played</HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Button variant={"linkMono"} size={"icon"} onClick={handleRemoveClickedSync}>
              <DeleteIcon />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Delete game from collection</HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
