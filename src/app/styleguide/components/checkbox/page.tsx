"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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

const PERMISSIONS = [
  { id: "read", label: "Leitura", description: "Visualizar conteúdo" },
  { id: "write", label: "Escrita", description: "Criar e editar" },
  { id: "delete", label: "Exclusão", description: "Remover registros" },
  { id: "admin", label: "Administrador", description: "Acesso total" },
];

export default function CheckboxShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [checked, setChecked] = useState(false);
  const [permissions, setPermissions] = useState<string[]>(["read"]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  const togglePermission = (id: string) =>
    setPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  const allSelected = permissions.length === PERMISSIONS.length;
  const someSelected = permissions.length > 0 && !allSelected;

  const toggleAll = () =>
    setPermissions(allSelected ? [] : PERMISSIONS.map((p) => p.id));

  return (
    <div className="p-8 max-w-3xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Checkbox</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Controle de seleção binária — suporta estado indeterminado, grupos e
            integração com Label.
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
          code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"`}
        />
      </Section>

      {/* ── Estados ── */}
      <Section title="Estados" description="Unchecked, checked e disabled.">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Checkbox id="s1" />
            <Label htmlFor="s1">Unchecked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="s2" defaultChecked />
            <Label htmlFor="s2">Checked</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="s3" disabled />
            <Label htmlFor="s3" className="opacity-50 cursor-not-allowed">
              Disabled
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="s4" disabled defaultChecked />
            <Label htmlFor="s4" className="opacity-50 cursor-not-allowed">
              Checked + Disabled
            </Label>
          </div>
        </div>
        <CodeBlock
          code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Aceito os termos</Label>
</div>

{/* Checked por padrão */}
<Checkbox defaultChecked />

{/* Desabilitado */}
<Checkbox disabled />`}
        />
      </Section>

      <Separator />

      {/* ── Controlado ── */}
      <Section title="Controlado" description="Checkbox com estado React.">
        <div className="flex items-center gap-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={(val) => setChecked(val === true)}
          />
          <Label htmlFor="controlled">
            Notificações por e-mail —{" "}
            <span className="text-muted-foreground font-400">
              {checked ? "ativadas" : "desativadas"}
            </span>
          </Label>
        </div>
        <CodeBlock
          code={`const [checked, setChecked] = useState(false)

<Checkbox
  id="email"
  checked={checked}
  onCheckedChange={(val) => setChecked(val === true)}
/>
<Label htmlFor="email">Notificações por e-mail</Label>`}
        />
      </Section>

      <Separator />

      {/* ── Indeterminado ── */}
      <Section
        title="Estado indeterminado"
        description="Usado em selecionar-tudo com seleção parcial."
      >
        <div className="space-y-3 max-w-xs">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              indeterminate={someSelected && !allSelected}
              checked={allSelected}
              onCheckedChange={toggleAll}
            />
            <Label htmlFor="select-all" className="font-600">
              Selecionar todas as permissões
            </Label>
          </div>
          <div className="pl-6 space-y-2">
            {PERMISSIONS.map((p) => (
              <div key={p.id} className="flex items-center gap-2">
                <Checkbox
                  id={p.id}
                  checked={permissions.includes(p.id)}
                  onCheckedChange={() => togglePermission(p.id)}
                />
                <Label htmlFor={p.id}>{p.label}</Label>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Selecionadas: {permissions.join(", ") || "nenhuma"}
          </p>
        </div>
        <CodeBlock
          code={`<Checkbox
  checked={allSelected ? true : someSelected ? "mixed" : false}
  onCheckedChange={toggleAll}
/>
<Label>Selecionar todas</Label>

{/* itens filhos */}
{items.map(item => (
  <Checkbox
    key={item.id}
    checked={selected.includes(item.id)}
    onCheckedChange={() => toggle(item.id)}
  />
))}`}
        />
      </Section>

      <Separator />

      {/* ── Com descrição ── */}
      <Section
        title="Com descrição"
        description="Checkbox dentro de um formulário com label e descrição auxiliar."
      >
        <div className="space-y-4 max-w-sm">
          <div className="rounded-lg border border-border p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms2"
                checked={acceptTerms}
                onCheckedChange={(v) => setAcceptTerms(v === true)}
                className="mt-0.5"
              />
              <div className="space-y-1">
                <Label htmlFor="terms2" className="font-500">
                  Aceito os Termos de Uso
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ao marcar esta opção, você concorda com nossa{" "}
                  <a
                    href="#"
                    className="underline underline-offset-3 text-foreground hover:text-primary"
                  >
                    Política de Privacidade
                  </a>{" "}
                  e os{" "}
                  <a
                    href="#"
                    className="underline underline-offset-3 text-foreground hover:text-primary"
                  >
                    Termos de Serviço
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox
                id="newsletter2"
                checked={newsletter}
                onCheckedChange={(v) => setNewsletter(v === true)}
                className="mt-0.5"
              />
              <div className="space-y-1">
                <Label htmlFor="newsletter2" className="font-500">
                  Newsletter semanal
                </Label>
                <p className="text-xs text-muted-foreground">
                  Receba resumos semanais sobre novos recursos.
                </p>
              </div>
            </div>
          </div>
          <Button className="w-full" disabled={!acceptTerms}>
            Criar conta
          </Button>
        </div>
      </Section>

      <Separator />

      {/* ── Lista de features ── */}
      <Section
        title="Lista de funcionalidades"
        description="Padrão common em telas de planos e configurações."
      >
        <div className="max-w-sm space-y-2">
          {[
            { id: "f1", label: "Projetos ilimitados", checked: true },
            { id: "f2", label: "Integrações com APIs", checked: true },
            { id: "f3", label: "Exportação CSV", checked: true },
            { id: "f4", label: "Suporte prioritário", checked: false },
            { id: "f5", label: "Domínio customizado", checked: false },
          ].map((f) => (
            <div key={f.id} className="flex items-center gap-2.5 py-1.5">
              <Checkbox id={f.id} defaultChecked={f.checked} />
              <Label
                htmlFor={f.id}
                className={f.checked ? "" : "text-muted-foreground"}
              >
                {f.label}
              </Label>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Props ── */}
      <Section title="Props">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-40">
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
                prop="checked"
                type="boolean | 'mixed'"
                description="Estado controlado. 'mixed' = indeterminado."
              />
              <PropRow
                prop="defaultChecked"
                type="boolean"
                default="false"
                description="Estado inicial não-controlado."
              />
              <PropRow
                prop="onCheckedChange"
                type="(checked: boolean | 'mixed') => void"
                description="Callback a cada mudança de estado."
              />
              <PropRow
                prop="disabled"
                type="boolean"
                default="false"
                description="Desabilita o checkbox."
              />
              <PropRow
                prop="required"
                type="boolean"
                default="false"
                description="Marca como campo obrigatório em formulários."
              />
              <PropRow
                prop="name"
                type="string"
                description="Nome do campo para formulários nativos."
              />
              <PropRow
                prop="value"
                type="string"
                description="Valor submetido em formulários nativos."
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
                  Sempre associe com{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    {"<Label htmlFor={id}>"}
                  </code>{" "}
                  ou use{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-label
                  </code>
                  .
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Estado indeterminado usa{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-checked="mixed"
                  </code>{" "}
                  automaticamente via base-ui.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: "Navegação por teclado: Space para alternar, Tab para mover foco.",
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Em grupos de checkboxes, envolva em fieldset + legend para contexto semântico.",
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
