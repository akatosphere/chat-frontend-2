"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "../api/store";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth");
    }
  }, [isAuthenticated, router]);

  return children;
};
