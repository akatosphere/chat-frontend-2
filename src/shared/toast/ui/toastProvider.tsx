"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";

import { Toast } from "./toast";

type ToastState = {
  isVisible: boolean;
  message: string;
  icon: {
    mobile: string;
    desktop?: string;
  };
};

type ToastContextValue = {
  showToast: (message: string, icon: ToastState["icon"]) => void;
  hideToast: () => void;
};

const toastContext = createContext<ToastContextValue>({
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ToastState>({
    isVisible: false,
    message: "",
    icon: { mobile: "" },
  });

  const showToast = useCallback((message: string, icon: ToastState["icon"]) => {
    setState({ isVisible: true, message, icon });
  }, []);

  const hideToast = useCallback(() => {
    setState((prev) => ({ ...prev, isVisible: false }));
  }, []);

  return (
    <toastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {state.isVisible &&
        createPortal(
          <Toast message={state.message} onClose={hideToast} icon={state.icon} />,
          document.body,
        )}
    </toastContext.Provider>
  );
};

export const useToast = () => useContext(toastContext);
