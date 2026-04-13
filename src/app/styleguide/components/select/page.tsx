"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const FRUITS = ["Maçã", "Banana", "Cereja", "Damasco", "Figo", "Uva", "Manga"];
const COUNTRIES = [
  { group: "América", items: ["Brasil", "Argentina", "Chile", "Colômbia"] },
  { group: "Europa", items: ["Portugal", "Espanha", "França", "Alemanha"] },
  { group: "Ásia", items: ["Japão", "Coreia", "China", "Índia"] },
];

export default function SelectShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [fruit, setFruit] = useState("");
  const [country, setCountry] = useState("");

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
          <h1 className="text-2xl font-800 text-foreground">Select</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Dropdown de seleção única. Baseado em @base-ui/react/select.
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`}
        />
      </Section>

      <Section title="Básico">
        <div className="flex items-end gap-6 flex-wrap">
          <div className="space-y-1.5">
            <Label>Fruta favorita</Label>
            <Select
              value={fruit}
              onValueChange={(v) => v != null && setFruit(v)}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Selecione…" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FRUITS.map((f) => (
                    <SelectItem key={f} value={f.toLowerCase()}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {fruit && (
            <p className="text-sm text-muted-foreground">
              Selecionado:{" "}
              <span className="font-600 text-foreground capitalize">
                {fruit}
              </span>
            </p>
          )}
        </div>
        <CodeBlock
          code={`<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="w-44">
    <SelectValue placeholder="Selecione…" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="maca">Maçã</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
        />
      </Section>

      <Separator />

      <Section
        title="Com grupos"
        description="SelectGroup + SelectLabel para organizar itens por categoria."
      >
        <div className="space-y-1.5">
          <Label>País</Label>
          <Select
            value={country}
            onValueChange={(v) => v != null && setCountry(v)}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Selecione um país…" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((g) => (
                <SelectGroup key={g.group}>
                  <SelectLabel>{g.group}</SelectLabel>
                  {g.items.map((item) => (
                    <SelectItem key={item} value={item.toLowerCase()}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CodeBlock
          code={`<SelectContent>
  <SelectGroup>
    <SelectLabel>América</SelectLabel>
    <SelectItem value="brasil">Brasil</SelectItem>
    <SelectItem value="argentina">Argentina</SelectItem>
  </SelectGroup>
  <SelectGroup>
    <SelectLabel>Europa</SelectLabel>
    <SelectItem value="portugal">Portugal</SelectItem>
  </SelectGroup>
</SelectContent>`}
        />
      </Section>

      <Separator />

      <Section
        title="Tamanhos"
        description='size="default" (32px) e size="sm" (28px).'
      >
        <div className="flex items-end gap-4 flex-wrap">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              default (h-8)
            </Label>
            <Select>
              <SelectTrigger size="default" className="w-40">
                <SelectValue placeholder="Default…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opção A</SelectItem>
                <SelectItem value="b">Opção B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">sm (h-7)</Label>
            <Select>
              <SelectTrigger size="sm" className="w-40">
                <SelectValue placeholder="Small…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opção A</SelectItem>
                <SelectItem value="b">Opção B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CodeBlock
          code={`<SelectTrigger size="default">…</SelectTrigger>
<SelectTrigger size="sm">…</SelectTrigger>`}
        />
      </Section>

      <Separator />

      <Section title="Estados" description="Desabilitado e inválido.">
        <div className="flex items-end gap-4 flex-wrap">
          <div className="space-y-1.5">
            <Label>Desabilitado</Label>
            <Select disabled>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Desabilitado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opção A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Inválido</Label>
            <Select>
              <SelectTrigger className="w-40" aria-invalid="true">
                <SelectValue placeholder="Selecione…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opção A</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">Campo obrigatório</p>
          </div>
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
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-36">
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
                prop="Select › value"
                type="string"
                description="Valor controlado."
              />
              <PropRow
                prop="Select › defaultValue"
                type="string"
                description="Valor inicial (não controlado)."
              />
              <PropRow
                prop="Select › onValueChange"
                type="(v: string) => void"
                description="Callback de mudança."
              />
              <PropRow
                prop="Select › disabled"
                type="boolean"
                description="Desabilita o select inteiro."
              />
              <PropRow
                prop="SelectTrigger › size"
                type='"default" | "sm"'
                default='"default"'
                description="Altura do trigger."
              />
              <PropRow
                prop="SelectValue › placeholder"
                type="string"
                description="Texto quando nenhum item está selecionado."
              />
              <PropRow
                prop="SelectContent › side"
                type='"top" | "bottom"'
                default='"bottom"'
                description="Lado de abertura do dropdown."
              />
              <PropRow
                prop="SelectItem › disabled"
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
                  <kbd className="bg-muted px-1 rounded text-xs">↑ ↓</kbd> e
                  seleção com{" "}
                  <kbd className="bg-muted px-1 rounded text-xs">Enter</kbd> ou{" "}
                  <kbd className="bg-muted px-1 rounded text-xs">Space</kbd>.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Associe um{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    Label
                  </code>{" "}
                  ao trigger via{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    htmlFor
                  </code>{" "}
                  para leitores de tela.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: "Fechar com Escape ou clique fora.",
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Não use Select para menos de 3 opções — prefira RadioGroup que é mais acessível.",
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
