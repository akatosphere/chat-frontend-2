// src/shared/navBar/model/navItems.ts
import { ComponentType, SVGProps } from "react";

import ServicesDesktop from "@/shared/ui/icons/navBar/desktop/a-service.svg";
import MessageDesktop from "@/shared/ui/icons/navBar/desktop/message.svg";
import PersonSearchDesktop from "@/shared/ui/icons/navBar/desktop/person_search.svg";
import SettingsDesktop from "@/shared/ui/icons/navBar/desktop/settings.svg";
import ContactsMobile from "@/shared/ui/icons/navBar/mobile/contacts.svg";
import MessageMobile from "@/shared/ui/icons/navBar/mobile/message.svg";
import ServicesMobile from "@/shared/ui/icons/navBar/mobile/services.svg";
import SettingsMobile from "@/shared/ui/icons/navBar/mobile/settings.svg";

export type NavItemModel = {
  label: string;
  href: string;
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
