/** Variables que Cloudflare entrega al Worker. */
export type Entorno = {
  /** Conexión local, guardada en `.dev.vars`. */
  DATABASE_URL?: string;
  /** Conexión de producción. */
  HYPERDRIVE?: { connectionString: string };
};

/** Prefiere Hyperdrive y avisa, sin mostrar valores, si no hay ninguna conexión. */
export function leerCadenaDeConexion(entorno: Entorno): string | undefined {
  const cadena = entorno.HYPERDRIVE?.connectionString ?? entorno.DATABASE_URL;

  if (!cadena) console.error("Falta configurar DATABASE_URL en apps/api/.dev.vars");

  return cadena;
}
