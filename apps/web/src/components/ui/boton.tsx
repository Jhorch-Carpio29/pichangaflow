import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/cn";

const estilosBoton = cva(
  "inline-flex items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-55 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variante: {
        principal: "bg-marca text-white shadow-tarjeta hover:bg-marca-fuerte",
        brillante: "bg-marca-brillo font-semibold text-menu shadow-[0_8px_28px_rgb(46_232_159/0.35)] hover:bg-white",
        secundario: "border border-borde-fuerte bg-superficie text-texto hover:bg-superficie-suave",
        fantasma: "text-texto hover:bg-marca-suave hover:text-marca-fuerte",
        peligro: "bg-error text-white shadow-tarjeta hover:bg-error/90",
      },
      tamano: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icono: "size-10",
      },
    },
    defaultVariants: { variante: "principal", tamano: "md" },
  },
);

type BotonProps = ComponentProps<"button"> &
  VariantProps<typeof estilosBoton> & {
    /** Aplica el estilo al hijo, por ejemplo a un enlace. */
    comoHijo?: boolean;
    cargando?: boolean;
  };

export function Boton({ className, variante, tamano, comoHijo = false, cargando = false, children, ...props }: BotonProps) {
  const clases = cn(estilosBoton({ variante, tamano }), className);

  if (comoHijo) {
    return (
      <Slot.Root className={clases} {...props}>
        {children}
      </Slot.Root>
    );
  }

  return (
    <button type="button" className={clases} aria-busy={cargando || undefined} {...props} disabled={props.disabled || cargando}>
      {cargando && <LoaderCircle className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
