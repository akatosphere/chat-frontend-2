import clsx from "clsx";
import Link from "next/link";
import { ComponentType, SVGProps } from "react";

interface NavItemProps {
  label: string;
  href?: string;
  iconDesktop: ComponentType<SVGProps<SVGSVGElement>>;
  iconMobile: ComponentType<SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  order: {
    mobile: number;
    desktop: number;
  };
}

export const NavItem = ({ label, href, iconDesktop, iconMobile, isActive }: NavItemProps) => {
  const colorClass = isActive ? "text-primary" : "text-gray";
  const icons = {
    Mobile: iconMobile,
    Desktop: iconDesktop,
  };

  const content = (
    <div
      className={clsx(
        "desktop:w-12 flex h-12 w-auto cursor-pointer flex-col items-center justify-center rounded-md",
        isActive && "desktop:bg-nav-bg-active desktop:border-nav-border desktop:border",
      )}
    >
      {/* Мобильные иконки */}
      <icons.Mobile className={clsx("desktop:hidden h-6 w-6", colorClass)} />

      {/* Десктопные иконки */}
      <icons.Desktop className={clsx("desktop:block hidden h-8 w-8", colorClass)} />

      {/* Названия на мобилке */}
      <span className={clsx("desktop:hidden text-xs", colorClass)}>{label}</span>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};
