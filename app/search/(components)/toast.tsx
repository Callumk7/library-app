import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { Dispatch, SetStateAction } from "react";

interface SearchToastProps {
  title?: string;
  content: string;
  toastOpen: boolean;
  setToastOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchToast = ({
  title,
  content,
  toastOpen,
  setToastOpen,
}: SearchToastProps) => {
  return (
    <Toast open={toastOpen} onOpenChange={setToastOpen} variant={"default"}>
      {title && <ToastTitle className="w-full">{title}</ToastTitle>}
      <ToastDescription>{content}</ToastDescription>
      <ToastClose />
    </Toast>
  );
};
