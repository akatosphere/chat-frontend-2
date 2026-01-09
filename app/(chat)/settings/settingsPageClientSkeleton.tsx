"use client";

import React from "react";

export const SettingsPageClientSkeleton: React.FC = () => {
  return (
    <div className="flex h-full animate-pulse flex-col gap-4">
      <div className="bg-muted pulse h-26 w-full rounded-md" />
      <div className="bg-muted h-[211px] w-full rounded-md" />

      <div className="bg-muted mt-auto h-14 w-full self-end rounded-md" />
    </div>
  );
};
