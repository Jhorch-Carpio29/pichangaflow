type Jugador = { recorrido: string; duracion: string; radio: number; brillante?: boolean };

const JUGADORES: readonly Jugador[] = [
  { recorrido: "M180 420 C 320 300, 460 520, 600 380 S 900 240, 1040 400 S 700 600, 180 420", duracion: "16s", radio: 7 },
  { recorrido: "M260 180 C 420 280, 520 140, 700 240 S 980 160, 1000 300 S 560 120, 260 180", duracion: "19s", radio: 7 },
  { recorrido: "M320 560 C 460 460, 640 620, 800 500 S 1020 520, 940 600 S 560 640, 320 560", duracion: "22s", radio: 7 },
  { recorrido: "M600 120 C 760 260, 480 380, 640 520 S 860 340, 760 200 S 700 80, 600 120", duracion: "13s", radio: 6, brillante: true },
];

/** Cancha en perspectiva con luces y jugadores en movimiento. Es solo decorativa. */
export function FondoAnimado() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="aurora aurora-uno" />
      <div className="aurora aurora-dos" />

      <div className="absolute inset-x-[-10%] top-[12%] bottom-[-30%] perspective-[1100px]">
        <svg viewBox="0 0 1200 700" className="size-full rotate-x-[56deg]" fill="none">
          <g className="stroke-marca-brillo/45" strokeWidth="3">
            <rect x="60" y="40" width="1080" height="620" rx="6" />
            <path d="M600 40v620" />
            <circle cx="600" cy="350" r="105" />
            <rect x="60" y="180" width="170" height="340" />
            <rect x="970" y="180" width="170" height="340" />
            <rect x="60" y="265" width="70" height="170" />
            <rect x="1070" y="265" width="70" height="170" />
          </g>

          <g className="solo-con-movimiento">
            <rect x="60" y="40" width="1080" height="620" rx="6" pathLength="990" className="pase stroke-marca-brillo" strokeWidth="4" />
            <circle cx="600" cy="350" r="105" pathLength="990" className="pase pase-lento stroke-marca-brillo" strokeWidth="4" />

            {JUGADORES.map(({ recorrido, duracion, radio, brillante }) => (
              <circle key={recorrido} r={radio} className={brillante ? "fill-white" : "fill-marca-brillo"}>
                <animateMotion dur={duracion} repeatCount="indefinite" path={recorrido} />
              </circle>
            ))}
          </g>
        </svg>
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-menu via-menu/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-menu to-transparent" />
    </div>
  );
}
