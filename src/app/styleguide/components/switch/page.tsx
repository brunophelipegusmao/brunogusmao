"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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

export default function SwitchShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [settings, setSettings] = useState({
    marketing: false,
    security: true,
    updates: true,
    analytics: false,
  });

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };
  const toggleSetting = (key: keyof typeof settings) =>
    setSettings((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="p-8 max-w-3xl space-y-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Switch / Toggle</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Controle binário liga/desliga. Dois tamanhos disponíveis:{" "}
            <code className="text-xs font-mono bg-muted px-1 rounded">
              default
            </code>{" "}
            e{" "}
            <code className="text-xs font-mono bg-muted px-1 rounded">sm</code>.
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
          code={`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"`}
        />
      </Section>

      <Section title="Básico" description="Switch com Label associado.">
        <div className="flex items-center gap-3">
          <Switch id="basic" defaultChecked />
          <Label htmlFor="basic">Ativar notificações</Label>
        </div>
        <CodeBlock
          code={`<Switch id="notifications" defaultChecked />
<Label htmlFor="notifications">Ativar notificações</Label>`}
        />
      </Section>

      <Separator />

      <Section
        title="Tamanhos"
        description="size='default' (18px) e size='sm' (14px)."
      >
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Switch size="default" defaultChecked />
            <span className="text-xs text-muted-foreground">default</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch size="sm" defaultChecked />
            <span className="text-xs text-muted-foreground">sm</span>
          </div>
        </div>
        <CodeBlock
          code={`<Switch size="default" /> {/* 32×18px */}
<Switch size="sm" />      {/* 24×14px */}`}
        />
      </Section>

      <Separator />

      <Section title="Estados" description="Checked, unchecked e disabled.">
        <div className="flex flex-wrap gap-8">
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-500 mb-2">
              Normal
            </p>
            <div className="flex items-center gap-2">
              <Switch id="on" checked readOnly />
              <Label htmlFor="on">On (checked)</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="off" />
              <Label htmlFor="off">Off (unchecked)</Label>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground font-500 mb-2">
              Disabled
            </p>
            <div className="flex items-center gap-2">
              <Switch id="dis-on" checked disabled />
              <Label htmlFor="dis-on" className="opacity-50">
                On · Disabled
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="dis-off" disabled />
              <Label htmlFor="dis-off" className="opacity-50">
                Off · Disabled
              </Label>
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="Controlado" description="Switch com estado React.">
        <div className="space-y-3">
          <div className="flex items-center justify-between max-w-xs p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-muted-foreground"
                aria-hidden="true"
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <circle cx="12" cy="20" r="1" />
              </svg>
              <div>
                <Label htmlFor="wifi" className="cursor-pointer font-500">
                  Wi-Fi
                </Label>
                <p className="text-xs text-muted-foreground">Rede doméstica</p>
              </div>
            </div>
            <Switch id="wifi" checked={wifi} onCheckedChange={setWifi} />
          </div>
          <div className="flex items-center justify-between max-w-xs p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-muted-foreground"
                aria-hidden="true"
              >
                <polyline points="8.56 2.75 4.13 6.03 4 14.08 4 17 5 21 12 21 19 21 20 17 20 14.08 19.87 6.03 15.44 2.75 12 2 8.56 2.75" />
              </svg>
              <div>
                <Label htmlFor="bluetooth" className="cursor-pointer font-500">
                  Bluetooth
                </Label>
                <p className="text-xs text-muted-foreground">
                  Nenhum dispositivo
                </p>
              </div>
            </div>
            <Switch
              id="bluetooth"
              checked={bluetooth}
              onCheckedChange={setBluetooth}
            />
          </div>
          <div className="flex items-center justify-between max-w-xs p-3 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-muted-foreground"
                aria-hidden="true"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <div>
                <Label htmlFor="notif" className="cursor-pointer font-500">
                  Notificações
                </Label>
                <p className="text-xs text-muted-foreground">
                  Avisos do sistema
                </p>
              </div>
            </div>
            <Switch
              id="notif"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground mt-1">
          <span>
            Wi-Fi:{" "}
            <Badge variant={wifi ? "default" : "outline"} className="text-xs">
              {wifi ? "ON" : "OFF"}
            </Badge>
          </span>
          <span>
            BT:{" "}
            <Badge
              variant={bluetooth ? "default" : "outline"}
              className="text-xs"
            >
              {bluetooth ? "ON" : "OFF"}
            </Badge>
          </span>
          <span>
            Notif:{" "}
            <Badge
              variant={notifications ? "default" : "outline"}
              className="text-xs"
            >
              {notifications ? "ON" : "OFF"}
            </Badge>
          </span>
        </div>
        <CodeBlock
          code={`const [wifi, setWifi] = useState(true)

<Switch
  id="wifi"
  checked={wifi}
  onCheckedChange={setWifi}
/>`}
        />
      </Section>

      <Separator />

      <Section
        title="Lista de configurações"
        description="Padrão de painel de preferências."
      >
        <div className="rounded-lg border border-border divide-y divide-border max-w-md">
          {(
            [
              {
                key: "marketing",
                label: "E-mails de marketing",
                desc: "Promoções e novidades do produto.",
              },
              {
                key: "security",
                label: "Alertas de segurança",
                desc: "Login em novo dispositivo.",
              },
              {
                key: "updates",
                label: "Atualizações do produto",
                desc: "Novos recursos e melhorias.",
              },
              {
                key: "analytics",
                label: "Compartilhar analytics",
                desc: "Ajuda a melhorar a experiência.",
              },
            ] as const
          ).map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between px-4 py-3 gap-4"
            >
              <div>
                <Label
                  htmlFor={`pref-${item.key}`}
                  className="cursor-pointer font-500 text-sm"
                >
                  {item.label}
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.desc}
                </p>
              </div>
              <Switch
                id={`pref-${item.key}`}
                size="sm"
                checked={settings[item.key]}
                onCheckedChange={() => toggleSetting(item.key)}
              />
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
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-44">
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
                prop="size"
                type='"default" | "sm"'
                default='"default"'
                description='Tamanho do switch. "default" = 32×18px, "sm" = 24×14px.'
              />
              <PropRow
                prop="checked"
                type="boolean"
                description="Estado controlado."
              />
              <PropRow
                prop="defaultChecked"
                type="boolean"
                description="Estado inicial não controlado."
              />
              <PropRow
                prop="onCheckedChange"
                type="(checked: boolean) => void"
                description="Callback ao mudar estado."
              />
              <PropRow
                prop="disabled"
                type="boolean"
                default="false"
                description="Desabilita o controle."
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
                  Sempre associe um{" "}
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
              text: 'Switch renderiza como role="switch" com aria-checked="true|false" automaticamente.',
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Ativação por teclado:{" "}
                  <kbd className="font-mono text-xs bg-muted px-1 rounded">
                    Space
                  </kbd>{" "}
                  alterna o estado.
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Use Switch para configurações binárias de efeito imediato. Para ações que precisam de confirmação, use Checkbox + botão Salvar.",
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
