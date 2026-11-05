import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import { Boton } from "@/components/ui/boton";

export type UsuarioPanel = { nombre: string; detalle: string };

type BarraSuperiorProps = {
  titulo: string;
  usuario: UsuarioPanel;
  acciones?: ReactNode;
  alAbrirMenu: () => void;
};

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join("");
}

export function BarraSuperior({ titulo, usuario, acciones, alAbrirMenu }: BarraSuperiorProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-borde bg-superficie/90 px-4 backdrop-blur sm:px-6">
      <Boton variante="fantasma" tamano="icono" className="lg:hidden" aria-label="Abrir menú" onClick={alAbrirMenu}>
        <Menu />
      </Boton>
      <h1 className="min-w-0 flex-1 truncate text-lg font-semibold text-texto">{titulo}</h1>
      {acciones}
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-marca-suave text-sm font-semibold text-marca-fuerte" aria-hidden="true">
          {iniciales(usuario.nombre)}
        </span>
        <div className="hidden leading-tight md:block">
          <p className="text-sm font-medium text-texto">{usuario.nombre}</p>
          <p className="text-xs text-texto-suave">{usuario.detalle}</p>
        </div>
      </div>
    </header>
  );
}
