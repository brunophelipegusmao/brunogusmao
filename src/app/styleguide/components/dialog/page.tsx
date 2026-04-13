"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

/* ─── Input simples ─── */
function Input({
  label,
  placeholder,
  id,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  id: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring transition-colors"
      />
    </div>
  );
}

export default function DialogShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDeleteOpen(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-3xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Dialog</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Modal para conteúdo focado — confirmações, formulários, alertas
            críticos.
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"`}
        />
      </Section>

      {/* ── Básico ── */}
      <Section title="Básico" description="Dialog simples com header e footer.">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline">Abrir dialog</Button>}
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Título do dialog</DialogTitle>
                <DialogDescription>
                  Esta é a descrição do dialog. Explique o contexto e o que o
                  usuário precisa fazer.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Conteúdo adicional pode vir aqui — listas, texto, imagens, etc.
              </p>
              <DialogFooter showCloseButton>
                <Button>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <CodeBlock
          code={`<Dialog>
  <DialogTrigger render={<Button>Abrir</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição opcional.</DialogDescription>
    </DialogHeader>
    {/* conteúdo */}
    <DialogFooter showCloseButton>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        />
      </Section>

      <Separator />

      {/* ── Formulário ── */}
      <Section
        title="Com formulário"
        description="Padrão para criar ou editar uma entidade."
      >
        <Dialog>
          <DialogTrigger
            render={
              <Button>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Novo projeto
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar novo projeto</DialogTitle>
              <DialogDescription>
                Preencha as informações abaixo para criar um novo projeto.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input
                id="proj-name"
                label="Nome do projeto"
                placeholder="ex: Redesign Website"
              />
              <Input
                id="proj-desc"
                label="Descrição"
                placeholder="Descreva o objetivo…"
              />
              <div className="space-y-1.5">
                <Label htmlFor="proj-type">Tipo</Label>
                <select
                  id="proj-type"
                  className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring transition-colors"
                >
                  <option>Design</option>
                  <option>Desenvolvimento</option>
                  <option>Marketing</option>
                </select>
              </div>
            </form>
            <DialogFooter showCloseButton>
              <Button type="submit">Criar projeto</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <CodeBlock
          code={`<Dialog>
  <DialogTrigger render={<Button>Novo projeto</Button>} />
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Criar novo projeto</DialogTitle>
      <DialogDescription>Preencha os dados.</DialogDescription>
    </DialogHeader>
    <form className="space-y-4">
      {/* campos do formulário */}
    </form>
    <DialogFooter showCloseButton>
      <Button type="submit">Criar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        />
      </Section>

      <Separator />

      {/* ── Confirmação destrutiva ── */}
      <Section
        title="Confirmação destrutiva"
        description="Dialog de confirmação para ações irreversíveis."
      >
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogTrigger
            render={
              <Button variant="destructive">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                Excluir conta
              </Button>
            }
          />
          <DialogContent showCloseButton={false}>
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive shrink-0">
                  <svg
                    width="18"
                    height="18"
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
                </div>
                <div>
                  <DialogTitle>Excluir conta permanentemente</DialogTitle>
                </div>
              </div>
              <DialogDescription>
                Esta ação{" "}
                <strong className="text-foreground">
                  não pode ser desfeita
                </strong>
                . Todos os seus dados, projetos e configurações serão removidos
                permanentemente.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancelar
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? (
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
                    Excluindo…
                  </>
                ) : (
                  "Sim, excluir"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <CodeBlock
          code={`<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger render={<Button variant="destructive">Excluir</Button>} />
  <DialogContent showCloseButton={false}>
    <DialogHeader>
      <DialogTitle>Excluir permanentemente</DialogTitle>
      <DialogDescription>
        Esta ação <strong>não pode ser desfeita</strong>.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>
        Cancelar
      </DialogClose>
      <Button variant="destructive" onClick={handleDelete}>
        Confirmar
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        />
      </Section>

      <Separator />

      {/* ── Sem botão fechar ── */}
      <Section
        title="Variantes de tamanho e estilo"
        description="Controle de largura via className e sem botão fechar."
      >
        <div className="flex flex-wrap gap-3">
          {/* Alerta simples */}
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline">Informativo</Button>}
            />
            <DialogContent>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-info/10 text-info shrink-0">
                    <svg
                      width="18"
                      height="18"
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
                  </div>
                  <DialogTitle>Sessão expirando</DialogTitle>
                </div>
                <DialogDescription>
                  Sua sessão expira em 5 minutos. Salve o trabalho antes que
                  seja desconectado automaticamente.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter showCloseButton>
                <Button>Renovar sessão</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Sucesso */}
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline">Sucesso</Button>}
            />
            <DialogContent>
              <div className="flex flex-col items-center text-center gap-4 py-2">
                <div className="flex size-14 items-center justify-center rounded-full bg-success/10 text-success">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-700 text-foreground">
                    Pagamento confirmado!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Seu plano Pro foi ativado. Você receberá o recibo por
                    e-mail.
                  </p>
                </div>
                <Badge className="bg-success/10 text-success border-success/30 border">
                  Plano Pro ativo
                </Badge>
              </div>
              <DialogFooter>
                <DialogClose render={<Button className="w-full" />}>
                  Fechar
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Section>

      <Separator />

      {/* ── Props ── */}
      <Section title="Props dos sub-componentes">
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left text-xs font-600 text-muted-foreground px-3 py-2.5 w-48">
                  Componente / Prop
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
              {[
                {
                  prop: "Dialog › open",
                  type: "boolean",
                  desc: "Estado controlado de abertura.",
                },
                {
                  prop: "Dialog › onOpenChange",
                  type: "(open: boolean) => void",
                  desc: "Callback de mudança de estado.",
                },
                {
                  prop: "DialogTrigger › render",
                  type: "ReactElement",
                  desc: "Elemento que abre o dialog. Substitui asChild do Radix.",
                },
                {
                  prop: "DialogContent › showCloseButton",
                  type: "boolean",
                  default: "true",
                  desc: "Exibe ou oculta o botão X no canto superior direito.",
                },
                {
                  prop: "DialogFooter › showCloseButton",
                  type: "boolean",
                  default: "false",
                  desc: "Adiciona botão Close automático no footer.",
                },
                {
                  prop: "DialogClose › render",
                  type: "ReactElement",
                  desc: "Elemento que fecha o dialog ao ser clicado.",
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

      {/* ── Acessibilidade ── */}
      <Section title="Acessibilidade">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Dialog usa{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    role="dialog"
                  </code>{" "}
                  e{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-modal="true"
                  </code>{" "}
                  automaticamente.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: "Foco é movido para dentro do dialog ao abrir e restaurado ao fechar.",
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  Esc fecha o dialog — implementado via base-ui. Não é preciso
                  adicionar{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    keydown
                  </code>{" "}
                  manual.
                </>
              ),
            },
            {
              icon: "✓",
              color: "text-success",
              text: (
                <>
                  DialogTitle é obrigatório para{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-labelledby
                  </code>
                  . Use{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    className="sr-only"
                  </code>{" "}
                  se quiser oculto visualmente.
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: "Dialogs destrutivos devem focalizar o botão de confirmação secundário (cancel) por padrão para evitar ações acidentais.",
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
