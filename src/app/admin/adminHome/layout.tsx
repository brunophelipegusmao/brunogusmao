import type { ReactNode } from "react";

export default function AdminHomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <section className="flex flex-1 flex-col">{children}</section>;
}
