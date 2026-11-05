import {
  ArrowLeftRight,
  BadgeCheck,
  BookOpen,
  Bot,
  Boxes,
  Building2,
  CalendarCheck,
  CalendarDays,
  CalendarOff,
  CalendarPlus,
  CalendarRange,
  Car,
  ChartColumn,
  ClipboardList,
  Clock,
  CreditCard,
  History,
  Inbox,
  Landmark,
  LayoutDashboard,
  Lock,
  Map,
  MapPin,
  Package,
  PartyPopper,
  ReceiptText,
  ScanLine,
  ScrollText,
  ShieldCheck,
  ShoppingCart,
  Store,
  Ticket,
  UserCog,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const ROLES = ["admin-global", "admin-empresa", "cajero", "garitero", "cliente"] as const;

export type Rol = (typeof ROLES)[number];

export type OpcionMenu = { nombre: string; icono: LucideIcon; destino: string };

type GrupoMenu = { titulo: string; opciones: readonly OpcionMenu[] };

export type MenuRol = { nombreRol: string; grupos: readonly GrupoMenu[] };

/** Cada módulo nuevo agrega aquí sus opciones. La plantilla no se toca. */
export const MENUS: Record<Rol, MenuRol> = {
  "admin-global": {
    nombreRol: "Admin Global",
    grupos: [
      {
        titulo: "Plataforma",
        opciones: [
          { nombre: "Panel global", icono: LayoutDashboard, destino: "/global" },
          { nombre: "Empresas", icono: Building2, destino: "/global/empresas" },
          { nombre: "Planes y suscripciones", icono: CreditCard, destino: "/global/planes" },
        ],
      },
      {
        titulo: "Control",
        opciones: [
          { nombre: "Auditoría global", icono: ShieldCheck, destino: "/global/auditoria" },
          { nombre: "Base de conocimiento", icono: BookOpen, destino: "/global/conocimiento" },
        ],
      },
    ],
  },
  "admin-empresa": {
    nombreRol: "Admin de empresa",
    grupos: [
      {
        titulo: "General",
        opciones: [
          { nombre: "Dashboard", icono: LayoutDashboard, destino: "/panel" },
          { nombre: "Reportes", icono: ChartColumn, destino: "/panel/reportes" },
          { nombre: "Clientes", icono: Users, destino: "/panel/clientes" },
          { nombre: "Cierres de caja", icono: ReceiptText, destino: "/panel/cierres" },
        ],
      },
      {
        titulo: "Eventos",
        opciones: [
          { nombre: "Calendario de eventos", icono: CalendarRange, destino: "/panel/eventos" },
          { nombre: "Solicitudes", icono: Inbox, destino: "/panel/eventos/solicitudes" },
        ],
      },
      {
        titulo: "Tienda",
        opciones: [
          { nombre: "Productos", icono: Package, destino: "/panel/productos" },
          { nombre: "Inventario", icono: Boxes, destino: "/panel/inventario" },
        ],
      },
      {
        titulo: "Complejo",
        opciones: [
          { nombre: "Mi complejo", icono: Store, destino: "/panel/complejo" },
          { nombre: "Canchas y plano", icono: Map, destino: "/panel/canchas" },
          { nombre: "Horarios y tarifas", icono: Clock, destino: "/panel/tarifas" },
          { nombre: "Feriados y bloqueos", icono: CalendarOff, destino: "/panel/bloqueos" },
          { nombre: "Personal", icono: UserCog, destino: "/panel/personal" },
          { nombre: "Políticas", icono: ScrollText, destino: "/panel/politicas" },
          { nombre: "Medios de pago", icono: Wallet, destino: "/panel/medios-de-pago" },
          { nombre: "Cochera", icono: Car, destino: "/panel/cochera" },
          { nombre: "Chatbot", icono: Bot, destino: "/panel/chatbot" },
        ],
      },
      {
        titulo: "Control",
        opciones: [{ nombre: "Auditoría", icono: ShieldCheck, destino: "/panel/auditoria" }],
      },
    ],
  },
  cajero: {
    nombreRol: "Cajero",
    grupos: [
      {
        titulo: "Atención",
        opciones: [
          { nombre: "Agenda del día", icono: CalendarDays, destino: "/panel/agenda" },
          { nombre: "Pagos por verificar", icono: BadgeCheck, destino: "/panel/pagos" },
          { nombre: "Nueva reserva", icono: CalendarPlus, destino: "/panel/reservas/nueva" },
        ],
      },
      {
        titulo: "Caja",
        opciones: [
          { nombre: "Tienda", icono: ShoppingCart, destino: "/panel/tienda" },
          { nombre: "Turno de caja", icono: Landmark, destino: "/panel/turno" },
          { nombre: "Movimientos", icono: ArrowLeftRight, destino: "/panel/movimientos" },
        ],
      },
    ],
  },
  garitero: {
    nombreRol: "Garitero",
    grupos: [
      {
        titulo: "Puerta",
        opciones: [
          { nombre: "Reservas de hoy", icono: ClipboardList, destino: "/panel/reservas-de-hoy" },
          { nombre: "Cochera", icono: Car, destino: "/panel/cochera" },
          { nombre: "Escáner de entradas", icono: ScanLine, destino: "/panel/escaner" },
        ],
      },
    ],
  },
  cliente: {
    nombreRol: "Cliente",
    grupos: [
      {
        titulo: "Reservar",
        opciones: [
          { nombre: "Complejos", icono: MapPin, destino: "/complejos" },
          { nombre: "Mis reservas", icono: CalendarCheck, destino: "/cuenta/reservas" },
        ],
      },
      {
        titulo: "Eventos",
        opciones: [
          { nombre: "Solicitar evento", icono: PartyPopper, destino: "/cuenta/eventos/solicitar" },
          { nombre: "Mis eventos", icono: Ticket, destino: "/cuenta/eventos" },
        ],
      },
      {
        titulo: "Mi cuenta",
        opciones: [
          { nombre: "Mi perfil", icono: UserRound, destino: "/cuenta/perfil" },
          { nombre: "Historial", icono: History, destino: "/cuenta/historial" },
          { nombre: "Privacidad", icono: Lock, destino: "/cuenta/privacidad" },
        ],
      },
    ],
  },
};
