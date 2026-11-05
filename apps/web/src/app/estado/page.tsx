import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/marca/logo";
import { PanelEstado } from "./panel-estado";

export const metadata: Metadata = { title: "Estado del sistema" };

export default function PaginaEstado() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <Link href="/" aria-label="Ir al inicio">
        <Logo />
      </Link>
      <h1 className="mt-8 text-2xl font-semibold text-texto">Estado del sistema</h1>
      <p className="mt-1 text-texto-suave">Comprueba que cada parte de PichangaFlow esté funcionando.</p>
      <PanelEstado />
    </main>
  );
}
