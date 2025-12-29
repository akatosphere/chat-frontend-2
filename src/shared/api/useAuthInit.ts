// src/hooks/useAuthInit.ts
import { useEffect, useState } from "react";

import { useAuthStore } from "./store";

export const useAuthInit = () => {
  const [loading, setLoading] = useState(true);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/refresh-token", {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Refresh failed");

        const data = await res.json();
        if (data.access) {
          setAccessToken(data.access);
        }
      } catch {
        // logout handled elsewhere
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [setAccessToken]);

  return loading;
};
