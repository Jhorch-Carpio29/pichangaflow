import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function sinErroresDeAccesibilidad(page: import("@playwright/test").Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(violations.map((falla) => `${falla.id}: ${falla.nodes[0]?.target}`)).toEqual([]);
}

async function sinDesplazamientoHorizontal(page: import("@playwright/test").Page) {
  const sobrante = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(sobrante).toBeLessThanOrEqual(0);
}

test("las páginas no registran errores en la consola", async ({ page }) => {
  const errores: string[] = [];
  page.on("console", (mensaje) => {
    if (mensaje.type() === "error") errores.push(mensaje.text());
  });
  page.on("pageerror", (error) => errores.push(error.message));

  await page.goto("/");
  await page.goto("/vista-previa");
  await expect(page.getByText("Datos de ejemplo")).toBeVisible();

  expect(errores).toEqual([]);
});

test.describe("páginas públicas", () => {
  test("inicio accesible y sin desplazamiento horizontal", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await sinErroresDeAccesibilidad(page);
    await sinDesplazamientoHorizontal(page);
  });

  test("una ruta inexistente muestra la página de error con diseño", async ({ page }) => {
    await page.goto("/no-existe");
    await expect(page.getByRole("heading", { name: "No encontramos esta página" })).toBeVisible();
    await page.getByRole("link", { name: "Volver al inicio" }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("plantilla de panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/vista-previa");
    await expect(page.getByText("Datos de ejemplo")).toBeVisible();
  });

  test("es accesible y no se desborda", async ({ page }) => {
    await sinErroresDeAccesibilidad(page);
    await sinDesplazamientoHorizontal(page);
  });

  test("muestra los componentes sin errores de accesibilidad", async ({ page }) => {
    await page.getByRole("tab", { name: "Componentes" }).click();
    await expect(page.getByRole("heading", { name: "Botones" })).toBeVisible();
    await sinErroresDeAccesibilidad(page);
    await sinDesplazamientoHorizontal(page);
  });

  test("cambia el menú al elegir otro rol", async ({ page, isMobile }) => {
    await page.getByRole("combobox", { name: "Rol de la vista previa" }).click();
    await page.getByRole("option", { name: "Cajero" }).click();
    if (isMobile) await page.getByRole("button", { name: "Abrir menú" }).click();

    const menu = page.getByRole("navigation", { name: "Menú de Cajero" });
    await expect(menu.getByRole("link", { name: "Tienda" })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Productos" })).toHaveCount(0);
  });

  test("en computadora el menú se contrae y lo recuerda", async ({ page, isMobile }) => {
    test.skip(isMobile, "El menú contraíble es solo para computadora");

    await page.getByRole("button", { name: "Contraer menú" }).click();
    await expect(page.getByRole("button", { name: "Expandir menú" })).toBeVisible();
    await page.reload();
    await expect(page.getByRole("button", { name: "Expandir menú" })).toBeVisible();
  });

  test("en celular el menú se cierra al elegir una opción", async ({ page, isMobile }) => {
    test.skip(!isMobile, "El panel deslizable es solo para celular");

    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page.getByRole("link", { name: "Reportes" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByRole("heading", { level: 1, name: "Reportes" })).toBeVisible();
  });
});
