import type { ReactNode } from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Tono = "exito" | "aviso" | "error" | "info";

const estilos: Record<Tono, { contenedor: string; icono: LucideIcon }> = {
  exito: { contenedor: "border-exito/25 bg-exito-suave text-exito", icono: CircleCheck },
  aviso: { contenedor: "border-aviso/25 bg-aviso-suave text-aviso", icono: TriangleAlert },
  error: { contenedor: "border-error/25 bg-error-suave text-error", icono: CircleAlert },
  info: { contenedor: "border-info/25 bg-info-suave text-info", icono: Info },
};

type AvisoProps = {
  tono?: Tono;
  titulo: string;
  children?: ReactNode;
  className?: string;
};

export function Aviso({ tono = "info", titulo, children, className }: AvisoProps) {
  const { contenedor, icono: Icono } = estilos[tono];

  return (
    <div role={tono === "error" ? "alert" : "status"} className={cn("flex gap-3 rounded-control border p-4", contenedor, className)}>
      <Icono className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 text-sm">
        <p className="font-semibold">{titulo}</p>
        {children && <div className="mt-0.5 text-texto">{children}</div>}
      </div>
    </div>
  );
}
