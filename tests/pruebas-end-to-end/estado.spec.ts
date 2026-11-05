import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const fecha = "2026-11-05T15:00:00.000Z";

function responderSalud(page: Page, status: number, cuerpo: object) {
  return page.route("**/api/salud", (ruta) => ruta.fulfill({ status, json: cuerpo }));
}

const filaDe = (page: Page, nombre: string) => page.getByRole("listitem").filter({ hasText: nombre });

test("con todo disponible, los tres servicios están operativos", async ({ page }) => {
  await responderSalud(page, 200, { estado: "sano", dependencias: { baseDeDatos: "disponible" }, fecha });
  await page.goto("/estado");

  await expect(page.getByText("Operativo")).toHaveCount(3);

  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(violations).toEqual([]);
});

test("con la base caída, el back sigue operativo y la base no", async ({ page }) => {
  await responderSalud(page, 503, { estado: "degradado", dependencias: { baseDeDatos: "no_disponible" }, fecha });
  await page.goto("/estado");

  await expect(filaDe(page, "Back").getByText("Operativo")).toBeVisible();
  await expect(filaDe(page, "Base de datos").getByText("Sin respuesta")).toBeVisible();
  await expect(page.getByText("La base de datos no responde")).toBeVisible();
});

test("con el back apagado, muestra un aviso claro y permite reintentar", async ({ page }) => {
  await page.route("**/api/salud", (ruta) => ruta.abort());
  await page.goto("/estado");

  await expect(page.getByText("No pudimos comunicarnos con el back")).toBeVisible();

  await page.unroute("**/api/salud");
  await responderSalud(page, 200, { estado: "sano", dependencias: { baseDeDatos: "disponible" }, fecha });
  await page.getByRole("button", { name: "Volver a comprobar" }).click();

  await expect(page.getByText("Operativo")).toHaveCount(3);
});
