"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

/* ─── icons ─── */
function IconInfo() {
  return (
    <svg
      width="16"
      height="16"
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
function IconAlertTriangle() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function IconCheckCircle() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function IconXCircle() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}
function IconX() {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function AlertShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  const dismiss = (id: string) => setDismissed((p) => [...p, id]);
  const isDismissed = (id: string) => dismissed.includes(id);

  return (
    <div className="p-8 max-w-3xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Alert</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Mensagem contextual para feedback do sistema — informação, aviso,
            erro ou sucesso.
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
          code={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`}
        />
      </Section>

      {/* ── Variantes built-in ── */}
      <Section
        title="Variantes"
        description="Variantes nativas: default e destructive."
      >
        <div className="space-y-3">
          <Alert>
            <IconInfo />
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>
              Mensagem informativa padrão do sistema.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <IconXCircle />
            <AlertTitle>Destructive</AlertTitle>
            <AlertDescription>
              Algo deu errado. Tente novamente ou entre em contato com o
              suporte.
            </AlertDescription>
          </Alert>
        </div>
        <CodeBlock
          code={`<Alert>
  <InfoIcon />
  <AlertTitle>Default</AlertTitle>
  <AlertDescription>Mensagem informativa.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <XCircleIcon />
  <AlertTitle>Destructive</AlertTitle>
  <AlertDescription>Algo deu errado.</AlertDescription>
</Alert>`}
        />
      </Section>

      <Separator />

      {/* ── Semânticos customizados ── */}
      <Section
        title="Variantes semânticas"
        description="Customize com className usando os tokens CSS do design system."
      >
        <div className="space-y-3">
          {/* Info */}
          <Alert className="border-info/30 bg-info/5 text-info *:[svg]:text-info">
            <IconInfo />
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription className="text-info/80">
              Novos recursos foram adicionados ao painel. Confira o changelog.
            </AlertDescription>
          </Alert>

          {/* Success */}
          <Alert className="border-success/30 bg-success/5 text-success *:[svg]:text-success">
            <IconCheckCircle />
            <AlertTitle>Sucesso</AlertTitle>
            <AlertDescription className="text-success/80">
              Alterações salvas com sucesso. Os dados foram atualizados.
            </AlertDescription>
          </Alert>

          {/* Warning */}
          <Alert className="border-warning/30 bg-warning/5 text-warning *:[svg]:text-warning">
            <IconAlertTriangle />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription className="text-warning/80">
              Sua assinatura expira em 3 dias. Renove para manter o acesso.
            </AlertDescription>
          </Alert>

          {/* Destructive (vermelho) */}
          <Alert
            variant="destructive"
            className="border-destructive/30 bg-destructive/5"
          >
            <IconXCircle />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Não foi possível processar o pagamento. Verifique seus dados.
            </AlertDescription>
          </Alert>
        </div>
        <CodeBlock
          code={`{/* Info */}
<Alert className="border-info/30 bg-info/5 text-info *:[svg]:text-info">
  <InfoIcon />
  <AlertTitle>Informação</AlertTitle>
  <AlertDescription className="text-info/80">…</AlertDescription>
</Alert>

{/* Success */}
<Alert className="border-success/30 bg-success/5 text-success *:[svg]:text-success">
  <CheckIcon />
  <AlertTitle>Sucesso</AlertTitle>
  <AlertDescription className="text-success/80">…</AlertDescription>
</Alert>

{/* Warning */}
<Alert className="border-warning/30 bg-warning/5 text-warning *:[svg]:text-warning">
  <TriangleIcon />
  <AlertTitle>Atenção</AlertTitle>
  <AlertDescription className="text-warning/80">…</AlertDescription>
</Alert>`}
        />
      </Section>

      <Separator />

      {/* ── Sem ícone ── */}
      <Section
        title="Sem ícone"
        description="Alert simples, sem ícone à esquerda."
      >
        <div className="space-y-3">
          <Alert>
            <AlertTitle>Título sem ícone</AlertTitle>
            <AlertDescription>
              Este alert não possui ícone. O layout ajusta automaticamente.
            </AlertDescription>
          </Alert>
          <Alert className="border-info/30 bg-info/5 text-info">
            <AlertDescription className="text-info/80">
              Apenas descrição, sem título nem ícone.
            </AlertDescription>
          </Alert>
        </div>
      </Section>

      <Separator />

      {/* ── Descartável ── */}
      <Section
        title="Descartável"
        description="Alert com botão de fechar via estado React."
      >
        <div className="space-y-3">
          {!isDismissed("banner") && (
            <Alert className="border-primary/20 bg-primary/5">
              <IconInfo />
              <AlertTitle>Novo recurso disponível</AlertTitle>
              <AlertDescription>
                O painel analítico foi reformulado.{" "}
                <a
                  href="#"
                  className="font-medium underline underline-offset-3"
                >
                  Ver novidades
                </a>
              </AlertDescription>
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => dismiss("banner")}
                className="absolute right-2.5 top-2.5 rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <IconX />
              </button>
            </Alert>
          )}
          {isDismissed("banner") && (
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">Alert removido.</p>
              <button
                type="button"
                onClick={() => setDismissed([])}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Restaurar
              </button>
            </div>
          )}
        </div>
        <CodeBlock
          code={`const [visible, setVisible] = useState(true)

{visible && (
  <Alert>
    <InfoIcon />
    <AlertTitle>Aviso</AlertTitle>
    <AlertDescription>Texto do aviso.</AlertDescription>
    <button
      aria-label="Fechar"
      onClick={() => setVisible(false)}
      className="absolute right-2.5 top-2.5 …"
    >
      <XIcon />
    </button>
  </Alert>
)}`}
        />
      </Section>

      <Separator />

      {/* ── Com link ── */}
      <Section
        title="Com link na descrição"
        description="Links dentro de AlertDescription recebem estilo automático."
      >
        <Alert>
          <IconInfo />
          <AlertTitle>Política de privacidade atualizada</AlertTitle>
          <AlertDescription>
            Revisamos nossa <a href="#">política de privacidade</a>. Leia as
            mudanças antes de continuar.
          </AlertDescription>
        </Alert>
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
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-40">
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
                type='"default" | "destructive"'
                default='"default"'
                description="Variante visual do alert."
              />
              <PropRow
                prop="className"
                type="string"
                description="Classes adicionais mescladas via cn()."
              />
              <PropRow
                prop="AlertTitle"
                type="div props"
                description="Título em negrito. Ajusta layout quando há ícone."
              />
              <PropRow
                prop="AlertDescription"
                type="div props"
                description="Descrição em muted-foreground. Links estilizados automaticamente."
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
                  O componente tem{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    role="alert"
                  </code>{" "}
                  por padrão — leitores de tela anunciam automaticamente.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Ícones devem ter{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-hidden="true"
                  </code>{" "}
                  pois o texto já descreve o conteúdo.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Botões de fechar precisam de{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-label="Fechar"
                  </code>
                  .
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: 'Alerts destrutivos com role="alert" são lidos imediatamente. Evite animações que atrasem a inserção no DOM.',
            },
            {
              icon: "!",
              color: "text-warning",
              text: 'Para alertas que não exigem ação imediata (status), prefira role="status" para evitar interrupção de leitores de tela.',
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
