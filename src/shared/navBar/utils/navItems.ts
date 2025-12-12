// src/shared/navBar/navItems.ts
import { MessageDesktop } from "@/shared/icons/navBar/desktop/message";
import { PersonSearchDesktop } from "@/shared/icons/navBar/desktop/person_search";
import { ServicesDesktop } from "@/shared/icons/navBar/desktop/services";
import { SettingsDesktop } from "@/shared/icons/navBar/desktop/settings";

import { MessageMobile } from "@/shared/icons/navBar/mobile/message";
import { ContactsMobile } from "@/shared/icons/navBar/mobile/contacts";
import { ServicesMobile } from "@/shared/icons/navBar/mobile/services";
import { SettingsMobile } from "@/shared/icons/navBar/mobile/settings";

export const navItems = [
  {
    label: "Чаты",
    href: "/chats",
    IconDesktop: MessageDesktop,
    IconMobile: MessageMobile,
  },
  {
    label: "Контакты",
    href: "/contacts",
    IconDesktop: PersonSearchDesktop,
    IconMobile: ContactsMobile,
  },
  {
    label: "Сервисы",
    href: "/services",
    IconDesktop: ServicesDesktop,
    IconMobile: ServicesMobile,
  },
  {
    label: "Настройки",
    href: "/settings",
    IconDesktop: SettingsDesktop,
    IconMobile: SettingsMobile,
  },
];
