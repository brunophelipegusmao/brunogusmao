"use client";

import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Copy,
  ImagePlus,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { BlogPost, BlogSectionBlock } from "@/app/(public)/blog/posts";
import { RippleButton } from "@/components/magicui/ripple-button";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnoptimizedImage } from "@/components/ui/unoptimized-image";
import {
  getPostTagLibrary,
  type PostTagDefinition,
  type PostWorkflowStatus,
} from "@/lib/content/posts-admin";
import { cn } from "@/lib/utils";

const DEFAULT_COVER_IMAGE = {
  src: "/blog/default-cover.svg",
  alt: "Capa editorial padrao do blog de Bruno Gusmao.",
};

interface NewPostEditorProps {
  nextIndex: string;
}

interface DraftParagraphBlock {
  id: string;
  type: "paragraph";
  content: string;
}

interface DraftImageBlock {
  id: string;
  type: "image";
  src: string;
  alt: string;
  caption: string;
}

type DraftBlock = DraftParagraphBlock | DraftImageBlock;

interface DraftSection {
  id: string;
  heading: string;
  blocks: DraftBlock[];
}

function createId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createParagraphBlock(content = ""): DraftParagraphBlock {
  return {
    id: createId(),
    type: "paragraph",
    content,
  };
}

function createImageBlock(): DraftImageBlock {
  return {
    id: createId(),
    type: "image",
    src: "",
    alt: "",
    caption: "",
  };
}

function createSection(): DraftSection {
  return {
    id: createId(),
    heading: "",
    blocks: [createParagraphBlock()],
  };
}

function formatPublishedAt(date: Date): string {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()] ?? "Jan";
  const year = String(date.getFullYear());

  return `${day} ${month} ${year}`;
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeMediaSource(value: string): string | null {
  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);

    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return trimmed;
    }

    return null;
  } catch {
    return null;
  }
}

function escapeString(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll("'", "\\'");
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function serializeTsLiteral(value: unknown, indentLevel = 0): string {
  const indent = "  ".repeat(indentLevel);
  const nestedIndent = "  ".repeat(indentLevel + 1);

  if (typeof value === "string") {
    return `'${escapeString(value)}'`;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    return (
      `[` +
      `\n${value
        .map(
          (entry) =>
            `${nestedIndent}${serializeTsLiteral(entry, indentLevel + 1)}`,
        )
        .join(",\n")}` +
      `\n${indent}]`
    );
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value).filter(
      ([, entry]) => entry !== undefined,
    );

    if (entries.length === 0) {
      return "{}";
    }

    return `{
${entries
  .map(([key, entry]) => {
    const serializedKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
      ? key
      : `'${escapeString(key)}'`;

    return `${nestedIndent}${serializedKey}: ${serializeTsLiteral(entry, indentLevel + 1)}`;
  })
  .join(",\n")}
${indent}}`;
  }

  return "undefined";
}

function fontStyleClasses(
  style: PostTagDefinition["style"]["fontStyle"],
): string {
  if (style === "bold") {
    return "font-semibold";
  }

  if (style === "italic") {
    return "italic";
  }

  if (style === "bold-italic") {
    return "font-semibold italic";
  }

  return "font-normal";
}

export function NewPostEditor({ nextIndex }: NewPostEditorProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [publishedAt, setPublishedAt] = useState(formatPublishedAt(new Date()));
  const [status, setStatus] = useState<PostWorkflowStatus>("em-andamento");
  const [coverSrc, setCoverSrc] = useState("");
  const [coverAlt, setCoverAlt] = useState("");
  const [tagLibrary, setTagLibrary] = useState<PostTagDefinition[]>(() =>
    getPostTagLibrary(),
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTagLabel, setNewTagLabel] = useState("");
  const [sections, setSections] = useState<DraftSection[]>([createSection()]);
  const [copyFeedback, setCopyFeedback] = useState("");

  const normalizedSlug = useMemo(() => {
    return slugify(slug) || slugify(title) || "novo-post";
  }, [slug, title]);

  const normalizedCoverSrc = useMemo(
    () => normalizeMediaSource(coverSrc),
    [coverSrc],
  );

  const exportableSections = useMemo(() => {
    return sections
      .map((section) => {
        const blocks: BlogSectionBlock[] = [];

        for (const block of section.blocks) {
          if (block.type === "paragraph") {
            const content = block.content.trim();

            if (!content) {
              continue;
            }

            blocks.push({
              type: "paragraph",
              content,
            });

            continue;
          }

          const imageSrc = normalizeMediaSource(block.src);

          if (!imageSrc) {
            continue;
          }

          blocks.push({
            type: "image",
            image: {
              src: imageSrc,
              alt:
                block.alt.trim() ||
                `Imagem do artigo ${title.trim() || "sem titulo"}`,
              caption: block.caption.trim() || undefined,
            },
          });
        }

        const heading = section.heading.trim() || "Nova seção";

        return {
          heading,
          blocks,
        };
      })
      .filter((section) => section.blocks.length > 0);
  }, [sections, title]);

  const previewPost = useMemo<BlogPost>(() => {
    const coverImage = normalizedCoverSrc
      ? {
          src: normalizedCoverSrc,
          alt:
            coverAlt.trim() || `Capa do artigo ${title.trim() || "sem titulo"}`,
        }
      : undefined;

    return {
      slug: normalizedSlug,
      index: nextIndex,
      title: title.trim() || "Título do artigo",
      excerpt:
        excerpt.trim() ||
        "Resumo do artigo para listagem e abertura da página pública.",
      publishedAt: publishedAt.trim() || formatPublishedAt(new Date()),
      category: category.trim() || "Categoria",
      tags: selectedTags,
      coverImage,
      sections:
        exportableSections.length > 0
          ? exportableSections
          : [
              {
                heading: "Primeira seção",
                blocks: [
                  {
                    type: "paragraph",
                    content: "Comece escrevendo o corpo do artigo no editor.",
                  },
                ],
              },
            ],
    };
  }, [
    category,
    coverAlt,
    excerpt,
    exportableSections,
    nextIndex,
    normalizedCoverSrc,
    normalizedSlug,
    publishedAt,
    selectedTags,
    title,
  ]);

  const selectedTagDefinitions = useMemo(() => {
    return selectedTags
      .map((tag) => tagLibrary.find((entry) => entry.label === tag))
      .filter((tag): tag is PostTagDefinition => Boolean(tag));
  }, [selectedTags, tagLibrary]);

  const postSnippet = useMemo(() => {
    const snippetData: Record<string, unknown> = {
      slug: normalizedSlug,
      index: nextIndex,
      title: previewPost.title,
      excerpt: previewPost.excerpt,
      publishedAt: previewPost.publishedAt,
      category: previewPost.category,
      tags: previewPost.tags,
      sections: exportableSections,
    };

    if (previewPost.coverImage) {
      snippetData.coverImage = previewPost.coverImage;
    }

    return serializeTsLiteral(snippetData);
  }, [exportableSections, nextIndex, normalizedSlug, previewPost]);

  const statusSnippet = useMemo(() => {
    return `${serializeTsLiteral(normalizedSlug)}: ${serializeTsLiteral(status)},`;
  }, [normalizedSlug, status]);

  function updateSection(
    sectionId: string,
    updater: (section: DraftSection) => DraftSection,
  ): void {
    setSections((currentSections) =>
      currentSections.map((section) =>
        section.id === sectionId ? updater(section) : section,
      ),
    );
  }

  function moveSection(sectionId: string, direction: "up" | "down"): void {
    setSections((currentSections) => {
      const index = currentSections.findIndex(
        (section) => section.id === sectionId,
      );

      if (index === -1) {
        return currentSections;
      }

      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= currentSections.length) {
        return currentSections;
      }

      const nextSections = [...currentSections];
      const currentSection = nextSections[index];

      if (!currentSection) {
        return currentSections;
      }

      nextSections[index] = nextSections[targetIndex] as DraftSection;
      nextSections[targetIndex] = currentSection;

      return nextSections;
    });
  }

  function removeSection(sectionId: string): void {
    setSections((currentSections) => {
      if (currentSections.length === 1) {
        return currentSections;
      }

      return currentSections.filter((section) => section.id !== sectionId);
    });
  }

  function addBlock(sectionId: string, type: DraftBlock["type"]): void {
    updateSection(sectionId, (section) => ({
      ...section,
      blocks: [
        ...section.blocks,
        type === "paragraph" ? createParagraphBlock() : createImageBlock(),
      ],
    }));
  }

  function moveBlock(
    sectionId: string,
    blockId: string,
    direction: "up" | "down",
  ): void {
    updateSection(sectionId, (section) => {
      const index = section.blocks.findIndex((block) => block.id === blockId);

      if (index === -1) {
        return section;
      }

      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= section.blocks.length) {
        return section;
      }

      const nextBlocks = [...section.blocks];
      const currentBlock = nextBlocks[index];

      if (!currentBlock) {
        return section;
      }

      nextBlocks[index] = nextBlocks[targetIndex] as DraftBlock;
      nextBlocks[targetIndex] = currentBlock;

      return {
        ...section,
        blocks: nextBlocks,
      };
    });
  }

  function removeBlock(sectionId: string, blockId: string): void {
    updateSection(sectionId, (section) => {
      if (section.blocks.length === 1) {
        return section;
      }

      return {
        ...section,
        blocks: section.blocks.filter((block) => block.id !== blockId),
      };
    });
  }

  function copySnippet(label: string, value: string): void {
    void navigator.clipboard.writeText(value).then(() => {
      setCopyFeedback(`${label} copiado.`);

      window.setTimeout(() => {
        setCopyFeedback("");
      }, 1800);
    });
  }

  function toggleTag(label: string): void {
    setSelectedTags((currentTags) => {
      if (currentTags.includes(label)) {
        return currentTags.filter((tag) => tag !== label);
      }

      return [...currentTags, label].sort((left, right) =>
        left.localeCompare(right, "pt-BR"),
      );
    });
  }

  function addCustomTag(): void {
    const label = newTagLabel.trim();

    if (!label) {
      return;
    }

    const existingTag = tagLibrary.find(
      (tag) => tag.label.toLowerCase() === label.toLowerCase(),
    );

    if (existingTag) {
      toggleTag(existingTag.label);
      setNewTagLabel("");
      return;
    }

    const createdTag: PostTagDefinition = {
      id: slugify(label) || createId(),
      label,
      style: {
        textColor: "#f2f6ff",
        backgroundColor: "#325dc8",
        fontStyle: "bold",
      },
    };

    setTagLibrary((currentTags) => [...currentTags, createdTag]);
    setSelectedTags((currentTags) =>
      [...currentTags, createdTag.label].sort((left, right) =>
        left.localeCompare(right, "pt-BR"),
      ),
    );
    setNewTagLabel("");
  }

  return (
    <main className="min-h-screen bg-bg px-6 py-14 sm:px-8 md:px-16">
      <section className="mx-auto grid w-full max-w-7xl gap-6">
        <header className="grid gap-2 border border-border p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="grid gap-2">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-blue-base">
                Novo artigo
              </p>
              <h1 className="font-goldman text-4xl leading-[0.96] text-text-primary">
                Construir post do blog
              </h1>
              <p className="max-w-4xl text-sm text-text-secondary">
                Editor estruturado para criar o conteúdo do blog sem HTML livre,
                com suporte a tags, capa fallback e imagens no meio do texto.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <RippleButton
                href="/dashboard"
                aria-label="Voltar para dashboard"
                className="flex size-10 items-center justify-center p-0"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </RippleButton>

              <RippleButton href="/blog" className="px-3 py-2">
                Ver blog público
              </RippleButton>
            </div>
          </div>
        </header>

        <section className="grid gap-3 border border-border bg-bg-subtle p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              className="mt-0.5 size-4 text-blue-base"
              aria-hidden="true"
            />
            <div className="grid gap-1 text-sm text-text-secondary">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                Segurança do editor
              </p>
              <p>
                O editor trabalha com texto puro e blocos estruturados. HTML
                arbitrário não é interpretado, e URLs de imagem inválidas são
                ignoradas no preview e no snippet exportado.
              </p>
            </div>
          </div>
        </section>

        <Tabs defaultValue="editor" className="grid gap-4">
          <TabsList
            variant="line"
            className="w-full justify-start rounded-none border-b border-border bg-transparent p-0"
          >
            <TabsTrigger value="editor" className="px-4 py-3">
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="px-4 py-3">
              Prévia
            </TabsTrigger>
            <TabsTrigger value="snippets" className="px-4 py-3">
              Snippets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="grid gap-6">
            <section className="grid gap-4 border border-border p-5 xl:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                  Título
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => {
                    const nextTitle = event.target.value;

                    setTitle(nextTitle);

                    if (!slugManuallyEdited) {
                      setSlug(slugify(nextTitle));
                    }
                  }}
                  placeholder="Ex: Como desenhar interfaces técnicas sem ruído"
                  className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                />
              </label>

              <label className="grid gap-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                  Slug
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(event) => {
                    setSlugManuallyEdited(true);
                    setSlug(event.target.value);
                  }}
                  placeholder="slug-do-artigo"
                  className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                />
                <span className="text-xs text-text-muted">
                  URL final: /blog/{normalizedSlug}
                </span>
              </label>

              <label className="grid gap-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                  Categoria
                </span>
                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Ex: Frontend"
                  className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                />
              </label>

              <label className="grid gap-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                  Publicação
                </span>
                <input
                  type="text"
                  value={publishedAt}
                  onChange={(event) => setPublishedAt(event.target.value)}
                  placeholder="16 Abr 2026"
                  className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                />
              </label>

              <label className="grid gap-2 xl:col-span-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                  Resumo / excerpt
                </span>
                <textarea
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  rows={3}
                  placeholder="Resumo usado no card do blog e na abertura do artigo."
                  className="min-h-28 border border-border bg-bg px-3 py-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                />
              </label>

              <label className="grid gap-2 xl:col-span-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                  Status no dashboard
                </span>
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as PostWorkflowStatus)
                  }
                  className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                >
                  <option value="em-andamento">Em andamento</option>
                  <option value="revisao">Revisão</option>
                  <option value="publicado">Publicado</option>
                </select>
              </label>
            </section>

            <section className="grid gap-4 border border-border p-5 xl:grid-cols-[1.3fr_0.9fr]">
              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                    Imagem de capa
                  </span>
                  <input
                    type="text"
                    value={coverSrc}
                    onChange={(event) => setCoverSrc(event.target.value)}
                    placeholder="https://... ou /blog/minha-capa.jpg"
                    className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                  />
                  <span className="text-xs text-text-muted">
                    Se este campo ficar vazio, o blog público usa a capa padrão.
                  </span>
                  {coverSrc.trim() && !normalizedCoverSrc ? (
                    <span className="text-xs text-destructive">
                      Use uma URL http/https válida ou um caminho interno
                      iniciado em /.
                    </span>
                  ) : null}
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                    Alt da capa
                  </span>
                  <input
                    type="text"
                    value={coverAlt}
                    onChange={(event) => setCoverAlt(event.target.value)}
                    placeholder="Descrição da imagem de capa"
                    className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                  />
                </label>
              </div>

              <div className="grid gap-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                  Prévia da capa
                </span>
                <div className="aspect-video overflow-hidden border border-border bg-bg">
                  <UnoptimizedImage
                    src={normalizedCoverSrc ?? DEFAULT_COVER_IMAGE.src}
                    alt={coverAlt.trim() || DEFAULT_COVER_IMAGE.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>

            <section className="grid gap-4 border border-border p-5">
              <header className="grid gap-1">
                <h2 className="font-goldman text-2xl text-text-primary">
                  Tags do artigo
                </h2>
                <p className="text-sm text-text-secondary">
                  Selecione tags da biblioteca existente ou crie novas tags de
                  assunto.
                </p>
              </header>

              <div className="flex flex-wrap gap-2">
                {selectedTagDefinitions.length > 0 ? (
                  selectedTagDefinitions.map((tag) => (
                    <span
                      key={tag.id}
                      className={cn(
                        "border px-2 py-1 text-xs uppercase tracking-[0.12em]",
                        fontStyleClasses(tag.style.fontStyle),
                      )}
                      style={{
                        color: tag.style.textColor,
                        backgroundColor: tag.style.backgroundColor,
                      }}
                    >
                      {tag.label}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-text-muted">
                    Nenhuma tag selecionada ainda.
                  </p>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {tagLibrary
                  .slice()
                  .sort((left, right) =>
                    left.label.localeCompare(right.label, "pt-BR"),
                  )
                  .map((tag) => {
                    const checked = selectedTags.includes(tag.label);

                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.label)}
                        className={cn(
                          "flex items-center justify-between gap-2 border px-3 py-3 text-left text-sm transition-colors",
                          checked
                            ? "border-blue-base bg-blue-base/10 text-text-primary"
                            : "border-border bg-bg-subtle text-text-secondary",
                        )}
                      >
                        <span>{tag.label}</span>
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em]">
                          {checked ? "ativa" : "usar"}
                        </span>
                      </button>
                    );
                  })}
              </div>

              <div className="flex flex-col gap-3 border border-dashed border-border p-4 md:flex-row md:items-end">
                <label className="grid flex-1 gap-2">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                    Nova tag
                  </span>
                  <input
                    type="text"
                    value={newTagLabel}
                    onChange={(event) => setNewTagLabel(event.target.value)}
                    placeholder="Ex: Segurança"
                    className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                  />
                </label>

                <RippleButton onClick={addCustomTag} className="px-3 py-2">
                  Criar tag
                </RippleButton>
              </div>
            </section>

            <section className="grid gap-4 border border-border p-5">
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div className="grid gap-1">
                  <h2 className="font-goldman text-2xl text-text-primary">
                    Corpo do artigo
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Monte o artigo por seções e blocos. Imagens podem entrar
                    entre os textos.
                  </p>
                </div>

                <RippleButton
                  onClick={() =>
                    setSections((currentSections) => [
                      ...currentSections,
                      createSection(),
                    ])
                  }
                  className="px-3 py-2"
                >
                  Adicionar seção
                </RippleButton>
              </header>

              <div className="grid gap-5">
                {sections.map((section, sectionIndex) => (
                  <article
                    key={section.id}
                    className="grid gap-4 border border-border bg-bg-subtle p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                      <div>
                        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                          Seção {String(sectionIndex + 1).padStart(2, "0")}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => moveSection(section.id, "up")}
                          disabled={sectionIndex === 0}
                        >
                          <ChevronUp />
                          Subir
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => moveSection(section.id, "down")}
                          disabled={sectionIndex === sections.length - 1}
                        >
                          <ChevronDown />
                          Descer
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSection(section.id)}
                          disabled={sections.length === 1}
                        >
                          <Trash2 />
                          Remover
                        </Button>
                      </div>
                    </div>

                    <label className="grid gap-2">
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                        Título da seção
                      </span>
                      <input
                        type="text"
                        value={section.heading}
                        onChange={(event) =>
                          updateSection(section.id, (currentSection) => ({
                            ...currentSection,
                            heading: event.target.value,
                          }))
                        }
                        placeholder="Ex: Contexto do problema"
                        className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                      />
                    </label>

                    <div className="grid gap-4">
                      {section.blocks.map((block, blockIndex) => (
                        <div
                          key={block.id}
                          className="grid gap-3 border border-border bg-bg p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                              {block.type === "paragraph"
                                ? "Bloco de texto"
                                : "Bloco de imagem"}{" "}
                              {String(blockIndex + 1).padStart(2, "0")}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  moveBlock(section.id, block.id, "up")
                                }
                                disabled={blockIndex === 0}
                              >
                                <ChevronUp />
                                Subir
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  moveBlock(section.id, block.id, "down")
                                }
                                disabled={
                                  blockIndex === section.blocks.length - 1
                                }
                              >
                                <ChevronDown />
                                Descer
                              </Button>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  removeBlock(section.id, block.id)
                                }
                                disabled={section.blocks.length === 1}
                              >
                                <Trash2 />
                                Remover
                              </Button>
                            </div>
                          </div>

                          {block.type === "paragraph" ? (
                            <label className="grid gap-2">
                              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                                Texto
                              </span>
                              <textarea
                                value={block.content}
                                onChange={(event) =>
                                  updateSection(
                                    section.id,
                                    (currentSection) => ({
                                      ...currentSection,
                                      blocks: currentSection.blocks.map(
                                        (entry) =>
                                          entry.id === block.id &&
                                          entry.type === "paragraph"
                                            ? {
                                                ...entry,
                                                content: event.target.value,
                                              }
                                            : entry,
                                      ),
                                    }),
                                  )
                                }
                                rows={6}
                                placeholder="Escreva o parágrafo aqui."
                                className="min-h-36 border border-border bg-bg px-3 py-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                              />
                            </label>
                          ) : (
                            <div className="grid gap-3 xl:grid-cols-2">
                              <label className="grid gap-2 xl:col-span-2">
                                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                                  URL da imagem
                                </span>
                                <input
                                  type="text"
                                  value={block.src}
                                  onChange={(event) =>
                                    updateSection(
                                      section.id,
                                      (currentSection) => ({
                                        ...currentSection,
                                        blocks: currentSection.blocks.map(
                                          (entry) =>
                                            entry.id === block.id &&
                                            entry.type === "image"
                                              ? {
                                                  ...entry,
                                                  src: event.target.value,
                                                }
                                              : entry,
                                        ),
                                      }),
                                    )
                                  }
                                  placeholder="https://... ou /blog/imagem.jpg"
                                  className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                                />
                                {block.src.trim() &&
                                !normalizeMediaSource(block.src) ? (
                                  <span className="text-xs text-destructive">
                                    Informe uma URL http/https válida ou um
                                    caminho iniciado em /.
                                  </span>
                                ) : null}
                              </label>

                              <label className="grid gap-2">
                                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                                  Alt
                                </span>
                                <input
                                  type="text"
                                  value={block.alt}
                                  onChange={(event) =>
                                    updateSection(
                                      section.id,
                                      (currentSection) => ({
                                        ...currentSection,
                                        blocks: currentSection.blocks.map(
                                          (entry) =>
                                            entry.id === block.id &&
                                            entry.type === "image"
                                              ? {
                                                  ...entry,
                                                  alt: event.target.value,
                                                }
                                              : entry,
                                        ),
                                      }),
                                    )
                                  }
                                  placeholder="Descrição acessível da imagem"
                                  className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                                />
                              </label>

                              <label className="grid gap-2">
                                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                                  Legenda
                                </span>
                                <input
                                  type="text"
                                  value={block.caption}
                                  onChange={(event) =>
                                    updateSection(
                                      section.id,
                                      (currentSection) => ({
                                        ...currentSection,
                                        blocks: currentSection.blocks.map(
                                          (entry) =>
                                            entry.id === block.id &&
                                            entry.type === "image"
                                              ? {
                                                  ...entry,
                                                  caption: event.target.value,
                                                }
                                              : entry,
                                        ),
                                      }),
                                    )
                                  }
                                  placeholder="Legenda opcional"
                                  className="h-11 border border-border bg-bg px-3 text-sm text-text-primary outline-none transition-colors focus:border-blue-base"
                                />
                              </label>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addBlock(section.id, "paragraph")}
                      >
                        <Plus />
                        Adicionar texto
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addBlock(section.id, "image")}
                      >
                        <ImagePlus />
                        Adicionar imagem
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="preview" className="grid gap-6">
            <section className="grid gap-4 border border-border p-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-blue-base">
                Prévia do artigo
              </p>

              <article className="grid gap-8 border border-border bg-bg-subtle p-6">
                <div className="grid gap-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-blue-base">
                    {previewPost.category} / Blog
                  </p>
                  <h2 className="font-goldman text-4xl leading-[0.95] text-text-primary">
                    {previewPost.title}
                  </h2>
                  <p className="max-w-3xl text-base text-text-secondary">
                    {previewPost.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-text-muted">
                    <span>{previewPost.publishedAt}</span>
                    <span>Índice {previewPost.index}</span>
                  </div>
                </div>

                <div className="aspect-video overflow-hidden border border-border bg-bg">
                  <UnoptimizedImage
                    src={previewPost.coverImage?.src ?? DEFAULT_COVER_IMAGE.src}
                    alt={previewPost.coverImage?.alt ?? DEFAULT_COVER_IMAGE.alt}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {previewPost.tags.length > 0 ? (
                    previewPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-text-muted">
                      As tags aparecerão aqui assim que forem selecionadas.
                    </p>
                  )}
                </div>

                <div className="grid gap-8">
                  {previewPost.sections.map((section) => (
                    <section key={section.heading} className="grid gap-5">
                      <h3 className="font-goldman text-2xl text-text-primary">
                        {section.heading}
                      </h3>

                      {section.blocks?.map((block, blockIndex) => {
                        if (block.type === "paragraph") {
                          return (
                            <p
                              key={`${section.heading}-${blockIndex}-${block.content.slice(0, 24)}`}
                              className="max-w-3xl text-base leading-8 text-text-secondary"
                            >
                              {block.content}
                            </p>
                          );
                        }

                        return (
                          <figure
                            key={`${section.heading}-${blockIndex}-${block.image.src}`}
                            className="grid gap-3"
                          >
                            <div className="overflow-hidden border border-border bg-bg">
                              <UnoptimizedImage
                                src={block.image.src}
                                alt={block.image.alt}
                                className="h-full max-h-136 w-full object-cover"
                              />
                            </div>
                            {block.image.caption ? (
                              <figcaption className="text-sm text-text-muted">
                                {block.image.caption}
                              </figcaption>
                            ) : null}
                          </figure>
                        );
                      })}
                    </section>
                  ))}
                </div>
              </article>
            </section>
          </TabsContent>

          <TabsContent value="snippets" className="grid gap-6">
            <section className="grid gap-4 border border-border p-5">
              <header className="grid gap-1">
                <h2 className="font-goldman text-2xl text-text-primary">
                  Snippet do post
                </h2>
                <p className="text-sm text-text-secondary">
                  Cole este objeto em src/app/(public)/blog/posts.ts dentro do
                  array blogPosts.
                </p>
              </header>

              <textarea
                readOnly
                value={postSnippet}
                rows={20}
                className="min-h-80 border border-border bg-bg px-3 py-3 font-mono text-sm text-text-primary outline-none"
              />

              <div className="flex flex-wrap items-center gap-3">
                <RippleButton
                  onClick={() => copySnippet("Snippet do post", postSnippet)}
                  className="px-3 py-2"
                >
                  <Copy /> Copiar snippet
                </RippleButton>
                {copyFeedback ? (
                  <span className="text-sm text-blue-base">{copyFeedback}</span>
                ) : null}
              </div>
            </section>

            <section className="grid gap-4 border border-border p-5">
              <header className="grid gap-1">
                <h2 className="font-goldman text-2xl text-text-primary">
                  Snippet de status
                </h2>
                <p className="text-sm text-text-secondary">
                  Cole esta linha em src/lib/content/posts-admin.ts dentro de
                  postStatusBySlug.
                </p>
              </header>

              <textarea
                readOnly
                value={statusSnippet}
                rows={3}
                className="min-h-24 border border-border bg-bg px-3 py-3 font-mono text-sm text-text-primary outline-none"
              />

              <RippleButton
                onClick={() => copySnippet("Snippet de status", statusSnippet)}
                className="w-fit px-3 py-2"
              >
                <Copy /> Copiar status
              </RippleButton>
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
