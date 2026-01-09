"use client";

import { PropsWithChildren } from "react";

import { useInitIsMobile } from "../lib/useIsMobile";

export const IsMobileProvider = ({ children }: PropsWithChildren) => {
  useInitIsMobile();
  return children;
};
