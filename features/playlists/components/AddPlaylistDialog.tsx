import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddPlaylistForm from "./AddPlaylistForm";
import { Dispatch } from "react";

interface AddPlaylistDialogProps {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function AddPlaylistDialog({ dialogOpen, setDialogOpen }: AddPlaylistDialogProps) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogTitle>Create playlist</DialogTitle>
        <DialogDescription>
          Create a list that you can use to collect games that you think go together well
        </DialogDescription>
        <AddPlaylistForm />
      </DialogContent>
    </Dialog>
  );
}
