import { describe, expect, it } from "vitest";
import { calcularEstadoSistema } from "../../../apps/api/src/domain/salud/estado-sistema";

const fecha = new Date("2026-11-05T15:00:00.000Z");

describe("estado del sistema", () => {
  it("está sano si la base responde", () => {
    expect(calcularEstadoSistema({ baseDisponible: true, fecha })).toEqual({
      estado: "sano",
      dependencias: { baseDeDatos: "disponible" },
      fecha: "2026-11-05T15:00:00.000Z",
    });
  });

  it("está degradado si la base no responde", () => {
    const resultado = calcularEstadoSistema({ baseDisponible: false, fecha });

    expect(resultado.estado).toBe("degradado");
    expect(resultado.dependencias.baseDeDatos).toBe("no_disponible");
  });
});
