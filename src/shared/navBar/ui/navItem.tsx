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
        "flex h-12 w-auto cursor-pointer flex-col items-center justify-center rounded-md md:w-12",
        isActive && "md:bg-nav-bg-active md:border-nav-border md:border",
      )}
    >
      {/* Мобильные иконки */}
      <icons.Mobile className={clsx("h-6 w-6 md:hidden", colorClass)} />

      {/* Десктопные иконки */}
      <icons.Desktop className={clsx("hidden h-8 w-8 md:block", colorClass)} />

      {/* Названия на мобилке */}
      <span className={clsx("text-xs md:hidden", colorClass)}>{label}</span>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};
