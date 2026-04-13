"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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

function Demo({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-5 rounded-lg bg-card border border-border">
      {children}
    </div>
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

/* ─── icons ─── */
function IconPlus() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M2 4h12M5 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M6 7v5M10 7v5M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" />
    </svg>
  );
}
function IconGear() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M3 8l4 4 6-7" />
    </svg>
  );
}
function IconLoader() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="animate-spin"
      aria-label="Carregando"
    >
      <circle cx="8" cy="8" r="6" strokeOpacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" />
    </svg>
  );
}

export default function ButtonShowcase() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  const handleSave = () => {
    setSaved(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-3xl space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Button</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Disparador de ações. Baseado em{" "}
            <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">
              @base-ui/react/button
            </code>
            .
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
          code={`import { Button, buttonVariants } from "@/components/ui/button"`}
        />
      </Section>

      {/* ── Variants ── */}
      <Section
        title="Variantes"
        description="6 estilos visuais via prop variant."
      >
        <Demo>
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </Demo>
        <CodeBlock
          code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
        />
      </Section>

      {/* ── Sizes ── */}
      <Section
        title="Tamanhos"
        description="4 tamanhos de texto + 4 variantes de ícone."
      >
        <Demo>
          <Button size="lg">Large</Button>
          <Button>Default</Button>
          <Button size="sm">Small</Button>
          <Button size="xs">XSmall</Button>
        </Demo>
        <CodeBlock
          code={`<Button size="lg">Large</Button>
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="xs">Extra Small</Button>`}
        />
      </Section>

      {/* ── Icon buttons ── */}
      <Section
        title="Botões de ícone"
        description="Tamanho quadrado via size='icon' e variantes."
      >
        <Demo>
          <Button size="icon-lg" variant="outline" aria-label="Configurações">
            <IconGear />
          </Button>
          <Button size="icon" variant="outline" aria-label="Configurações">
            <IconGear />
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="Configurações">
            <IconGear />
          </Button>
          <Button size="icon-xs" variant="outline" aria-label="Configurações">
            <IconGear />
          </Button>
          <span className="w-px h-6 bg-border mx-1" aria-hidden="true" />
          <Button size="icon" aria-label="Adicionar">
            <IconPlus />
          </Button>
          <Button size="icon" variant="destructive" aria-label="Excluir">
            <IconTrash />
          </Button>
        </Demo>
        <CodeBlock
          code={`// Sempre inclua aria-label em botões de ícone
<Button size="icon" aria-label="Adicionar"><PlusIcon /></Button>
<Button size="icon" variant="destructive" aria-label="Excluir"><TrashIcon /></Button>`}
        />
      </Section>

      {/* ── With icons ── */}
      <Section
        title="Com ícones inline"
        description="Ícone antes ou depois do label."
      >
        <Demo>
          <Button>
            <IconPlus /> Adicionar
          </Button>
          <Button variant="outline">
            <IconCheck /> Confirmar
          </Button>
          <Button variant="secondary">
            Próximo <IconArrow />
          </Button>
          <Button variant="destructive">
            <IconTrash /> Excluir
          </Button>
        </Demo>
        <CodeBlock
          code={`<Button><PlusIcon /> Adicionar</Button>
<Button variant="outline"><CheckIcon /> Confirmar</Button>
<Button variant="secondary">Próximo <ArrowIcon /></Button>`}
        />
      </Section>

      {/* ── Disabled ── */}
      <Section title="Desabilitado">
        <Demo>
          <Button disabled>Default</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
        </Demo>
        <CodeBlock code={`<Button disabled>Ação desabilitada</Button>`} />
      </Section>

      {/* ── Loading & estados ── */}
      <Section
        title="Estados interativos"
        description="Exemplo de loading e confirmação com estado local."
      >
        <Demo>
          <Button
            onClick={handleSave}
            disabled={loading || saved}
            className="gap-2 min-w-30"
          >
            {loading ? (
              <>
                <IconLoader /> Salvando…
              </>
            ) : saved ? (
              <>
                <IconCheck /> Salvo!
              </>
            ) : (
              "Salvar alterações"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={loading}
            className="gap-2"
          >
            {loading ? <IconLoader /> : null}
            {loading ? "Processando…" : "Reprocessar"}
          </Button>
        </Demo>
        <CodeBlock
          code={`const [loading, setLoading] = useState(false)

<Button disabled={loading} onClick={handleSubmit}>
  {loading ? <SpinnerIcon className="animate-spin" /> : null}
  {loading ? "Salvando…" : "Salvar"}
</Button>`}
        />
      </Section>

      {/* ── buttonVariants ── */}
      <Section
        title="buttonVariants"
        description="Aplica estilos de botão em outros elementos — links, triggers, etc."
      >
        <Demo>
          <a href="#" className={buttonVariants()}>
            Link primário
          </a>
          <a href="#" className={buttonVariants({ variant: "outline" })}>
            Link outline
          </a>
          <a
            href="#"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            Link sm
          </a>
        </Demo>
        <CodeBlock
          code={`import { buttonVariants } from "@/components/ui/button"

// Aplicar aparência de botão a <a>, triggers, etc.
<a href="/pagina" className={buttonVariants()}>
  Ir para página
</a>

// Com variantes
<a href="/pagina" className={buttonVariants({ variant: "outline", size: "sm" })}>
  Outline sm
</a>

// Em TooltipTrigger (evita <button> aninhado)
<TooltipTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
  Hover me
</TooltipTrigger>`}
        />
      </Section>

      {/* ── Cores semânticas ── */}
      <Section
        title="Cores semânticas"
        description="Tokens CSS de globals.css aplicados via className."
      >
        <Demo>
          <Button className="bg-success text-success-foreground hover:bg-success/90">
            Success
          </Button>
          <Button className="bg-warning text-warning-foreground hover:bg-warning/90">
            Warning
          </Button>
          <Button className="bg-info text-info-foreground hover:bg-info/90">
            Info
          </Button>
        </Demo>
        <CodeBlock
          code={`// Tokens definidos em globals.css → usados via Tailwind
<Button className="bg-success text-success-foreground hover:bg-success/90">
  Success
</Button>
<Button className="bg-warning text-warning-foreground hover:bg-warning/90">
  Warning
</Button>
<Button className="bg-info text-info-foreground hover:bg-info/90">
  Info
</Button>`}
        />
      </Section>

      {/* ── Props ── */}
      <Section
        title="Props"
        description="Herda todas as props nativas de <button>."
      >
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-28">
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
                type='"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"'
                default='"default"'
                description="Estilo visual do botão."
              />
              <PropRow
                prop="size"
                type='"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"'
                default='"default"'
                description="Dimensões do botão."
              />
              <PropRow
                prop="disabled"
                type="boolean"
                default="false"
                description="Bloqueia cliques e reduz opacidade."
              />
              <PropRow
                prop="className"
                type="string"
                description="Classes adicionais — mescladas via cn()."
              />
              <PropRow
                prop="onClick"
                type="MouseEventHandler"
                description="Callback de clique."
              />
              <PropRow
                prop="type"
                type='"button" | "submit" | "reset"'
                default='"button"'
                description="Tipo HTML do elemento."
              />
              <PropRow
                prop="render"
                type="ReactElement"
                description="Substitui o elemento renderizado (base-ui render prop)."
              />
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Acessibilidade ── */}
      <Section title="Acessibilidade">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Ativa com{" "}
                  <kbd className="font-mono text-xs bg-muted border border-border rounded px-1.5 py-0.5">
                    Enter
                  </kbd>{" "}
                  e{" "}
                  <kbd className="font-mono text-xs bg-muted border border-border rounded px-1.5 py-0.5">
                    Space
                  </kbd>
                  .
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: "Focalizável via teclado por padrão.",
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Botões de ícone devem ter{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-label
                  </code>
                  .
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: (
                <>
                  Evite aninhar{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    &lt;Button&gt;
                  </code>{" "}
                  dentro de outros elementos interativos (ex:{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    TooltipTrigger
                  </code>
                  ). Use{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    buttonVariants
                  </code>{" "}
                  como className.
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: (
                <>
                  Ao usar{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    buttonVariants
                  </code>{" "}
                  em{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    &lt;a&gt;
                  </code>
                  , certifique-se de que o href tem semântica correta.
                </>
              ),
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
