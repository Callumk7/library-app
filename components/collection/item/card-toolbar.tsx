// played, remove, collections dropdown

import { Button } from "@/components/ui/button";
import { PlayIcon } from "@/components/ui/icons/PlayIcon";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

interface CardToolbarProps {
  played: boolean;
  handleRemoveClicked: () => void;
  handlePlayedToggled: () => void;
}

export function CardToolbar({
  played,
  handleRemoveClicked,
  handlePlayedToggled,
}: CardToolbarProps) {
  let style: string;
  if (played) {
    style = "text-white";
  } else {
    style = "text-red-500";
  }
  return (
    <div className="m-2 rounded-md border px-2 py-2">
      <div className="flex flex-row items-center justify-between">
        <PlayIcon
          className={clsx(style, "h-6 w-6")}
          handleClick={handlePlayedToggled}
        ></PlayIcon>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button asChild={false}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Z"
                  clipRule="evenodd"
                />
              </svg>
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
          variant={"outline"}
          size={"sm"}
          onClick={handleRemoveClicked}
          asChild={false}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
