"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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

/* ─── icons ─── */
function IconStar({ filled }: { filled?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconMoreV() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}
function IconTrend() {
  return (
    <svg
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <polyline points="2 18 12 8 18 14 28 4 38 10" />
    </svg>
  );
}

export default function CardShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  return (
    <div className="p-8 max-w-4xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Card</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Surface para agrupar conteúdo relacionado. Suporte a
            sub-componentes:{" "}
            <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">
              Header · Title · Description · Action · Content · Footer
            </code>
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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"`}
        />
      </Section>

      {/* ── Anatomy ── */}
      <Section
        title="Anatomia"
        description="Estrutura mínima e completa do Card."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* mínimo */}
          <Card>
            <CardHeader>
              <CardTitle>Título do card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Conteúdo mínimo — apenas Header + Content.
              </p>
            </CardContent>
          </Card>

          {/* completo */}
          <Card>
            <CardHeader>
              <CardTitle>Card completo</CardTitle>
              <CardDescription>Subtítulo descritivo opcional</CardDescription>
              <CardAction>
                <Button size="icon-sm" variant="ghost" aria-label="Mais opções">
                  <IconMoreV />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Header · Description · Action · Content · Footer todos
                presentes.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Confirmar</Button>
              <Button size="sm" variant="outline">
                Cancelar
              </Button>
            </CardFooter>
          </Card>
        </div>
        <CodeBlock
          code={`<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Subtítulo opcional</CardDescription>
    <CardAction>
      <Button size="icon-sm" variant="ghost"><MoreIcon /></Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    Conteúdo principal
  </CardContent>
  <CardFooter>
    <Button>Ação</Button>
  </CardFooter>
</Card>`}
        />
      </Section>

      <Separator />

      {/* ── Sizes ── */}
      <Section
        title="Tamanhos"
        description="size='default' (padrão) e size='sm'."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card size="default">
            <CardHeader>
              <CardTitle>Default (size="default")</CardTitle>
              <CardDescription>Padding e gap padrão.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              py-4 · gap-4 · px-4
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Small (size="sm")</CardTitle>
              <CardDescription>Compacto para listas densas.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              py-3 · gap-3 · px-3
            </CardContent>
          </Card>
        </div>
        <CodeBlock
          code={`<Card size="default">…</Card>
<Card size="sm">…</Card>`}
        />
      </Section>

      <Separator />

      {/* ── Variantes visuais ── */}
      <Section
        title="Variantes visuais"
        description="Personalize via className usando os tokens CSS."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Default */}
          <Card>
            <CardHeader>
              <CardTitle>Default</CardTitle>
              <CardDescription>bg-card + ring</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Estilo base do sistema.
            </CardContent>
          </Card>

          {/* Primary accent */}
          <Card className="border-primary/30 bg-primary/5 ring-primary/20">
            <CardHeader>
              <CardTitle>Primary accent</CardTitle>
              <CardDescription>Destaque brand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge>Active</Badge>
              <p className="text-sm text-muted-foreground">
                Premium · R$ 49/mês
              </p>
            </CardContent>
          </Card>

          {/* Muted */}
          <Card className="bg-muted ring-transparent">
            <CardHeader>
              <CardTitle>Muted</CardTitle>
              <CardDescription>Fundo discreto</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Ideal para conteúdo secundário.
            </CardContent>
          </Card>
        </div>
        <CodeBlock
          code={`{/* Primary accent */}
<Card className="border-primary/30 bg-primary/5 ring-primary/20">…</Card>

{/* Muted */}
<Card className="bg-muted ring-transparent">…</Card>`}
        />
      </Section>

      <Separator />

      {/* ── Com imagem ── */}
      <Section
        title="Com imagem"
        description="Imagem como primeiro filho — assume border-radius e sem padding-top."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["?img=20", "?img=42", "?img=65"].map((q, i) => (
            <Card key={q}>
              {/* biome-ignore lint/a11y/useAltText: placeholder */}
              <img
                src={`https://picsum.photos/seed/${i + 1}/400/200`}
                className="w-full h-36 object-cover"
                alt={`Placeholder ${i + 1}`}
              />
              <CardHeader>
                <CardTitle>Card visual {i + 1}</CardTitle>
                <CardDescription>Com imagem de capa</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Conteúdo abaixo da imagem.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full">
                  Ver detalhes
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <CodeBlock
          code={`<Card>
  <img src="…" className="w-full h-36 object-cover" alt="Capa" />
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>`}
        />
      </Section>

      <Separator />

      {/* ── Stats / Metric ── */}
      <Section
        title="Cartões de métrica"
        description="Padrão comum em dashboards."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: "Receita total",
              value: "R$ 45.231",
              delta: "+20,1%",
              color: "text-success",
            },
            {
              label: "Assinaturas",
              value: "+2.350",
              delta: "+15,3%",
              color: "text-success",
            },
            {
              label: "Vendas ativas",
              value: "+12.234",
              delta: "-4,6%",
              color: "text-destructive",
            },
            {
              label: "Clientes",
              value: "+573",
              delta: "+8,2%",
              color: "text-success",
            },
          ].map((m) => (
            <Card key={m.label} size="sm">
              <CardHeader>
                <CardDescription>{m.label}</CardDescription>
                <CardAction>
                  <IconTrend />
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-700 text-foreground">{m.value}</p>
                <p className={`text-xs font-500 mt-0.5 ${m.color}`}>
                  {m.delta} este mês
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <CodeBlock
          code={`<Card size="sm">
  <CardHeader>
    <CardDescription>Receita total</CardDescription>
    <CardAction><TrendIcon /></CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-xl font-bold">R$ 45.231</p>
    <p className="text-xs text-success">+20,1% este mês</p>
  </CardContent>
</Card>`}
        />
      </Section>

      <Separator />

      {/* ── Interativo ── */}
      <Section
        title="Card interativo"
        description="Com estado e ações dinâmicas."
      >
        <div className="max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Plano Pro</CardTitle>
              <CardDescription>Para times e profissionais</CardDescription>
              <CardAction>
                <Badge className="bg-success text-success-foreground">
                  Popular
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-2xl font-800 text-foreground">
                R$ 49
                <span className="text-sm font-400 text-muted-foreground">
                  /mês
                </span>
              </p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {[
                  "5 projetos ativos",
                  "Suporte prioritário",
                  "Integrações avançadas",
                  "Analytics completo",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-success shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M3 8l4 4 6-7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pt-1">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Uso de armazenamento</span>
                  <span>7,2 / 10 GB</span>
                </div>
                <Progress value={72} />
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button className="flex-1" onClick={() => setLiked((p) => !p)}>
                {liked ? "Assinado ✓" : "Assinar agora"}
              </Button>
              <Button variant="outline" size="icon" aria-label="Favoritar">
                <IconStar filled={liked} />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* ── Lista horizontal ── */}
      <Section
        title="Lista de cards"
        description="Layout horizontal compacto com size='sm'."
      >
        <div className="space-y-2 max-w-lg">
          {[
            {
              name: "Ana Silva",
              role: "Designer",
              status: "Online",
              color: "bg-success",
            },
            {
              name: "Bruno Costa",
              role: "Dev Frontend",
              status: "Ausente",
              color: "bg-warning",
            },
            {
              name: "Carla Matos",
              role: "Product Manager",
              status: "Offline",
              color: "bg-muted",
            },
          ].map((user) => (
            <Card key={user.name} size="sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-700 text-sm">
                      {user.name[0]}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-card ${user.color}`}
                    />
                  </div>
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.role}</CardDescription>
                  </div>
                </div>
                <CardAction>
                  <span className="text-xs text-muted-foreground">
                    {user.status}
                  </span>
                </CardAction>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Props ── */}
      <Section title="Props dos sub-componentes">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-36">
                  Componente
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-32">
                  Prop
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-36">
                  Tipo
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              <PropRow
                prop="Card › size"
                type='"default" | "sm"'
                default='"default"'
                description="Controla padding e gap de todos os sub-componentes."
              />
              <PropRow
                prop="Card › className"
                type="string"
                description="Classes adicionais — mescladas via cn()."
              />
              <PropRow
                prop="CardHeader"
                type="div props"
                description="Aceita qualquer prop de <div>."
              />
              <PropRow
                prop="CardTitle"
                type="div props"
                description="Renderiza um <div> com estilo de título."
              />
              <PropRow
                prop="CardDescription"
                type="div props"
                description="Renderiza um <div> com cor muted-foreground."
              />
              <PropRow
                prop="CardAction"
                type="div props"
                description="Posiciona conteúdo no canto superior direito do header."
              />
              <PropRow
                prop="CardContent"
                type="div props"
                description="Padding lateral inteligente via data-size."
              />
              <PropRow
                prop="CardFooter"
                type="div props"
                description="Fundo muted, border-top, rounded-b. Aceita qualquer filho."
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
              text: "Card é um <div> semântico — não interfere com a árvore ARIA.",
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Use{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    role="article"
                  </code>{" "}
                  ou{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    role="region"
                  </code>{" "}
                  quando o card representar uma unidade de conteúdo
                  independente.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Botões dentro de{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    CardAction
                  </code>{" "}
                  devem ter{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-label
                  </code>{" "}
                  descritivo.
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Cards clicáveis inteiros devem envolver o conteúdo em um <a> ou <button> — evite onClick no Card diretamente sem semântica adequada.",
            },
            {
              icon: "!",
              color: "text-warning",
              text: (
                <>
                  Imagens em cards precisam de{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    alt
                  </code>{" "}
                  descritivo ou{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    alt=""
                  </code>{" "}
                  se decorativas.
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
