"use client";

import type { ReactNode } from "react";
import { Tabs } from "radix-ui";

type Pestana = { valor: string; nombre: string; contenido: ReactNode };

type PestanasProps = {
  etiqueta: string;
  pestanas: readonly Pestana[];
  valorInicial?: string;
};

export function Pestanas({ etiqueta, pestanas, valorInicial }: PestanasProps) {
  return (
    <Tabs.Root defaultValue={valorInicial ?? pestanas[0]?.valor}>
      <Tabs.List aria-label={etiqueta} className="flex gap-1 overflow-x-auto border-b border-borde">
        {pestanas.map((pestana) => (
          <Tabs.Trigger
            key={pestana.valor}
            value={pestana.valor}
            className="-mb-px border-b-2 border-transparent px-3 py-2.5 focus-visible:-outline-offset-2 text-sm font-medium whitespace-nowrap text-texto-suave transition-colors hover:text-texto data-[state=active]:border-marca data-[state=active]:text-marca-fuerte"
          >
            {pestana.nombre}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {pestanas.map((pestana) => (
        <Tabs.Content key={pestana.valor} value={pestana.valor} className="pt-6">
          {pestana.contenido}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
