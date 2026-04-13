"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

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

/* ─── icon helpers ─── */
function IconInfo() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
function IconCopy() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconShare() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export default function TooltipShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  return (
    <TooltipProvider>
      <div className="p-8 max-w-3xl space-y-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-800 text-foreground">Tooltip</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Rótulo flutuante ao hover/focus de um elemento. Suporte a 4
              posições, arrow e delay configurável.
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

        <Section title="Import">
          <CodeBlock
            code={`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"

{/* TooltipProvider já está no layout.tsx raiz */}`}
          />
        </Section>

        <Section
          title="Básico"
          description="Tooltip simples em cima de um botão."
        >
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="sm">
                  Passe o mouse
                </Button>
              </TooltipTrigger>
              <TooltipContent>Texto do tooltip</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button size="icon" variant="outline" aria-label="Informação">
                  <IconInfo />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Informações adicionais</TooltipContent>
            </Tooltip>
          </div>
          <CodeBlock
            code={`<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Passe o mouse</Button>
  </TooltipTrigger>
  <TooltipContent>Texto do tooltip</TooltipContent>
</Tooltip>`}
          />
        </Section>

        <Separator />

        <Section
          title="Posições"
          description="side: 'top' | 'right' | 'bottom' | 'left'."
        >
          <div className="flex flex-wrap items-center justify-center gap-4 py-8">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Tooltip key={side}>
                <TooltipTrigger>
                  <Button variant="outline" size="sm" className="capitalize">
                    {side}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side={side}>Tooltip {side}</TooltipContent>
              </Tooltip>
            ))}
          </div>
          <CodeBlock
            code={`<TooltipContent side="top">Topo</TooltipContent>
<TooltipContent side="right">Direita</TooltipContent>
<TooltipContent side="bottom">Baixo</TooltipContent>
<TooltipContent side="left">Esquerda</TooltipContent>`}
          />
        </Section>

        <Separator />

        <Section
          title="Alinhamento"
          description="align: 'start' | 'center' | 'end'."
        >
          <div className="flex flex-wrap items-center gap-4">
            {(["start", "center", "end"] as const).map((align) => (
              <Tooltip key={align}>
                <TooltipTrigger>
                  <Button variant="outline" size="sm" className="capitalize">
                    {align}
                  </Button>
                </TooltipTrigger>
                <TooltipContent align={align} side="bottom">
                  Align: {align}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </Section>

        <Separator />

        <Section
          title="Toolbar com tooltips"
          description="Uso clássico em barras de ação com ícones."
        >
          <div className="flex items-center gap-1 p-2 rounded-lg border border-border bg-card w-fit">
            {[
              { icon: <IconCopy />, label: "Copiar", shortcut: "⌘C" },
              { icon: <IconStar />, label: "Favoritar", shortcut: "⌘D" },
              { icon: <IconShare />, label: "Compartilhar", shortcut: "⌘S" },
              { icon: <IconTrash />, label: "Excluir", shortcut: "⌦" },
            ].map((action) => (
              <Tooltip key={action.label}>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={action.label}
                    className={
                      action.label === "Excluir"
                        ? "text-destructive hover:text-destructive"
                        : ""
                    }
                  >
                    {action.icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="flex items-center gap-2">
                  {action.label}
                  <kbd className="font-mono text-xs bg-white/10 px-1 py-0.5 rounded">
                    {action.shortcut}
                  </kbd>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <CodeBlock
            code={`<Tooltip>
  <TooltipTrigger>
    <Button variant="ghost" size="icon" aria-label="Copiar">
      <CopyIcon />
    </Button>
  </TooltipTrigger>
  <TooltipContent className="flex items-center gap-2">
    Copiar
    <kbd className="font-mono text-xs bg-white/10 px-1 rounded">⌘C</kbd>
  </TooltipContent>
</Tooltip>`}
          />
        </Section>

        <Separator />

        <Section
          title="Tooltip com delay"
          description="Use delayDuration ou TooltipProvider com delay global."
        >
          <div className="flex gap-4">
            <TooltipProvider delay={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="sm">
                    Sem delay
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Aparece imediatamente</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delay={500}>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="sm">
                    500ms
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Aparece após 500ms</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delay={1000}>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="sm">
                    1000ms
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Aparece após 1 segundo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CodeBlock
            code={`{/* Delay por instância */}
<Tooltip delayDuration={500}>…</Tooltip>

{/* Delay global via provider */}
<TooltipProvider delay={200}>
  {children}
</TooltipProvider>`}
          />
        </Section>

        <Separator />

        <Section
          title="Tooltip em texto truncado"
          description="Revela o nome completo quando o texto está cortado."
        >
          <div className="max-w-xs space-y-2">
            {[
              "Ana Silva — Designer Principal de Sistemas",
              "Bruno Costa — Engenheiro Frontend Sênior",
              "Carla Matos — Product Manager",
            ].map((name) => (
              <Tooltip key={name}>
                <TooltipTrigger className="w-full text-left">
                  <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/60 cursor-default">
                    <div className="size-6 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-700 shrink-0">
                      {name[0]}
                    </div>
                    <span className="text-sm text-foreground truncate">
                      {name}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">{name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </Section>

        <Separator />

        <Section title="Props">
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-44">
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
                  prop="TooltipProvider › delay"
                  type="number"
                  default="0"
                  description="Delay global em ms antes de mostrar qualquer tooltip."
                />
                <PropRow
                  prop="Tooltip › delayDuration"
                  type="number"
                  description="Delay em ms para esta instância (sobrescreve Provider)."
                />
                <PropRow
                  prop="TooltipContent › side"
                  type='"top" | "right" | "bottom" | "left"'
                  default='"top"'
                  description="Posição do tooltip em relação ao trigger."
                />
                <PropRow
                  prop="TooltipContent › align"
                  type='"start" | "center" | "end"'
                  default='"center"'
                  description="Alinhamento ao longo do eixo do side."
                />
                <PropRow
                  prop="TooltipContent › sideOffset"
                  type="number"
                  default="4"
                  description="Distância em px entre trigger e tooltip."
                />
                <PropRow
                  prop="TooltipContent › alignOffset"
                  type="number"
                  default="0"
                  description="Offset do alinhamento em px."
                />
              </tbody>
            </table>
          </div>
        </Section>

        <Separator />

        <Section title="Acessibilidade">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              {
                icon: "✓",
                color: "text-success",
                text: (
                  <>
                    Tooltip é exibido no hover E no foco — acessível para
                    navegação por teclado.
                  </>
                ),
              },
              {
                icon: "✓",
                color: "text-success",
                text: (
                  <>
                    Botões icon-only Devem ter{" "}
                    <code className="text-xs font-mono bg-muted px-1 rounded">
                      aria-label
                    </code>
                    . O tooltip é complementar, não substituto.
                  </>
                ),
              },
              {
                icon: "✓",
                color: "text-success",
                text: 'TooltipContent tem role="tooltip" e está vinculado ao trigger via aria-describedby automaticamente.',
              },
              {
                icon: "!",
                color: "text-warning",
                text: "Não coloque conteúdo interativo (botões, links) dentro do TooltipContent — use Popover para isso.",
              },
              {
                icon: "!",
                color: "text-warning",
                text: "Tooltips não devem ser a única forma de comunicar informação crítica — sempre tenha texto visível como alternativa quando possível.",
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
    </TooltipProvider>
  );
}
