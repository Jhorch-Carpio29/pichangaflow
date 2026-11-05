import { describe, expect, it } from "vitest";
import { consultarSalud } from "../../../apps/api/src/application/casos-de-uso/consultar-salud";

describe("consultar salud", () => {
  it("informa sano si el verificador responde", async () => {
    const resultado = await consultarSalud({ estaDisponible: async () => true });

    expect(resultado.estado).toBe("sano");
  });

  it("informa degradado si la base no está disponible", async () => {
    const resultado = await consultarSalud({ estaDisponible: async () => false });

    expect(resultado.estado).toBe("degradado");
  });

  it("no deja escapar un fallo del verificador", async () => {
    const resultado = await consultarSalud({
      estaDisponible: async () => {
        throw new Error("clave-secreta");
      },
    });

    expect(resultado.estado).toBe("degradado");
    expect(JSON.stringify(resultado)).not.toContain("clave-secreta");
  });
});
