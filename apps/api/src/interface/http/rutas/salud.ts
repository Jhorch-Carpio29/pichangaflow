import { createRoute, type OpenAPIHono } from "@hono/zod-openapi";
import { esquemaEstadoSistema } from "@pichangaflow/shared";
import { consultarSalud } from "../../../application/casos-de-uso/consultar-salud";
import type { VerificadorBaseDatos } from "../../../application/puertos/verificador-base-datos";

const contenido = { "application/json": { schema: esquemaEstadoSistema } };

const rutaSalud = createRoute({
  method: "get",
  path: "/api/salud",
  summary: "Chequeo de salud del back y de la base de control",
  responses: {
    200: { description: "El back y la base responden", content: contenido },
    503: { description: "La base no responde", content: contenido },
  },
});

export function registrarRutaSalud<Env extends object>(
  app: OpenAPIHono<{ Bindings: Env }>,
  verificadorPara: (entorno: Env) => VerificadorBaseDatos,
) {
  app.openapi(rutaSalud, async (c) => {
    const estado = await consultarSalud(verificadorPara(c.env));
    c.header("Cache-Control", "no-store");

    return estado.estado === "sano" ? c.json(estado, 200) : c.json(estado, 503);
  });
}
