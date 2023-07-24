import { Toast, ToastClose, ToastDescription, ToastTitle } from "../ui/toast";

interface SearchToastProps {
  title?: string;
  content: string;
  open: boolean;
  setOpen: () => void;
}
export const SearchToast = ({title, content, open, setOpen}: SearchToastProps) => {
  return (
    <Toast open={open} onOpenChange={setOpen}>
      {title && <ToastTitle>{title}</ToastTitle>}
      <ToastDescription>{content}</ToastDescription>
      <ToastClose aria-label="Close"></ToastClose>
    </Toast>
  )
}
