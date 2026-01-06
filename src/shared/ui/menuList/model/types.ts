export type MenuItem = {
  label: string;
  href?: string;
  icon: string;
  action?: string;
};

export type MenuIcon = {
  [key: string]: React.ComponentType<React.ComponentProps<"svg">>;
};
