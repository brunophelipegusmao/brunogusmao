import type { ReactNode } from "react";

export default function AdminHomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <section className="min-h-full flex flex-col">{children}</section>;
}
