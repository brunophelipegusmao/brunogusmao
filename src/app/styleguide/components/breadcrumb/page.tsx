"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

/* ─── custom separators ─── */
function SlashSep() {
  return <span className="text-muted-foreground text-xs">/</span>;
}
function DotSep() {
  return <span className="text-muted-foreground">·</span>;
}
function ArrowSep() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 8h8M9 5l3 3-3 3" />
    </svg>
  );
}

export default function BreadcrumbShowcase() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  return (
    <div className="p-8 max-w-3xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Breadcrumb</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Navegação hierárquica que mostra a localização atual do usuário
            dentro da aplicação.
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
          code={`import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"`}
        />
      </Section>

      {/* ── Básico ── */}
      <Section
        title="Básico"
        description="Anatomia padrão com links e página atual."
      >
        <div className="p-4 rounded-lg border border-border bg-card">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Início</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Configurações</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Perfil</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <CodeBlock
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Início</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/configuracoes">Configurações</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Perfil</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        />
      </Section>

      <Separator />

      {/* ── Separadores customizados ── */}
      <Section
        title="Separadores customizados"
        description="Passe qualquer elemento como children de BreadcrumbSeparator."
      >
        <div className="space-y-4 p-4 rounded-lg border border-border bg-card">
          {/* Chevron (padrão) */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground mb-2">
              Chevron (padrão)
            </p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Produtos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Detalhes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Slash */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Barra /</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashSep />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Produtos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashSep />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Detalhes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Dot */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Ponto ·</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <DotSep />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Produtos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <DotSep />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Detalhes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Arrow */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Seta →</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Início</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ArrowSep />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Produtos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ArrowSep />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Detalhes</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <CodeBlock
          code={`{/* Barra customizada */}
<BreadcrumbSeparator>
  <span className="text-muted-foreground">/</span>
</BreadcrumbSeparator>

{/* Ícone SVG */}
<BreadcrumbSeparator>
  <ArrowIcon />
</BreadcrumbSeparator>`}
        />
      </Section>

      <Separator />

      {/* ── Com elipse (collapse) ── */}
      <Section
        title="Com elipse"
        description="BreadcrumbEllipsis para caminhos longos truncados."
      >
        <div className="p-4 rounded-lg border border-border bg-card">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Início</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Documentação</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Introdução</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <CodeBlock
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Início</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />  {/* ··· */}
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Documentação</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Introdução</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        />
      </Section>

      <Separator />

      {/* ── Com ícone ── */}
      <Section
        title="Com ícone de início"
        description="Ícone de casa no primeiro item."
      >
        <div className="p-4 rounded-lg border border-border bg-card">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="flex items-center gap-1.5">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Início
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Styleguide</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </Section>

      <Separator />

      {/* ── Em contexto ── */}
      <Section
        title="Em contexto — cabeçalho de página"
        description="Padrão comum em dashboards e admin panels."
      >
        <div className="p-5 rounded-lg border border-border bg-card space-y-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Produtos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Editar produto</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-700 text-foreground">
                Editar produto
              </h3>
              <p className="text-sm text-muted-foreground">
                Camiseta Azul — SKU #4821
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-warning/15 text-warning border-warning/30 border">
                Rascunho
              </Badge>
              <Button size="sm">Publicar</Button>
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Props ── */}
      <Section title="Props dos sub-componentes">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-48">
                  Componente
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-36">
                  Tipo base
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  comp: "Breadcrumb",
                  base: "<nav>",
                  desc: 'Container raiz. Tem aria-label="breadcrumb" por padrão.',
                },
                {
                  comp: "BreadcrumbList",
                  base: "<ol>",
                  desc: "Lista ordenada de itens. Layout flex com gap.",
                },
                {
                  comp: "BreadcrumbItem",
                  base: "<li>",
                  desc: "Item individual da lista.",
                },
                {
                  comp: "BreadcrumbLink",
                  base: "<a>",
                  desc: "Link clicável. Aceita render prop para Next.js Link.",
                },
                {
                  comp: "BreadcrumbPage",
                  base: "<span>",
                  desc: 'Página atual — aria-current="page", não clicável.',
                },
                {
                  comp: "BreadcrumbSeparator",
                  base: "<li>",
                  desc: "Divisor. Padrão: ChevronRight. Aceita children para customizar.",
                },
                {
                  comp: "BreadcrumbEllipsis",
                  base: "<span>",
                  desc: "Indicador ··· para segmentos ocultos.",
                },
              ].map((r) => (
                <tr
                  key={r.comp}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-2.5 px-3 align-top">
                    <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">
                      {r.comp}
                    </code>
                  </td>
                  <td className="py-2.5 px-3 align-top">
                    <code className="text-xs font-mono text-muted-foreground">
                      {r.base}
                    </code>
                  </td>
                  <td className="py-2.5 px-3 align-top text-sm text-muted-foreground">
                    {r.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Separator />

      {/* ── BreadcrumbLink com Next.js ── */}
      <Section
        title="Integração com Next.js Link"
        description="Use a prop render para trocar o elemento base por Link."
      >
        <CodeBlock
          code={`import Link from "next/link"

<BreadcrumbLink render={<Link href="/dashboard" />}>
  Dashboard
</BreadcrumbLink>`}
        />
      </Section>

      <Separator />

      {/* ── Acessibilidade ── */}
      <Section title="Acessibilidade">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Breadcrumb usa{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    {'<nav aria-label="breadcrumb">'}
                  </code>{" "}
                  automaticamente.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  BreadcrumbPage tem{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-current="page"
                  </code>{" "}
                  e{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-disabled="true"
                  </code>
                  .
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  BreadcrumbSeparator tem{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-hidden="true"
                  </code>{" "}
                  — separadores são ocultos para leitores de tela.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: "BreadcrumbList é um <ol> — leitores de tela anunciam a ordem dos itens corretamente.",
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Ao usar BreadcrumbEllipsis, combine com um popover ou tooltip que explique os itens ocultos para usuários de teclado.",
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
