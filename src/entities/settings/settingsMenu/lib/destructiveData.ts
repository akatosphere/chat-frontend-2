import { MenuItem } from "@/shared/ui/menuList/model/types";

export const DESCTRUCTIVE_MENU: MenuItem[] = [
  {
    label: "Удалить аккаунт",
    icon: "delete",
    action: "deleteProfile",
    isDestructive: true,
  },
];
