import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type EstadoVacioProps = {
  icono: LucideIcon;
  titulo: string;
  descripcion: string;
  accion?: ReactNode;
};

export function EstadoVacio({ icono: Icono, titulo, descripcion, accion }: EstadoVacioProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-marca-suave text-marca">
        <Icono className="size-6" aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-base font-semibold text-texto">{titulo}</h3>
        <p className="mt-1 max-w-sm text-sm text-texto-suave">{descripcion}</p>
      </div>
      {accion}
    </div>
  );
}
