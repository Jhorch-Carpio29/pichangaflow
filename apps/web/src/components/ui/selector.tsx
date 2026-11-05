"use client";

import { useId } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Select } from "radix-ui";
import { cn } from "@/lib/cn";

type Opcion = { valor: string; nombre: string };

type SelectorProps = {
  etiqueta: string;
  opciones: readonly Opcion[];
  valor?: string;
  alCambiar?: (valor: string) => void;
  /** Oculta la etiqueta a la vista y la mantiene para lectores de pantalla. */
  etiquetaOculta?: boolean;
  className?: string;
};

export function Selector({ etiqueta, opciones, valor, alCambiar, etiquetaOculta = false, className }: SelectorProps) {
  const idEtiqueta = useId();

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span id={idEtiqueta} className={cn("text-sm font-medium text-texto", etiquetaOculta && "sr-only")}>
        {etiqueta}
      </span>
      <Select.Root value={valor} onValueChange={alCambiar}>
        <Select.Trigger
          aria-labelledby={idEtiqueta}
          className="inline-flex h-10 w-full items-center justify-between gap-2 rounded-control border border-borde-fuerte bg-superficie px-3 text-sm whitespace-nowrap text-texto transition-colors hover:bg-superficie-suave [&>span:first-child]:truncate"
        >
          <Select.Value />
          <Select.Icon>
            <ChevronDown className="size-4 text-texto-suave" aria-hidden="true" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            sideOffset={6}
            className="z-50 max-h-72 w-(--radix-select-trigger-width) overflow-hidden rounded-control border border-borde bg-superficie shadow-elevada"
          >
            <Select.Viewport className="p-1">
              {opciones.map((opcion) => (
                <Select.Item
                  key={opcion.valor}
                  value={opcion.valor}
                  className="flex h-9 cursor-pointer items-center justify-between gap-2 rounded-md px-2 text-sm text-texto outline-none select-none data-highlighted:bg-marca-suave data-highlighted:text-marca-fuerte"
                >
                  <Select.ItemText>{opcion.nombre}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="size-4" aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
