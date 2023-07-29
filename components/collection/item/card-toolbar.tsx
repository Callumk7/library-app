// played, remove, collections dropdown

import { Button } from "@/components/ui/button";
import { DeleteIcon } from "@/components/ui/icons/DeleteIcon";
import { MenuIcon } from "@/components/ui/icons/MenuIcon";
import { PlayIcon } from "@/components/ui/icons/PlayIcon";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

interface CardToolbarProps {
  handleRemoveClicked: () => void;
  handlePlayedToggled: () => void;
}

export function CardToolbar({
  handleRemoveClicked,
  handlePlayedToggled,
}: CardToolbarProps) {
  return (
    <div className="m-2 rounded-md border px-2 py-2">
      <div className="justify-right flex flex-row items-center space-x-2">
        <Button variant={"default"} onClick={handlePlayedToggled}>
          Played
        </Button>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button variant={"link"} size={"icon"}>
              <MenuIcon />
            </Button>
          </Dropdown.Trigger>

          <Dropdown.Portal>
            <Dropdown.Content
              className="h-32 w-32 rounded-md border bg-background/80 data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
              sideOffset={7}
            >
              <Dropdown.Item>Item 1</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>
        <Button
          variant={"link"}
          size={"icon"}
          onClick={handleRemoveClicked}
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
}
