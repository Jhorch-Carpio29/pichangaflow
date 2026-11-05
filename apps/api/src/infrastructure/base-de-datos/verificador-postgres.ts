import postgres from "postgres";
import type { VerificadorBaseDatos } from "../../application/puertos/verificador-base-datos";

const TIEMPO_LIMITE_MS = 3_000;

function vencerEn(milisegundos: number) {
  return new Promise<never>((_, rechazar) => {
    setTimeout(() => rechazar(new Error("Tiempo límite agotado")), milisegundos);
  });
}

export class VerificadorPostgres implements VerificadorBaseDatos {
  constructor(private readonly cadenaDeConexion: string | undefined) {}

  async estaDisponible(): Promise<boolean> {
    if (!this.cadenaDeConexion) return false;

    const sql = postgres(this.cadenaDeConexion, { max: 1, fetch_types: false, connect_timeout: 3, onnotice: () => {} });

    try {
      await Promise.race([sql`select 1`, vencerEn(TIEMPO_LIMITE_MS)]);
      return true;
    } catch {
      return false;
    } finally {
      await sql.end({ timeout: 0 }).catch(() => {});
    }
  }
}
