// src/shared/navBar/model/navItems.ts
import { MessageDesktop } from "@/shared/icons/navBar/desktop/message";
import { PersonSearchDesktop } from "@/shared/icons/navBar/desktop/person_search";
import { ServicesDesktop } from "@/shared/icons/navBar/desktop/services";
import { SettingsDesktop } from "@/shared/icons/navBar/desktop/settings";

import { MessageMobile } from "@/shared/icons/navBar/mobile/message";
import { ContactsMobile } from "@/shared/icons/navBar/mobile/contacts";
import { ServicesMobile } from "@/shared/icons/navBar/mobile/services";
import { SettingsMobile } from "@/shared/icons/navBar/mobile/settings";
import { ComponentType, SVGProps } from "react";

export type NavItemModel = {
  label: string;
  href?: string;
  IconDesktop: ComponentType<SVGProps<SVGSVGElement>>;
  IconMobile: ComponentType<SVGProps<SVGSVGElement>>;
  order: {
    mobile: number;
    desktop: number;
  };
};

export const navItems: NavItemModel[] = [
  {
    label: "Чаты",
    href: "/chats",
    IconDesktop: MessageDesktop,
    IconMobile: MessageMobile,
    order: { mobile: 1, desktop: 1 },
  },
  {
    label: "Контакты",
    href: "/contacts",
    IconDesktop: PersonSearchDesktop,
    IconMobile: ContactsMobile,
    order: { mobile: 2, desktop: 3 },
  },
  {
    label: "Сервисы",
    href: "/services",
    IconDesktop: ServicesDesktop,
    IconMobile: ServicesMobile,
    order: { mobile: 3, desktop: 2 },
  },
  {
    label: "Настройки",
    href: "/settings",
    IconDesktop: SettingsDesktop,
    IconMobile: SettingsMobile,
    order: { mobile: 4, desktop: 4 },
  },
];

