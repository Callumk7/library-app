import { Checkbox } from "../ui/checkbox";

interface GameCheckBoxProps {
  gameId: number;
  handleCheckedChanged: (gameId: number) => void;
}

export function GameCheckbox({ gameId, handleCheckedChanged }: GameCheckBoxProps) {
  const handleChange = () => {
    handleCheckedChanged(gameId);
  };
  return (
    <Checkbox className="absolute right-4 top-4 z-10" onCheckedChange={handleChange} />
  );
}
