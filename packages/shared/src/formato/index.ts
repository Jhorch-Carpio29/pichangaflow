const ZONA_LIMA = "America/Lima";
const ESPACIO_DURO = /[\u00a0\u202f]/g;

const formatoSoles = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatoFecha = new Intl.DateTimeFormat("es-PE", {
  timeZone: ZONA_LIMA,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formatoHora = new Intl.DateTimeFormat("es-PE", {
  timeZone: ZONA_LIMA,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** Convierte céntimos enteros en un monto como `S/ 1,234.50`. */
export function formatearSoles(centimos: number): string {
  if (!Number.isInteger(centimos)) {
    throw new RangeError("El monto debe estar en céntimos enteros.");
  }
  const signo = centimos < 0 ? "-" : "";
  return `${signo}S/ ${formatoSoles.format(Math.abs(centimos) / 100)}`;
}

/** Devuelve la fecha de Lima como `dd/mm/aaaa`. */
export function formatearFecha(fecha: Date): string {
  return formatoFecha.format(fecha);
}

/** Devuelve la hora de Lima como `7:00 p. m.`. */
export function formatearHora(fecha: Date): string {
  return formatoHora.format(fecha).replace(ESPACIO_DURO, " ");
}
