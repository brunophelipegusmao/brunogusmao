import { MockProvider } from "@/components/providers/MockProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <MockProvider>{children}</MockProvider>;
}
