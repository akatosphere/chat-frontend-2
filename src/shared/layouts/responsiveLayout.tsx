"use client";
import { usePathname } from "next/navigation";

import { cn } from "../shadcn/lib/utils";
import { MainContent } from "../ui/mainContent";
import { Sidebar } from "../ui/sidebar";

type ResponsiveLayoutProps = {
  children: React.ReactNode; // Центральная область (Main)
  sidebar: React.ReactNode; // Левая область
  extra: React.ReactNode; // Правая область (опционально)
};

export const ResponsiveLayout = ({ children, sidebar, extra }: ResponsiveLayoutProps) => {
  const pathname = usePathname() ?? "";
  // Или /settings/profile (2 слеша) - детали.
  const pathParts = pathname.split("/").filter(Boolean);
  const isDetailView = pathParts.length > 1;
  console.log("Current Pathname:", pathname, "isDetailView:", isDetailView);
  return (
    <>
      <Sidebar className={cn("desktop:flex", isDetailView ? "hidden" : "flex")}>{sidebar}</Sidebar>
      <MainContent className={cn("desktop:block", isDetailView ? "block" : "hidden")}>
        {children}
      </MainContent>
      {extra && <Sidebar className="desktop:block hidden">{extra}</Sidebar>}
    </>
  );
};
