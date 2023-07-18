import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref
) {
  const { className, ...otherProps } = props;
  return (
    <button
      ref={ref}
      className={clsx(
        className,
        "w-fit rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover"
      )}
      {...otherProps}
    ></button>
  );
});
