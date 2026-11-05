import { beforeAll, describe, expect, it } from "vitest";
import { VerificadorPostgres } from "../../apps/api/src/infrastructure/base-de-datos/verificador-postgres";

const cadenaDePrueba = process.env.TEST_DATABASE_URL;

describe("verificador de PostgreSQL", () => {
  beforeAll(() => {
    if (!cadenaDePrueba) throw new Error("Define TEST_DATABASE_URL para correr las pruebas de integración.");
  });

  it("detecta una base disponible", async () => {
    expect(await new VerificadorPostgres(cadenaDePrueba).estaDisponible()).toBe(true);
  });

  it("detecta una base que no responde", async () => {
    const cadenaInvalida = "postgres://usuario:clave@127.0.0.1:1/ninguna";

    expect(await new VerificadorPostgres(cadenaInvalida).estaDisponible()).toBe(false);
  });

  it("informa no disponible si falta la conexión", async () => {
    expect(await new VerificadorPostgres(undefined).estaDisponible()).toBe(false);
  });
});
