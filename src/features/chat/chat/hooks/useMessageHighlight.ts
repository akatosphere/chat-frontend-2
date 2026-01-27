import React, { createContext, type ReactNode, useContext } from "react";

interface MessageHighlightContextValue {
  scrollToMessage: (uid: string) => void;
  highlightedUid: string | null;
}

const messageHighlightContext = createContext<MessageHighlightContextValue | null>(null);

export const useMessageHighlight = () => {
  const context = useContext(messageHighlightContext);
  if (!context) {
    throw new Error("useMessageHighlight ошибка: контекст не найден");
  }
  return context;
};

interface MessageHighlightProviderProps {
  children: ReactNode;
  scrollToMessage: (uid: string) => void;
  highlightedUid: string | null;
}

export const MessageHighlightProvider = ({
  children,
  scrollToMessage,
  highlightedUid,
}: MessageHighlightProviderProps): React.ReactElement => {
  return React.createElement(
    messageHighlightContext.Provider,
    { value: { scrollToMessage, highlightedUid } },
    children,
  );
};
