"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Cross } from "./icons/Cross";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitives.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={clsx(
      "fixed bottom-0 right-0 z-50 flex w-full flex-col-reverse gap-3 p-7 md:max-w-md",
      className
    )}
    {...props}
  ></ToastPrimitives.Viewport>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "relative flex flex-col w-full items-start space-y-4 overflow-hidden border-foreground/20 rounded-md px-4 py-2 shadow-lg data-[state=open]:animate-slideIn data-[state=closed]:animate-hide",
  {
    variants: {
      variant: {
        default: "border bg-background",
        destructive: "bg-destructive text-light",
      },
    },
  }
);

const Toast = forwardRef<
  ElementRef<typeof ToastPrimitives.Root>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  // render function for forwardRef
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={clsx(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = forwardRef<
  ElementRef<typeof ToastPrimitives.Action>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitives.Action ref={ref} className={clsx("default", className)} {...props} />
  );
});
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={clsx(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2",
      className
    )}
    toast-close=""
    {...props}
  >
    <Cross />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={clsx("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={clsx("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
};
