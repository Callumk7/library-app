// played, remove, collections dropdown

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

interface CardToolbarProps {
  isPlayed: boolean;
  handleRemoveClicked: () => void;
  handlePlayedToggled: () => void;
}

export function CardToolbar({
  isPlayed,
  handleRemoveClicked,
  handlePlayedToggled,
}: CardToolbarProps) {
  return (
    <div className="m-2 rounded-md border px-2 py-2">
      <div className="justify-between flex flex-row items-center">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button
              variant={isPlayed ? "default" : "outline"}
              onClick={handlePlayedToggled}
            >
              {isPlayed ? "played" : "not played"}
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Toggle played</HoverCardContent>
        </HoverCard>
        <HoverCard>
          <HoverCardTrigger>
            <Button variant={"linkMono"} size={"icon"} onClick={handleRemoveClicked}>
              <DeleteIcon />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>Delete game from collection</HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
}
