"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type EstadoCancha = "Libre" | "Separada" | "Ocupada" | "Evento";

const ESTADOS_INICIALES: readonly EstadoCancha[] = ["Libre", "Ocupada", "Separada", "Evento", "Ocupada", "Libre"];

const SIGUIENTE: Record<EstadoCancha, EstadoCancha> = {
  Libre: "Separada",
  Separada: "Ocupada",
  Ocupada: "Libre",
  Evento: "Evento",
};

const ESTILOS: Record<EstadoCancha, string> = {
  Libre: "border-marca-brillo/60 bg-marca-brillo/15 text-marca-brillo",
  Separada: "border-white/50 bg-white/15 text-white",
  Ocupada: "border-menu-borde bg-menu-elevado/70 text-menu-texto",
  Evento: "border-marca/70 bg-marca/35 text-white",
};

const INTERVALO_MS = 1_800;

/** Ilustración del mapa de canchas cambiando en tiempo real. Es solo decorativa. */
export function MapaEnVivo() {
  const [estados, setEstados] = useState(ESTADOS_INICIALES);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let turno = 0;
    const temporizador = setInterval(() => {
      const indice = (turno * 2 + 1) % estados.length;
      turno += 1;
      setEstados((actuales) => actuales.map((estado, i) => (i === indice ? SIGUIENTE[estado] : estado)));
    }, INTERVALO_MS);

    return () => clearInterval(temporizador);
  }, [estados.length]);

  return (
    <div className="rounded-tarjeta border border-white/10 bg-menu/70 p-5 shadow-elevada backdrop-blur-md" aria-hidden="true">
      <div className="flex items-center justify-between">
        <p className="font-titulo font-semibold text-white">Mapa de canchas</p>
        <p className="flex items-center gap-2 text-sm font-medium text-marca-brillo">
          <span className="latido size-2 rounded-full bg-marca-brillo" />
          En vivo
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {estados.map((estado, indice) => (
          <div key={indice} className={cn("rounded-control border p-3 transition-colors duration-500", ESTILOS[estado])}>
            <p className="text-sm font-semibold">Cancha {indice + 1}</p>
            <p className="mt-6 text-xs">{estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
