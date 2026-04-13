"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

/* ─── Pagination hook ─── */
function usePagination(total: number, perPage: number, initial = 1) {
  const [page, setPage] = useState(initial);
  const totalPages = Math.ceil(total / perPage);
  return { page, setPage, totalPages };
}

/* ─── Geração de janela de páginas ─── */
function getPages(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "ellipsis", total];
  if (current >= total - 3)
    return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

/* ─── Dados de exemplo ─── */
const ARTICLES = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  title: `Artigo ${i + 1}: ${["Introdução ao Next.js", "Tailwind CSS v4", "React 19 Features", "TypeScript Tips", "shadcn Components", "Performance Web", "Acessibilidade"][i % 7]}`,
  author: ["Ana Silva", "Bruno Costa", "Carla Matos"][i % 3],
  date: `${(i % 28) + 1} abr 2026`,
  category: ["Frontend", "Design", "Performance"][i % 3],
}));

export default function PaginationShowcase() {
  const [darkMode, setDarkMode] = useState(false);
  const {
    page: basicPage,
    setPage: setBasicPage,
    totalPages: basicTotal,
  } = usePagination(100, 10, 3);
  const {
    page: articlePage,
    setPage: setArticlePage,
    totalPages: articleTotal,
  } = usePagination(ARTICLES.length, 5, 1);

  const currentArticles = ARTICLES.slice(
    (articlePage - 1) * 5,
    articlePage * 5,
  );
  const articlePages = getPages(articlePage, articleTotal);

  const toggleDark = () => {
    setDarkMode((p) => {
      document.documentElement.classList.toggle("dark", !p);
      return !p;
    });
  };

  return (
    <div className="p-8 max-w-3xl space-y-12">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-800 text-foreground">Pagination</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Controle de navegação entre páginas. Composto por PaginationLink,
            Previous, Next e Ellipsis.
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"`}
        />
      </Section>

      {/* ── Básico ── */}
      <Section
        title="Básico"
        description="Estrutura fundamental com Previous, links e Next."
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="Anterior" />
            </PaginationItem>
            {[1, 2, 3, 4, 5].map((n) => (
              <PaginationItem key={n}>
                <PaginationLink href="#" isActive={n === 2}>
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" text="Próxima" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <CodeBlock
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="/page/1" text="Anterior" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/1">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="/page/2" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="/page/3" text="Próxima" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        />
      </Section>

      <Separator />

      {/* ── Com elipse ── */}
      <Section
        title="Com elipse"
        description="Para listas longas, use PaginationEllipsis para reticências."
      >
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="Anterior" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">6</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" text="Próxima" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Section>

      <Separator />

      {/* ── Controlado ── */}
      <Section
        title="Controlado com estado React"
        description="Substituindo href por onClick para SPAs."
      >
        <div className="space-y-3">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  text="Anterior"
                  onClick={(e) => {
                    e.preventDefault();
                    setBasicPage((p) => Math.max(1, p - 1));
                  }}
                  aria-disabled={basicPage === 1}
                  className={
                    basicPage === 1 ? "pointer-events-none opacity-40" : ""
                  }
                />
              </PaginationItem>
              {getPages(basicPage, basicTotal).map((p, i) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`e${i.toString()}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === basicPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setBasicPage(p);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  text="Próxima"
                  onClick={(e) => {
                    e.preventDefault();
                    setBasicPage((p) => Math.min(basicTotal, p + 1));
                  }}
                  aria-disabled={basicPage === basicTotal}
                  className={
                    basicPage === basicTotal
                      ? "pointer-events-none opacity-40"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <p className="text-xs text-center text-muted-foreground">
            Página {basicPage} de {basicTotal} (100 itens)
          </p>
        </div>
        <CodeBlock
          code={`const [page, setPage] = useState(1)
const totalPages = Math.ceil(total / perPage)

<PaginationPrevious
  href="#"
  onClick={(e) => { e.preventDefault(); setPage(p => Math.max(1, p - 1)) }}
  aria-disabled={page === 1}
  className={page === 1 ? "pointer-events-none opacity-40" : ""}
/>

{pages.map(p =>
  p === "ellipsis"
    ? <PaginationEllipsis key={…} />
    : <PaginationLink
        href="#"
        isActive={p === page}
        onClick={(e) => { e.preventDefault(); setPage(p) }}
      >
        {p}
      </PaginationLink>
)}`}
        />
      </Section>

      <Separator />

      {/* ── Em contexto ── */}
      <Section
        title="Em contexto — lista de artigos"
        description="Paginação integrada com conteúdo real."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {currentArticles.map((article) => (
              <div
                key={article.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-700 shrink-0">
                  #{article.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-500 text-foreground truncate">
                    {article.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {article.author} · {article.date}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md shrink-0">
                  {article.category}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground shrink-0">
              {(articlePage - 1) * 5 + 1}–
              {Math.min(articlePage * 5, ARTICLES.length)} de {ARTICLES.length}{" "}
              artigos
            </p>
            <Pagination className="mx-0 w-auto flex-1">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setArticlePage((p) => Math.max(1, p - 1));
                    }}
                    aria-disabled={articlePage === 1}
                    className={
                      articlePage === 1 ? "pointer-events-none opacity-40" : ""
                    }
                  />
                </PaginationItem>
                {articlePages.map((p, i) =>
                  p === "ellipsis" ? (
                    <PaginationItem key={`ae${i.toString()}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === articlePage}
                        onClick={(e) => {
                          e.preventDefault();
                          setArticlePage(p);
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setArticlePage((p) => Math.min(articleTotal, p + 1));
                    }}
                    aria-disabled={articlePage === articleTotal}
                    className={
                      articlePage === articleTotal
                        ? "pointer-events-none opacity-40"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </Section>

      <Separator />

      {/* ── Simples prev/next ── */}
      <Section
        title="Compacto — só Previous e Next"
        description="Para interfaces com pouco espaço."
      >
        <div className="flex items-center justify-between max-w-xs mx-auto">
          <Button variant="outline" size="sm" className="gap-1.5">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">Página 3 de 10</span>
          <Button variant="outline" size="sm" className="gap-1.5">
            Próxima
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Button>
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
                  Pagination usa{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    {'<nav aria-label="pagination">'}
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
                  PaginationLink ativa tem{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-current="page"
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
                  PaginationPrevious e PaginationNext têm{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-label
                  </code>{" "}
                  descritivos nativos.
                </>
              ),
            },
            {
              icon: "!",
              color: "text-warning",
              text: (
                <>
                  Botões desabilitados (primeira/última página) devem ter{" "}
                  <code className="text-xs font-mono bg-muted px-1 rounded">
                    aria-disabled="true"
                  </code>{" "}
                  explícito além do className de opacidade.
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
