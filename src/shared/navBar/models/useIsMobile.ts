// // хук для определения мобильного
// import { useEffect, useState } from "react";

// export const useIsMobile = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const check = () => setIsMobile(window.innerWidth < 768);
//     check();
//     window.addEventListener("resize", check);
//     return () => window.removeEventListener("resize", check);
//   }, []);

//   return isMobile;
// };


// // src/shared/navBar/utils/navItem.tsx
// import Link from "next/link";
// import { ComponentType, SVGProps } from "react";

// interface NavItemProps {
//   label: string;  
//   href?: string;
//   onClick?: () => void;
//   iconDesktop: ComponentType<SVGProps<SVGSVGElement>>;
//   iconMobile: ComponentType<SVGProps<SVGSVGElement>>;
//   variant: string;
//   isActive?: boolean;
// }

// export const NavItem = ({ label, href, onClick, iconDesktop, iconMobile, variant, isActive }: NavItemProps) => {
//   const Icon = variant === "desktop" ? iconDesktop : iconMobile;
//   const isMobile = variant === "mobile";
//   const colorClass = isActive ? "text-primary" : "text-gray";
//   const bgClass = isActive && !isMobile ? "bg-gray-button-nav border border-gray-tone-nav rounded-md" : "";
//   const wrapperClass = "cursor-pointer";

//   const content = (
//     <div className={`w-auto md:w-12 h-12 flex flex-col items-center justify-center rounded-md ${bgClass}`}>
//       <Icon className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} ${colorClass}`} />
//       {isMobile && <span className={colorClass}>{label}</span>}
//     </div>
//   );

// return href ? (
//   <Link className={wrapperClass} href={href} onClick={onClick}>
//     {content}
//   </Link>
// ) : (
//   <button className={wrapperClass} onClick={onClick}>
//     {content}
//   </button>
// );
// }; 


// src/shared/navBar/ui/navBar.tsx
// "use client";
// import { usePathname, useRouter } from "next/navigation";
// import { NavItem } from "./navItem";
// import { navItems } from "../utils/navItems";
// import { useIsMobile } from "../utils/useIsMobile";
// import { useState } from "react";

// export const NavBar = () => {
//   const isMobile = useIsMobile();
//   const pathname = usePathname();
//   const router = useRouter();

//   // Для кнопок без href можно хранить локальное активное состояние
//   const [activeLabel, setActiveLabel] = useState<string | null>(null);

//   return (
//     <nav
//       className={
//         isMobile
//           ? "fixed bottom-0 left-0 w-full border-t border-gray text-gray"
//           : "flex flex-col gap-2"
//       }
//     >
//       <div
//         className={
//           isMobile
//             ? "flex justify-between mx-4 py-2 h-[83px] text-sm"
//             : "flex flex-col justify-between items-center gap-2 w-12 h-[228px]"
//         }
//       >
//         {navItems.map((item) => {
//           const isActive = item.href ? pathname === item.href : activeLabel === item.label;

//           return (
//             <NavItem
//               key={item.label}
//               label={item.label}
//               iconDesktop={item.IconDesktop}
//               iconMobile={item.IconMobile}
//               variant={isMobile ? "mobile" : "desktop"}
//               isActive={isActive}
//               href={item.href}
//               onClick={() => {
//                 if (!item.href) setActiveLabel(item.label); // для кнопок без href
//                 if (item.href) router.push(item.href); // имитация перехода
//               }}
//             />
//           );
//         })}
//       </div>
//     </nav>
//   );
// };


// src/shared/navBar/hooks/useNavBar.ts
// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { useState, useMemo } from "react";
// import { useMediaQuery } from "./useMediaQuery";
// import { navItems } from "../models/navItems";

// export const useNavBar = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const isMobile = useMediaQuery("(max-width: 767px)");
//   const [activeLabel, setActiveLabel] = useState<string | null>(null);

//   const items = useMemo(() => {
//     const key = isMobile ? "mobile" : "desktop";

//     return [...navItems]
//       .sort((a, b) => a.order[key] - b.order[key])
//       .map((item) => ({
//         ...item,
//         isActive: item.href
//           ? pathname === item.href
//           : activeLabel === item.label,
//         onClick: () => {
//           if (item.href) {
//             router.push(item.href);
//           } else {
//             setActiveLabel(item.label);
//           }
//         },
//       }));
//   }, [isMobile, pathname, activeLabel, router]);

//   return {
//     isMobile,
//     items,
//   };
// };

