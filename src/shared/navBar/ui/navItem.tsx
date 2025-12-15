import Link from "next/link";
import { ComponentType, SVGProps } from "react";

interface NavItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
  iconDesktop: ComponentType<SVGProps<SVGSVGElement>>;
  iconMobile: ComponentType<SVGProps<SVGSVGElement>>;
  isMobile: boolean;
  isActive?: boolean;
}

export const NavItem = ({
  label,
  href,
  onClick,
  iconDesktop,
  iconMobile,
  isMobile,
  isActive,
}: NavItemProps) => {
  const Icon = isMobile ? iconMobile : iconDesktop;
  const colorClass = isActive ? "text-primary" : "text-gray";
  const bgClass = isActive && !isMobile ? "bg-gray-button-nav border border-gray-tone-nav rounded-md" : "";
  const wrapperClass = "cursor-pointer";

  const content = (
    <div className={`w-auto md:w-12 h-12 flex flex-col items-center justify-center rounded-md ${bgClass}`}>
      <Icon className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} ${colorClass}`} />
      {isMobile && <span className={colorClass}>{label}</span>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClass} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={wrapperClass}>
      {content}
    </button>
  );
};

