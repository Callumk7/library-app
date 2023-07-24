"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitives.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={clsx(
      "fixed bottom-0 right-0 z-50 flex w-96 max-w-full flex-col gap-3 p-7",
      className
    )}
    {...props}
  ></ToastPrimitives.Viewport>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

// TODO: #6 Complete
const toastVariants = cva(
  "bg-background border border-foreground/20 rounded-md px-2 py-1 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide",
  {
    variants: {
      variant: {
        default: "border bg-background",
        destructive: "bg-destructive",
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
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
      />
    </svg>
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

export { ToastProvider, ToastViewport, Toast, ToastClose, ToastAction, ToastDescription, ToastTitle };
