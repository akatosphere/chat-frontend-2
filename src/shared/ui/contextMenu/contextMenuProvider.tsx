"use client";

import {
  ComponentType,
  createContext,
  ReactNode,
  SVGProps,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { ContextMenuContent } from "./contextMenuContent";

export type MenuItem = {
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  onClick: () => void;
  destructive?: boolean;
};

export type Placement = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type ContextMenuState = {
  isOpen: boolean;
  position: { x: number; y: number };
  items: MenuItem[];
  placement: Placement;
};

const contextMenuContext = createContext<{
  openMenu: (
    menuId: string,
    items: MenuItem[],
    x: number,
    y: number,
    placement?: Placement,
  ) => void;
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
    placement: "top-left",
  });

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const openMenu = (
    menuId: string,
    items: MenuItem[],
    x: number,
    y: number,
    placement: Placement = "top-left",
  ) => {
    setActiveMenuId(menuId);
    setState({ isOpen: true, position: { x, y }, items, placement });
  };

  const closeMenu = () => {
    setActiveMenuId(null);
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  const value = useMemo(
    () => ({
      openMenu,
      closeMenu,
      activeMenuId,
    }),
    [openMenu, closeMenu, activeMenuId],
  );

  return (
    <contextMenuContext.Provider value={value}>
      {children}
      {state.isOpen &&
        createPortal(
          <ContextMenuContent
            items={state.items}
            position={state.position}
            placement={state.placement}
            onClose={closeMenu}
          />,
          document.body,
        )}
    </contextMenuContext.Provider>
  );
};

export const useContextMenu = () => useContext(contextMenuContext);
