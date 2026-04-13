"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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

function ContextHint() {
  return (
    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
      <svg
        width="12"
        height="12"
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
      Clique com o botão direito na área acima para abrir o menu
    </p>
  );
}

export default function ContextMenuShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showRulers, setShowRulers] = useState(false);
  const [showGuides, setShowGuides] = useState(true);
  const [zoom, setZoom] = useState("100");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  const act = (label: string) => setLastAction(label);

  return (
    <div className="p-8 max-w-3xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Context Menu</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Menu contextual ativado por clique direito — suporta items,
            submenus, checkboxes e radio groups.
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
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu"`}
        />
      </Section>

      {/* ── Básico ── */}
      <Section
        title="Básico"
        description="Menu com itens, separador e atalhos de teclado."
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground select-none cursor-context-menu hover:bg-muted/50 transition-colors">
              Área de contexto — clique com botão direito
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => act("Copiar")}>
              Copiar
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => act("Colar")}>
              Colar
              <ContextMenuShortcut>⌘V</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem onClick={() => act("Recortar")}>
              Recortar
              <ContextMenuShortcut>⌘X</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => act("Selecionar tudo")}>
              Selecionar tudo
              <ContextMenuShortcut>⌘A</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        {lastAction && (
          <p className="text-xs text-muted-foreground">
            Última ação:{" "}
            <span className="font-500 text-foreground">{lastAction}</span>
          </p>
        )}
        <ContextHint />
        <CodeBlock
          code={`<ContextMenu>
  <ContextMenuTrigger>
    <div>Área de contexto</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>
      Copiar
      <ContextMenuShortcut>⌘C</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Selecionar tudo</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        />
      </Section>

      <Separator />

      {/* ── Com label e grupos ── */}
      <Section
        title="Com grupos e labels"
        description="Organize itens com ContextMenuLabel e ContextMenuGroup."
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="h-32 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground select-none cursor-context-menu hover:bg-muted/50 transition-colors">
              Arquivo — clique com botão direito
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Arquivo</ContextMenuLabel>
            <ContextMenuGroup>
              <ContextMenuItem onClick={() => act("Abrir")}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                </svg>
                Abrir
                <ContextMenuShortcut>⌘O</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => act("Salvar")}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Salvar
                <ContextMenuShortcut>⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem onClick={() => act("Duplicar")}>
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
                Duplicar
              </ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuLabel>Perigoso</ContextMenuLabel>
            <ContextMenuGroup>
              <ContextMenuItem
                variant="destructive"
                onClick={() => act("Excluir")}
              >
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
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                Excluir
                <ContextMenuShortcut>⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
        <ContextHint />
      </Section>

      <Separator />

      {/* ── Checkbox + Radio ── */}
      <Section
        title="CheckboxItem e RadioGroup"
        description="Menu de visualização com opções de estado."
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="h-32 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground select-none cursor-context-menu hover:bg-muted/50 transition-colors">
              Canvas — clique com botão direito
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Visualização</ContextMenuLabel>
            <ContextMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={setShowGrid}
            >
              Mostrar grade
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={showRulers}
              onCheckedChange={setShowRulers}
            >
              Mostrar réguas
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem
              checked={showGuides}
              onCheckedChange={setShowGuides}
            >
              Mostrar guias
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuLabel>Zoom</ContextMenuLabel>
            <ContextMenuRadioGroup value={zoom} onValueChange={setZoom}>
              <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="150">150%</ContextMenuRadioItem>
              <ContextMenuRadioItem value="200">200%</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
        <p className="text-xs text-muted-foreground">
          Grade: {showGrid ? "on" : "off"} · Réguas: {showRulers ? "on" : "off"}{" "}
          · Guias: {showGuides ? "on" : "off"} · Zoom: {zoom}%
        </p>
        <ContextHint />
        <CodeBlock
          code={`<ContextMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
  Mostrar grade
</ContextMenuCheckboxItem>

<ContextMenuRadioGroup value={zoom} onValueChange={setZoom}>
  <ContextMenuRadioItem value="50">50%</ContextMenuRadioItem>
  <ContextMenuRadioItem value="100">100%</ContextMenuRadioItem>
</ContextMenuRadioGroup>`}
        />
      </Section>

      <Separator />

      {/* ── Submenu ── */}
      <Section
        title="Submenu"
        description="Itens aninhados com ContextMenuSub."
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="h-32 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-sm text-muted-foreground select-none cursor-context-menu hover:bg-muted/50 transition-colors">
              Compartilhar — clique com botão direito
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => act("Editar")}>
              Editar
            </ContextMenuItem>
            <ContextMenuSub>
              <ContextMenuSubTrigger>
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
                Compartilhar via
              </ContextMenuSubTrigger>
              <ContextMenuSubContent>
                <ContextMenuItem onClick={() => act("E-mail")}>
                  E-mail
                </ContextMenuItem>
                <ContextMenuItem onClick={() => act("Slack")}>
                  Slack
                </ContextMenuItem>
                <ContextMenuItem onClick={() => act("WhatsApp")}>
                  WhatsApp
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => act("Copiar link")}>
                  Copiar link
                  <ContextMenuShortcut>⌘L</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem
              variant="destructive"
              onClick={() => act("Remover")}
            >
              Remover
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        {lastAction && (
          <p className="text-xs text-muted-foreground">
            Última ação:{" "}
            <span className="font-500 text-foreground">{lastAction}</span>
          </p>
        )}
        <ContextHint />
        <CodeBlock
          code={`<ContextMenuSub>
  <ContextMenuSubTrigger>Compartilhar via</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>E-mail</ContextMenuItem>
    <ContextMenuItem>Slack</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`}
        />
      </Section>

      <Separator />

      {/* ── Em contexto real ── */}
      <Section
        title="Em contexto — lista de arquivos"
        description="Padrão em file managers e dashboards."
      >
        <div className="max-w-sm space-y-1">
          {[
            { name: "relatorio-q1.pdf", size: "2.4 MB", type: "PDF" },
            { name: "planilha-vendas.xlsx", size: "856 KB", type: "Excel" },
            { name: "apresentacao.pptx", size: "12 MB", type: "PowerPoint" },
          ].map((file) => (
            <ContextMenu key={file.name}>
              <ContextMenuTrigger>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/60 cursor-context-menu select-none transition-colors border border-transparent hover:border-border">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="text-muted-foreground shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {file.type}
                  </span>
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => act(`Abrir ${file.name}`)}>
                  Abrir
                </ContextMenuItem>
                <ContextMenuItem onClick={() => act(`Baixar ${file.name}`)}>
                  Baixar
                </ContextMenuItem>
                <ContextMenuItem onClick={() => act(`Renomear ${file.name}`)}>
                  Renomear
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem
                  variant="destructive"
                  onClick={() => act(`Excluir ${file.name}`)}
                >
                  Excluir
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </div>
        {lastAction && (
          <p className="text-xs text-muted-foreground">
            Última ação:{" "}
            <span className="font-500 text-foreground">{lastAction}</span>
          </p>
        )}
      </Section>

      <Separator />

      {/* ── Acessibilidade ── */}
      <Section title="Acessibilidade">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            {
              icon: "✓",
              color: "text-success",
              text: "Navegação por teclado: setas para mover, Enter para ativar, Esc para fechar.",
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  ContextMenuShortcut é decorativo — atalhos reais devem ser
                  implementados separadamente via{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    useEffect
                  </code>{" "}
                  +{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    keydown
                  </code>
                  .
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: "Itens desabilitados têm data-disabled e pointer-events-none automaticamente.",
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Context menus não são acessíveis via touch em dispositivos móveis — considere um botão de ações alternativo.",
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
