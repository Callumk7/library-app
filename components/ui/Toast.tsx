"use client";

import * as ToastPrimative from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <ToastPrimative.Provider>{children}</ToastPrimative.Provider>;
};

const ToastViewPort = () => {
  return (
    <ToastPrimative.Viewport className="fixed bottom-0 right-0 z-50 flex w-96 max-w-full flex-col gap-3 p-7 outline" />
  );
};

const Toast = ({ title, content, children, ...props }) => {
  return (
    <ToastPrimative.Root {...props}>
      {title && <ToastPrimative.Title>{title}</ToastPrimative.Title>}
      <ToastPrimative.Description>{content}</ToastPrimative.Description>
      {children && (
        <ToastPrimative.Action altText="lol" asChild>
          {children}
        </ToastPrimative.Action>
      )}
      <ToastPrimative.Close aria-label="Close">
        <span aria-hidden>x</span>
      </ToastPrimative.Close>
    </ToastPrimative.Root>
  );
};

export { ToastProvider, ToastViewPort, Toast };
