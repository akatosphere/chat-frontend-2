"use client";
import { useState } from "react";

import { MenuAction } from "@/shared/ui/menuList/model/types";
import { MenuList } from "@/shared/ui/menuList/ui/menuList";

import { DeleteProfileModal } from "../../deleteProfileModal/deleteProfileModal";
import { ExitModal } from "../../exitModal/exitModal";
import { DESCTRUCTIVE_MENU } from "../lib/destructiveData";
import { ICONS, SETTINGS_MENU } from "../lib/settingsData";

type SettingsMenuProps = {
  uid: string;
};

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ uid }) => {
  const [modal, setModal] = useState<MenuAction | null>(null);
  return (
    <>
      <MenuList
        items={SETTINGS_MENU}
        icons={ICONS}
        onAction={(action) => {
          setModal(action);
        }}
      />
      <MenuList
        items={DESCTRUCTIVE_MENU}
        icons={ICONS}
        className="mt-auto bg-transparent"
        onAction={(action) => setModal(action)}
      />
      <ExitModal isOpen={modal === "logout"} onClose={() => setModal(null)} />
      <DeleteProfileModal
        isOpen={modal === "deleteProfile"}
        onClose={() => setModal(null)}
        uid={uid}
      />
    </>
  );
};
