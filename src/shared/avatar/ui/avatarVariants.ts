import { cva } from "class-variance-authority";

export const containerVariants = cva("relative mb-4 flex flex-col items-center transition-all", {
  variants: {
    variant: {
      user: "gap-2",
      chat: "desktop:mb-2 desktop:mt-0 mt-4 mb-0 gap-2",
    },
  },
  defaultVariants: {
    variant: "user",
  },
});

export const triggerButtonVariants = cva(
  "minitext flex items-center justify-center font-medium transition-all",
  {
    variants: {
      variant: {
        user: [
          "bg-primary absolute bottom-4 left-4 rounded-md px-3 py-3.5 text-white",

          "desktop:bg-transparent desktop:p-0 desktop:text-primary desktop:static desktop:rounded-none desktop:text-[17px]",
        ],
        chat: ["text-primary text static rounded-none bg-transparent p-0"],
      },
    },
    defaultVariants: {
      variant: "user",
    },
  },
);

export const plusIconVariants = cva("transition-transform", {
  variants: {
    variant: {
      user: ["mr-2 h-3.5 w-3.5", "desktop:hidden desktop:mr-0"],
      chat: "hidden",
    },
  },
  defaultVariants: {
    variant: "user",
  },
});
