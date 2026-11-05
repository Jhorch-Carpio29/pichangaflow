import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const estilosEtiqueta = cva("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", {
  variants: {
    tono: {
      neutro: "bg-fondo text-texto-suave",
      exito: "bg-exito-suave text-exito",
      aviso: "bg-aviso-suave text-aviso",
      error: "bg-error-suave text-error",
      info: "bg-info-suave text-info",
    },
  },
  defaultVariants: { tono: "neutro" },
});

type EtiquetaProps = ComponentProps<"span"> & VariantProps<typeof estilosEtiqueta>;

export function Etiqueta({ className, tono, ...props }: EtiquetaProps) {
  return <span className={cn(estilosEtiqueta({ tono }), className)} {...props} />;
}
