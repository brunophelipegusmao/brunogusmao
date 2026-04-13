"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="border-b border-border pb-3">
        <h2 className="text-base font-700 text-foreground">{title}</h2>
        {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group rounded-lg bg-muted border border-border overflow-hidden">
      <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto leading-relaxed whitespace-pre">{code}</pre>
      <button type="button" onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className={`${buttonVariants({ variant: "outline", size: "sm" })} absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity`}>
        {copied ? "Copiado!" : "Copiar"}
      </button>
    </div>
  );
}

function PropRow({ prop, type, default: def, description }: { prop: string; type: string; default?: string; description: string }) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-2.5 pr-4 align-top"><code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">{prop}</code></td>
      <td className="py-2.5 pr-4 align-top"><code className="text-xs font-mono text-muted-foreground">{type}</code></td>
      <td className="py-2.5 pr-4 align-top"><code className="text-xs font-mono text-muted-foreground">{def ?? "—"}</code></td>
      <td className="py-2.5 align-top text-sm text-muted-foreground">{description}</td>
    </tr>
  );
}

/* ─── icons ─── */
function IconUser() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}
function IconSettings() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
}
function IconBell() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
}

export default function TabsShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => { setDarkMode((p) => { document.documentElement.classList.toggle("dark", !p); return !p; }); };

  return (
    <div className="p-8 max-w-3xl space-y-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Tabs</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Navegação por abas. Variante <code className="text-xs font-mono bg-muted px-1 rounded">default</code> (pill) e <code className="text-xs font-mono bg-muted px-1 rounded">line</code> (underline). Suporte a orientação horizontal e vertical.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={toggleDark} className="shrink-0 gap-1.5">
          {darkMode ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg> : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>}
          {darkMode ? "Light" : "Dark"}
        </Button>
      </div>

      <Section title="Import">
        <CodeBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`} />
      </Section>

      <Section title="Variante default (pill)" description="TabsList com fundo muted e tab ativo com fundo branco.">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Visão geral</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-4">
            <p className="text-sm text-muted-foreground">Conteúdo da aba <strong>Visão geral</strong>.</p>
          </TabsContent>
          <TabsContent value="analytics" className="pt-4">
            <p className="text-sm text-muted-foreground">Conteúdo da aba <strong>Analytics</strong>.</p>
          </TabsContent>
          <TabsContent value="reports" className="pt-4">
            <p className="text-sm text-muted-foreground">Conteúdo da aba <strong>Relatórios</strong>.</p>
          </TabsContent>
        </Tabs>
        <CodeBlock code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Visão geral</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Relatórios</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="analytics">…</TabsContent>
  <TabsContent value="reports">…</TabsContent>
</Tabs>`} />
      </Section>

      <Separator />

      <Section title="Variante line (underline)" description="TabsList variant='line' — linha abaixo da aba ativa.">
        <Tabs defaultValue="account">
          <TabsList variant="line">
            <TabsTrigger value="account">Conta</TabsTrigger>
            <TabsTrigger value="password">Senha</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="pt-4">
            <p className="text-sm text-muted-foreground">Gerencie as informações da sua conta.</p>
          </TabsContent>
          <TabsContent value="password" className="pt-4">
            <p className="text-sm text-muted-foreground">Altere sua senha e autenticação.</p>
          </TabsContent>
          <TabsContent value="notifications" className="pt-4">
            <p className="text-sm text-muted-foreground">Preferências de notificação.</p>
          </TabsContent>
        </Tabs>
        <CodeBlock code={`<Tabs defaultValue="account">
  <TabsList variant="line">
    <TabsTrigger value="account">Conta</TabsTrigger>
    <TabsTrigger value="password">Senha</TabsTrigger>
  </TabsList>
  <TabsContent value="account">…</TabsContent>
  <TabsContent value="password">…</TabsContent>
</Tabs>`} />
      </Section>

      <Separator />

      <Section title="Com ícones" description="Ícones antes do texto em cada trigger.">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile" className="gap-1.5"><IconUser />Perfil</TabsTrigger>
            <TabsTrigger value="settings" className="gap-1.5"><IconSettings />Config.</TabsTrigger>
            <TabsTrigger value="notifs" className="gap-1.5">
              <IconBell />Avisos
              <Badge className="ml-0.5 h-4 min-w-4 px-1 text-xs bg-primary text-primary-foreground">3</Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="pt-4">
            <p className="text-sm text-muted-foreground">Edite seu perfil público e privado.</p>
          </TabsContent>
          <TabsContent value="settings" className="pt-4">
            <p className="text-sm text-muted-foreground">Configurações globais da conta.</p>
          </TabsContent>
          <TabsContent value="notifs" className="pt-4">
            <p className="text-sm text-muted-foreground">Você tem 3 notificações não lidas.</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      <Section title="Orientação vertical" description="orientation='vertical' — tabs na lateral esquerda.">
        <Tabs defaultValue="geral" orientation="vertical" className="max-w-lg">
          <TabsList className="shrink-0">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="integracao">Integração</TabsTrigger>
            <TabsTrigger value="avancado">Avançado</TabsTrigger>
          </TabsList>
          <TabsContent value="geral" className="pl-4">
            <p className="text-sm font-600 text-foreground mb-1">Configurações gerais</p>
            <p className="text-sm text-muted-foreground">Nome da organização, idioma e fuso horário.</p>
          </TabsContent>
          <TabsContent value="seguranca" className="pl-4">
            <p className="text-sm font-600 text-foreground mb-1">Segurança</p>
            <p className="text-sm text-muted-foreground">Autenticação de dois fatores e sessões ativas.</p>
          </TabsContent>
          <TabsContent value="integracao" className="pl-4">
            <p className="text-sm font-600 text-foreground mb-1">Integrações</p>
            <p className="text-sm text-muted-foreground">Webhooks, OAuth e APIs de terceiros.</p>
          </TabsContent>
          <TabsContent value="avancado" className="pl-4">
            <p className="text-sm font-600 text-foreground mb-1">Avançado</p>
            <p className="text-sm text-muted-foreground">Exportação de dados e exclusão de conta.</p>
          </TabsContent>
        </Tabs>
        <CodeBlock code={`<Tabs defaultValue="geral" orientation="vertical">
  <TabsList>
    <TabsTrigger value="geral">Geral</TabsTrigger>
    <TabsTrigger value="seguranca">Segurança</TabsTrigger>
  </TabsList>
  <TabsContent value="geral">…</TabsContent>
  <TabsContent value="seguranca">…</TabsContent>
</Tabs>`} />
      </Section>

      <Separator />

      <Section title="Em contexto — dashboard" description="Cards de conteúdo dentro de abas.">
        <Tabs defaultValue="atividade">
          <TabsList variant="line">
            <TabsTrigger value="atividade">Atividade</TabsTrigger>
            <TabsTrigger value="projetos">Projetos</TabsTrigger>
            <TabsTrigger value="equipe">Equipe</TabsTrigger>
          </TabsList>
          <TabsContent value="atividade" className="pt-4 space-y-3">
            {[
              { user: "Ana Silva", action: "criou um novo card", time: "2m atrás" },
              { user: "Bruno Costa", action: "comentou em Sprint 14", time: "15m atrás" },
              { user: "Carla Matos", action: "aprovou o PR #142", time: "1h atrás" },
            ].map((ev) => (
              <div key={ev.user + ev.time} className="flex items-center gap-3 text-sm">
                <div className="size-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-700 shrink-0">{ev.user[0]}</div>
                <span className="text-foreground"><strong>{ev.user}</strong> {ev.action}</span>
                <span className="text-muted-foreground ml-auto text-xs shrink-0">{ev.time}</span>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="projetos" className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              {["Design System", "App Mobile", "Dashboard v2", "API Gateway"].map((p) => (
                <Card key={p} size="sm">
                  <CardHeader>
                    <CardTitle>{p}</CardTitle>
                    <CardDescription>3 tarefas abertas</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="equipe" className="pt-4">
            <div className="space-y-2">
              {[{ n: "Ana Silva", r: "Designer", s: "Online" }, { n: "Bruno Costa", r: "Dev", s: "Ausente" }, { n: "Carla Matos", r: "PM", s: "Offline" }].map((u) => (
                <div key={u.n} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/60">
                  <div className="size-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-sm font-700">{u.n[0]}</div>
                  <div className="flex-1"><p className="text-sm font-500 text-foreground">{u.n}</p><p className="text-xs text-muted-foreground">{u.r}</p></div>
                  <Badge variant="outline" className="text-xs">{u.s}</Badge>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      <Section title="Com skeleton de loading" description="Skeleton enquanto o conteúdo da aba é buscado.">
        <Tabs defaultValue="loaded">
          <TabsList>
            <TabsTrigger value="loaded">Carregado</TabsTrigger>
            <TabsTrigger value="loading">Carregando</TabsTrigger>
          </TabsList>
          <TabsContent value="loaded" className="pt-4 space-y-2">
            <p className="text-sm text-foreground font-500">Dados carregados com sucesso</p>
            <p className="text-sm text-muted-foreground">Este conteúdo foi obtido da API.</p>
          </TabsContent>
          <TabsContent value="loading" className="pt-4 space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      <Section title="Props">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-muted/40"><th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-44">Prop</th><th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">Tipo</th><th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-28">Default</th><th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">Descrição</th></tr></thead>
            <tbody>
              <PropRow prop="Tabs › defaultValue" type="string" description="Aba inicial (não controlado)." />
              <PropRow prop="Tabs › value" type="string" description="Aba ativa controlada." />
              <PropRow prop="Tabs › onValueChange" type="(v: string) => void" description="Callback ao trocar aba." />
              <PropRow prop="Tabs › orientation" type='"horizontal" | "vertical"' default='"horizontal"' description="Direção da lista de tabs." />
              <PropRow prop="TabsList › variant" type='"default" | "line"' default='"default"' description="Estilo visual da lista: pill ou underline." />
              <PropRow prop="TabsTrigger › value" type="string" description="Identificador da aba. Obrigatório." />
              <PropRow prop="TabsTrigger › disabled" type="boolean" default="false" description="Desabilita a aba." />
              <PropRow prop="TabsContent › value" type="string" description="Deve coincidir com o respectivo TabsTrigger." />
            </tbody>
          </table>
        </div>
      </Section>

      <Separator />

      <Section title="Acessibilidade">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            { icon: "✓", color: "text-success", text: <>Navegação por teclado: <kbd className="font-mono text-xs bg-muted px-1 rounded">← →</kbd> (horizontal) ou <kbd className="font-mono text-xs bg-muted px-1 rounded">↑ ↓</kbd> (vertical) entre tabs.</> },
            { icon: "✓", color: "text-success", text: 'TabsList tem role="tablist", TabsTrigger tem role="tab" e TabsContent tem role="tabpanel" automaticamente.' },
            { icon: "✓", color: "text-success", text: 'Tab ativa tem aria-selected="true". Conteúdo inativo é ocultado com aria-hidden automaticamente.' },
            { icon: "!", color: "text-warning", text: "Evite lazy loading de conteúdo com efeitos colaterais na troca de aba sem feedback visual — use Skeleton para indicar carregamento." },
          ].map((item, i) => (
            <li key={i.toString()} className="flex gap-2">
              <span className={`${item.color} font-700 mt-0.5 shrink-0`}>{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
