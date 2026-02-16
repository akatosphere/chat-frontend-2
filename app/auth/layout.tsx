import { Background } from "@/shared/background/ui/Background";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Background>{children}</Background>;
}
