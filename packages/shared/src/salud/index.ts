import { z } from "zod";

export const esquemaEstadoSistema = z.object({
  estado: z.enum(["sano", "degradado"]),
  dependencias: z.object({
    baseDeDatos: z.enum(["disponible", "no_disponible"]),
  }),
  fecha: z.iso.datetime(),
});

export type EstadoSistema = z.infer<typeof esquemaEstadoSistema>;
