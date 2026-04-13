"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

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

/* ─── Animated hook ─── */
function useAutoProgress(start = 0, target = 85, step = 1, interval = 30) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    let v = start;
    const id = setInterval(() => {
      v = Math.min(v + step, target);
      setValue(v);
      if (v >= target) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [start, target, step, interval]);
  return value;
}

export default function ProgressShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [manualValue, setManualValue] = useState(40);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const autoProgress = useAutoProgress(0, 72, 1, 25);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  const startUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 8;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => setUploading(false), 600);
      }
      setUploadProgress(Math.round(v));
    }, 150);
  };

  return (
    <div className="p-8 max-w-3xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Progress</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Barra de progresso com sub-componentes composáveis: Label, Value,
            Track e Indicator.
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
  Progress,
  ProgressLabel,
  ProgressValue,
  ProgressTrack,
  ProgressIndicator,
} from "@/components/ui/progress"`}
        />
      </Section>

      {/* ── Básico ── */}
      <Section
        title="Básico"
        description="Uso mínimo — Progress já inclui Track + Indicator."
      >
        <div className="space-y-4">
          <Progress value={0} />
          <Progress value={25} />
          <Progress value={50} />
          <Progress value={75} />
          <Progress value={100} />
        </div>
        <CodeBlock
          code={`{/* Progress inclui Track + Indicator automaticamente */}
<Progress value={25} />
<Progress value={50} />
<Progress value={100} />`}
        />
      </Section>

      <Separator />

      {/* ── Com Label e Value ── */}
      <Section
        title="Com Label e Value"
        description="ProgressLabel e ProgressValue são filhos do Progress."
      >
        <div className="space-y-4">
          <Progress value={65}>
            <ProgressLabel>Armazenamento</ProgressLabel>
            <ProgressValue>{(_, v) => `${v ?? 0}%`}</ProgressValue>
          </Progress>
          <Progress value={autoProgress}>
            <ProgressLabel>Carregando dados…</ProgressLabel>
            <ProgressValue>{(_, v) => `${v ?? 0}%`}</ProgressValue>
          </Progress>
        </div>
        <CodeBlock
          code={`<Progress value={65}>
  <ProgressLabel>Armazenamento</ProgressLabel>
  <ProgressValue>{"{value}%"}</ProgressValue>
</Progress>`}
        />
      </Section>

      <Separator />

      {/* ── Variantes de cor ── */}
      <Section
        title="Variantes de cor"
        description="Customize o ProgressIndicator com os tokens semânticos."
      >
        <div className="space-y-4">
          {[
            { label: "Primary (padrão)", value: 70, color: "bg-primary" },
            { label: "Success", value: 92, color: "bg-success" },
            { label: "Warning", value: 45, color: "bg-warning" },
            { label: "Destructive", value: 18, color: "bg-destructive" },
            { label: "Info", value: 58, color: "bg-info" },
          ].map((item) => (
            <Progress key={item.label} value={item.value}>
              <ProgressLabel>{item.label}</ProgressLabel>
              <ProgressValue>{(_, v) => `${v ?? 0}%`}</ProgressValue>
              <ProgressTrack>
                <ProgressIndicator className={item.color} />
              </ProgressTrack>
            </Progress>
          ))}
        </div>
        <CodeBlock
          code={`{/* Success */}
<Progress value={92}>
  <ProgressLabel>Backup completo</ProgressLabel>
  <ProgressValue>{"{value}%"}</ProgressValue>
  <ProgressTrack>
    <ProgressIndicator className="bg-success" />
  </ProgressTrack>
</Progress>

{/* Warning */}
<Progress value={45}>
  <ProgressTrack>
    <ProgressIndicator className="bg-warning" />
  </ProgressTrack>
</Progress>`}
        />
      </Section>

      <Separator />

      {/* ── Tamanhos de track ── */}
      <Section
        title="Tamanhos da barra"
        description="Customize a altura via ProgressTrack className."
      >
        <div className="space-y-4">
          {[
            { label: "Fina (h-0.5)", value: 60, height: "h-0.5" },
            { label: "Padrão (h-1)", value: 60, height: "h-1" },
            { label: "Média (h-2)", value: 60, height: "h-2" },
            { label: "Grossa (h-3)", value: 60, height: "h-3" },
          ].map((item) => (
            <Progress key={item.label} value={item.value}>
              <ProgressLabel>{item.label}</ProgressLabel>
              <ProgressTrack className={item.height}>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
          ))}
        </div>
        <CodeBlock
          code={`{/* Barra grossa */}
<Progress value={60}>
  <ProgressTrack className="h-3">
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`}
        />
      </Section>

      <Separator />

      {/* ── Controlado ── */}
      <Section
        title="Controlado com slider"
        description="Progress com valor ajustável interativamente."
      >
        <div className="space-y-4 max-w-sm">
          <Progress value={manualValue}>
            <ProgressLabel>Upload manual</ProgressLabel>
            <ProgressValue>{(_, v) => `${v ?? 0}%`}</ProgressValue>
          </Progress>
          <input
            type="range"
            min={0}
            max={100}
            value={manualValue}
            onChange={(e) => setManualValue(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <CodeBlock
          code={`const [value, setValue] = useState(40)

<Progress value={value}>
  <ProgressLabel>Progresso</ProgressLabel>
  <ProgressValue>{"{value}%"}</ProgressValue>
</Progress>

<input
  type="range"
  min={0}
  max={100}
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
/>`}
        />
      </Section>

      <Separator />

      {/* ── Em contexto ── */}
      <Section
        title="Em contexto — upload de arquivo"
        description="Simulação de upload com animação progressiva."
      >
        <div className="max-w-sm space-y-4">
          <div className="rounded-lg border border-border p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-500 text-foreground truncate">
                  relatorio-anual.pdf
                </p>
                <p className="text-xs text-muted-foreground">
                  {uploading
                    ? `${uploadProgress}% enviado`
                    : uploadProgress === 100
                      ? "Enviado com sucesso!"
                      : "Pronto para enviar"}
                </p>
              </div>
              {uploadProgress === 100 && !uploading && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-success shrink-0"
                  aria-hidden="true"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              )}
            </div>

            {(uploading || uploadProgress > 0) && (
              <Progress value={uploadProgress}>
                <ProgressTrack className="h-1.5">
                  <ProgressIndicator
                    className={
                      uploadProgress === 100 ? "bg-success" : "bg-primary"
                    }
                  />
                </ProgressTrack>
              </Progress>
            )}

            <Button
              size="sm"
              className="w-full"
              onClick={startUpload}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Enviando…
                </>
              ) : uploadProgress === 100 ? (
                "Enviar novamente"
              ) : (
                "Iniciar upload"
              )}
            </Button>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Dashboard de skills ── */}
      <Section
        title="Dashboard de habilidades"
        description="Uso visual para exibir métricas."
      >
        <div className="space-y-3 max-w-sm">
          {[
            { skill: "TypeScript", level: 88, color: "bg-primary" },
            { skill: "React / Next.js", level: 91, color: "bg-primary" },
            { skill: "Design System", level: 74, color: "bg-info" },
            { skill: "Performance Web", level: 65, color: "bg-success" },
            { skill: "Acessibilidade", level: 52, color: "bg-warning" },
          ].map((s) => (
            <Progress key={s.skill} value={s.level}>
              <ProgressLabel>{s.skill}</ProgressLabel>
              <ProgressValue className="font-600 text-foreground">
                {(_, v) => `${v ?? 0}%`}
              </ProgressValue>
              <ProgressTrack className="h-1.5">
                <ProgressIndicator className={s.color} />
              </ProgressTrack>
            </Progress>
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
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-44">
                  Componente
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-28">
                  Tipo
                </th>
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              <PropRow
                prop="Progress › value"
                type="number"
                description="Valor atual (0-100). null = indeterminado."
              />
              <PropRow
                prop="Progress › max"
                type="number"
                default="100"
                description="Valor máximo da barra."
              />
              <PropRow
                prop="Progress › children"
                type="ReactNode"
                description="Filhos: ProgressLabel, ProgressValue, ProgressTrack."
              />
              <PropRow
                prop="ProgressLabel"
                type="div props"
                description="Texto descritivo à esquerda (font-medium)."
              />
              <PropRow
                prop="ProgressValue"
                type="div props"
                description="Valor numérico à direita (tabular-nums). Suporta {'{value}%'} template."
              />
              <PropRow
                prop="ProgressTrack"
                type="div props"
                description="Container da barra. Controle de altura via className (h-1, h-2, h-3…)."
              />
              <PropRow
                prop="ProgressIndicator"
                type="div props"
                description="Barra de preenchimento. bg-primary por padrão — troque via className."
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
                  Progress usa{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    role="progressbar"
                  </code>{" "}
                  com{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-valuenow
                  </code>
                  ,{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-valuemin
                  </code>{" "}
                  e{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-valuemax
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
                  Use{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    {"value={null}"}
                  </code>{" "}
                  para estado indeterminado — animação CSS infinita.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: "ProgressLabel é associado via aria-labelledby pelo base-ui.",
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Não comunique progresso somente por cor. Inclua sempre ProgressValue ou texto de status.",
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
