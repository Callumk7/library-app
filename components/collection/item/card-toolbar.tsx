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
      <div className="justify-right flex flex-row items-center space-x-2">
        <PlayIcon
          className={clsx(style, "h-6 w-6")}
          handleClick={handlePlayedToggled}
        ></PlayIcon>
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button variant={"link"} size={"icon"}>
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
        <Button variant={"link"} size={"icon"} onClick={handleRemoveClicked}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path
                strokeLinecap="round"
                d="M20.5 6h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9"
              />
              <path d="M6.5 6h.11a2 2 0 0 0 1.83-1.32l.0-34-.103l.097-.291c.083-.249.125-.373.18-.479a1.5 1.5 0 0 1 1.094-.788C9.962 3 10.093 3 10.355 3h3.29c.262 0 .393 0 .51.019a1.5 1.5 0 0 1 1.094.788c.055.106.097.23.18.479l.097.291A2 2 0 0 0 17.5 6" />
            </g>
          </svg>
        </Button>
      </div>
    </div>
  );
}
