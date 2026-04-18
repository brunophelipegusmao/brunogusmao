import { PrivateThemeToggle } from "@/components/admin/private/private-theme-toggle";
import { Particles } from "@/components/magicui/particles";
import { requireSession } from "@/lib/auth/session";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  await requireSession();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <PrivateThemeToggle />
      <Particles className="opacity-70" quantity={36} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
