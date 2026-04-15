import { requireSession } from '@/lib/auth/session';

interface PrivateLayoutProps {
   children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
   await requireSession();

   return children;
}
