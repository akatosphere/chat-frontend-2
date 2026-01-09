import Email from "@icons/menu/email.svg";
import Exit from "@icons/menu/exit.svg";
import None from "@icons/menu/none.svg";
import Pen from "@icons/menu/pen.svg";

import { MenuIcon, MenuItem } from "@/shared/ui/menuList/model/types";

export const SETTINGS_MENU: MenuItem[] = [
  {
    label: "Редактирование профиля",
    href: "/settings/profile",
    icon: "pen",
  },
  {
    label: "Чёрный список",
    href: "/settings/blacklist",
    icon: "none",
  },
  {
    label: "Поддержка",
    href: "/settings/support",
    icon: "email",
  },
  {
    label: "Выйти из аккаунта",
    icon: "exit",
    action: "logout",
    isDestructive: true,
  },
];

export const ICONS: MenuIcon = {
  pen: Pen,
  exit: Exit,
  email: Email,
  none: None,
  delete: Exit,
};
