import type { MouseEvent } from "react";
import Link from "next/link";
import type { MenuRol, OpcionMenu } from "@/config/menus";
import { cn } from "@/lib/cn";

type NavegacionMenuProps = {
  menu: MenuRol;
  rutaActual: string;
  contraido?: boolean;
  /** Se llama al elegir una opción. */
  alElegir?: (opcion: OpcionMenu, evento: MouseEvent<HTMLAnchorElement>) => void;
};

export function NavegacionMenu({ menu, rutaActual, contraido = false, alElegir }: NavegacionMenuProps) {
  return (
    <nav aria-label={`Menú de ${menu.nombreRol}`} className="barra-fina flex-1 space-y-6 overflow-y-auto px-3 py-4">
      {menu.grupos.map((grupo) => (
        <div key={grupo.titulo}>
          <p className={cn("mb-1.5 px-3 text-xs font-medium text-lateral-suave", contraido && "sr-only")}>{grupo.titulo}</p>
          <ul className="space-y-0.5">
            {grupo.opciones.map((opcion) => {
              const activa = opcion.destino === rutaActual;
              const Icono = opcion.icono;

              return (
                <li key={opcion.destino}>
                  <Link
                    href={opcion.destino}
                    aria-current={activa ? "page" : undefined}
                    title={contraido ? opcion.nombre : undefined}
                    onClick={(evento) => alElegir?.(opcion, evento)}
                    className={cn(
                      "relative flex h-10 items-center gap-3 rounded-control px-3 text-sm font-medium transition-colors",
                      contraido && "justify-center px-0",
                      activa ? "bg-white text-marca-fuerte shadow-tarjeta" : "text-lateral-texto hover:bg-lateral-hover hover:text-white",
                    )}
                  >
                    <Icono className={cn("size-4.5 shrink-0", activa && "text-marca")} aria-hidden="true" />
                    <span className={cn("truncate", contraido && "sr-only")}>{opcion.nombre}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
