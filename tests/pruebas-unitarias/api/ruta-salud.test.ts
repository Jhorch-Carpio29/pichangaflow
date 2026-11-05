import { esquemaEstadoSistema } from "@pichangaflow/shared";
import { describe, expect, it } from "vitest";
import { crearApp } from "../../../apps/api/src/interface/http/app";

const appCon = (disponible: boolean) => crearApp({ verificadorPara: () => ({ estaDisponible: async () => disponible }) });

describe("GET /api/salud", () => {
  it("responde 200 y cumple el contrato con la base disponible", async () => {
    const respuesta = await appCon(true).request("/api/salud");

    expect(respuesta.status).toBe(200);
    expect(esquemaEstadoSistema.parse(await respuesta.json()).estado).toBe("sano");
  });

  it("responde 503 con la base caída", async () => {
    const respuesta = await appCon(false).request("/api/salud");

    expect(respuesta.status).toBe(503);
    expect(esquemaEstadoSistema.parse(await respuesta.json()).estado).toBe("degradado");
  });

  it("no se guarda en caché y envía cabeceras de seguridad", async () => {
    const respuesta = await appCon(true).request("/api/salud");

    expect(respuesta.headers.get("cache-control")).toBe("no-store");
    expect(respuesta.headers.get("x-content-type-options")).toBe("nosniff");
    expect(respuesta.headers.get("x-frame-options")).toBeTruthy();
  });
});

describe("otras rutas", () => {
  it("publica OpenAPI 3.1", async () => {
    const respuesta = await appCon(true).request("/api/openapi.json");
    const documento = (await respuesta.json()) as { openapi: string; paths: Record<string, unknown> };

    expect(documento.openapi).toBe("3.1.0");
    expect(documento.paths).toHaveProperty("/api/salud");
  });

  it("responde 404 con un mensaje claro", async () => {
    const respuesta = await appCon(true).request("/api/no-existe");

    expect(respuesta.status).toBe(404);
    expect(await respuesta.json()).toEqual({ mensaje: "No encontramos lo que buscas." });
  });

  it("oculta el detalle de un error inesperado", async () => {
    const app = crearApp({
      verificadorPara: () => {
        throw new Error("detalle-interno");
      },
    });
    const respuesta = await app.request("/api/salud");

    expect(respuesta.status).toBe(500);
    expect(await respuesta.text()).not.toContain("detalle-interno");
  });
});
