import { esquemaEstadoSistema, type EstadoSistema } from "@pichangaflow/shared";

/** Pide el chequeo de salud al back. Devuelve `null` si el back no responde. */
export async function pedirEstadoSistema(): Promise<EstadoSistema | null> {
  try {
    const respuesta = await fetch("/api/salud", { cache: "no-store" });
    const resultado = esquemaEstadoSistema.safeParse(await respuesta.json());

    return resultado.success ? resultado.data : null;
  } catch {
    return null;
  }
}
