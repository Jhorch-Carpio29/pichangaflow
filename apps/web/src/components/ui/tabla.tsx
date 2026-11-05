import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type TablaProps = ComponentProps<"table"> & {
  /** Describe la tabla para lectores de pantalla. */
  etiqueta: string;
};

export function Tabla({ etiqueta, className, ...props }: TablaProps) {
  return (
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={etiqueta}>
      <table className={cn("w-full border-collapse text-left text-sm", className)} {...props} />
    </div>
  );
}

export function FilaTitulos({ className, ...props }: ComponentProps<"tr">) {
  return <tr className={cn("border-b border-borde bg-superficie-suave", className)} {...props} />;
}

export function Titulo({ className, ...props }: ComponentProps<"th">) {
  return <th scope="col" className={cn("px-5 py-3 text-xs font-semibold whitespace-nowrap text-texto-suave", className)} {...props} />;
}

export function Fila({ className, ...props }: ComponentProps<"tr">) {
  return <tr className={cn("border-b border-borde transition-colors last:border-0 hover:bg-superficie-suave", className)} {...props} />;
}

export function Celda({ className, ...props }: ComponentProps<"td">) {
  return <td className={cn("px-5 py-3.5 whitespace-nowrap text-texto", className)} {...props} />;
}
