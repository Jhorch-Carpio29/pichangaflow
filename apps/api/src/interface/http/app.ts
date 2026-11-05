import { OpenAPIHono } from "@hono/zod-openapi";
import { secureHeaders } from "hono/secure-headers";
import type { VerificadorBaseDatos } from "../../application/puertos/verificador-base-datos";
import { registrarRutaSalud } from "./rutas/salud";

type Dependencias<Env extends object> = {
  verificadorPara: (entorno: Env) => VerificadorBaseDatos;
};

export function crearApp<Env extends object>({ verificadorPara }: Dependencias<Env>) {
  const app = new OpenAPIHono<{ Bindings: Env }>();

  app.use(secureHeaders());

  registrarRutaSalud(app, verificadorPara);

  app.doc31("/api/openapi.json", {
    openapi: "3.1.0",
    info: { title: "API de PichangaFlow", version: "0.1.0" },
  });

  app.notFound((c) => c.json({ mensaje: "No encontramos lo que buscas." }, 404));

  app.onError((error, c) => {
    console.error(error);
    return c.json({ mensaje: "Ocurrió un problema. Vuelve a intentarlo en unos segundos." }, 500);
  });

  return app;
}
