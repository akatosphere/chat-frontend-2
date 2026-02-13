import * as React from "react";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const CloseButton = ({ className = "", children, ...props }: IconButtonProps) => {
  return (
    <button
      {...props}
      className={`focus:ring-primary flex h-11 w-11 items-center justify-center rounded-full focus:ring-2 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};
