import { MenuItem } from "@/shared/ui/menuList/model/types";

export const DESCTRUCTIVE_MENU: MenuItem[] = [
  {
    label: "Удалить аккаунт",
    icon: "exit",
    action: "deleteProfile",
    isDestructive: true,
  },
];
