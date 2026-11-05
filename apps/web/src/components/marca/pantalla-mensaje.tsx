import type { ReactNode } from "react";
import { Logo } from "./logo";

type PantallaMensajeProps = {
  titulo: string;
  descripcion: string;
  children: ReactNode;
};

/** Pantalla centrada para páginas de error y mensajes generales. */
export function PantallaMensaje({ titulo, descripcion, children }: PantallaMensajeProps) {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <Logo />
        <h1 className="mt-8 text-2xl font-semibold text-texto">{titulo}</h1>
        <p className="mt-2 text-texto-suave">{descripcion}</p>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
}
