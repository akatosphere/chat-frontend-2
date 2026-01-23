"use client";

import { ComponentType, createContext, ReactNode, SVGProps, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { ContextMenuContent } from "./contextMenuContent";

export type MenuItem = {
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  onClick: () => void;
  destructive?: boolean;
};

export type ContextMenuState = {
  isOpen: boolean;
  position: { x: number; y: number };
  items: MenuItem[];
};

const contextMenuContext = createContext<{
  openMenu: (menuId: string, items: MenuItem[], x: number, y: number) => void;
  closeMenu: () => void;
  activeMenuId: string | null;
}>({
  openMenu: () => {},
  closeMenu: () => {},
  activeMenuId: null,
});

export const ContextMenuProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ContextMenuState>({
    isOpen: false,
    position: { x: 0, y: 0 },
    items: [],
  });

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const openMenu = (menuId: string, items: MenuItem[], x: number, y: number) => {
    setActiveMenuId(menuId);
    setState({ isOpen: true, position: { x, y }, items });
  };

  const closeMenu = () => {
    setActiveMenuId(null);
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <contextMenuContext.Provider value={{ openMenu, closeMenu, activeMenuId }}>
      {children}
      {state.isOpen &&
        createPortal(
          <ContextMenuContent items={state.items} position={state.position} onClose={closeMenu} />,
          document.body,
        )}
    </contextMenuContext.Provider>
  );
};

export const useContextMenu = () => useContext(contextMenuContext);
