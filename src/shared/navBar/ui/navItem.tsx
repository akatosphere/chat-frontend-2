// src/shared/navBar/utils/navItem.tsx
import Link from "next/link";
import { ComponentType, SVGProps } from "react";

interface NavItemProps {
  label: string;  
  href?: string;
  onClick?: () => void;
  iconDesktop: ComponentType<SVGProps<SVGSVGElement>>;
  iconMobile: ComponentType<SVGProps<SVGSVGElement>>;
  variant: string;
  isActive?: boolean;
}

export const NavItem = ({ label, href, onClick, iconDesktop, iconMobile, variant, isActive }: NavItemProps) => {
  const Icon = variant === "desktop" ? iconDesktop : iconMobile;
  const isMobile = variant === "mobile";
  const colorClass = isActive ? "text-primary" : "text-gray";
  const bgClass = isActive && !isMobile ? "bg-gray-button-nav border border-gray-tone-nav rounded-md" : "";
  const wrapperClass = "cursor-pointer";

  const content = (
    <div className={`w-auto md:w-12 h-12 flex flex-col items-center justify-center rounded-md ${bgClass}`}>
      <Icon className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} ${colorClass}`} />
      {isMobile && <span className={colorClass}>{label}</span>}
    </div>
  );

return href ? (
  <Link className={wrapperClass} href={href} onClick={onClick}>
    {content}
  </Link>
) : (
  <button className={wrapperClass} onClick={onClick}>
    {content}
  </button>
);
};
