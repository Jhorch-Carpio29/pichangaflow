import { ArrowRight, CalendarCheck, ChartColumn, ScanLine, ShoppingCart, Wallet, Zap, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/marca/logo";
import { FondoAnimado } from "@/components/portada/fondo-animado";
import { MapaEnVivo } from "@/components/portada/mapa-en-vivo";
import { Boton } from "@/components/ui/boton";
import { Tarjeta } from "@/components/ui/tarjeta";

type Funcion = { titulo: string; descripcion: string; icono: LucideIcon };

const FUNCIONES: readonly Funcion[] = [
  { titulo: "Reservas sin cruces", descripcion: "Mapa de canchas en vivo. Dos personas nunca reservan el mismo horario.", icono: CalendarCheck },
  { titulo: "Pagos ordenados", descripcion: "Yape y Plin con captura, verificados por tu cajero en un clic.", icono: Wallet },
  { titulo: "Tienda e inventario", descripcion: "Vende bebidas y snacks con carrito y controla tu stock al instante.", icono: ShoppingCart },
  { titulo: "Eventos y conciertos", descripcion: "Alquila por días y controla las entradas con código QR.", icono: ScanLine },
  { titulo: "Todo sincronizado", descripcion: "Lo que hace un rol aparece en los demás paneles en menos de un segundo.", icono: Zap },
  { titulo: "Decisiones con datos", descripcion: "Ingresos, ocupación y productos más vendidos en un solo panel.", icono: ChartColumn },
];

export default function PaginaInicio() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="zona-oscura relative isolate overflow-hidden bg-menu">
        <FondoAnimado />

        <header className="relative mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo claro />
          <a href="#funciones" className="text-sm font-medium text-menu-texto transition-colors hover:text-white">
            Funciones
          </a>
        </header>

        <section className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-24 lg:pb-36">
          <div>
            <h1 className="aparecer text-4xl leading-tight font-semibold text-white sm:text-5xl">
              Tu complejo deportivo, en orden y <span className="text-marca-brillo">en tiempo real</span>
            </h1>
            <p className="aparecer aparecer-2 mt-5 max-w-lg text-lg leading-relaxed text-menu-texto">
              Reservas, pagos, tienda, eventos y cochera en una sola plataforma para tu equipo y tus clientes.
            </p>
            <div className="aparecer aparecer-3 mt-8">
              <Boton comoHijo tamano="lg" variante="brillante">
                <a href="#funciones">
                  Conoce las funciones
                  <ArrowRight />
                </a>
              </Boton>
            </div>
          </div>

          <div className="aparecer aparecer-3">
            <MapaEnVivo />
          </div>
        </section>
      </div>

      <main id="funciones" className="mx-auto w-full max-w-6xl flex-1 scroll-mt-6 px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-semibold text-texto">Todo lo que tu complejo necesita</h2>
        <p className="mt-2 max-w-xl text-texto-suave">Cada persona de tu equipo tiene su panel, con lo justo para hacer su trabajo.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUNCIONES.map(({ titulo, descripcion, icono: Icono }) => (
            <Tarjeta key={titulo} className="p-6 transition duration-200 hover:-translate-y-1 hover:border-marca/40 hover:shadow-elevada">
              <span className="grid size-10 place-items-center rounded-control bg-marca-suave text-marca">
                <Icono className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-texto">{titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-texto-suave">{descripcion}</p>
            </Tarjeta>
          ))}
        </div>
      </main>

      <footer className="border-t border-borde bg-superficie">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-6 sm:px-6">
          <Logo />
          <p className="text-sm text-texto-suave">Hecho en Perú</p>
        </div>
      </footer>
    </div>
  );
}
