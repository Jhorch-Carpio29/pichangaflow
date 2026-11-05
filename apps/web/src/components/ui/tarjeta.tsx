import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tarjeta({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("rounded-tarjeta border border-borde bg-superficie shadow-tarjeta", className)} {...props} />;
}

type EncabezadoTarjetaProps = {
  titulo: string;
  descripcion?: string;
  acciones?: ReactNode;
};

export function EncabezadoTarjeta({ titulo, descripcion, acciones }: EncabezadoTarjetaProps) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-borde px-5 py-4">
      <div className="min-w-0">
        <h2 className="truncate text-base font-semibold text-texto">{titulo}</h2>
        {descripcion && <p className="mt-0.5 text-sm text-texto-suave">{descripcion}</p>}
      </div>
      {acciones}
    </header>
  );
}

export function CuerpoTarjeta({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-5", className)} {...props} />;
}
