// shared/lib/useInitDevice.ts
import { useEffect } from "react";

import { useIsMobileStore } from "@/shared/model/isMobile.store";

export const useInitIsMobile = () => {
  const setIsMobile = useIsMobileStore((s) => s.setIsMobile);
  const checkDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|windows phone/g;
    const isMobileUA = mobileRegex.test(userAgent);

    const hasTouch = "ontouchstart" in window;
    const isSmallScreen = window.innerWidth <= 768;

    setIsMobile(isMobileUA || hasTouch || isSmallScreen);
  };

  useEffect(() => {
    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, [setIsMobile]);
};
