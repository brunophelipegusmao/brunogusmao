"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

/* ─── helpers ─── */
function Section({
  id,
  title,
  description,
  children,
}: {
  id?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-4">
      <div className="border-b border-border pb-3">
        <h2 className="text-lg font-700 text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Swatch({ label, variable }: { label: string; variable: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-12 w-full rounded-lg border border-black/8 shadow-sm"
        style={{ background: `var(${variable})` }}
      />
      <p className="text-xs font-600 text-foreground truncate">{label}</p>
      <p className="text-[10px] font-mono text-muted-foreground truncate">
        {variable}
      </p>
    </div>
  );
}

function RadiusSwatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-14 h-14 bg-primary/15 border-2 border-primary"
        style={{ borderRadius: value }}
      />
      <p className="text-[10px] text-center text-muted-foreground font-500">
        {label}
      </p>
    </div>
  );
}

const elevations = [
  { level: "Flat", shadow: "none" },
  {
    level: "Subtle",
    shadow: "0 1px 3px 0 rgb(0 0 0/.08),0 1px 2px -1px rgb(0 0 0/.06)",
  },
  {
    level: "Card",
    shadow: "0 4px 6px -1px rgb(0 0 0/.10),0 2px 4px -2px rgb(0 0 0/.08)",
  },
  {
    level: "High",
    shadow: "0 10px 15px -3px rgb(0 0 0/.12),0 4px 6px -4px rgb(0 0 0/.08)",
  },
];

export default function StyleguidePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(60);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  return (
    <div className="p-8 max-w-4xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-800 text-foreground tracking-tight">
            Design System
          </h1>
          <p className="text-muted-foreground mt-1">
            Tokens e componentes · Inter · #4361EE
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDark}
          className="gap-1.5 shrink-0"
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

      {/* ── Colors ── */}
      <Section id="colors" title="Color tokens">
        {[
          {
            label: "Brand",
            swatches: [
              ["--primary", "Primary"],
              ["--primary-foreground", "Primary FG"],
              ["--secondary", "Secondary"],
              ["--accent", "Accent"],
            ],
          },
          {
            label: "Surfaces",
            swatches: [
              ["--background", "Background"],
              ["--card", "Card"],
              ["--muted", "Muted"],
              ["--popover", "Popover"],
            ],
          },
          {
            label: "Semantic",
            swatches: [
              ["--success", "Success"],
              ["--warning", "Warning"],
              ["--destructive", "Destructive"],
              ["--info", "Info"],
            ],
          },
          {
            label: "Forms & Borders",
            swatches: [
              ["--border", "Border"],
              ["--input", "Input"],
              ["--ring", "Ring"],
              ["--muted-foreground", "Muted FG"],
            ],
          },
        ].map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-700 uppercase tracking-widest text-muted-foreground mb-3">
              {group.label}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {group.swatches.map(([v, l]) => (
                <Swatch key={v} variable={v} label={l} />
              ))}
            </div>
          </div>
        ))}
        <div>
          <p className="text-[10px] font-700 uppercase tracking-widest text-muted-foreground mb-3">
            Charts
          </p>
          <div className="grid grid-cols-5 gap-3">
            {[
              "--chart-1",
              "--chart-2",
              "--chart-3",
              "--chart-4",
              "--chart-5",
            ].map((v, i) => (
              <Swatch key={v} variable={v} label={`Chart ${i + 1}`} />
            ))}
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Typography ── */}
      <Section
        id="typography"
        title="Typography"
        description="Inter — escala de tamanhos e pesos"
      >
        <div className="space-y-4">
          {[
            {
              cls: "text-3xl font-800 leading-tight",
              meta: "3xl / 800",
              text: "Headline 1 — Design System",
            },
            {
              cls: "text-2xl font-700",
              meta: "2xl / 700",
              text: "Headline 2 — Section Title",
            },
            {
              cls: "text-lg font-600",
              meta: "lg / 600",
              text: "Subtitle — Descriptive Label",
            },
            {
              cls: "text-base font-400",
              meta: "base / 400",
              text: "Body 1 — Regular content. The quick brown fox jumps over the lazy dog.",
            },
            {
              cls: "text-sm font-400",
              meta: "sm / 400",
              text: "Body 2 — Secondary details and metadata.",
            },
            {
              cls: "text-xs font-400 text-muted-foreground",
              meta: "xs / 400 / muted",
              text: "Caption — Helper text and supplementary information.",
            },
          ].map((t) => (
            <div key={t.meta}>
              <p className={`text-foreground ${t.cls}`}>{t.text}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                {t.meta}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Radius & Elevation ── */}
      <Section id="radius" title="Border radius & Elevation">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <p className="text-xs font-600 text-muted-foreground mb-4">
              Radius
            </p>
            <div className="flex items-end gap-5 flex-wrap">
              <RadiusSwatch label="0" value="0" />
              <RadiusSwatch label="4px" value="var(--radius-sm)" />
              <RadiusSwatch label="8px / default" value="var(--radius)" />
              <RadiusSwatch label="16px" value="var(--radius-xl)" />
              <RadiusSwatch label="Pill" value="9999px" />
            </div>
          </div>
          <div>
            <p className="text-xs font-600 text-muted-foreground mb-4">
              Elevation
            </p>
            <div className="flex items-end gap-5 flex-wrap">
              {elevations.map((e) => (
                <div key={e.level} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-xl bg-card border border-border/50"
                    style={{ boxShadow: e.shadow }}
                  />
                  <p className="text-[10px] text-center text-muted-foreground">
                    {e.level}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Button ── */}
      <Section id="button" title="Button">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 items-center">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Button size="lg">Large</Button>
            <Button>Default</Button>
            <Button size="sm">Small</Button>
            <Button size="xs">XSmall</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Badge ── */}
      <Section id="badge" title="Badge">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-600 bg-success text-success-foreground">
            Success
          </span>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-600 bg-warning text-warning-foreground">
            Warning
          </span>
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-600 bg-info text-info-foreground">
            Info
          </span>
        </div>
      </Section>

      <Separator />

      {/* ── Alert ── */}
      <Section id="alert" title="Alert">
        <div className="space-y-3 max-w-xl">
          <Alert
            style={{
              borderColor: "var(--success)",
              background: "color-mix(in oklab, var(--success) 8%, transparent)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: "var(--success)" }}
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <AlertTitle style={{ color: "var(--success)" }}>Success</AlertTitle>
            <AlertDescription>Deploy concluído com sucesso.</AlertDescription>
          </Alert>
          <Alert
            style={{
              borderColor: "var(--info)",
              background: "color-mix(in oklab, var(--info) 8%, transparent)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: "var(--info)" }}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <AlertTitle style={{ color: "var(--info)" }}>Info</AlertTitle>
            <AlertDescription>
              Informações disponíveis para revisão.
            </AlertDescription>
          </Alert>
          <Alert
            style={{
              borderColor: "var(--warning)",
              background: "color-mix(in oklab, var(--warning) 8%, transparent)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: "var(--warning)" }}
              aria-hidden="true"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <AlertTitle style={{ color: "var(--warning)" }}>Warning</AlertTitle>
            <AlertDescription>Verifique antes de continuar.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <svg
              width="14"
              height="14"
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
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Ocorreu um erro. Por favor, tente novamente.
            </AlertDescription>
          </Alert>
        </div>
      </Section>

      <Separator />

      {/* ── Checkbox ── */}
      <Section id="checkbox" title="Checkbox">
        <div className="space-y-2.5">
          {[
            { id: "cb1", label: "Default", checked: false, disabled: false },
            { id: "cb2", label: "Checked", checked: true, disabled: false },
            { id: "cb3", label: "Disabled", checked: false, disabled: true },
            {
              id: "cb4",
              label: "Disabled + checked",
              checked: true,
              disabled: true,
            },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <Checkbox
                id={item.id}
                defaultChecked={item.checked}
                disabled={item.disabled}
              />
              <Label
                htmlFor={item.id}
                className={item.disabled ? "text-muted-foreground" : ""}
              >
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Radio ── */}
      <Section id="radio" title="Radio">
        <RadioGroup defaultValue="r2" className="space-y-2.5">
          {[
            { id: "r1", value: "r1", label: "Default" },
            { id: "r2", value: "r2", label: "Selected" },
            { id: "r3", value: "r3", label: "Option C" },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <RadioGroupItem value={item.value} id={item.id} />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <RadioGroupItem value="r4" id="r4" disabled />
            <Label htmlFor="r4" className="text-muted-foreground">
              Disabled
            </Label>
          </div>
        </RadioGroup>
      </Section>

      <Separator />

      {/* ── Switch ── */}
      <Section id="switch" title="Switch / Toggle">
        <div className="space-y-2.5">
          {[
            {
              id: "sw1",
              label: "Default (off)",
              checked: false,
              disabled: false,
            },
            { id: "sw2", label: "On", checked: true, disabled: false },
            { id: "sw3", label: "Disabled", checked: false, disabled: true },
            {
              id: "sw4",
              label: "Disabled + on",
              checked: true,
              disabled: true,
            },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <Switch
                id={item.id}
                defaultChecked={item.checked}
                disabled={item.disabled}
              />
              <Label
                htmlFor={item.id}
                className={item.disabled ? "text-muted-foreground" : ""}
              >
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Select ── */}
      <Section id="select" title="Select / Dropdown">
        <div className="flex flex-wrap gap-4">
          <Select>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
              {["Option 1", "Option 2", "Option 3", "Option 4"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="Option 2">
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Option 1", "Option 2", "Option 3"].map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select disabled>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Disabled" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="x">Option 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Section>

      <Separator />

      {/* ── Avatar ── */}
      <Section id="avatar" title="Avatar">
        <div className="flex flex-wrap items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-primary text-primary-foreground font-600">
              AS
            </AvatarFallback>
          </Avatar>
          <Avatar className="w-12 h-12">
            <AvatarFallback
              style={{ background: "var(--success)", color: "white" }}
            >
              BL
            </AvatarFallback>
          </Avatar>
          <Separator orientation="vertical" className="h-10 mx-1" />
          {[6, 8, 10, 14].map((s) => (
            <Avatar
              key={s}
              style={{ width: `${s * 4}px`, height: `${s * 4}px` }}
            >
              <AvatarFallback
                className="bg-primary text-primary-foreground"
                style={{ fontSize: `${s * 1.5}px` }}
              >
                {s * 4}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Progress ── */}
      <Section id="progress" title="Progress Bar">
        <div className="space-y-3 max-w-md">
          {[0, 25, 50, 75, 100].map((v) => (
            <div key={v} className="flex items-center gap-4">
              <span className="text-xs font-mono text-muted-foreground w-8 text-right">
                {v}%
              </span>
              <Progress value={v} className="flex-1" />
            </div>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
            >
              −10
            </Button>
            <Progress value={progress} className="flex-1" />
            <span className="text-xs font-mono text-muted-foreground w-8">
              {progress}%
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
            >
              +10
            </Button>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Skeleton ── */}
      <Section id="skeleton" title="Skeleton / Loader">
        <div className="flex flex-wrap gap-8">
          <div className="flex items-end gap-3">
            {[8, 10, 12, 16].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Skeleton
                  className="rounded-full"
                  style={{ width: `${s * 4}px`, height: `${s * 4}px` }}
                />
                <p className="text-[10px] font-mono text-muted-foreground">
                  {s * 4}px
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-2 w-44">
            <Skeleton className="h-28 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Tooltip ── */}
      <Section id="tooltip" title="Tooltip">
        <div className="flex flex-wrap items-center gap-4 py-2">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                {side.charAt(0).toUpperCase() + side.slice(1)}
              </TooltipTrigger>
              <TooltipContent side={side}>Tooltip — {side}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Section>

      <Separator />

      {/* ── Tabs ── */}
      <Section id="tabs" title="Tabs">
        <Tabs defaultValue="overview" className="max-w-sm">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-muted-foreground pt-3">
              Conteúdo da aba Overview.
            </p>
          </TabsContent>
          <TabsContent value="billing">
            <p className="text-sm text-muted-foreground pt-3">
              Conteúdo da aba Billing.
            </p>
          </TabsContent>
          <TabsContent value="team">
            <p className="text-sm text-muted-foreground pt-3">
              Conteúdo da aba Team.
            </p>
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      {/* ── Breadcrumb ── */}
      <Section id="breadcrumb" title="Breadcrumbs">
        <div className="space-y-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/styleguide">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/styleguide">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/styleguide">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Página atual</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </Section>

      <Separator />

      {/* ── Pagination ── */}
      <Section id="pagination" title="Pagination">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">8</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Section>

      <Separator />

      {/* ── Dialog ── */}
      <Section id="dialog" title="Dialog / Pop-Up">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger
              render={<Button variant="outline">Simples</Button>}
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar ação</DialogTitle>
                <DialogDescription>
                  Você tem certeza? Esta ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger render={<Button>Destrutivo</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Excluir conta</DialogTitle>
                <DialogDescription>
                  Essa ação é permanente. Todos os dados serão removidos.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancelar</Button>
                <Button variant="destructive">Excluir</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Section>

      <Separator />

      {/* ── Context Menu ── */}
      <Section id="context-menu" title="Context Menu">
        <ContextMenu>
          <ContextMenuTrigger className="flex h-20 w-72 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-muted-foreground cursor-context-menu select-none">
            Clique com botão direito aqui
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Abrir</ContextMenuItem>
            <ContextMenuItem>Renomear</ContextMenuItem>
            <ContextMenuItem>Duplicar</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-destructive focus:text-destructive">
              Excluir
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Section>

      <Separator />

      {/* ── Card ── */}
      <Section id="card" title="Card">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card padrão</CardTitle>
              <CardDescription>Subtítulo descritivo</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Conteúdo com informações secundárias do item.
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle>Card accent</CardTitle>
              <CardDescription>Destaque de borda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge>Active</Badge>
              <p className="text-sm text-muted-foreground">
                Premium · R$ 49/mês
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card com ação</CardTitle>
              <CardDescription>Footer interativo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Revise as configurações.
              </p>
              <div className="flex gap-2">
                <Button size="sm">Confirmar</Button>
                <Button size="sm" variant="outline">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* ── Sidebar tokens ── */}
      <Section id="sidebar" title="Sidebar tokens">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Swatch variable="--sidebar" label="Sidebar" />
          <Swatch variable="--sidebar-foreground" label="Sidebar FG" />
          <Swatch variable="--sidebar-primary" label="Sidebar Primary" />
          <Swatch variable="--sidebar-accent" label="Sidebar Accent" />
        </div>
      </Section>
    </div>
  );
}
