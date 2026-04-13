"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

export default function RadioShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [plan, setPlan] = useState("pro");
  const [notify, setNotify] = useState("all");
  const [size, setSize] = useState("md");

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
          <h1 className="text-2xl font-800 text-foreground">Radio Group</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Seleção exclusiva entre opções. Baseado em @base-ui/react/radio.
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
          code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"`}
        />
      </Section>

      <Section
        title="Básico"
        description="RadioGroup controlado com Label associado."
      >
        <div className="flex items-start gap-8">
          <RadioGroup value={plan} onValueChange={setPlan} className="gap-3">
            {[
              { value: "free", label: "Free" },
              { value: "pro", label: "Pro" },
              { value: "enterprise", label: "Enterprise" },
            ].map((opt) => (
              <div key={opt.value} className="flex items-center gap-2.5">
                <RadioGroupItem value={opt.value} id={`plan-${opt.value}`} />
                <Label htmlFor={`plan-${opt.value}`} className="cursor-pointer">
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="text-sm text-muted-foreground">
            Selecionado:{" "}
            <span className="font-600 text-foreground">{plan}</span>
          </div>
        </div>
        <CodeBlock
          code={`const [value, setValue] = useState("pro")

<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center gap-2.5">
    <RadioGroupItem value="free" id="r-free" />
    <Label htmlFor="r-free">Free</Label>
  </div>
  <div className="flex items-center gap-2.5">
    <RadioGroupItem value="pro" id="r-pro" />
    <Label htmlFor="r-pro">Pro</Label>
  </div>
</RadioGroup>`}
        />
      </Section>

      <Separator />

      <Section
        title="Com descrição"
        description="Cada opção com subtítulo explicativo."
      >
        <RadioGroup value={notify} onValueChange={setNotify} className="gap-0">
          {[
            {
              value: "all",
              label: "Todas as notificações",
              desc: "Receba alertas de todas as atividades.",
            },
            {
              value: "mentions",
              label: "Apenas menções",
              desc: "Notificado somente quando mencionado.",
            },
            {
              value: "none",
              label: "Nenhuma",
              desc: "Sem notificações. Acesse manualmente.",
            },
          ].map((opt) => (
            <label
              key={opt.value}
              htmlFor={`notify-${opt.value}`}
              className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 -mt-px first:mt-0 first:rounded-t-lg last:rounded-b-lg rounded-none"
            >
              <RadioGroupItem
                value={opt.value}
                id={`notify-${opt.value}`}
                className="mt-0.5"
              />
              <div>
                <p className="text-sm font-500 text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {opt.desc}
                </p>
              </div>
            </label>
          ))}
        </RadioGroup>
      </Section>

      <Separator />

      <Section title="Inline / horizontal">
        <RadioGroup value={size} onValueChange={setSize} className="flex gap-4">
          {["xs", "sm", "md", "lg", "xl"].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <RadioGroupItem value={s} id={`sz-${s}`} />
              <Label htmlFor={`sz-${s}`} className="cursor-pointer uppercase">
                {s}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          Tamanho selecionado:{" "}
          <span className="font-600 text-foreground uppercase">{size}</span>
        </p>
        <CodeBlock
          code={`<RadioGroup orientation="horizontal" className="flex gap-4">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="xs" id="r-xs" />
    <Label htmlFor="r-xs">XS</Label>
  </div>
  …
</RadioGroup>`}
        />
      </Section>

      <Separator />

      <Section title="Estados" description="Desabilitado e inválido.">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Desabilitado</p>
            <RadioGroup defaultValue="b" className="gap-3">
              {["a", "b", "c"].map((v) => (
                <div key={v} className="flex items-center gap-2.5">
                  <RadioGroupItem value={v} id={`dis-${v}`} disabled />
                  <Label htmlFor={`dis-${v}`} className="text-muted-foreground">
                    Opção {v.toUpperCase()}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Inválido (aria-invalid)
            </p>
            <RadioGroup className="gap-3">
              {["sim", "não"].map((v) => (
                <div key={v} className="flex items-center gap-2.5">
                  <RadioGroupItem
                    value={v}
                    id={`inv-${v}`}
                    aria-invalid="true"
                  />
                  <Label htmlFor={`inv-${v}`} className="capitalize">
                    {v}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Props">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-40">
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
                prop="value"
                type="string"
                description="Valor controlado do grupo."
              />
              <PropRow
                prop="defaultValue"
                type="string"
                description="Valor inicial (não controlado)."
              />
              <PropRow
                prop="onValueChange"
                type="(value: string) => void"
                description="Callback quando seleção muda."
              />
              <PropRow
                prop="orientation"
                type='"horizontal" | "vertical"'
                default='"vertical"'
                description="Direção do grupo para navegação por teclado."
              />
              <PropRow
                prop="disabled"
                type="boolean"
                description="Desabilita todos os itens do grupo."
              />
              <PropRow
                prop="RadioGroupItem › value"
                type="string"
                description="Valor do item. Obrigatório."
              />
              <PropRow
                prop="RadioGroupItem › disabled"
                type="boolean"
                description="Desabilita apenas este item."
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
                  Navegação com{" "}
                  <kbd className="bg-muted px-1 rounded text-xs">↑ ↓</kbd>{" "}
                  (vertical) ou{" "}
                  <kbd className="bg-muted px-1 rounded text-xs">← →</kbd>{" "}
                  (horizontal) entre os itens.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Sempre associe{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    RadioGroupItem
                  </code>{" "}
                  a um{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    Label
                  </code>{" "}
                  via{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    htmlFor
                  </code>{" "}
                  /{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    id
                  </code>
                  .
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: 'RadioGroup renderiza role="radiogroup" automaticamente.',
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Adicione um título ou aria-label descritivo no RadioGroup quando o contexto não for claro.",
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
