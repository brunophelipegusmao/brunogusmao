import { DashboardTabs } from "@/components/admin/dashboard/tabs";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { RippleButton } from "@/components/magicui/ripple-button";

export default function DashboardPage() {
  return (
    <main className="private-screen private-screen--dashboard px-6 py-16 sm:px-8 md:px-16">
      <section className="private-shell mx-auto flex max-w-6xl flex-col gap-8">
        <header className="private-hero flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-blue-base">
              Area privada
            </p>
            <h1 className="font-goldman text-4xl leading-[0.92] tracking-[-0.02em] text-text-primary sm:text-5xl">
              Painel de Conteudo
            </h1>
            <p className="max-w-xl text-sm text-text-secondary">
              Controle editorial das rotas publicas /blog e /portfolio.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <InteractiveHoverButton href="/kanban">
              Ir para Kanban
            </InteractiveHoverButton>

            <form action="/api/auth/logout" method="post">
              <RippleButton type="submit">Sair</RippleButton>
            </form>
          </div>
        </header>

        <DashboardTabs />
      </section>
    </main>
  );
}
