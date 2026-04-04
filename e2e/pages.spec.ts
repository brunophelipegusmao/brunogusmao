import { expect, test, type Page } from "@playwright/test";

const lightThemeInit = () => {
  localStorage.setItem("theme", "light");
};

async function openPage(page: Page, path: string) {
  await page.addInitScript(lightThemeInit);
  await page.goto(path);
}

async function expectLightTheme(page: Page) {
  const isDark = await page.evaluate(() =>
    document.documentElement.classList.contains("dark"),
  );

  expect(isDark).toBe(false);
}

async function expectBlogPostCounter(page: Page, total = "15") {
  const counter = page.locator('[aria-label="Total de posts publicados"]');

  await expect(counter).toBeVisible();
  await expect(counter.locator("strong")).toHaveText(total);
  await expect(counter.locator("span")).toHaveText("posts publicados");
}

test("home page keeps the hero wide and readable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await openPage(page, "/");
  await expectLightTheme(page);

  await expect(
    page.getByRole("heading", { level: 1, name: "Bruno Gusmão" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: /Abrir o perfil de Bruno Gusmão no LinkedIn/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Currículo" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Principal" })).toBeVisible();

  const heroBox = await page.locator('[aria-labelledby="hero-title"]').boundingBox();
  expect(heroBox).not.toBeNull();
  expect(heroBox?.width ?? 0).toBeGreaterThan(900);
});

test("about page uses the editorial split on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await openPage(page, "/about");
  await expectLightTheme(page);

  await expect(
    page.getByRole("heading", { level: 1, name: "Bruno Gusmão" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "O que eu entrego" }),
  ).toBeVisible();

  const introBox = await page.locator('[aria-labelledby="about-title"]').boundingBox();
  expect(introBox).not.toBeNull();
  expect(introBox?.width ?? 0).toBeGreaterThan(1000);
});

for (const route of [
  {
    path: "/contact",
    title: "Contatos",
    description: "Canal reservado para convites, projetos e conversas profissionais.",
  },
] as const) {
  test(`${route.path} renders its page copy`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1200 });
    await openPage(page, route.path);
    await expectLightTheme(page);

    await expect(page.getByRole("heading", { level: 1, name: route.title })).toBeVisible();
    await expect(page.getByText(route.description)).toBeVisible();
  });
}

test("blog page renders the editorial index", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await openPage(page, "/blog");
  await expectLightTheme(page);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Notas editoriais sobre interface, dados e comunicação",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Notas recentes" })).toBeVisible();
  await expect(page.getByRole("search")).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(6);
  await expectBlogPostCounter(page);
  await expect(page.getByText("Mostrando 1–6 de 15 posts")).toHaveCount(0);
  await expect(page.getByRole("group", { name: "Posts por página" })).toHaveCount(0);
  const pagination = page.getByRole("navigation", { name: "Paginação dos posts" });
  await expect(pagination).toBeVisible();
  await expect(pagination.getByText("Anterior")).toBeVisible();
  await expect(pagination.getByText("Próxima")).toBeVisible();
  await expect(pagination.locator('[aria-current="page"]')).toHaveText("1");
  await expect(pagination.getByRole("button", { name: "2" })).toBeVisible();
  await expect(pagination.getByRole("button", { name: "3" })).toBeVisible();

  const titles = await page.locator("article h3").allTextContents();
  expect(titles).toEqual([
    "Camadas que não disputam atenção",
    "A ordem da página também é argumento",
    "Quando o fluxo se explica sozinho",
    "O resumo certo encurta a decisão",
    "Contraste suficiente faz o sinal aparecer",
    "Quando a lista passa a organizar o conteúdo",
  ]);
  await expect(
    page.getByRole("link", {
      name: "Camadas que não disputam atenção",
    }),
  ).toHaveAttribute("href", "/blog/camadas-que-nao-disputam-atencao");
  await expect(
    page.getByRole("img", {
      name: "Capa editorial de Camadas que não disputam atenção",
    }),
  ).toBeVisible();

  const lastArticleBox = await page.locator("article").last().boundingBox();
  expect(lastArticleBox).not.toBeNull();

  await pagination.getByRole("button", { name: "2" }).click();
  await expect(page).toHaveURL(/\/blog\?page=2$/);
  await expect(page.getByRole("article")).toHaveCount(6);
  await expectBlogPostCounter(page);

  const pageTwoTitles = await page.locator("article h3").allTextContents();
  expect(pageTwoTitles).toEqual([
    "Uma borda certa define o foco",
    "Hierarquia também precisa de ritmo",
    "Métricas no lugar certo da interface",
    "Cards que explicam o próximo passo",
    "Microcópias que guiam sem chamar atenção",
    "Antes de publicar, corte o excesso",
  ]);

  const paginationOnPageTwo = page.getByRole("navigation", { name: "Paginação dos posts" });
  await paginationOnPageTwo.getByRole("button", { name: "3" }).click();
  await expect(page).toHaveURL(/\/blog\?page=3$/);
  await expect(page.getByRole("article")).toHaveCount(3);
  await expectBlogPostCounter(page);

  const pageThreeTitles = await page.locator("article h3").allTextContents();
  expect(pageThreeTitles).toEqual([
    "Escrever menos para dizer mais",
    "Dados existem para orientar, não para decorar",
    "Quando o layout deixa de competir com a leitura",
  ]);

  const introBox = await page.locator('[aria-labelledby="blog-title"]').boundingBox();
  expect(introBox).not.toBeNull();
  expect(introBox?.width ?? 0).toBeGreaterThan(900);
});

test("blog post pages render individual entries", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await openPage(page, "/blog/quando-o-layout-deixa-de-competir-com-a-leitura");
  await expectLightTheme(page);

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Quando o layout deixa de competir com a leitura",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Voltar ao blog/i })).toBeVisible();
  await expect(page.getByRole("img", { name: "Capa conceitual do artigo" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "O que fica" })).toBeVisible();
  await expect(page.getByText("#Interface").first()).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Navegação entre posts" })).toBeVisible();
});

test("blog page filters entries by query", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await openPage(page, "/blog?q=dados");
  await expectLightTheme(page);

  await expect(page.getByRole("search")).toBeVisible();
  await expectBlogPostCounter(page);
  await expect(page.getByRole("link", { name: /Limpar/i })).toHaveAttribute(
    "href",
    "/blog",
  );
  await expect(page.getByRole("article")).toHaveCount(1);
  await expect(
    page.getByRole("link", {
      name: "Dados existem para orientar, não para decorar",
    }),
  ).toBeVisible();
  await expect(page.getByRole("group", { name: "Posts por página" })).toHaveCount(0);
  const pagination = page.getByRole("navigation", { name: "Paginação dos posts" });
  await expect(pagination).toBeVisible();
  await expect(pagination.locator('[aria-current="page"]')).toHaveText("1");
});

test("blog page keeps the default list when no results are found", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await openPage(page, "/blog?q=zzzz");
  await expectLightTheme(page);

  await expect(page.getByRole("heading", { level: 1, name: "Notas editoriais sobre interface, dados e comunicação" })).toBeVisible();
  await expect(page.getByRole("search")).toBeVisible();
  await expectBlogPostCounter(page);
  await expect(page.getByText("Nada corresponde à busca atual")).toBeVisible();
  await expect(page.getByRole("link", { name: /Limpar busca/i })).toHaveAttribute(
    "href",
    "/blog",
  );
  await expect(page.getByRole("article")).toHaveCount(0);
  await expect(page.getByRole("group", { name: "Posts por página" })).toHaveCount(0);
});

test("home page does not overflow horizontally on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openPage(page, "/");
  await expectLightTheme(page);

  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);
});
