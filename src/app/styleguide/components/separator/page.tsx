"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

export default function SeparatorShowcase() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  return (
    <div className="p-8 max-w-3xl space-y-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Separator</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Divisor visual horizontal ou vertical. Baseado em
            @base-ui/react/separator.
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
          code={`import { Separator } from "@/components/ui/separator"`}
        />
      </Section>

      <Section
        title="Horizontal (padrão)"
        description="Divide seções verticalmente."
      >
        <div className="space-y-3 p-4 rounded-lg border border-border bg-card">
          <p className="text-sm text-foreground">Seção acima</p>
          <Separator />
          <p className="text-sm text-foreground">Seção abaixo</p>
          <Separator />
          <p className="text-sm text-foreground">Terceira seção</p>
        </div>
        <CodeBlock
          code={`<p>Seção acima</p>
<Separator />
<p>Seção abaixo</p>`}
        />
      </Section>

      <Separator />

      <Section
        title="Vertical"
        description="Divide elementos horizontalmente. Requer height definido no container."
      >
        <div className="flex h-8 items-center gap-3 p-4 rounded-lg border border-border bg-card w-fit">
          <span className="text-sm text-foreground">Perfil</span>
          <Separator orientation="vertical" />
          <span className="text-sm text-foreground">Configurações</span>
          <Separator orientation="vertical" />
          <span className="text-sm text-foreground">Sair</span>
        </div>
        <CodeBlock
          code={`<div className="flex h-8 items-center gap-3">
  <span>Perfil</span>
  <Separator orientation="vertical" />
  <span>Configurações</span>
  <Separator orientation="vertical" />
  <span>Sair</span>
</div>`}
        />
      </Section>

      <Separator />

      <Section title="Customizado" description="Override via className.">
        <div className="space-y-4 p-4 rounded-lg border border-border bg-card">
          <p className="text-xs text-muted-foreground">Cor primária</p>
          <Separator className="bg-primary/30" />
          <p className="text-xs text-muted-foreground">Espessura 2px</p>
          <Separator className="h-0.5" />
          <p className="text-xs text-muted-foreground">
            Tracejado (CSS customizado)
          </p>
          <div className="h-px w-full border-t border-dashed border-border" />
        </div>
        <CodeBlock
          code={`{/* Cor customizada */}
<Separator className="bg-primary/30" />

{/* Mais espesso */}
<Separator className="h-0.5" />

{/* Tracejado via CSS */}
<div className="h-px w-full border-t border-dashed border-border" />`}
        />
      </Section>

      <Separator />

      <Section title="Em contexto — menu lateral">
        <div className="w-48 rounded-lg border border-border bg-card p-2 space-y-0.5">
          {["Dashboard", "Projetos", "Relatórios"].map((item) => (
            <button
              key={item}
              type="button"
              className="w-full text-left px-3 py-1.5 rounded-md text-sm text-foreground hover:bg-muted transition-colors"
            >
              {item}
            </button>
          ))}
          <Separator className="my-1" />
          {["Configurações", "Ajuda"].map((item) => (
            <button
              key={item}
              type="button"
              className="w-full text-left px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Props">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-36">
                  Prop
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-44">
                  Tipo
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-28">
                  Default
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  prop: "orientation",
                  type: '"horizontal" | "vertical"',
                  def: '"horizontal"',
                  desc: "Direção do separador. Horizontal = h-px w-full. Vertical = w-px self-stretch.",
                },
                {
                  prop: "className",
                  type: "string",
                  def: undefined,
                  desc: "Classes adicionais para cor, espessura ou customização.",
                },
              ].map((r) => (
                <tr
                  key={r.prop}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-2.5 px-3 align-top">
                    <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">
                      {r.prop}
                    </code>
                  </td>
                  <td className="py-2.5 px-3 align-top">
                    <code className="text-xs font-mono text-muted-foreground">
                      {r.type}
                    </code>
                  </td>
                  <td className="py-2.5 px-3 align-top">
                    <code className="text-xs font-mono text-muted-foreground">
                      {r.def ?? "—"}
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

      <Section title="Acessibilidade">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Separator renderiza{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    role="separator"
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
                  Para separadores puramente decorativos, adicione{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-hidden="true"
                  </code>
                  .
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Separadores verticais precisam de um container com height definido para aparecer corretamente.",
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
