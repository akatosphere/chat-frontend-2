import { useState } from "react";

type ModalReason = "banned" | "expired" | null;

export const useModals = (isBanned: boolean, isCodeExpired: boolean) => {
  const [dismissed, setDismissed] = useState<ModalReason>(null);

  const activeReason: ModalReason = isBanned ? "banned" : isCodeExpired ? "expired" : null;

  const showBanned = activeReason === "banned" && dismissed !== "banned";

  const showExpired = activeReason === "expired" && dismissed !== "expired";

  const close = (reason: Exclude<ModalReason, null>) => {
    setDismissed(reason);
  };

  return {
    showBanned,
    showExpired,
    closeBanned: () => close("banned"),
    closeExpired: () => close("expired"),
  };
};
