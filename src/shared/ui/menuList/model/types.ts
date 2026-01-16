export type MenuItem = {
  label: string;
  href?: string;
  icon: string;
  action?: MenuAction;
  isDestructive?: boolean;
};

export type MenuIcon = {
  [key: string]: React.ComponentType<React.ComponentProps<"svg">>;
};

export type MenuAction = "logout" | "deleteProfile";
