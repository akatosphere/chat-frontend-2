import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/shadcn/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@/shared/shadcn/ui/alert-dialog";

const modalDialogVariants = cva("desktop:rounded-md rounded-lg bg-white", {
  variants: {
    variant: {
      default: "desktop:text-start",
      vertical: "text-center",
    },
    size: {
      md: "desktop:w-[400px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type ModalDialogProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof modalDialogVariants> & {
    className?: string;
    open: boolean;
    onOpenChange?: (value: boolean) => void;
    overlay?: "screen" | "card";
  };

export const ModalDialog: React.FC<ModalDialogProps> = ({
  className,
  variant,
  size,
  open,
  onOpenChange,
  overlay = "screen",
  children,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={cn(modalDialogVariants({ variant, size, className }))}>
        {children}
      </AlertDialogContent>
      <AlertDialogOverlay
        className={`bg-primary/25 backdrop-blur-[2px] ${overlay == "card" ? "card-not-compressed:max-w-lg top-1/2 left-1/2 h-[95%] max-h-[760px] w-full max-w-[calc(100vw-1.5rem)] -translate-x-1/2 -translate-y-1/2 rounded-md" : ""}`}
      />
    </AlertDialog>
  );
};
