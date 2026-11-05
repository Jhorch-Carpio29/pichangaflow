"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import type { MenuRol, OpcionMenu } from "@/config/menus";
import { BarraSuperior, type UsuarioPanel } from "./barra-superior";
import { MenuFijo, MenuMovil } from "./menu-lateral";

type PlantillaPanelProps = {
  menu: MenuRol;
  rutaActual: string;
  titulo: string;
  usuario: UsuarioPanel;
  acciones?: ReactNode;
  alElegir?: (opcion: OpcionMenu, evento: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
};

/** Plantilla común a los paneles de los 5 roles. */
export function PlantillaPanel({ menu, rutaActual, titulo, usuario, acciones, alElegir, children }: PlantillaPanelProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="flex min-h-dvh">
      <MenuFijo menu={menu} rutaActual={rutaActual} alElegir={alElegir} />
      <MenuMovil menu={menu} rutaActual={rutaActual} alElegir={alElegir} abierto={menuAbierto} alCambiarAbierto={setMenuAbierto} />
      <div className="flex min-w-0 flex-1 flex-col">
        <BarraSuperior titulo={titulo} usuario={usuario} acciones={acciones} alAbrirMenu={() => setMenuAbierto(true)} />
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
