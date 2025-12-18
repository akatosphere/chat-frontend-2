import QueryCustomProvider from "@/shared/providers/queryProvider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryCustomProvider>{children}</QueryCustomProvider>;
}
