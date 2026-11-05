"use client";

import type { ComponentProps } from "react";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { Logo } from "@/components/marca/logo";
import { cn } from "@/lib/cn";
import { NavegacionMenu } from "./navegacion-menu";
import { useMenuContraido } from "./use-menu-contraido";

type PropsNavegacion = ComponentProps<typeof NavegacionMenu>;

type MenuFijoProps = Omit<PropsNavegacion, "contraido">;

/** Menú de computadora: fijo a la izquierda y contraíble. */
export function MenuFijo(props: MenuFijoProps) {
  const { contraido, alternar } = useMenuContraido();
  const IconoAlternar = contraido ? PanelLeftOpen : PanelLeftClose;
  const textoAlternar = contraido ? "Expandir menú" : "Contraer menú";

  return (
    <aside
      className={cn(
        "zona-oscura sticky top-0 hidden h-dvh shrink-0 flex-col fondo-lateral shadow-elevada transition-[width] duration-200 lg:flex",
        contraido ? "w-19" : "w-66",
      )}
    >
      <div className={cn("flex h-16 shrink-0 items-center border-b border-lateral-borde", contraido ? "justify-center" : "px-5")}>
        <Logo claro soloSimbolo={contraido} />
      </div>
      <NavegacionMenu {...props} contraido={contraido} />
      <div className="shrink-0 border-t border-lateral-borde p-3">
        <button
          type="button"
          onClick={alternar}
          aria-label={textoAlternar}
          title={textoAlternar}
          className={cn(
            "flex h-10 w-full items-center gap-3 rounded-control px-3 text-sm font-medium text-lateral-texto transition-colors hover:bg-lateral-hover hover:text-white",
            contraido && "justify-center px-0",
          )}
        >
          <IconoAlternar className="size-4.5 shrink-0" aria-hidden="true" />
          {!contraido && <span>Contraer menú</span>}
        </button>
      </div>
    </aside>
  );
}

type MenuMovilProps = MenuFijoProps & {
  abierto: boolean;
  alCambiarAbierto: (abierto: boolean) => void;
};

/** Menú de celular: panel deslizable que se cierra al elegir una opción. */
export function MenuMovil({ abierto, alCambiarAbierto, alElegir, ...props }: MenuMovilProps) {
  return (
    <Dialog.Root open={abierto} onOpenChange={alCambiarAbierto}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-menu/60 lg:hidden" />
        <Dialog.Content className="zona-oscura fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col fondo-lateral shadow-elevada lg:hidden">
          <Dialog.Title className="sr-only">Menú principal</Dialog.Title>
          <Dialog.Description className="sr-only">Opciones de navegación</Dialog.Description>
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-lateral-borde px-5">
            <Logo claro />
            <Dialog.Close
              aria-label="Cerrar menú"
              className="grid size-9 place-items-center rounded-control text-lateral-texto transition-colors hover:bg-lateral-hover hover:text-white"
            >
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <NavegacionMenu
            {...props}
            alElegir={(opcion, evento) => {
              alElegir?.(opcion, evento);
              alCambiarAbierto(false);
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
