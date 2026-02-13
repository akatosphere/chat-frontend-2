"use client";

import React from "react";

export const ProfilePageClientSkeleton: React.FC = () => {
  return (
    <div className="flex animate-pulse flex-col gap-4">
      <div className="relative flex flex-col items-center gap-2">
        <div className="bg-muted desktop:h-50 desktop:w-50 desktop:rounded-full h-[390px] w-full rounded-md" />
        <div className="bg-muted desktop:block hidden h-4 w-32 rounded-md" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="bg-muted h-19 w-full rounded-md" />
        <div className="bg-muted h-19 w-full rounded-md" />
        <div className="bg-muted h-19 w-full rounded-md" />
      </div>

      <div className="flex gap-1">
        <div className="bg-muted h-19 w-[80px] rounded-md" />
        <div className="bg-muted h-19 w-[133px] rounded-md" />
        <div className="bg-muted h-19 flex-1 rounded-md" />
      </div>

      <div className="bg-muted h-19 w-full rounded-md" />

      <div className="bg-muted h-14 w-full rounded-md" />
    </div>
  );
};
