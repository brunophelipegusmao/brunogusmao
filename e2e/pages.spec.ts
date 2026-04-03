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
    path: "/blog",
    title: "Blog",
    description: "Espaço reservado para textos, notas e análises sobre estratégia, dados e comunicação.",
  },
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
