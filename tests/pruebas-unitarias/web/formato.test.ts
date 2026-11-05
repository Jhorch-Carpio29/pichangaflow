import { describe, expect, it } from "vitest";
import { formatearFecha, formatearHora, formatearSoles } from "@pichangaflow/shared";

describe("formato peruano (RNF-USA-04)", () => {
  it("muestra soles desde céntimos enteros", () => {
    expect(formatearSoles(123450)).toBe("S/ 1,234.50");
    expect(formatearSoles(0)).toBe("S/ 0.00");
    expect(formatearSoles(-1050)).toBe("-S/ 10.50");
  });

  it("rechaza montos que no son céntimos enteros", () => {
    expect(() => formatearSoles(10.5)).toThrow(RangeError);
  });

  it("muestra la fecha en hora de Lima como dd/mm/aaaa", () => {
    expect(formatearFecha(new Date("2026-11-05T15:00:00Z"))).toBe("05/11/2026");
    expect(formatearFecha(new Date("2026-11-06T03:00:00Z"))).toBe("05/11/2026");
  });

  it("muestra la hora de Lima en formato de 12 horas", () => {
    expect(formatearHora(new Date("2026-11-06T00:00:00Z"))).toBe("7:00 p. m.");
    expect(formatearHora(new Date("2026-11-05T14:30:00Z"))).toBe("9:30 a. m.");
  });
});
