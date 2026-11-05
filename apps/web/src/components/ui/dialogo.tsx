"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Dialog } from "radix-ui";

type DialogoProps = {
  disparador: ReactNode;
  titulo: string;
  descripcion?: string;
  children: ReactNode;
};

export function Dialogo({ disparador, titulo, descripcion, children }: DialogoProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{disparador}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-menu/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-tarjeta bg-superficie p-6 shadow-elevada">
          <Dialog.Title className="pr-8 font-titulo text-lg font-semibold text-texto">{titulo}</Dialog.Title>
          <Dialog.Description className={descripcion ? "mt-1 text-sm text-texto-suave" : "sr-only"}>
            {descripcion ?? titulo}
          </Dialog.Description>
          <div className="mt-4">{children}</div>
          <Dialog.Close
            aria-label="Cerrar"
            className="absolute top-4 right-4 grid size-8 place-items-center rounded-control text-texto-suave transition-colors hover:bg-fondo"
          >
            <X className="size-4" aria-hidden="true" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
