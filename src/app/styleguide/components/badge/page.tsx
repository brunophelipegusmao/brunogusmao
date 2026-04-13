"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

/* ─── helpers ─── */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="border-b border-border pb-3">
        <h2 className="text-base font-700 text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group rounded-lg bg-muted border border-border overflow-hidden">
      <pre className="p-4 text-xs font-mono text-foreground overflow-x-auto leading-relaxed whitespace-pre">
        {code}
      </pre>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className={`${buttonVariants({ variant: "outline", size: "sm" })} absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        {copied ? "Copiado!" : "Copiar"}
      </button>
    </div>
  );
}

function PropRow({
  prop,
  type,
  default: def,
  description,
}: {
  prop: string;
  type: string;
  default?: string;
  description: string;
}) {
  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-2.5 pr-4 align-top">
        <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">
          {prop}
        </code>
      </td>
      <td className="py-2.5 pr-4 align-top">
        <code className="text-xs font-mono text-muted-foreground">{type}</code>
      </td>
      <td className="py-2.5 pr-4 align-top">
        <code className="text-xs font-mono text-muted-foreground">
          {def ?? "—"}
        </code>
      </td>
      <td className="py-2.5 align-top text-sm text-muted-foreground">
        {description}
      </td>
    </tr>
  );
}

/* ─── icons inline ─── */
function IconCheck() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M3 8l4 4 6-7" />
    </svg>
  );
}
function IconX() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}
function IconDot() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <circle cx="8" cy="8" r="4" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <polygon points="8 2 9.6 6.3 14 6.8 10.8 9.8 11.8 14.2 8 11.8 4.2 14.2 5.2 9.8 2 6.8 6.4 6.3" />
    </svg>
  );
}

export default function BadgeShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [count, setCount] = useState(3);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  const VARIANTS = [
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
  ] as const;

  return (
    <div className="p-8 max-w-3xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Badge</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Rótulo de status, categoria ou contagem. Suporta todas as variantes
            de cor e ícones inline.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDark}
          className="shrink-0 gap-1.5"
        >
          {darkMode ? (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
          {darkMode ? "Light" : "Dark"}
        </Button>
      </div>

      {/* ── Import ── */}
      <Section title="Import">
        <CodeBlock
          code={`import { Badge, badgeVariants } from "@/components/ui/badge"`}
        />
      </Section>

      {/* ── Variantes ── */}
      <Section
        title="Variantes"
        description="6 variantes nativas do design system."
      >
        <div className="flex flex-wrap gap-3">
          {VARIANTS.map((v) => (
            <div key={v} className="flex flex-col items-center gap-2">
              <Badge variant={v}>{v}</Badge>
              <span className="text-xs text-muted-foreground">{v}</span>
            </div>
          ))}
        </div>
        <CodeBlock
          code={`<Badge variant="default">default</Badge>
<Badge variant="secondary">secondary</Badge>
<Badge variant="destructive">destructive</Badge>
<Badge variant="outline">outline</Badge>
<Badge variant="ghost">ghost</Badge>
<Badge variant="link">link</Badge>`}
        />
      </Section>

      <Separator />

      {/* ── Semânticos ── */}
      <Section
        title="Variantes semânticas"
        description="Usando os tokens do design system via className."
      >
        <div className="flex flex-wrap gap-3">
          <Badge className="bg-success text-success-foreground">Ativo</Badge>
          <Badge className="bg-success/15 text-success border-success/30 border">
            Online
          </Badge>
          <Badge className="bg-warning/15 text-warning border-warning/30 border">
            Atenção
          </Badge>
          <Badge className="bg-destructive/10 text-destructive border-destructive/30 border">
            Erro
          </Badge>
          <Badge className="bg-info/15 text-info border-info/30 border">
            Info
          </Badge>
          <Badge className="bg-muted text-muted-foreground border">
            Inativo
          </Badge>
        </div>
        <CodeBlock
          code={`<Badge className="bg-success text-success-foreground">Ativo</Badge>
<Badge className="bg-success/15 text-success border-success/30 border">Online</Badge>
<Badge className="bg-warning/15 text-warning border-warning/30 border">Atenção</Badge>
<Badge className="bg-destructive/10 text-destructive border-destructive/30 border">Erro</Badge>
<Badge className="bg-info/15 text-info border-info/30 border">Info</Badge>
<Badge className="bg-muted text-muted-foreground border">Inativo</Badge>`}
        />
      </Section>

      <Separator />

      {/* ── Com ícones ── */}
      <Section
        title="Com ícones"
        description="Ícones antes ou depois do texto via data-icon."
      >
        <div className="flex flex-wrap gap-3">
          <Badge>
            <IconDot />
            Online
          </Badge>
          <Badge variant="secondary">
            <IconStar />
            Premium
          </Badge>
          <Badge className="bg-success/10 text-success border-success/30 border">
            <IconCheck />
            Verificado
          </Badge>
          <Badge variant="destructive">
            <IconX />
            Bloqueado
          </Badge>
          <Badge variant="outline">
            <IconDot />
            Em revisão
          </Badge>
        </div>
        <CodeBlock
          code={`<Badge><DotIcon />Online</Badge>
<Badge variant="secondary"><StarIcon />Premium</Badge>
<Badge className="bg-success/10 text-success border-success/30 border">
  <CheckIcon />Verificado
</Badge>`}
        />
      </Section>

      <Separator />

      {/* ── Como link ── */}
      <Section
        title="Como link ou botão"
        description="Use badgeVariants para aplicar o estilo em outros elementos."
      >
        <div className="flex flex-wrap gap-3 items-center">
          <a href="#" className={badgeVariants({ variant: "default" })}>
            Link badge
          </a>
          <a href="#" className={badgeVariants({ variant: "outline" })}>
            Ver categoria
          </a>
          <button
            type="button"
            onClick={() => setCount((n) => n + 1)}
            className={badgeVariants({ variant: "secondary" })}
          >
            Cliques: {count}
          </button>
        </div>
        <CodeBlock
          code={`import { badgeVariants } from "@/components/ui/badge"

{/* Badge como link */}
<a href="/categoria" className={badgeVariants({ variant: "default" })}>
  Ver categoria
</a>

{/* Badge como botão */}
<button
  type="button"
  className={badgeVariants({ variant: "secondary" })}
>
  Ação
</button>`}
        />
      </Section>

      <Separator />

      {/* ── Em contexto ── */}
      <Section
        title="Em contexto"
        description="Uso real com outros componentes."
      >
        <div className="space-y-4 max-w-sm">
          {/* Notificação */}
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
            <div className="relative shrink-0">
              <Avatar size="default">
                <AvatarImage src="https://i.pravatar.cc/80?img=1" alt="Ana" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-500 text-foreground">
                Ana Silva comentou no{" "}
                <span className="font-600">Card de métricas</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                há 2 minutos
              </p>
            </div>
            <Badge variant="default" className="shrink-0">
              Novo
            </Badge>
          </div>

          {/* Tags de produto */}
          <div className="p-3 rounded-lg border border-border bg-card space-y-2">
            <p className="text-sm font-500 text-foreground">Plano Pro</p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20 border">
                destaque
              </Badge>
            </div>
          </div>

          {/* Status de tarefa */}
          <div className="p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-500 text-foreground">
                Sprint 14 — Deploy
              </p>
              <Badge className="bg-warning/15 text-warning border-warning/30 border">
                <IconDot />
                Em progresso
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Prazo: 15 abr 2026
            </p>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Props ── */}
      <Section title="Props">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-36">
                  Prop
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">
                  Tipo
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-24">
                  Default
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              <PropRow
                prop="variant"
                type='"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"'
                default='"default"'
                description="Variante visual do badge."
              />
              <PropRow
                prop="render"
                type="ReactElement"
                description="Troca o elemento raiz via useRender (@base-ui). Ex: render={<a />}."
              />
              <PropRow
                prop="className"
                type="string"
                description="Classes adicionais para variantes semânticas customizadas."
              />
              <PropRow
                prop="badgeVariants()"
                type="fn(options)"
                description="Utilitário para aplicar estilo de badge em qualquer elemento."
              />
            </tbody>
          </table>
        </div>
      </Section>

      <Separator />

      {/* ── Acessibilidade ── */}
      <Section title="Acessibilidade">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            {
              icon: "✓",
              color: "text-success",
              text: "Badges puramente visuais (status) não precisam de foco — são elementos span sem interação.",
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Badges clicáveis devem usar{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    render={"{<a />}"}
                  </code>{" "}
                  ou{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    badgeVariants()
                  </code>{" "}
                  em um botão real.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: "Ícones dentro de badges devem ter aria-hidden para não duplicar a leitura.",
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Não comunique informação crítica SOMENTE por cor. Combine cor com texto ou ícone.",
            },
          ].map((item, i) => (
            <li key={i.toString()} className="flex gap-2">
              <span className={`${item.color} font-700 mt-0.5 shrink-0`}>
                {item.icon}
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
