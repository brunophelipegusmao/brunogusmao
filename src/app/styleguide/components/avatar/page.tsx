"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

/* ─── seed data ─── */
const USERS = [
  {
    name: "Ana Silva",
    initials: "AS",
    src: "https://i.pravatar.cc/80?img=1",
    role: "Designer",
  },
  {
    name: "Bruno Costa",
    initials: "BC",
    src: "https://i.pravatar.cc/80?img=3",
    role: "Frontend",
  },
  {
    name: "Carla Matos",
    initials: "CM",
    src: "https://i.pravatar.cc/80?img=5",
    role: "PM",
  },
  {
    name: "Diego Faria",
    initials: "DF",
    src: "https://i.pravatar.cc/80?img=7",
    role: "Backend",
  },
  { name: "Elena Rocha", initials: "ER", src: "", role: "QA" },
];

/* ─── status dot colors ─── */
const STATUS_COLOR: Record<string, string> = {
  online: "bg-success",
  away: "bg-warning",
  busy: "bg-destructive",
  offline: "bg-muted-foreground",
};

export default function AvatarShowcase() {
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
          <h1 className="text-2xl font-800 text-foreground">Avatar</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Representação visual de um usuário — imagem, fallback por iniciais e
            variantes de tamanho.
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
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"`}
        />
      </Section>

      {/* ── Tamanhos ── */}
      <Section
        title="Tamanhos"
        description="Três tamanhos: sm (24px), default (32px) e lg (40px)."
      >
        <div className="flex items-end gap-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/80?img=1" alt="Ana" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="default">
              <AvatarImage src="https://i.pravatar.cc/80?img=3" alt="Bruno" />
              <AvatarFallback>BC</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="Carla" />
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">lg</span>
          </div>
        </div>
        <CodeBlock
          code={`<Avatar size="sm">
  <AvatarImage src="…" alt="Nome" />
  <AvatarFallback>AS</AvatarFallback>
</Avatar>

<Avatar size="default">…</Avatar>

<Avatar size="lg">…</Avatar>`}
        />
      </Section>

      <Separator />

      {/* ── Fallback ── */}
      <Section
        title="Fallback"
        description="Quando a imagem não carrega, exibe as iniciais."
      >
        <div className="flex items-center gap-4">
          {["AS", "BC", "CM", "DF", "ER"].map((initials) => (
            <div key={initials} className="flex flex-col items-center gap-2">
              <Avatar size="default">
                <AvatarImage src="broken-url" alt={initials} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{initials}</span>
            </div>
          ))}
        </div>
        <CodeBlock
          code={`<Avatar>
  <AvatarImage src="url" alt="Nome" />
  <AvatarFallback>AS</AvatarFallback>  {/* exibido se imagem falhar */}
</Avatar>`}
        />
      </Section>

      <Separator />

      {/* ── Com status badge ── */}
      <Section
        title="Com indicador de status"
        description="Use AvatarBadge (importado de avatar.tsx) para status online/offline."
      >
        <div className="flex items-end gap-5">
          {(["online", "away", "busy", "offline"] as const).map((status) => (
            <div key={status} className="flex flex-col items-center gap-2">
              <div className="relative inline-flex">
                <Avatar size="default">
                  <AvatarImage
                    src={`https://i.pravatar.cc/80?img=${status === "online" ? 1 : status === "away" ? 3 : status === "busy" ? 5 : 7}`}
                    alt={status}
                  />
                  <AvatarFallback>{status[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute right-0 bottom-0 z-10 size-2.5 rounded-full border-2 border-background ${STATUS_COLOR[status]}`}
                  aria-label={`Status: ${status}`}
                />
              </div>
              <span className="text-xs text-muted-foreground capitalize">
                {status}
              </span>
            </div>
          ))}
        </div>
        <CodeBlock
          code={`<div className="relative inline-flex">
  <Avatar>
    <AvatarImage src="…" alt="Nome" />
    <AvatarFallback>AS</AvatarFallback>
  </Avatar>
  <span
    className="absolute right-0 bottom-0 z-10 size-2.5 rounded-full
               border-2 border-background bg-success"
    aria-label="Status: online"
  />
</div>`}
        />
      </Section>

      <Separator />

      {/* ── AvatarGroup ── */}
      <Section
        title="Grupo de avatares"
        description="Empilhamento com AvatarGroup + AvatarGroupCount para overflow."
      >
        <div className="space-y-6">
          {/* 4 avatares */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-muted-foreground">4 membros</p>
            <AvatarGroup>
              {USERS.slice(0, 4).map((u) => (
                <Avatar key={u.name} size="default" title={u.name}>
                  <AvatarImage src={u.src} alt={u.name} />
                  <AvatarFallback>{u.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
          </div>

          {/* com overflow */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-muted-foreground">
              3 visíveis + overflow
            </p>
            <AvatarGroup>
              {USERS.slice(0, 3).map((u) => (
                <Avatar key={u.name} size="default" title={u.name}>
                  <AvatarImage src={u.src} alt={u.name} />
                  <AvatarFallback>{u.initials}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+12</AvatarGroupCount>
            </AvatarGroup>
          </div>

          {/* size lg */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-muted-foreground">size lg</p>
            <AvatarGroup>
              {USERS.slice(0, 4).map((u) => (
                <Avatar key={u.name} size="lg" title={u.name}>
                  <AvatarImage src={u.src} alt={u.name} />
                  <AvatarFallback>{u.initials}</AvatarFallback>
                </Avatar>
              ))}
              <AvatarGroupCount>+5</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </div>
        <CodeBlock
          code={`<AvatarGroup>
  <Avatar size="default">
    <AvatarImage src="…" alt="Ana" />
    <AvatarFallback>AS</AvatarFallback>
  </Avatar>
  <Avatar size="default">…</Avatar>
  <Avatar size="default">…</Avatar>
  <AvatarGroupCount>+12</AvatarGroupCount>
</AvatarGroup>`}
        />
      </Section>

      <Separator />

      {/* ── Lista de usuários ── */}
      <Section
        title="Em contexto — lista de membros"
        description="Uso real combinando Avatar com texto."
      >
        <div className="space-y-1 max-w-sm">
          {USERS.map((u, i) => {
            const statuses = ["online", "online", "away", "busy", "offline"];
            const status = statuses[i];
            return (
              <div
                key={u.name}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/60 transition-colors"
              >
                <div className="relative shrink-0">
                  <Avatar size="default">
                    <AvatarImage src={u.src} alt={u.name} />
                    <AvatarFallback>{u.initials}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-background ${STATUS_COLOR[status]}`}
                    aria-label={`Status: ${status}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-500 text-foreground truncate">
                    {u.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{u.role}</p>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs shrink-0 capitalize"
                >
                  {status}
                </Badge>
              </div>
            );
          })}
        </div>
      </Section>

      <Separator />

      {/* ── Props ── */}
      <Section title="Props">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-40">
                  Componente
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-44">
                  Prop / Tipo
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
                prop="Avatar › size"
                type='"sm" | "default" | "lg"'
                default='"default"'
                description="Controla o tamanho (24/32/40px) via data-size."
              />
              <PropRow
                prop="AvatarImage › src"
                type="string"
                description="URL da imagem do avatar."
              />
              <PropRow
                prop="AvatarImage › alt"
                type="string"
                description="Texto alternativo obrigatório para acessibilidade."
              />
              <PropRow
                prop="AvatarFallback"
                type="ReactNode"
                description="Conteúdo exibido enquanto a imagem carrega ou ao falhar."
              />
              <PropRow
                prop="AvatarGroup"
                type="div props"
                description="Container de empilhamento com -space-x-2."
              />
              <PropRow
                prop="AvatarGroupCount"
                type="div props"
                description="Contador de overflow. Herda tamanho via group-has-data-[size]."
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
              text: (
                <>
                  Sempre forneça{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    alt
                  </code>{" "}
                  em AvatarImage com o nome do usuário.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Em grupos, use{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    title
                  </code>{" "}
                  no Avatar para tooltip nativo acessível.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Indicadores de status devem ter{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-label
                  </code>{" "}
                  descritivo no elemento dot.
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: "AvatarImage com src vazio ou quebrado exibe Fallback automaticamente — não dependa de imagem para informação crítica.",
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
