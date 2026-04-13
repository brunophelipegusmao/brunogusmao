"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
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

/* ─── Real content for comparison ─── */
function UserCard({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <Card className="w-72">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </CardContent>
        <CardFooter className="gap-2">
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-16 rounded-md" />
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card className="w-72">
      <CardHeader>
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/80?img=1"
            alt="Ana"
            className="size-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-600 text-foreground">Ana Silva</p>
            <p className="text-xs text-muted-foreground">Designer · Online</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Especialista em design systems e prototipação de interfaces de alta
          fidelidade.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Seguir</Button>
        <Button size="sm" variant="outline">
          Mensagem
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SkeletonShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

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
          <h1 className="text-2xl font-800 text-foreground">Skeleton</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Placeholder animado para conteúdo em carregamento. Substitui o
            conteúdo real durante o loading state.
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
          code={`import { Skeleton } from "@/components/ui/skeleton"`}
        />
      </Section>

      <Section
        title="Formas básicas"
        description="Skeleton adapta-se a qualquer forma via className."
      >
        <div className="flex flex-wrap items-center gap-6 p-4 rounded-lg border border-border bg-card">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-4 w-32" />
            <span className="text-xs text-muted-foreground">
              Linha de texto
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="size-10 rounded-full" />
            <span className="text-xs text-muted-foreground">Avatar</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-16 w-28 rounded-lg" />
            <span className="text-xs text-muted-foreground">Card / imagem</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-7 w-20 rounded-md" />
            <span className="text-xs text-muted-foreground">Botão</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <span className="text-xs text-muted-foreground">Badge / pill</span>
          </div>
        </div>
        <CodeBlock
          code={`{/* Linha de texto */}
<Skeleton className="h-4 w-32" />

{/* Avatar ciruclar */}
<Skeleton className="size-10 rounded-full" />

{/* Imagem / card */}
<Skeleton className="h-16 w-28 rounded-lg" />

{/* Botão */}
<Skeleton className="h-7 w-20 rounded-md" />`}
        />
      </Section>

      <Separator />

      <Section
        title="Parágrafo de texto"
        description="Múltiplos skeletons imitando linhas de texto."
      >
        <div className="space-y-2 max-w-xs">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>
        <CodeBlock
          code={`<div className="space-y-2">
  <Skeleton className="h-5 w-40" />           {/* título */}
  <Skeleton className="h-3 w-full" />          {/* linha 1 */}
  <Skeleton className="h-3 w-5/6" />           {/* linha 2 */}
  <Skeleton className="h-3 w-4/6" />           {/* linha 3 */}
</div>`}
        />
      </Section>

      <Separator />

      <Section
        title="Card de perfil"
        description="Skeleton completo de um card — compare ao conteúdo real."
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant={loading ? "default" : "outline"}
              onClick={() => setLoading(true)}
            >
              Mostrar skeleton
            </Button>
            <Button
              size="sm"
              variant={!loading ? "default" : "outline"}
              onClick={() => setLoading(false)}
            >
              Mostrar conteúdo
            </Button>
          </div>
          <UserCard loading={loading} />
        </div>
        <CodeBlock
          code={`function UserCard({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </CardContent>
      </Card>
    )
  }
  return <Card>…conteúdo real…</Card>
}`}
        />
      </Section>

      <Separator />

      <Section
        title="Grid de cards"
        description="Skeleton para listas de múltiplos cards."
      >
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i.toString()}
              className="rounded-xl border border-border p-4 space-y-3"
            >
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-7 w-full rounded-md" />
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Tabela" description="Skeleton para linhas de tabela.">
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="flex gap-4 px-4 py-3 border-b border-border bg-muted/40">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16 ml-auto" />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i.toString()}
              className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0"
            >
              <Skeleton className="size-7 rounded-full shrink-0" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-5 w-16 rounded-full ml-auto" />
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section title="Props">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-32">
                  Prop
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">
                  Tipo
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  prop: "className",
                  type: "string",
                  desc: "Controle total de tamanho, forma e radius. Ex: h-4 w-32 rounded-full.",
                },
                {
                  prop: "...props",
                  type: "div props",
                  desc: "Repassa qualquer prop HTML de <div>.",
                },
              ].map((r) => (
                <tr
                  key={r.prop}
                  className="border-b border-border last:border-0"
                >
                  <td className="py-2.5 px-3">
                    <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                      {r.prop}
                    </code>
                  </td>
                  <td className="py-2.5 px-3">
                    <code className="text-xs font-mono text-muted-foreground">
                      {r.type}
                    </code>
                  </td>
                  <td className="py-2.5 px-3 text-sm text-muted-foreground">
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
                  Adicione{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-busy="true"
                  </code>{" "}
                  no container pai enquanto carrega.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Use{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-label="Carregando…"
                  </code>{" "}
                  em um span invisível dentro do container de skeleton.
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Não deixe skeletons visíveis indefinidamente — adicione sempre um estado de fallback para erros.",
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Prefira skeleton ao spinner para layouts que têm estrutura conhecida — reduz o layout shift.",
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
