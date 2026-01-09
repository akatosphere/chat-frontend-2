import { RefObject, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  excludeRefs?: RefObject<HTMLElement | null>[],
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref?.current || ref.current.contains(event.target as Node)) {
        return;
      }

      if (
        excludeRefs?.some(
          (excludeRef) =>
            excludeRef?.current &&
            (excludeRef.current === event.target ||
              excludeRef.current.contains(event.target as Node)),
        )
      ) {
        return;
      }

      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, excludeRefs]);
};
