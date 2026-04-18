import { redirect } from "next/navigation";
import { Particles } from "@/components/magicui/particles";
import { getSession } from "@/lib/auth/session";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Particles className="opacity-70" quantity={36} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
