import { useId, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

type CampoProps = ComponentProps<"input"> & {
  etiqueta: string;
  ayuda?: string;
  error?: string;
};

export function Campo({ etiqueta, ayuda, error, className, id, ...props }: CampoProps) {
  const idGenerado = useId();
  const idCampo = id ?? idGenerado;
  const idDetalle = `${idCampo}-detalle`;
  const detalle = error ?? ayuda;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={idCampo} className="text-sm font-medium text-texto">
        {etiqueta}
      </label>
      <input
        id={idCampo}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={detalle ? idDetalle : undefined}
        className={cn(
          "h-10 w-full rounded-control border border-borde-fuerte bg-superficie px-3 text-sm text-texto transition-colors placeholder:text-texto-suave disabled:cursor-not-allowed disabled:bg-superficie-suave disabled:opacity-70",
          error && "border-error",
          className,
        )}
        {...props}
      />
      {detalle && (
        <p id={idDetalle} className={cn("text-xs", error ? "text-error" : "text-texto-suave")}>
          {detalle}
        </p>
      )}
    </div>
  );
}
