import type { EstadoSistema } from "@pichangaflow/shared";
import { calcularEstadoSistema } from "../../domain/salud/estado-sistema";
import type { VerificadorBaseDatos } from "../puertos/verificador-base-datos";

export async function consultarSalud(verificador: VerificadorBaseDatos): Promise<EstadoSistema> {
  const baseDisponible = await verificador.estaDisponible().catch(() => false);

  return calcularEstadoSistema({ baseDisponible, fecha: new Date() });
}
