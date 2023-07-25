import { Toast, ToastClose, ToastDescription, ToastTitle } from "../ui/toast";

interface SearchToastProps {
  title?: string;
  content: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const SearchToast = ({ title, content, open, setOpen }: SearchToastProps) => {
  return (
    <Toast open={open} onOpenChange={setOpen} variant={"default"}>
      {title && <ToastTitle className="w-full">{title}</ToastTitle>}
      <ToastDescription>{content}</ToastDescription>
      <ToastClose aria-label="Close">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="m7 7l10 10M7 17L17 7"
          />
        </svg>
      </ToastClose>
    </Toast>
  );
};
