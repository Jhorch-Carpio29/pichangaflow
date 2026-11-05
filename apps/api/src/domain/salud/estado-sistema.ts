import type { EstadoSistema } from "@pichangaflow/shared";

type DatosChequeo = { baseDisponible: boolean; fecha: Date };

/** El sistema está sano solo si todas sus dependencias responden. */
export function calcularEstadoSistema({ baseDisponible, fecha }: DatosChequeo): EstadoSistema {
  return {
    estado: baseDisponible ? "sano" : "degradado",
    dependencias: { baseDeDatos: baseDisponible ? "disponible" : "no_disponible" },
    fecha: fecha.toISOString(),
  };
}
