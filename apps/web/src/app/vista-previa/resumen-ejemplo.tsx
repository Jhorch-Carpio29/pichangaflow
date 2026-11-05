import type { ComponentProps } from "react";
import { BadgeCheck, CalendarCheck, TrendingUp, Wallet, type LucideIcon } from "lucide-react";
import { formatearFecha, formatearHora, formatearSoles } from "@pichangaflow/shared";
import { Etiqueta } from "@/components/ui/etiqueta";
import { Celda, Fila, FilaTitulos, Tabla, Titulo } from "@/components/ui/tabla";
import { CuerpoTarjeta, EncabezadoTarjeta, Tarjeta } from "@/components/ui/tarjeta";
import { cn } from "@/lib/cn";

type Indicador = { nombre: string; valor: string; detalle: string; icono: LucideIcon };

const INDICADORES: readonly Indicador[] = [
  { nombre: "Ingresos de hoy", valor: formatearSoles(184050), detalle: "Reservas, tienda y cochera", icono: Wallet },
  { nombre: "Reservas de hoy", valor: "24", detalle: "6 canchas activas", icono: CalendarCheck },
  { nombre: "Ocupación", valor: "72 %", detalle: "Hora punta: 7:00 p. m.", icono: TrendingUp },
  { nombre: "Por verificar", valor: "3", detalle: "Pagos con captura", icono: BadgeCheck },
];

const OCUPACION = [
  { hora: "4 p. m.", valor: 35 },
  { hora: "5 p. m.", valor: 50 },
  { hora: "6 p. m.", valor: 78 },
  { hora: "7 p. m.", valor: 100 },
  { hora: "8 p. m.", valor: 92 },
  { hora: "9 p. m.", valor: 64 },
  { hora: "10 p. m.", valor: 40 },
];

type TonoEtiqueta = ComponentProps<typeof Etiqueta>["tono"];

const RESERVAS: readonly { cancha: string; cliente: string; inicio: string; monto: number; estado: string; tono: TonoEtiqueta }[] = [
  { cancha: "Cancha 1", cliente: "Cliente Ejemplo A", inicio: "2026-11-05T23:00:00Z", monto: 8000, estado: "Pagado", tono: "exito" },
  { cancha: "Cancha 2", cliente: "Cliente Ejemplo B", inicio: "2026-11-06T00:00:00Z", monto: 9000, estado: "Pendiente", tono: "aviso" },
  { cancha: "Cancha 3", cliente: "Cliente Ejemplo C", inicio: "2026-11-06T00:00:00Z", monto: 9000, estado: "Separado", tono: "info" },
  { cancha: "Cancha 1", cliente: "Cliente Ejemplo D", inicio: "2026-11-06T01:00:00Z", monto: 9000, estado: "Cancelado", tono: "error" },
];

export function ResumenEjemplo() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {INDICADORES.map(({ nombre, valor, detalle, icono: Icono }, indice) => {
          const destacado = indice === 0;

          return (
            <Tarjeta key={nombre} className={cn("p-5", destacado && "border-transparent bg-linear-to-br from-marca to-marca-fuerte")}>
              <div className="flex items-center justify-between gap-3">
                <h2 className={cn("font-sans text-sm font-medium tracking-normal", destacado ? "text-white" : "text-texto-suave")}>{nombre}</h2>
                <span className={cn("grid size-9 place-items-center rounded-control", destacado ? "bg-white/15 text-white" : "bg-marca-suave text-marca")}>
                  <Icono className="size-4.5" aria-hidden="true" />
                </span>
              </div>
              <p className={cn("mt-2 font-titulo text-2xl font-semibold", destacado ? "text-white" : "text-texto")}>{valor}</p>
              <p className={cn("mt-1 text-sm", destacado ? "text-white" : "text-texto-suave")}>{detalle}</p>
            </Tarjeta>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Tarjeta className="min-w-0 xl:col-span-2">
          <EncabezadoTarjeta titulo="Próximas reservas" descripcion={formatearFecha(new Date("2026-11-05T20:00:00Z"))} />
          <Tabla etiqueta="Próximas reservas">
            <thead>
              <FilaTitulos>
                <Titulo>Cancha</Titulo>
                <Titulo>Cliente</Titulo>
                <Titulo>Hora</Titulo>
                <Titulo className="text-right">Monto</Titulo>
                <Titulo>Estado</Titulo>
              </FilaTitulos>
            </thead>
            <tbody>
              {RESERVAS.map((reserva) => (
                <Fila key={`${reserva.cancha}-${reserva.inicio}`}>
                  <Celda className="font-medium">{reserva.cancha}</Celda>
                  <Celda>{reserva.cliente}</Celda>
                  <Celda>{formatearHora(new Date(reserva.inicio))}</Celda>
                  <Celda className="text-right tabular-nums">{formatearSoles(reserva.monto)}</Celda>
                  <Celda>
                    <Etiqueta tono={reserva.tono}>{reserva.estado}</Etiqueta>
                  </Celda>
                </Fila>
              ))}
            </tbody>
          </Tabla>
        </Tarjeta>

        <Tarjeta>
          <EncabezadoTarjeta titulo="Ocupación por hora" descripcion="Porcentaje de canchas ocupadas" />
          <CuerpoTarjeta>
            <ul className="space-y-3">
              {OCUPACION.map(({ hora, valor }) => (
                <li key={hora} className="grid grid-cols-[4rem_1fr_3rem] items-center gap-2 text-sm">
                  <span className="text-texto-suave">{hora}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-fondo">
                    <span className="block h-full rounded-full bg-linear-to-r from-marca to-marca-brillo" style={{ width: `${valor}%` }} />
                  </span>
                  <span className="text-right whitespace-nowrap text-texto tabular-nums">{valor} %</span>
                </li>
              ))}
            </ul>
          </CuerpoTarjeta>
        </Tarjeta>
      </div>
    </div>
  );
}
