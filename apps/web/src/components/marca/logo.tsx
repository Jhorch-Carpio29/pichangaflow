import { cn } from "@/lib/cn";

type LogoProps = {
  /** Muestra solo el símbolo, sin el nombre. */
  soloSimbolo?: boolean;
  /** Usa texto claro para fondos oscuros. */
  claro?: boolean;
  className?: string;
};

export function Logo({ soloSimbolo = false, claro = false, className }: LogoProps) {
  const lineas = claro ? "stroke-marca" : "stroke-white";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" className={claro ? "fill-white" : "fill-marca"} />
        <rect x="6" y="8" width="20" height="16" rx="2" fill="none" className={lineas} strokeWidth="1.8" />
        <path d="M16 8v16" className={lineas} strokeWidth="1.8" />
        <circle cx="16" cy="16" r="3.4" fill="none" className={lineas} strokeWidth="1.8" />
      </svg>
      {soloSimbolo ? (
        <span className="sr-only">PichangaFlow</span>
      ) : (
        <span className={cn("font-titulo text-lg font-semibold tracking-tight", claro ? "text-white" : "text-texto")}>
          Pichanga<span className={claro ? "text-lateral-acento" : "text-marca-fuerte"}>Flow</span>
        </span>
      )}
    </span>
  );
}
