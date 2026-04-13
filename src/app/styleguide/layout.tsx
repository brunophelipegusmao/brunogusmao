"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "./navigation";

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card flex flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto py-6 px-4">
        <div className="px-2">
          <Link href="/styleguide" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
                <rect
                  x="8"
                  y="1"
                  width="5"
                  height="5"
                  rx="1"
                  fill="white"
                  fillOpacity="0.6"
                />
                <rect
                  x="1"
                  y="8"
                  width="5"
                  height="5"
                  rx="1"
                  fill="white"
                  fillOpacity="0.6"
                />
                <rect
                  x="8"
                  y="8"
                  width="5"
                  height="5"
                  rx="1"
                  fill="white"
                  fillOpacity="0.3"
                />
              </svg>
            </div>
            <span className="text-sm font-700 text-foreground">
              Design System
            </span>
          </Link>
        </div>

        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] font-700 uppercase tracking-widest text-muted-foreground px-2 mb-1.5">
                {section.title}
              </p>
              <ul className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-2 py-1.5 rounded-md text-sm transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground font-500"
                          : "text-foreground/70 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-60 overflow-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
