import { describe, expect, it } from "vitest";
import { MENUS, ROLES, type Rol } from "../../../apps/web/src/config/menus";

const nombresDe = (rol: Rol) => MENUS[rol].grupos.flatMap((grupo) => grupo.opciones.map((opcion) => opcion.nombre));

describe("menús por rol", () => {
  it("define los 5 roles", () => {
    expect(Object.keys(MENUS).sort()).toEqual([...ROLES].sort());
  });

  it.each(ROLES)("%s tiene opciones y destinos sin repetir", (rol) => {
    const destinos = MENUS[rol].grupos.flatMap((grupo) => grupo.opciones.map((opcion) => opcion.destino));

    expect(destinos.length).toBeGreaterThan(0);
    expect(new Set(destinos).size).toBe(destinos.length);
  });

  it("deja la venta al cajero y el registro de productos al admin", () => {
    expect(nombresDe("cajero")).toContain("Tienda");
    expect(nombresDe("cajero")).not.toContain("Productos");
    expect(nombresDe("admin-empresa")).toContain("Productos");
    expect(nombresDe("admin-empresa")).not.toContain("Tienda");
  });
});
